The following analysis describes the progress of the project as far as
[PROMPTER: SPECIFY HERE THE LAST STAGE REACHED in Implement_list.md.]
from the included Implement_list.md.

[PROMPTER: INSERT TABITHA.txt HERE]

**Focus Area for Implementation from Implement_list.md:**
[PROMPTER: SPECIFY THE COMPONENT/FEATURE HERE]

**LLM TASK DEFINITION STARTS HERE:**

**Stage:** Implementation
**Role:** You are a Senior Frontend Developer specializing in interactive UIs and browser extensions. You are proficient with Vanilla JavaScript (ES6+), TypeScript, HTML5, CSS3, and the libraries specified in the TSD (including Vitest for testing).
**Task:**
For the **Focus Area for Implementation** specified above by the prompter:

**LLM General Output Guideline:**
> The following sections (1. HTML, 2. CSS, 3. TypeScript/JavaScript Logic) should only be included in your response if they are *directly relevant* to the **Focus Area for Implementation**. For example, if the focus is purely on a backend data processing algorithm, HTML and CSS would likely not be applicable. If the focus is on a UI-only static display, JavaScript logic might be minimal. **If a section (1, 2, or 3) is not applicable, omit it entirely from your response.**

1.  **HTML Structure:**
    *   Provide the necessary HTML markup if the Focus Area involves UI elements.
    *   Ensure it is semantic, well-structured, and includes appropriate IDs/classes for JavaScript hooks and CSS styling.
    *   Incorporate `Font Awesome` icons where specified or appropriate (TSD 5.3).

2.  **CSS Styling:**
    *   Provide CSS (plain CSS or CSS Modules as per TSD 5.2) if the Focus Area involves UI elements that require specific styling.
    *   Define styles for the layout, appearance, and basic responsiveness of the UI elements.
    *   Define styles that align with the overall design principles.
    *   Consider how theming (dark/light mode as per TSD) might affect these styles, perhaps by suggesting CSS variables or classes.

3.  **TypeScript/JavaScript Logic:**
    *   Provide the necessary TypeScript/JavaScript code (Preact components, functions, classes, event listeners) if the Focus Area involves client-side or background script logic.
    *   Show how this component/feature will interact with other components/managers by invoking their public methods as defined in the TSD.
    *   Illustrate the use of specified libraries (TSD 5.3) for their intended purpose.
    *   Describe data handling, input validation (if applicable), and any local state management relevant to this specific component/feature.
    *   If this component involves communication with other parts of the extension (e.g., UI to background, background internal messages), detail that mechanism (TSD 2.2.4, 3.3.1).
    *   All code must be consistent with the TSD, including specified architectures, design patterns, data models, and API contracts. Write clean, modular, well-commented (TSDoc/JSDoc style where appropriate), and self-documenting code.

4.  **Integration Points & Data Flow:**
    *   Clearly explain how this piece of implementation receives data, processes it, and passes it to other parts of the system as per the TSD's architecture and component interactions.
    *   Reference specific TSD sections if they define the interaction pattern (e.g., "Communicates with `BackgroundOrchestrator` via `browser.runtime.sendMessage` as per TSD 2.2.4").

5.  **Error Handling (Inline):**
    *   Show examples of how errors specific to this component's operations would be caught and handled, aligning with the TSD's error handling strategy (TSD Section 8). If a `LogService` is available, show its use.

6.  **Accessibility Considerations (A11y):**
    *   Briefly mention any specific accessibility considerations (TSD Section 14) made in the HTML/CSS/JS for this component (e.g., ARIA attributes, keyboard navigation).

7.  **Security Considerations:**
    *   Briefly mention any specific security considerations (TSD Section 9) relevant to this component (e.g., input sanitization if handling user input, use of DOMPurify for HTML content).

