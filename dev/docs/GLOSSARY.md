# Glossary for Tabitha

This glossary defines key terms, components, and concepts used in the Tabitha browser extension project and its documentation (including the Technical Specification Document - TSD).

## A

*   **A11y (Accessibility)**: Refers to the design and creation of digital products (like websites and extensions) that can be used by everyone, including people with disabilities.
*   **Action (Browser Action / Page Action)**: A button added by an extension to the browser's toolbar. Tabitha uses a browser action to open its main UI.
*   **API (Application Programming Interface)**: A set of rules and protocols for building and interacting with software components.
*   **AuthManager**: A background component responsible for handling OAuth 2.0 authentication with cloud providers.
*   **AppData Folder (Google Drive)**: A special hidden folder in a user's Google Drive that an application can use to store its data. It's private to the application.

## B

*   **Background Orchestrator**: A core background component that initializes and coordinates other background services, manages service worker lifecycle events, and handles incoming messages from UI pages.
*   **Background Service Worker (or Background Script)**: A script that runs in the background, separate from web pages. It manages the extension's core logic, state, and handles events. In Manifest V3, this is a Service Worker.
*   **BEM (Block, Element, Modifier)**: A methodology for naming CSS classes to create more maintainable and scalable stylesheets.
*   **`browser.*` API**: The WebExtension API namespace used for cross-browser compatibility, typically facilitated by the `webextension-polyfill` library.

## C

*   **CloudStorageManager**: A background component that abstracts interactions with specific cloud storage provider APIs (e.g., Google Drive).
*   **Collection**: A user-defined grouping of Items (Links or Notes) within a Folder. (See TSD Data Models)
*   **CollectionEntityManager**: A background component encapsulating business logic for `Collection` entities.
*   **Component-Based Architecture**: A software design approach where the system is decomposed into reusable, self-contained components with specific responsibilities.
*   **Content Security Policy (CSP)**: A security feature implemented in web browsers (and defined in `manifest.json` for extensions) to detect and mitigate certain types of attacks, most notably Cross-Site Scripting (XSS) and data injection. It gives developers control over the resources (like scripts, styles, images) that a browser is allowed to load and execute for a given page.
*   **ContextMenuManager**: A background component that manages items added to the browser's context menu (right-click menu).
*   **CRUD**: Acronym for Create, Read, Update, Delete – the basic operations for persistent data.
*   **CSS Custom Properties (CSS Variables)**: Variables defined by CSS authors that contain specific values to be reused throughout a document. Used in Tabitha for theming.

## D

*   **DataManager**: A core background component acting as a centralized data access layer for all local storage operations (using LocalForage/IndexedDB).
*   **DOMPurify**: A library used to sanitize HTML and prevent XSS attacks by removing malicious code from user-generated content (e.g., notes).

## E

*   **Entity Managers (e.g., `WorkspaceEntityManager`, `FolderEntityManager`)**: Background components responsible for the business logic of specific data entities (Workspaces, Folders, etc.).
*   **ESLint**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript and TypeScript.
*   **Event-Driven Architecture**: A software design pattern where components communicate by producing and consuming events, promoting loose coupling.

## F

*   **Folder**: A user-defined grouping of Collections within a Workspace. (See TSD Data Models)
*   **FolderEntityManager**: A background component encapsulating business logic for `Folder` entities.
*   **Font Awesome**: An icon library used for UI elements.
*   **Fuse.js**: A lightweight fuzzy-search library used for client-side searching.

## I

*   **IndexedDB**: A low-level API for client-side storage of significant amounts of structured data, including files/blobs. Tabitha uses it via LocalForage.
*   **Interact.js**: A library for implementing drag-and-drop, resizing, and multi-touch gestures.
*   **Internal Message Broker (`MessageBroker_Internal`)**: An event bus within the background service worker for decoupled communication between background components.
*   **Item**: A generic term for content stored within a Collection, such as a Saved Link or a Note. (See TSD Data Models)
*   **ItemEntityManager**: A background component encapsulating business logic for `Item` entities.

## J

*   **JSON (JavaScript Object Notation)**: A lightweight data-interchange format. Used for cloud sync data and configuration files.

