require("@core/eslint-config/patch")

module.exports = {
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  extends: ["@core/eslint-config"],
}
