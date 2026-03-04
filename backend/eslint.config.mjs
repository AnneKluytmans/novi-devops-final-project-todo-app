import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["node_modules", "dist"]),

  {
    files: ["**/*.{js,mjs,cjs}"],

    extends: [
      js.configs.recommended, 
    ],

    env: {
      node: true,            
      es2022: true,          
      jest: true,            
    },

    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    rules: {
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }], 
      "no-console": "off", 
    },
  },
]);