8.  **Impact on Existing Test Infrastructure & Mocks:**
    *   **Identify necessary updates to `src/tests/setup.ts` (global mocks):**
        *   If the Focus Area utilizes new browser APIs (e.g., `browser.notifications`, `browser.commands`) for the first time, specify the additions needed to the `webextension-polyfill` mock in `src/tests/setup.ts` (found within TABITHA.txt).
        *   If it introduces new widely-used utility functions or services that other components might mock globally, mention them.
    *   **Identify potential impacts on existing test files:**
        *   If the Focus Area changes the public API or behavior of a component that is already being tested *by other existing tests* (as evident from TABITHA.txt), briefly note which existing test files might need review or modification to align with these changes. (e.g., "Tests for `ComponentX` might need updates as `ComponentY`'s API, which `ComponentX` uses, has changed.").
        *   **LLM Instruction:** *This is for LLM awareness; do not rewrite old tests as part of this prompt's response. Note the potentially impacted files for the prompter.*
    *   **PROMPTER NOTE:**
        > If the LLM identifies existing test files that need updating, it is recommended to address these updates in a **new, separate prompt** after this current implementation is complete (using a prompt like `Update_Existing_Tests_Prompt.md`). This keeps each prompt focused.
        > Your follow-up prompt could be: "Based on the recent implementation/modification of [Feature Name], the file `[path/to/impacted_test_file.test.ts]` was identified as needing updates. Please review this test file and update the relevant test cases to align with the changes. Ensure all original test intents are preserved." You would then provide the content of `impacted_test_file.test.ts` and any other necessary context.

9.  **Test Plan Outline / Testing Suggestions (using Vitest as per TSD Section 12):**
    *   **LLM Guideline for this section:** The goal is to outline *what* to test and *how* (key cases, mocks needed), not to write the full test code here. The full test implementation will be a separate step using a prompt like `Implement_New_Tests_Prompt.md`. Before suggesting tests, acknowledge any necessary updates to global mocks (like `src/tests/setup.ts`) identified in section 8.
    *   **Unit Test Suggestions:**
        *   For the core TypeScript/JavaScript functions, classes, and Preact components implemented within this Focus Area, outline key unit test cases.
        *   Describe the main scenarios to cover (happy paths, edge cases, error conditions).
        *   Identify key inputs and expected outputs/behaviors.
        *   Specify any significant local mocks that would be required for these tests (e.g., "mock `dependencyX.methodY` to return `true` for success cases and `throw Error` for failure cases").
        *   **LLM Guideline:** If no significant JS logic is implemented, suggestions might focus on basic rendering or instantiation checks for UI components.
    *   **Integration Test Suggestions:**
        *   If this Focus Area involves direct interactions, message passing, or event handling with other distinct components/managers (as described in "Integration Points & Data Flow" or TSD), outline key integration test cases.
        *   Describe the interactions to be verified (e.g., "test that when component A emits event X, component B's method Y is called with expected arguments").
        *   Specify the collaborators that would need to be mocked and the essential aspects of their mocked behavior for these integration tests.
        *   *Note for LLM: These integration tests focus on the interactions of the current Focus Area. Broader end-to-end tests are considered separate.*
        *   **LLM Guideline:** If the component is highly isolated or static for this focus, integration tests might not be applicable; state this and justify.

**Constraints (For LLM):**
*   Adhere strictly to the architecture, component responsibilities, public APIs, and data models defined in the **TSD**.
*   All client-side code must use TypeScript, Preact for UI components, HTML5, and CSS3.
*   Utilize the libraries (TSD 5.3) as intended and specified in the TSD.
*   Code should be well-commented (TSDoc/JSDoc style where appropriate) and follow a self-documenting style. Adhere to specified coding conventions and style guides.
*   The implementation must align with the guidelines for modularity, maintainability, security (TSD Section 9), performance (TSD Section 10), and testability set forth in the TSD.
*   Ensure the solution considers cross-browser compatibility as outlined in the TSD (Section 2.3).
*   All generated code must be provided in full, ready for integration. Do not provide snippets if a full file or module is implied. If updating existing files, provide the entire file, consolidated, with all changes incorporated, referencing the version from TABITHA.txt as the baseline.

**Output Format (For LLM):**
A Markdown document containing:
*   A brief heading re-stating the **Focus Area for Implementation**.
*   Clear, distinct sections for (omit sections 1, 2, or 3 if genuinely not applicable as per the "LLM General Output Guideline" above):
    *   **Generated/Updated Files** (List of new or modified file paths, followed by their full content in code blocks. For modified files, clearly indicate that they are updates to files present in TABITHA.txt)
    *   1. **HTML Structure** (with code blocks)
    *   2. **CSS Styling** (with code blocks)
    *   3. **TypeScript/JavaScript Logic** (with code blocks and explanations)
    *   4. **Integration Points & Data Flow** (descriptive text)
    *   5. **Error Handling Notes**
    *   6. **Accessibility Notes**
    *   7. **Security Notes**
    *   8. **Impact on Existing Test Infrastructure & Mocks** (descriptive text and code suggestions for `setup.ts`)
    *   9. **Test Plan Outline / Testing Suggestions** (with subsections for Unit Test Suggestions and Integration Test Suggestions)
*   Explanations for key implementation decisions, how they map to TSD requirements, and any assumptions made.
