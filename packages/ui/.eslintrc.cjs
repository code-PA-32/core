require("@config/eslint-config/patch")

module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ["@config/eslint-config"],
}
