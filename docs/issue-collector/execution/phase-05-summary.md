# PHASE-05 – Summary Email Requests

## Status
COMPLETED

## Goal
Add the new `Email requests` metric to the existing Summary without redesigning unrelated Summary behavior.

## Implemented
- Added a current-task metric that counts only tasks with:
  - `sourceType === "email"`
  - `aiGenerated === true`
- Metric is independent of board status, so moving an email task out of Triage keeps it counted.
- Added the `Email requests` Summary card.
- Added the Figma-required blue numeric state for the email request number.
- Clicking the card opens the existing Board page.
- Kept all existing Summary calculations intact.
- Added isolated Issue Collector Summary CSS instead of modifying the oversized legacy `summary.css`.

## Changed files
- `scripts/summary.js`
- `sites/summary.html`
- `styles/issue-collector-summary.css`
- `docs/issue-collector/execution/phase-05-summary.md`
- `docs/issue-collector/execution/MASTER.md`

## Validation
- PHASE-04 gate rechecked: canonical `triage` status remains in `BOARD_STATUSES` and board cache metadata is still delegated through `issueCollectorDomain.getIssueCollectorTaskMetadata()`.
- `node --check scripts/summary.js` passed.
- Fixture verified 2 email-generated tasks remain counted across `triage` and `todo` while manual tasks are excluded.
- Existing Summary totals/status/priority counters remained correct in the same fixture.
- `Email requests` element, Board navigation and isolated stylesheet link are present.
- New/modified Issue Collector files remain below 400 lines; newly modified named Summary functions are <=14 lines.

## Styling note
Final desktop/mobile dimensions and pixel-level placement remain intentionally deferred to PHASE-09/10. PHASE-05 adds only the structural layout and required blue number state.

## Completion gate
PASSED.
