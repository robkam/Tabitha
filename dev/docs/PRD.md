# Product Requirements Document for "Tabitha" Browser Extension

## 1. Introduction

The Tabitha browser extension is an open-source tool designed to enhance tab and link management, providing users with an intuitive and efficient interface to organize their browsing experience. Licensed under GPL 3 and hosted on GitHub, the project welcomes community contributions and provides support via GitHub Issues and Discussions.

### 1.1 Overview

The Tabitha browser extension organizes tabs and saved links into independent Workspaces, each serving as an isolated container for distinct projects or themes with no interaction between them. The organizational hierarchy within a Workspace is deliberately shallow to maintain simplicity: Workspaces contain Folders, Folders contain Collections, and Collections contain Items (Saved Links or Notes). There is no further nesting capability beyond this structure (e.g., no sub-folders or sub-collections).

Through a clear four-panel interface—Workspaces, Folders, Collections, and Open Tabs—it offers two complementary hierarchies. The first three panels form the persistent hierarchy for saving and categorizing Saved Links (website references with a title, description, URL, favicon, and saved tab state such as pinned status or Chrome tab group affiliation) and Notes (user-added notes featuring a plain text Title and a rich text Body supporting basic formatting like headings, bold, lists, and hyperlinks—to external URLs or other Note Items within Tabitha via a special URI scheme—stored as HTML, and displayed with a note icon). All user-generated data, including Workspaces (with their tag definitions and custom tag sort order), Folders, Collections, Items (with their assigned tags), along with user settings (which include custom theme definitions, user-created TXT export templates, and the "Enable Chrome Tab Group Integration" setting) and Recycle Bin contents, are synced securely to the cloud.

Within each Workspace, Folders group related content, and Collections hold items. Each Workspace includes persistent "My Collections" and "Starred Collections" Folders for default and favorite Collections. Collection Components can be assigned tags. Optionally, if enabled in settings, individual Saved Link Items and Note Items can also be assigned tags for more granular organization. Tag definitions within a Workspace can be manually reordered by the user, and this order dictates how tag badges are displayed. The fourth panel, Open Tabs, provides a session-based, real-time hierarchy of open browser windows and their tabs, including support for Chrome pinned tabs and Chrome tab groups. If the "Enable Chrome Tab Group Integration" setting is active, users can also perform a "Save Group as Collection" action directly from the Open Tabs panel. Items from the Open Tabs panel will only influence the persistent hierarchy through explicit user actions, specifically by dragging tabs, windows, or tab groups into a Collection Component to create Saved Link Items, capturing their current state (e.g., pinned, Chrome tab group affiliation).

The Workspaces panel provides access to a comprehensive search function for the current Workspace (including Folders, Collections, Items, and Open Tabs) and a Recycle Bin for managing deleted items. The Recycle Bin page offers its own search capability for deleted items.

The Workspaces, Folders, and Collections panels work together to structure items, while the Open Tabs panel complements them by allowing the user to drag Tabs, pinned tabs, tab groups, or entire Open Tabs into Collections, integrating the current browsing session with the saved hierarchy. Drag-and-drop is limited to reordering within Workspaces, Folders, and Collections (and reordering tag definitions), or for moving items (such as browser tabs, pinned tabs, tab groups, or entire browser windows) from the Open Tabs panel to Collection Components in the Collections panel to create Saved Link Items. Browser tabs can also be reordered within the Open Tabs panel, updating the actual browser window accordingly. Clicking a Saved Link Item opens its URL in a new browser tab. Collection Components offer an "Open" action (e.g., via their mini toolbar) to open all their contained Saved Links as new tabs in the current browser window, attempting to restore their saved states (e.g., pinned, Chrome tab group affiliation if enabled). If a Collection Component contains only Note Items and no Saved Link Items, its "Open" action icon-button in the mini toolbar will be disabled (e.g., greyed out) with a tooltip indicating "No links to open in this Collection." To open Collection links in an entirely new browser window, the user would first manually create a new window and then activate the Collection's "Open" action from Tabitha within that new window. In New Tab Takeover mode, peeling off a tab from the current window naturally creates a new Tabitha instance in a new window, facilitating this workflow. An optional setting allows displaying an item count (e.g., "(X items)") next to each Collection Component's name.

All commands in Tabitha support user-configurable keyboard shortcuts, detailed on a dedicated Keyboard Shortcuts page.

### 1.2 Goals and Objectives

- Enable an intuitive system for saving and managing Collections of Saved Links for later use.
- Facilitate seamless switching between different contexts or projects.
- Provide a clear view of currently Open Tabs, including pinned tabs and tab groups in Chrome.
- Support fluid reorganization through drag-and-drop functionality.
- Offer flexible display options to respect existing user workflows.

### 1.3 Aspirations

The Tabitha browser extension aims to be an effective tool for organizing tabs and Saved Links, guided by the following principles across its key areas. These aspirations steer the development process, ensuring the extension remains a practical, user-centric tool that enhances the browsing experience through thoughtful design and reliable functionality.

- User Interface: Deliver a clean, consistent, and intuitive interface that integrates seamlessly with the browser's native appearance. The design prioritizes simplicity and familiarity, enabling effortless navigation and management of the organizational hierarchy through a layout aligned with standard extension conventions.
- User Experience: Provide an efficient and straightforward experience where managing tabs and Saved Links feels natural and unobtrusive. The goal is to minimize complexity, supporting task focus with predictable, minimal-effort interactions, such as single-click actions for frequent tasks and clear confirmations for safety-critical operations like deletions.
- Performance: Ensure the extension operates with minimal impact on browser resources, maintaining fast response times and low memory usage even under heavy use. Optimization for efficiency supports a responsive experience across varying hardware capabilities without compromising functionality.
- Scalability: Establish a robust foundation capable of handling increasing data volumes—from small personal collections to extensive project-based structures—while preserving performance and usability. The system adapts to growing user needs without introducing unnecessary complexity.

Client-Side Operation with Cloud Syncing: Tabitha is a client-side browser extension, meaning all core functionality—such as organizing tabs, managing Workspaces, and interacting with Open Tabs—runs locally within the user’s browser. It does not require a server for its operations. Cloud storage (e.g., Google Drive) is used solely to sync user settings (which include custom theme definitions, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting), Workspaces (which include their tag definitions and custom sort order), Folders, Collections and their contents (which include assigned tags), and Recycle Bin data across devices, ensuring data consistency without server-side processing. Local persistence is handled through immediate persistence to IndexedDB, ensuring offline data safety.

## 2. Scope

The scope of the Tabitha browser extension defines the features and functionalities to be developed, as well as explicit exclusions to maintain focus.

### 2.1 In Scope

The Tabitha browser extension includes the following features and functionalities:

- A four-panel interface for organizing tabs and saved links into Workspaces, Folders, Collections, and Open Tabs. The hierarchical structure is limited to Workspaces containing Folders, Folders containing Collections, and Collections containing Items; no deeper nesting is supported.
- Options for sorting Workspace Components within the Workspaces Panel (including manual drag-and-drop reordering, alphanumeric sorting by name, and sorting by last modified date), Folder Components within the Folders Panel (including manual drag-and-drop reordering, alphanumeric sorting by name, and sorting by last modified date), and Collection Components within the Collections Panel (including manual drag-and-drop reordering, alphanumeric sorting by name, sorting by date created, sorting by last modified date, and sorting by item count if enabled). Sorting mechanisms are detailed in the respective panel sections.
- A comprehensive search function accessible via the Workspaces panel, allowing users to search the current Workspace (including Folder names; Collection names and their assigned tags; URLs, titles, descriptions, Note titles/bodies, and assigned tags of Items; and Open Tab titles/URLs). Search scopes and options allow for targeted queries, including advanced query syntax (e.g., exact phrase, OR, NOT) and finding duplicates. Search results are displayed in the Collections panel and can be interacted with while remaining visible. The Recycle Bin page also features its own search capability.
- A Recycle Bin page accessible via the Workspaces panel, featuring its own search capability to filter deleted items. Deleted items remain for a user-configurable period (0 to 30 days), with options to restore or permanently delete them.
- Cloud syncing of user settings (which include custom theme definitions, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting), Workspaces (which include their tag definitions and custom sort order), Folders, Collections and their contents (which include assigned tags), and Recycle Bin data using OAuth-based authentication (e.g., Google Drive).
- Initially supports Chrome browsers, with planned compatibility for Firefox, Edge, and Opera in future releases to meet the non-negotiable requirement for broad accessibility (Section 3.1).
- Two window modes: New Tab Takeover and Dedicated Tab. A user-configurable setting to automatically open Tabitha in a Dedicated Tab when the browser launches (default: OFF).
- Browser context menu integration, providing quick actions to "Save session" (save all tabs from the current window into a new Collection), "Save Current Tab to Active Collection", and "Open Tabitha" (launch the Tabitha interface).
- Drag-and-drop functionality for reordering within panels (including reordering tag definitions in their management UI) and moving tabs/windows to Collections. The primary alternative for managing/moving multiple items (especially Collection Items like Saved Links or Notes, or Collection Components) simultaneously is by using checkbox selection within the respective panel, which then reveals a popover with bulk actions. Selection of multiple open tabs in the Open Tabs panel for batch drag-and-drop into Collections (by selecting individual tab checkboxes, or via direct multi-selection of tab items) is also supported.
- Real-time updates for the Open Tabs panel reflecting browser state, including Chrome pinned tabs and tab groups.
- Offline support via IndexedDB for immediate caching and local persistence of all data. This includes user settings (which contain custom theme definitions, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting), Workspaces (with their tag definitions and custom sort order), Folders, Collections and their contents (with assigned tags), and Recycle Bin data.
- Accessibility compliance with WCAG guidelines.
- Linking between Note Items using a Tabitha-specific URI scheme. Users can copy a special link to a Note Item and paste it into the hyperlink editor of another Note Item. Clicking these links will navigate within Tabitha to the target Note, with a contextual "back" mechanism to return to the source note.
- A modern, minimalist UI with RTL support and internationalization (see Section 8.4). Default names for standard components (e.g., "My Workspace", "My Collections") are localized upon creation if a translation for the detected browser language exists.
- Error handling with user-friendly notifications and optional console logging.
- Support for Chrome pinned tabs and tab groups, allowing users to save and manage them within Tabitha's Collections. This includes saving and restoring browser tab states (e.g., pinned status, Chrome tab group affiliation, if the "Enable Chrome Tab Group Integration" setting is active) when links are saved to and opened from Collections. Features a "Save Group as Collection" action in the Open Tabs panel for Chrome users (if the integration setting is active). For browsers that do not support specific features like tab groups, that aspect is ignored.
- A theme system allowing selection from predefined themes or user-created custom themes for each Workspace, with theme definitions for light and dark modes. Includes a settings interface for users to define custom themes by specifying colors for various UI elements.
- UI Density settings (Default, Comfortable, Compact) to adjust overall interface spacing.
- Visual indicators for the active sort criterion of Collection Items.
- Tagging system:
    - Collection Components can be assigned multiple tags (name and color) for organization and filtering.
    - Optionally, via a setting (default OFF), individual Saved Link Items and Note Items can also be assigned multiple tags. When this setting is disabled, existing item tags are preserved but hidden and excluded from search.
    - If item-level tagging is enabled, users can select multiple Collection Items within a Collection Component and apply or remove tags in a single batch operation.
    - Tag definitions are part of each Workspace's data and can be manually reordered by the user; this custom order dictates the display sequence of tag badges.
- Per-Collection View Override: An optional setting (default OFF) allowing users to lock a specific view (List, Cards, Compact, Board, Grid) for individual Collection Components, overriding the global View setting applied to the Collections Panel. When this global setting is enabled, an icon-button (eye icon for unlocked, lock icon for locked) appears on each Collection Component's title bar to manage its view settings via a popover.
- Optional display of item count on Collection Components: A setting (default OFF) to show the total number of Saved Link and Note Items within each Collection Component (e.g., "My Collection (5 items)") next to its name.

### 2.2 Out of Scope

The following features are explicitly excluded to maintain focus:

