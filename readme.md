# esbuild-plugin-postcss-literal

[PostCSS](https://github.com/postcss/postcss) tagged template literals plugin for [esbuild](https://github.com/evanw/esbuild).

<br>

### Install

```zsh
npm install esbuild-plugin-postcss-literal --save-dev
```

<br>

### Use

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
        "postcss-plugin": {}
    }
}
```

<br>

### Check

[esbuild-plugin-pipe](https://github.com/nativew/esbuild-plugin-pipe) &nbsp; → &nbsp; Pipe esbuild plugins output.

[esbuild-plugin-babel](https://github.com/nativew/esbuild-plugin-babel) &nbsp; → &nbsp; Babel plugin for esbuild.

<br>
