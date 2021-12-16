const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";

module.exports = {
  extends: [
    "eslint:recommended",
    "standard"
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
    worker: true
  },
  parserOptions: { ecmaVersion: 2021 },
  rules: {
    "arrow-parens": ["error", "always"],
    "brace-style": ["error", "allman", { allowSingleLine: true }],
    "comma-dangle": DYNAMIC_LEVEL,
    "generator-star-spacing": ["error", "after"],
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
      files: [".babelrc", ".eslintrc.js", "*.config.js"],
      rules: { "indent": ["error", 2, { SwitchCase: 1 }] }
    },
    {
      files: ["*.json"],
      rules: {
        "indent": ["error", 2],
        "no-unused-expressions": "off",
        "semi": ["error", "never"]
      }
    }
  ]
};
