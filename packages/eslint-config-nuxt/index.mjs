import eslintTs from "@byloth/eslint-config-typescript";
import eslintVue, { INLINE_ELEMENTS } from "@byloth/eslint-config-vue";

export default [...eslintTs, ...eslintVue, {

  // Include TypeScript ESLint rules in `*.vue` files...
  //  - https://github.com/typescript-eslint/typescript-eslint/blob/42527dfe3ca7e0e10b306849251db57b92e3e545/packages/eslint-plugin/src/configs/eslint-recommended-raw.ts
  //
  files: ["**/*.vue"],
  rules: {
    "constructor-super": "off",
    "getter-return": "off",
    "no-class-assign": "off",
    "no-const-assign": "off",
    "no-dupe-args": "off",
    "no-dupe-class-members": "off",
    "no-dupe-keys": "off",
    "no-func-assign": "off",
    "no-import-assign": "off",
    "no-new-symbol": "off",
    "no-obj-calls": "off",
    "no-redeclare": "off",
    "no-setter-return": "off",
    "no-this-before-super": "off",
    "no-undef": "off",
    "no-unreachable": "off",
    "no-unsafe-negation": "off",
    "no-with": "off"
  }
}, {
  files: ["**/*.vue"],
  rules: {
    "vue/multiline-html-element-content-newline": ["error", {
      ignoreWhenEmpty: true,
      ignores: [
        "pre",
        "textarea",
        "router-link",
        "RouterLink",
        "nuxt-link",
        "NuxtLink",
        "u-link",
        "ULink",

        ...INLINE_ELEMENTS
      ],
      allowEmptyLines: false
    }],
    "vue/singleline-html-element-content-newline": ["error", {
      ignoreWhenNoAttributes: true,
      ignoreWhenEmpty: true,
      ignores: [
        "pre",
        "textarea",
        "router-link",
        "RouterLink",
        "nuxt-link",
        "NuxtLink",
        "u-link",
        "ULink",

        ...INLINE_ELEMENTS
      ],
      externalIgnores: []
    }],
  }
}, {
  files: ["**/app.vue", "**/error.vue", "**/layouts/**/*.vue", "**/pages/**/*.vue"],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "error"
  }
}];
