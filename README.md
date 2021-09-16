<h1 align="center">
  nuxt-maps
</h1>
<p align="center">
  NuxtJS module for Google Maps<br />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/nuxt-maps"><img src="https://img.shields.io/npm/v/nuxt-maps?style=flat-square"></a> <a href="https://www.npmjs.com/package/nuxt-maps"><img src="https://img.shields.io/npm/dt/nuxt-maps?style=flat-square"></a> <a href="#"><img src="https://img.shields.io/github/license/dogchef-be/nuxt-maps?style=flat-square"></a>
</p>
<br />

## Table of contents
- [Main features](#main-features)
- [Setup](#setup)
- [Options](#options)
- [Usage](#usage)
- [License](#license)

## Main features

- Load Google Maps JavaScript API script only when required (once `$gmaps()` is called)
- TypeScript support

## Setup

1. Add `nuxt-maps` dependency to your project:

```bash
npm install nuxt-maps
```

2. Add `nuxt-maps` module and configuration to `nuxt.config.js`:

```js
export default {
  // ...other config options
  modules: ["nuxt-maps"];
  maps: {
    apiKey: 'XXXXXXXXXXXXXXXXX',
  }
}
```

3. (Optional) TypeScript support. Add `nuxt-maps` to the `types` section of `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["nuxt-maps"]
  }
}
```

## Options

### `apiKey`

- Type: `String`

Your Google API Key.

### `i18n`

- Type: `Boolean`
- Default: `false`

Enable [i18n-module](https://github.com/nuxt-community/i18n-module) integration.

## Usage

...

## License

See the LICENSE file for license rights and limitations (MIT).
