# PHASE-07 – n8n Contracts

## Status
COMPLETED

## Goal
Prepare the repository side for the n8n workflow without inventing provider credentials.

## Predecessor validation
PHASE-06 was revalidated before this phase:
- `scripts/issue-collector/stakeholder.js` parses successfully,
- available/reached/unavailable stakeholder state elements still exist,
- provider-neutral public mail behavior remains unchanged.

No PHASE-06 repair was required.

## Delivered

Created:

```text
docs/issue-collector/N8N-CONTRACTS.md
docs/issue-collector/fixtures/n8n-contract-examples.json
```

The contract document defines:
- provider mail normalization boundary,
- normalized mail contract,
- duplicate key semantics,
- stakeholder identity,
- daily quota read/commit contracts,
- structured AI output,
- validated Join task payload,
- Firebase create result,
- processed-message marker,
- manual-review payload,
- processing result,
- error payload,
- exact field mapping into existing `/tasks/{taskId}`,
- retry/recovery semantics,
- frontend counter boundary,
- security requirements.

## Verified repository facts used
- existing manual tasks are written beneath Firebase `/tasks`,
- current Join task fields remain unchanged,
- `triage` is the only new task status,
- AI email metadata remains additive,
- browser counter storage remains intentionally provider-neutral.

## Intentionally unresolved deployment values
- mail provider/inbox,
- n8n hosting,
- AI provider/model,
- Firebase service authentication,
- quota storage/timezone/atomic mechanism,
- manual-review destination,
- error notifications,
- final deadline policy,
- public counter source.

No placeholder secret or invented provider credential was added.

## Validation
- JSON fixture parses successfully.
- All example enums match current Join domain values.
- Join task fixture uses `status: "triage"`.
- Join task fixture includes persistent AI/email provenance metadata.
- n8n documentation contains no credential values.
- No browser/runtime application file changed in PHASE-07.

## Completion gate
Passed: n8n can now be configured independently against explicit provider-neutral contracts.

## Changed files
- `docs/issue-collector/N8N-CONTRACTS.md`
- `docs/issue-collector/fixtures/n8n-contract-examples.json`
- `docs/issue-collector/execution/phase-07-n8n-contracts.md`
- `docs/issue-collector/execution/MASTER.md`
