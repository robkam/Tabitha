// src/tests/setup.ts
import '@testing-library/jest-dom/vitest'; // Extends Vitest's expect with jest-dom matchers
import { vi, afterEach } from 'vitest';

/**
 * @file Global setup for Vitest tests.
 * This file configures mocks for browser APIs (via webextension-polyfill)
 * and other global utilities needed for the test environment.
 */

// Define the core mock browser object structure.
// This structure should be comprehensive enough for what the application code under test uses.
// TSD Sections 2.2, 2.3: webextension-polyfill is used for browser.* APIs.
const mockBrowserObject = {
  runtime: {
    id: 'test-extension-id',
    getManifest: vi.fn(() => ({ version: '0.0.1-test' })),
    getURL: vi.fn((path: string) => `chrome-extension://test-extension-id/${path}`),
    onInstalled: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
      hasListener: vi.fn(() => false),
    },
    sendMessage: vi.fn((message?: any) => {
      // Basic echo mock for sendMessage, can be refined per test or by specific component mocks.
      // TSD Section 2.2.4: UI to Background communication.
      if (message && message.greeting === "hello from UI") {
        return Promise.resolve({ response: "hello from background (mocked)" });
      }
      return Promise.resolve(undefined);
    }),
    onMessage: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
      hasListener: vi.fn(() => false),
    },
    // Add other runtime properties/methods if needed by the code under test e.g. onStartup
  },
  action: {
    // TSD Section 2.4: browser.action.onClicked listener.
    onClicked: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
      hasListener: vi.fn(() => false),
    },
    // Add other action properties/methods if needed e.g. setIcon, setTitle
  },
  tabs: {
    // TSD Section 2.4: 'tabs' permission.
    query: vi.fn(() => Promise.resolve([])),
    create: vi.fn((createProperties: browser.tabs.CreateProperties) =>
      Promise.resolve({
        id: Math.floor(Math.random() * 1000) + 1, // Simulate a new tab ID
        url: createProperties.url,
        windowId: 1, // Default windowId
        active: true,
        index: 0, // Default index
        pinned: false,
        highlighted: false,
        incognito: false,
        selected: true, // MV2 property, use 'active' for MV3 logic
        ...createProperties,
      } as browser.tabs.Tab)
    ),
    update: vi.fn((tabId?: number, updateProperties?: browser.tabs.UpdateProperties) =>
      Promise.resolve({
        id: tabId ?? 0, // FIX: Applied prefer-nullish-coalescing
        url: 'http://updated-tab.com', // Default updated URL
        windowId: 1,
        active: true,
        index: 0,
        pinned: false,
        highlighted: false,
        incognito: false,
        selected: true,
        ...updateProperties,
      } as browser.tabs.Tab)
    ),
    // Add other tabs properties/methods if needed e.g. onUpdated, onRemoved
  },
  windows: {
    // TSD Section 2.4: 'windows' permission.
    update: vi.fn((windowId: number, updateProperties: browser.windows.UpdateUpdateInfoType) =>
      Promise.resolve({
        id: windowId,
        state: 'normal', // Default state
        focused: true,
        alwaysOnTop: false,
        incognito: false,
        type: 'normal', // Default type
        tabs: [], // Default empty tabs array
        ...updateProperties,
      } as browser.windows.Window)
    ),
    // Add other windows properties/methods if needed e.g. create, getCurrent
  },
  storage: {
    // TSD Section 2.4: 'storage' permission. LocalForage wraps IndexedDB.
    // These mocks simulate the direct browser.storage API if ever used,
    // though LocalForage will be the primary interaction layer.
    local: {
      get: vi.fn(() => Promise.resolve({})),
      set: vi.fn(() => Promise.resolve()),
      remove: vi.fn(() => Promise.resolve()),
      clear: vi.fn(() => Promise.resolve()),
    },
    sync: {
      get: vi.fn(() => Promise.resolve({})),
      set: vi.fn(() => Promise.resolve()),
      remove: vi.fn(() => Promise.resolve()),
      clear: vi.fn(() => Promise.resolve()),
    },
    managed: {
      get: vi.fn(() => Promise.resolve({})),
    },
    session: {
      // TSD Section 2.2.1: Operational state might use browser.storage.session.
      get: vi.fn(() => Promise.resolve({})),
      set: vi.fn(() => Promise.resolve()),
      remove: vi.fn(() => Promise.resolve()),
      clear: vi.fn(() => Promise.resolve()),
    },
    onChanged: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
      hasListener: vi.fn(() => false),
    },
  },
  // Add other browser APIs as needed and specified in TSD (e.g., contextMenus, alarms, identity, tabGroups)
  // contextMenus: { ... },
  // alarms: { ... },
  // identity: { ... },
  // tabGroups: { ... },
};

// Mock the webextension-polyfill module.
// This ensures that any `import browser from 'webextension-polyfill'`
// throughout the tests will receive this mocked version.
// This is crucial for preventing the polyfill's internal checks from failing
// in a Node.js test environment.
vi.mock('webextension-polyfill', () => {
  return {
    default: mockBrowserObject,
    // If the polyfill also has named exports that your application code uses,
    // they would need to be mocked here as well.
    // e.g., someNamedExport: vi.fn()
  };
});

// While vi.mock('webextension-polyfill', ...) should handle module imports,
// setting `global.browser` can be a fallback or supplemental measure if any code
// (perhaps third-party or older utility code) attempts to access `browser`
// directly on the global object (globalThis).
if (typeof globalThis !== 'undefined') {
  (globalThis as any).browser = mockBrowserObject;
}


// Mock localStorage and sessionStorage for the JSDOM environment.
// Some UI components or libraries (like preact-iso's LocationProvider) might use these.
const createStorageMock = (): Storage => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => store[key] || null,
    setItem: (key: string, value: string): void => {
      store[key] = String(value);
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
      store = {};
    },
    key: (index: number): string | null => Object.keys(store)[index] || null,
    get length(): number {
      return Object.keys(store).length;
    },
  };
};

vi.stubGlobal('localStorage', createStorageMock());
vi.stubGlobal('sessionStorage', createStorageMock());

// Clean up mocks after each test to ensure test isolation.
afterEach(() => {
  // Clears call history, and resets mocks to their initial state (empty functions).
  // This is generally sufficient for mocks created with vi.fn().
  vi.clearAllMocks();

  // If specific mock implementations were changed during a test (e.g., using .mockImplementationOnce()),
  // and they need to be reset to a default behavior beyond just being an empty mock,
  // that reset logic should happen here or be part of the mock's definition.
  // For `mockBrowserObject` properties, we ensure they are reset to their default mock behaviors.
  if (mockBrowserObject?.runtime?.sendMessage && typeof mockBrowserObject.runtime.sendMessage === 'function') { // FIX: Applied prefer-optional-chain
    mockBrowserObject.runtime.sendMessage.mockImplementation((message?: any) => {
      if (message && message.greeting === "hello from UI") {
        return Promise.resolve({ response: "hello from background (mocked)" });
      }
      return Promise.resolve(undefined);
    });
  }
  if (mockBrowserObject?.tabs?.query && typeof mockBrowserObject.tabs.query === 'function') { // FIX: Applied prefer-optional-chain
    mockBrowserObject.tabs.query.mockResolvedValue([]);
  }

  // Clear mocked web storage. JSDOM might handle some of this, but explicit clear is safer.
  localStorage.clear();
  sessionStorage.clear();
});