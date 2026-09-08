# PHASE-08 – Security & Validation

## Status
COMPLETED

## Goal
Harden the new feature boundary without implementing provider-specific n8n infrastructure.

## Predecessor validation
PHASE-07 contracts were revalidated before this phase:
- normalized mail contract present,
- duplicate check precedes AI/quota consumption,
- quota commit semantics documented,
- structured AI output constrained,
- validated Join task payload targets existing `/tasks/{taskId}`,
- recovery/manual-review/error contracts present.

No PHASE-07 repair was required.

## Runtime hardening

Updated the existing shared board template renderer rather than creating a parallel renderer.

Dynamic text is now escaped before insertion into `innerHTML` templates:
- task title,
- task description,
- category label,
- subtask title,
- contact display name/initials,
- external creator,
- edit-form title/description/date.

Category CSS class generation is now allowlisted to the two existing Join category classes.

External creator email links use the Issue Collector domain validator.

## Domain hardening

External creator metadata now:
- removes control characters,
- bounds creator name length,
- normalizes sender email,
- rejects unsupported email formats,
- bounds source message IDs.

No synthetic Join profile is created.

## n8n security contract

Added `docs/issue-collector/SECURITY-VALIDATION.md` covering:
- trust boundaries,
- mail validation,
- AI structured-output validation,
- prompt injection,
- auto-reply loops,
- reply chains,
- duplicate behavior,
- race-safe quota enforcement,
- retry/recovery semantics,
- logging,
- pre-deployment security gates.

## Validation

- `scripts/issue-collector/domain.js`: syntax PASS
- `scripts/taskboardTemplate.js`: syntax PASS
- modified/new files remain below 400 lines
- category class is no longer derived from arbitrary external text
- raw title/description/subtask text is no longer interpolated unescaped
- invalid external email does not render a mail action
- no credential/provider value was introduced

## Deferred to real n8n setup

Still intentionally unresolved:
- provider auto-mail headers available in the selected inbox,
- exact atomic quota mechanism,
- manual-review destination,
- error notification destination,
- AI provider/model,
- Firebase service authentication.

## Changed files

- `scripts/issue-collector/domain.js`
- `scripts/taskboardTemplate.js`
- `docs/issue-collector/SECURITY-VALIDATION.md`
- `docs/issue-collector/execution/phase-08-security-validation.md`
- `docs/issue-collector/execution/MASTER.md`

## Completion gate

Passed for repository-side PHASE-08: unsafe external strings are escaped at the relevant legacy template boundary, collector metadata is normalized, and n8n security requirements are explicitly documented.

Real provider/n8n security must still pass the pre-deployment gates during integration setup.
