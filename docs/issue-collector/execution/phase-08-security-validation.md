# PHASE-08 – Security & Validation

## Status
PENDING

## Goal
Harden the new feature boundary.

## Validate
- unsafe HTML
- email sender values
- AI output
- enum values
- due dates
- missing fields
- message ID
- duplicate behavior
- request-limit behavior
- retry behavior
- legacy innerHTML exposure

## Account for
- prompt injection in email bodies
- auto-reply loops
- reply-chain duplication
- sender spoofing
- concurrent request-limit race
- silent workflow failures

## Completion gate
Unsafe or invalid external input cannot directly become an unvalidated Join task.
