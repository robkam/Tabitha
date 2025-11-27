/// <reference types="vite/client" />
/// <reference types="preact" />
/// <reference types="webextension-polyfill" />


// This ensures that TypeScript knows about Preact's specific JSX import source.
// The IntrinsicElements interface is an extension point for declaring custom elements
// that Preact's JSX transform should recognize.
declare namespace preact.JSX {
  interface IntrinsicElements {
    // Users can augment this interface to add typings for custom elements, e.g.:
    // 'my-custom-element': MyCustomElementProps;
  }
}

// If you have other global types or augmentations specific to your Vite environment,
// they can be added here. For example, environment variables exposed via `import.meta.env`.
interface ImportMetaEnv {
  // Example: readonly VITE_APP_TITLE: string
  // Add other env variables here as needed by your application
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}