# PHASE-04 – Board Triage

## Status
PENDING

## Goal
Extend the existing board rather than build a second board implementation.

## Implement
- Triage as first board column
- AI email tasks start in Triage
- existing move/drag behavior supports Triage
- existing card renderer displays AI-generated state
- task detail displays AI-generated state
- external creator display
- creator email action
- AI marker persists after moving task out of Triage

## Required board order
Triage → To do → In progress → Await feedback → Done

## Important
Normal tasks must remain visually and functionally unchanged except for layout changes strictly required by the extra column.

## Completion gate
Fixture AI task can be created/rendered in Triage, moved through board statuses, and keeps all AI/external metadata.
