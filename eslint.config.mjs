import { defineConfig, globalIgnores } from "eslint/config";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["**/.cache", "**/build", "**/node_modules/**/*"]), {
    extends: compat.extends("eslint:recommended", "plugin:sonarjs/recommended-legacy"),
    plugins: {
        sonarjs,
    },

    ignores: ["**/tests/**"],
    languageOptions: {
        globals: {
            ...globals.commonjs,
            ...globals.node,
            ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
            strapi: true,
        },

        parser: babelParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            requireConfigFile: false,
            ecmaFeatures: {
                experimentalObjectRestSpread: true,
                jsx: false,
            },
            babelOptions: {
                babelrc: false,
                configFile: false,
                presets: ["@babel/preset-env"],
            },
        },
    },

    rules: {
        indent: ["error", 2, {
            SwitchCase: 1,
        }],

        "linebreak-style": ["error", "unix"],
        "no-console": 0,
        quotes: ["error", "single"],
        semi: ["error", "always"],
        complexity: ["error", 3],
        "max-depth": ["error", 3],
        "max-params": ["error", 4],
        "max-lines": ["error", 200],
        "max-lines-per-function": ["error", 30],
        "max-params": ["error", 2],
        eqeqeq: ['error', 'always'],
    },
}]);