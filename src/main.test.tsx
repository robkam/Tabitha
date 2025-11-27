// src/main.test.tsx
import { render, screen, cleanup, act, waitFor } from '@testing-library/preact';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { App, Home, SettingsPage, NotFound } from '../src/main'; // App is the main export from main.tsx
import { LocationProvider, Router, Route } from 'preact-iso';

// Mock webextension-polyfill parts used in main.tsx
// This is handled by src/tests/setup.ts's vi.mock('webextension-polyfill', ...)
// const mockBrowser = global.browser; // FIX: Removed unused variable

/**
 * Helper function to render components within necessary providers for routing.
 * @param ui The Preact component or VNode to render.
 * @param route The initial route to set for the history API.
 * @returns The result of the `render` call from `@testing-library/preact`.
 */
const renderWithRouter = (ui: preact.ComponentChild, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <LocationProvider>
      <Router>
        {ui}
      </Router>
    </LocationProvider>
  );
};


describe('UI Components (main.tsx)', () => {
  beforeEach(() => {
    if (vi.isMockFunction(console.log)) {
        console.log.mockClear();
    } else {
        vi.spyOn(console, 'log').mockImplementation(() => {});
    }
    if (vi.isMockFunction(console.error)) {
        console.error.mockClear();
    } else {
        vi.spyOn(console, 'error').mockImplementation(() => {});
    }
    window.history.pushState({}, 'Test Home', '/');
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks(); // This will also restore console spies if they were made with vi.spyOn
  });

  describe('App Component', () => {
    it('renders the Home component by default on "/" path', async () => {
      render(<App />);
      await waitFor(() => expect(screen.getByText(/Welcome to Tabitha/i)).toBeInTheDocument());
      // More robust check for the route text
      const routeElement = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'p' && content.startsWith('Current route:');
      });
      expect(routeElement.querySelector('code')?.textContent).toBe('/');
    });

    it('renders SettingsPage component on "/settings" path', async () => {
      render(<App />);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      act(() => {
        window.history.pushState({}, 'Test Settings', '/settings');
        window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
      });

      await waitFor(() => expect(screen.getByRole('heading', { name: /Settings/i})).toBeInTheDocument());
      const routeElement = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'p' && content.startsWith('Current route:');
      });
      expect(routeElement.querySelector('code')?.textContent).toBe('/settings');
    });

    it('renders NotFound component for an unknown path', async () => {
      render(<App />);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      act(() => {
        window.history.pushState({}, 'Test Not Found', '/unknown-route');
        window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
      });
      await waitFor(() => expect(screen.getByText(/404: Not Found/i)).toBeInTheDocument());
    });

    it('logs polyfill load status if browser.runtime.id exists', () => {
      // setup.ts should provide a default working mock for 'webextension-polyfill'
      render(<App />);
      expect(console.log).toHaveBeenCalledWith('Tabitha UI: webextension-polyfill loaded and browser.runtime is available.');
    });

    it('logs polyfill error if browser.runtime.id does not exist', async () => {
      // For this specific test, we ensure 'webextension-polyfill' is mocked to simulate failure.
      vi.doMock('webextension-polyfill', () => ({
        default: { /* no runtime or runtime.id */ }
      }));

      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(console, 'log').mockImplementation(() => {}); // silence other logs

      // Dynamically import App to ensure it picks up the temporary mock
      // Must reset modules so main.tsx is re-evaluated with the new mock context
      vi.resetModules();
      const MainModule = await import('../src/main');
      render(<MainModule.App />);

      expect(errorSpy).toHaveBeenCalledWith('Tabitha UI: webextension-polyfill failed to load or browser.runtime not available.');

      errorSpy.mockRestore();
      vi.doUnmock('webextension-polyfill'); // Restore original mock from setup.ts
      vi.resetModules(); // Allow setup.ts mocks to re-apply for subsequent tests
    });
  });

  describe('Home Component', () => {
    it('renders correctly when navigated to', async () => {
      renderWithRouter(<Route path="/" component={Home} />, { route: '/' });
      await waitFor(() => expect(screen.getByText(/Welcome to Tabitha/i)).toBeInTheDocument());
      const routeElement = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'p' && content.startsWith('Current route:');
      });
      expect(routeElement.querySelector('code')?.textContent).toBe('/');
      expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Settings/i })).toBeInTheDocument();
    });
  });

  describe('SettingsPage Component', () => {
    it('renders correctly when navigated to', async () => {
      renderWithRouter(<Route path="/settings" component={SettingsPage} />, { route: '/settings' });
      await waitFor(() => expect(screen.getByRole('heading', { name: /Settings/i})).toBeInTheDocument());
      const routeElement = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'p' && content.startsWith('Current route:');
      });
      expect(routeElement.querySelector('code')?.textContent).toBe('/settings');
      expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Settings/i })).toBeInTheDocument();
    });
  });

  describe('NotFound Component', () => {
    it('renders correctly', () => {
      render(<NotFound />);
      expect(screen.getByText(/404: Not Found/i)).toBeInTheDocument();
      expect(screen.getByText(/The page you are looking for does not exist./i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Go to Home/i })).toBeInTheDocument();
    });
  });

  describe('Root Element Check in main.tsx (Conceptual)', () => {
    it('logs an error if the root app element is not found', async () => {
      const originalGetElementById = document.getElementById;
      document.getElementById = vi.fn((id) => (id === 'app' ? null : originalGetElementById.call(document, id)));

      // Mock webextension-polyfill specifically for this re-import scenario
      // to prevent the "This script should only be loaded..." error.
      // This mock should reflect what setup.ts provides.
      vi.doMock('webextension-polyfill', () => ({
        default: {
          runtime: { id: 'test-extension-id-for-root-check' }
        }
      }));

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(console, 'log').mockImplementation(() => {}); // Silence other logs

      vi.resetModules();
      await import('../src/main');

      expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to find the root element with ID 'app'. UI cannot be rendered.");

      consoleErrorSpy.mockRestore();
      document.getElementById = originalGetElementById;
      vi.doUnmock('webextension-polyfill'); // Important to unmock
      vi.resetModules();
    });
  });
});