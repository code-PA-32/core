require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  plugins: ["testing-library", "ui-testing"],
  overrides: [
    {
      extends: ["plugin:ui-testing/playwright", "plugin:testing-library/react"],
      files: ["**/__tests__/**/*", "**/*.{spec,test}.*"],
      env: {
        node: true,
        browser: true,
        commonjs: true,
        es2021: true,
      },
      rules: {
        // ui-Testing
        "ui-testing/no-assertions-in-hooks": "error",
        "ui-testing/no-disabled-tests": "error",
        "ui-testing/no-focused-tests": "error",
        "ui-testing/no-css-page-layout-selector": ["error", "playwright"],
        "ui-testing/no-hard-wait": ["error", "playwright"],

        // // https://github.com/jest-community/eslint-plugin-jest
        // "jest/no-conditional-expect": "error",
        // "jest/no-identical-title": "error",
        // "jest/no-interpolation-in-snapshots": "error",
        // "jest/no-jasmine-globals": "error",
        // "jest/no-mocks-import": "error",
        // "jest/valid-expect-in-promise": "error",
        // "jest/valid-title": "error",
        // "jest/expect-expect": "error",
        // "jest/no-commented-out-tests": "error",
        // "jest/no-disabled-tests": "error",
        // "jest/no-export": "error",
        // "jest/no-focused-tests": "error",
        // "jest/no-test-prefixes": "error",
        //
        // // https://github.com/testing-library/eslint-plugin-testing-library
        // "testing-library/await-async-query": "error",
        // "testing-library/await-async-utils": "error",
        // "testing-library/no-await-sync-query": "error",
        // "testing-library/no-dom-import": ["error", "react"],
        // "testing-library/no-wait-for-empty-callback": "error",
        // "testing-library/no-wait-for-snapshot": "error",
        // "testing-library/no-manual-cleanup": ["error"],
        // "testing-library/prefer-explicit-assert": ["error"],
        // "testing-library/prefer-find-by": ["error"],
        // "testing-library/prefer-presence-queries": ["error"],
        // "testing-library/prefer-screen-queries": ["error"],
        // "testing-library/prefer-wait-for": ["error"],
      },
    },
  ],
}
