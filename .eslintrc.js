module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-unused-vars": ["error", { vars: "local" }],
    "spaced-comment": ["error", "always", { markers: ["//"] }],
    // "arrow-body-style": ["error", "always"],
    // "arrow-body-style": ["error", "as-needed"],
    // "arrow-body-style": ["error", "as-needed", { requireReturnForObjectLiteral: true },],
    "arrow-body-style": [
      "error",
      "as-needed",
      { requireReturnForObjectLiteral: false },
    ],
    "no-else-return": ["error", { allowElseIf: true }],
  },
};
