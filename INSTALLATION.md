# Tabitha Installation Guide

This guide explains how to build the Tabitha browser extension from source and install it for development or personal use.

## Prerequisites

*   **Node.js**: Ensure you have Node.js installed. We recommend using the latest LTS (Long-Term Support) version. You can download it from [nodejs.org](https://nodejs.org/).
*   **Package Manager**: npm (comes with Node.js), pnpm, or yarn. This guide will use npm commands, but equivalents for pnpm/yarn can be used.
*   **Git**: For cloning the repository.
*   A supported web browser (Chrome, Firefox, Edge, Opera).

## Building from Source

1.  **Fork and Clone the Repository**:
    To contribute changes, you'll first need to create your own copy (a "fork") of the main Tabitha repository. Main repositories are typically where final contributions are merged; you'll make your changes in your personal fork.

    *   **Fork the Repository**: Go to the main Tabitha repository page on GitHub: `https://github.com/robkam/Tabitha` and click the "Fork" button in the top-right corner. This will create a copy of the repository under your GitHub account.

    *   **Clone Your Fork**: Once you have forked the repository, open your terminal and clone your personal fork to your local machine. Replace `YOUR_USERNAME` with your actual GitHub username:
        ```bash
        git clone https://github.com/YOUR_USERNAME/Tabitha.git
        ```
    *   **Navigate into the Directory**:
        ```bash
        cd Tabitha
        ```
    *   **(Optional but Recommended) Configure Upstream**: To keep your fork updated with changes from the main repository, add the original repository as an "upstream" remote:
        ```bash
        git remote add upstream https://github.com/robkam/Tabitha.git
        ```
        You can then fetch changes from upstream and merge them into your local branches (e.g., `git fetch upstream`, `git merge upstream/main`).

2.  **Install Dependencies**:
    Install the project dependencies using npm:
    ```bash
    npm install
    ```
    (Or `pnpm install` or `yarn install`)

3.  **Build the Extension**:

    *   **For Development (with Hot Module Replacement/Live Reloading):**
        This command starts a development server that watches for file changes and rebuilds the extension automatically.
        ```bash
        npm run dev
        ```
        This will typically create a `dist/` directory containing the unpacked extension files. The development server might also offer HMR for the UI. The `vite-plugin-web-extension` should manage this.

    *   **For Production (Optimized Build):**
        This command creates an optimized, minified build of the extension in the `dist/` directory, ready for packaging or publishing.
        ```bash
        npm run build
        ```

## Loading the Unpacked Extension in Your Browser

After running `npm run dev` or `npm run build`, you will have an unpacked extension in the `dist/` directory. Here's how to load it into common browsers:

### Google Chrome / Microsoft Edge (Chromium-based)

1.  Open your browser and navigate to `chrome://extensions` (for Chrome) or `edge://extensions` (for Edge).
2.  Enable **"Developer mode"**. This is usually a toggle switch in the top right corner.
3.  Click on the **"Load unpacked"** button.
4.  In the file dialog, navigate to the `Tabitha` project directory and select the `dist` folder.
5.  The Tabitha extension should now appear in your list of extensions and be active.

If you are using `npm run dev`, changes to your code should automatically reload the extension (or parts of it). For some changes, especially to the `manifest.json` or background script, you might need to manually click the "reload" icon for the extension on the `chrome://extensions` page.

### Mozilla Firefox

1.  Open Firefox and navigate to `about:debugging`.
2.  Click on **"This Firefox"** (or "This Nightly", etc.) in the sidebar.
3.  Click on **"Load Temporary Add-on..."**.
4.  In the file dialog, navigate to the `Tabitha/dist/` directory and select the `manifest.json` file.
5.  The Tabitha extension should now appear in the list of temporary add-ons.

Temporary add-ons in Firefox are removed when you close the browser. You'll need to reload it each time you restart Firefox if you're not using a development setup that manages this (e.g., `web-ext` tool, though `vite-plugin-web-extension` aims to simplify this for Vite). `vite-plugin-web-extension` might offer specific commands or workflows for Firefox development.

### Opera

Opera is Chromium-based, so the process is similar to Chrome:

1.  Open Opera and navigate to `opera://extensions`.
2.  Enable **"Developer mode"**.
3.  Click on **"Load unpacked"**.
4.  Select the `Tabitha/dist/` folder.

## Staying Updated

If you pull new changes from the repository:
1. Re-run `npm install` if `package.json` has changed.
2. Re-run `npm run build` (or ensure your `npm run dev` process picks up changes).
3. Reload the extension in your browser (often a refresh button on the extensions page for the specific extension).

Enjoy using and developing Tabitha!