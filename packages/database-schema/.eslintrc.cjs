require("@core/eslint-config/patch")

module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ["@core/eslint-config"],
}
