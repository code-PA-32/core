require("@config/eslint-config/patch")

module.exports = {
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  extends: ["@config/eslint-config"],
}
