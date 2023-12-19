const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";
const IGNORED_PATTERN = "^_[a-z]?[0-9]*$";

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
    "camelcase": [DYNAMIC_LEVEL, { ignoreDestructuring: true, ignoreImports: true, ignoreGlobals: true }],
    "comma-dangle": [DYNAMIC_LEVEL, "never"],
    "comma-spacing": ["error", { before: false, after: true }],
    "curly": "error",
    "generator-star-spacing": ["error", {
      after: true,
      before: false,
      method: "before"
    }],
    "guard-for-in": "error",
    "indent": ["error", 4, { SwitchCase: 1 }],
    "key-spacing": "error",
    "keyword-spacing": "error",
    "lines-between-class-members": "off",
    "max-len": ["error", { code: 120 }],
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 2 }],
    "no-console": DYNAMIC_LEVEL,
    "no-debugger": DYNAMIC_LEVEL,
    "no-multi-spaces": ["error", { exceptions: { Property: false } }],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-shadow": "warn",
    "no-trailing-spaces": "error",
    "no-unreachable": DYNAMIC_LEVEL,
    "no-unused-vars": [DYNAMIC_LEVEL, {
      args: "none",
      varsIgnorePattern: IGNORED_PATTERN
    }],
    "no-useless-constructor": "error",
    "no-var": "error",
    "object-curly-spacing": ["error", "always"],
    "object-shorthand": ["error", "consistent"],
    "one-var": ["error", "never"],
    "operator-linebreak": ["error", "after"],
    "prefer-const": DYNAMIC_LEVEL,
    "prefer-rest-params": DYNAMIC_LEVEL,
    "quote-props": ["error", "consistent"],
    "quotes": ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
    "semi": ["error", "always"],
    "semi-spacing": "error",
    "space-before-function-paren": ["error", { anonymous: "never", named: "never", asyncArrow: "always" }],
    "space-infix-ops": "error",
    "spaced-comment": "error"
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
