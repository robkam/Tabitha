// vitest.config.ts
import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite'; // For JSX and Preact support in tests
import path from 'path'; // Import path for alias resolution

export default defineConfig({
  plugins: [preact()], // Ensure Preact is processed correctly
  test: {
    globals: true, // Use Vitest global APIs (describe, test, expect, etc.)
    environment: 'jsdom', // Simulate a browser environment for UI tests
    setupFiles: ['./src/tests/setup.ts'], // Path to your global setup file
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html', 'lcov'], // Added lcov for better CI integration
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'], // Specify files to include in coverage
      exclude: [ // Specify files/patterns to exclude from coverage
        'src/**/*.d.ts',
        'src/main.tsx', // Entry point, often thin
        'src/vite-env.d.ts',
        'src/tests/**/*',
        'src/**/index.html',
        // Configuration files, types, constants etc.
        'src/core/**/types.ts',
        'src/config/**/*',
      ],
      all: true, // Report coverage for all files in `include`, even if not tested
    },
    // Alias configuration matching vite.config.ts
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime'
    },
  },
});