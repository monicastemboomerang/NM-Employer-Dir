/** @type {import("eslint").Linter.Config} */
// eslint-disable-next-line no-undef -- Needed for export
module.exports = {
  extends: ["@repo/eslint-config/astro.js"],
  // parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
  },
};
