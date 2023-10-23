# Eslint Config

## Installation

Before installation make your `.eslintrc.json`, `.eslintrc` into `.eslintrc.js` and paste that in

```js
require( "eslint-config/patch" )

module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ["eslint-config"],
}
```

What is this
patch? [Read here.](https://github.com/microsoft/rushstack/blob/master/stack/eslint-patch/README.md)

Add `eslint-config` dependencies in the `peerDependencies` in the `package.json` at the place of
usage
