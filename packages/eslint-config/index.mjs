import eslintJs from "@eslint/js";
import globals from "globals";

const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";

export default [eslintJs.configs["recommended"], {
  languageOptions: {
    ecmaVersion: "latest",
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.worker
    },
    sourceType: "module"
  },
  rules: {
    "arrow-parens": ["error", "always"],
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "allman", { allowSingleLine: true }],
    "camelcase": [DYNAMIC_LEVEL, {
      ignoreDestructuring: true,
      ignoreGlobals: true,
      ignoreImports: true
    }],
    "comma-dangle": [DYNAMIC_LEVEL, "never"],
    "comma-spacing": ["error", {
      before: false,
      after: true
    }],
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
    "no-multi-spaces": ["error", {
      exceptions: { Property: false }
    }],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-shadow": DYNAMIC_LEVEL,
    "no-trailing-spaces": "error",
    "no-unreachable": DYNAMIC_LEVEL,
    "no-unused-vars": [DYNAMIC_LEVEL, {
      args: "none",
      varsIgnorePattern: "^_[a-z]?[0-9]*$"
    }],
    "no-useless-constructor": "error",
    "no-var": "error",
    "object-curly-spacing": ["error", "always"],
    "object-shorthand": ["error", "consistent"],
    "one-var": ["error", "never"],
    "operator-linebreak": ["error", "after"],
    "prefer-const": [DYNAMIC_LEVEL, { destructuring: "all" }],
    "prefer-rest-params": DYNAMIC_LEVEL,
    "prefer-spread": DYNAMIC_LEVEL,
    "quote-props": ["error", "consistent"],
    "quotes": ["error", "double", {
      allowTemplateLiterals: true,
      avoidEscape: true
    }],
    "semi": ["error", "always"],
    "semi-spacing": "error",
    "space-before-function-paren": ["error", {
      anonymous: "never",
      named: "never",
      asyncArrow: "always"
    }],
    "space-infix-ops": "error",
    "spaced-comment": "error"
  }
}, {
  files: ["**/.babelrc", "**/.eslintrc.*", "**/config.js", "**/*.config.js"],
  rules: { "indent": ["error", 2, { SwitchCase: 1 }] }
}, {
  files: ["**/*.json"],
  rules: {
    "indent": ["error", 2],
    "max-len": "off",
    "no-unused-expressions": "off",
    "semi": ["error", "never"]
  }
}];
