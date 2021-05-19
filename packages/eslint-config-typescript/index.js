const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended"
  ],
  parserOptions: { ecmaVersion: 2021 },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [DYNAMIC_LEVEL, { args: "none" }],
    "@typescript-eslint/semi": ["error"]
  },
  overrides: [
    {
      files: [".babelrc", ".eslintrc.js", "*.config.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off"
      }
    },
    {
      files: ["*.json"],
      rules: {
        "@typescript-eslint/semi": ["error", "never"]
      }
    },
    {
      files: ["*.ts"],
      rules: {
        "no-unused-vars": "off",
        "semi": "off"
      }
    },
    {
      files: ["*.d.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  ]
};
