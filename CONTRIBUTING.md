# Contributing to Tabitha

First off, thank you for considering contributing to Tabitha! Your help is greatly appreciated.

This document provides guidelines for contributing to the project. Please read it carefully to ensure a smooth and effective collaboration.

## Code of Conduct

This project and everyone participating in it is governed by a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior.

## How Can I Contribute?

There are many ways to contribute to Tabitha, including:

*   **Reporting Bugs**: If you find a bug, please create an issue in our GitHub repository, providing as much detail as possible.
*   **Suggesting Enhancements**: If you have ideas for new features or improvements, feel free to create an issue to discuss them.
*   **Writing Code**: You can help by fixing bugs or implementing new features.
*   **Improving Documentation**: Clear and accurate documentation is crucial.
*   **Testing**: Help test new releases or specific features, or contribute automated tests.

## Development Environment & Workflow

The following instructions are primarily geared towards a development workflow using a **text editor and terminal commands**. If you prefer an IDE, see the "Using an IDE" section below.

### Prerequisites
*   Node.js (LTS version recommended)
*   npm (comes with Node.js)
*   Git

### Initial Setup

1.  **Fork**: Fork the main repository (`https://github.com/robkam/Tabitha`) to your personal GitHub account.
2.  **Clone**: Clone your fork locally: `git clone https://github.com/YOUR_USERNAME/Tabitha.git` (replace `YOUR_USERNAME`).
3.  **Navigate**: `cd Tabitha`
4.  **Upstream**: Add the main repository as an upstream remote: `git remote add upstream https://github.com/robkam/Tabitha.git`.
5.  **Dependencies**: Install project dependencies:
    ```bash
    npm install
    ```
    *This will also install necessary development tools like ESLint, Prettier, TypeScript, and Vitest. If the project uses Husky for pre-commit hooks, this step might also set them up automatically (if a `prepare` script is configured in `package.json`).*

### Making Changes (The Fork & Pull Request Workflow)

1.  **Branch**: Create a new branch for your changes from the `main` branch (e.g., `bugfix/issue-123`, `feature/search-enhancement`):
    ```bash
    git fetch upstream # Ensure your local main is up-to-date with upstream/main
    git checkout -b your-branch-name upstream/main
    ```
2.  **Code**: Make your changes.
3.  **Quality Checks (Crucial!)**:
    *   **Automated Checks (Pre-commit Hooks)**: If you've set up pre-commit hooks (see "Pre-commit Hooks" section below), they will run automatically when you try to commit. If they pass, you're good! If they fail, address the issues and try committing again.
    *   **Manual Checks**: If pre-commit hooks are not set up, or if you want to run checks independently, use these commands from your terminal:
        *   **Linting**:
            ```bash
            npm run lint:fix # Attempts to automatically fix linting issues
            # or npm run lint (to only check)
            ```
        *   **Formatting**:
            ```bash
            npm run format # Formats code with Prettier
            ```
        *   **Type Checking** (ensure `"type-check": "tsc --noEmit"` exists in `package.json` scripts):
            ```bash
            npm run type-check
            ```
        *   **Testing** (ensure `"test:watch": "vitest --watch"` exists for iterative testing):
            ```bash
            npm test # Run all tests
            # During development, it's helpful to have this running in a separate terminal:
            # npm run test:watch
            ```
4.  **Commit**: Commit your work with clear and concise messages.
    ```bash
    git add .
    git commit -m "feat: Implement user authentication"
    ```
    *(If pre-commit hooks are active, they will run here.)*
5.  **Push**: Push your branch to your fork on GitHub:
    ```bash
    git push origin your-branch-name
    ```
6.  **Pull Request (PR)**: Open a Pull Request from your branch on your fork to the `main` branch of `robkam/Tabitha`. Provide a clear description of your changes and link any relevant issues.

### Pre-commit Hooks (Highly Recommended with Husky & lint-staged)

To automate quality checks and ensure consistency *before* each commit, we use (or strongly recommend using) [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged).

