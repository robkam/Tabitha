import { render } from 'preact';
import { LocationProvider, Router, Route, useLocation } from 'preact-iso'; // Added useLocation import
import './main.css'; // Basic global styles

// Import polyfill at the very beginning of your UI entry point
import browser from 'webextension-polyfill';

// Basic placeholder components for routing
export const Home = () => {
  const { path } = useLocation();
  return (
    <div>
      <h1>Welcome to Tabitha</h1>
      <p>Current route: <code>{path}</code></p>
      <p>This is the main UI. Your panels will go here as per TSD 3.2.1 (UIManager) and 3.2.2 (Panel UIs).</p>
      <nav>
        <a href="/">Home</a> | <a href="/settings">Settings</a>
      </nav>
    </div>
  );
};

export const SettingsPage = () => {
  const { path } = useLocation();
  return (
    <div>
      <h1>Settings</h1>
      <p>Current route: <code>{path}</code></p>
      <p>Application settings will be managed here, as per TSD 2.4 (options_ui) and TSD 3.2.3 (TabithaHubUIManager).</p>
      <nav>
        <a href="/">Home</a> | <a href="/settings">Settings</a>
      </nav>
    </div>
  );
};

// A simple 404 Not Found component
export const NotFound = () => (
  <div>
    <h2>404: Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <a href="/">Go to Home</a>
  </div>
);


export function App() {
  // Example: Log to confirm polyfill is working in UI context
  if (browser.runtime?.id) { // FIX: Applied prefer-optional-chain
    console.log('Tabitha UI: webextension-polyfill loaded and browser.runtime is available.');
    // Example of sending a message to background - to be used by MessageBrokerConnector_UI
    // browser.runtime.sendMessage({ greeting: "hello from UI" }).catch(e => console.error(e));
  } else {
    console.error('Tabitha UI: webextension-polyfill failed to load or browser.runtime not available.');
  }

  return (
    <LocationProvider>
      {/* This Router component is from preact-iso, handling client-side navigation */}
      <Router>
        <Route path="/" component={Home} />
        <Route path="/settings" component={SettingsPage} />
        {/* Default route acts as a 404 catch-all */}
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}

const appRoot = document.getElementById('app');
if (appRoot) {
  render(<App />, appRoot);
} else {
  // This console.error is important for debugging if the #app element is missing.
  console.error("Failed to find the root element with ID 'app'. UI cannot be rendered.");
}