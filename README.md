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
