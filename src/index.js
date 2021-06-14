import esbuild from 'esbuild';
import postcss from 'postcss';
import postcssrc from 'postcss-load-config';
import fs from 'fs';
import path from 'path';

const pluginPostcssLiteral = (settings = {}) => ({
	name: 'postcss-literal',
	setup(build, { transform } = {}) {
		const {
			filter = /.*/,
			namespace = '',
			tag = 'css',
			minify = false,
			config = {}
		} = settings;
		let warnings;

		const parse = css => {
			const result = esbuild.transformSync(css, {
				loader: 'css',
				minify
			});

			if (result.warnings.length) warnings = result.warnings;

			return result.code;
		};

		const transformContents = async ({ args, contents }) => {
			const index = contents.indexOf(tag + '`');

			if (index == -1) return { contents };

			const start = index + tag.length + 1;
			const end = contents.indexOf('`', start);
			const css = contents.slice(start, end);
			const from = path.relative(process.cwd(), args.path);
			const configPlugins = config.plugins || [];
			const loadConfig = await postcssrc()
				.then(result => result)
				.catch(() => ({ options: {}, plugins: [] }));
			const { plugins, options } = loadConfig;

			return postcss([...configPlugins, ...plugins])
				.process(css, { from, ...config, ...options })
				.then(result => {
					const css = parse(result.css);

					contents = contents.slice(0, start) + css + contents.slice(end);

					result
						.warnings()
						.forEach(warn => process.stderr.write(warn.toString()));

					return { contents, warnings };
				})
				.catch(error => {
					if (error.name != 'CssSyntaxError') throw error;

					process.stderr.write(error.message + error.showSourceCode());
				});
		};

		if (transform) return transformContents(transform);

		build.onLoad({ filter, namespace }, async args => {
			const contents = await fs.promises.readFile(args.path, 'utf8');

			return transformContents({ args, contents });
		});
	}
});

export default pluginPostcssLiteral;
