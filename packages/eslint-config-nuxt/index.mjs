import eslintTs from "@byloth/eslint-config-typescript";
import eslintVue from "@byloth/eslint-config-vue";

export default [...eslintTs, ...eslintVue, {

  // Include TypeScript ESLint rules in `*.vue` files...
  //  - https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
  //
  files: ["**/*.vue"],
  rules: {
    "constructor-super": "off",
    "getter-return": "off",
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
    "no-unsafe-negation": "off"
  }
}, {
  files: ["**/app.vue", "**/error.vue", "**/layouts/**/*.vue", "**/pages/**/*.vue"],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "error"
  }
}];
