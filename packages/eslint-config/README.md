# ESLint JavaScript configurations ✔

A collection of some common sense linting rules for JavaScript projects.

```js
// eslint.config.mjs

import path from "node:path";
import { fileURLToPath } from "node:url";

import eslintJs from "@byloth/eslint-config";
import { includeIgnoreFile } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [includeIgnoreFile(gitignorePath), ...eslintJs];
```
