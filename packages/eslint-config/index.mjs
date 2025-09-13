import eslintJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";

const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";

export default [eslintJs.configs.recommended, stylistic.configs.recommended, {
  languageOptions: {
    ecmaVersion: "latest",
    globals: {
      ...globals.browser,
      ...globals.es2025,
      ...globals.node,
      ...globals.worker
    },
    sourceType: "module"
  },
  rules: {
    "camelcase": [DYNAMIC_LEVEL, {
      ignoreDestructuring: true,
      ignoreGlobals: true,
      ignoreImports: true
    }],
    "curly": "error",
    "guard-for-in": "error",
    "no-console": DYNAMIC_LEVEL,
    "no-debugger": DYNAMIC_LEVEL,
    "no-shadow": DYNAMIC_LEVEL,
    "no-unreachable": DYNAMIC_LEVEL,
    "no-unused-vars": [DYNAMIC_LEVEL, {
      args: "none",
      ignoreRestSiblings: true,
      varsIgnorePattern: "^_"
    }],
    "no-useless-constructor": "error",
    "no-var": "error",
    "object-shorthand": ["error", "consistent"],
    "one-var": ["error", "never"],
    "prefer-const": [DYNAMIC_LEVEL, { destructuring: "all" }],
    "prefer-rest-params": DYNAMIC_LEVEL,
    "prefer-spread": DYNAMIC_LEVEL
  }
}, {
  plugins: { "@stylistic": stylistic },
  rules: {
    "@stylistic/array-bracket-spacing": "error",
    "@stylistic/arrow-parens": ["error", "always"],
    "@stylistic/arrow-spacing": "error",
    "@stylistic/block-spacing": ["error", "always"],
    "@stylistic/brace-style": ["error", "allman", { allowSingleLine: true }],
    "@stylistic/comma-dangle": [DYNAMIC_LEVEL, "never"],
    "@stylistic/comma-spacing": ["error", {
      before: false,
      after: true
    }],
    "@stylistic/comma-style": "error",
    "@stylistic/generator-star-spacing": ["error", {
      after: true,
      before: false,
      method: "before"
    }],
    "@stylistic/indent": ["error", 4, { SwitchCase: 1 }],
    "@stylistic/key-spacing": "error",
    "@stylistic/keyword-spacing": "error",
    "@stylistic/lines-between-class-members": "off",
    "@stylistic/max-len": ["error", { code: 120 }],
    "@stylistic/newline-per-chained-call": ["error", { ignoreChainWithDepth: 2 }],
    "@stylistic/no-multi-spaces": ["error", {
      exceptions: { Property: false }
    }],
    "@stylistic/no-multiple-empty-lines": ["error", { max: 1 }],
    "@stylistic/no-trailing-spaces": "error",
    "@stylistic/object-curly-spacing": ["error", "always"],
    "@stylistic/object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
    "@stylistic/operator-linebreak": ["error", "after"],
    "@stylistic/quote-props": ["error", "consistent"],
    "@stylistic/quotes": ["error", "double", {
      allowTemplateLiterals: true,
      avoidEscape: true
    }],
    "@stylistic/semi": ["error", "always"],
    "@stylistic/semi-spacing": "error",
    "@stylistic/space-before-function-paren": ["error", {
      anonymous: "never",
      named: "never",
      asyncArrow: "always"
    }],
    "@stylistic/space-infix-ops": "error",
    "@stylistic/space-in-parens": "error",
    "@stylistic/spaced-comment": "error",
    "@stylistic/template-curly-spacing": "error"
  }
}, {
  files: ["**/.babelrc", "**/.eslintrc.*", "**/*.config.cjs", "**/*.config.js", "**/*.config.mjs"],
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
