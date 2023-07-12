const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";

module.exports = {
  extends: ["plugin:@typescript-eslint/recommended"],
  parserOptions: { parser: "@typescript-eslint/parser" },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "warn",
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
      files: [".babelrc", ".eslintrc.*", "config.js", "*.config.js"],
      rules: { "@typescript-eslint/no-var-requires": "off" }
    },
    {
      files: ["*.json"],
      rules: { "@typescript-eslint/semi": ["error", "never"] }
    },
    {
      files: ["*.ts"],
      rules: {
        "no-dupe-class-members": "off",
        "no-redeclare": "off",
        "no-unused-vars": "off",
        "semi": "off"
      }
    },
    {
      files: ["config.ts", "*.config.ts"],
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
