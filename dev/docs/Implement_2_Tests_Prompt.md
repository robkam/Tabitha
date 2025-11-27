**Task:**
Based on the implemented code for the feature(s) specified above, generate the necessary Vitest tests. The tests should be comprehensive, adhering to the project's TSD (Technical Specification Document), especially Section 12 (Testing Strategy), and ensure robust coverage of the implemented functionalities.

**Instructions & Requirements for Test Generation:**

1.  **Global Mock Analysis & Updates (`src/tests/setup.ts`):**
    *   **Action:** Review the implemented code of the specified feature(s) now present.
    *   **Focus:** Determine if any new browser APIs were utilized or if other global mock setups in `src/tests/setup.ts` require additions or modifications (e.g., updating the `webextension-polyfill` mock).
    *   **Output:**
        *   If changes are needed to `src/tests/setup.ts`, provide the **complete, updated file content**.
        *   If no changes are necessary, explicitly state: "No changes needed to `src/tests/setup.ts` for this Focus Area."

2.  **Unit Test Implementation:**
    *   **Scope:** Create or update Vitest unit test file(s) (e.g., `feature.test.ts`, `component.test.tsx`) for the core TypeScript/JavaScript logic, functions, classes, and Preact components that were introduced or significantly modified by the implemented feature(s).
    *   **Test Coverage - Key Areas:**
        *   **Happy Paths:** Verify correct behavior with typical, valid inputs and conditions.
        *   **Edge Cases:** Test boundary conditions, empty inputs, null/undefined values, and other atypical but plausible scenarios.
        *   **Error Handling:** Confirm that error conditions are handled correctly as per the feature's implementation (e.g., errors thrown, specific values returned, state updated appropriately).
        *   **UI Components (Preact):**
            *   Test rendering with different props and states.
            *   Assert the presence/absence of key elements and correct text content or attributes.
            *   Verify basic event handling and state changes if applicable to the component's responsibility within the feature.
    *   **Mocks:** Employ local mocks within test files using Vitest's `vi.fn()`, `vi.spyOn()`, or `vi.mock()` for dependencies specific to the unit under test. Clearly justify the purpose of significant mocks.
    *   **Guidelines:** Adhere to TSD Section 12.1 (Unit Tests).
    *   **Output:** Provide the **full content of all new or modified unit test files**. Include brief TSDoc-style comments or explanations for test suites or particularly complex test cases, clarifying what they cover and the mocking strategies used.

3.  **Integration Test Implementation (If Applicable):**
    *   **Scope:** If the implemented feature(s) involve direct interactions, message passing, or event handling between distinct, collaborating components/modules (e.g., UI sending a message to a Background Service, an Entity Manager interacting with `DataManager`).
    *   **Verification:** Focus on testing the contract and communication flow between the feature's primary components and their immediate, direct collaborators. Ensure that when one component acts, the expected interaction occurs with the collaborator.
    *   **Mocks:** Implement local mocks for these collaborators. The mocks should accurately simulate the collaborator's interface and behavior *at the point of integration* but should not replicate the collaborator's entire internal logic (which is the subject of its own unit tests).
    *   **Guidelines:** Adhere to TSD Section 12.2 (Integration Tests).
    *   **Output:**
        *   Provide the **full content of all new or modified integration test files**, with brief explanations.
        *   If integration tests are not applicable for the specific feature(s) implemented (e.g., the feature is a static configuration, a self-contained utility with no external runtime dependencies, or its interactions are too broad for this level of testing), explicitly state this and provide a brief justification.

4.  **General Test Practices:**
    *   **File Structure & Naming:**
        *   Place test files adjacent to their corresponding source files (e.g., `src/core/myFeature.ts` and `src/core/myFeature.test.ts`) or within a `__tests__` subdirectory for UI components (e.g., `src/components/MyComponent/__tests__/MyComponent.test.tsx`).
        *   Use standard naming conventions: `*.test.ts`, `*.spec.ts`, `*.test.tsx`, `*.spec.tsx`.
    *   **Code Quality:** Ensure all test code is clean, readable, maintainable, and follows the project's established coding standards and the TSD.
    *   **TSD Adherence:** All testing approaches must align with TSD Section 12 (Testing Strategy).

**Constraints for Test Code:**
*   All test code must be written in TypeScript.
*   Generated tests must be runnable and pass within the existing Vitest environment (as configured by `vitest.config.ts` and `src/tests/setup.ts`, potentially updated per item 1 of this task).
*   Prioritize testing observable behavior and component contracts over internal implementation details, where feasible.

**Output Format:**
Provide a Markdown document organized as follows:

*   **Feature(s) Being Tested:** (Re-state the feature(s) from the "Context" section of this prompt)
*   **Section 1: Global Mock Updates (`src/tests/setup.ts`)**
    *   (Content of the updated file or the "No changes needed..." statement)
*   **Section 2: Unit Test Implementation**
    *   (For each test file: File path, followed by its full content in a code block)
*   **Section 3: Integration Test Implementation**
    *   (For each test file: File path, followed by its full content in a code block, or the justification if not applicable)

