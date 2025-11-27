// @ts-check

import eslintJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  // --- START: Configuration for eslint.config.js itself ---
  {
    files: ['eslint.config.js'],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    }
  },
  // --- END: Configuration for eslint.config.js itself ---

  // 0. Global ignores
  {
    ignores: [
      'dist/',
      'node_modules/',
      'coverage/',
      'src/main - Copy.tsx', // Ignoring this file, address or delete it separately
    ],
  },

  // 1. ESLint Recommended Rules (Baseline)
  eslintJs.configs.recommended,

  // 2. Configuration for ROOT .ts CONFIGURATION FILES (e.g., vite.config.ts)
  {
    files: ['*.config.ts', 'vite.config.ts', 'vitest.config.ts'],
    ignores: ['eslint.config.js'],
    extends: [
        ...tseslint.configs.recommendedTypeChecked,
        ...tseslint.configs.stylisticTypeChecked
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // 3. Configuration for ROOT .cjs / .js CONFIGURATION FILES (e.g., postcss.config.cjs)
  {
    files: ['*.config.cjs', '*.config.js'],
    ignores: ['eslint.config.js'],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },

  // 4. Main TypeScript Configuration for SRC files (Type-Aware, using tsconfig.eslint.json)
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
        ...tseslint.configs.recommendedTypeChecked,
        ...tseslint.configs.stylisticTypeChecked
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.webextensions
      }
    },
    rules: {
      '@typescript-eslint/no-misused-promises': [
        'error', // Keep this as error for source code
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-object-type': ['warn', { allowInterfaces: 'always' }],
    },
  },

  // 5. React/Preact Specific Configuration (Applied to TSX/TS files within src/)
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    languageOptions: {
       parserOptions: {
         ecmaFeatures: {
           jsx: true,
         },
       },
    },
    settings: {
      react: {
        version: '18.2.0',
        pragma: 'h',
        fragment: 'Fragment',
      },
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReact.configs['jsx-runtime'].rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/display-name': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },

  // 5.1. Specific Overrides for TEST FILES within src/
  // This block layers on top of block #4 (Main TS for SRC) and #5 (React for SRC)
  // for files matching these test patterns.
  {
    files: ["src/**/*.test.{ts,tsx}", "src/tests/**/*.{ts,tsx}"],
    rules: {
        "@typescript-eslint/no-empty-function": "off",      // Acceptable for test stubs/spies
        "@typescript-eslint/no-explicit-any": "off",       // Often pragmatic for mocks
        "@typescript-eslint/no-unsafe-assignment": "off",  // Often necessary when working with 'any' mocks
        "@typescript-eslint/no-unsafe-call": "off",         // Common with 'any' typed mocks
        "@typescript-eslint/no-unsafe-member-access": "off",// Common with 'any' typed mocks
        "@typescript-eslint/no-unsafe-return": "off",       // If mocks return 'any'
        "@typescript-eslint/no-floating-promises": "warn", // Keep as WARN: good to be aware of in tests
        "@typescript-eslint/unbound-method": "off",         // Standard test patterns often trigger this benignly
    }
  },

  // 6. Prettier Configuration (MUST BE LAST)
  eslintConfigPrettier,
);