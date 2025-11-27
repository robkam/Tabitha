// src/background.ts
/**
 * @file Entry point for the Tabitha browser extension's background service worker.
 * This script initializes the extension's core functionalities by setting up
 * the `BackgroundOrchestrator`.
 * @version 0.0.1
 * @see TSD Section 2.2.1 for Background Service Worker responsibilities.
 */

// Import polyfill at the very beginning of your background script.
// This ensures `browser.*` APIs are available consistently across supported browsers.
// TSD Section 2.3: Cross-Browser Compatibility Strategy.
import browser from 'webextension-polyfill';

// Import the BackgroundOrchestrator, which is responsible for managing all
// core background logic and services.
// TSD Section 3.1.1: BackgroundOrchestrator.
import { BackgroundOrchestrator } from './core/backgroundOrchestrator';

// Log service worker startup. Replace with LogService integration later.
// TSD Section 8.2: Logging Mechanism.
console.log('Tabitha Background Service Worker starting...');

// Perform a basic check to confirm the webextension-polyfill has loaded
// and the `browser.runtime` API is available. This is a sanity check.
if (browser.runtime?.id) { // FIX: Applied prefer-optional-chain
  console.log('Tabitha Background: webextension-polyfill loaded and browser.runtime is available.');
} else {
  // If the polyfill failed or browser.runtime isn't usable, log a critical error.
  // The extension may not function correctly.
  console.error('Tabitha Background: webextension-polyfill failed to load or browser.runtime not available.');
  // Depending on how critical the polyfill is for even basic error reporting,
  // we might throw an error here or attempt a graceful degradation if possible.
  // For now, logging the error is the primary action.
}

// Initialize the BackgroundOrchestrator.
// The orchestrator handles the setup of all other background components,
// event listeners (like onInstalled, action.onClicked), and core logic.
// TSD Section 3.1.1 specifies `BackgroundOrchestrator.initialize()`.
try {
  // Obtain the singleton instance of the BackgroundOrchestrator.
  const orchestrator = BackgroundOrchestrator.getInstance();

  // Call initialize() on the orchestrator. This method is responsible for
  // setting up all necessary listeners and managers.
  orchestrator.initialize();

  console.log('Tabitha BackgroundOrchestrator instance obtained and initialize() called successfully.');
} catch (error) {
  // If BackgroundOrchestrator fails to instantiate or initialize,
  // log a critical error as the extension will likely be non-functional.
  console.error('Failed to initialize BackgroundOrchestrator. Critical extension functionalities may be affected.', error);
  // Further error handling or user notification might be considered here in future.
}

// Log completion of the main background script execution.
// Subsequent operations are event-driven and managed by BackgroundOrchestrator.
console.log('Tabitha Background Service Worker script execution completed. Core functionalities are now managed by BackgroundOrchestrator.');