*   **What they do**: Husky allows us to run scripts at different Git hook stages (like pre-commit). `lint-staged` allows running linters, formatters, and other scripts only on the files that are staged for commit.
*   **Setup (if not already done by `npm install` via a `prepare` script):**
    1.  Install development dependencies:
        ```bash
        npm install --save-dev husky lint-staged
        ```
    2.  Enable Git hooks for Husky:
        ```bash
        npx husky install
        ```
        *(Consider asking the project maintainer to add `"prepare": "husky install"` to `package.json` `scripts` to automate this step for everyone after `npm install`.)*
    3.  Add a pre-commit hook that runs `lint-staged`:
        ```bash
        npx husky add .husky/pre-commit "npx lint-staged"
        ```
    4.  Configure `lint-staged` in your `package.json`. Add a top-level key like this (adjust commands and file patterns as needed):
        ```json
        // In package.json
        "lint-staged": {
          "*.{ts,tsx,js,jsx,cjs,mjs}": [
            "npm run lint:fix",
            "npm run format",
            "npm run type-check"
            // You could also add: "npm test -- --findRelatedTests --bail"
          ],
          "*.{css,scss,json,md}": [
            "npm run format"
          ]
        }
        ```
*   **How it works**: Once set up, every time you run `git commit`, `lint-staged` will execute the configured commands on the files you've staged. If any command fails, the commit will be aborted, allowing you to fix the issues.
*   **Temporarily Bypassing Hooks (Use with Caution!)**: If you absolutely need to commit without running the hooks (e.g., for a work-in-progress commit you don't intend to push yet, or if a hook is misbehaving), you can use the `--no-verify` flag:
    ```bash
    git commit -m "WIP: an unfinished feature" --no-verify
    ```
    **Warning**: Only bypass hooks if you understand the implications. Code committed this way might not meet project standards and should be fixed before creating a Pull Request.

### Using an IDE (e.g., VS Code)

If you are using an Integrated Development Environment (IDE):
*   **Extensions**: Install extensions for ESLint, Prettier, and TypeScript. Configure them to use the project's versions and settings (e.g., enable format on save with Prettier, show ESLint errors inline). This provides excellent real-time feedback.
*   **Terminal Integration**: Utilize your IDE's integrated terminal to run the npm scripts mentioned above for linting, testing, etc.
*   **Test Runner Integration**: Many IDEs offer integrations for test runners like Vitest, allowing you to run and debug tests directly from the UI.

While IDEs can automate some checks (like formatting on save) and provide a great development experience, **it's still crucial to ensure all `npm run ...` quality checks (or the automated pre-commit hooks) pass before submitting a PR.** These defined scripts are the source of truth for project quality.

## Pull Request Guidelines

*   Ensure your PR addresses an existing issue or a well-defined new feature.
*   Keep PRs focused on a single issue or feature.
*   **Ensure your code passes all quality checks** (linting, formatting, type-checking, tests), preferably automated by pre-commit hooks.
*   **Include or update tests** for your changes. New features require tests; bug fixes should ideally have a test that reproduces the bug and verifies the fix.
*   Provide a clear description of the changes in your PR, linking to relevant issues.
*   Be responsive to feedback and review comments.

## Coding Style

*   Follow the established coding style enforced by ESLint and Prettier. Running `npm run lint:fix` and `npm run format` (or having pre-commit hooks do it) will handle most of this.
*   Write clear, readable, and well-commented code where necessary.
*   Adhere to architectural principles (see `dev/docs/TSD.md` if applicable and available).

## Issue Tracking

*   Use GitHub Issues at `https://github.com/robkam/Tabitha/issues` to report bugs and suggest features.
*   Before creating a new issue, please check if a similar one already exists.
*   Provide detailed information: steps to reproduce for bugs, browser versions, screenshots if helpful.

## Running Tests

The project uses [Vitest](https://vitest.dev/) for testing. Ensure your `package.json` contains scripts like these:

*   **Run all tests (single run)**:
    ```bash
    npm test # This might run `vitest run` or similar for a single execution
    ```
*   **Run tests in watch mode** (for iterative development):
    ```bash
    npm run test:watch # Typically runs `vitest --watch` or `vitest`
    ```
*   **Run tests with UI** (interactive test runner in browser):
    ```bash
    npm run test:ui
    ```
*   **Generate test coverage report**:
    ```bash
    npm run coverage
    ```
Ensure all tests are passing before submitting a pull request.

Thank you for contributing to Tabitha!