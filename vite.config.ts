import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import webExtension from 'vite-plugin-web-extension';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  plugins: [
    preact(),
    webExtension({
      manifest: path.resolve(__dirname, 'src/manifest.json'),
      watchFilePaths: [
        path.resolve(__dirname, 'src/manifest.json'),
        path.resolve(__dirname, 'src/**/*.ts'),
        path.resolve(__dirname, 'src/**/*.tsx'),
        path.resolve(__dirname, 'src/**/*.html')
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime'
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    target: 'es2020',
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.html'),
        background: path.resolve(__dirname, 'src/background.ts'),
      },
      output: [
        // Output configuration for the UI (index.html and its assets)
        {
          format: 'es',
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'index') return 'assets/index-[hash].js';
            return 'assets/[name]-[hash].js';
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          inlineDynamicImports: false, // Correct placement for this output
        },
        // Output configuration specifically for the background script
        {
          format: 'esm',
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'background') {
              return 'background.js';
            }
            return 'assets/[name]-bg-pass-[hash].js'; // Fallback
          },
          // Use consistent naming patterns to avoid Vite warnings,
          // even if background script doesn't typically use them.
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          inlineDynamicImports: false, // Correct placement for this output
        },
      ],
      // `inlineDynamicImports` was incorrectly placed here; it belongs in each `output` object.
      // inlineDynamicImports: false, // REMOVE FROM HERE
    },
  },
});