# PHASE-06 – Stakeholder Flow

## Status
COMPLETED

## Goal
Finish stakeholder behavior before visual polish.

## Implemented
- Revalidated the existing Welcome role-selection behavior from PHASE-03.
- Preserved the existing member login/guest flow and stakeholder navigation.
- Kept the stakeholder back navigation returning to the public role selection.
- Connected the page exclusively through the shared request-counter adapter.
- Added explicit functional states for:
  - quota available,
  - quota reached,
  - authoritative counter unavailable.
- Kept the reached-state CTA wording as `Send an email`.
- Kept the normal/unavailable CTA wording as `Create Email Request`.
- Kept the public email destination provider-neutral through `public-config.js`.
- Kept the CTA disabled while no valid public recipient address is configured.
- Reused the existing public Privacy Policy and Legal Notice pages.
- Did not build a custom mail client or introduce provider-specific orchestration.

## Changed files
- `scripts/issue-collector/stakeholder.js`
- `sites/stakeholder.html`
- `docs/issue-collector/execution/phase-06-stakeholder-flow.md`
- `docs/issue-collector/execution/MASTER.md`

## Validation
- PHASE-05 gate passed before modifications:
  - Summary script syntax passed,
  - `Email requests` element remains present,
  - metric still uses canonical `sourceType === "email"` metadata.
- `node --check scripts/issue-collector/stakeholder.js` passed.
- Isolated stakeholder fixture passed for all three adapter states:
  - `3/10` => normal state + enabled configured mail action,
  - `10/10` => limit state + `Send an email`,
  - unavailable => explicit unavailable state + no fake zero.
- Configured email fixture opened `mailto:requests@example.com`.
- Missing recipient keeps the CTA disabled rather than inventing an address.
- Welcome fixture confirmed:
  - member branch reveals the unchanged login form,
  - stakeholder branch opens `sites/stakeholder.html`.
- Back, Privacy Policy and Legal Notice targets are present on the stakeholder page.
- Modified Issue Collector files remain below 400 lines and modified named functions remain <=14 lines.

## Styling note
Final Figma dimensions, assets, spacing, typography and responsive pixel matching remain intentionally deferred to PHASE-09/10.

## Completion gate
PASSED. All stakeholder functional states are reachable through the adapter contract, with provider-specific counter storage and recipient setup still deferred to n8n integration.
