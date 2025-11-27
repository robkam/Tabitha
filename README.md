> [!IMPORTANT]
> ## **This project is no longer maintained. It is preserved here for anyone who may find it useful or wish to continue its development.**


# Tabitha Browser Extension

**Tabitha** is a free and open-source browser extension designed to provide an advanced, client-centric solution for managing browser tabs, sessions, bookmarks, notes, and workspaces. It aims to be a powerful tool for users who want to organize their online activities and research efficiently.

This project is licensed under the **GNU General Public License v3.0**.

## Project Overview

Welcome to the Tabitha project! This README provides a high-level overview.

**Key Design Principles:**
*   **Modular Component-Based Architecture**: Following an Event-Driven pattern.
*   **Client-Side Focus**: Core logic and data processing occur within the user's browser.
*   **Privacy First**: No collection of personal data beyond what's necessary for its features. Optional cloud sync is user-controlled.
*   **Open Source**: Licensed under GPL-3.0, with development hosted on GitHub (`https://github.com/robkam/Tabitha`).

For detailed technical specifications, please refer to the [Technical Specification Document](./dev/docs/TSD.md).

## Features (Planned)

*   Workspace, Folder, and Collection Management
*   Saving Links and Notes
*   Tagging System
*   Open Tabs Monitoring and Saving
*   Full-Text Search
*   Recycle Bin for Soft-Deleted Items
*   Import/Export Functionality
*   Context Menu Integrations
*   Keyboard Shortcuts
*   Drag-and-Drop UI
*   Internal Note Linking
*   Optional Cloud Sync (initially Google Drive AppData)
*   Theming and Customization

## Technology Stack (Highlights)

*   **TypeScript**
*   **Preact** for UI
*   **Vite** for Building
*   **Manifest V3** for Browser Extension APIs
*   **`webextension-polyfill`** for cross-browser compatibility
*   **LocalForage** for local data storage (IndexedDB)

## Getting Started

### Prerequisites

*   Node.js (e.g., LTS version)
*   npm (comes with Node.js)

### Installation

For detailed instructions on how to build the extension from source and install it in your browser for development, please see [INSTALLATION.md](./INSTALLATION.md).

### Basic Development Commands

*   Install dependencies: `npm install`
*   Start development server (with HMR): `npm run dev`
*   Build for production: `npm run build`
*   Lint files: `npm run lint`
*   Format files: `npm run format`
*   Run tests: `npm test`
*   Check types: `npm run type-check` (ensure this script is in `package.json`)

## Contributing

We welcome contributions! Please see our [**CONTRIBUTING.md**](./CONTRIBUTING.md) for detailed guidelines on how to contribute to the project, set up your development environment for contribution, report bugs, or suggest features.

## License

This project is licensed under the GPL-3.0 License. See the [LICENSE](./LICENSE) file for details.
