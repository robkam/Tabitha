**F. Testing Phase (Test Plan and Case Generation)**

**Prompt F1: Test Plan Outline Generation**

```markdown
I am developing a free open-source browser extension called "Tabitha" under the GPL 3 license.
The project will be hosted on GitHub, with support via GitHub Issues and Discussions.
The key documents guiding the project are:
1. PRD.md (detailed product requirements - the "what")
2. Technical Specification Document (TSD) (detailed technical design - the "how")

[PASTE A SUMMARY OR LINK TO PRD.md - focus on scope and high-level features]
[PASTE A SUMMARY OR LINK TO TSD.md - focus on architecture and key components]

---

Now, based on the PRD and TSD, I need your assistance with the following:

**Stage:** Testing
**Role:** You are a QA Lead with experience in testing complex web applications and browser extensions.
**Task:**
Generate a high-level Test Plan outline for the Tabitha browser extension. The plan should cover:
1.  **Introduction/Overview:** Objectives of the testing effort, referencing the quality goals derived from the PRD and TSD.
2.  **Scope of Testing:**
    *   **In-Scope Features:** List key features and functionalities to be tested, mapped from PRD requirements and their technical implementation outlined in the TSD.
    *   **Out-of-Scope Features:** Explicitly state features/areas not covered (referencing `PRD.md` section 2.2).
3.  **Test Strategy:**
    *   **Types of Testing:** Detail the testing types to be performed (e.g., Functional Testing (against PRD & TSD), UI/UX Testing (against PRD & TSD mockups/guidelines if any), API/Component Integration Testing (for TSD-defined components), Usability Testing, Performance Testing (against PRD NFRs), Security Testing (client-side, against PRD NFRs), Accessibility Testing (against PRD NFRs), Cross-Browser Compatibility Testing, Synchronization Testing, Data Integrity Testing, Error Handling Testing).
4.  **Test Environment:**
    *   As specified in the PRD (browsers, OS versions).
5.  **Test Deliverables:** List expected outputs (e.g., Test Cases (referencing PRD requirements and TSD specifications), Bug Reports, Test Execution Logs, Test Summary Report).
6.  **Entry and Exit Criteria:** Define conditions for starting and concluding major testing phases, based on development milestones (e.g., feature completeness as per TSD).
7.  **Risks and Mitigation:** Identify potential risks to the testing process and their mitigation strategies.
**Output Format:** Markdown document.
```

**Prompt F2: Test Case Generation for Recycle Bin Feature**

```markdown
I am developing a free open-source browser extension called "Tabitha" under the GPL 3 license.
The project will be hosted on GitHub, with support via GitHub Issues and Discussions.
The key documents are:
1. PRD.md (defines "what" the Recycle Bin should do - section 6.4.5 and related component deletion logic)
2. Technical Specification Document (TSD) (defines "how" the Recycle Bin is implemented, its data structures, and interactions)

[PASTE PRD.md Section 6.4.5 and relevant parts of 6.5.1, 6.5.2, 6.5.3, 6.5.4 regarding deletion]
[PASTE RELEVANT TSD SECTIONS for RecycleBinManager, its data model, and interaction with other components for deletion/restoration]

---

Now, based on the PRD and TSD, I need your assistance with the following:

**Stage:** Testing
**Role:** You are a QA Engineer.
**Task:**
Generate a comprehensive set of functional test cases for the Recycle Bin feature. Each test case should verify that the **implemented code behaves according to the PRD requirements and TSD specifications.**

For each test case, include:
    - Test Case ID (e.g., TRB-001)
    - Test Case Title/Objective (referencing specific PRD requirement/TSD detail)
    - Preconditions
    - Steps to Execute (clear, actionable steps interacting with the extension)
    - Expected Result (based on PRD specifications and TSD design)
    - Actual Result (placeholder for execution)
    - Pass/Fail (placeholder for execution)

Cover scenarios including, but not limited to, those outlined in the PRD for the Recycle Bin (deletion with retention > 0, appearance in bin, restoration, permanent deletion, retention = 0 behavior, auto-deletion, bulk actions, UI elements, sync of bin contents), and verify they match the technical implementation detailed in the TSD.
**Output Format:** Markdown table for test cases.
```

---

**G. Deployment Phase (Checklists, Release Notes)**

**Prompt G1: Browser Store Submission Checklist for Chrome**

