import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"], // This rule set applies to all .ts and .tsx files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      // "@typescript-eslint/no-require-imports": "error", // This rule is implicitly "error" from recommended extends
    },
  },
  // --- NEW CONFIGURATION BLOCK TO OVERRIDE FOR TAILWIND CONFIG ---
  {
    files: ["tailwind.config.ts"], // Target only the tailwind.config.ts file
    rules: {
      "@typescript-eslint/no-require-imports": "off", // Turn off the specific rule for this file
    },
  }
  // --- END NEW CONFIGURATION BLOCK ---
);
