**Prompt B: Prompt for a Product Requirements Document (PRD)**

```markdown
I am developing a free open-source browser extension called "Tabitha" under the GPL 3 license. The project will be hosted on GitHub, with support via GitHub Issues and Discussions.

The primary input for this task is the `DesignProposal.md` document, which outlines the project's vision, objectives, and high-level conceptual design.

**[PASTE CONTENT OF DesignProposal.md HERE]**

--- END OF DesignProposal.md ---

**Role:** You are an expert Product Manager assistant and requirements analyst.
**Task:**
Based on the provided `DesignProposal.md` and adhering to the guidelines in `PRD_system_instructions.md`, generate a complete **Product Requirements Document (PRD)** for the "Tabitha" browser extension.

The `PRD.md` must be well-structured and cover the following sections in detail:

**1. Introduction:**
    *   1.1 Overview (including the limited hierarchical structure: Workspaces > Folders > Collections > Items)
    *   1.2 Goals and Objectives
    *   1.3 Aspirations (User Interface, User Experience, Performance, Scalability)
    *   Client-Side Operation with Cloud Syncing

**2. Scope:**
    *   2.1 In Scope (detailing all features including the four-panel UI, sorting options, search, Recycle Bin, cloud sync, browser support, window modes, context menu, drag-and-drop, real-time updates, offline support, accessibility, note-to-note linking, UI/theme, error handling, Chrome pinned tabs/groups, theme system, UI density, sort indicators, tagging system, per-collection view override, optional item count display)
    *   2.2 Out of Scope (detailing all excluded features like Quick Links, Next list, nested collections/sub-folders, advanced note linking, browser bookmark interaction, server-side shortcuts, live collection updates, automated link curation, local file linking, to-do lists, reminders, project management, Safari support, multi-user features, link previews, coloring collections by tag, enhanced link sharing, workspace/folder encryption, advanced multi-source drag-and-drop, confirmation for collection naming during session save)

**3. Constraints:**
    *   3.1 Non-Negotiable Conditions (Technical Constraints, Regulatory Requirements)
    *   3.2 Project Limitations (Technical, Resource, Design, Functional, including WCAG 2.1 AA)

**4. Development and Design Principles:**
    *   (Covering Design Style, Language/Tone, User Experience, Contextual Guidance, Consistency, Redundancy, Security/Scalability, Adherence to Best Practices, Development Approach, Naming conventions, emoji support, character restrictions, duplicate names, length restrictions, tag reordering)

**5. Hierarchical Structure:**
    *   (Detailing Workspaces > Folders > Collections > Items, Workspace isolation, sorting at each level, tag definitions and reordering per Workspace)

**6. User Interface (UI):**
    *   6.1 UI Overview (Window modes, browser icon role, default Workspace creation, note on interactive elements, panel layout/resizing/collapse, LTR/RTL support, general interactions, keyboard shortcuts, UI persistence)
    *   6.2 Window Modes (New Tab Takeover, Dedicated Tab)
    *   6.3 General Interactions (Single clicks, hover/focus, mini toolbar persistence, tooltips, drag-and-drop, keyboard shortcuts, popover keyboard interaction, browser context menu actions)
    *   6.4 Panels and Pages:
        *   6.4.1 Workspaces Panel (Description, Location, Content including Search/Recycle Bin/Sort/Add/Reset width icons, Workspace components, Status/Help/Settings icons, Functionality including search activation, sort options, `lastModifiedDate` definition)
        *   6.4.2 Folders Panel (Description, Location, Content including header, Starred/My Collections, user-added Folders, Functionality including sort options, `lastModifiedDate` definition)
        *   6.4.3 Collections Panel (Description, Location, Content including standard header/toolbar, Search UI Bar with its specific controls and options like "Find Duplicates Instead", Main Content Area for Collections or Search Results, Functionality including detailed Search interactions, standard panel sort options, Tag Filter, View options, Expand/Collapse All, `lastModifiedDate` definition)
        *   6.4.4 Open Tabs Panel (Description, Location, Content including header, list of windows/tabs, Chrome tab groups, Functionality including drag-and-drop, pinned tabs, tab groups behavior, expand/collapse state management, persistence of expand/collapse state)
        *   6.4.5 Recycle Bin Page (Description, Location, Content including header, search, list of deleted items with lineage highlighting and selection, footer, Functionality including retention period effects, navigation, search, item management, undo, automatic deletion, persistence, accessibility)
    *   6.5 Components:
        *   6.5.1 Workspace Component (Description, Location, Content, Functionality including mini toolbar actions - Edit, Delete with strict confirmation, Export, drag-and-drop, persistence)
        *   6.5.2 Folder Component (Description, Location, Content, Functionality including checkbox actions - Export, Delete with Recycle Bin/permanent logic, mini toolbar actions - Rename, Delete with Recycle Bin/permanent logic, drag-and-drop)
        *   6.5.3 Collection Component (Description, Location, Content including Title Bar with item count/tags/Per-Collection View Override icon/item tags indicator, checkbox, mini toolbar actions - Open/Open in new window/Close all/Add window tabs/Replace/Pin/Star/Add Note/Tag/Sort items/Copy/Move/Rename/Export/Delete, Expanded View, Functionality including checkbox actions - Copy/Move/Merge/Export/Delete, drag-and-drop, persistence, detailed Tag Interaction for Collection and Item tags)
        *   6.5.4 Collection Item (Saved Link Item, Note Item, including display rules for item tags by view type, Location, Content, Functionality including mini toolbar actions - Edit/Copy/Copy Link to Note/Tag Item, Note Item interaction with contextual back, close icon behavior, checkbox actions - Open/Copy/Move/Create new Collection/Tag Selected Items/Delete, drag-and-drop with copy modifier)
        *   6.5.5 Browser Window (Description, Location, Content, Functionality including expand/collapse, Save action with "create then immediate inline rename", Close, drag-and-drop, real-time updates)
        *   6.5.6 Browser Tab (Description, Location, Content, Functionality including Tabitha tab invisibility, click action, close icon, checkbox actions - Add to Collection/Create Collection/Close, drag-and-drop, real-time updates)
        *   6.5.7 Chrome Tab Group (Chrome-specific) (Description, Location, Content, Functionality including drag-and-drop, "Save Group as Collection" action with "create then immediate inline rename", individual tab handling, real-time updates)
    *   6.6 Tabitha Hub (Description, Presentation, Content):
        *   6.6.1 Welcome (Onboarding) (Purpose, Content steps 1-6, Functionality)
        *   6.6.2 Help (Purpose, Content including structure, cloud file links, emojis, TXT exports, email sharing, shortcuts, troubleshooting, community, setup guide review, Functionality)
        *   6.6.3 Settings (Purpose, Content including Window Mode, Appearance - Global Display Mode/UI Density/Workspace Theme Assignment/Manage Custom Themes with palette generation/Workspace Representation, Functionality - Open Tabs Panel settings/Chrome Tab Group Integration/Drag to Collection behavior/Folder-Collection Add Position/Folders Panel Customization/Tagging - Item-Level Tagging/Collections Panel Customization - Per-Collection View Override & Display Item Count, Saved Links settings - strip tracking/subdomains & exceptions/duplicate management, Notification Levels, Link to Keyboard Shortcuts, Data Management - Import/Export/Manage Custom TXT Export Templates with placeholders, Cloud Sync, Console Logging, Recycle Bin Retention, Functionality including settings persistence and sync)
        *   6.6.4 Keyboard Shortcuts Page (Purpose, Content including Global/Panel-Specific/Collections Panel/Open Tabs Panel shortcuts, Customization with conflict handling)
        *   Functionality (Persistence, Error Handling, Accessibility, Performance, Internationalization)
        *   Implementation Notes (Components, Libraries, Rendering Logic, State Management)
    *   6.7 Theme System:
        *   6.7.1 Applying Themes (Global Display Mode, Initial Default Workspace Theme, Workspace Theme Selection, Application)
        *   6.7.2 Theme Color Definitions (List of all color roles for light/dark modes)
        *   6.7.3 Custom Theme Creation and Management (Creation Process with seed color and Material Color Utilities, Editing Predefined Themes, Storage, Theme Definition Interface)
    *   6.8 UI/UX Enhancements:
        *   6.8.1 Visual Hierarchy (Description, Implementation, Benefit)
        *   6.8.2 Drag-and-Drop Feedback (Description including copy indicator, Implementation, Benefit)
        *   6.8.3 Persistent State (Description, Implementation, Benefit)
        *   6.8.4 Integrated Search (Detailed description of functionality, Implementation, Benefit)
        *   6.8.5 Enhanced Tooltips (Description, Implementation, Benefit)
        *   6.8.6 Keyboard Shortcuts (Description, Implementation, Benefit)
        *   6.8.7 Efficient Interaction Design (Description, Implementation, Benefit)
        *   6.8.8 Recommended Libraries (List with purpose and license compatibility)

**7. Functionality:**
    *   7.1 Real-Time Updates (What it does, What it requires, Abstractions, Additional Considerations)
    *   7.2 Online Syncing (Purpose, Authentication via OAuth, Synchronization Mechanism including immediate persistence, cloud syncing, data storage/retrieval, background sync, Recycle Bin sync, conflict handling, initial sync behavior, `lastModifiedDate` sync, storage/network issues, user feedback, Key Components - AuthManager/StorageManager/SyncManager/DataManager, Abstractions, Requirements for syncing)
    *   7.3 Error Handling / Feedback Mechanisms (Error Detection/Categorization, User Notifications - Philosophy/Mechanisms/Levels/Examples/Recycle Bin specifics, Logging - Purpose/Implementation/No Telemetry/User Control, Recovery Mechanisms, Feedback for Success, Accessibility, Cross-Browser Compatibility, Testing)
    *   7.4 Import and Export Formats:
        *   7.4.1 Supported Formats (JSON, CSV, HTML (Netscape), Export for Email (HTML), TXT)
        *   7.4.2 Export Functionality (Recycle Bin Exclusion):
            *   7.4.2.1 Export Scope (Entire Workspace, Selected Folders, Selected Collections)
            *   7.4.2.2 Export Process (Initiate, Format Selection, Configuration for TXT with custom templates, Confirmation, Download with name sanitization)
            *   7.4.2.3 Format-Specific Export Details (JSON, CSV, HTML (Netscape), Export for Email (HTML), TXT with predefined/custom templates and placeholder explanation)
        *   7.4.3 Import Functionality (Recycle Bin Isolation):
            *   7.4.3.1 Import Scope (Collections into Folders, HTML Bookmark Import)
            *   7.4.3.2 Import Process (Initiate, File Selection, Format Detection, Import Options for JSON including duplicate/conflict handling, CSV/HTML/TXT options, Confirmation, Execution with large file handling)
            *   7.4.3.3 Format-Specific Import Details (JSON, CSV, HTML (Netscape) with name sanitization and path separator handling, TXT)
            *   7.4.3.4 Example of HTML Bookmark Import
        *   7.4.4 Format-Specific Considerations (JSON, CSV, HTML (Netscape), Export for Email (HTML), TXT)
        *   7.4.5 User Requirements Coverage
    *   7.5 Internal Note Linking (URI Scheme, Link Creation, Navigation, Back Navigation, Handling Broken Links)

**8. Non-Functional Requirements:**
    *   8.1 Accessibility (WCAG 2.1 AA, Keyboard Navigation including panel resizing, Screen Reader Support, Color Contrast, Text Resizing, Focus Management, Testing, Recycle Bin Page accessibility)
    *   8.2 Security and Privacy (Data Protection, HTML Sanitization, OAuth Security, Encryption, Permissions, Compliance)
    *   8.3 Performance (Load Times, Memory Usage, Browser Responsiveness, Optimization Strategies, Testing)
    *   8.4 Internationalization (General principles, default name localization, user contributions):
        *   8.4.1 Bi-Directional Text and RTL Support (Text Direction/Alignment, Layout Mirroring, Icon/Image Adjustments, Text Input/Editing, Localization, CSS/Styling, JavaScript Adjustments, Testing)

**9. Future Enhancements:**
    *   (List of potential future features like broader browser/OS/storage support, proactive warnings, uninstallation feedback)

**10. Glossary:**
    *   (A comprehensive list of key terms used in the PRD with their definitions relevant to Tabitha)

Ensure the PRD is comprehensive, clear, and internally consistent. The document should define "what" Tabitha does, for "whom," and "why," laying a solid foundation for subsequent technical specification and development.

**Output Format:**
A single, complete Markdown document named `PRD.md`. Ensure all sections and sub-sections listed above are included and detailed appropriately.
```