## L

*   **Last Write Wins (LWW)**: A conflict resolution strategy where, in case of conflicting updates, the version with the latest timestamp is chosen. Used by Tabitha for entity-level sync.
*   **LocalForage**: A JavaScript library that provides a simple, Promise-based API for client-side data storage, often wrapping IndexedDB, WebSQL, or localStorage.
*   **LogService**: A component responsible for handling application logging (console, and potentially local storage for errors).

## M

*   **Manifest V3 (MV3)**: The current version of the browser extension platform specification (used by Chrome, Firefox, Edge). It introduces changes like service workers for background scripts.
*   **`manifest.json`**: The central configuration file for a browser extension, defining its properties, permissions, and components.
*   **Material Color Utilities**: A library for generating color palettes, used for Tabitha's custom theming.
*   **MessageBrokerConnector_UI**: A UI-side helper component that manages communication with the background service worker.
*   **Mousetrap / hotkeys-js**: Libraries for handling keyboard shortcuts.

## O

*   **OAuth 2.0**: An open standard for access delegation, commonly used for third-party authentication (e.g., "Sign in with Google").
*   **OpenTabsMonitor**: A background component that monitors browser tab, window, and (for Chrome) tab group events.

## P

*   **Preact**: A fast, lightweight alternative to React with the same modern API. Used for Tabitha's UI.
*   **Prettier**: An opinionated code formatter that enforces a consistent code style.
*   **PRD (Product Requirements Document)**: A document outlining the features, functionalities, and goals of a product.

## R

*   **Recycle Bin**: A feature for managing soft-deleted items, allowing users to restore or permanently delete them.
*   **RecycleBinManager**: A background component managing the logic for the recycle bin.

## S

*   **Self-correction (AI Development Context)**: Refers to an internal review and refinement step performed by an AI *before* providing final output. This involves checking generated code or explanations against requirements (like the TSD), best practices, and identifying/addressing any discrepancies or potential issues. It's a quality assurance step in AI-assisted development.
*   **Service Worker**: See *Background Service Worker*.
*   **SettingsManager**: A background component that manages user settings and their persistence.
*   **SPA (Single Page Application)**: A web application that interacts with the user by dynamically rewriting the current web page with new data from the web server, instead of the default method of a web browser loading entire new pages. Tabitha's UI is an SPA.
*   **SyncableEntity**: A base interface in Tabitha's data model for entities that can be synced and support soft deletion.
*   **SyncManager**: A core background component that manages online data synchronization with cloud providers.

## T

*   **Tag**: A label or keyword assigned to entities (like Collections or Items) for organization and filtering.
*   **TagManager**: A background component managing CRUD operations for tags and their associations.
*   **ThemeManager**: A background component that handles theme logic, including generating custom theme palettes.
*   **Tippy.js**: A library for creating tooltips, popovers, and dropdowns.
*   **Tiptap**: A headless, framework-agnostic WYSIWYG editor toolkit used for note-taking in Tabitha.
*   **TSD (Technical Specification Document)**: This document! It provides a detailed technical blueprint for the Tabitha browser extension. (In the context of our interaction, it's the primary input document defining requirements.)
*   **TypeScript**: A statically typed superset of JavaScript that compiles to plain JavaScript.

## U

*   **UI (User Interface)**: The means by which a user interacts with the extension.
*   **UIManager**: The main top-level Preact component that controls the overall UI layout and application views.
*   **UUID (Universally Unique Identifier)**: A 128-bit number used to identify information in computer systems. Tabitha uses UUID v4 for its entity IDs.
*   **UX (User Experience)**:

## V

*   **Vite**: A modern frontend build tool that provides fast development server startup and optimized builds.
*   **`webextension-polyfill`**: A library that provides a promise-based `browser.*` API for writing cross-browser compatible WebExtensions.

## W

*   **Workspace**: The highest-level organizational unit in Tabitha, containing Folders, Collections, and Items. (See TSD Data Models)
*   **WorkspaceEntityManager**: A background component encapsulating business logic for `Workspace` entities.

## X

*   **XSS (Cross-Site Scripting)**: A type of security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users. CSP and DOMPurify help mitigate this.