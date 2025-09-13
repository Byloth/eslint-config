import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import eslintVue from "eslint-plugin-vue";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";
export const INLINE_ELEMENTS = [
  "a",
  "abbr",
  "audio",
  "b",
  "bdi",
  "bdo",
  "canvas",
  "cite",
  "code",
  "data",
  "del",
  "dfn",
  "em",
  "i",
  "iframe",
  "ins",
  "kbd",
  "label",
  "map",
  "mark",
  "noscript",
  "object",
  "output",
  "picture",
  "q",
  "ruby",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "svg",
  "time",
  "u",
  "var",
  "video"
];

export default [...compat.extends("plugin:vue/recommended"), {
  ignores: ["!**/.vitepress/"],
  languageOptions: {
    globals: {
      defineEmits: true,
      defineExpose: true,
      defineModel: true,
      defineProps: true,
      withDefaults: true
    }
  },
  plugins: { "vue": eslintVue },
  rules: {
    "vue/array-bracket-spacing": "error",
    "vue/arrow-spacing": "error",
    "vue/block-order": ["error", { order: ["script", "template", "style"] }],
    "vue/block-spacing": "error",
    "vue/block-tag-newline": ["error", {
      multiline: "always",
      singleline: "always"
    }],
    "vue/brace-style": ["error", "allman", { allowSingleLine: true }],
    "vue/comma-dangle": DYNAMIC_LEVEL,
    "vue/comma-spacing": "error",
    "vue/comma-style": "error",
    "vue/first-attribute-linebreak": ["error", {
      multiline: "beside",
      singleline: "beside"
    }],
    "vue/html-comment-content-spacing": ["error", "always", { exceptions: ["-"] }],
    "vue/html-closing-bracket-newline": ["error", {
      singleline: "never",
      multiline: "never"
    }],
    "vue/html-indent": ["error", 4],
    "vue/html-self-closing": ["error", {
      html: {
        void: "always",
        normal: "never"
      }
    }],
    "vue/key-spacing": "error",
    "vue/keyword-spacing": "error",
    "vue/max-attributes-per-line": ["error", {
      multiline: 1,
      singleline: 2
    }],
    "vue/multiline-html-element-content-newline": ["error", {
      ignoreWhenEmpty: true,
      ignores: ["pre", "textarea", "router-link", "RouterLink", ...INLINE_ELEMENTS],
      allowEmptyLines: false
    }],
    "vue/no-unused-components": DYNAMIC_LEVEL,
    "vue/no-unused-vars": [DYNAMIC_LEVEL, { ignorePattern: "^_" }],
    "vue/no-v-model-argument": "off",
    "vue/object-curly-spacing": ["error", "always"],
    "vue/object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
    "vue/operator-linebreak": ["error", "after"],
    "vue/padding-line-between-blocks": "error",
    "vue/quote-props": ["error", "consistent"],
    "vue/script-indent": ["error", 4, {
      baseIndent: 1,
      switchCase: 1
    }],
    "vue/singleline-html-element-content-newline": ["error", {
      ignoreWhenNoAttributes: true,
      ignoreWhenEmpty: true,
      ignores: ["pre", "textarea", "router-link", "RouterLink", ...INLINE_ELEMENTS],
      externalIgnores: []
    }],
    "vue/space-in-parens": "error",
    "vue/template-curly-spacing": "error",
  }
}, {
  files: ["**/*.vue"],
  rules: {
    "@stylistic/indent": "off",
    "no-unused-vars": "off"
  }
}];