```markdown
I am preparing to deploy the Tabitha browser extension, a free open-source project under GPL 3, hosted on GitHub.
The **implemented features of the code** (which should align with the PRD and TSD) are ready for release.

[PROVIDE A LINK TO THE FINAL PRD.md and TSD.md, or a summary of key features implemented in the current build]

---

Now, based on the implemented codebase and general best practices for Chrome Web Store submission, I need assistance:

**Stage:** Deployment
**Role:** You are a Release Manager experienced in publishing browser extensions.
**Task:**
Create a comprehensive checklist specifically for submitting the **current build** of the Tabitha browser extension to the Chrome Web Store.
The checklist should include items related to:
    - **Manifest File (`manifest.json` v3 in the build):** Verification against the actual manifest in the codebase.
    - **Assets (in the build):** Verification of icons and required promotional images.
    - **Store Listing Content:** Based on the **features present in the current build**.
    - **Privacy Policy:** Reflecting the data handling of the **current build**.
    - **Testing:** Final smoke testing of the **packaged build**.
    - **Permissions Justification:** Based on permissions requested by the **current build's manifest**.
    - **Build Process and Packaging:** Ensuring the .zip file is correct for the **current build**.
    - **OAuth Consent Screen:** Configuration matching the **current build's requirements** for Google Drive sync.
    (Other general items from the previous prompt remain relevant but should be contextualized to the actual build being deployed).
**Output Format:** Markdown checklist.
```

**Prompt G2: Draft Release Notes for Tabitha v1.0**

```markdown
I am preparing the initial release (v1.0) of the Tabitha browser extension.
The **code for v1.0 has been developed and tested**, implementing features as defined in the PRD and TSD.

[PROVIDE A LINK TO THE FINAL PRD.md and TSD.md, or a list of key features confirmed to be in the v1.0 build]

---

Now, based on the **actual features implemented in the v1.0 build**, I need assistance:

**Stage:** Deployment
**Role:** You are a Technical Writer skilled in crafting clear and engaging release communications.
**Task:**
Draft the initial release notes for **Tabitha v1.0**. The notes should accurately reflect the **functionality present in this specific v1.0 build**.

The release notes should include:
    - **Title:** e.g., "Tabitha v1.0: Organize Your Browser Like Never Before!"
    - **Introduction:** A brief, engaging overview of Tabitha.
    - **Key Features in v1.0:** A bulleted list highlighting the main functionalities **available in this v1.0 build**, ensuring accuracy with the implemented code.
    - **What's New:** (Emphasize it's the first public release).
    - **Known Issues:** List any known minor bugs or limitations **identified in the v1.0 build during testing**.
    - **Getting Started:** Brief pointer on using the extension.
    - **Support and Feedback:** GitHub links.
    - **Open Source & Contribution:** Note on FOSS nature.
    - **A Thank You:** To early adopters/contributors.
**Output Format:** Markdown.
```

---

**H. Maintenance Phase (Bug Triage, Documentation Updates)**

**Prompt H1: Analyzing a User-Reported Bug (Post v1.0 Release)**

```markdown
The Tabitha browser extension (v1.0, free open-source, GPL 3, GitHub hosted) has been released and a user has reported an issue.
The reference documents are:
1. PRD.md (defines expected user-facing behavior)
2. Technical Specification Document (TSD) (details the technical implementation)
3. The v1.0 Source Code

[PROVIDE LINKS/SUMMARIES for PRD (especially search), TSD (SearchManager, data flow for search), and acknowledge the source code as the ground truth for current behavior.]

---

**User Bug Report (Received on GitHub Issues for Tabitha v1.0):**
"Hi, I'm using Tabitha v1.0 on Chrome (latest stable). I created a Workspace called 'Project X'.
I then tried to use the workspace-wide search (the search icon in the Workspaces panel header).
When I type the name of a Collection I know exists in 'Project X' into the search popover (with 'All' or 'Collections' scope selected),
it says 'No results found for "[my collection name]"'. The collection is definitely there and visible in the Collections panel when I select the correct Folder.
The search *does* find open tabs if I select the 'Tabs' scope."

**Stage:** Maintenance
**Role:** You are a Developer and Support Engineer for Tabitha.
**Task:**
1.  **Analyze the Bug Report:** Based on the user's report, compare the **observed behavior (from the report) with the expected behavior (PRD)** and the **technical implementation (TSD and potentially snippets of relevant source code logic for search/indexing).**
    a.  List potential causes for this bug, considering discrepancies between expected behavior and how the **code** might be functioning (e.g., bug in `SearchManager` indexing logic, `Fuse.js` configuration error in the code, data propagation issue in the implemented data flow).
    b.  Suggest specific troubleshooting steps the user could try.
    c.  Identify what further information you would request from the user (e.g., console logs if enabled via Settings in their installed extension, exact steps, special characters).
    d.  Outline areas in the **actual codebase** (referencing specific modules/functions based on TSD like `SearchManager.indexWorkspaceData()`, `SearchManager.performSearch()`) that require investigation and debugging.
2.  **Draft User Reply:** Compose a polite, empathetic, and helpful reply to the user on the GitHub Issue.
**Output Format:** Markdown with clearly separated sections for "Bug Analysis" and "Draft User Reply".
```
