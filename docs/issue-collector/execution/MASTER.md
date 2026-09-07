# MASTER – Join Issue Collector

## Purpose
This file is the single execution-state entry point for Codex.

Read this file first on every run.

## Project
Join – AI-assisted Issue Collector

## Current state
- Current phase: `PHASE-01`
- Last completed phase: `PHASE-00`
- Next phase: `PHASE-01`
- Overall status: `BLOCKED`

## Phase status

| Phase | Name | Status |
|---|---|---|
| PHASE-00 | Repository Audit | COMPLETED |
| PHASE-01 | Requirements Matrix | BLOCKED |
| PHASE-02 | Domain Contracts | PENDING |
| PHASE-03 | Functional Integration | PENDING |
| PHASE-04 | Board Triage | PENDING |
| PHASE-05 | Summary Email Requests | PENDING |
| PHASE-06 | Stakeholder Flow | PENDING |
| PHASE-07 | n8n Contracts | PENDING |
| PHASE-08 | Security & Validation | PENDING |
| PHASE-09 | Desktop Styling | PENDING |
| PHASE-10 | Mobile Styling | PENDING |
| PHASE-11 | Regression | PENDING |
| PHASE-12 | Final Validation | PENDING |

Allowed status values:
`PENDING`, `IN_PROGRESS`, `BLOCKED`, `COMPLETED`.

## Run protocol
1. Read `AGENT.md`.
2. Read this file.
3. Read the current phase file.
4. Validate the last completed phase before starting the next phase.
5. Do not repeat completed work.
6. Read only relevant source files and their direct dependencies after PHASE-00.
7. Execute only the current phase.
8. Validate.
9. Update the current phase report.
10. Update this file.

## Global decisions
- Existing Join is a legacy/group-project base.
- Extend; do not broadly refactor.
- n8n is the orchestration layer.
- Email is the stakeholder input.
- AI-generated tasks start in `Triage`.
- Board order becomes `Triage → To do → In progress → Await feedback → Done`.
- AI-generated marker persists after status changes.
- External email creator is not converted into a fake Join profile.
- Summary receives `Email requests`.
- Logic before styling.
- Figma is the visual source of truth.

## Figma
Main:
https://www.figma.com/design/k5eJt25u0iRylf0McQcVne/Join-Version-1-KI-gest%C3%BCtzte-Automatisierung?node-id=0-1&p=f

Additional:
https://www.figma.com/design/k5eJt25u0iRylf0McQcVne/Join-Version-1-KI-gest%C3%BCtzte-Automatisierung?node-id=45-2487&p=f

Known relevant nodes:
- `350504:9300` Welcome
- `350504:9311` Stakeholder
- `350504:9548` Stakeholder limit reached
- `350504:9168` Email mask
- `45:2195` Summary user

## Design acceptance
UI phases cannot be completed until:
- correct Figma frame inspected,
- desktop/mobile target viewport checked,
- layout checked,
- spacing checked,
- typography checked,
- colors checked,
- interaction states checked,
- second comparison pass completed.

## Do not touch unless required
- Contacts business logic
- existing team auth/login
- signup
- guest flow
- manual task creation behavior
- unrelated legacy styles
- generated docs
- historical DB exports

## Open n8n decisions
- mail provider / inbox
- trigger type
- n8n hosting
- AI provider
- AI model
- credential setup
- Firebase auth from n8n
- counter storage
- counter race-safety
- manual-review destination
- retry policy
- error notification
- final deadline rule
- target email address
- frontend counter data source

## Validation log
- 2026-09-07: PHASE-00 audit validated and COMPLETED. No predecessor existed.
- Full inventory: 173 files. Active code, page dependencies, Firebase paths,
  task schema, Board/Summary flow, CSS/assets and tooling documented in
  [phase-00-audit.md](phase-00-audit.md).
- Passed: 23 JS files and 7 inline scripts parsed; 311 local HTML references and
  25 CSS references resolved; 10 isolated behavior checks confirmed audit findings.
- `npm test` exits 1 because it is an existing placeholder; no usable test suite.
  Live Firebase/auth, browser interaction and Figma comparison were not validated.
- No runtime files changed. Git metadata is absent in this workspace.
- 2026-09-07: PHASE-00 revalidated before starting PHASE-01: all 24 targeted
  fingerprints unchanged and all 10 isolated behavior checks passed. No repair needed.
- 2026-09-07: PHASE-01 progressed to 36 requirements with all ten matrix columns,
  covering all 17 required topic groups. Structure, 15 local source links, 21 existing
  target paths and <=400-line limits validated. The 24 source fingerprints still match.
- PHASE-01 is BLOCKED: Figma metadata access returned a Starter-plan MCP call-limit
  error; both supplied web URLs also failed. No actual frame content was obtained.
- Requirement acceptance tests are specified, not executed. No application code changed.
  PHASE-02 remains PENDING and must not start before the PHASE-01 gate passes.

## Current phase resume point
- Continue [phase-01-requirements.md](phase-01-requirements.md), requirements IC-01–36.
- Revalidate PHASE-00 using its targeted fingerprints/checks; do not repeat its full scan.
- Resolve Q01 source completeness: user was asked whether the supplied control files
  are the complete planning/Academy/tutorial requirements; no answer/source yet recorded.
- Resolve Q02 by restoring usable direct Figma access, then inspect the supplied
  page/additional node and exact desktop/mobile frames. All current Figma IDs are
  references from control files, not verified design content.
- Replace unverified design dependencies with evidence and resolve contradictions;
  do not invent numeric/color states, email-mask behavior or mobile frame IDs.
- Current/Next remains PHASE-01 because it is unfinished. After its gate passes,
  mark it COMPLETED and advance Current/Next to PHASE-02.

## Carry-forward questions
- PHASE-01 needs Academy/tutorial/planning sources beyond the supplied control
  files; no separate document exists in the audited workspace.
- Figma frame contents remain unverified due to the access-limit error; see Q02 above.
- Current tasks use category slugs `user-story` / `technical-task`, priorities
  `urgent` / `medium` / `low`, and four existing statuses. Historical export values
  are not current enums.
- Board cache drops additive metadata and maps unknown statuses to `todo`;
  live rendering omits unknown columns. These are required integration points.
- The 10/day limit is explicit in PHASE-01, and Summary navigation to Board is explicit
  in PHASE-05. Counter scope/timezone/reset semantics, metric meaning, read authorization
  and recipient remain unresolved. Q03–Q11 in the matrix separate downstream contract,
  routing and setup decisions from missing design evidence; no stable contracts invented.

## Changed files
Completed PHASE-00:
- docs/issue-collector/execution/phase-00-audit.md
- docs/issue-collector/execution/MASTER.md

Current PHASE-01 run:
- docs/issue-collector/execution/phase-01-requirements.md
- docs/issue-collector/execution/MASTER.md
