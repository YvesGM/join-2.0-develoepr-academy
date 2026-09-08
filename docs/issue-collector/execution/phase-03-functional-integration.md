# PHASE-03 – Functional Integration

## Status
COMPLETED

## Goal
Build functional integration without final styling.

## Implement
- role-selection routing
- stakeholder route/page entry
- member-login route to existing login
- counter adapter boundary
- email CTA boundary
- handling of new task metadata in existing task flow
- minimal constants/helpers required by later phases

## Preserve
Existing login, signup, guest, manual Add Task, contacts and board behavior.

## Styling
Only minimal layout required for functional testing.
No pixel-polish.

## Completion gate
New flows are navigable and metadata can travel through existing application code without breaking legacy behavior.


## Phase report — 2026-09-08

### Predecessor validation
PHASE-02 contract file exists and uses only audited Join enums plus the single required
new `triage` status. Provider-specific n8n values remain explicit open setup parameters.

### Implemented
- Added public role-selection UI on the existing entry page without replacing login logic.
- `Create request` opens a dedicated public Stakeholder page.
- `Member log in` reveals the existing member/guest login form in place.
- Added provider-neutral request-counter adapter with explicit unavailable state.
- Added public email-recipient configuration boundary; no recipient/credential invented.
- Stakeholder CTA uses a validated `mailto:` boundary once a public recipient is configured.
- Added shared Issue Collector domain helpers for additive email-task metadata.
- Added only functional/scoped CSS; pixel styling remains deferred to PHASE-09/10.

### Metadata flow assessment
Fresh Board normalization already spreads additive task fields and therefore preserves
Issue Collector metadata from Firebase. The audited localStorage cache still strips these
fields and does not recognize `triage`; that exact integration is intentionally assigned
to PHASE-04 together with the new Board column so it is fixed once, in the canonical Board path.

### Validation
- All five new Issue Collector JavaScript files pass `node --check`.
- New Stakeholder local references resolve.
- Existing Firebase config references remain absent from the submitted ZIP exactly as before;
  no new missing runtime reference was introduced by this phase.
- New/changed runtime files remain below 400 lines.
- New named functions are <=14 lines and have bounded responsibilities.
- No AI/mail/admin credentials were added.
- Existing login JavaScript and manual task creation code were not modified.

### Known setup dependency
`issueCollectorPublicConfig.requestEmail` is intentionally empty until the real inbox is
selected during n8n setup. The CTA remains disabled rather than sending to an invented address.

### Completion gate
PASSED for functional integration boundaries. PHASE-04 owns Triage/cache/card/detail integration.

### Changed files
- index.html
- sites/stakeholder.html
- scripts/issue-collector/domain.js
- scripts/issue-collector/public-config.js
- scripts/issue-collector/request-counter.js
- scripts/issue-collector/stakeholder.js
- scripts/issue-collector/welcome.js
- styles/issue-collector.css
- docs/issue-collector/execution/phase-03-functional-integration.md
- docs/issue-collector/execution/MASTER.md
