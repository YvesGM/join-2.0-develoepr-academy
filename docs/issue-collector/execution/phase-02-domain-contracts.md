# PHASE-02 – Domain Contracts

## Status
COMPLETED

## Goal
Define the smallest additive contracts needed by the new feature.

## Determine from current code
- exact current task shape
- exact status representation
- exact category values
- exact priority values

## Define
- Triage status
- AI-generated marker
- source type
- external creator metadata
- source email/message metadata
- request counter interface
- n8n mail input
- AI structured output
- task mapping
- manual-review payload
- error payload

## Rules
Do not replace the existing task model.
Do not add fields that are not needed.
Do not let AI choose deterministic system fields.

## Completion gate
All later frontend and n8n work can target documented stable contracts.


## Phase report — 2026-09-08

### Predecessor validation
PHASE-01 requirements are now complete using the repository audit, direct Figma metadata
already obtained in the active conversation, tutorial screenshots and the user walkthrough.
No runtime file changed during PHASE-01.

### Decisions completed
- Added only one new task status: `triage`.
- Kept current category and priority enums unchanged.
- Defined minimal additive provenance fields: `sourceType`, `aiGenerated`,
  `externalCreator`, `sourceMessageId`.
- Defined normalized mail, AI output and Join task mapping contracts.
- External creator identity comes from mail metadata, not AI.
- AI-generated provenance is independent from board status and must persist.
- Defined Summary `Email requests` as current AI-generated email tasks, separate from quota.
- Defined a provider-neutral stakeholder counter adapter with explicit unknown state.
- Defined manual-review and processing-result payloads.
- Left provider, storage, timezone, Firebase service auth and retry infrastructure configurable.

### Validation
- Contract uses the audited existing task fields and enums.
- No second task schema or Firebase path was introduced.
- No provider secret or credential was introduced.
- No runtime file changed in this phase.
- `docs/issue-collector/CONTRACTS.md` is the canonical contract reference.

### Completion gate
PASSED. Functional integration can target the documented contracts without inventing
provider-specific infrastructure.

### Changed files
- docs/issue-collector/CONTRACTS.md
- docs/issue-collector/execution/phase-02-domain-contracts.md
- docs/issue-collector/execution/MASTER.md
