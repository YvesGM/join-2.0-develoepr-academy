# PHASE-04 – Board Triage

## Status
COMPLETED

## Goal
Extend the existing board rather than build a second board implementation.

## Implemented
- Added `triage` as the first canonical board status.
- Added the Triage column before To do in the existing board markup.
- Reused the existing card renderer and move/drop flow; no second board/card implementation.
- Board cache now preserves Issue Collector metadata and no longer coerces `triage` to `todo`.
- Search and cached/fresh column builders now use the canonical status list.
- AI-generated tasks display a persistent `AI-generated ticket` badge on cards and detail views.
- External email creator is rendered separately from internal assignees.
- External creator gets a validated `mailto:` action when an email address is present.
- Moving/editing a task only updates existing mutable fields/status, so provenance metadata remains intact.
- Added only minimal functional CSS; final Figma styling remains PHASE-09/10.

## Required board order
`Triage → To do → In progress → Await feedback → Done`

## Predecessor validation
PHASE-03 was revalidated before Board changes:
- all five Issue Collector scripts pass `node --check`,
- stakeholder/welcome integration files remain present,
- no provider recipient or secret was introduced,
- PHASE-03 remains functionally intact.

## Validation
- `node --check` passed for all changed Board JavaScript files.
- Board integration fixture verified:
  - canonical status order starts with `triage`,
  - cached AI metadata survives normalization,
  - Triage remains Triage after cache normalization,
  - AI marker renders on the card,
  - external creator and mail action render in task detail,
  - external creator display name is escaped,
  - Move-to from Triage offers To do and does not offer the current status.
- Changed project-owned files remain below 400 lines.
- New/changed helper functions added in this phase are bounded and single-purpose.
- Existing manual task creation default remains `todo`.
- Existing Contacts/Auth/Signup/Guest logic was not changed.

## Completion gate
PASSED.

Fixture AI task can be rendered in Triage, moved through canonical board statuses, and keeps additive Issue Collector metadata.

## Changed files
- sites/taskboard.html
- scripts/taskboard_core.js
- scripts/taskboard_render.js
- scripts/taskboardTemplate.js
- styles/taskboard_base.css
- docs/issue-collector/execution/phase-04-board-triage.md
- docs/issue-collector/execution/MASTER.md
