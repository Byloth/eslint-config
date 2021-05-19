const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended"
  ],
  parserOptions: { ecmaVersion: 2021 },
  rules: {
    "vue/html-closing-bracket-newline": ["error", { singleline: "never", multiline: "never" }],
    "vue/html-indent": ["error", 4],
    "vue/html-self-closing": ["error", { html: { void: "always", normal: "never" } }],
    "vue/max-attributes-per-line": ["error", { multiline: { max: 1, allowFirstLine: true }, singleline: 2 }],
    "vue/no-unused-components": DYNAMIC_LEVEL,
    "vue/no-unused-vars": DYNAMIC_LEVEL,
    "vue/script-indent": ["error", 4, { baseIndent: 1 }]
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "indent": "off",
        "no-unused-vars": "off"
      }
    }
  ]
};
