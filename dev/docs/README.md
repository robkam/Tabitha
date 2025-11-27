# Tabitha Developer Documentation Overview

This document serves as an entry point for specific developer-focused documentation related to the Tabitha Browser Extension.

## Project Vision & Principles

**Tabitha** is a free and open-source browser extension designed to provide an advanced, client-centric solution for managing browser tabs, sessions, bookmarks, notes, and workspaces.

**Key Design Principles:**
*   **Modular Component-Based Architecture**: Following an Event-Driven pattern.
*   **Client-Side Focus**: Core logic and data processing occur within the user's browser.
*   **Privacy First**: No collection of personal data beyond what's necessary for its features. Optional cloud sync is user-controlled.
*   **Open Source**: Licensed under GPL-3.0, with development hosted on GitHub (`https://github.com/robkam/Tabitha`).

## Core Technical Documentation

*   **[Technical Specification Document (TSD.md)](./TSD.md)**: Detailed specifications of features, architecture, data models, and technology choices.
*   **(Other documents like API guides, architectural diagrams, etc., would be linked here)**

## Technology Stack (Highlights)

*   **TypeScript**
*   **Preact** for UI
*   **Vite** for Building
*   **Manifest V3** for Browser Extension APIs
*   **`webextension-polyfill`** for cross-browser compatibility
*   **LocalForage** for local data storage (IndexedDB)

## Getting Started with Development

For general project setup, installation, and contribution guidelines, please refer to the main project documentation in the root directory:

*   **[Installation Guide](../../INSTALLATION.md)**
*   **[Contribution Guidelines](../../CONTRIBUTING.md)**
*   **[Main Project README](../../README.md)**

Basic development commands (run from the project root):

*   Install dependencies: `npm install`
*   Start development server: `npm run dev`
*   Build for production: `npm run build`
*   Lint, format, test, type-check: See `CONTRIBUTING.md` for details.

## Project License

This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](../../LICENSE) file in the project root for full details.