- Quick Links: A feature allowing users to create short, memorable aliases for quick access to destinations within Tabitha or external URLs. This is excluded because it adds complexity in alias handling and parsing, and its benefits for the core organizational purpose may not justify the development effort. Similar navigational efficiency can be achieved through well-organized Workspaces, Folders, Collections, and the main search functionality.
- Next (Prioritization List): A feature to mark and prioritize items (Folders, Collections, Saved Links, Notes) for later review within a Workspace. This is excluded as it extends Tabitha towards task management, which is beyond its primary focus on organizing tabs and Saved Links. This could complicate the UI/UX and increase resource demands. Users can achieve a degree of prioritization using existing features like Collection starring or manual ordering.
- Nested Collections or Sub-Folders: Functionality to create further persistent sub-groupings (e.g., sub-folders within Folders, or sub-collections within Collections) is excluded. The persistent hierarchy is limited to Workspaces containing Folders, Folders containing Collections, and Collections containing Items. This maintains UI simplicity and a manageable data model. Users can achieve similar granular organization by creating more numerous, specifically named Collection Components within the existing Folder structure.
- Advanced bi-directional linking for Note Items, automatic backlink display, graph views for notes, or a WYSIWYG editor that auto-suggests internal notes for linking (e.g., `[[Note Title]]` style linking). The implemented note-to-note linking relies on manual creation of hyperlinks using a copied Tabitha-specific URI and a simple contextual one-step back navigation.
- No interaction with browser bookmarks: Tabitha operates independently from browser-native bookmark systems. It doesn’t integrate with or manage them, use their APIs, support saving Saved Links through their interfaces, display Tabitha’s Collections in their menus, or synchronize with them via its cloud-syncing system.
- No Shortcut Links Requiring Server-Side Redirection: Tabitha is designed as a client-side browser extension, operating entirely within the browser without external dependencies. Introducing shortcut links that require a server to manage redirections would contradict this approach by involving external processing, compromising user privacy and increasing complexity.
- Automatic Live Updating of Saved Collections: Functionality where a saved Collection Component, after its links are opened, automatically and continuously updates its content to reflect ongoing navigation or changes within those specific browser tabs is excluded. Automatic live updates to saved Collections risks unintended data overwrites, compromises the integrity of deliberately saved link collections, and introduce significant complexity in tracking tab lineage and user intent. User actions to update saved Collection Components are designed to be deliberate, ensuring user control and data safety.
- Automated Link Curation and Archival (including basic dead link checking and automated citation generation): The functionality to automatically check the validity of Saved Links, search for archived versions, automatically generate academic citations (e.g., MLA, APA), or perform other automated curation is excluded because it increases complexity and performance overhead, extends beyond the core organizational focus, and introduces external service dependencies. The user-managed custom TXT export template feature (detailed in Section 6.6.3 and used in Section 7.4.2.3) allows users to format link data for export, which they might use as a starting point for manual citation creation, but Tabitha itself does not perform automated citation generation.
- Linking to Local Files (e.g., file:/// URLs): Support for direct links to local files (PDFs, TXT files, etc.) is excluded. This is due to browser security restrictions, the inherent inability to maintain link consistency across devices, and the added complexity that would shift focus from web resource management.
- To-do list features, such as creating and managing tasks, are not supported as they extend beyond Tabitha’s core focus on organizing tabs and Saved Links, potentially complicating the UI/UX and increasing resource demands.
- Set reminders (calendar type feature): Functionality for setting date/time-based reminders for links or notes is excluded. This would shift Tabitha towards task or event management, which is beyond its core scope of tab and link organization, and would add significant complexity to the UI and data model.
- Project and Task Management Functionality: Tabitha is not a project and task management tool. It does not include features such as calendaring, project planning, task assignment, progress tracking, or advanced to-do lists.
- Support for the Safari browser is not included due to the financial and resource demands of Apple’s developer requirements, such as the paid Apple Developer Program and specialized development tools.
- Tabitha is designed for individual use and does not support multi-user or collaborative features such as shared Workspaces, real-time editing, or team collaboration tools. For users who wish to share their data, Tabitha provides the ability to export data to JSON files, which can be imported into another instance of the extension.
- Link previews, such as tooltips, summaries, or thumbnails, for Saved Links in Collections are not supported to maintain an uncluttered UI and to avoid the complexity and performance overhead they introduce, such as increased resource usage from generating and storing thumbnails. These features do not align with Tabitha’s focus on lightweight, efficient organization.
- Coloring Collections by tag: This is not necessary because tag badge colors are easily spotted, and filtering by tag hides all other non-tagged Collections, providing sufficient visual distinction and functionality. Item tags also use colored badges.
- Enhanced link sharing: Such as creating and sharing webpage shortcuts with previews, are excluded to preserve Tabitha’s minimalist UI, performance efficiency, and single-user focus, avoiding added complexity and resource demands.
- Encrypting workspaces or folders is excluded as it adds complexity, increases performance overhead, and is redundant given OAuth-based cloud syncing and private storage, aligning with Tabitha’s single-user, lightweight design.
- Advanced multi-source drag-and-drop: Excluded as this adds UI complexity, not aligning with Tabitha's principle of predictable, minimal-effort interactions for moving items, and alternatives exist for moving multiple items (checkbox selection and popover actions).
- Confirmation for Collection Naming During Session Save: Requiring users to confirm/enter a name every time they use "Save Window as Collection" or "Save Group as Collection" is excluded. The current "create then immediate inline rename" approach is chosen to maintain a faster workflow for frequent users, as an extra modal step for each save operation could be perceived as interruptive. The user can always rename the collection later if the default is not suitable.

## 3. Constraints

The development of the Tabitha browser extension must adhere to the following:

### 3.1 Non-Negotiable Conditions

These are mandatory requirements outside the control of developers:

- Technical Constraints:
  - The extension must be designed and developed to achieve compatibility with all major browsers (e.g., Chrome, Firefox, Edge, Opera) to ensure broad accessibility, even if initial releases have a phased rollout as described in Section 2.1.
  - Data Allowance and Bandwidth Limits: Tabitha utilizes cloud storage solutions (e.g., Google Drive's appDataFolder) for syncing user data (Workspaces, Folders, Collections, and their contents, which include assigned tags and custom tag sort order). The user's storage limit should be sufficient for typical use. Cloud syncing is optimized to minimize bandwidth usage by transferring only differential changes when possible.
  - Limitations of Online Storage Solutions: Cloud syncing relies on internet connectivity and the availability of the cloud storage provider. While storage quotas are generous, users with extremely large datasets may need to manage their data accordingly. Security is ensured through OAuth authentication and private storage folders.
- Regulatory Requirements:
  - Must comply with applicable local laws governing data privacy and software distribution.
  - Compliance Requirements: Tabitha complies with applicable data protection laws by minimizing data collection and using secure, OAuth-based authentication for cloud syncing. Users' data is stored in private folders accessible only to them. Developers must ensure that any third-party libraries used are compliant with open-source licenses and do not introduce privacy risks.

### 3.2 Project Limitations

These are intentional constraints guiding development:

- Technical Limitations:
  - Must comply with [Chrome extension best practices](https://developer.chrome.com/docs/webstore/best-practices) (e.g., proper API usage, security guidelines, performance optimization) as a baseline, adapting for other browsers as needed.
  - Use popular, well-supported technologies and frameworks to avoid redundant development.
  - Code must be modular, self-documenting, simple, and free of redundancy. Include comments where needed, and preserve existing comments.
  - The extension supports offline functionality using IndexedDB for immediate caching of all user data (Workspaces, Folders, Collections, their contents including assigned tags and custom tag sort order, user settings including custom themes, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting, and Recycle Bin data). To ensure offline access and consistent performance, necessary libraries, icons, and fonts must be bundled. This also minimizes external dependencies, supporting compliance with data privacy regulations.
  - Dependencies: Tabitha will utilize the following open-source libraries to streamline development and ensure cross-browser compatibility. All libraries will be bundled with the extension:
    - Font Awesome (Free): For icons. (SIL OFL 1.1/MIT, GPL 3-compatible)
    - Interact.js: For drag-and-drop functionality. (MIT, GPL 3-compatible)
    - LocalForage: For persistent state management and immediate persistence to IndexedDB. (Apache 2.0, GPL 3-compatible)
    - Fuse.js: For fuzzy search in integrated global search. (Apache 2.0, GPL 3-compatible)
    - Tippy.js: For enhanced tooltips. (MIT, GPL 3-compatible)
    - Mousetrap: For keyboard shortcuts. (Apache 2.0, GPL 3-compatible)
    - Tiptap: For lightweight WYSIWYG editing of Note Item bodies. (MIT, GPL 3-compatible)
    - DOMPurify: For sanitizing HTML content of Note Item bodies before rendering in read-only views, to prevent XSS vulnerabilities. (Mozilla Public License 2.0 or Apache License 2.0, GPL 3-compatible)
    - Material Color Utilities: For generating harmonious color palettes for custom themes from a seed color, assisting in maintaining Material Design aesthetics and accessibility. (Typically Apache 2.0, GPL 3-compatible)
    - Additional libraries for OAuth authentication and cloud storage interaction (e.g., Google API Client Library) will be selected based on compatibility and security considerations.
- Resource Limitations:
  - All components, libraries, and tools must be free and open-source.
- Design Limitations:
  - The UI must resemble that of other popular browser extensions and programs for user familiarity.
  - Design must prioritize consistency, simplicity, and intuitive navigation, avoiding unusual or unconventional patterns.
  - The UI must remain uncluttered.
- Functional Limitations:
  - Must ensure accessibility per [WCAG 2.1 Level AA guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/), including:
    - Keyboard accessibility for all interactive elements, including those revealed on focus.
    - ARIA attributes for screen reader compatibility.
    - Sufficient color contrast ratios.
    - Support for browser zoom and text resizing.
    - Focus management with visible indicators.
    - Testing with accessibility tools and screen readers across supported browsers.

## 4. Development and Design Principles

The development of the Tabitha browser extension is guided by the following principles to ensure a high-quality, user-centric product. These principles must be upheld throughout the development process to align with the goals and objectives outlined in this PRD.

- Design Style: Adhere to Material Design principles for a consistent and modern user interface.
- Language and Tone: Avoid hyperbole in all descriptions and communications. Use third-person pronouns ("the user", "the contributor", "the developer") except when addressing the user directly in messages (e.g., notifications or onboarding).
- User Experience:
    - Ensure the extension is easy, intuitive, and familiar by following established conventions and best practices in web app and extension design. Avoid unusual or unfamiliar methods, and prefer tried and tested approaches to maintain user comfort and ease of use.
    - Minimize user effort with one-click actions where possible. Actions that move items to the Recycle Bin (when retention is > 0 days) do not require confirmation. Critical actions like permanent deletion require explicit confirmation to ensure data safety.
    - Contextual Guidance: Provide guidance and feature explanations 'just-in-time' within the relevant interface context, rather than relying solely on extensive upfront onboarding or separate help documents. This approach minimizes cognitive load and makes learning more intuitive as the user interacts with specific features. This is a guiding principle for how information is presented.
- Consistency: Maintain internal consistency across all features, documentation, and design elements.
- Redundancy: Avoid repeating functionality and descriptions unless clarity demands it.
- Security and Scalability: Prioritize security in all aspects of development to protect user data. Design the extension to scale efficiently with growing user needs and data volumes.
- Adherence to Best Practices: Follow Chrome extension best practices as a foundational standard, adapting appropriately for other supported browsers (e.g., Firefox, Edge, Opera). Avoid deviations from established development and design conventions.
- Development Approach: Use popular, well-supported, free, and open-source technologies and frameworks to streamline development and avoid redundant effort. Ensure code is modular, self-documenting, simple, and free of redundancy, with comments included where necessary and existing comments preserved. Names for Workspaces, Folders, and Collections must not be empty. Similarly, Note Item Titles must not be empty. Emojis are permitted as part of Workspace textual names, Folder names, Collection names (e.g., as a prefix), and Tag names, and as the visual representation for Workspace Components in the Workspaces Panel. A Workspace's textual name (which can include emojis) is distinct from its visual representation (a single user-selected emoji or a two-character abbreviation) displayed in the Workspaces Panel; the full textual name is accessible via tooltip and during editing. Tabitha will not impose specific character restrictions on textual names or tag names beyond any limitations inherent in JSON or the underlying operating system for exports; users are responsible for names that maintain UI aesthetics. Control characters or characters that could interfere with JSON structure or filesystem operations are disallowed or sanitized upon export. Duplicate names for Workspaces, Folders, and Collections are allowed within their respective parent containers; search results and selection dialogs will provide sufficient context (e.g., lineage/path, item counts, or creation dates) to help differentiate items with identical names. There are no explicit length restrictions for names, though excessively long names may impact display aesthetics, which is left to user discretion. Similarly, Note Item Titles (plain text) and Bodies (HTML content) do not have a predefined length limit, though performance with extremely large Note Bodies should be considered. Tag names also do not have explicit length restrictions but will be truncated with a tooltip in the UI if space is limited. Tag definitions within a Workspace can be manually reordered by the user, and this order dictates how tag badges are displayed.

## 5. Hierarchical Structure

The extension organizes content using a clear hierarchical structure consisting of Workspaces, Folders, Collections, and Open Tabs. As emphasized in Section 1.1 and Section 2.1, the persistent organizational hierarchy is intentionally limited: Workspaces are the top-level containers; Workspaces hold Folders; Folders hold Collections; and Collections hold Items (Saved Links or Notes). No deeper levels of nesting, such as sub-folders or sub-collections, are supported. This streamlined structure is designed for simplicity and ease of management.

While users can create multiple Workspaces for different purposes, it is expected that many will find a single Workspace sufficient for their tab and link management. Workspaces are isolated top-level containers, ensuring that Folders and Collections within one Workspace cannot interact with those in another. Workspaces can be sorted by name, last modified date, or manually reordered by the user. Folders can also be sorted by name, last modified date, or manually reordered. Collection Components can be sorted by name, date created, last modified date, item count (if enabled), or manually reordered. Each Workspace contains its own set of tag definitions, which can be manually reordered by the user to control their display sequence. Tags can be applied to Collection Components and, optionally, to individual Items (Saved Links and Notes) within Collections, providing a cross-cutting organizational layer within that Workspace. This structure enables the user to manage distinct projects, themes, or resources efficiently. Each level supports specific user interactions, as detailed in the User Interface section.

## 6. User Interface

### 6.1 UI Overview

Tabitha operates in two user-selectable modes, configurable during onboarding or via global settings:
- New Tab Takeover (default): Replaces the new tab page.
- Dedicated Tab: Runs in a separate tab.
The extension's browser icon serves primarily as a visual identifier and is not designed to provide interactive features through a custom popup window. Any menu or minimal interface appearing upon clicking the icon is standard browser behavior. All core functionality is accessed via Tabitha's New Tab Takeover or Dedicated Tab modes. This design ensures that the extension is fully useful without its icon needing to be pinned to the browser toolbar, allowing users flexibility in managing their toolbar space.

A default Workspace (e.g., "My Workspace," localized if a translation for the detected browser language exists) will be pre-created before the onboarding process begins. Its initial theme will be determined by checking the system's preferred color scheme (light or dark) and applying the corresponding light or dark variant of a neutral predefined Tabitha theme. If the system preference cannot be determined, the light variant of this neutral predefined theme will be used. The onboarding process is primarily for initial configuration and user guidance and does not gate access to the extension. If a user bypasses, skips, or fails to complete onboarding, the pre-created default Workspace remains available.

Note on Interactive Elements: In Tabitha, there are no plain JavaScript button-looking buttons (e.g., default `<button>` elements with standard browser styling). Wherever the term "button" is used in this document, it refers to icon-buttons—icons that, when clicked, function as buttons with a button-like effect and often include visual feedback—or custom-styled text buttons. Icon-buttons are used for most interactive elements (e.g., in panel headers and mini toolbars) to maintain a clean, modern interface. For actions requiring text, such as in popovers or notifications (e.g., "Cancel", "Yes, delete"), custom-styled text buttons are used, designed with CSS to match the extension’s aesthetic (e.g., rounded corners, subtle shadows, hover effects), ensuring consistency and avoiding default browser button styles.

The interface comprises four panels arranged from left to right, each with adjustable widths. All panels, and the content areas within the Tabitha Hub, are designed to disable horizontal scrolling; vertical scrolling is enabled as necessary to accommodate content. Panel width adjustments are saved to local persistence (IndexedDB) immediately for the current Tabitha instance and are also resizable via keyboard controls (see Section 8.1 Accessibility). Other concurrently open Tabitha instances will not reflect these width changes in real-time; the new widths will apply when those other instances are reloaded or when a new Tabitha instance is opened.
- Workspaces Panel: A very narrow list of Workspace Components by default, with width adjustable by dragging its right border.
- Folders Panel: A narrow list of Folder Components within the selected Workspace Component, with width adjustable by dragging its right border.
- Collections Panel: The central panel that automatically expands to fill the remaining space between the Folders and Open Tabs panels. It displays a list of Collection Components within the selected Folder Component. The central area typically occupied by this panel can be dynamically repurposed to display other full-width views, such as the Recycle Bin page or search results, allowing focused interaction without altering the core Workspaces, Folders, and Open Tabs panel layout.
- Open Tabs Panel: A narrow list of browser windows, each containing browser tabs (including Chrome pinned tabs and tab groups), with width adjustable by dragging its left border.

The Workspaces, Folders, and Open Tabs panels can each be collapsed to a minimal visible width of 5 pixels by dragging their respective borders. They will snap to this 5-pixel state if their width is reduced below a certain threshold. Users cannot maintain a persistently visible panel narrower than this 5-pixel minimal state.
When a panel (Workspaces, Folders, or Open Tabs) is collapsed to its 5-pixel state, this narrow strip will be clearly identifiable as an interactive area. It will house a "Reset to default width" icon-button, which is the primary means of restoring the panel. Clicking this icon-button resets only that specific panel to its default width. This ensures each panel's reset control is independent and predictable. The strip itself may be subtly styled with the panel's current theme color to complement the overall interface. Hovering over or focusing on this 5-pixel strip can display a tooltip indicating the panel's name and will further highlight the "Reset to default width" icon-button.

The layout supports left-to-right, right-to-left, and bidirectional locales, adapting the panel arrangement and text direction accordingly. The panel widths are adjustable, and the interface adapts to ensure content remains accessible and the layout stays coherent. Interactions rely on single left clicks, with hidden elements (e.g., checkboxes, mini toolbars) revealed on hover or focus. Mini toolbars appear in the bottom-right corner and close icons in the top-right corner of their respective components or items. The persistence behavior of mini toolbars is detailed in Section 6.3.

All commands in Tabitha have associated keyboard shortcuts, which are user-configurable and detailed on a dedicated Keyboard Shortcuts page.

Persistence: For all panels, their widths are preserved across sessions by being saved immediately to local persistence (IndexedDB) in the current instance; other instances update on reload as described above. Additionally, for the Workspaces, Folders, and Collections panels, the current state (e.g., selection, chosen sort option and direction, or manual drag-and-drop order if applicable, view option, active tag filters, and expand/collapse state) is preserved. The Open Tabs panel reflects the current browser session and does not preserve its internal state across sessions.

### 6.2 Window Modes

Tabitha supports two window modes:
- New Tab Takeover: Replaces the browser's new tab page with the Tabitha interface.
- Dedicated Tab: Runs Tabitha in a separate browser tab. An optional setting allows Tabitha to open automatically in a dedicated tab when the browser starts.

The user selects the mode during onboarding or via the Settings panel, and it applies uniformly to all Workspaces.

### 6.3 General Interactions

This section outlines user interactions within the Tabitha interface to ensure clarity and consistency.

- Single Left Clicks: Used for selecting components, expanding/collapsing collections, and activating actions. For search results, a direct left click on a Saved Link or Note performs its primary viewing action while keeping search results visible.
- Hover and Focus Effects: Reveal hidden elements such as checkboxes and mini toolbars to maintain a clean interface. These elements are revealed on hover for mouse users and on focus for keyboard users. Close icons on Collection Items are also revealed on hover/focus.
- Mini Toolbar Persistence: A mini toolbar appears when the user hovers with the mouse anywhere inside its parent component (e.g., a Workspace Component, Folder Component, Collection Component, Collection Item, or Search Result Item). For keyboard users, the mini toolbar appears when the parent component or an element within its toolbar receives focus. The mini toolbar remains visible as long as the mouse cursor is over the component or over the mini toolbar itself. It disappears when the user hovers anywhere outside this combined area. For keyboard users, it disappears when focus moves outside the component and its toolbar. This behavior applies consistently to all mini toolbars. If a mini toolbar has more than five actions, less frequently used actions may be consolidated into a "More" actions menu (typically represented by a three-dot vertical icon).
- Tooltips: Appear on hover over icons and truncated text (including truncated tag names) to provide brief descriptions of their functions or display full text.
- Drag-and-Drop: Enables reordering of components and items within panels (including reordering tag definitions in their management UI) and moving items between compatible panels.
- Keyboard Shortcuts: Available for quick actions, contextual to the focused panel, and user-configurable. Detailed on the Keyboard Shortcuts page.
- Popover Keyboard Interaction:
    - Closing Popovers: All popovers that have a "Cancel" or dismiss action can be closed by pressing the `Escape` (Esc) key. This typically triggers the popover's cancel action if one exists, or simply dismisses the popover if it's purely informational.
    - Saving/Confirming Actions in Popovers:
        - Primary Action Button: If a popover includes a "Save", "Confirm", "Add", or similar primary affirmative action button, pressing `Enter` or `Space` when this button has focus will activate it.
        - Single Input Field Popovers: In popovers with a single primary text input field (e.g., when renaming an item, entering a new name, or providing a confirmation string for deletion), pressing `Enter` within the input field will typically submit the form and trigger the save/confirm action.
        - Multiple Input Field Popovers: In popovers with multiple input fields (e.g., editing a Saved Link's title, URL, and description; editing a Note's title and body; defining a custom theme), pressing `Enter` within a text input field may move focus to the next logical input field or do nothing, to prevent accidental submission. The primary action (e.g., "Save") must be explicitly triggered by focusing on and activating the "Save" button (using `Enter` or `Space`) or by clicking it.
        - Specific exceptions to these general rules for particular popovers will be noted in their respective sections if necessary.
- Browser Context Menu:
    - Tabitha adds the following items to the browser's global context menu:
        - "Save session": This action saves all open (non-Tabitha) tabs from the current browser window (the window where the context menu was invoked) into a new Collection Component.
            - The new Collection is created in the active Workspace's currently selected Folder in the Folders Panel. If "Starred Collections" is selected, or if no Folder has a prior selection in the current session, it is created in the "My Collections" Folder.
            - The Collection is named by default using the current date and time in a locale-appropriate short format. Saved tab states (e.g., pinned, Chrome tab group affiliation if integration is enabled) are captured.
            - A toast notification (e.g., "Session saved as '[Default Collection Name]'") informs the user. The user can rename the Collection later within the Tabitha interface.
        - "Save Current Tab to Active Collection": This action saves the currently active browser tab (the tab from which the context menu was invoked) as a new Saved Link Item within the currently active Collection in the Collections Panel.
            - The current state of the tab (title, URL, favicon, and other states like pinned status or Chrome tab group affiliation if "Enable Chrome Tab Group Integration" is active) is captured.
            - If no Collection is currently active/selected in the Collections Panel, it defaults to "My Collections", and a toast notification (e.g., "Tab added to My Collections.") will inform the user.
            - The "Prevent duplicates within the same Collection" setting (Section 6.6.3) applies. If enabled and the tab's URL already exists in the active Collection, a toast notification (e.g., "Tab is already in '[Active Collection Name]'.") will inform the user, and the tab will not be re-added.
            - If successful, a toast notification (e.g., "Tab saved to '[Active Collection Name]'") informs the user.
        - "Open Tabitha": This action opens the Tabitha interface according to the user's selected Window Mode (New Tab Takeover or Dedicated Tab). If a Tabitha instance is already open in a dedicated tab, it may open a new instance or focus the existing one, depending on browser behavior and capabilities.

These interactions follow established conventions to ensure the interface is intuitive and familiar, minimizing user effort while maintaining functionality.

### 6.4 Panels and Pages

#### 6.4.1 Workspaces Panel

- Description: A vertical list of Workspace Components, each an isolated container for organizing Folders, Collections, and their associated tag definitions (including custom sort order for tags). It also provides access to the Recycle Bin. Each Workspace has a textual name (which can include emojis) and can be visually represented in this panel by a user-selected emoji or a default two-character abbreviation. If a user provides only two-characters, this overrides the auto-generated abbreviation. If the user clears their custom abbreviation (e.g., deletes the text in the input field in Settings), the representation reverts to the auto-generated abbreviation based on the Workspace name. The textual name and visual representation are distinct; the visual representation is the primary display in this panel, while the full textual name appears in tooltips and edit views.
- Location: Leftmost panel, adjustable in width. Can be collapsed to a 5-pixel strip.
- Content:
  - At the top of the panel:
    - Search icon: Activates the Search UI Bar at the top of the Collections Panel, preparing for a search operation. (Details in Section 6.4.3).
    - Recycle Bin icon: Opens the Recycle Bin page for deleted items. (This icon is hidden if Recycle Bin retention is set to 0 days in Settings).
    - Sort icon: Opens a popover for selecting the sort order of Workspace Components.
    - Add icon: Creates a new Workspace Component, added to the list of Workspaces according to the current sort order or at the bottom if manual order is active. Opens a popover prompting the user to enter a name (must not be empty) and select a theme using options displayed with color swatches representing the theme's primary colors. The user can also set or edit the visual representation (emoji or two-character abbreviation) for the new Workspace. A subtle, persistent hint or an info icon with a tooltip may indicate that emojis are supported in Workspace names and that the full textual name (distinct from the visual emoji/abbreviation) is used for search and identification.
    - Reset width icon: Resets the panel to its default width. (Appears in the 5-pixel strip when collapsed, or in the header if not collapsed).
  - Vertical list of Workspace Components, each displayed by its user-configurable single emoji or two-character abbreviation (e.g., "WO" for Work, "PS" for "Personal Stuff"). The abbreviation is automatically generated based on the Workspace name (first two letters for one-word names, initial letters of the first two words for multi-word names) if no emoji is chosen. The user can customize this representation during creation or via the Edit action. The system allows duplicate visual representations. The coloring of the Workspace Component follows that Workspace Component's theme. A tooltip will display the full textual Workspace name (which may itself contain emojis) on hover.
  - At the bottom of the panel:
    - Status Indicator: A subtle icon that reflects the current sync status, blending with the theme when all changes are synced:
      - Green checkmark: All changes are synced to the cloud.
      - Yellow clock: Changes are saved locally, pending sync.
      - Red exclamation: Sync error or conflict detected.
      - Clicking, hovering over, or focusing on the status indicator displays a popover with detailed information and actions if applicable (e.g., “Retry Sync", “Resolve Conflict”).
    - Help icon: Opens the Tabitha Hub with the Help tab active, with the Settings tab visible and accessible (Font Awesome `fa-question-circle`, tooltip: “View Help”).
    - Settings icon: Opens the Tabitha Hub with the Settings tab active, with the Help tab visible and accessible (Font Awesome `fa-cog`, tooltip: “Adjust Settings”).
- Functionality:
  - The width of the Workspaces panel can be adjusted by dragging its right border or via keyboard. It can be collapsed to a 5-pixel strip as described in Section 6.1.
  - Clicking a Workspace Component selects it, updating the Folders Panel to show only the Folder Components within that Workspace Component. If no Folder Component is pre-selected, it defaults to "My Collections".
  - Each Workspace Component is self-contained, with its own Folder Components, Collection Components, tag definitions (including their custom sort order), theme, and Recycle Bin.
  - The panel always includes at least one Workspace Component, initially named using a default (e.g., "My Workspace," localized if applicable) and represented by "MW" (or localized equivalent) or a default emoji, ensuring the interface is immediately usable.
  - Search: Clicking the Search icon in this panel's header activates the Search UI Bar in the Collections Panel (see Section 6.4.3 for full details). This Search UI Bar allows the user to define search scope, enter queries, and view results within the Collections Panel area. The system intelligently pre-selects the search scope based on the currently selected Folder or Collection, if any, but the user can always adjust this.
  - Recycle Bin: Clicking the Recycle Bin icon (if visible) opens the Recycle Bin page (Section 6.4.5), replacing the Collections panel, displaying a list of deleted items for the current Workspace.
  - Sort: Clicking the Sort icon opens a popover with options to sort Workspace Components:
    - Manual (Drag & Drop Order): Default. Allows users to reorder Workspaces manually. This order is re-established by dragging a Workspace Component if another sort order was active.
    - Name (Alphanumeric A-Z): Sorts Workspaces alphabetically by their textual name, ascending.
    - Name (Alphanumeric Z-A): Sorts Workspaces alphabetically by their textual name, descending.
    - Last Modified Date (Newest First): Sorts Workspaces by their last modified date, with the most recently modified at the top.
    - Last Modified Date (Oldest First): Sorts Workspaces by their last modified date, with the least recently modified at the top.
    - Clicking an active sort option (e.g., Name, Last Modified Date) in the popover again reverses its direction.
    - A Workspace's `lastModifiedDate` is updated whenever: a direct user action on the current device modifies the Workspace's name, visual representation, or theme; when Folders or Collections within it are added, deleted, renamed, reordered, or their content changes due to direct user action; when Items within its Collections are added, deleted, or their content (including assigned tags or saved tab states) changes due to direct user action; or when its tag definitions (name, color, custom sort order) are modified by direct user action. It is also updated when the sync process applies changes to the Workspace or its contents that originated from a user action on a different device. The act of merely syncing data that results in no net change (e.g., local data was already up-to-date) does not update the `lastModifiedDate`.
  - Add: Creates a new Workspace Component.
  - Default: Contains at least one Workspace Component.
  - Persistence: The last selected Workspace Component and the chosen sort option (and direction) for Workspaces remain selected/active on browser reopen. If sorted by "Last Modified Date", the list dynamically reorders as modifications occur.
  - Clicking the Help or Settings icon navigates to the Tabitha Hub, rendering the Help and Settings tabs with the respective tab active; the Welcome tab is hidden unless onboarding or re-triggered. On first launch, the hub automatically opens with only the Welcome tab visible, hiding Help and Settings tabs.

#### 6.4.2 Folders Panel

- Description: The Folders Panel displays a vertical list of Folder Components that organize Collection Components.
- Location: Narrow vertical list to the right of the Workspaces Panel, adjustable in width. Can be collapsed to a 5-pixel strip.
- Content:
  - Header:
    - Top Line: Displays as much of the selected Workspace Component’s name as fits. A tooltip displays the full name on hover if truncated.
    - Second Line: Text "Folders" with Sort, Add, and Reset width icons right-justified. (Reset width icon appears in the 5-pixel strip when collapsed, or in the header if not collapsed). When adding a Folder, a subtle, persistent hint or an info icon with a tooltip may indicate that emojis are supported in Folder names.
  - List:
    - Third Line: "Starred Collections" (fixed Folder Component, non-deletable, displays all starred Collection Components in the Workspace Component when selected, positioned at the top; name localized if translation exists). This Folder is displayed by default but can be hidden via a setting in the Settings panel (Section 6.6.3). If hidden, it is not rendered in this list, and the "My Collections" Folder will appear as the topmost fixed Folder. Initially empty in a new Workspace.
    - Fourth Line: "My Collections" (fixed Folder Component, renamable but non-deletable, serves as the default Folder Component for new Collection Components, positioned below "Starred Collections" when "Starred Collections" is visible, otherwise it is the topmost fixed Folder in the panel; name localized if translation exists). Its role is preserved even if renamed, as it's tied to an internal identifier, and its fixed position aids identification. Initially empty in a new Workspace.
    - Below: List of user-added, sortable Folder Components (e.g., "Social Media", "Research"), truncated with '...' if names are too long to fit within the panel width; a tooltip displays the full name on hover. Folder names can include emojis. When a Folder Component is selected, its emoji and full name are displayed in the Collections Panel header.
- Functionality:
  - The width of the Folders panel can be adjusted by dragging its right border or via keyboard. It can be collapsed to a 5-pixel strip as described in Section 6.1.
  - Clicking a Folder Component selects it, updating the Collections Panel with its Collection Components. If the Search UI Bar is active in the Collections Panel, clicking a Folder will clear the active search, hide the Search UI Bar, and display the selected Folder's Collection Components.
  - Sort: Clicking the Sort icon opens a popover for selecting the sort order for user-added Folder Components. "Starred Collections" and "My Collections" remain fixed at the top. Options include:
    - Custom (Drag & Drop Order): Default. Allows users to reorder user-added Folders manually. This order is re-established by dragging a Folder Component if another sort order was active.
    - Name (Alphanumeric A-Z): Sorts user-added Folders alphabetically by name, ascending.
    - Name (Alphanumeric Z-A): Sorts user-added Folders alphabetically by name, descending.
    - Last Modified Date (Newest First): Sorts user-added Folders by their last modified date, with the most recently modified at the top.
    - Last Modified Date (Oldest First): Sorts user-added Folders by their last modified date, with the least recently modified at the top.
    - Clicking an active sort option (e.g., Name, Last Modified Date) in the popover again reverses its direction.
    - A Folder Component's `lastModifiedDate` is updated whenever: its name is changed by direct user action on the current device; Collection Components within it are added, deleted, or reordered by direct user action on the current device; a Collection Component is moved into or out of this Folder by direct user action on the current device; or the `lastModifiedDate` of any Collection Component within it is updated (reflecting changes to that Collection's properties, items, or tags). It is also updated when the sync process applies changes to the Folder itself or its contents that originated from a user action on a different device. The act of merely syncing data that results in no net change does not update the `lastModifiedDate`.
  - Add: Creates a new Folder Component in the selected Workspace Component, added according to the "Folder/Collection Add Position" setting (Section 6.6.3). The popover for entering the name will include a subtle hint or info icon indicating emoji support for Folder names.
  - Drag-and-Drop: Allows reordering user-added Folder Components only within the panel, automatically setting the sort order to Custom.
  - Persistence: The last selected Folder Component and the chosen sort option (and direction) for Folders remain selected/active on browser reopen. If sorted by "Last Modified Date", the list dynamically reorders as modifications occur.

#### 6.4.3 Collections Panel

- Description: Widest panel in the center of the interface, positioned between the Folders and Open Tabs panels, serving as the primary workspace for managing content. It displays Collection Components within the currently selected Folder Component. Each Collection Component organizes Collection Items, which are either Saved Link Items or Note Items. The area occupied by this panel can be dynamically repurposed to display other full-width views, such as the Recycle Bin page, or serve as the display area for search results.
- Location: Central panel, occupies the remaining space.
- Content:
  - Standard Collections Panel Header (always visible at the top of the Collections Panel):
    - Top Line: Displays the full name of the selected Folder Component (initially "My Collections," localized if applicable) and the number of Collection Components in that Folder Component.
    - Second Line - Toolbar: Text and icons for Sort, Tag Filter, View (List, Cards, Compact, Board, Grid), Expand/Collapse All, Add, Import. If the toolbar items exceed the panel width, they will wrap to a new line.
        - When search is not active: Active tag filters (from the Tag Filter control) are displayed here. A count of Collection Components matching the active filter will also be displayed.
        - When search is active (and the Search UI Bar is visible below this toolbar):
            - The Sort control applies to the search results (see "Functionality -> Search Functionality -> Interacting with Search Results" for details on sorting search results).
            - The Tag Filter control is disabled, and its display of active filters/counts is hidden, as filtering logic is handled by the Search UI Bar.
            - The View control applies to the search results.
            - Expand/Collapse All applies to search results if they consist of expandable items (e.g., Collection Components).
            - Add and Import actions remain available and pertain to the currently selected Folder in the Folders Panel.
  - Search UI Bar (appears when search is active):
    - Activated by clicking the Search icon in the Workspaces Panel header. This bar appears directly below the standard Collections Panel Header/Toolbar and above the main content area where search results will be displayed.
    - Contents:
        - Search Input Field: For entering search queries.
        - "Search In" Radio Buttons: These allow the user to define the primary scope of the search.
            - (o) `All`: (Default when search is activated). Searches across the entire current Workspace.
            - ( ) `Folder`: Allows selection of a Folder from the current Workspace (e.g., via a dropdown that lists available Folders, pre-filled with the currently selected Folder if any).
            - ( ) `Collection`: Allows selection of a Folder, then a Collection within that Folder (e.g., via dropdowns, pre-filled with the currently selected Collection if any).
            - ( ) `Open Tabs`: Searches URLs and titles of currently open browser tabs.
        - "Search For" Radio Buttons (refines what fields are searched within the selected "Search In" scope; these are disabled/irrelevant when "Search In: Open Tabs" is selected):
            - (o) `All Information` (Default. Searches names/titles of Folders, Collections, Items; content details like URLs, descriptions, Note bodies; and all assigned tags).
            - ( ) `Names/Titles Only` (Searches only Folder names, Collection names, Saved Link titles, Note titles).
            - ( ) `Collection Names Only` (Searches exclusively Collection names. Results will only list matching Collection Components. This option is primarily intended for use with "Search In: All" or "Search In: Folder" scopes).
            - ( ) `Content Details Only` (Searches Saved Link URLs/descriptions, Note bodies. Excludes names/titles and tags).
            - ( ) `Tags Only` (Searches assigned Collection tags and Item tags. Item tags searched only if item-tagging is enabled).
            - ( ) `Saved Link Details Only` (Searches Saved Link titles, URLs, descriptions, and their assigned item tags if item-tagging enabled. Excludes Folders, Collections not containing matching Saved Links, and all Notes).
            - ( ) `Note Details Only` (Searches Note titles, bodies, and their assigned item tags if item-tagging enabled. Excludes Folders, Collections not containing matching Notes, and all Saved Links).
        - Additional Search Options Checkboxes:
            - `[ ] Match whole word only` (Default: Unchecked)
            - `[ ] Exclude matches in Folder and Collection names` (Default: Unchecked. If checked, results where the query only matches a Folder or Collection name are excluded; content within them is still searched based on other criteria).
        - Special Mode Checkbox:
            - `[ ] Find Duplicates Instead` (Default: Unchecked. When checked, the main search query input and "Search For" radio buttons are disabled/irrelevant. The "Search In" scope determines where to find duplicate Saved Link Items based on normalized URLs, and duplicate Note Items based on exact match of Title and Body content. Open Tabs cannot be searched for duplicates. The "Exclude matches in Folder and Collection names" and "Match whole word only" checkboxes are also disabled/irrelevant in this mode).
        - "Clear Search / Exit Search Mode" (X) icon-button: Located to the right within the search input field. Clears the current query and results, hides the Search UI Bar, and returns the Collections Panel to displaying the content of the previously (or currently) selected Folder.
  - Main Content Area (Collections List or Search Results List):
    - If Search UI Bar is not active: Displays the list of Collection Components for the selected Folder.
        - If the selected Folder Component is empty, the Collections Panel displays a message like "No Collections yet. Add Collections to this Folder to see them here". along with an Add icon that is functionally identical to the Add icon in the panel header. Specifically, if the "Starred Collections" Folder is selected and no Collection Components in the current Workspace are starred, the Collections Panel displays a non-interactive message: "No starred Collections yet. Use the ☆ icon on any collection to add it to this view."
        - Pinned Collection Components are displayed at the top, sorted by the order they were pinned (most recent at the top).
        - Unpinned Collection Components appear below, sorted according to the selected sort option.
    - If Search UI Bar is active: This area becomes the "Search Results" display, appearing below the Search UI Bar.
        - Initially, before a query is entered or if the query yields no results (unless "Find Duplicates Instead" is active), it is empty or displays brief contextual help for using the search feature (e.g., "Enter your search query above and configure scopes and options.").
        - As the user types in the Search Input Field and configures scopes/options in the Search UI Bar, this area dynamically populates with a list of matching results.
        - Each search result item displays:
            - An icon/favicon indicating its type (Folder, Collection, Saved Link, Note, Open Tab).
            - Its name/title.
            - Its lineage/path/context within Tabitha (e.g., "Folder: Work, Collection: Work / Project Alpha, Item: Work / Project Alpha / Design Document" or "Open Tab: Window 2 / Tabitha PRD - Google Docs").
            - Matching terms within the displayed name/title, path, or snippets (e.g., from Note bodies or descriptions) are visually highlighted.
        - The View options (List, Cards, Compact, Board, Grid) from the standard Collections Panel toolbar can be used to change the display format of these search results. "List View" is the default display format for search results. Other view options (Cards, Compact, Board, Grid) can be applied to the search results list. The selected view reverts to the global setting for non-search display when search is closed.
        - When `Search For: Collection Names Only` is active, the search results list will consist exclusively of Collection Components whose names match the query. By default, these Collection Components will be displayed in a collapsed state to facilitate quick identification and navigation. The user can expand any Collection Component to view its contents. Standard View options (List, Cards, Compact, Board, Grid) and Sort options (Alphanumeric, Date Added/Created, Last Modified Date, Lineage/Path) remain applicable to this list of Collection Components.
        - Search results are sortable by criteria such as Alphanumeric (name/title), Date Added/Created, Last Modified Date (if available and consistently sortable across different item types in results), or Lineage/Path. If search results are displayed in "List View", relevant column headers become clickable to set or reverse sort order. For other views, the Sort control in the Collections Panel toolbar is used. Drag & Drop Order is not applicable to search results.
        - When "Find Duplicates Instead" is active:
            - If the "Search In" scope is `All`: The results area displays a flat list of duplicate Saved Link Items and/or Note Items. Each instance is shown with its full path/context, icon, and name/title. The standard View options (List, Cards, Compact, Board, Grid from the Collections Panel toolbar) apply to this list, with "List View" serving as the default display format for these results.
            - If the "Search In" scope is `Folder`:
                - The Collections Panel displays Collection Components within the selected Folder. This display temporarily defaults to List View, overriding the globally selected View option for the duration of this specific duplicate search.
                - Only Collection Components that contain duplicate Items are displayed and are automatically expanded to show their contents.
                - Collection Components within the selected Folder that do not contain any duplicate Items are not shown, or are collapsed and visually de-emphasized, to focus the view on relevant duplicates.
                - Within the displayed (duplicate-containing) Collection Components, duplicate Saved Link Items or Note Items are shown normally with their checkboxes available for selection. Non-duplicate items within these Collections are visually de-emphasized (e.g., greyed out). Both duplicate and non-duplicate items remain fully interactive and when hovered/focused reveal their mini toolbars and checkboxes.
            - If the "Search In" scope is `Collection`:
                - The Collections Panel displays Items within the single selected Collection Component. This display temporarily defaults to List View, overriding the globally selected View option for the duration of this specific duplicate search.
                - Duplicate Saved Link Items or Note Items are shown normally with their checkboxes available for selection. Non-duplicate items within these Collections are visually de-emphasized (e.g., greyed out). Both duplicate and non-duplicate items remain fully interactive and when hovered/focused reveal their mini toolbars and checkboxes.
            - For all "Find Duplicates Instead" scopes, identified duplicate items are primarily interacted with via their checkboxes for batch deletion. Individual duplicate items, when hovered or focused, will also reveal a mini toolbar (consistent with standard search result items as per Section 6.4.3 Functionality -> Interacting with Search Results -> Mini Toolbar on Search Result Item). This allows actions like "Go to Item's Location" for further inspection or context before deciding on deletion, "Edit Item", or a direct "Move to Recycle Bin" for that single item. However, complex drag-and-drop reorganization or merging operations are not directly supported within this specialized duplicate identification view; such actions are intended to be performed in the standard UI after navigating to an item's location if it's determined not to be a deletable duplicate.
        - Hovering over or focusing on a search result item reveals a checkbox to its left. Selecting one checkbox opens all others and reveals a Select All checkbox at the top of the results list. Selecting one or more search result items reveals a popover at the bottom-middle of the Collections Panel with relevant batch actions (e.g., Delete selected, Export selected, Merge selected Collections/Items, Add selected Open Tabs to Collection).
            - When merging items from search results (and the "Find Duplicates Instead" mode is not active): the first selected item in the search results list acts as the target for the merge. If merging Saved Links would create duplicates in the target Collection, those duplicates are skipped, and a toast notification informs the user. Note Items are not appended into existing Note Items but are added as separate items to the target Collection. The "Prevent duplicates within the same Collection" setting (Section 6.6.3) applies if the target is a Collection.
- Functionality:
  - Search Functionality:
    - Clicking the Search icon in the Workspaces Panel header activates the Search UI Bar below the standard Collections Panel Header.
    - The Collections Panel content area below the Search UI Bar displays results.
    - As the user types and adjusts scopes/options in the Search UI Bar, the results list updates. Fuse.js provides fuzzy matching capabilities based on its default configuration. For multiple search terms, the system defaults to AND logic. Users can employ advanced query syntax:
        - Enclosing a phrase in double quotes (e.g., `"project alpha"`) signals an exact phrase match requirement; this phrase itself will not be subject to fuzzy matching by Fuse.js. Other unquoted terms in the query will still be handled by Fuse.js's fuzzy matching.
        - Using `|` or `OR` for OR logic between terms or phrases.
        - Using `^` or `NOT` to negate terms; the term following `NOT` will still be subject to Fuse.js's fuzzy matching (e.g., `NOT report` would exclude items that fuzzily match "report").
        - These advanced syntax options will be explained via a small, persistent help text or tooltip associated with the Search Input Field within the Search UI Bar. Fuse.js capabilities determine the extent of advanced syntax support.
    - The "Search In" radio button/dropdown intelligently pre-selects based on the currently active Folder or Collection in the main UI when search is activated, but the user can always override this.
    - The "Search For" options are contextually relevant to the selected "Search In" scope. For instance, when "Search In: Open Tabs" is selected, the "Search For" radio buttons are disabled as the search inherently targets tab titles and URLs. Similarly, the "Collection Names Only" option under "Search For" is most effective with broader "Search In" scopes like "All" or "Folder"; it may be disabled or less relevant if "Search In" is already narrowed to a specific "Collection".
    - Interacting with Search Results:
        - The list of search results in the Collections Panel is interactive. The search results list remains visible during these interactions unless an action explicitly clears the search.
        - Direct Left-Click on a Search Result Item:
            - If the result is a Saved Link Item: Opens the URL in a new browser tab. The search results list remains visible.
            - If the result is a Note Item: Opens the Note content in a popover for viewing (WYSIWYG editor in read-only mode). The search results list remains visible. The popover will have a close mechanism.
            - If the result is a Folder Component or Collection Component: A direct left-click selects the item within the search results list (e.g., for subsequent batch actions via its checkbox if revealed). It does not navigate away or clear the search results.
            - If the result is an Open Tab: Focuses the actual browser tab. The search results list remains visible.
        - Mini Toolbar on Search Result Item (appears on hover or focus):
            - Provides access to secondary actions. Single left-click on an action in the mini toolbar performs the action.
            - Available actions (contextually shown based on item type):
                - `Go to Item's Location`: The Search UI Bar and results list remain visible. The main UI (Folders Panel, and the Collections Panel area conceptually behind the search results overlay) navigates to show the item in its actual hierarchy. The item is scrolled to and highlighted or focused.
                - `Edit Item`: Opens the standard edit popover for the item (Folder name, Collection name, Saved Link details, Note title/body). After saving/canceling, the search results list remains visible, potentially updated if the item's content or name changed relevant to the query.
                - `Tag Item/Collection...` (if applicable, for Folders, Collections, or Items if item-tagging is enabled).
                - `Copy Link/Text/Name`.
                - `Move to Recycle Bin`: Item is removed from search results and active hierarchy. Confirmation for permanent deletion applies if Recycle Bin retention is 0.
            - For "Open Tabs" scope results, the mini toolbar includes:
                - `Add to Collection...`: Opens a popover to select a destination Folder/Collection to save the link. The "Prevent duplicates within the same Collection" setting (Section 6.6.3) applies.
        - Sorting Search Results: When search is active, the Sort control in the Collections Panel header applies to the search results. Criteria include Alphanumeric (name/title), Date Added/Created, Last Modified Date (if metadata consistently available), Lineage/Path. If results are in List View, relevant column headers are clickable to set/reverse sort. Drag & Drop Order is not applicable.
    - "Find Duplicates Instead" Mode in Search UI Bar:
        - When this checkbox in the Search UI Bar is selected, the main search query input field and some other search options are disabled/irrelevant.
        - The "Search In" scope (e.g., All, Folder, Collection) determines where to look for duplicate Saved Link Items (based on normalized URLs per Section 6.6.3) and duplicate Note Items (based on exact match of Title and Body).
        - Results display as described under "Main Content Area" for this mode. Identified duplicate items are primarily interacted with via their checkboxes for batch deletion. Individual duplicate items, when hovered or focused, also reveal a mini toolbar (consistent with standard search result items) allowing actions like "Go to Item's Location", "Edit Item", or direct "Move to Recycle Bin".
        - Checkboxes appear next to each duplicate instance in the results. By default, for each set of duplicates, all but the first instance (according to the current sort order of the search results) are pre-checked for deletion.
        - A popover appears at the bottom-middle of the Collections Panel with a "Delete Selected Duplicates" custom-styled text button and a "Cancel" button. Activating deletion moves the checked items to the Recycle Bin (or permanently deletes them if retention is set to 0, with appropriate confirmation).
    - Exiting Search Mode:
        - Clicking the "Clear Search / Exit Search Mode" (X) icon-button in the Search UI Bar.
        - Clicking any item (e.g., a Folder) in the Folders Panel.
        - Clicking anywhere outside the active Search UI Bar and the search results list area (e.g., in the Workspaces Panel, Open Tabs Panel) will clear the search, hide the Search UI Bar, and return the Collections Panel to its normal Folder content view.
  - Standard Panel Functionality (when Search UI Bar is not active):
    - The Collections panel automatically adjusts its width to fill the remaining space between the Folders and Open Tabs panels.
    - Sort: The Sort icon in the Collections Panel toolbar opens a popover allowing selection of the primary sort criterion for Collection Components. Pinned Collection Components always remain at the top, sorted by the order they were pinned.
        - Available criteria:
            - Custom (Drag & Drop Order): Default. This order is re-established by dragging a Collection Component if another sort order was active.
            - Name (A-Z): Sorts alphabetically by name, ascending.
            - Name (Z-A): Sorts alphabetically by name, descending.
            - Date Created (Newest First): Sorts by creation date, newest first.
            - Date Created (Oldest First): Sorts by creation date, oldest first.
            - Last Modified Date (Newest First): Sorts by last modified date, newest first.
            - Last Modified Date (Oldest First): Sorts by last modified date, oldest first.
            - Item Count (Largest First): Sorts by total item count, largest first. (Only available if "Display item count on Collections" setting is enabled).
            - Item Count (Smallest First): Sorts by total item count, smallest first. (Only available if "Display item count on Collections" setting is enabled).
        - If "List View" is active, column headers for Name, Date Created, Last Modified Date, and Item Count (if enabled and visible) become clickable. Clicking a column header sets it as the active sort criterion (ascending by default or toggling if already active and descending) and sorts accordingly. Clicking the same active column header again reverses the direction.
        - For other Views (Cards, Compact, Board, Grid), or when "Custom (Drag & Drop Order)" is selected, sorting is managed via the popover. Clicking an active sort option in the popover again (for applicable criteria like Name, Date, Count) reverses its direction.
        - A Collection Component's `lastModifiedDate` is updated whenever: its name, pin/star status, assigned tags, "Per-Collection View Override" settings, or internal item sort order is changed by direct user action on the current device; Items within it are added, deleted, reordered, or their content (e.g., Saved Link URL/title/description/state, Note title/body, item tags) is modified by direct user action on the current device. It is also updated when the sync process applies changes to the Collection or its Items that originated from a user action on a different device. The act of merely syncing data that results in no net change does not update the `lastModifiedDate`.
    - Tag Filter: (Via standard Collections Panel toolbar, disabled when search is active) For filtering Collections/Items by assigned tags when not in search mode. This popover is also the primary interface for managing tag definitions for the Workspace, including creating new tags, editing existing tags (name, color), deleting tags, and reordering tags via drag-and-drop.
    - View: Opens a popover with five icon-buttons (List, Cards, Compact, Board, Grid). This selection sets the default global view for all Collection Components. If search is active, these View options apply to the display of search results, with "List View" being the default for search, and the selected view reverts to the global setting for non-search display when search is closed.
    - Expand/Collapse All: Expands or collapses all Collection Components (when not in search mode) or applicable search results.
    - Add: Creates a new Collection Component in the selected Folder.
    - Import: Allows import of Collections into the selected Folder.
    - Maximize Panel: Maximizes Collections Panel width.
    - Drag-and-Drop: Allows reordering Collection Components (when not in search mode).

#### 6.4.4 Open Tabs Panel

- Description: Displays a list of browser windows, each representing an actual open browser window and its browser tabs, including Chrome pinned tabs and tab groups. Updates in real-time reflecting browser state changes instantly.
- Location: Narrow panel on the right, adjustable in width. Can be collapsed to a 5-pixel strip.
- Content:
  - Header:
    - Top Line: "Open Tabs" with Reset width icon-button on the left. (Reset width icon appears in the 5-pixel strip when collapsed, or in the header if not collapsed).
  - List:
    - List of all open browser windows and their browser tabs. "Window 1" always refers to the browser window currently hosting that specific instance of the Tabitha UI and is listed at the top. Other open browser windows are numbered sequentially (Window 2, etc.) based on their opening order; if an intermediate window closes, subsequent windows are renumbered (e.g., Window 3 becomes Window 2). This sequential renumbering aligns with common browser behaviors and user expectations, avoiding potentially confusing gaps in numbering. Browser tabs listed beneath each browser window with favicons and titles. Excludes any instances of Tabitha and updates in real-time.
    - Browser Window: Each browser window is labeled sequentially (e.g., "Window 1", "Window 2"). The label is on the left, showing "Window N (X tabs)" where N is its number and X is the tab count. Save and Close icons are to the right.
    - Browser Tab: Favicon, title (truncated to fit). When hovered over or focused, a tooltip below gives full name, a checkbox under the favicon is revealed, and a close icon appears in the top-right corner. Pinned tabs in Chrome are marked with a pin icon next to the favicon.
    - Chrome Tab Groups: In Chrome, tab groups are displayed within their respective browser windows. Each tab group is represented as a collapsible section within the browser window, showing the tab group's name and color. The count of tabs within that group (e.g., '(X tabs)') will be displayed alongside its name. If the "Enable Chrome Tab Group Integration" setting is active (Section 6.6.3), an additional "Save Group as Collection" icon-button is present on the tab group's title bar. Tabs within a tab group are indented under the group header.
  - Initial State: When the Open Tabs panel is loaded, all browser windows are initially shown expanded. If Window 1 (the window containing the Tabitha UI) has no other user tabs open (only the Tabitha tab itself, which is excluded from display), it will display a message such as "No tabs in this window".
- Functionality:
  - The width of the Open Tabs panel can be adjusted by dragging its left border or via keyboard. It can be collapsed to a 5-pixel strip as described in Section 6.1.
  - Browser tabs (including pinned tabs), tab groups (Chrome), or entire browser windows can be dragged individually from this panel to a Collection Component in the Collections Panel to create Saved Link Items.
  - Additionally, users can select multiple open tabs (including pinned tabs) for a batch drag-and-drop operation to a Collection Component. This selection of multiple tabs can be achieved by:
    - Clicking the individual checkboxes that are revealed on hover or focus for each tab.
    - Using standard multiple-selection interactions directly on the tab items in the list (e.g., Ctrl+click, Shift+click on the tab's entry), if supported by the platform and providing an intuitive experience.
  Once a batch of tabs is selected by either method, it can be dragged to a Collection Component. This action will create multiple Saved Link Items. The "Prevent duplicates within the same Collection" setting (Section 6.6.3) will apply; if enabled, duplicate links from the batch will not be added, and a toast notification will inform the user.
  - Browser tabs can also be reordered within or between browser windows in the Open Tabs panel, reflecting and causing changes in the actual browser window; browser windows themselves cannot be rearranged in this panel.
  - Drag-and-Drop: Browser tabs can be reordered within or between window listings in the panel, updating the actual browser window accordingly. Browser windows, browser tabs (individually or as a selected batch formed by either checkbox or direct multi-selection), pinned tabs, and Chrome tab groups can be dragged to a Collection Component in the Collections Panel to create Saved Link Items, capturing their current state (e.g., pinned, Chrome tab group affiliation if "Enable Chrome Tab Group Integration" setting is active).
  - Chrome Pinned Tabs: In Chrome, pinned tabs are displayed with a pin icon and can be dragged individually or as part of a multiple selection to a Collection Component in the Collections Panel to create Saved Link Items, capturing their pinned state.
  - Chrome Tab Groups: In Chrome, tab groups are displayed within their respective browser windows. If the "Enable Chrome Tab Group Integration" setting is active:
    - The user can drag individual tabs or entire tab groups to a Collection Component in the Collections Panel to save them as Saved Link Items, preserving their group affiliation (name and color) and other states (e.g., pinned) with each saved link.
    - A "Save Group as Collection" icon-button on the tab group's title bar allows the user to save all tabs in that group into a new Collection Component. This new Collection is created in the currently selected Folder (or "My Collections" if none selected/applicable), named after the tab group, and populated with Saved Link Items for each tab, preserving their states including group affiliation. The process mirrors the "Save" action for a Browser Window (Section 6.5.5), including the immediate rename prompt for the new Collection.
  - Expand/Collapse State Management:
    - Each instance of the Open Tabs panel (e.g., in different windows or tabs) maintains its own expand/collapse state for the browser windows. Modifying the state in one Tabitha instance will not affect the display in other Tabitha instances.
    - When a new browser window is created:
      - In the Open Tabs panel of the new window, all browser windows are shown expanded.
      - In the Open Tabs panels of all existing windows, the new browser window is added and shown expanded, while the expand/collapse state of other browser windows remains unchanged.
  - Persistence: The expand/collapse state of browser windows in the Open Tabs panel is not persisted across browser sessions. Each time the extension is loaded, the Open Tabs panel starts with all browser windows expanded.

#### 6.4.5 Recycle Bin Page

- Description: A dedicated page displaying deleted items (Folders, Collections, Saved Links, Notes) for the current Workspace, accessible via the Recycle Bin icon in the Workspaces panel (if retention > 0 days). Items remain in the Recycle Bin for a user-configurable period (0 to 30 days, default 30) before permanent deletion.
- Location: Replaces the Collections panel when activated.
- Content:
  - Header:
    - Title: “Deleted - Items older than (number) days are permanently deleted", where (number) reflects the user’s Recycle Bin retention setting (e.g., 30). The total count of items currently in the Recycle Bin for the active Workspace (e.g., '(X items)') will be displayed after this title.
    - Non-clickable Recycle Bin icon preceding the title for visual consistency.
    - Search Input Field: An input field for searching/filtering the list of deleted items by item name/title, original path, URL (for Saved Links), Note body content, or their original tags. Uses Fuse.js for fuzzy matching.
    - Empty Recycle Bin icon-button: Appears right-justified (or left of search input in RTL) if the Recycle Bin contains items, allowing permanent deletion of all items in the current Workspace's Recycle Bin.
  - List:
    - A vertical list of deleted items, ordered by most recent deletion at the top. This list is filtered based on the search input.
    - Each item displays:
      - Left: Favicon or icon indicating the item type (e.g., Folder icon for Folders, Collection icon for Collections, website favicon for Saved Links, note icon for Notes). A checkbox is revealed on hover/focus over the item (replacing icon/favicon).
      - Middle: Title displaying the item's name and its original hierarchical path within the Workspace at the time of deletion (e.g., “Collection: Original Folder Name / Collection Title”). For Note Items, this refers to the Note title. Any original tags associated with the item are also displayed here (in their original user-defined sort order). The deletion date and time are displayed after the title in a human-readable, locale-aware format (e.g., UK: dd Mon YYYY, HH:mm:ss).
      - Right: “Open” icon-button (Font Awesome `fa-external-link-alt`, tooltip: “Open in new tab”). This icon-button is present only for deleted Saved Link Items and Note Items. For Saved Links, it opens the URL in a new browser tab. For Notes, it opens the note content (Title and Body) in a popover for viewing (the WYSIWYG editor will be in read-only mode). This option is not present for deleted Folder or Collection items.
    - Visual Highlighting: When an item in the list is hovered over or focused, that item, along with all its direct parents and all its descendants currently present in the Recycle Bin, will be visually highlighted (e.g., with a subtle background color change) to indicate their lineage. This hover/focus highlighting is purely a visual aid and remains active when an item is selected via its checkbox. Once an item is selected by checkbox, the visual state persists, and hover/focus highlighting doesn't apply to other items until the item is deselected, restored, or permanently deleted.
    - Selection Interaction for Batch Operations:
    - Selecting one or more checkboxes reveals a popover at the bottom-middle with custom-styled text buttons: “Cancel", “Restore", and “Permanently delete?”
    - If no items exist (or no search results match), the page displays: “No deleted items.” or “No matching deleted items.” respectively.
  - Footer: A subtle note: “Items are permanently deleted after (number) days. Adjust in Settings.”
- Functionality:
  - If the retention period is set to 0 days, items are permanently deleted immediately. The standard deletion actions throughout the application will trigger specific tiered confirmation prompts appropriate to the severity of data loss (detailed in sections 6.5.1, 6.5.2, 6.5.3, 6.5.4), instead of moving items to the Recycle Bin. The "Permanently Delete" action within the Recycle Bin page itself (when retention > 0) remains a direct permanent deletion with its own confirmation.
  - Navigation: Clicking the Recycle Bin icon in the Workspaces panel opens the Recycle Bin page within the central content area. Clicking another Workspace or navigating elsewhere (e.g., to view Collections in a Folder by selecting a Folder in the Folders panel) closes the Recycle Bin page and restores the Collections panel view.
  - Search:
    - The search input field in the header allows users to filter the list of deleted items based on their original name/title, original hierarchical path (with fuzzy matching for path segments), URL (for Saved Links), Note body content, and their original tags.
    - As the user types, the list of deleted items updates dynamically, filtering to show only matching items. The number of matching deleted items will be displayed (e.g., 'X results found') near the search input field.
    - Items in the Recycle Bin can be searched by their original tag name strings, even if the tag definition has since been deleted from the active Workspace.
  - Item Management:
    - Restore:
        - Moves all selected items (including their auto-selected parents currently in the Recycle Bin) back to the active hierarchy.
        - If a parent entity (e.g., Folder or Collection) required for an item's original path is not in the Recycle Bin and also no longer exists in the active hierarchy, it will be re-created. These re-created parent entities will use their original names. If an active entity with the exact same name already exists at that path, the re-created parent will be named uniquely (e.g., "Original Collection Name (Restored YYYY-MM-DD HH:MM:SS)").
        - Restored items (Folders, Collections, Saved Links, Notes) will visually adopt the theme of the Workspace they are restored into. Their original tags (and their Workspace's custom tag sort order) are also restored.
        - Items are restored to their original path or the closest available path if full re-creation was necessary.
        - A toast notification will inform the user of the restoration, its verbosity depending on settings.
    - Permanently Delete (via popover for selected items): Permanently deletes all items currently selected in the Recycle Bin. Requires confirmation: “Are you sure you want to permanently delete all (count) selected items from the Recycle Bin? This action cannot be undone.”
    - Empty Recycle Bin (via header icon-button): Permanently deletes all items in the Recycle Bin for the active Workspace. Requires confirmation: “Are you sure you want to permanently delete ALL items in this Recycle Bin?”
    - Cancel: Closes the action popover and deselects all checkboxes.
  - Undo: No immediate "undo" after sending to Recycle Bin (when retention > 0). Recovery is via restore functionality.
  - Automatic Deletion: Items exceeding the retention period are automatically and permanently deleted. If a parent entity is purged this way, any of its original descendants also in the Recycle Bin are purged. This purge is performed as a background task, with toast notifications for initiation and completion/errors if the notification level is "Verbose".
  - Persistence: Deleted items, including their metadata such as original tags (and reflecting their original user-defined sort order), are stored in IndexedDB and synced to the cloud.
  - Accessibility:
    - Search input, checkboxes, action buttons, and list items are keyboard-navigable.
    - ARIA attributes ensure screen reader compatibility. Popovers use appropriate dialog roles.
    - When lineage highlighting occurs on focus, an `aria-live` region will announce the relationships of highlighted items to the focused item (e.g., "Item 'Note X' focused. Related items also highlighted: Parent 'Collection Y', Descendant 'Sub-note Z'.").

### 6.5 Components

#### 6.5.1 Workspace Component

- Description: A modular, self-contained unit that organizes Folder Components and contains its own tag definitions (including their custom sort order). Each Workspace has a textual name (which can include emojis) and is visually represented in the Workspaces Panel by a themed, user-configurable single emoji or a two-character abbreviation. The textual name is distinct from this visual representation; the visual representation is the primary display element in the Workspaces Panel, while the full textual name is accessible via tooltip and when editing the Workspace.
- Location: Within the Workspaces Panel.
- Content: User-configurable emoji or two-character abbreviation and themed coloring.
- Functionality:
  - Mini Toolbar: Appears on hover or focus (as per Section 6.3) for quick actions and only for the currently selected Workspace Component. Contains "Edit", "Delete", and "Export" icon-buttons. If more than five actions were present, a "More" menu would be used.
    - Edit: To change name, theme, or edit the visual representation (emoji or two-character abbreviation). Opens a popover similar to the "Add Workspace" popover, which will include a subtle hint or info icon indicating emoji support for Workspace names.
    - Delete: Deletion of a Workspace is a permanent action resulting in significant data loss. It is not moved to any Recycle Bin. A strict two-stage process is required:
        1.  First, a prompt: "Are you sure you want to permanently delete this Workspace and all its contents (including all Folders, Collections, Items, its tag definitions with their custom sort order, and its Recycle Bin data)? This action cannot be undone".
        2.  If confirmed, a second prompt requires the user to enter the Workspace name (case-insensitive, copy-paste friendly from the first prompt) to finalize the permanent deletion. The user can cancel at either stage.
        - Permanent deletion of a Workspace removes all its Folders, Collections, Saved Links, Notes, all tag definitions (and their custom sort order) within it, and all items contained within that Workspace's own Recycle Bin.
        - Upon successful deletion, if there are no remaining Workspaces, a new default Workspace with a name (e.g., "My Workspace," localized if applicable), represented by "MW" (or localized equivalent) or a default emoji, a default theme, and system default settings is automatically and silently created, without triggering any onboarding-like interaction. A toast message will inform the user: "Last Workspace deleted. A new 'My Workspace' has been created".
    - Export: Exports the entire Workspace. The export includes all its Folders, Collections, Saved Links, and Notes (with their assigned tags), all tag definitions for the Workspace (including their custom sort order), and its assigned theme (with the full custom theme definition if applicable), in chosen formats (e.g., JSON, CSV, HTML, TXT, Export for Email (HTML)).
  - Drag-and-Drop: Workspace Components can be reordered only within the panel, provided the current sort order is "Manual (Drag & Drop Order)". If another sort order is active, drag-and-drop reordering is disabled for Workspaces.
  - Persistence: The last selected Workspace Component and its chosen sort option (and direction) remain selected/active on browser reopen.

#### 6.5.2 Folder Component

- Description: A container for organizing Collection Components within a Workspace Component.
- Location: Within the Folders Panel.
- Content: Folder name, which can include emojis, truncated if necessary, with a tooltip displaying the full name on hover. Includes "Starred Collections" and "My Collections" (names localized if applicable) as fixed special Folders.
- Functionality:
  - Checkbox: When hovered over or focused, a checkbox appears to the left of the Folder Component name. Selecting any Folder Component reveals all other Folder Component checkboxes (including for "Starred Collections" and "My Collections"), a Select All checkbox in the topmost user-added Folder Component, and a popover in the middle at the bottom of the Collections Panel with Export, Delete, and Cancel options.
    - Export: Select multiple Folder Components (including "Starred Collections" or "My Collections") and export them and their contents (Collections, Saved Links, Notes, and their associated assigned tags, reflecting custom tag sort order) in chosen formats (JSON, CSV, HTML, TXT, Export for Email (HTML)), with a popover to confirm format and destination. This is the only way to move Folder Components between Workspace Components.
    - Delete:
      - If Recycle Bin retention is greater than 0 days: Moves the selected Folders and their active contents (Collections, Saved Links, Notes, and their associated assigned tags) to the Recycle Bin. If "Starred Collections" or "My Collections" are selected, their active contents are moved, but the Folders themselves remain (emptied). User-added Folders are moved to the Recycle Bin. No confirmation for this action. The "Delete" option in the popover glows red on hover.
      - If Recycle Bin retention is set to 0 days: Permanently deletes the selected Folders and their active contents. If "Starred Collections" or "My Collections" are selected, their active contents are permanently deleted, but the Folders themselves remain (emptied). User-added Folders are permanently deleted. This action does not affect items that were previously and independently sent to the Recycle Bin, even if they originated from these Folders. The "Delete" option in the popover glows red on hover. Confirmation is required: a prompt "Are you sure you want to permanently delete these (count) folders and all their active contents? Enter 'delete' to confirm" will be displayed, with the option to otherwise cancel.
    - Cancel: Closes the popover and unselects all checkboxes.
  - Mini Toolbar: Appears on hover or focus (as per Section 6.3). For user-added Folder Components, it contains "Rename" and "Delete" icon-buttons. "Starred Collections" and "My Collections" do not have the "Delete" icon-button. ("My Collections" can be renamed via its "Rename" icon-button).
    - Rename: Opens a popover allowing the Folder Component's name to be changed. The input field for the name will include a subtle hint or info icon indicating emoji support for Folder names.
    - Delete:
      - If Recycle Bin retention is greater than 0 days: Moves the Folder and its active contents (including assigned tags) to the Recycle Bin without confirmation. The "Delete" icon glows red on hover.
      - If Recycle Bin retention is set to 0 days: Permanently deletes the Folder and its active contents. This action does not affect items that were previously and independently sent to the Recycle Bin, even if they originated from this Folder. The "Delete" icon glows red on hover. Confirmation is required: a prompt "Are you sure you want to permanently delete the Folder '[folder name]' and all its active contents? Enter folder name to confirm" is displayed.
  - Drag-and-Drop: Folder Components (user-added only) can be reordered within the panel.

#### 6.5.3 Collection Component

- Description: A container for organizing Collection Items (Saved Link Items or Note Items) within the Collections Panel.
- Location: Within the Collections Panel, displayed according to the selected global View option (Section 6.4.3) or its individually locked view if the "Per-Collection View Override" feature is enabled and used.
- Content:
  - Title Bar: Single click anywhere on the bar to toggle expand/collapse. Caret shows expand/collapse state (right for collapsed, down for expanded). Displays the Collection Component's name (which can be optionally prefaced with an emoji; double-click to edit; tooltip for full name on hover if truncated). If the "Display item count on Collections" setting (Section 6.6.3) is enabled, the total count of items (Saved Links + Notes) within the Collection is displayed next to the name (e.g., "Research Project (7 items)"). Any assigned Collection tag badges are displayed after the name/count, in the user-defined sort order for tags. When editing or adding a Collection name, a subtle hint or info icon will indicate emoji support.
    - If the "Per-Collection View Override" feature is enabled in Settings (Section 6.6.3), a subtle icon-button appears on the title bar (e.g., to the left of the mini-toolbar).
        - If the Collection Component is following the global view (unlocked): Displays an "eye" icon (e.g., `fa-eye`). Tooltip: "View: Global ([Current Global View Name]). Click to lock a specific view for this Collection."
        - If the Collection Component has a locked view: Displays a "closed lock" icon (e.g., `fa-lock`). Tooltip: "View: Locked ([Locked View Name]). Click to unlock and follow global view."
        - Clicking this icon-button opens a small popover anchored to it. The popover contains:
            - A row of icon-buttons for view selection (List, Cards, Compact, Board, Grid), with the currently active/selected view highlighted.
            - A single lock/unlock icon-button (`fa-lock`/`fa-unlock`).
            - To lock a view: Select a view from the row, then click the (now) "unlock" icon; it changes to "lock" and applies the view.
            - To unlock: Click the "lock" icon; it changes to "unlock", and the Collection reverts to the global view.
            - The popover closes on selection.
    - If item-level tagging is enabled (via Settings) and one or more items within this specific Collection Component are tagged, a subtle, distinct icon (e.g., a styled `fa-tags`) appears on the title bar after the Collection Component's own tag badges.
        - On hover, this `fa-tags` icon displays a tooltip listing the unique item tags present on items within this Collection Component (e.g., "This Collection contains items tagged with: Design, Research, ToRead..."). Tag names in the tooltip appear in their user-defined sort order.
        - This `fa-tags` icon is clickable (see "Tag Interaction" under Functionality below).
    - For "Board View" and "Grid View", the Collection Component name (and associated count, tags/icons on its title bar) may be truncated if necessary to fit the column width; a tooltip displays the full name on hover.
    - Checkbox: Revealed on hover or focus over the Collection Component. Selecting one Collection Component reveals all other Collection Component checkboxes and a Select All checkbox between the topmost Collection Component and Collections Panel icons.
    - Mini Toolbar: Appears on hover or focus (as per Section 6.3). Contains the following primary visible icon-buttons: "Open", "Open in new window", "Close all, open these", "Add (window tabs)", "Replace" "Pin/Unpin", "Star/Unstar", "Add Note". A "More" actions icon-button (e.g., three vertical dots) reveals a dropdown menu with the remaining actions: "Tag" (for this Collection), "Sort (items)", "Copy", "Move", "Rename", "Export", "Delete".
      - Open: Opens the saved links in this Collection into the current browser window alongside any existing tabs. When opening links, Tabitha will attempt to restore their saved states, such as pinned status or Chrome tab group affiliation (if "Enable Chrome Tab Group Integration" setting is active). If the Collection Component contains only Note Items and no Saved Link Items, this action icon-button will be disabled (e.g., greyed out) with a tooltip indicating "No links to open in this Collection."
      - Open in new window: Opens the saved links in this Collection into a new browser window. When opening links, Tabitha will attempt to restore their saved states, such as pinned status or Chrome tab group affiliation (if "Enable Chrome Tab Group Integration" setting is active). If the Collection Component contains only Note Items and no Saved Link Items, this action icon-button will be disabled (e.g., greyed out) with a tooltip indicating "No links to open in this Collection."
      - Close all, open these: Closes all tabs in the current browser window and opens the saved links in this Collection into it. When opening links, Tabitha will attempt to restore their saved states, such as pinned status or Chrome tab group affiliation (if "Enable Chrome Tab Group Integration" setting is active). If the Collection Component contains only Note Items and no Saved Link Items, this action icon-button will be disabled (e.g., greyed out) with a tooltip indicating "No links to open in this Collection."
      - Add (window tabs): Adds all (non-Tabitha) tabs in the current browser window (the window hosting the Tabitha UI instance) to this specific Collection. The current state of the window tabs (e.g., pinned status, Chrome tab group affiliation if enabled) is saved with each link. If the "Prevent duplicates within the same Collection" setting (Section 6.6.3) is enabled, duplicate links from the current window will not be added, and a toast notification (e.g., "X duplicate tabs skipped".) will inform the user.
      - Replace: Deletes all items in the Collection and Adds all (non-Tabitha) tabs in the current browser window to this specific Collection. The current state of the window tabs (e.g., pinned status, Chrome tab group affiliation if enabled) is saved with each link. If the "Prevent duplicates within the same Collection" setting (Section 6.6.3) is enabled, duplicate links from the current window will not be added, and a toast notification (e.g., "X duplicate tabs skipped".) will inform the user.
      - Pin/Unpin: Pins the Collection to the top of the Collections panel list, below any existing pins. If pinned, the option is to unpin.
      - Star/Unstar: Adds star to Collection. If starred already, the option is to unstar.
      - Add Note: Add a Note Item. Opens a popover with a plain text input field for the Note title and a lightweight WYSIWYG editor for the Note body. The Note body supports basic formatting (e.g., headings, bold, lists, hyperlinks) and is stored as HTML. A simple toolbar in the WYSIWYG editor provides formatting controls. The popover includes a concise, non-intrusive guide or help icon providing tips on using the WYSIWYG editor, including supported formatting, creating hyperlinks, and how to create internal links to other Note Items (referencing the 'Copy Link to Note' action available on existing Note Items).
      - Tag (in "More" menu): Opens a popover to add or remove tags to this Collection Component. Tags are managed per Workspace. The input field for creating/editing tag names will include a subtle hint or info icon indicating emoji support. The popover will also allow reordering of tag definitions via drag-and-drop, affecting display order throughout the Workspace.
      - Sort (items) (in "More" menu): Opens a popover to select sort order for items within this Collection: Alphanumeric, Date Created, or Custom (Drag & Drop Order).
      - Copy (in "More" menu): Popover with dropdown to select destination Folder.
      - Move (in "More" menu): Popover with dropdown to select destination Folder.
      - Rename (in "More" menu): Opens the Collection name to edit. Collection names can be prefaced with an emoji. The input area will include a subtle hint or info icon indicating emoji support for Collection names.
      - Export (in "More" menu): Exports the selected Collection and its contents (Saved Links, Notes, and their associated assigned tags, reflecting custom tag sort order) in chosen formats (JSON, CSV, HTML, TXT, Export for Email (HTML)).
      - Delete (in "More" menu):
        - If Recycle Bin retention is greater than 0 days: Moves the Collection and its active contents (Saved Links, Notes, and their associated assigned tags) to the Recycle Bin without confirmation. The "Delete" icon glows red on hover for mouse users. For keyboard users, focusing on the icon triggers an aria-alert: "Warning: Deleting this Collection will move it to the Recycle Bin".
        - If Recycle Bin retention is set to 0 days: Permanently deletes the Collection and its active contents. This action does not affect items that were previously and independently sent to the Recycle Bin, even if they originated from this Collection. The "Delete" icon glows red on hover. Confirmation is required: a prompt "Are you sure you want to permanently delete the Collection '[collection name]' and all its active contents? Enter collection name to confirm" is displayed, with an option to cancel.
  - Expanded View: Shows the Collection Items (Saved Link Items or Note Items), displayed according to the globally selected View option (Section 6.4.3) or its individually locked view (if 'Per-Collection View Override' is enabled and used), and sorted based on the Collection's current sort setting (Alphanumeric, Date Created, or Custom). The active sort criterion and its direction (if applicable) are visually indicated (e.g., with a small arrow icon) within the expanded Collection Component's item list header or near where sorting controls are typically found, clarifying the current order of items. If item-tagging is enabled, assigned item tags are displayed on items as per View option rules (see Section 6.5.4), in their user-defined sort order.
- Functionality:
  - Checkbox: Hovering over or focusing on a Collection Component reveals a checkbox to the left of the name. Selecting one Collection Component reveals all checkboxes and a Select All checkbox in the topmost Collection Component. Selecting any reveals a popover in the middle at the bottom of the Collections Panel with options to Copy, Move, Merge, Export, Delete, and Cancel.
    - Copy: Relocate the selected Collection Components, prompting to select Folder.
    - Move: Relocate the selected Collection Components, prompting to select Folder.
    - Merge: Combine multiple selected Collection Components into the first selected Collection Component. Metadata (tags, pin/star status) of the source Collection Components being merged are discarded; only the target Collection Component's metadata is retained. Assigned item tags from merged items are preserved.
    - Export: Exports the selected Collection Components and their contents (Saved Links, Notes, and their associated assigned tags, reflecting custom tag sort order) with a choice of various formats (JSON, CSV, HTML, TXT, Export for Email (HTML)).
    - Delete:
      - If Recycle Bin retention is greater than 0 days: Moves the selected Collections and their active contents (including assigned tags) to the Recycle Bin without confirmation. The "Delete" option in the popover glows red on hover for mouse users. For keyboard users, focusing on "Delete" triggers an aria-alert: "Warning: Deleting selected Collections will move them to the Recycle Bin".
      - If Recycle Bin retention is set to 0 days: Permanently deletes the selected Collections and their active contents. This action does not affect items that were previously and independently sent to the Recycle Bin, even if they originated from these Collections. The "Delete" option in the popover glows red on hover. Confirmation is required: a prompt "Are you sure you want to permanently delete these (count) collections and all their active contents? Enter 'delete' to confirm". is displayed, with an option to cancel.
    - Cancel: Closes the popover and unselects all checkboxes.
  - Drag-and-Drop:
    -   Collection Components can be reordered by drag-and-drop within the Collections Panel (i.e., within the currently selected Folder Component), adhering to the layout rules of the currently selected View option (or its own locked view).
    -   To move Collection Components to a different Folder Component:
        -   A single Collection Component (dragged without prior checkbox selection) can be moved by dragging it from the Collections Panel and dropping it onto a user-created Folder Component or the "My Collections" Folder Component in the Folders Panel.
        -   Multiple Collection Components, selected via their checkboxes, can also be moved as a batch by dragging the selection from the Collections Panel and dropping it onto a valid target Folder Component in the Folders Panel.
        -   The "Starred Collections" Folder Component is not a valid drop target for changing a Collection's parent Folder through drag-and-drop.
    -   When initiating a drag on a Collection Component without prior multiple checkbox selections, only that single Collection Component is dragged.
    -   The checkbox selection popover actions (Copy, Move) remain available as an alternative method, particularly for moving multiple Collection Components when drag-and-drop is less convenient (e.g., the target Folder Component is not visible).
    -   If an expanded Collection Component is dragged (either singly or as part of a batch), it visually collapses during the drag and re-expands upon drop if it was previously expanded.
    -   Collection Items can be dragged to reorder within their parent Collection; if the Collection's sort is "Alphanumeric" or "Date Created", dragging an item automatically switches that Collection's sort order to "Custom (Drag & Drop Order)".
    -   Supports dragging a browser window, tab(s), Chrome pinned tab(s), or Chrome tab group from the Open Tabs Panel to create Saved Link Item(s) in a Collection Component.
    -   Collection Components cannot be dragged to the Open Tabs Panel.
    -   Pinned components can be reordered within other pinned components or unpinned.
  - Persistence: Preserves expand/collapse state; new Collection Components are expanded by default. Sort order for Collection Items (Alphanumeric, Date Created, Custom) is also preserved per Collection. If the 'Per-Collection View Override' feature is enabled, the locked view type and lock status for the Collection Component are also persisted. The item count display (if enabled) updates dynamically.
  - Tag Interaction:
    - Management of Collection Tags:
        - The "Tag" action in the Collection Component's mini toolbar manages tags for that Collection Component. It opens a popover to add or remove tags. This popover allows single or multi-selection of tags; clicking once selects a tag, clicking again deselects it. Selected tags are indicated (e.g., by a tick) and their badges are displayed following the Collection Component name, in their user-defined sort order. Users can add existing tags or create new tags from the Workspace's tag definitions. The input area for new tag names will include a subtle hint or info icon about emoji support. This popover also allows reordering of all tag definitions for the Workspace via drag-and-drop; this order will be used for displaying tag badges everywhere in this Workspace.
        - When a new tag is created (either via this popover or via the Tag Filter popover in the Collections Panel header), its color is automatically assigned from a predefined palette, cycling through the available colors. Separate, distinct predefined color palettes are used for light mode and dark mode to ensure good visual appeal and contrast. The 'Create Tag' popover (or the interface where a new tag is named) will also allow the user to immediately choose a different color from the palette for the new tag, overriding the automatic assignment. New tags are added to the current Workspace's tag definitions.
        - An "Edit" icon button next to each tag in the popover (revealed on hover) allows users to edit tags (rename, change color, delete). Editing a tag definition affects all instances of that tag's assignment within the Workspace, whether on Collections or Items.
        - Clicking a tag badge displayed on a Collection Component name directly modifies the current Collection Tag filter active in the Collections Panel toolbar:
            - If the clicked tag is not currently part of the active filter, it is added to the filter (respecting the currently selected AND/OR logic in the Tag Filter popover for Collection Tags).
            - If the clicked tag is already part of the active filter, clicking its badge will remove that specific tag from the filter.
    - Management and Filtering of Item Tags (if item-level tagging is enabled via Settings):
        - An `fa-tags` icon appears on the Collection Component's title bar if items within it are tagged (see "Content" -> "Title Bar" above for its tooltip behavior).
        - Clicking this `fa-tags` icon opens a popover. This popover directly mirrors the "Filter Items by Tag" section of the main Tag Filter popover (accessed from the Collections Panel header, Section 6.4.3). It allows the user to select/deselect item tags to modify the global Item Tag filter for the Collections Panel, manage AND/OR logic, use "No Label", clear the filter, and access creation/editing/reordering of tag definitions for the Workspace. The input area for new tag names will include a subtle hint or info icon about emoji support.
        - Assignment of tags to individual Saved Link Items or Note Items is handled via the "Tag Item" action in each item's respective mini toolbar (see Section 6.5.4) or through bulk tagging operations if multiple items are selected (see Section 6.5.4 Functionality -> Checkbox).
    - The main Tag Filter in the Collections Panel toolbar (Section 6.4.3) remains the primary interface for viewing all available tags, managing complex filters for both Collection tags and Item tags (if item-tagging is enabled), creating new tags, editing existing tags, deleting tags, reordering all tag definitions via drag-and-drop, and clearing filters.

#### 6.5.4 Collection Item

- Description: A content unit within a Collection Component. Its appearance is determined by the globally selected View option for the Collections Panel (List, Cards, Compact, Board, Grid) or its parent Collection Component's locked view if 'Per-Collection View Override' is enabled and used. A checkbox replaces the favicon/icon when hovered over or focused. Each Collection Item's data structure includes any assigned item tags.
  - Saved Link Item: Displays favicon, title, and description. Its data structure includes the URL, title, description, favicon, and any saved tab state (e.g., pinned status, Chrome tab group affiliation if "Enable Chrome Tab Group Integration" setting is active). Description, if any, is shown in "List View", "Cards View", and "Board View". Created by saving or dragging browser windows, browser tabs, Chrome pinned tabs, or Chrome tab groups from the Open Tabs Panel. Clicking opens the URL in a new browser tab.
  - Note Item: Displays a note icon and its Title (plain text). If the current View (List, Cards, Board) allows, a snippet of its formatted Body (HTML, sanitized before display) is also shown. Clicking the Note Item or its 'Edit' action (via mini toolbar) opens a popover. This popover has a plain text input field for the Note title and a lightweight WYSIWYG editor (with a simple toolbar for basic formatting like headings, bold, lists, hyperlinks) for the Note body. The Note body is stored as HTML. The popover includes a concise, non-intrusive guide or help icon providing tips on using the WYSIWYG editor, including supported formatting, creating hyperlinks, and how to create internal links to other Note Items (referencing the 'Copy Link to Note' action). Created via a popover opened from the Collection Component’s Note action.
  - If item-level tagging is enabled in Settings, assigned item tags are displayed according to the current View's rules, in their user-defined sort order.
- Location: Within an expanded Collection Component.
- Content: As described above. If item-level tagging is enabled:
    - List, Cards, Board Views: Small, color-coded tag badges appear following the item's name/title (which may be truncated), displayed in the user-defined sort order for tags. Tag names on badges are truncated with '...' if they exceed available space, with a tooltip showing the full tag name on hover.
    - Compact, Grid Views: A single, generic tag icon (e.g., `fa-tag`) is displayed on the item if it has any tags. A tooltip on this icon reveals the actual tag names/badges, displayed in their user-defined sort order.
- Functionality:
  - Mini Toolbar: Appears on hover or focus (as per Section 6.3).
    - For Note Items: Contains "Edit", "Copy", and "Copy Link to Note" icon-buttons.
    - For Saved Link Items: Contains "Edit" and "Copy" icon-buttons.
    - If item-level tagging is enabled for either type: A "Tag Item" icon-button (e.g., `fa-tag`) is also present.
    - If more than five actions were present, a "More" menu would be used.
    - Copy Link to Note (for Note Items only): Copies a unique Tabitha URI for this Note Item to the clipboard (e.g., `tabitha:note/{NOTE_ID}`). This URI can be pasted into the hyperlink creation dialog of another Note Item's WYSIWYG editor to create a direct link. Clicking this link within a rendered Note will navigate the Tabitha UI to display the target Note Item.
    - Copy:
      - For Saved Link Item: Opens a popover allowing the user to define a copy template using `{url}`, `{title}`, and `{description}` placeholders. Common examples include Markdown `[{title}]({url})` or HTML `<a href="{url}">{title}</a>`. The `{description}` field is often empty; templates should gracefully handle missing descriptions. The user's last used template is remembered per Workspace. If no template is defined or the user clears it, only the `{url}` is copied to the clipboard. The popover includes "Save Template & Copy" and "Copy URL only" buttons, remembering the last selected.
      - For Note Item: Copies the formatted Note body as rich text (HTML) and plain text to the clipboard.
    - Edit: For Saved Link Item, opens a popover showing favicon that allows title, description, and URL to be edited. For Note Item, opens the popover described above (including contextual help for editing), showing the Note icon, allowing the plain text Title and HTML Body (via WYSIWYG editor) to be edited.
    - Tag Item (if item-level tagging is enabled): Opens a popover to add or remove tags for this specific Item. The popover functions identically to the one for Collection tags, allowing selection from the Workspace's existing tag definitions (displayed in their user-defined sort order) or creation of new tag definitions. The input for new tag names will include a subtle hint or info icon about emoji support. This popover also allows reordering of all tag definitions for the Workspace via drag-and-drop.
  - Note Item Interaction: When a Note Item's content is displayed (e.g., in a popover for editing or a dedicated view area if implemented), and this view was reached via an internal `tabitha:note/` link, a contextual "Back" navigation element will be provided. This element will typically be an icon-button (e.g., `fa-arrow-left`) with accompanying text like "Back to '[Source Note Title]'", where '[Source Note Title]' is the title of the note from which the user navigated. Clicking this button or using its associated keyboard shortcut navigates the UI back to the source note. This "Back" element is only present and active for navigation originating from internal note links and provides a single step back.
  - Close icon:
    - If Recycle Bin retention is greater than 0 days: Clicking the close icon (highlighted with a red glow on hover for mouse users) moves the Collection Item (which includes its assigned tags) to the Recycle Bin without confirmation. For keyboard users, focusing on the close icon provides an aria-alert: "Warning: Moving this item to the Recycle Bin".
    - If Recycle Bin retention is set to 0 days: Clicking the close icon (highlighted with a red glow on hover for mouse users) initiates permanent deletion. A confirmation popover: "Are you sure you want to permanently delete this item?" with options "Delete Permanently" and "Cancel" will be displayed. For keyboard users, focusing on the close icon provides an aria-alert, and activation triggers the same confirmation popover.
  - Checkbox: When hovered over or focused, a checkbox replaces the favicon/icon. There is no Select All checkbox for Collection Items. Selection reveals a popover in the middle at the bottom of the Collections Panel with options to Open, Copy, Move, Create new Collection, Delete, and Cancel. If item-level tagging is enabled (Section 6.6.3), an additional "Tag Selected Items..." action is available in this popover.
    - Open: Opens the selected Collection Items into the current window; the user needs to open a new window/tab if they want items in a new window.
    - Copy: Relocates the selected Collection Items (which includes their assigned tags), prompting to select Folder and Collection.
    - Move: Relocates the selected Collection Items (which includes their assigned tags), prompting to select Folder and Collection.
    - Create new Collection: Creates a new Collection Component in the current Folder, named by default with the current date and time using a locale-appropriate short format, copying the selected Collection Items (which includes their assigned tags) to the new Collection.
    - Tag Selected Items... (available if item-level tagging is enabled): Opens a popover for batch tagging or untagging the selected Collection Items.
        - The popover displays all tags defined in the current Workspace, listed in their user-defined sort order, each with a checkbox.
        - Tags already common to all selected items are pre-checked. Tags common to some but not all selected items may show an indeterminate state.
        - Users can check/uncheck tags to apply/remove them from the entire selection. New tags can also be created from this popover.
        - "Save" applies the tag changes to all selected items. "Cancel" discards changes.
    - Delete:
      - If Recycle Bin retention is greater than 0 days: Moves the selected Collection Items (which includes their assigned tags) to the Recycle Bin without confirmation. The "Delete" option in the popover glows red on hover for mouse users. For keyboard users, focusing on "Delete" triggers an aria-alert: "Warning: Deleting selected items will move them to the Recycle Bin".
      - If Recycle Bin retention is set to 0 days: Permanently deletes the selected Collection Items. The "Delete" option in the popover glows red on hover. A confirmation "Are you sure you want to permanently delete these (count) items?" is displayed, with options "Delete Permanently" and "Cancel".
    - Cancel: Closes the popover and unselects all checkboxes.
  - Drag-and-Drop: Collection Items can be reordered within their Collection Component or moved to another Collection Component within the same Folder Component. Assigned item tags move with the item. If the parent Collection's sort order is "Alphanumeric" or "Date Created", dragging an item automatically switches that Collection's sort to "Custom (Drag & Drop Order)". When dragging to another Collection within the same Folder, holding Ctrl will copy the item (including its assigned tags) instead of moving it; a visual cue (e.g., a "+" icon next to the cursor or ghost image) will indicate the copy operation when Ctrl is pressed.

#### 6.5.5 Browser Window

- Description: A representation of an actual open browser window, containing browser tabs, including Chrome pinned tabs and tab groups.
- Location: Within the Open Tabs Panel.
- Content:
  - Title Bar: Single click anywhere on the title bar to toggle expand/collapse. Caret shows expand/collapse state (right for collapsed, down for expanded). Displays its label (e.g., "Window 1 (5 tabs)"), Caret, Save, Close.
  - Expanded View: Shows browser tabs, including pinned tabs and, in Chrome, tab groups.
- Functionality:
  - Clicking the Browser Window component's title bar (e.g., "Window 1 (5 tabs)") only toggles its expand/collapse state to show/hide the tabs it contains. It does not attempt to focus or bring forward the actual OS-level browser window.
  - Save: Saves all browser tabs from the current browser window into a new Collection Component. This process captures the current state (e.g., pinned status, Chrome tab group affiliation if "Enable Chrome Tab Group Integration" setting is active) of each tab. This occurs in two stages:
    1.  Collection Creation: Upon clicking the "Save" icon-button on the Browser Window component, Tabitha immediately creates a new Collection Component and saves all tabs from that window into it. Visual feedback is provided by the immediate appearance and selection/focus of the new Collection Component in the Collections Panel.
          - The new Collection is placed in the currently selected Folder in the Folders Panel. If "Starred Collections" is selected, or if no Folder has a prior selection in the current session, the new Collection is created in the "My Collections" Folder.
          - This newly created Collection is assigned a default name based on the current date and time using a locale-appropriate short format.
    2.  Rename Prompt: Immediately after the Collection is created and appears in the Collections Panel, the Collection's name is an editable input field, pre-filled with the default date/time name, allowing the user to rename the new Collection. It includes two custom-styled text buttons:
          - 'Save': Confirms the name entered (or modified) in the input field.
          - 'Cancel': Discards any changes made to the name in the input field. The Collection will then retain its default date/time name.
          - If the user types a new name, pressing `Enter` or moving focus away from the input field (blur) will save the new name, provided it is not empty. If the name is empty upon attempting to save via `Enter` or blur, it will revert to its default date/time name, and a brief notification (e.g., toast: "Collection name cannot be empty. Reverted to default.") will inform the user. Clicking the 'Cancel' button or pressing `Escape` while the input field is focused discards any changes made to the name in the input field, reverting to the default date/time name.
    Important: Clicking 'Cancel' in this rename interface does not cancel the creation of the Collection itself; the Collection with its saved tabs will still exist under its default name. This "create then immediate inline rename" approach is chosen to maintain a faster workflow, as an extra confirmation step for each save operation would be interruptive. If the user decides they did not want to save the window's tabs after all, they must manually delete the newly created Collection Component from the Collections Panel.
  - Close: Closes the browser window, after a prompt for confirmation.
  - Drag-and-Drop: Browser windows cannot be dragged except to a Collection Component in the Collections Panel to create Saved Link Items for all browser tabs in the window, capturing their current state (e.g., pinned, Chrome tab group affiliation if "Enable Chrome Tab Group Integration" setting is active).
  - Real-Time Updates: Reflects browser state changes instantly.

#### 6.5.6 Browser Tab

- Description: Represents an actual open tab within a browser window, including Chrome pinned tabs.
- Location: Within a browser window in the Open Tabs Panel.
- Content: Favicon, title (truncated to fit). When hovered over or focused, a tooltip below gives full name, a checkbox under the favicon is revealed, and a close icon appears in the top-right corner. In Chrome, pinned tabs are marked with a pin icon next to the favicon.
- Functionality:
  - Tabitha's own browser tab is always invisible to and ignored by Tabitha.
  - Clicking a browser tab in the Open Tabs panel takes no action by default. A setting (Section 6.6.3) allows the user to enable focusing the actual browser tab upon click.
  - Close icon: Appears on hover or focus. Closes the browser tab. For keyboard users, focusing on the close icon provides an aria-alert or similar feedback.
  - Checkbox: When hovered over or focused, a checkbox replaces the favicon/icon. When multiple open tabs are selected via their individual checkboxes, they can be dragged as a batch to a Collection Component. There is no 'Select All' checkbox for open tabs in the Open Tabs panel; selection is performed by checking individual tabs. Selection of individual checkboxes (for single or multiple tabs) reveals a popover in the middle at the bottom of the Collections Panel with options to Add to Collection, Create Collection, Close, and Cancel.
    - Add to Collection: Prompts to select Folder and Collection and saves the selected Tab(s) there.
    - Create Collection: Saves selected Tab(s) to a new Collection, named by default with the current date and time using a locale-appropriate short format.
    - Close: Closes the selected Tab(s).
    - Cancel: Closes the popover and unselects all checkboxes.
  - Drag-and-Drop: Browser tabs, including pinned tabs, can be dragged (individually or as a selected batch) anywhere within the Open Tabs Panel, and the corresponding tab(s) in the actual browser window move to match. Browser tabs can also be dragged (individually or as a selected batch) to a Collection Component in the Collections Panel to create Saved Link Item(s), capturing their current state (e.g., pinned, Chrome tab group affiliation if "Enable Chrome Tab Group Integration" setting is active). If "Prevent duplicates within the same Collection" is enabled (Section 6.6.3) and the action would create a duplicate, the drag is prevented (or duplicates are skipped from a batch), and a toast notification (e.g., "Duplicate link(s). Not added".) is displayed.
  - Real-Time Updates: Reflects browser state changes instantly.

#### 6.5.7 Chrome Tab Group (Chrome-specific)

- Description: Represents a tab group within a browser window in Chrome, allowing users to organize and manage tabs in groups.
- Location: Within a browser window in the Open Tabs Panel.
- Content:
  - Title Bar: Displays the tab group's name and color. Single click to toggle expand/collapse. If the "Enable Chrome Tab Group Integration" setting is active (Section 6.6.3), an additional "Save Group as Collection" icon-button (e.g., `fa-save`) is present on the title bar. Tooltip for this button: "Save Group as Collection".
  - Expanded View: Shows the tabs within the group, each with favicon and title.
- Functionality:
  - Drag-and-Drop: If the "Enable Chrome Tab Group Integration" setting is active, the entire tab group can be dragged to a Collection Component in the Collections Panel to create Saved Link Items for all tabs in the group, preserving their group affiliation (name and color) and other states (e.g., pinned) with each saved link. If "Prevent duplicates within the same Collection" is enabled and this action would create duplicates, non-duplicate tabs from the group are added, and duplicates are skipped with a toast notification.
  - "Save Group as Collection" Action: If the "Enable Chrome Tab Group Integration" setting is active, clicking the "Save Group as Collection" icon-button on the Tab Group's title bar will:
    1. Create a new Collection Component in the currently selected Folder in the Folders Panel (or in "My Collections" if no Folder is selected or applicable).
    2. Name the new Collection using the Chrome Tab Group's current name.
    3. Populate this new Collection with Saved Link Items for all tabs currently in that Chrome Tab Group, preserving their current states (e.g., pinned status, URL, title, favicon, and the group affiliation itself).
    4. Immediately after creation, the new Collection's name becomes an editable input field in the Collections Panel, pre-filled with the tab group's name, allowing the user to confirm or rename it (consistent with the "Save" action for a Browser Window, Section 6.5.5). This "create then immediate inline rename" approach is chosen to maintain a faster workflow.
  - Individual Tabs: Tabs within the group can be dragged individually to a Collection Component or reordered within the Open Tabs Panel. Duplicate prevention applies as per Section 6.5.6. Their group affiliation is saved if the integration setting is active.
  - Real-Time Updates: Reflects changes to tab groups (e.g., adding/removing tabs, renaming groups) instantly.

### 6.6 Tabitha Hub

#### Description
The Tabitha Hub is a unified interface consolidating onboarding (Welcome), Help, and Settings into a single page with a tabbed layout, accessible via Help and Settings icons in the Workspaces Panel or automatically on first launch for onboarding. When accessed via Help or Settings icons, both Help and Settings tabs are visible and accessible, with the selected tab active. The Welcome tab is isolated, rendered only during onboarding or when re-triggered (e.g., via a Help link), with Help and Settings tabs hidden. This design aligns with Tabitha’s minimalist, intuitive principles (Section 4), leverages familiar tabbed navigation to minimize user surprise, and streamlines development by using shared components and logic.

#### Presentation
- Access:
  - Automatically displayed on first launch, rendering only the Welcome tab for onboarding.
  - Accessible thereafter via:
    - Help icon (Workspaces Panel): Renders Help and Settings tabs, with Help active.
    - Settings icon (Workspaces Panel): Renders Help and Settings tabs, with Settings active.
- Layout:
  - Structured as a tabbed interface with three tabs (Welcome, Help, Settings).
  - For Help/Settings entry, Help and Settings tabs are rendered, with the selected tab highlighted (e.g., Material Design underline).
  - For Welcome entry, only the Welcome tab is rendered, hiding Help and Settings.
  - Styled with Material Design for familiarity, using shared UI components (custom-styled text buttons, popovers, tooltips).
- Navigation:
  - Within Help/Settings, users can switch between Help and Settings tabs via mouse or keyboard (Tab, Enter, arrow keys).
  - No navigation to Welcome tab unless re-triggered.
  - “Back to Tabitha” (Help/Settings) or “Finish” (Welcome) button returns to the main four-panel interface, preserving state.
- Progression:
  - Welcome tab is a step-by-step flow, with clear progression and skip options.
  - Help and Settings tabs are single-page views with no progression beyond their content.

#### Content

##### 6.6.1 Welcome (Onboarding)
- Purpose: Guides new users through essential initial setup, introduces core concepts, and allows configuration of key preferences. It focuses on a streamlined introduction, avoiding exhaustive detail on features that are intuitive or better explained contextually within the application. A default Workspace with a name (e.g., "My Workspace," localized if a translation for the detected browser language exists) and an initial theme is pre-created before onboarding begins; this process helps the user customize this initial setup. Onboarding is skippable and settings can be adjusted later via the Tabitha Hub.
- Content:
  1.  Welcome & Core Value:
      - Title: “Welcome to Tabitha!”
      - Overview: “Tabitha helps you organize browser tabs and saved links effortlessly. A default Workspace named 'My Workspace' (or its localized equivalent) is ready for you. Let's quickly tailor your experience. You can change these settings anytime.”
      - “Get Started” button.
  2.  Quick Guide to Tabitha:
      - Title: “How Tabitha Works”
      - Brief Description: “Here’s a quick look at how you’ll use Tabitha:”
      - Key Concepts (with simple icons if possible):
        - “Workspaces: Separate containers for different projects or themes.”
        - “Folders: Organize related content within a Workspace.”
        - “Collections: Sets of saved links and notes within Folders. Collections can be tagged (tags can be reordered for display).”
        - “Open Tabs Panel: See and manage your currently open browser tabs.”
        - “Drag & Drop: Easily arrange items or save open tabs to your Collections.”
      - Note: “You can explore more in Help later.”
      - Buttons: “Next”
  3.  Choose Your Window Mode:
      - Title: “How Tabitha Opens”
      - Description: “Select how you’d like Tabitha to appear. This can be changed later in Settings.”
      - Options with brief explanations and visual mockups/icons:
        - New Tab Takeover (selected by default): “Tabitha replaces your browser's new tab page for seamless integration.”
        - Dedicated Tab: “Tabitha runs in its own separate browser tab.”
        - If 'Dedicated Tab' is selected, an option appears: `[ ] Automatically open Tabitha when my browser starts` (default: unchecked).
      - Buttons: “Next", “Skip this step” (uses default).
  4.  Personalize Your Default Workspace (Optional):
      - Title: “Customize '[My Workspace Name]'” (localized)
      - Description: “Your first Workspace, '[My Workspace Name].' You can personalize its theme further or choose a different one. This affects the global display mode and '[My Workspace Name]'; other Workspaces can have unique themes.”
      - Options:
        - Global Display Mode: Radio buttons: "Auto" (default, follows OS/browser preference), "Light", "Dark".
        - Theme for '[My Workspace Name]': Radio buttons with theme names (from predefined and any existing custom themes) and corresponding color swatches. The initially determined system-aligned theme or a neutral fallback is selected by default.
        - Visual Representation for '[My Workspace Name]': Option to select an emoji or use the default two-character abbreviation.
      - Buttons: “Next", “Skip this step” (uses defaults).
  5.  Enable Cloud Sync (Optional at this stage):
      - Title: “Sync Your Data”
      - Description: “Keep your Tabitha organization (Workspaces with tag definitions/order, Folders, Collections, Notes, their tags, your custom themes, custom TXT export templates, and settings like Chrome Tab Group integration) backed up and consistent across your devices by syncing with a cloud service. All data is stored in your private cloud space.”
      - Note: “Tabitha operates client-side and saves your data locally to IndexedDB even if you skip this. You can set up cloud sync anytime in Settings.”
      - Provider Selection:
        - Label: “Choose your cloud provider:”
        - [Styled radio buttons: Initially "Google Drive" will be the primary/only option, but the UI will be designed to clearly accommodate future additions like "Dropbox", "OneDrive", etc. If only one option, it can be pre-selected or clearly indicated.]
      - Buttons:
        - “Connect to [Selected Provider]” (e.g., “Connect to Google Drive”) - initiates OAuth flow.
        - “Skip for Now”
      - Feedback: On successful connection, a toast message: “Successfully connected to [Provider Name]!” If skipped or failed: “Cloud sync can be configured later in Settings.”
  6.  You're Ready!:
      - Title: “You’re All Set!”
      - Summary: “Tabitha is now configured. Remember, you can always access Help and Settings via the icons in the Workspaces panel.”
      - “Start Using Tabitha” button (or “Finish”) - closes onboarding and displays the main Tabitha interface with the (potentially customized) default Workspace.
- Functionality:
  - Selections made during onboarding (Window Mode, Global Display Mode, default Workspace Theme and representation, Cloud Sync authentication, automatic launch setting) are immediately saved to IndexedDB via LocalForage.
  - If cloud sync is successfully authenticated, initial settings (including any empty list for custom TXT export templates and default for "Enable Chrome Tab Group Integration") and the default Workspace configuration will be queued for the first sync.
  - The entire onboarding flow is designed to be completed quickly (e.g., under 2 minutes).
  - Each step (after the "Quick Guide") or the entire flow (from "Choose Your Window Mode" onwards) can be skipped. If skipped, Tabitha uses the pre-defined defaults.
  - Onboarding is not re-triggered if the last Workspace is deleted; a new default Workspace is created silently with system default settings as per Section 6.5.1.
  - The Welcome tab for onboarding is hidden after completion unless explicitly re-triggered (e.g., via a "Review Setup Guide" link in Help).

##### 6.6.2 Help
- Purpose: Offers concise guidance to reinforce understanding of Tabitha's intuitive features and assist with troubleshooting. Detailed feature 'how-tos' are primarily provided contextually within the application, adhering to the 'Contextual Guidance' principle (Section 4).
- Content:
  - Understanding Tabitha's Structure: A very brief overview emphasizing that Tabitha helps organize digital life through a simple hierarchy of Workspaces, Folders, and Collections. It encourages exploration and mentions that contextual hints and tips are provided throughout the application to guide users as they explore features.
  - Saving Links to Cloud-Hosted Files: Guidance on how to save links to files hosted on cloud services (e.g., Google Drive, Dropbox) by obtaining a shareable web link and saving it as a standard Saved Link Item.
  - Using Emojis: A brief note that emojis are supported in names for Workspaces, Folders, Collections, and Tags to enhance visual organization. Provides a link to a resource like Emojipedia for emoji selection. (Detailed hints about emoji support are provided contextually where names are entered).
  - Customizing TXT Exports: A brief mention that users can create their own TXT export formats for Saved Links in the Settings panel (under Data Management). Detailed instructions and placeholder explanations are available within that settings interface.
  - Sharing Content via Email:
    - To share content such as Saved Links and Notes via email, the user can use the "Export for Email (HTML)" option available in the export functionality. This method generates a single HTML file containing both Saved Links and Notes (including their assigned tags, displayed in their user-defined sort order) from the selected scope (e.g., Workspace, Folder, or Collection).
    - The process is as follows:
      1.  Select the Workspace, Folder(s), or Collection(s) to be shared.
      2.  Choose the "Export for Email (HTML)" option from the export menu.
      3.  Tabitha will generate and download an HTML file.
      4.  The user opens this HTML file in a web browser. The content will be displayed in a format suitable for copying.
      5.  The user can then select all content in the browser window.
      6.  Copy the selected content.
      7.  Paste this copied content into the body of an HTML-capable email client. The formatting, including clickable links and Note content, should be preserved.
  - Keyboard Shortcuts: A direct link to the dedicated Keyboard Shortcuts page.
  - Troubleshooting Tips: Common solutions for potential issues (e.g., sync problems).
  - Community Support: Links to GitHub Issues and Discussions for further assistance and community engagement. Users can also contribute translations for their locales via GitHub.
  - Setup Guide Review: A link to re-access the "Welcome" onboarding guide.
- Functionality:
  - Content is localized and supports RTL languages (see Section 8.4).

##### 6.6.3 Settings
- Purpose: Configures Tabitha’s behavior and appearance. User settings data includes custom theme definitions, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting.
- Content:
  - Window Mode: Toggle “New Tab Takeover” or “Dedicated Tab.” If “Dedicated Tab” is selected, an additional checkbox appears: `[ ] Automatically open Tabitha in a dedicated tab on browser launch` (default: OFF). Description: 'When enabled, Tabitha will attempt to open in a dedicated tab automatically when the browser starts. This may be subject to browser startup settings and permissions.'
  - Appearance:
    - Global Display Mode: Radio buttons: “Auto” (default, follows OS/browser preference), “Light", “Dark.” This setting determines whether the light or dark variant of the active Workspace theme is used.
    - UI Density: Radio buttons to adjust the overall visual density of the interface. This affects padding, margins, spacing, and the visual scale of key interactive elements like icon-buttons and text buttons globally. This setting adheres to Material Design density principles.
        - Compact: Reduced spacing and slightly smaller interactive elements, to fit more information on screen while minimizing whitespace. Care will be taken to ensure that interactive elements in Compact mode remain easily discernible and meet minimum accessibility guidelines for target size.
        - Default: Standard Tabitha spacing and default sizing for interactive elements.
        - Comfortable: Increased spacing and slightly larger interactive elements, providing a less dense, more relaxed layout with more generous click/touch targets.
    - Workspace Theme Assignment:
        - A list of all existing Workspaces.
        - For each Workspace, a dropdown menu to select its theme from available Predefined Themes and user-created Custom Themes. The selection is displayed with the theme name and a representative color swatch.
    - Manage Custom Themes:
        - Option to "Create New Custom Theme". This opens an interface where the user:
            - Enters a unique name for the new custom theme.
            - Can select a primary "seed" color (e.g., via a color picker or by entering a hex code).
            - Based on this seed color, the system (utilizing Material Color Utilities) automatically generates a harmonious palette of colors for all UI element roles (defined in Section 6.7.2) for both Light and Dark modes. These automatically generated colors are pre-filled into respective input fields.
            - The user is then presented with a list of UI element labels (e.g., "Workspace Panel", "Folder Panel") with their auto-generated (and now pre-filled) Light Mode and Dark Mode color values.
            - The user can accept the auto-generated palette or further customize any individual color value by entering HTML color names or hexadecimal codes (`#RRGGBB`).
            - An optional color picker (offering Material Design accent colors or a full spectrum picker) may be available next to each input field to assist in manual adjustments or initial seed color selection.
            - The UI for defining custom themes should provide brief explanations or tooltips for each color role, clarifying its purpose and how it's applied, especially for algorithmically derived or layered states like hover/focus.
            - "Save Custom Theme" and "Cancel" buttons.
        - A list of existing user-created Custom Themes. Each custom theme in the list has options to:
            - Edit: Opens the interface described above, pre-filled with the custom theme's current definition.
            - Rename: Allows changing the name of the custom theme.
            - Delete: Permanently removes the custom theme. A confirmation popover is required. If the deleted theme was in use by any Workspace, that Workspace will revert to a default predefined theme, determined by the Global Display Mode's light/dark setting (e.g., the light or dark variant of the initial neutral predefined theme).
        - Note: Predefined themes cannot be edited or deleted from this management interface. Modifying a predefined theme prompts the user to "Save As New Custom Theme" with a different name. The predefined theme's colors serve as the initial values; the user can then choose a new seed color for automatic palette generation based on that, or manually tweak the individual colors.
    - Workspace Representation:
        - A list of all existing Workspaces.
        - For each Workspace, options to set/edit its visual representation in the Workspaces Panel (user-selected emoji or two-character abbreviation). If a user provides a custom abbreviation and later clears it, the representation reverts to the auto-generated abbreviation.
  - Functionality:
    - Open Tabs Panel:
        - Tab Click Action: Checkbox "Enable focusing actual browser tab when clicking a tab in Open Tabs panel" (default: off).
        - Chrome Tab Group Integration (Chrome Browser Only): Checkbox "Enable Chrome Tab Group Integration" (default: ON).
            - Description: "When enabled for Chrome browsers, Tabitha will save the name and color of a tab's group when a Saved Link is created. Upon opening such a link, Tabitha will attempt to restore it to a Chrome tab group with the same characteristics. This setting also enables a 'Save Group as Collection' action in the Open Tabs panel, allowing an entire Chrome tab group to be saved as a new Collection. The Open Tabs panel will also reflect Chrome tab groups in real-time, allowing tabs to be moved between groups directly. If disabled, Tabitha will not store group information for new links, and will not attempt to restore group information for any links (even if previously stored); related actions will be unavailable. Stored group information for existing links is retained if the setting is disabled and will be used again if the setting is re-enabled. This feature is specific to the Chrome browser."
    - Drag to Collection: Enable closing window/tab (default: remain open).
    - Folder/Collection Add Position: Top (default) or bottom. This setting applies to the placement of newly created Folder Components within the list of user-created Folders (below any fixed Folders like "My Collections"), and newly created Collection Components within the selected Folder (including Collections created via "Save" action on a Browser Window component or "Save Group as Collection" action). It does not affect item order within a Collection.
    - Folders Panel Customization:
        - Show 'Starred Collections' Folder: Checkbox "Display the 'Starred Collections' folder in the Folders Panel" (default: ON).
        - Description: "When unchecked, the 'Starred Collections' folder will be hidden from the Folders Panel. Starred collections will still exist but will not be directly accessible via this dedicated folder view. This setting is saved and synced."
    - Tagging:
        - Item-Level Tagging: Checkbox "Enable tagging for individual Saved Links and Notes" (default: OFF).
        - Description: "Allows assigning tags directly to Saved Links and Notes in addition to Collections. When disabled, existing item tags are preserved but hidden from the UI and excluded from search results. Collection-level tagging is always available. Tag definitions and their custom sort order are managed per Workspace (e.g., via the Tag Filter popover). Batch tagging/untagging of multiple selected items is available if this feature is enabled."
    - Collections Panel Customization:
        - Per-Collection View Override: Checkbox "Enable individual view settings for Collection Components" (default: OFF).
        - Description: "When enabled, an icon-button (eye for unlocked, lock for locked state) will appear on each Collection Component's title bar. Clicking this icon allows you to lock a specific display view (List, Cards, etc.) for that individual Collection via a popover, overriding the global View setting from the Collections Panel toolbar. The primary indicator of a locked view is that the Collection will not change its display when the global view is changed."
        - Display Item Count on Collections: Checkbox "Show item count on Collection titles" (default: OFF).
        - Description: "When enabled, the total number of Saved Links and Notes within each Collection will be displayed next to its name (e.g., 'My Collection (7 items)')."
    - Saved Links:
      - Toggle to "Strip tracking parameters from URLs" (default: off).
        - When enabled, Tabitha automatically removes common tracking parameters from URLs when saving links. A small, common default list of parameters (e.g., `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `fbclid`, `gclid`, `msclkid`, `mc_eid`) is included in the initial release. The user can configure this list (add or remove parameters) via a text area, with one parameter per line.
        - Note: Enabling this feature modifies URLs in place upon saving or updating; this change is permanent for those links, and the original URL is not separately stored. This may not work for all websites, and some links might require parameters to function correctly. A brief informational message in the UI will reinforce this.
      - Toggle to "Strip common subdomains from URLs" (default: off).
        - When enabled, Tabitha attempts to remove common general-purpose subdomains from URLs when saving links and for duplicate checking. A default list of these subdomains is provided (e.g., `www.`, `m.`, `mobile.`). The user can configure this list (add or remove subdomains) via a text area, with one subdomain per line.
        - Note: This is also a destructive change for saved URLs, as described above.
      - Parameter Stripping Exceptions:
        - Do not strip parameters for these domains: List domains where no parameters should be stripped (e.g., sites where parameters are essential). This rule takes precedence if a domain matches both a "Do not strip" and a "Strip all" rule. This list also governs whether common subdomains (from the configured list for the "Strip common subdomains" setting) are stripped for matching domains during URL normalization for duplicate checking (i.e., if a domain is in this list, common subdomains for it will not be stripped, even if the general "Strip common subdomains" setting is on).
        - Strip all parameters for these domains: List domains where all parameters should be removed.
        - If a user attempts to add a domain to one list that already exists in the other, a popover will warn "Domain already exists in the other exception list". and prevent the addition.
        - Domains can be added as exact matches or wildcard patterns.
      - Duplicate Management:
        - "Prevent duplicates within the same Collection": When enabled (default: enabled), prevents adding a new Saved Link to a Collection if an identical (normalized) URL already exists in that Collection. A toast notification ("Duplicate link. Not added".) will inform the user. URL normalization for this check involves:
            1. Applying user-defined parameter stripping rules (tracking parameters and any "Strip all parameters for these domains" rules).
            2. Removing `http://` or `https://`. If "Strip common subdomains from URLs" is enabled, common general-purpose subdomains (from the configured list) are also removed, unless a domain matching the URL is present in the "Do not strip parameters for these domains" list (which also prevents common subdomain stripping for that domain).
            3. Ignoring URL fragments/anchors (e.g., `#section`).
        - "Skip duplicates during Collection merge": When enabled (default: enabled), during a Collection merge, if the target Collection already contains a Saved Link with an identical (normalized) URL, the duplicate from the source Collection is not added.
  - Notification Levels: Adjust the verbosity of notifications (Minimal, Standard, Verbose).
  - Link to Keyboard Shortcuts page for viewing and customizing shortcuts.
  - Data Management:
    - Import/Export of Workspaces, Folders, Collections (JSON, CSV, HTML, TXT, Export for Email (HTML) as applicable). JSON exports/imports will include all associated data like assigned tags (reflecting custom tag sort order), theme information where relevant, and custom TXT export templates.
    - Import/Export of all global settings (JSON format, which includes custom theme definitions, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting).
    - Manage Custom TXT Export Templates for Saved Links:
      - An interface to create, edit, name, and delete custom templates for the TXT export of Saved Link Items. This allows users to go beyond the extension's predefined TXT formats.
      - Contextual Guidance: The interface will provide clear instructions and examples of placeholder usage. Tooltips will explain each placeholder.
      - Placeholders:
        - `{title}`: The title of the Saved Link.
        - `{url}`: The URL of the Saved Link.
        - `{description}`: The description of the Saved Link (outputs an empty string if no description exists).
        - `{tags}`: A comma-separated list of tags assigned to the Saved Link Item (outputs an empty string if no tags are assigned or if item-tagging is disabled), displayed in their user-defined sort order.
      - Usefulness of `{tags}` placeholder: Including tags in exported text provides immediate contextual information about the link's purpose, project, or status when viewed outside Tabitha. This can be helpful for quick manual review, manual filtering/searching within text documents, basic integration with other systems, or conveying metadata when sharing lists of links. (This detailed explanation of usefulness is for the PRD; the UI would present this more succinctly via tooltips or brief hints).
      - These templates are saved as part of the user's settings data (specifically, within the "custom TXT export templates" array) and are synced to the cloud.
    - Export logs for debugging.
  - Cloud Sync: Re-authenticate/disconnect.
  - Console Logging: Toggle (default: off).
  - Recycle Bin Retention:
    - Option: “Recycle Bin retention period” with a box to enter 0 to 30 days (default: 30). When set to 0, the Recycle Bin icon is not displayed on the Workspace panel.
    - Description: “Items in the Recycle Bin are permanently deleted after this period. Set to 0 for immediate deletion.”
    - Warning: If set to 0 days, items are deleted immediately and permanently upon deletion, bypassing the Recycle Bin. There will be no way to recover these items. Confirmation prompts will apply for permanent deletions.
- Functionality:
  - Settings are saved to IndexedDB and synced to the cloud. Custom theme definitions, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting are part of the synced settings data. Tag definitions and their custom sort order are part of Workspace data, also saved and synced.
  - Toasts for success/errors. Configurable from verbose to critical only (default critical errors only).
  - Changing the retention period updates the Recycle Bin behavior immediately, persisted to IndexedDB and synced to the cloud.
  - If the retention period is reduced (e.g., from 30 to 10 days), items already in the Recycle Bin exceeding the new period are scheduled for permanent deletion during the next background cleanup. A toast notification informs the user: “Recycle Bin cleanup initiated. Older items are being permanently deleted in the background.” (Notification verbosity depends on settings). Another toast can confirm completion if settings allow. Displays a toast on change: “Recycle Bin retention set to (number) days.”

##### 6.6.4 Keyboard Shortcuts Page
- Purpose: Provides a detailed list of all keyboard shortcuts, both global and panel-specific, and allows users to customize them.
- Content:
  - Global Shortcuts (examples, finals to be tested for conflicts):
    - Open Search: Ctrl+K or / (Activates the Search UI Bar in the Collections Panel)
    - Open Help: F1
    - Open Settings: Ctrl+Shift+S
    - Switch to Next Panel: Ctrl+Right
    - Switch to Previous Panel: Ctrl+Left
    - Activate Panel Resize Mode: Ctrl+Alt+R (for the currently focused panel)
    - Go Back to Previous Note (after internal link navigation): `Ctrl+Alt+Backspace`.
  - Panel-Specific Shortcuts (when a panel is focused):
    - Navigate Up: Up Arrow
    - Navigate Down: Down Arrow
    - Select Item: Enter
    - Add New Item: Ctrl+N
    - Rename/Edit Selected Item: F2 (Rename for Folders; Edit for Workspaces, Collection Items, Custom Themes, TXT Templates)
    - Delete Selected Item: Delete
    - Export Selected Item: Ctrl+Shift+E
    - Open Selected Item: Ctrl+O (for Collections and Saved Links)
    - Tag Selected Collection or Item: Ctrl+T (for Collections or Items, depending on focus and if item-tagging is enabled)
    - Add Note to Collection: Ctrl+Shift+N (for Collections)
    - Sort Items: Ctrl+S
    - Move Selected Item: Ctrl+M
    - Pin Selected Collection: Ctrl+P (for Collections)
    - Star Selected Collection: Ctrl+Shift+P (for Collections)
    - Copy Selected Item: Ctrl+C (for Items)
  - Collections Panel Specific Shortcuts:
    - Toggle Expand/Collapse All: Ctrl+Shift+A
    - Maximize Panel: Ctrl+Shift+M
    - Cycle View: Ctrl+Shift+V
    - Open Tag Filter: Ctrl+Shift+T
    - Ctrl + Drag: Copy Collection Item instead of moving
  - Open Tabs Panel Specific Shortcuts:
    - Save Selected Window: Ctrl+S
    - Close Selected Window: Ctrl+W
    - Close Selected Tab: Delete
  - Customization:
    - Users can modify shortcuts and reset to defaults.
    - Tabitha will maintain a small, curated list of critical browser/OS shortcuts that users are prevented from assigning. This list will consist of universally recognized critical shortcuts and will be maintained by developers with community input.
    - If a user attempts to assign a shortcut that is already in use by Tabitha or might conflict with other browser/OS functions (not on the critical blocklist), a warning ("Shortcut '[shortcut]' is already assigned to '[Command Name]'" or "Shortcut '[shortcut]' may conflict with browser/system functions. Assign anyway?") will be displayed. The user can choose to proceed with assigning potentially conflicting shortcuts.
    - If a user reassigns a default Tabitha shortcut (e.g., changes `Ctrl+N` from "Add New Item" to "Open Search"), the original command ("Add New Item") becomes unassigned from that specific shortcut. The Keyboard Shortcuts page will reflect this, showing the command without that shortcut. Tabitha will not attempt to automatically assign a new default shortcut to the unassigned command.
- Access: Linked from both Help and Settings tabs to avoid clutter.

#### Functionality
- Persistence: Immediate persistence to IndexedDB on changes, cloud syncing immediately (throttled to 5 seconds), per Section 7.2.
- Error Handling: Popovers for input errors (e.g., “Invalid name provided.”), toasts for sync issues (e.g., “Offline. Saved locally.”), Settings alerts for persistent issues, per Section 7.3.
- Accessibility: WCAG 2.1 Level AA with keyboard navigation, ARIA (e.g., `aria-label` for buttons, `aria-selected` for active tab), high-contrast, per Section 8.1.
- Performance: Loads in <1s, <10MB memory, per Section 8.3.
- Internationalization: Localized, RTL support, per Section 8.4.

#### Implementation Notes
- Components: React/vanilla JS for tabbed interface, buttons, popovers; Material Design CSS for styling (e.g., active tab underline, hover effects).
- Libraries: Font Awesome (`fa-question-circle`, `fa-cog`, `fa-tag`), Tippy.js, Mousetrap, LocalForage, Fuse.js, Tiptap, DOMPurify, Material Color Utilities, Google API Client.
- Rendering Logic: Entry point (e.g., `section=help`) determines visible tabs:
  - Help/Settings: Render Help and Settings tabs, activate selected tab.
  - Welcome: Render only Welcome tab, hide others.
  - Implemented via conditional rendering (e.g., `if (isOnboarding) renderWelcomeOnly()`).
- State Management: IndexedDB flag tracks onboarding completion, hiding Welcome tab post-onboarding unless re-triggered. Setting for item-level tagging controls relevant UI and search behavior. Setting for "Enable Chrome Tab Group Integration" controls relevant UI and data saving behavior.

### 6.7 Theme System

Tabitha supports a flexible theme system based on Material Design's Color System, allowing each Workspace to have its own color theme. Themes comprise definitions for both light and dark modes, ensuring a consistent and visually appealing experience. Users can select from predefined themes or create and manage their own custom themes. Custom theme definitions are stored as part of the user's overall settings.

#### 6.7.1 Applying Themes

- Global Display Mode: The user sets a global display mode ("Auto", "Light", or "Dark") via the Settings panel (Section 6.6.3).
    - "Auto" (default): Tabitha attempts to detect the system's preferred color scheme (light or dark) using CSS media queries (`prefers-color-scheme`) and applies the corresponding variant (light or dark) of the selected Workspace theme.
    - "Light" / "Dark": Forces Tabitha to use the light or dark variant of the selected Workspace theme, overriding any system preference.
- Initial Default Workspace Theme: The very first Workspace created ("My Workspace," localized if applicable) will initially have its theme determined by checking the system's preferred color scheme (light or dark) and applying the corresponding light or dark variant of a neutral predefined Tabitha theme. If the system preference cannot be determined, the light variant of this neutral predefined theme is used.
- Workspace Theme Selection: Each Workspace can be assigned a specific theme (either predefined or custom) via the Settings panel (Section 6.6.3) or when creating/editing a Workspace (Sections 6.4.1, 6.5.1).
- Application: When a Workspace is active, the extension applies the color palette of its assigned theme, using the light or dark mode variant as determined by the Global Display Mode.

#### 6.7.2 Theme Color Definitions

Each theme, whether predefined or custom, defines a set of color roles mapped to specific UI elements. These roles, derived from Material Design principles, ensure UI consistency and are specified for both light and dark modes. Material Color Utilities will generate a harmonious palette for these roles from a seed color when creating custom themes. Users can then fine-tune these pre-filled values.

The defined color roles are:

- `Collections Panel Background`: The background color for the main content area (Collections panel, Help and Settings tabs). This serves as the primary 'Background' in Material Design terms.
- `Open Tabs Panel Background`: The background color for the Open Tabs panel. This panel shares the same background color as the `Collections Panel Background` to visually unify these complementary working areas, thus also serving as part of the primary 'Background' in Material Design terms.
- `Workspace Panel Background`: The background color for the Workspace panel. Typically a 'Surface' color in Material Design, distinct from the main background.
- `Folder Panel Background`: The background color for the Folder panel. Typically a 'Surface' color, distinct from the main background.
- `Workspace Panel Background` and `Folder Panel Background` are defined as distinct color roles, allowing themes to use different (though often related, e.g., shades of a `Surface` color) backgrounds for these panels to visually denote their hierarchy.
- `Component Background`: The background color for distinct components like cards (e.g., Collection Items in Card View), popovers, and menus. Also a 'Surface' color, potentially different from panel backgrounds for hierarchy.
- `Primary Text Color`: The main color for text content, ensuring high contrast against general backgrounds (panels, components). Corresponds to 'On Background' and 'On Surface' text in Material Design.
- `Secondary Text Color`: A subdued color for less prominent text like descriptions, timestamps, or metadata. Often an 'On Surface' variant with lower emphasis.
- `Accent Color (Primary Interactive)`: The main color for key interactive elements, active selections, important buttons, and highlights. This is the 'Primary' color in Material Design.
- `Text on Accent Color`: Color for text and icons placed on Accent Color backgrounds, ensuring readability. Corresponds to 'On Primary' in Material Design.
- `Standard Icon & Control Color`: Color for general icons and standard interactive controls that do not require the main accent. Often an 'On Surface' color.
- `Hover and Focus State Color`: This effect is achieved using a state layer as per Material Design principles. The visual appearance of hover and focus states is typically generated by applying a semi-transparent overlay derived from appropriate theme colors (e.g., a percentage opacity of the `Accent Color (Primary Interactive)` or an 'On Surface' color, depending on the element being interacted with). This ensures that hover and focus states are visually consistent with the theme and maintain accessibility. The specific colors and opacities for these state layers are determined by Material Design guidelines and applied programmatically based on the theme's core palette.
- `Selection State Background`: Background color for selected items in lists or highlighted drag-and-drop targets. Often derived from the Accent Color or its container variant.
- `Border / Separator Color`: Subtle color for borders between UI elements or panels, and for dividers. Corresponds to the 'Outline' color in Material Design.
- `Warning Color`: Color used for critical actions (like permanent deletion prompts), warnings, and error indicators. This is the 'Error' color in Material Design.
- `Text on Warning Color`: Color for text and icons placed on Warning Color backgrounds, ensuring readability. Corresponds to 'On Error' in Material Design.
- `Tooltip Background`: The specific background color for tooltips, designed for clarity.
- `Tooltip Text Color`: The specific text color for tooltips, ensuring high contrast against the Tooltip Background.

Predefined themes (such as a "Blue" theme, "Green" theme, "Mauve" theme, or a neutral "Default" theme) will have these color roles pre-populated with values that adhere to Material Design principles, ensuring accessibility (e.g., a light theme variant would typically feature a light background with dark text, and its dark counterpart a dark background with light text). When a custom theme is generated from a seed color using Material Color Utilities, the resulting palette will provide harmonious and accessible colors for these roles in both light and dark modes, which will be used to pre-fill the custom theme editor.

#### 6.7.3 Custom Theme Creation and Management

Users can create and manage custom themes via the Settings panel (detailed in Section 6.6.3 - Appearance).
- Creation Process:
    - The user provides a unique name for the new theme.
    - The user selects a primary "seed" color (e.g., for the overall theme accent).
    - The system, utilizing Material Color Utilities, automatically generates a complete, harmonious, and accessible color palette (for both light and dark modes) based on this seed color. This palette populates all the color roles defined in Section 6.7.2.
    - The user is presented with the automatically generated palette where all color role input fields are pre-filled. They can accept this palette as is or further refine any individual color role by directly inputting HTML color names or hexadecimal codes. An optional color picker may assist in these manual adjustments or in the initial seed color selection.
    - The user saves the custom theme.
- Editing Predefined Themes: Predefined themes cannot be directly overwritten. If a user wishes to modify a predefined theme, they are prompted to "Save As New Custom Theme". The predefined theme's colors serve as the initial values. The user can then choose a new seed color to trigger automatic palette generation based on it, or manually tweak the individual inherited colors.
- Storage: Custom theme definitions (name and color role values for light/dark modes) are stored locally in IndexedDB and synced as part of the user's overall settings data via cloud sync.
- Theme Definition Interface: When defining or editing a custom theme, the interface will always provide input fields for both Light Mode and Dark Mode for each color role. This ensures a complete theme definition, regardless of the user's current Global Display Mode setting.

This system provides a balance of ease-of-use through automatic palette generation and fine-grained control for users who wish to customize further, all while maintaining visual coherence and accessibility.

### 6.8 UI/UX Enhancements

#### 6.8.1 Visual Hierarchy

- Description: Differentiate the panel headers and panels with subtle background colors or shading derived from the active theme, and add icons for item types (e.g., Workspace, Folder, Collection).
- Implementation: Use CSS for background shading based on the active theme's color palette (e.g., Surface, Background variants from Material Design) and integrate icons via Font Awesome (Free), bundled as a subsetted WOFF2 font or SVGs (~10-20KB for ~50 icons, e.g., `fa-briefcase` for Workspace, `fa-folder` for Folder, `fa-bookmark` for Collection, `fa-tag` for tags). Apply color changes and highlighting using theme variables (e.g., Primary, On Primary).
- Benefit: Enhances clarity, personalization, and intuitiveness without cluttering the interface. Font Awesome’s varied styles (solid, regular) allow visual distinction, and its familiarity aligns with extension-like design.

#### 6.8.2 Drag-and-Drop Feedback

- Description: Provide visual cues like ghost images and highlighted drop targets during drag-and-drop operations, using colors consistent with the active theme. When copying an item via drag-and-drop (e.g., by holding Ctrl when dragging a Collection Item), a visual cue such as a "+" icon will appear next to the cursor or ghost image to clearly indicate the copy operation.
- Implementation: Use Interact.js for drag-and-drop functionality with ghost images (CSS `opacity: 0.5`) and highlighted targets (e.g., `border: 2px solid var(--theme-primary-color)`). The copy indicator will be an additional element managed by Interact.js or custom JavaScript based on modifier key state. Drag-and-drop reordering for tag definitions will also provide similar visual feedback.
- Benefit: Makes interactions more predictable and user-friendly.

#### 6.8.3 Persistent State

- Description: Save the user’s last UI state (e.g., selected Workspace and its sort order, Folder sort order, Collection sort order, panel collapse state, active theme settings, active tag filters, custom sort order for tags) across sessions.
- Implementation: Use LocalForage to store and retrieve UI state from `IndexedDB`, persisting immediately on changes.
- Benefit: Maintains workflow continuity, improving user efficiency.

#### 6.8.4 Integrated Search
- Description: Tabitha provides a versatile and integrated search capability accessible via a single Search icon in the Workspaces Panel header. Activating search reveals a dedicated Search UI Bar that appears below the standard Collections Panel Header/Toolbar. This UI allows the user to input queries and configure search scope across the current Workspace, including options to search within "All" content, specific "Folder"s, specific "Collection"s, or "Open Tabs". Further options allow targeting specific fields (e.g., "All Information", "Names/Titles Only", "Collection Names Only", "Content Details Only", "Tags Only", "Saved Link Details Only", "Note Details Only") and applying filters like "Match whole word only" or "Exclude matches in Folder and Collection names". Users can employ advanced query syntax (e.g., "exact phrase", OR, NOT) for precise searching, with these options explained via UI hints. A special "Find Duplicates Instead" mode allows identification of duplicate Saved Links or Notes within the selected scope. Search results are displayed dynamically in the main Collections Panel area as a list. The standard Collections Panel Toolbar's View options (List, Cards, etc., with List as default for search, and specific defaults like collapsed Collections for "Collection Names Only" search) and Sort options (Alphanumeric, Date Added, Last Modified Date, Lineage) apply to the search results. If search results are in List View, relevant column headers are clickable to select/reverse sort. Users can interact with search results (e.g., by direct click to open/view, or via a mini toolbar for other actions) without losing the results list. An explicit "Go to Item's Location" action navigates the main UI to the item's context while keeping search results active, allowing users to see the item in its hierarchy and then return to or refine their search. Checkboxes on search results enable batch operations. The search mode is exited by a clear action or by navigating elsewhere in the main UI.
- Implementation: The Search UI Bar appears dynamically. Fuse.js is used for fuzzy search logic based on its default capabilities. Result interactions are handled to maintain search context until explicitly cleared or navigated away from.
- Benefit: Offers a powerful, flexible, yet streamlined and intuitive way to find any content within Tabitha or open tabs, without cluttering the interface or disorienting the user.

#### 6.8.5 Enhanced Tooltips

- Description: Implement informative tooltips for panel header icon-buttons, mini toolbar icon-buttons, truncated text (including tag names), and UI elements.
- Implementation: Use Tippy.js for customizable tooltips with a 200ms hover delay.
- Benefit: Guides the user without overwhelming the interface.

#### 6.8.6 Keyboard Shortcuts

- Description: Introduce shortcuts for common actions (e.g., `Ctrl+N` for new item in focused panel, `Ctrl+Left/Right` to switch panels, `Ctrl+T` to tag selected Collection/Item). These are detailed on the dedicated Keyboard Shortcuts page (Section 6.6.4).
- Implementation: Use Mousetrap to handle keyboard events, with a dedicated Keyboard Shortcuts page listing and allowing customization.
- Benefit: Empowers power users while maintaining simplicity for others.

#### 6.8.7 Efficient Interaction Design

- Description: Ensure the user can perform actions quickly, intuitively, and without unnecessary effort or precise targeting. The interface stays out of the user's way, presenting options only when contextually relevant to maintain an uncluttered and focused experience while preventing accidental actions. Mini toolbars have persistence as described in Section 6.3.
- Implementation:
  - Design common actions to be immediately visible with clear labels or icons in the panel headers, logically grouped and placed near relevant panels.
  - Use well-spaced click targets (adhering to WCAG/Material Design guidelines, e.g., aiming for 44x44 CSS pixels where feasible for primary elements) and forgiving interaction areas (e.g., for drag-and-drop) to eliminate the need for careful aiming and reduce accidental clicks.
  - Enable single-click actions for frequent tasks in the mini toolbars; require explicit confirmation only for critical or irreversible actions (e.g., permanent deletion). Actions moving items to the Recycle Bin (when retention > 0) do not require confirmation.
  - Employ progressive disclosure with hover- or focus-triggered mini toolbars (with persistence per Section 6.3) to reveal advanced options solely when needed, avoiding interface clutter. If a mini toolbar has more than five actions, less frequently used actions are consolidated into a "More" actions menu.
  - Keep animations minimal and purposeful, ensuring they enhance rather than slow down interactions or distract the user's focus.
- Benefit: Enhances user efficiency and satisfaction by streamlining interactions, reducing errors, and maintaining a clean, responsive interface.

#### 6.8.8 Recommended Libraries

- Font Awesome (Free): Icons for Visual Hierarchy (SIL OFL 1.1/MIT, GPL 3-compatible).
- Interact.js: Drag-and-Drop Feedback (MIT, GPL 3-compatible).
- LocalForage: Persistent State and immediate persistence to IndexedDB (Apache 2.0, GPL 3-compatible).
- Fuse.js: Integrated Global Search (Apache 2.0, GPL 3-compatible).
- Tippy.js: Enhanced Tooltips (MIT, GPL 3-compatible).
- Mousetrap: Keyboard Shortcuts (Apache 2.0, GPL 3-compatible).
- Tiptap: Lightweight WYSIWYG editing for Note Item Bodies (MIT, GPL 3-compatible).
- DOMPurify: HTML sanitization for Note Item Bodies (Mozilla Public License 2.0 or Apache License 2.0, GPL 3-compatible).
- Material Color Utilities: For theme palette generation (typically Apache 2.0, GPL 3-compatible).

These enhancements and libraries align with Tabitha’s goals of simplicity, intuitiveness, and performance, ensuring a seamless and efficient user experience while respecting browser extension constraints (cross-browser compatibility, low memory usage).

## 7. Functionality

### 7.1 Real-Time Updates

The Tabitha browser extension features a four-panel interface, where the fourth (rightmost) panel displays open browser windows and their tabs, including Chrome pinned tabs and tab groups, updating in real-time to reflect changes in the browser’s window and tab state—such as creating, removing, updating, or moving a window or tab. This ensures the user always has an accurate, current view of their Open Tabs without manual refreshes. These updates are local to the browser and distinct from cloud syncing or persistence mechanisms, focusing solely on the immediate state of the user’s browsing session.

#### 7.1.1 What the Real-Time Sync Does

- Immediate Updates: The Open Tabs panel instantly reflects changes to the browser’s windows and tabs (e.g., opening a new tab, closing a window, reordering tabs, pinning/unpinning tabs in Chrome, or modifying tab groups in Chrome) as they occur, keeping the display synchronized with the browser’s state.
- Conditional Display: Real-time updates occur only when the Open Tabs panel is visible and not collapsed, ensuring updates reflect the browser's state in that instant.
- Local State Reflection: The feature mirrors the browser’s local state—independent of data persisted to IndexedDB or synced via cloud syncing—showing only what’s currently open.

#### 7.1.2 What It Requires

To implement this real-time functionality, the following components are essential:

1. Event Listening for Window and Tab Changes
   - The extension must monitor all relevant browser events, including:
     - Window creation or removal
     - Tab creation, removal, updates (e.g., URL or title changes), movement, detachment, attachment, pinning/unpinning (Chrome), and tab group changes (Chrome)
   - This relies on the browser’s extension API (e.g., `chrome.windows`, `chrome.tabs`, and `chrome.tabGroups` for Chrome, or `browser.windows` and `browser.tabs` for Firefox), ensuring all state changes are captured.

2. Notification Mechanism
   - When an event occurs, the extension’s background process must notify all visible Tabitha interfaces (e.g., open new tab pages or dedicated tabs).
   - A messaging system (e.g., `chrome.runtime.sendMessage` or `browser.runtime.sendMessage`) communicates these changes from the background to the UI, triggering updates.

3. UI Update Trigger
   - Upon receiving a notification, the UI refreshes to display the latest window and tab state, including pinned tabs and tab groups in Chrome.
   - This involves re-rendering the Open Tabs panel with the current list of browser windows, browser tabs, and Chrome-specific features.

4. Conditional Rendering Logic
   - The UI fetches and displays window/tab data only when the Open Tabs panel is visible and not collapsed, optimizing performance and relevance.

#### 7.1.3 Abstractions Involved

The real-time sync leverages abstractions to simplify development and ensure cross-browser compatibility:

- Browser API for Window and Tab Management
  - An abstraction layer interfaces with the browser’s window and tab APIs, providing a unified way to listen for events and retrieve state data (e.g., a wrapper for `chrome.windows.getAll`, `chrome.tabs.query`, or `browser.windows.getAll`).
  - This hides browser-specific differences, streamlining event handling and data access, including Chrome-specific APIs for pinned tabs and tab groups.
- Messaging System
  - An abstraction for communication between the background process and UI, using a standard message format (e.g., `{ action: "refreshOpenWindows" }`) to decouple components and ensure reliable updates.
- UI Rendering Logic
  - An abstraction manages rendering of the Open Tabs panel, fetching current window/tab data via the browser API abstraction and displaying it conditionally based on the panel’s visibility and collapse state.

#### 7.1.4 Additional Considerations

- Scope Limitation: Real-time updates do not involve persistence to IndexedDB or cloud syncing (e.g., Google Drive), focusing exclusively on the local browser state. Persistence and syncing are reserved for data like Workspaces and Collections.
- Cross-Browser Compatibility: The feature must work across all supported browsers (Chrome, Firefox, Edge, Opera), using compatible APIs and handling platform-specific quirks (e.g., Firefox on Linux may require additional testing for window management). Chrome-specific features like pinned tabs, tab groups, and the "Save Group as Collection" action are supported only in Chrome and only if the "Enable Chrome Tab Group Integration" setting is active.
- Performance: The current design re-renders the entire UI on each event, which is acceptable for typical use. If performance issues arise (e.g., with many windows/tabs), partial updates to just the Open Tabs panel could be considered.
- Visibility and Collapse Awareness: Updates are applied only when relevant, respecting the Open Tabs panel’s visibility and collapse state.

This real-time sync ensures the Open Tabs panel remains a dynamic, reliable tool for managing the user’s browsing session, enhancing Tabitha’s goal of providing an intuitive tab organization system.

### 7.2 Online Syncing

The online syncing feature in Tabitha ensures that all user-generated data—Workspaces (including their tag definitions and custom sort order), Folders, Collections, Items (with their assigned tags), Recycle Bin contents, and user settings (which include custom theme definitions, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting)—remain consistent across different devices or logins. This allows the user to access and manage their organized tabs and Saved Links seamlessly, regardless of the browser or operating system. Syncing is achieved through OAuth-based authentication and a cloud-based storage mechanism (e.g., Google Drive), ensuring secure and reliable data synchronization across all supported platforms.

Client-Side Operation with Immediate Persistence and Cloud Syncing: Tabitha operates entirely as a client-side browser extension, with all data processing and browser interactions occurring locally within the user’s browser. No server is required beyond the use of cloud storage (e.g., Google Drive) for cloud syncing. Changes are immediately persisted to IndexedDB for local durability and queued for cloud syncing to ensure consistency across devices.

#### 7.2.1 Purpose

- Immediate Persistence: Ensures that all changes (e.g., adding a Workspace, editing a Collection, modifying a Saved Link or Note, creating/editing a custom theme or custom TXT export template, assigning/modifying tags, reordering tags, changing the "Enable Chrome Tab Group Integration" setting) are saved to IndexedDB as soon as they occur, providing robust offline support and protecting against data loss due to browser crashes or closures.
- Cloud Syncing: Maintains data consistency across all instances of Tabitha on different devices or logins.
    - "Active edits" (continuous user input like typing in a Note body or template editor) trigger sync approximately 5 seconds after input pauses, batching changes from that session.
    - Discrete atomic changes (e.g., renaming an item, starring, reordering tags, toggling a setting) are persisted locally immediately. If multiple such changes occur rapidly, they are batched, and sync is attempted approximately 5 seconds after the last change in that sequence.

#### 7.2.2 Authentication via OAuth

Tabitha uses OAuth to securely authenticate the user with a cloud storage provider (e.g., Google Drive) and gain access to a private storage space for cloud syncing.

- Process:
  - The authentication process requests an access token from the cloud provider using the browser’s identity API (e.g., `chrome.identity` for Chrome or equivalent APIs in Firefox).
  - If no valid token exists or user interaction is required, the system prompts the user to log in via an OAuth flow, opening a browser-based authorization page.
  - The token is cached locally (e.g., in browser storage) for reuse in subsequent requests, ensuring efficient access across sessions.
  - The token can be cleared for logout or re-authentication, triggering a new OAuth flow when needed.
- Outcome: Provides a secure, reusable token that authorizes Tabitha to perform storage operations on behalf of the user for cloud syncing, compatible with both Chrome and Firefox implementations.

#### 7.2.3 Synchronization Mechanism

The synchronization mechanism ensures that user data in Tabitha is reliably persisted locally and synchronized across devices, supporting both offline and online use cases. It leverages immediate persistence to IndexedDB and cloud syncing for cross-device consistency.

- Immediate Persistence Mechanism:
  - Behavior: When changes occur (e.g., adding a Workspace, editing a Collection, modifying a Saved Link or Note, creating/editing a custom theme or custom TXT export template, assigning/modifying tags, reordering tags, changing the "Enable Chrome Tab Group Integration" setting), they are immediately saved to IndexedDB. This ensures that data is durable and available offline, even in the event of a browser crash or unexpected closure.
  - Offline Support: All changes are persisted locally, regardless of internet connectivity, guaranteeing data safety and availability.

- Cloud Syncing Mechanism:
  - Timing: When the device is online, changes are synced to the user’s private cloud storage as per the throttling rules defined in Section 7.2.1.
  - Behavior: Changes are queued for cloud syncing immediately after being persisted to IndexedDB. If online, syncing occurs as soon as possible per throttling; if offline, changes remain in IndexedDB and sync automatically when connectivity is restored.
  - Data Storage: User data is stored in a structured JSON format (typically per Workspace, plus a separate file for global settings). This includes user settings (containing custom theme definitions, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting), Workspace data (containing tag definitions with their custom sort order, and assignments to Collections and Items within that Workspace), and Note Item bodies (as HTML). This data resides within the user’s private cloud storage, ensuring it remains secure and accessible only to the authenticated user.
  - Data Retrieval: On startup or after login, the system fetches the latest cloud data (if online) and merges it with the local IndexedDB state, prioritizing the most recent changes based on timestamps. If offline, it relies solely on the IndexedDB cache.
  - Background Sync: The system periodically checks for any unsynced changes in IndexedDB (e.g., every 30 seconds when online) and syncs them to the cloud, ensuring all changes are eventually synchronized.
  - Recycle Bin: Deleted items in the Recycle Bin, including their deletion timestamps and hierarchical metadata (e.g., original Folder/Collection for restoration, and original assigned tags reflecting their custom sort order), are included in the JSON data synced to the cloud. Syncing ensures that Recycle Bin contents are consistent across devices, with items restorable or permanently deleted from any instance. Unlike exports (Section 7.4.2), which exclude Recycle Bin items, Recycle Bin data is included in cloud syncs to support restoration or permanent deletion from any device. Background cleanup of items exceeding the retention period is synchronized, ensuring no duplicate deletions or inconsistencies. If a device has been offline exceeding the retention period, upon syncing, it will align with the cloud's authoritative state regarding cleaned-up items.
  - Conflict Handling: In the event of simultaneous edits across devices, the system resolves conflicts by favoring changes with the most recent timestamp.
    - The system compares the incoming cloud JSON object (e.g., for a Workspace) with the local version. If top-level timestamps differ, it attempts to merge intelligently.
    - For individual items or properties (e.g., Note body, Saved Link URL, tag color, custom theme color, TXT template string, "Enable Chrome Tab Group Integration" setting value) that have unique IDs and last-modified timestamps within the JSON structures, the version with the latest timestamp "wins".
    - If a parent entity is modified (e.g., Collection renamed) and a child entity within it is also modified (e.g., Note edited), and these actions have different timestamps, the system strives to preserve both latest changes (e.g., the edited Note within the renamed Collection). If a Collection was deleted on Device A and a Note within it was edited on Device B with a later timestamp, the Note and its parent Collection will be "un-deleted" and restored.
    - If an item is "un-deleted" and its original parent entity no longer exists and a different active entity now has the same name at that path, the re-created parent entity will be uniquely named (e.g., "Original Parent Name (Restored YYYY-MM-DD HH:MM:SS)").
    - If timestamps for a specific item are identical (a rare occurrence), a duplicate/conflicted copy of the item is created (e.g., appending `(conflict YYYY-MM-DD HH:MM:SS)` to its name/title) to prevent data loss. The user will be notified.
    - In general, the "last write wins" principle is applied at the most granular level tracked that has a timestamp. If clear granular resolution isn't feasible, the version of the larger encompassing JSON object with the latest top-level timestamp takes precedence. Notifications about resolved conflicts follow the user's configured notification level.
  - Initial Cloud Sync Behavior:
       Scenario 1: Against an empty or default cloud state: The device's local data overwrites the cloud state.
       Scenario 2: Against a cloud state with pre-existing user data from another device: Standard conflict resolution (last write wins based on timestamps, duplicate creation for identical timestamps) applies. After this merge, a modal dialog ("Initial sync complete. Data from this device and the cloud have been merged. Please review your workspaces.") requiring user dismissal will be displayed.
       Race Condition (Simultaneous Initial Sync): If two fresh instances with different local data attempt initial sync to empty cloud storage concurrently, the cloud provider's API determines the first successful write. The second device then fetches this state and performs a merge as per Scenario 2.
    After the initial sync, subsequent synchronizations follow standard conflict resolution.
  - Workspace `lastModifiedDate` Sync: A Workspace's `lastModifiedDate` is updated by direct user actions on the current device or by synced changes originating from another device's user action. Syncing data that results in no net change does not update this timestamp. The same logic applies to Folder `lastModifiedDate` and Collection Component `lastModifiedDate`.
  - Storage Full/Network Interruption:
    - If cloud storage is full, a persistent error notification appears in Settings and via the sync status indicator, advising the user. Sync attempts are paused until resolution.
    - If a network interruption occurs mid-transfer for a data unit (e.g., Workspace JSON), that transfer fails. Tabitha reverts to an "offline" sync state. Upon reconnection, sync for failed/pending units is retried, restarting the transfer for that unit.

- Interaction Between Persistence and Cloud Syncing:
  - When a change is made (e.g., adding a Note, tagging an item, creating a custom TXT export template, reordering tags, changing the "Enable Chrome Tab Group Integration" setting), it is immediately persisted to IndexedDB. If online, the change is also queued for cloud syncing per throttling rules. If offline, the change remains in IndexedDB and is synced when connectivity is restored.

- User Feedback:
  - Status Indicator: A subtle, always-visible indicator shows:
    - Green checkmark: All changes are synced to the cloud.
    - Yellow clock: Changes are saved locally, pending sync (e.g., offline).
    - Red exclamation: Sync error or conflict detected.
    - Clicking, hovering over, or focusing on the indicator displays a popover with details and actions (e.g., "Retry Sync").
  - Notifications: Limited to critical events as per notification levels (Minimal, Standard, Verbose).
    - "Sync failed. Click for details".
    - "Offline. Changes will sync when online".
  - Settings: Users can adjust notification levels (Minimal, Standard, Verbose) for tailored feedback.

This design ensures that data is always preserved locally via immediate persistence, synced efficiently to the cloud when possible, and provides clear user feedback without unnecessary interruptions, while preventing data loss in multi-device scenarios.

#### 7.2.4 Key Components

The following components ensure robust authentication, local persistence, and synchronization:

1. AuthManager:
   - Manages OAuth authentication with the cloud provider for cloud syncing.
   - Handles token acquisition, caching, and clearing, abstracting provider-specific details for cross-browser compatibility.
2. StorageManager:
   - Abstracts storage operations, interacting with the cloud provider’s API for cloud syncing and local IndexedDB for immediate persistence.
   - Manages listing, uploading, and downloading files for cloud syncing, and caching data locally for persistence and offline access.
3. SyncManager:
   - Orchestrates cloud syncing between local IndexedDB and cloud storage.
   - Handles on-demand syncing for changes (per throttling rules), retrieves data from the cloud or IndexedDB cache, and performs periodic background syncs for queued offline changes.
4. DataManager:
   - Maintains the hierarchical data model (Workspaces including their tag definitions and custom sort order, Folders, Collections, Saved Links and Notes including their assigned tags and saved tab states, and user settings including custom theme definitions, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting).
   - Coordinates with StorageManager for immediate persistence to IndexedDB and SyncManager for cloud syncing, ensuring defaults like the "My Workspace" Workspace (localized if applicable) and "My Collections" Folder (localized if applicable) exist and changes are persisted and synced appropriately.

#### 7.2.5 Abstractions

These abstractions ensure modularity and extensibility across browsers and platforms:

- Authentication Abstraction:
  - Encapsulates the OAuth flow for cloud syncing, isolating provider-specific details (e.g., Google Drive’s API).
  - Enables potential integration with other providers (e.g., Dropbox) by swapping authentication logic.
- Storage Abstraction:
  - Separates storage operations for persistence (IndexedDB) and cloud syncing (cloud provider), abstracting specifics of each backend.
  - Supports different storage backends without altering core logic, ensuring flexibility for Chrome and Firefox.
- Sync Abstraction:
  - Manages cloud syncing timing and logic, including offline queuing and background syncs.
  - Allows adjustments to sync strategies independently of storage or data management.
- Data Model Abstraction:
  - Provides a clean interface to manipulate hierarchical data and settings, hiding complexities of persistence and syncing.
  - Simplifies user interactions while ensuring changes propagate correctly through both mechanisms.

#### 7.2.6 Requirements for Syncing Across Devices or Logins

To enable synchronization of all user data across devices or logins, the following are required:

- Cloud Storage:
  - A cloud provider account (e.g., Google Drive) with a private folder for storing JSON files via cloud syncing.
- OAuth Configuration:
  - A properly configured OAuth setup, including a client ID registered with the cloud provider and embedded in the extension’s manifest (e.g., `manifest.json` for Chrome and Firefox), for cloud syncing authentication.
- Structured Data Format:
  - Data stored as JSON files with a clear hierarchy (user settings including custom themes, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting; Workspaces including their tag definitions and custom sort order; Folders; Collections; Items with their assigned tags and saved tab states; and Recycle Bin data), including metadata like version numbers and timestamps, for both persistence and syncing. Note Item Bodies are stored as HTML within this JSON structure.
- Synchronization Logic:
  - Mechanisms to persist changes immediately to IndexedDB and sync to the cloud when online (per throttling rules), download updates, and handle conflicts using timestamps and versioning as described in Section 7.2.3.
- Offline Support:
  - Local caching via IndexedDB ensures data is always available and changes are queued for syncing when offline.
- Network Connectivity:
  - Reliable internet access for real-time cloud syncing, with fallback to local IndexedDB persistence when unavailable.

### 7.3 Error Handling / Feedback Mechanisms

This section outlines how the Tabitha browser extension manages errors and provides feedback to the user, ensuring a seamless and transparent experience. It emphasizes simplicity, user-friendliness, and privacy by excluding telemetry, with console logging as an optional feature controlled via Settings.

#### 7.3.1 Error Detection and Categorization

- Types of Errors:
  - Network Errors: Failures in cloud syncing, such as connectivity issues with Google Drive for OAuth or data sync.
  - API Errors: Problems with browser APIs (e.g., `chrome.tabs`, `chrome.windows`, `chrome.tabGroups`) due to missing permissions or browser-specific quirks.
  - User Input Errors: Invalid user inputs, like creating a Workspace with an empty name, issues related to Note Item creation/editing (e.g., empty Note title), invalid tag names or reordering issues, invalid color codes in custom theme editor, or errors in custom TXT export template syntax.
  - Data Conflicts: Rare sync conflicts from offline changes across multiple devices during cloud syncing, handled as per Section 7.2.3.
  - Storage Errors: Issues with local IndexedDB persistence or cloud storage limits (e.g., quota exceeded).
  - UI Errors: Rendering or drag-and-drop failures (e.g., dropping items on invalid targets), issues with the WYSIWYG editor for Notes, or theme application problems.
- Detection Methods:
  - Use JavaScript `try-catch` blocks for synchronous and asynchronous operations (e.g., API calls, persistence, syncing, Note editor interactions, theme processing, tag management including reordering, TXT template processing).
  - Check browser API responses for errors (e.g., `chrome.runtime.lastError`).
  - Implement timeout handling and status code checks for network requests (e.g., 401 for OAuth failures in cloud syncing).

#### 7.3.2 User Notifications

- Philosophy: Notifications are concise, clear, and actionable, using plain language to ensure accessibility and avoid overwhelming the user.
- Mechanisms:
  - Status Indicator: Located at the bottom of the Workspaces panel, this always-visible element changes color based on sync status:
    - Green checkmark: All changes are synced.
    - Yellow clock: Changes are saved locally, pending sync.
    - Red exclamation: Sync error or conflict detected.
    - Clicking, hovering over, or focusing on the indicator displays a popover with details and actions (e.g., "Retry Sync").
  - Popovers: Display context-specific errors near the relevant UI element (e.g., “Workspace name cannot be empty”; “Note title cannot be empty”; "Invalid color value provided for [UI Element Name]"; "Tag name cannot be empty"; "Invalid TXT template: Unknown placeholder"). Include custom-styled text buttons like “OK” or “Retry.”
  - Toasts: Show transient, non-blocking messages (e.g., “Cloud sync failed. Changes saved locally and will sync when online”) in the bottom-right corner, auto-dismissing after 5 seconds, styled with Tippy.js. When multiple items are affected by a single batch operation (e.g., moving 50 items to Recycle Bin), a single summary toast will be displayed.
  - Settings Panel Alerts: Present persistent errors (e.g., “OAuth token expired. Please re-authenticate for cloud syncing”) in the Settings panel with a resolution custom-styled text button (e.g., “Re-authenticate”).
  - Modal Dialogs: Used for critical notifications requiring explicit user acknowledgement, such as the "Initial sync complete...merged" message (see Section 7.2.3).
  - Color Coding: Use red (`#dc3545`) for errors, yellow (`#ffc107`) for warnings, and green (`#28a745`) for success, adhering to WCAG contrast ratios.
- Notification Levels: Users can adjust the verbosity of notifications via Settings:
  - Minimal: Only critical error notifications where user action might be required or data loss is a risk. Success messages are generally omitted.
  - Standard: Critical error and important warning notifications. Success messages are generally omitted.
  - Verbose: All notifications, including errors, warnings, and success confirmations (e.g., for Recycle Bin actions, tag operations, tag reordering).
- Examples:
  - Network Error: “Failed to sync with cloud. Working offline. Changes persisted locally. Check your connection and try again.”
  - Input Error: “Invalid name. Name cannot be empty.”
  - API Error: “Unable to access browser tabs. Please ensure Tabitha has the necessary permissions.”
  - Storage Error: “Persistence to IndexedDB failed. Check browser storage settings.”
  - Recycle Bin-Specific Notifications:
    - Toast on moving items to Recycle Bin: “X item(s) moved to Recycle Bin. View in Recycle Bin to restore or delete permanently.” (This applies when Recycle Bin retention is > 0 days).
    - If notification level is "Verbose":
        - Toast on restoration from Recycle Bin: “(count) item(s) restored.”
        - Toast on permanent deletion from Recycle Bin: “(count) item(s) permanently deleted.”
    - Popover for permanent deletion from Recycle Bin: “Are you sure you want to permanently delete these (count) items?” with “Cancel” or “Delete Permanently.”
    - Status indicator updates for Recycle Bin sync issues mirror general sync status.

#### 7.3.3 Logging

- Purpose: Facilitate debugging for developers via user-reported issues on GitHub, while prioritizing user privacy by excluding telemetry.
- Implementation:
  - Console Logging:
    - Errors and warnings (e.g., persistence failures, sync issues, Note editor issues, theme processing errors, tag management issues including reordering, TXT template processing errors) are logged to the browser console (e.g., `console.error`, `console.warn`) with non-sensitive details (e.g., error codes, timestamps, operation type like “persistence” or “sync”).
    - Default State: Disabled to reduce performance impact and respect privacy. The user can enable it in the Settings panel to assist with debugging.
  - Local Logging:
    - Critical errors (e.g., sync or persistence failures) are stored in IndexedDB with a 3-day retention period to limit storage use.
    - Logs are structured as JSON (e.g., `{ "timestamp": "2025-04-17T10:00:00Z", "type": "sync", "error": "401 Unauthorized" }`).
    - The user can export logs via a “Share Logs” custom-styled text button in Settings, generating a downloadable JSON file for GitHub submission.
  - No Telemetry: No automatic error reporting or data collection occurs. All logging is local and user-controlled.
- User Control:
  - In Settings, a toggle labeled “Enable Console Logging” (default: off) allows the user to activate console logs. A note clarifies: “Logs are visible only in Developer Tools and not shared externally.”
  - The “Share Logs” custom-styled text button exports IndexedDB logs, giving the user full control over sharing with developers.

#### 7.3.4 Recovery Mechanisms

- Automatic Recovery:
  - Network Failures: Queue offline changes in IndexedDB, syncing them to the cloud when connectivity returns, with a toast confirming success (e.g., “Cloud sync completed”).
  - OAuth Issues: Silently refresh expired tokens for cloud syncing; if unsuccessful, prompt re-authentication in Settings.
  - API Failures: Retry failed API calls up to 3 times with exponential backoff (e.g., 1s, 2s, 4s) before notifying the user.
- User-Initiated Recovery:
  - Include actionable custom-styled text buttons in notifications (e.g., “Retry Cloud Sync", “Re-authenticate”).
  - Add a troubleshooting section in the Help panel (e.g., “If cloud sync fails, check your internet and re-authenticate in Settings. Local data is safe in IndexedDB.”).
- Fallbacks:
  - Default to local IndexedDB data if cloud sync fails, ensuring uninterrupted functionality.
  - Revert UI to its previous state if drag-and-drop fails, with a toast (e.g., “Cannot move Collection to another Workspace”).

#### 7.3.5 Feedback for Success

- Confirmation Messages: Toasts are used for success confirmation primarily when the action's outcome isn't immediately visually apparent or for "Verbose" notification level.
- Visual Cues: Update the UI immediately (e.g., a new Collection appears in the Collections panel, a tag appears on an item, tag order changes in display) as implicit success feedback.

#### 7.3.6 Accessibility Considerations

- Ensure notifications meet WCAG guidelines:
  - Use ARIA attributes (e.g., `aria-live="polite"`) for screen reader compatibility with toasts.
  - Make popover and modal dialog custom-styled text buttons keyboard-navigable (e.g., Tab to focus, Enter to confirm).
  - Maintain high-contrast colors and a minimum font size of 14px.

#### 7.3.7 Cross-Browser Compatibility

- Handle browser-specific error cases:
  - Chrome: Check `chrome.runtime.lastError` for API issues, including `chrome.tabGroups`.
  - Firefox: Adapt to `browser.runtime` messaging differences.
  - Edge/Opera: Ensure Chromium-based API compatibility.
- Use Tippy.js and bundled fonts (e.g., Roboto) for consistent notification styling across browsers.

#### 7.3.8 Testing and Validation

- Unit Tests: Simulate error conditions (e.g., network loss, invalid input, persistence failures) using Jest.
- User Testing: Confirm notification clarity with diverse users.
- Edge Cases: Test rare scenarios like simultaneous edits or storage limits during syncing.

This approach ensures Tabitha gracefully handles errors, provides intuitive feedback, and respects user privacy by excluding telemetry and making console logging optional, aligning with its user-focused, open-source ethos.

### 7.4 Import and Export Formats

The Tabitha browser extension supports importing and exporting data in multiple formats to meet various user needs, including data migration, backups, manual sharing, and external analysis. JSON is the primary format for comprehensive data transfer, encompassing the full data structure including tag definitions and their custom sort order, assignments, theme information where relevant, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting.

#### 7.4.1 Supported Formats

Tabitha supports the following formats for importing and exporting data:

- JSON: A structured format that preserves the full hierarchy of Workspaces (including their tag definitions and custom sort order), Folders, Collections, Saved Links (including saved tab states like pinned status or Chrome tab group affiliation if "Enable Chrome Tab Group Integration" setting is active), Notes (Note titles as plain text, Note Bodies as HTML), and assigned tags. User settings exports also use JSON and include custom theme definitions, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting. Ideal for backups and data migration.
- CSV: A tabular format for exporting Saved Links and Notes, enabling manipulation or analysis in spreadsheet applications (e.g., Excel, Google Sheets). Tag information may be included as a comma-separated list in a "Tags" column (tags listed in their user-defined sort order). Saved tab states are generally not exported in CSV.
- HTML (Netscape Bookmarks): A format for exporting Saved Links as a standard Netscape-compatible bookmark file, for use with other browsers or bookmark managers. Tags and saved tab states are generally not part of this format.
- Export for Email (HTML): A specialized HTML format designed for sharing content via email. It generates a single, well-structured HTML file containing Saved Links, Notes (with their full HTML Bodies), and their assigned tags (displayed in user-defined sort order) from the selected scope. Saved tab states are not included in this export.
- TXT: A plain text format for exporting Notes or lists of Saved Links. For Saved Links, users can choose from several predefined output formats or use their own custom templates (managed in Settings, see Section 6.6.3) that utilize placeholders like `{title}`, `{url}`, `{description}`, and `{tags}` (tags output in user-defined sort order) for flexible formatting. Saved tab states are not included in TXT exports.

#### 7.4.2 Export Functionality

Users can export data from different scopes within the Tabitha interface, with options to select formats and configure the output.
  - Recycle Bin Exclusion: Deleted items in the Recycle Bin are excluded from all exports to maintain clarity and prevent unintended data exposure. Only active Workspaces, Folders, Collections, Saved Links, Notes, and their associated data are exported.

##### 7.4.2.1 Export Scope
- Entire Workspace: Exports the Workspace data, which includes all its Folders, Collections, Saved Links, Notes (with their assigned tags), all tag definitions for the Workspace (including their custom sort order), and its assigned theme (with the full custom theme definition if applicable). Initiated via the Workspace Component’s mini toolbar "Export" option (Section 6.5.1).
- Selected Folders: Exports the selected Folders and their contents (Collections, Saved Links, Notes, and their associated assigned tags, reflecting custom tag sort order). Available when multiple Folders are selected via checkboxes in the Folders panel (Section 6.5.2).
- Selected Collections: Exports the selected Collections and their contents (Saved Links, Notes, and their associated assigned tags, reflecting custom tag sort order). Available when multiple Collections are selected via checkboxes in the Collections panel (Section 6.5.3).

##### 7.4.2.2 Export Process
1. Initiate Export: The user selects the scope (Workspace, Folders, or Collections) and clicks "Export" from the relevant mini toolbar or selection popover.
2. Format Selection: A popover prompts the user to choose a format (JSON, CSV, HTML (Netscape Bookmarks), Export for Email (HTML), TXT).
3. Configuration (for TXT): If TXT is selected for an export containing Saved Links, the user can choose from a list of predefined format options (e.g., "Plain Text URLs," "Simple List," which are built into the extension) or select "Use Custom Template." If "Use Custom Template" is chosen, a further selection allows the user to pick from their personally created and saved custom TXT export templates (managed in Settings, Section 6.6.3). The popover will provide a brief hint or tooltip that custom templates utilize placeholders like `{title}`, `{url}`, `{description}`, and `{tags}` (tags output in user-defined sort order) for user-defined output structures (full details on template creation are available in Settings). For exports containing only Notes, or if no custom templates are defined by the user, predefined format options for Notes are presented. Assigned tags (in user-defined sort order) may be included in outputs depending on the chosen predefined format or the user's custom template.
4. Confirmation: The user confirms the export, and the file is generated.
5. Download: The file downloads automatically with a default filename (e.g., `Tabitha_Workspace_Workspace_YYYYMMDD.json` or `Tabitha_Email_Export_Collection_YYYYMMDD.html`). If the original name (of Workspace, Folder, or Collection) contains characters problematic for OS filenames, they are sanitized (e.g., replaced with a single underscore `_`, with multiple consecutive problematic characters collapsed into one underscore) in the suggested export filename and potentially in internal structures within file formats like HTML bookmarks if the format has character set limitations.

##### 7.4.2.3 Format-Specific Export Details
- JSON:
  - Exports the data structure relevant to the scope. For a Workspace, this includes its tag definitions and their custom sort order, and assigned theme (with full custom theme definition if applicable). For Folders/Collections/Items, it includes their content, assigned tags (reflecting custom tag sort order), and for Saved Links, any saved tab states (e.g., pinned, Chrome tab group affiliation if "Enable Chrome Tab Group Integration" setting is active). Note Item Titles are plain text, and Note Item Bodies are HTML.
  - When exporting global settings (from Section 6.6.3), the JSON file includes all custom theme definitions, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting.
  - Ensures import compatibility for full data restoration.
- CSV:
  - Exports Saved Links with columns: Title, URL, description, favicon URL, Tags (comma-separated list of assigned item tags, in user-defined sort order). Saved tab states are not exported.
  - Exports Notes with columns: Note title, Note body (plain text representation, with HTML tags stripped from the original Note body), Tags (comma-separated list of assigned item tags, in user-defined sort order).
  - Includes a Collection column for context when exporting Workspaces or Folders, and this Collection column may also list assigned Collection tags (in user-defined sort order).
- HTML (Netscape Bookmarks):
  - Exports Saved Links as a Netscape-compatible bookmark file. Tabitha Collections are represented as bookmark folders (e.g., using `<DT><H3>collection_name</H3>`), and Saved Links as entries within them. Note Items, tags, custom tag sort order, and saved tab states are not typically part of HTML bookmark exports. Problematic characters in Collection names (used as folder names) will be sanitized.
- Export for Email (HTML):
  - Generates a single HTML file containing Saved Links, Notes, and their assigned tags (both Collection and Item tags, displayed in user-defined sort order) from the selected export scope. Saved tab states are not included.
  - The HTML is structured to be easily copy-pasted into a rich text email client while preserving formatting and link functionality.
  - Content is typically organized hierarchically (e.g., Workspace name, then Folder names, then Collection names as headings, with their assigned tags displayed in user-defined sort order).
  - Saved Links: Rendered as clickable anchor tags (e.g., `<a href="URL">Title</a>`) with their descriptions and assigned item tags (in user-defined sort order), if available, displayed alongside.
  - Notes: Rendered with their Title (e.g., as a sub-heading) followed by their full HTML Body content and assigned item tags (in user-defined sort order), preserving formatting such as headings, bold, lists, and hyperlinks.
  - The generated HTML uses basic, semantic tags and minimal inline styling to ensure broad compatibility with email clients.
- TXT:
  - Exports Notes with Title and Body (plain text representation, with HTML tags stripped from the original Note body), and assigned item tags (e.g., as a line `Tags: tag1, tag2`, in user-defined sort order), based on predefined formatting. Saved tab states are not included.
  - Exports Saved Links using either predefined format options (fixed formats provided by Tabitha) or a user-defined custom template (created and managed by the user in Settings, Section 6.6.3).
    - Predefined Format Options (examples): These are fixed output styles provided by the extension.
      - Plain Text URLs: Simply lists each URL on a new line (e.g., `https://example.com`).
      - Simple List: A user-friendly plain text representation, e.g., `title - url (Tags: tag1, tag2)` where tags are in user-defined sort order.
        (Note: Developers may add other common predefined formats based on user feedback, but the initial offering will be lean and focused on broad utility.)
    - Custom Templates: Allows users to define their own output string for each Saved Link Item using placeholders. This provides greater flexibility than the predefined formats.
      - Placeholders are detailed in the template management interface in Settings (Section 6.6.3) and include `{title}`, `{url}`, `{description}`, and `{tags}` (tags output in user-defined sort order).
      - Important: This custom template feature provides flexible text formatting. It is not a substitute for dedicated citation management tools and does not guarantee compliance with academic citation styles, which often require additional metadata not stored by Tabitha (e.g., authors, publication dates). Users are responsible for ensuring the accuracy and completeness of any bibliographic information they derive using this feature.

#### 7.4.3 Import Functionality

Tabitha supports importing data, primarily focusing on adding Collections into Folders. Special handling is provided for HTML bookmark imports. Imported JSON can also include tag definitions (including their custom sort order) and assignments, theme information, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting.

##### 7.4.3.1 Import Scope
- Collections into Folders: Imports one or more Collections into the currently selected Folder or a new Folder from various formats. Accessible via the "Import" option in the Collections panel header (Section 6.4.3).
- HTML Bookmark Import: When importing a Netscape-compatible HTML bookmark file, Tabitha organizes the bookmarks into Folders and Collections based on the bookmark hierarchy.
  - Recycle Bin Isolation: Imported data (e.g., JSON, HTML bookmarks) is added to active Folders/Collections and does not interact with the Recycle Bin. Imported items are treated as new, with no deletion history.

##### 7.4.3.2 Import Process
1. Initiate Import: The user clicks "Import" from the Collections panel header or relevant Data Management section in Settings.
2. File Selection: A file picker allows selection of one or more files (JSON, CSV, HTML (Netscape Bookmarks), TXT). Note: "Export for Email (HTML)" files are not designed for re-import into Tabitha; their purpose is solely for email sharing.
3. Format Detection: Tabitha detects the format via file extension.
4. Import Options:
   - JSON: Option to import entire structure or specific entities (Collections, Workspaces, settings).
     - If an imported entity (e.g., Collection, Custom Theme, Custom TXT Template, Tag Definition) is name-identical and all its relevant content/attributes (including assigned tags and their sort order, saved tab states for links if integration is active, theme colors, template string, tag color, etc.) are identical to an existing entity in the target location, its import is skipped, and the user is notified via a summary toast (e.g., "X identical items skipped.").
     - If an imported entity has the same name as an existing entity in the target location but differs in content or attributes, the imported entity is added as a new item with an appended suffix to its name to ensure uniqueness (e.g., "My Collection (imported 1)", "Blue Theme (imported 1)"). The user is notified. This ensures no existing user data is overwritten without explicit action and preserves all imported data.
     - Tag assignments to collections/items will be applied based on the imported data, reflecting the imported tag sort order. Saved tab states from imported JSON Saved Links will be preserved if the "Enable Chrome Tab Group Integration" setting is active.
   - CSV, HTML (Netscape Bookmarks), TXT: Prompt to select target Folder. Tags from CSV/TXT will be created if they don't exist in the Workspace and assigned (reflecting imported sort order if available). Saved tab states are not typically part of these import formats.
5. Confirmation: A popover summarizes the import (e.g., number of Collections, Saved Links, tags, any sanitized names, any items to be skipped or renamed due to duplication) and requests confirmation.
6. Execution: Data is imported, and the Collections panel updates.
   Large File Handling: All import operations are processed asynchronously to prevent UI freezes, especially with large files. If a selected file is exceptionally large (e.g., >10MB, specific threshold to be determined), a non-blocking warning popover or toast message may inform the user about potential processing time or performance impact before the import begins. During the import process, a subtle progress indicator (e.g., a loading spinner near the 'Import' button or a progress bar in a toast/popover) will be displayed to provide feedback to the user.

##### 7.4.3.3 Format-Specific Import Details
- JSON:
  - Imports Workspaces, Folders, Collections, or global settings, preserving structure, metadata, tag definitions (and their custom sort order), tag assignments, and saved tab states for Saved Links (if "Enable Chrome Tab Group Integration" setting is active). Note Items will be imported with their plain text Titles and HTML Bodies. Handling of same-named entities follows the rules in Section 7.4.3.2.
  - Adds new Workspaces or integrates into existing ones as selected. Tag definitions (and custom sort order) are merged into the Workspace; assignments are applied. Custom theme definitions, custom TXT export templates, global settings, and tag definitions (with custom sort order) are handled as described in 7.4.3.2. Saved tab states are preserved if the integration setting is active.
- CSV:
  - Imports Saved Links and Notes into a new Collection in the target Folder, named based on the imported file. Saved tab states are not imported.
  - For Notes imported from CSV, the 'Note title' column maps to Note title, and the 'Note body' column (assumed plain text) maps to the Note body (which will be stored as basic HTML paragraph).
  - If a "Tags" column is present, tags listed (assumed to be in desired sort order if multiple) will be created if they don't exist in the Workspace and assigned to the respective imported items, preserving the order from the CSV.
  - Requires headers (e.g., Title, URL, Description, Tags for links; Note title, Note body, Tags for notes).
- HTML (Netscape Bookmarks):
  - Imports a Netscape-compatible HTML bookmark file into Tabitha. OS-problematic characters (e.g., `/ \ :  ? " < > |`) in imported bookmark folder names are replaced with an underscore (`_`). The user is notified in the import summary if any names were sanitized. Saved tab states are not imported.
  - The path separator for generating Collection names from nested bookmark folders will be " / " (space, forward slash, space). If this sequence is found within an original imported bookmark folder's name string, Tabitha will replace instances of this specific three-character sequence with a unique internal placeholder (e.g., `%%space_forward_slash_space%%`) before using the name to construct the Tabitha Collection name. This placeholder should be chosen to be highly unlikely to appear in user folder names naturally. The original folder name string, including any actual occurrences of the placeholder sequence itself if present, is otherwise preserved. An informational message will be logged, and the user will be notified in the import summary if such sanitization occurred.
  - Organizes bookmarks into Folders and Collections to reflect the original hierarchy:
    - Each top-level bookmark folder becomes a Folder in Tabitha, preserving its name (after sanitization).
    - For each bookmark folder (including subfolders), a Collection is created within the corresponding Tabitha Folder. The Collection's name reflects the full path from the top-level bookmark folder, using " / " as the separator (e.g., "Movies / Classics / Silent Era").
    - Direct bookmarks within a folder are placed into a Collection named after that folder (e.g., "Movies" Collection for bookmarks directly under the "Movies" bookmark folder).
    - Root-level bookmarks (not inside any folder) are placed in a default Folder (e.g., "Imported Root Bookmarks," localized if applicable) with a Collection of the same name.
- TXT:
  - Imports text as Notes or URLs as Saved Links (lines starting with "http") into a new Collection in the target Folder, named based on the imported file. For imported notes, the first line of a text block might be used as the Title and the rest as Body (stored as basic HTML). If tags are parseable (e.g., a line like `Tags: tag1, tag2`), they will be created/assigned (preserving order). Saved tab states are not imported.

##### 7.4.3.4 Example of HTML Bookmark Import

Suppose the bookmark file has the following structure (and " / " is the chosen separator):
- Folder: Movies
  - Bookmark: "Inception"
  - Bookmark: "The Matrix"
  - Folder: Classics
    - Bookmark: "Casablanca"
    - Folder: Silent Era
      - Bookmark: "Metropolis"
- Folder: Tech
  - Bookmark: "GitHub"
  - Folder: AI
    - Bookmark: "OpenAI"
- Bookmark: "Reddit" (root-level)

After importing into Tabitha, the structure would be:
- Workspace: Imported Bookmarks (or current Workspace if specified)
  - Folder: Movies
    - Collection: Movies
      - Saved Link: "Inception"
      - Saved Link: "The Matrix"
    - Collection: Movies / Classics
      - Saved Link: "Casablanca"
    - Collection: Movies / Classics / Silent Era
      - Saved Link: "Metropolis"
  - Folder: Tech
    - Collection: Tech
      - Saved Link: "GitHub"
    - Collection: Tech / AI
      - Saved Link: "OpenAI"
  - Folder: Imported Root Bookmarks (localized if applicable)
    - Collection: Imported Root Bookmarks (localized if applicable)
      - Saved Link: "Reddit"

This ensures that the bookmark hierarchy is preserved in an intuitive way within Tabitha’s structure.

#### 7.4.4 Format-Specific Considerations
- JSON:
  - Export: Includes all relevant data for the scope, such as tag definitions and their custom sort order, assignments, theme information if a Workspace is exported, custom TXT export templates and global settings if global settings are exported, and saved tab states for Saved Links (if "Enable Chrome Tab Group Integration" setting is active). Note Bodies are HTML.
  - Import: Validates structure; displays error popover if invalid. Note Bodies are HTML. Custom theme definitions, custom TXT export templates, global settings, and tag definitions (with custom sort order) are handled as described in 7.4.3.2. Saved tab states are preserved if the integration setting is active.
- CSV:
  - Export: Escapes special characters. Note Bodies are plain text. Assigned tags are comma-separated, in user-defined sort order. Saved tab states are not exported.
  - Import: Requires correct column headers. Plain text Note Bodies are converted to basic HTML. Tags are created/assigned, preserving order from CSV. Saved tab states are not imported.
- HTML (Netscape Bookmarks):
  - Export: Produces a Netscape-compatible bookmark file (Saved Links only). Tags, custom tag sort order, and saved tab states are not exported.
  - Import: Parses standard bookmark files, sanitizing names and handling nested structures as described. Saved tab states are not imported.
- Export for Email (HTML):
  - Export: Generates a single HTML file with combined Saved Links, Notes (full HTML Bodies), and assigned tags (displayed in user-defined sort order), formatted for easy copy-pasting into rich text email clients. Not intended for re-import. Saved tab states are not exported.
- TXT:
  - Export: Offers a lean set of predefined format options for Saved Links and a user-customizable template system. Note Bodies are plain text. Assigned tags (in user-defined sort order) may be included depending on the format or template. Saved tab states are not exported.
  - Import: Detects URLs vs. plain text. Plain text Note Bodies are converted to basic HTML. Tags are created/assigned if parseable (preserving order). Saved tab states are not imported.

#### 7.4.5 User Requirements Coverage
This functionality addresses the following user needs:
- Data Migration: JSON exports and imports allow moving data (including tag definitions and their custom sort order, assignments, relevant theme information, custom TXT export templates, global settings, and saved tab states for links if integration enabled) between Tabitha instances or devices.
- Backups: JSON exports provide a full backup option.
- Sharing: Exported files (JSON, CSV, HTML (Netscape Bookmarks), TXT, and notably Export for Email (HTML) for easy email sharing with assigned tags in custom sort order) can be shared manually.
- External Analysis: CSV exports enable data manipulation in external tools.
- Interoperability: HTML (Netscape Bookmarks) exports ensure compatibility with other browsers or bookmark managers, and the import process organizes bookmarks intuitively within Tabitha’s structure.
- Flexible Text Output: User-defined custom TXT export templates allow users to format Saved Link data for a variety of plain text needs.

### 7.5 Internal Note Linking

Internal Note Linking enables users to create hyperlinks from one Note Item to another within the Tabitha extension, facilitating cross-referencing and navigation between related notes.

- URI Scheme: Tabitha utilizes a specific URI scheme, `tabitha:note/{NOTE_ID}`, to enable direct linking between Note Items. `{NOTE_ID}` is the persistent unique identifier of the target Note Item.
- Link Creation: Users can create these internal links by first using the "Copy Link to Note" action available in a Note Item's mini toolbar. This action places the `tabitha:note/{NOTE_ID}` URI onto the clipboard. The user then edits a source Note Item and uses the WYSIWYG editor's standard hyperlink insertion tool to paste this URI as the hyperlink's target.
- Navigation: When a hyperlink with the `tabitha:note/` scheme is clicked within a rendered Note Item's body (Source Note), Tabitha intercepts this action.
    - It stores the context of the Source Note (Workspace ID, Folder ID, Collection ID, Note ID, and Title).
    - It then parses the URI to identify the target `NOTE_ID` and programmatically navigates the UI to display the Target Note. This includes selecting the appropriate Workspace, Folder, expanding the parent Collection Component if necessary, and scrolling to and highlighting or focusing on the Target Note Item in the Collections Panel.
    - Upon successful navigation to the Target Note, a contextual "Back" icon-button (e.g., with text "Back to '[Source Note Title]'") becomes available in the UI where the Target Note is displayed.
- Back Navigation:
    - Clicking the contextual "Back" button or using its associated keyboard shortcut navigates the Tabitha UI back to the stored context of the Source Note, restoring its selection and focus.
    - This "back" functionality is limited to one step and is specific to navigations triggered by internal note links. If the user performs other major navigation actions (e.g., manually selecting a different Collection), this specific "back" context is cleared.
- Handling Broken Links: If a `tabitha:note/` URI points to a Note Item that no longer exists (e.g., it has been permanently deleted), clicking the link will result in a non-intrusive notification (e.g., a toast message "The linked note could not be found.") and no UI navigation will occur. Similarly, if the Source Note is no longer accessible when attempting to navigate "Back," a similar notification will be provided. The hyperlink tag itself will remain in the source Note Item’s content.

## 8. Non-Functional Requirements

### 8.1 Accessibility

Tabitha is designed to be accessible to all users, adhering to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. The following measures ensure usability for individuals with diverse abilities:

- Keyboard Navigation:
  - All interactive elements (e.g., icon-buttons, panel items, popovers, modal dialogs, WYSIWYG editor toolbar for Notes, tag management interfaces including tag reordering, search UI bar elements, search result items) are accessible via the keyboard.
  - Use Tab to cycle through focusable elements, Enter or Space to activate, and arrow keys to navigate within lists (e.g., Workspaces, Collections, tag lists, search results).
  - When a component is focused (e.g., via Tab), its associated mini toolbar or checkboxes are revealed, and the user can tab through them and activate with Enter. Individual items within panels have distinct focus indicators (e.g., focused Folders have a lighter shade background, focused Collection Components show the mini toolbar, focused items have a shadow, focused open tabs have a border).
  - For deletion actions, focusing on the close icon provides an aria-alert or similar feedback to indicate the critical nature of the action, preserving the red hover warning color for mouse users as a visual cue.
  - Shortcuts (e.g., `Ctrl+N` for new item in focused panel, `Ctrl+T` to tag) are optional and documented on the Keyboard Shortcuts page.
  - Panel Resizing: A keyboard-accessible method for resizing panels will be implemented. For instance, the user can activate a 'panel resize mode' for the currently focused panel using a dedicated shortcut (e.g., `Ctrl+Alt+R`). Once in this mode, `Left Arrow` and `Right Arrow` keys will incrementally adjust the panel's width. `Enter` would confirm the new width, and `Escape` would cancel the resize operation, reverting to the previous width. This shortcut must be tested for conflicts with common browser or OS functions.
- Screen Reader Support:
  - ARIA attributes (e.g., `aria-label`, `aria-expanded`) are applied to describe UI elements (e.g., Workspace's "Add" icon, "Collection expanded", Note editor toolbar buttons, tag badges, tag filter sections including tag reordering controls, search UI bar elements, search result items with their lineage).
  - Dynamic updates (e.g., Open Tabs changes, sync status, tag filter application, search results updating, Collection item count updates) use `aria-live="polite"` to announce changes without interrupting the user.
  - Panels and toolbars have clear roles (e.g., `role="navigation"`, `role="region"`) for structural clarity. The Search UI Bar will have `role="search"`.
  - The status indicator in the Workspaces panel uses `role="status"` and `aria-label` to convey sync status (e.g., `aria-label="Sync status: all changes synced"`).
  - Popovers and modal dialogs triggered by the status indicator or other actions use `role="dialog"` (or `role="alertdialog"` for critical messages) and `aria-live="polite"` (or `assertive` for alerts) for screen reader announcements, with keyboard-navigable close/action buttons activated via Enter or Space.
- Color Contrast:
  - Text and icons meet a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (e.g., toolbar icons), per WCAG guidelines, within each predefined and user-customizable theme's light and dark palettes.
  - Colors used in predefined themes (e.g., primary, secondary, background) are chosen from Material Design palettes known for good contrast properties. Tag badge colors are selected from a palette ensuring sufficient contrast against themed backgrounds and against each other if adjacent.
- Text Resizing:
  - The UI supports browser zoom up to 200% without loss of functionality, using relative units (e.g., `rem`, `%`) in CSS.
- Focus Management:
  - Visible focus indicators (e.g., `outline: 2px solid #007bff`) highlight the active element, including the panel-level focus cue, elements within the Search UI Bar, and active search results.
  - Focus remains logical, returning to the triggering element after closing popovers or modal dialogs, or managed appropriately within the search UI.
- Testing:
  - Accessibility is validated using tools like WAVE and screen readers (e.g., NVDA, VoiceOver) across supported browsers.
- Recycle Bin Page:
  - The Recycle Bin page adheres to WCAG 2.1 Level AA:
    - Search input, keyboard navigation supports Tab to cycle through items, checkboxes, and popover buttons, with Enter to activate.
    - ARIA attributes (e.g., `aria-label="Deleted item: Folder Name"`, `aria-checked` for checkboxes) ensure screen reader compatibility. Original assigned tags (in their custom sort order) displayed on deleted items are also announced.
    - The “Open” icon-button for Saved Links has `aria-label="Open link in new tab"`. For Notes, it has `aria-label="View note content"`.
    - Popover actions (Cancel, Restore, Permanently delete?) use `role="dialog"` and `aria-live="polite"`.
    - High-contrast colors (e.g., red for “Permanently delete?”) meet 4.5:1 contrast ratios.
  - Focus management ensures the Recycle Bin page retains focus on the first item or checkbox when opened, or the search input field if present.
  - When lineage highlighting occurs on focus, an `aria-live` region will announce the relationships of highlighted items to the focused item (e.g., "Item 'Note X' focused. Related items also highlighted: Parent 'Collection Y', All descendants in Recycle Bin highlighted.").

These measures ensure Tabitha is inclusive, supporting users with visual, motor, or cognitive impairments while maintaining its core functionality and aesthetic flexibility, including the retention of the red hover warning color for deletion actions where applicable.

### 8.2 Security and Privacy

- Data Protection: Tabitha stores user data locally in the browser using IndexedDB. This includes Workspaces (with their tag definitions and custom sort order), Folders, Collections, Saved Links (including saved tab states if "Enable Chrome Tab Group Integration" setting is active), Notes (including HTML Bodies, and their assigned tags), user settings (which include custom theme definitions, custom TXT export templates, and the "Enable Chrome Tab Group Integration" setting), and Recycle Bin data. This data is synced to the user's private cloud storage (e.g., Google Drive's appDataFolder) via cloud syncing using OAuth authentication. Data is never shared with third parties or stored on external servers.
- HTML Sanitization: User-generated HTML content within Note Item Bodies is sanitized using a library like DOMPurify before being rendered in read-only views within the Tabitha interface. This is a crucial step to prevent XSS (Cross-Site Scripting) vulnerabilities. The WYSIWYG editor itself should be configured to produce clean HTML, but sanitization provides an additional layer of defense. Color values for themes and tags are treated as strings and applied via CSS variables or style attributes; direct HTML injection through theme/tag color values is not an expected vector.
- OAuth Security: OAuth tokens are securely managed and cached locally for cloud syncing. Tokens are used solely for accessing the user's private storage and are revoked upon logout.
- Encryption: While data is stored in plain JSON format (with Note Bodies as HTML) for simplicity, sensitive information (if any) is not collected. Users are encouraged to use strong passwords for their cloud accounts.
- Permissions: Tabitha requests only the necessary browser permissions (e.g., access to tabs, windows, storage, tab groups in Chrome, and context menus) and follows least-privilege principles.
- Compliance: The extension complies with applicable privacy regulations by minimizing data collection and ensuring user control over their data through persistence and syncing options.

### 8.3 Performance

Tabitha is designed to operate efficiently within the browser environment, minimizing its impact on system resources and ensuring a responsive user experience. The following performance requirements are established:

- Load Times:
  - The extension loads within 1 second on initial startup in New Tab Takeover or Dedicated Tab mode, assuming a standard internet connection (e.g., 10 Mbps) and modern hardware (e.g., 8GB RAM, mid-tier CPU).
- Memory Usage:
  - Memory footprint is capped at 50MB for typical use (e.g., 5 Workspaces, 10 Folders, 50 Collections, 100 Saved Links, moderate Note content, a few custom themes and custom TXT export templates, moderate tag usage including custom sort orders), measured via browser developer tools (e.g., Chrome Task Manager).
  - Scales linearly with data size, targeting no more than 100MB for large datasets (e.g., 20 Workspaces, 100 Collections, extensive tagging). Performance impact of very large HTML content in Notes will be monitored.
- Browser Responsiveness:
  - Tabitha does not increase browser tab switch latency by more than 10% (e.g., <50ms added delay on a 500ms baseline).
  - Real-time updates in the Open Tabs panel trigger no more than one UI re-render per second during active tab/window changes.
  - The WYSIWYG editor for Notes should remain responsive during user interactions.
  - Tagging operations (applying, filtering, reordering) should feel instantaneous for typical datasets.
  - Search operations, including dynamic result updates, should feel responsive, with result list rendering optimized.
- Optimization Strategies:
  - IndexedDB operations for persistence are optimized to minimize disk I/O, targeting <100ms for typical operations.
  - Cloud sync requests are throttled per rules in Section 7.2.1, reducing network overhead.
  - Search indexing (if any client-side indexing is performed by Fuse.js or similar) is efficient and updates incrementally or on demand without blocking the UI.
  - If a user changes the Recycle Bin retention period, triggering a large purge of items, this operation is performed as a background task to avoid UI freezes. The user is informed via toasts about initiation and completion (or errors), subject to notification level settings.
- Testing:
  - Performance is validated across supported browsers (Chrome, Firefox, Edge, Opera) on low-end (e.g., 4GB RAM) and high-end (e.g., 16GB RAM) systems.
  - Stress tests simulate large datasets (e.g., 500 Collections, Notes with substantial content, thousands of tags and assignments with complex sort orders) to ensure stability under both persistence and syncing, and for search performance.

These requirements ensure Tabitha remains lightweight and performant, even with extensive use, aligning with its goal of seamless tab organization.

### 8.4 Internationalization

The Tabitha browser extension supports internationalization to accommodate users from different linguistic and cultural backgrounds. All user-facing strings within the extension are subject to this process. This includes UI text (labels, tooltips, messages, help content, Note editor toolbar tooltips, theme editor labels, tag management UI including reordering hints, TXT export template editor labels, search UI elements and prompts), default names for components (e.g., "My Workspace", "My Collections", "Starred Collections", "Imported Root Bookmarks", default theme names, default tag names if any, default TXT export template names if any), and formats for dynamically generated names such as default Collection names based on date/time. Language resource files store translations for all such strings and formats.
Default names for standard components (e.g., "My Workspace," "My Collections," "Starred Collections," "Imported Root Bookmarks") are localized upon creation if a translation for the detected browser language exists in Tabitha's bundled resources. If a translation is not available for the detected language, these names will default to English. Users can contribute translations for new locales via GitHub.

Key aspects of internationalization include:
- Date and Time Formats: Date and time displays (e.g., default Collection names from Open Tabs saves, Recycle Bin deletion timestamps, search result sorting by date, Workspace last modified date) are formatted according to the user's locale settings.
- Cultural Considerations: The extension respects cultural norms regarding color usage, imagery, and iconography. Emojis used by default or suggested should be culturally neutral where possible.
- RTL Support: Full support for Right-to-Left languages with layout mirroring, text direction, and alignment adjustments, as detailed below.
- Language Selection: The user can select their preferred language via the Settings panel. The extension detects the browser's default language and sets it as the initial language, with the option to change it manually.

#### 8.4.1 Bi-Directional Text and RTL Support

To ensure an intuitive and seamless experience for users of RTL (Right-to-Left) languages such as Arabic and Hebrew, the following adjustments are made to support bi-directional text and RTL layouts:

- Text Direction and Alignment:
  - For RTL languages, the text direction is set to RTL, with text starting from the right and flowing to the left.
  - UI elements such as labels, icon-buttons, menus, and tag displays adjust their alignment accordingly (e.g., icon-buttons typically on the right in LTR are on the left in RTL; tag badges appear in natural flow for RTL).
- Layout Mirroring:
  - The entire layout is mirrored for RTL languages. The panel order (from right to left) will be: Workspaces Panel (rightmost), Folders Panel, Collections Panel (center), Open Tabs Panel (leftmost).
  - Panel headers and mini toolbars are similarly mirrored, with mini toolbars appearing on the left-hand side of items on hover or focus.
  - In the Collections panel, Saved Links and Notes in "Cards View" and "Compact View" are arranged from right to left.
- Icon and Image Adjustments:
  - Directional icons (e.g., arrows) are flipped horizontally to match the RTL flow.
  - Images with directional implications are adjusted or replaced to suit RTL contexts.
- Text Input and Editing:
  - Text input fields (including the Note title field, the WYSIWYG Note body editor, theme name/color inputs, tag name inputs, and TXT export template inputs) support RTL text entry, allowing right-to-left typing.
  - Cursor movement and text selection behave appropriately for RTL text within these editors.
- Localization:
  - All UI text is localized for the target language, ensuring correct display in RTL layouts.
  - Localized text is stored in separate resource files for each language.
- CSS and Styling:
  - CSS properties like `direction: rtl;` and `text-align: right;` are applied for RTL languages.
  - Margins, paddings, and floats are adjusted to accommodate RTL layouts.
  - A separate RTL stylesheet or conditional CSS rules are used based on the user's language setting.
- JavaScript Adjustments:
  - JavaScript code handling DOM manipulation or text processing is aware of the text direction.
  - Functions that insert or position elements account for RTL contexts.
- Testing:
  - The extension is thoroughly tested with RTL languages to ensure correct mirroring and text handling, including within the Note editing interface, theme customization UI, tag management UI (including tag reordering drag-and-drop), and TXT export template UI.
  - Edge cases, such as mixed LTR and RTL text within a Note body, tag name, or TXT template, are verified for proper display and interaction.

These adjustments ensure that Tabitha provides a natural and intuitive interface for RTL users, maintaining usability and consistency across different languages and text directions.

This approach ensures Tabitha is accessible and user-friendly for a global audience, providing a consistent experience across different languages and regions.

## 9. Future Enhancements

The following features are not part of the current scope but may be considered for future iterations to enhance Tabitha’s functionality:

- Support other browsers: Expand browser support to include Firefox, Edge, and Opera, ensuring compliance with Chrome extension best practices adapted for each browser.
- Support other online storage: Expand cloud syncing capabilities beyond the initial provider to include other popular services such as Dropbox, pCloud, MEGA, Nextcloud, Sync.com, WebDAV, OneDrive, Box, providing users with more choices for data backup and cross-device synchronization.
- Support other OS: Linux, Android.
- Proactive warnings: Provide warnings for approaching storage limits (IndexedDB/Cloud), if possible.
- Uninstallation: During uninstallation, the user should be directed to a location where they can provide feedback, such as a web form.

## 10. Glossary

The following glossary defines key terms used in this Product Requirements Document (PRD) for the Tabitha Browser Extension.

- Accordions: Collapsible sections that expand or collapse when clicked, used for organizing content like Collections or Open Tabs.
- Browser Context Menu: The menu that appears when a user right-clicks (or performs an equivalent action) within the browser window, providing contextual commands. Tabitha adds "Save session", "Save Current Tab to Active Collection", and "Open Tabitha" to this menu.
- Button: In Tabitha, refers to icon-buttons (clickable icons with button-like effects) or custom-styled text buttons, as defined in the User Interface section.
- Cards: Rectangular containers grouping related content, such as Saved Links and Notes in the Collections panel's "Cards View".
- Chrome Tab Group: A feature in the Chrome browser that allows users to organize tabs into visually distinct groups with custom names and colors.
- Chrome tab group affiliation: The association of a browser tab with a specific Chrome tab group. Within Tabitha (if the "Enable Chrome Tab Group Integration" setting is active), saving this affiliation means storing the tab group's name and color so that when the Saved Link is reopened, Tabitha can attempt to restore it to a group with the same characteristics in Chrome.
- Client-Side Operation: All core functionality runs locally within the browser without server-side processing.
- Cloud Syncing: Synchronization of all user data (user settings including custom themes, custom TXT export templates, and "Enable Chrome Tab Group Integration" setting; Workspaces including their tag definitions and custom sort order; Folders; Collections; Items with their assigned tags and saved tab states; and Recycle Bin data) across devices using cloud storage, occurring per throttling rules (Section 7.2.1) or queued when offline.
- Collapsible Sections: UI elements that can be hidden or shown, such as the Workspaces, Folders, or Open Tabs panels.
- Collection Item: A content unit (Saved Link Item or Note Item) within a Collection Component.
- Collection Tags: Tags assigned directly to Collection Components. Displayed in user-defined sort order.
- Collections: Sets of saved Saved Links, optional Notes (with Title and rich text Body), and optional assigned tags within Folders. Collection names can be prefaced with an emoji. Optionally displays an item count if enabled in settings.
- Collections Panel: The central panel displaying Collection Components within a selected Folder, or search results.
- Contextual Back Navigation: A UI mechanism (e.g., a button or link) that appears after navigating via an internal note link, allowing the user to return to the source note with a single click or keyboard shortcut.
- Contextual Guidance: Providing feature explanations 'just-in-time' within the relevant interface context, minimizing cognitive load and enhancing intuitive learning. This is a guiding principle for how information is presented.
- Custom Theme: A user-created theme with definitions for light and dark modes, identified by a unique name, and managed via Settings. Stored as part of user settings data.
- Custom TXT Export Template: A user-created and named string format, managed in Settings, that defines how Saved Link Items are structured in TXT exports using placeholders like `{title}`, `{url}`, `{description}`, and `{tags}`. Stored as part of user settings data.
- Dedicated Tab: A window mode where Tabitha runs in its own browser tab. Includes an optional setting to automatically open Tabitha in this mode on browser launch.
- Delete: Functionality to remove Workspaces, Folders, Collections, Saved Links, Notes, Custom Themes, Custom TXT Export Templates, or Tags, often with confirmation for permanent deletions.
- Design Elements: Visual components like icons, fonts, and colors used in the UI.
- Display item count on Collections: An optional setting to show the total number of items (Saved Links + Notes) within each Collection Component next to its name.
- Display Mode: Global setting for the color scheme applying to all Workspaces: Auto (default, follows system preference), Light, or Dark.
- Drag-and-Drop: Functionality allowing the user to reorder items (including tag definitions in their management UI) or move Tabs/Open Tabs to Collections.
- Drag-and-Drop Feedback: Visual cues during drag-and-drop operations, like ghost images or highlighted targets. A "+" icon appears during drag-and-drop copy operations.
- Dropdown: A UI element that, when clicked, reveals a list of options from which the user can select one. It typically displays the currently selected option or a placeholder text when collapsed.
- Efficient Interaction Design: Design principles ensuring quick, intuitive actions without unnecessary effort.
- Emoji: A small digital image or icon used to express an idea or emotion; for instance, `🐱` or `🐈‍`. Can be used in Workspace names, Folder names, Collection names, and Tag names.
- Enable Chrome Tab Group Integration: A user setting (default: ON) that, when active, enables Tabitha to save Chrome tab group affiliations for Saved Links and restore them if possible. If disabled, affiliations are not saved for new links and not restored for any links, but existing stored affiliations are retained and become active again if the setting is re-enabled. Enables "Save Group as Collection". Its description in Settings provides details.
- Enhanced Tooltips: Informative tooltips providing guidance for UI elements, including truncated text like tag names.
- Expand/Collapse: Functionality to show or hide content, such as in Collections or Open Tabs.
- Export for Email (HTML): A specialized HTML export format designed for easy copy-pasting of Saved Links, Notes, and their assigned tags (in user-defined sort order) into rich text email clients.
- Folders: Sub-containers within Workspaces for organizing Collections.
- Four-panel interface: The main layout consisting of Workspaces Panel, Folders Panel, Collections Panel, and Open Tabs Panel.
- Help: A tab within the Tabitha Hub providing high-level user guidance, troubleshooting, and links to further resources. Detailed feature explanations are primarily offered contextually within the application.
- Hierarchical structure: The organization of Workspaces > Folders > Collections > Saved Links and Notes. Tags (with user-defined sort order) provide a cross-cutting layer within each Workspace. The depth of this hierarchy is fixed; no sub-folders or sub-collections are supported.
- HTML (Netscape Bookmarks): Standard HTML format for exporting Saved Links, compatible with browser bookmark systems.
- Icon-Buttons: Small, clickable graphical elements represented by symbols or images, functioning as buttons.
- Import/Export: Functionality to bring in or send out data, such as Workspaces, Folders, or Collections. JSON format is key for comprehensive data transfer, including tag definitions (with custom sort order), assignments, theme information, custom TXT export templates, global settings, and saved tab states.
- IndexedDB: Local storage used for immediate persistence and offline support of all user data.
- Integrated Search: The comprehensive search system initiated from the Workspaces Panel, with a dynamic Search UI Bar in the Collections Panel for query input (including advanced syntax), scope definition (Workspace, Folder, Collection, Items, Open Tabs), options, and display of interactive results.
- Internationalization: Support for multiple languages and cultural norms. User-facing strings and formats are localized. Default names for components are localized if translations exist.
- Internal Note Linking: Feature allowing Note Items to link to other Note Items within Tabitha using a specific URI scheme (`tabitha:note/{NOTE_ID}`). Contextual help on how to create these links is available in the Note editing interface.
- Item Tags: Tags assignable to individual Saved Link Items or Note Items, if the "Item-Level Tagging" feature is enabled in Settings. Tag definitions are per Workspace and displayed in user-defined sort order.
- Items: Saved Link Items and Note Items within Collections. Their data structure includes any assigned tags.
- Keyboard Shortcuts: Key combinations for quick actions, enhancing productivity.
- Last Modified Date (Collection Component): A timestamp associated with a Collection Component, updated whenever its name, pin/star status, assigned tags, "Per-Collection View Override" settings, or internal item sort order is changed, or when Items within it are added, deleted, reordered, or their content is modified. This happens due to direct user action on the current device or via synced changes from another device. Used for sorting Collection Components.
- Last Modified Date (Folder): A timestamp associated with a Folder Component, updated whenever its name is changed, Collections within it are added/deleted/reordered, a Collection is moved into/out of it, or the `lastModifiedDate` of any Collection Component within it is updated. This occurs due to direct user action on the current device or via synced changes from another device. Used for sorting Folder Components.
- Last Modified Date (Workspace): A timestamp associated with a Workspace, updated whenever its name, visual representation, theme, direct Folders/Collections/Items, or tag definitions are changed due to direct user action on the current device or via synced changes originating from another device. Used for sorting Workspaces.
- Layout: The arrangement of panels and elements in the UI.
- Mini Toolbar: A small set of contextual action icon-buttons that appears on hover or focus over a component (e.g., Workspace, Folder, Collection, Collection Item, Search Result Item), with persistence as detailed in Section 6.3. May include a "More" menu for less frequently used actions if total actions exceed five.
- Modal Dialog: A UI overlay that requires user interaction before they can return to the main application. It typically presents critical information or choices (e.g., the "Initial sync complete...merged" notification).
- My Collections: A fixed, renamable but non-deletable Folder Component within each Workspace, serving as the default location for new Collection Components. Its name is localized if a translation exists.
- New Tab Takeover: A window mode replacing the browser's new tab page with Tabitha.
- Notes: User-added notes within Collections. Each Note has a plain text Title and a rich text Body (stored as HTML) that supports basic formatting (e.g., headings, bold, lists, hyperlinks - including internal note links) via a lightweight WYSIWYG editor. Displayed with a note icon. Can be tagged if item-tagging is enabled. Contextual help on formatting and linking is available in the Note editing popover.
- OAuth: Authentication method for cloud syncing.
- Onboarding page: Initial setup guide for new users, presented as the Welcome tab in the Tabitha Hub. Focuses on essential setup and core concepts.
- Open Tabs: Panel displaying current browser windows and Tabs, including Chrome pinned tabs and tab groups.
- Per-Collection View Override: An optional feature, enabled via a global setting. When active, it allows individual Collection Components to have a 'locked' display view (List, Cards, Compact, Board, Grid) that overrides the global View setting for the Collections Panel. This is managed via an icon-button (eye for unlocked, lock for locked state) on the Collection Component's title bar.
- Persistent State: Saving UI state (e.g., panel widths, selections, active tag filters, custom sort order for tags, Workspace/Folder/Collection sort order) across sessions for continuity.
- Placeholders (for TXT Export): Special tokens (e.g., `{title}`, `{url}`, `{description}`, `{tags}`) used in Custom TXT Export Templates that are replaced with actual Saved Link Item data during TXT export. Detailed explanations are provided in the template management interface in Settings.
- Popovers: Small overlay windows for input or confirmation. See https://m3.material.io/components/menus/overview
- Predefined Format Options (for TXT Export): A list of fixed, built-in output styles for TXT exports of Saved Link Items (e.g., "Plain Text URLs," "Simple List"), distinct from user-created Custom TXT Export Templates.
- Predefined Theme: A built-in theme provided with Tabitha, such as a "Default" neutral theme or a "Blue" theme.
- Radio Button: A UI element representing one choice among a set of mutually exclusive options. Users can select only one radio button in a given group. When selected, it typically displays a filled circle.
- Real-Time Updates: Immediate reflection of browser state changes in the Open Tabs panel.
- Recycle Bin: A page displaying deleted items for the current Workspace, offering restoration or permanent deletion. Features its own search capability (including Note bodies and fuzzy path matching). Its contents are part of synced data.
- Rename: Action to change the name/title of an entity (e.g., Folder Component). Distinguished from "Edit" which may modify more properties.
- Reorder: Changing the order of items (e.g., Folder Components, Collection Components, Collection Items, Tag definitions) via drag-and-drop.
- RTL Support: Adjustments for Right-to-Left languages.
- Saved Links: Saved website references within Collections, each having a title, URL, optional description, and any saved tab state (e.g., pinned status, Chrome tab group affiliation if "Enable Chrome Tab Group Integration" setting is active). Can be tagged if item-tagging is enabled.
- Save Group as Collection: An action available in the Open Tabs panel (if "Enable Chrome Tab Group Integration" is active) to save an entire Chrome Tab Group as a new Collection in Tabitha.
- Search UI Bar: A dedicated user interface element that appears dynamically when search is activated, containing the search input field, scope selectors, and search options.
- Session: The period from when the browser is opened until it’s closed, reflected in the Open Tabs panel.
- Settings: Tab within the Tabitha Hub for configuring extension options. User settings data includes custom theme definitions, custom TXT export templates, "Enable Chrome Tab Group Integration" setting, and is synced.
- Sort: Functionality to order items by various criteria (e.g., name, date created, last modified date, item count). For list-based views, column headers may be clickable to activate/reverse sort. Tag definitions can be manually sorted by the user. The active sort criterion and its direction for Collection Items are visually indicated.
- Starred Collections: A special Folder within each Workspace displaying starred Collections (name localized if translation exists).
- System Preference: Refers to the operating system or browser's user-configured preference for light or dark mode interfaces.
- Tabs: Individual open pages in the browser, displayed in the Open Tabs panel, including pinned tabs in Chrome.
- Tag Filter: A control in the Collections Panel header to filter displayed content. If item-tagging is enabled, it has separate sections for filtering by Collection Tags and Item Tags. This is also the primary interface for managing (create, edit, delete, reorder) tag definitions for the Workspace.
- Tags: User-added labels (each with a name and color, supporting emojis) for organizational purposes. Tag definitions are managed per Workspace, can be manually reordered by the user (this custom order dictates display sequence), and are part of synced Workspace data. Separate predefined color palettes exist for light and dark modes for tag auto-assignment.
    - Collection Tags: Tags assigned directly to Collection Components. Displayed in user-defined sort order.
    - Item Tags: Tags assigned to individual Saved Link Items or Note Items (if item-level tagging is enabled in Settings). Displayed in user-defined sort order. Batch tagging/untagging of multiple selected items is supported.
- Theme: A collection of color definitions for UI elements, applied per Workspace. Can be Predefined or Custom. Each theme has light and dark mode variants. Custom theme definitions are part of synced user settings data.
- Toast: A transient, non-blocking notification that appears briefly to provide feedback on an operation (e.g., "Item moved to Recycle Bin") and then automatically disappears.
- Toolbars: Panel-specific headers containing action icons, and mini toolbars on components revealed on hover or focus. Also refers to the simple toolbar within the Note editing popover for formatting the Note body.
- Tooltips: Small text boxes providing explanations on hover. See https://m3.material.io/components/tooltips/overview
- UI Density: A global setting (Default, Comfortable, Compact) that adjusts the overall visual spacing of the interface, affecting padding, margins, and the general layout of elements to accommodate user preferences for information density.
- View Options: Different ways to display Collection Components and their internal items (or search results) in the Collections Panel, such as 'List View', 'Cards View', 'Compact View', 'Board View', or 'Grid View'. This is set globally via the Collections Panel toolbar. If the 'Per-Collection View Override' feature is enabled, this global setting acts as the default, but individual Collection Components can have their view 'locked' to a specific type. Affects how item tags (in their custom sort order) are displayed.
- Visual Hierarchy: Design technique to differentiate panels and items.
- Window Mode: Determines how Tabitha integrates with the browser, applying to all Workspaces: New Tab Takeover or Dedicated Tab.
- Workspaces: Top-level containers for organizing projects or themes. Each Workspace includes its own tag definitions and their custom sort order. Workspaces can be sorted by name, last modified date, or manually reordered.
- WYSIWYG Editor: (What You See Is What You Get) An editor that allows users to see the content as it will appear in its final form while editing, used for Note Item Bodies. Contextual help on its usage is available within the editing interface.

This concludes the Product Requirements Document for the Tabitha Browser Extension.