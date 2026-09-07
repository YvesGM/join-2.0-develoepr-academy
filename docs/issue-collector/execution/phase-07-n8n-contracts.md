# PHASE-07 – n8n Contracts

## Status
PENDING

## Goal
Prepare the repository side for the n8n workflow. Do not invent provider credentials.

## Document exact contracts for
- incoming mail
- normalized mail
- duplicate check key
- request-limit read/write
- AI structured output
- validated Join task payload
- Firebase write result
- manual-review payload
- processing log
- error payload

## Provide
- safe example payloads
- local fixtures if useful
- setup documentation
- field mapping table

## Do not
- commit secrets
- implement AI in browser code
- assume provider/model/host not yet decided

## Completion gate
n8n can be configured independently using the documented interfaces.
