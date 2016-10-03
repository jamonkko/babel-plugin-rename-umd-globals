[![Build Status](https://travis-ci.org/jamonkko/babel-plugin-rename-umd-globals.svg?branch=master)](https://travis-ci.org/jamonkko/babel-plugin-rename-umd-globals)
[![Coverage Status](https://coveralls.io/repos/github/jamonkko/babel-plugin-rename-umd-globals/badge.svg?branch=master)](https://coveralls.io/github/jamonkko/babel-plugin-rename-umd-globals?branch=master)
[![npm version](https://img.shields.io/npm/v/babel-plugin-rename-umd-globals.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-rename-umd-globals)
[![npm downloads](https://img.shields.io/npm/dm/babel-plugin-rename-umd-globals.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-rename-umd-globals)
[![Dependency Status](https://david-dm.org/jamonkko/babel-plugin-rename-umd-globals.svg)](https://david-dm.org/jamonkko/babel-plugin-rename-umd-globals)
[![devDependency Status](https://david-dm.org/jamonkko/babel-plugin-rename-umd-globals/dev-status.svg)](https://david-dm.org/jamonkko/babel-plugin-rename-umd-globals#info=devDependencies)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
# babel-plugin-rename-umd-globals
Rename and add aliases for global module name. Can be applied after [babel-plugin-transform-es2015-modules-umd](http://babeljs.io/docs/plugins/transform-es2015-modules-umd) to modify global module name ([example below](#together-with-other-umd-plugins)).

## Installation

```sh
$ npm install babel-plugin-rename-umd-globals --save-dev
```

## Usage

### Options
You need to define the rename mapping with plugin options. Just map of old names to new names (and their optional aliases). 

### Example via `.babelrc`

Transform `global.myModule = value` to `global.MyM = value`

```json
{
  "plugins": [
    ["rename-umd-globals", {
      "myModule": "MyM"
    }]
  ]
}
```

### More examples via `.babelrc`

You can also add aliases for global module name by providing array. It will be transformed to chained assignments of global module name.

```json
{
  "plugins": [
    ["rename-umd-globals", {
      "coolio": ["Coolio", "C", "ArtisLeonIveyJr"]
    }]
  ]
}
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: [
    ["rename-umd-globals", {
      "myModule": "MyM"
    }]
  ]
});
```

### Together with other umd plugins

It can be combined with [babel-plugin-add-module-exports](https://github.com/59naga/babel-plugin-add-module-exports) and [babel-plugin-transform-es2015-modules-umd](http://babeljs.io/docs/plugins/transform-es2015-modules-umd). Make sure to use the same plugin order as below!

```javascript
{
  "presets": ["es2015"],
  "plugins": [
    "add-module-exports",
    "transform-es2015-modules-umd",
    ["rename-umd-globals", {
      "myModule": "MyM"
    }]
  ]
}
```


### Caveats

- Expects the *global* object to be named global. If your global scope object happens to be named differently, like *root*, then just use [babel-plugin-rename-assigned-properties](https://github.com/jamonkko/babel-plugin-rename-assigned-properties) instead for arbitrary object property renaming.
