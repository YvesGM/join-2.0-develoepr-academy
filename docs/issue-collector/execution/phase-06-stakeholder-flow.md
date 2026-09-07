# PHASE-06 – Stakeholder Flow

## Status
PENDING

## Goal
Finish stakeholder behavior before visual polish.

## Implement
- Welcome role-selection behavior
- Stakeholder Welcome page
- back navigation
- request counter state
- normal state
- limit-reached state
- email CTA
- Privacy Policy link
- Legal Notice link

## Figma
https://www.figma.com/design/k5eJt25u0iRylf0McQcVne/Join-Version-1-KI-gest%C3%BCtzte-Automatisierung?node-id=0-1&p=f

Relevant nodes:
- Welcome `350504:9300`
- Stakeholder `350504:9311`
- Limit reached `350504:9548`
- Email mask `350504:9168`

## Rule
Do not build a custom mail client unless a requirement explicitly asks for one.

## Completion gate
All stakeholder states are functionally reachable and driven by adapter state rather than hardcoded one-off DOM variants.
