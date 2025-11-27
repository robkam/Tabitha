// src/background.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * @file Tests for the main background script (background.ts).
 * These tests focus on the correct initialization sequence of background.ts,
 * its interaction with the (mocked) BackgroundOrchestrator, and its handling
 * of the webextension-polyfill.
 */

// Default mocks for BackgroundOrchestrator. These are defined at the top level
// to be accessible by the top-level vi.mock call.
let mockInitialize = vi.fn();
let mockGetInstance = vi.fn(() => ({
  initialize: mockInitialize,
}));

// Mock the BackgroundOrchestrator module.
// Vitest hoists vi.mock, so this mock is applied before any module imports in this file.
// This ensures that when background.ts (or any other module) imports BackgroundOrchestrator,
// it receives this mocked version.
vi.mock('../src/core/backgroundOrchestrator', () => ({
  BackgroundOrchestrator: {
    getInstance: mockGetInstance, // Uses the mockGetInstance function defined above
  },
}));

describe('Background Script (background.ts)', () => {
  /**
   * Runs before each test in this suite.
   * - Resets all Vitest modules to ensure a clean import cache.
   * - Resets mock functions for BackgroundOrchestrator.
   * - Re-applies the default mock for BackgroundOrchestrator after module reset.
   * - Sets up fresh spies for console.log and console.error.
   */
  beforeEach(() => {
    vi.resetModules(); // Clears the Vitest module import cache.

    // Reset our default mock functions for BackgroundOrchestrator to a clean state.
    mockInitialize = vi.fn();
    mockGetInstance = vi.fn(() => ({ initialize: mockInitialize }));

    // Re-apply the default mock for BackgroundOrchestrator.
    // After vi.resetModules(), any cached mock for this module is cleared.
    // This vi.doMock ensures that subsequent imports of BackgroundOrchestrator
    // in this test's scope use our fresh default mocks.
    vi.doMock('../src/core/backgroundOrchestrator', () => ({
        BackgroundOrchestrator: {
          getInstance: mockGetInstance,
        },
    }));

    // Set up fresh spies for console methods for each test.
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  /**
   * Runs after each test in this suite.
   * - Restores all mocked/spied functions to their original implementations.
   * - Unmocks modules that were specifically mocked using vi.doMock.
   */
  afterEach(() => {
    vi.restoreAllMocks();
    // Clean up mocks established with vi.doMock to prevent leakage between tests.
    vi.doUnmock('../src/core/backgroundOrchestrator');
    vi.doUnmock('webextension-polyfill'); // Important if any test used vi.doMock for it.
  });

  // Helper functions to define different states of the webextension-polyfill mock.
  // These are used with vi.doMock to control the polyfill environment for specific tests.
  const healthyPolyfillMock = () => ({
    default: { runtime: { id: 'test-extension-id-healthy' } }, // Simulates a loaded polyfill
  });

  const brokenPolyfillMock = () => ({
    default: { runtime: { /* id is missing or runtime is incomplete */ } }, // Simulates a failed/broken polyfill
  });

  /**
   * Imports the background.ts script for testing.
   * This is typically called after specific mocks (especially for webextension-polyfill)
   * have been set up for a particular test case using vi.doMock.
   * @returns {Promise<void>}
   */
  async function importBackgroundScriptUnderTest(): Promise<void> {
    await import('../src/background');
  }


  it('should get an instance of BackgroundOrchestrator', async () => {
    // Ensure background.ts runs with a healthy polyfill for this test.
    vi.doMock('webextension-polyfill', healthyPolyfillMock);
    await importBackgroundScriptUnderTest();
    expect(mockGetInstance).toHaveBeenCalledTimes(1);
  });

  it('should call initialize on the BackgroundOrchestrator instance', async () => {
    vi.doMock('webextension-polyfill', healthyPolyfillMock);
    await importBackgroundScriptUnderTest();
    expect(mockInitialize).toHaveBeenCalledTimes(1);
  });

  it('should log essential startup messages from background.ts', async () => {
    vi.doMock('webextension-polyfill', healthyPolyfillMock);
    await importBackgroundScriptUnderTest();

    // Verify logs directly originating from background.ts.
    expect(console.log).toHaveBeenCalledWith('Tabitha Background Service Worker starting...');
    expect(console.log).toHaveBeenCalledWith('Tabitha Background: webextension-polyfill loaded and browser.runtime is available.');
    expect(console.log).toHaveBeenCalledWith('Tabitha BackgroundOrchestrator instance obtained and initialize() called successfully.');
    expect(console.log).toHaveBeenCalledWith('Tabitha Background Service Worker script execution completed. Core functionalities are now managed by BackgroundOrchestrator.');

    // Ensure logs from the *actual* (unmocked) BackgroundOrchestrator constructor/initialize
    // are not asserted here, as BackgroundOrchestrator is mocked in these tests.
    expect(console.log).not.toHaveBeenCalledWith('BackgroundOrchestrator constructor: Instance created. Further setup in initialize().');
    expect(console.log).not.toHaveBeenCalledWith('BackgroundOrchestrator: initialize() called. Setting up listeners and managers.');
  });

  it('should log polyfill load status correctly when polyfill seems loaded', async () => {
    vi.doMock('webextension-polyfill', healthyPolyfillMock);
    await importBackgroundScriptUnderTest();
    expect(console.log).toHaveBeenCalledWith('Tabitha Background: webextension-polyfill loaded and browser.runtime is available.');
    expect(console.error).not.toHaveBeenCalledWith(expect.stringContaining('polyfill failed to load'));
  });

  it('should log an error if webextension-polyfill appears not loaded', async () => {
    // Use the broken polyfill mock for this test case.
    vi.doMock('webextension-polyfill', brokenPolyfillMock);
    // The default BackgroundOrchestrator mock (re-applied in beforeEach) is sufficient here.
    await importBackgroundScriptUnderTest();
    expect(console.error).toHaveBeenCalledWith('Tabitha Background: webextension-polyfill failed to load or browser.runtime not available.');
  });

  it('should log an error if BackgroundOrchestrator.getInstance fails', async () => {
    // Ensure a healthy polyfill environment for this test.
    vi.doMock('webextension-polyfill', healthyPolyfillMock);

    const getInstanceError = new Error('Failed to get instance');
    // Override BackgroundOrchestrator mock specifically for this test to throw on getInstance.
    vi.doMock('../src/core/backgroundOrchestrator', () => ({
      BackgroundOrchestrator: {
        getInstance: vi.fn(() => { throw getInstanceError; }),
      },
    }));

    await importBackgroundScriptUnderTest();
    expect(console.error).toHaveBeenCalledWith('Failed to initialize BackgroundOrchestrator. Critical extension functionalities may be affected.', getInstanceError);
  });

  it('should log an error if orchestrator.initialize fails', async () => {
    // Ensure a healthy polyfill environment.
    vi.doMock('webextension-polyfill', healthyPolyfillMock);

    const initializeError = new Error('Failed to initialize');
    const localMockInitialize = vi.fn(() => { throw initializeError; });
    // Override BackgroundOrchestrator mock: getInstance succeeds, but initialize throws.
    vi.doMock('../src/core/backgroundOrchestrator', () => ({
      BackgroundOrchestrator: {
        getInstance: vi.fn(() => ({ initialize: localMockInitialize })),
      },
    }));

    await importBackgroundScriptUnderTest();
    expect(console.error).toHaveBeenCalledWith('Failed to initialize BackgroundOrchestrator. Critical extension functionalities may be affected.', initializeError);
  });
});