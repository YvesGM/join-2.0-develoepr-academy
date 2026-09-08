# MASTER – Join Issue Collector

## Purpose
This file is the single execution-state entry point for Codex.

Read this file first on every run.

## Project
Join – AI-assisted Issue Collector

## Current state
- Current phase: `PHASE-12`
- Last completed phase: `PHASE-11`
- Next phase: `PHASE-12`
- Overall status: `IN_PROGRESS`

## Phase status

| Phase | Name | Status |
|---|---|---|
| PHASE-00 | Repository Audit | COMPLETED |
| PHASE-01 | Requirements Matrix | COMPLETED |
| PHASE-02 | Domain Contracts | COMPLETED |
| PHASE-03 | Functional Integration | COMPLETED |
| PHASE-04 | Board Triage | COMPLETED |
| PHASE-05 | Summary Email Requests | COMPLETED |
| PHASE-06 | Stakeholder Flow | COMPLETED |
| PHASE-07 | n8n Contracts | COMPLETED |
| PHASE-08 | Security & Validation | COMPLETED |
| PHASE-09 | Desktop Styling | COMPLETED |
| PHASE-10 | Mobile Styling | COMPLETED |
| PHASE-11 | Regression | COMPLETED |
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

## Current phase resume point
- PHASE-01 requirements completed from current repository + verified Figma/tutorial evidence.
- PHASE-02 domain contracts completed in `docs/issue-collector/CONTRACTS.md`.
- PHASE-03 functional entry/stakeholder/counter/mail boundaries completed and validated.
- PHASE-04 Board Triage completed and validated.
- PHASE-05 Summary Email Requests completed and validated.
- PHASE-06 Stakeholder Flow completed and validated.
- PHASE-07 n8n contracts completed and validated.
- PHASE-08 Security & Validation completed and validated.
- PHASE-09 Desktop Styling completed and validated against the supplied Figma/tutorial desktop captures.
- PHASE-10 mobile implementation completed; direct Figma MCP comparison remained unavailable and is transparently carried to PHASE-12.
- PHASE-11 repository-side regression completed with no Issue Collector-caused repair required.
- PHASE-12 Final Validation is now current.

## Carry-forward questions
- Actual provider/inbox, n8n host, AI provider/model and Firebase service authentication remain setup decisions.
- Stakeholder counter storage, timezone/reset and race-safe quota ownership remain n8n/Firebase decisions.
- Public recipient address is intentionally not configured yet.
- Desktop Figma alignment is completed in PHASE-09; the unavailable direct mobile Figma MCP two-pass comparison remains a PHASE-12 residual acceptance item.

## Changed files
Completed PHASE-00:
- docs/issue-collector/execution/phase-00-audit.md
- docs/issue-collector/execution/MASTER.md

Current PHASE-01 run:
- docs/issue-collector/execution/phase-01-requirements.md
- docs/issue-collector/execution/MASTER.md


### 2026-09-08 continuation
- PHASE-01 requirements gate passed using tutorial screenshots/user walkthrough and verified Figma metadata.
- PHASE-02 domain contracts completed.
- Current phase advanced to PHASE-03.

### 2026-09-08 PHASE-03 completion
- Added role selection and stakeholder functional flow.
- Added provider-neutral counter/mail configuration boundaries.
- No existing Auth/Signup/Guest/manual-task business logic changed.
- PHASE-04 is now current.


### 2026-09-08 PHASE-04 completion
- Added canonical `triage` status and first Board column.
- Reused the existing Board/card/move pipeline.
- Fixed cache preservation for Issue Collector metadata.
- Added persistent AI-generated marker and external creator/email detail rendering.
- Functional Board fixture and JavaScript syntax validation passed.
- PHASE-05 is now current.


### 2026-09-08 PHASE-05 completion
- Added `Email requests` Summary metric from canonical Issue Collector task metadata.
- Added the Summary card with blue numeric state and Board navigation.
- Kept final pixel-level Figma styling deferred to PHASE-09/10.
- PHASE-06 is now current.


### 2026-09-08 PHASE-06 completion
- Revalidated Welcome role selection and preserved the existing member-login path.
- Added explicit available, reached and unavailable stakeholder counter states through the shared adapter.
- Kept the public mail CTA provider-neutral and disabled until a valid recipient is configured.
- Reused existing public legal destinations.
- Functional stakeholder fixtures and JavaScript syntax validation passed.
- PHASE-07 is now current.


### 2026-09-08 PHASE-07 completion
- Revalidated PHASE-06 stakeholder state handling before starting.
- Added provider-neutral n8n contracts for mail normalization, duplicate protection, quota handling, AI output, Join mapping, Firebase results, manual review, errors and recovery.
- Added one safe JSON fixture bundle for n8n/project-side testing.
- No provider credentials, secrets or runtime browser implementation were added.
- PHASE-08 is now current.


### 2026-09-08 PHASE-08 completion
- Revalidated PHASE-07 n8n contracts before changes.
- Hardened the shared board template boundary against stored HTML injection from email/AI-derived task content.
- Allowlisted category CSS classes and validated external creator email actions.
- Bounded/normalized external creator and source message metadata.
- Added explicit n8n security/validation gates for prompt injection, auto-reply loops, duplicate handling, quota races and recovery.
- No provider credentials or final n8n implementation added.
- PHASE-09 Desktop Styling is now current and requires direct Figma comparison.


### 2026-09-08 PHASE-09 completion
- Revalidated PHASE-08 escaping/security boundary before styling.
- Attempted direct Figma MCP screenshot inspection; the connected Starter plan had reached its MCP call limit.
- Used the exact user-supplied Figma/tutorial desktop captures and previously verified node metadata as the visual reference.
- Added one desktop-only Issue Collector stylesheet rather than refactoring unrelated legacy CSS.
- Aligned Welcome, Stakeholder normal/reached states, Summary Email Requests, five-column Board/Triage and AI task-detail provenance.
- Performed two desktop comparison passes and kept mobile-specific work deferred to PHASE-10.
- PHASE-10 Mobile Styling is now current.


### 2026-09-08 PHASE-10 implementation / visual gate blocked
- Revalidated PHASE-09 desktop-only media scoping before changes.
- Added one dedicated mobile Issue Collector stylesheet and linked it only to Welcome, Stakeholder, Summary and Board.
- Added dedicated mobile layouts for role selection, stakeholder states, Email Requests metric, Triage/AI metadata and external creator detail.
- Preserved existing Join mobile navigation/Board responsive architecture.
- Direct Figma screenshot validation for mobile node `350522:9621` was blocked by the Figma MCP Starter-plan tool-call limit.
- PHASE-10 remains current and BLOCKED until the mandatory two visual comparison passes can be performed.


### 2026-09-08 PHASE-10 continuation / PHASE-11 completion
- Retried direct Figma MCP access for mobile node `350522:9621`; Starter-plan tool-call limit remains active.
- Operator instructed continuation; no unavailable Figma validation was fabricated.
- PHASE-10 implementation is considered complete for sequencing, with the direct mobile visual comparison carried to PHASE-12.
- Revalidated legacy fingerprints from PHASE-00: auth, user-context, manual task editor, taskboard edit/move logic and legacy responsive baseline remain byte-identical.
- All JavaScript syntax checks passed.
- Local HTML references, duplicate-ID checks, CSS structure and Issue Collector secret scan passed.
- No repository-side regression requiring source changes was found.
- PHASE-12 Final Validation is now current.
