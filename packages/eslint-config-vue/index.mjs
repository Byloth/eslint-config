import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import eslintVue from "eslint-plugin-vue";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";

export default [...compat.extends("plugin:vue/vue3-recommended"), {
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
    "vue/max-attributes-per-line": ["error", {
      multiline: 1,
      singleline: 2
    }],
    "vue/first-attribute-linebreak": ["error", {
      multiline: "beside",
      singleline: "beside"
    }],
    "vue/no-unused-components": DYNAMIC_LEVEL,
    "vue/no-unused-vars": [DYNAMIC_LEVEL, { ignorePattern: "^_[a-z]?[0-9]*$" }],
    "vue/no-v-model-argument": "off",
    "vue/script-indent": ["error", 4, {
      baseIndent: 1,
      switchCase: 1
    }]
  }
}, {
  files: ["**/*.vue"],
  rules: {
    "indent": "off",
    "no-unused-vars": "off"
  }
}];
