<div></div>

# esbuild-plugin-postcss-literal

[PostCSS](https://github.com/postcss/postcss) tagged template literals plugin for [esbuild](https://github.com/evanw/esbuild).

<br>

### Install

```zsh
npm install esbuild-plugin-postcss-literal -D
```

<br>

### Use

`button.css.js`

```js
const styles = css`
    .button {
        &.-primary {
            background: var(--primary);
        }
    }
`;
```

`esbuild.config.json`

```js
import esbuild from 'esbuild';
import postcssLiteral from 'esbuild-plugin-postcss-literal';

esbuild
    .build({
        entryPoints: ['index.js'],
        bundle: true,
        outfile: 'main.js',
        plugins: [postcssLiteral()]
    })
    .catch(() => process.exit(1));
```

`package.json`

```json
{
    "type": "module",
    "scripts": {
        "start": "node esbuild.config.js"
    }
}
```

<br>

### Configure

`esbuild.config.json`

```js
postcssLiteral({
    filter: /.*/,
    namespace: '',
    tag: 'css',
    minify: false, // esbuild is used to minify and parse errors
    config: {} // postcss config here or in .postcssrc
});
```

[`.postcssrc`](https://github.com/postcss/postcss-load-config)

```json
{
    "plugins": {
        "postcss-nesting": {}
    }
}
```

<br>

### Check

[esbuild-serve](https://github.com/nativew/esbuild-serve) &nbsp; → &nbsp; Serve with live reload for esbuild.

[esbuild-plugin-pipe](https://github.com/nativew/esbuild-plugin-pipe) &nbsp; → &nbsp; Pipe esbuild plugins output.

[esbuild-plugin-babel](https://github.com/nativew/esbuild-plugin-babel) &nbsp; → &nbsp; Babel plugin for esbuild.

[esbuild-plugin-svg](https://github.com/nativew/esbuild-plugin-svg) &nbsp; → &nbsp; Svg files import plugin for esbuild.

<br>
