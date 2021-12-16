const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";

module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "@byloth/eslint-config"
  ],
  plugins: ["@typescript-eslint"],
  parserOptions: { parser: "@typescript-eslint/parser" },
  rules: {
    "generator-star-spacing": ["error", "after"],

    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [DYNAMIC_LEVEL, { args: "none" }],
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/semi": ["error"]
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": "off"
      }
    },
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
      files: ["*.config.ts"],
      rules: { "indent": ["error", 2, { SwitchCase: 1 }] }
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
