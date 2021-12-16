const DYNAMIC_LEVEL = process.env.NODE_ENV === "production" ? "error" : "warn";

module.exports = {
  extends: [
    "plugin:vue/recommended",
    "@byloth/eslint-config"
  ],
  plugins: ["vue"],
  rules: {
    "generator-star-spacing": ["error", "after"],

    "vue/html-closing-bracket-newline": ["error", { singleline: "never", multiline: "never" }],
    "vue/html-indent": ["error", 4],
    "vue/html-self-closing": ["error", { html: { void: "always", normal: "never" } }],
    "vue/max-attributes-per-line": ["error", { multiline: { max: 1, allowFirstLine: true }, singleline: 2 }],
    "vue/no-multiple-template-root": "off",
    "vue/no-unused-components": DYNAMIC_LEVEL,
    "vue/no-unused-vars": DYNAMIC_LEVEL,
    "vue/no-v-model-argument": "off",
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
