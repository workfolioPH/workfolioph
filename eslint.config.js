import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// The ignore list below is what makes working in the GitHub web editor safe:
// the leftover duplicate tree under src/components/ is excluded from linting,
// so it can never cause red CI while you decide whether to delete it later.
export default defineConfig([
  globalIgnores([
    'dist',
    'src/components/src',
    'src/components/api',
    'src/components/public',
    'src/components/supabase',
    'src/components/*.js',
    'src/components/*.json',
    'src/components/*.html',
    'src/components/*.ts',
    'src/components/*.md',
    'src/components/*.sql',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Hygiene rules downgraded to warnings so a small web-UI slip
      // never blocks a deploy; real problems still fail via tsc + build.
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      'no-empty': 'warn',
      'react-refresh/only-export-components': 'warn',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
