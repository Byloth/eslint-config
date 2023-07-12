const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";

module.exports = {
  extends: ["eslint:recommended"],
  env: {
    browser: true,
    es2024: true,
    node: true,
    worker: true
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    "arrow-parens": ["error", "always"],
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "allman", { allowSingleLine: true }],
    "comma-dangle": [DYNAMIC_LEVEL, "never"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "generator-star-spacing": ["error", "after"],
    "guard-for-in": "error",
    "indent": ["error", 4, { SwitchCase: 1 }],
    "lines-between-class-members": "off",
    "max-len": ["error", { "code": 120 }],
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 2 }],
    "no-console": DYNAMIC_LEVEL,
    "no-debugger": DYNAMIC_LEVEL,
    "no-multi-spaces": ["error", { exceptions: { "Property": false } }],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-unreachable": DYNAMIC_LEVEL,
    "no-trailing-spaces": "error",
    "no-unused-vars": [DYNAMIC_LEVEL, { args: "none" }],
    "no-useless-constructor": "error",
    "object-curly-spacing": ["error", "always"],
    "object-shorthand": ["error", "consistent"],
    "operator-linebreak": ["error", "after"],
    "prefer-rest-params": DYNAMIC_LEVEL,
    "quote-props": ["error", "consistent"],
    "quotes": ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
    "semi": ["error", "always"],
    "space-before-function-paren": ["error", { anonymous: "never", named: "never", asyncArrow: "always" }],
  },
  overrides: [
    {
      files: [".babelrc", ".eslintrc.*", "config.js", "*.config.js"],
      rules: { "indent": ["error", 2, { SwitchCase: 1 }] }
    },
    {
      files: ["*.json"],
      rules: {
        "indent": ["error", 2],
        "max-len": "off",
        "no-unused-expressions": "off",
        "semi": ["error", "never"]
      }
    }
  ]
};
