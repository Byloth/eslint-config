import eslintJs from "@byloth/eslint-config";
import eslintTs from "@typescript-eslint/eslint-plugin";

import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";

export default [...eslintJs, ...compat.extends("plugin:@typescript-eslint/strict", "plugin:@typescript-eslint/stylistic"), {
  plugins: { "@typescript-eslint": eslintTs },
  languageOptions: {
    parserOptions: { parser: "@typescript-eslint/parser" }
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": DYNAMIC_LEVEL,
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-invalid-void-type": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-shadow": DYNAMIC_LEVEL,
    "@typescript-eslint/no-unused-vars": [DYNAMIC_LEVEL, {
      args: "none",
      ignoreRestSiblings: true,
      varsIgnorePattern: "^_"
    }],
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/unified-signatures": "off"
  }
}, {
  files: ["**/*.cjs", "**/*.js", "**/*.mjs"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": "off"
  }
}, {
  files: ["**/.babelrc"],
  rules: { "@typescript-eslint/no-var-requires": "off" }
}, {
  files: ["**/*.ts", "**/*.mts"],
  rules: {
    "no-dupe-class-members": "off",
    "no-redeclare": "off",
    "no-shadow": "off",
    "no-useless-constructor": "off",
    "no-unused-vars": "off"
  }
}, {
  files: ["**/*.config.ts", "**/*.config.mts"],
  rules: { "@stylistic/indent": ["error", 2, { SwitchCase: 1 }] }
}, {
  files: ["**/*.d.ts"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-restricted-types": "off",
    "@typescript-eslint/no-unused-vars": "off"
  }
}, {
  files: ["**/*.json"],
  rules: { "@typescript-eslint/no-unused-expressions": "off" }
}];
