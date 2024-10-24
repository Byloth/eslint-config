# ESLint Vue.js configurations ✔

A collection of some common sense linting rules for Vue.js projects.

```js
// eslint.config.mjs

import path from "node:path";
import { fileURLToPath } from "node:url";

/** If you use JS, uncomment this: */
// import eslintJs from "@byloth/eslint-config";

/** If you DON'T use TS, comment this: */
import eslintTs from "@byloth/eslint-config-typescript";

import eslintVue from "@byloth/eslint-config-vue";
import { includeIgnoreFile } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

/** If you use JS, uncomment this: */
// export default [includeIgnoreFile(gitignorePath), ...eslintJs, ...eslintVue];

/** If you DON'T use TS, comment this: */
export default [includeIgnoreFile(gitignorePath), ...eslintTs, ...eslintVue];
```
