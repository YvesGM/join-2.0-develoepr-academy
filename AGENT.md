# AGENT.md

## Project
Join – AI-assisted Issue Collector

## Authoritative source
The repository state currently present in the workspace is the only authoritative code source.

Do not infer file contents, database fields, functions, CSS classes, routes, Firebase paths, or runtime behavior from prior runs or assumptions.

Before modifying any existing file:
1. read that file,
2. read only its direct dependencies needed for the task,
3. verify the relevant current behavior,
4. then change the minimum required surface.

## Primary goal
Extend the existing Join group project with the new AI-assisted Issue Collector without refactoring unrelated legacy code.

The new feature includes:
- stakeholder entry flow,
- stakeholder request page,
- daily request limit UI,
- email-driven n8n automation contract,
- AI-generated task metadata,
- new `Triage` board column,
- external creator representation,
- persistent `AI-generated ticket` marker,
- email action on external creator,
- new Summary tile `Email requests`.

## Existing project is legacy
Do not modernize or clean up unrelated group-project code.

Only change old code when technically required by the new feature.

### Do not touch unless required
- contacts business logic,
- existing team-member authentication flow,
- signup flow,
- guest flow,
- manual task creation behavior,
- unrelated CSS,
- historical database exports,
- generated JSDoc output,
- unrelated legacy bugs.

## Architecture constraints for new/changed code
- max 400 lines per new or modified project-owned file,
- max 14 lines per named function,
- single responsibility per function,
- meaningful JSDoc for non-trivial functions and all n8n Code/Function logic,
- no duplicated implementation,
- no parallel task model,
- no quick-fix files,
- no dead code,
- no unnecessary globals,
- reuse existing domain values and rendering paths where possible.

Existing untouched legacy files do not need to be retrofitted to these rules.

## Execution protocol
Every run MUST begin by reading:

`docs/issue-collector/execution/MASTER.md`

Then:
1. determine the current phase,
2. validate the previous completed phase,
3. read the current phase file,
4. read only relevant source files and direct dependencies,
5. execute only the current phase,
6. validate the result,
7. update the phase report,
8. update `MASTER.md`.

Never repeat a phase marked `COMPLETED` unless validation proves it is broken.

If a phase is `IN_PROGRESS`, continue it from its documented state.

Do not rescan the whole repository after Phase 00 unless a contradiction requires a targeted follow-up.

## Phase ordering
Logic before styling.

Do not start visual polish until functional integration is stable.

Phase order is defined in `MASTER.md`.

## Figma
Figma is the visual source of truth for all new or changed UI.

Main design:
https://www.figma.com/design/k5eJt25u0iRylf0McQcVne/Join-Version-1-KI-gest%C3%BCtzte-Automatisierung?node-id=0-1&p=f

Additional design link:
https://www.figma.com/design/k5eJt25u0iRylf0McQcVne/Join-Version-1-KI-gest%C3%BCtzte-Automatisierung?node-id=45-2487&p=f

Known relevant nodes:
- Welcome / Role Selection: `350504:9300`
- Stakeholder: `350504:9311`
- Stakeholder limit reached: `350504:9548`
- Email mask: `350504:9168`
- Summary user: `45:2195`

For design phases:
1. inspect the exact relevant Figma frame,
2. extract dimensions, spacing, typography, colors, states, assets,
3. inspect existing project CSS before changing it,
4. implement,
5. compare the local result at the target viewport,
6. correct mismatches,
7. compare a second time,
8. only then mark the phase complete.

Target validation sizes:
- desktop: `1440 × 1024`
- mobile: `428 × 926`

Do not guess Figma values when they are directly inspectable.

## n8n boundary
n8n is the orchestration layer.

Do not implement AI or mail credentials in browser JavaScript.

The project-side code may prepare:
- payload contracts,
- Firebase mapping,
- stakeholder UI,
- request counter adapter,
- Triage rendering,
- AI-generated metadata rendering,
- test fixtures,
- integration documentation.

The actual n8n workflow and secrets are configured separately.

## Security
Never commit:
- AI API keys,
- mail credentials,
- n8n credentials,
- Firebase admin/service credentials,
- service tokens.

Treat all email and AI output as untrusted input.

Validate and sanitize before Firebase writes.

Prevent:
- duplicate task creation,
- email auto-reply loops,
- prompt injection from email bodies,
- unsafe HTML reaching legacy `innerHTML` rendering.

## New task behavior
AI-generated email tasks:
- enter in `Triage`,
- use existing Join categories and priorities,
- show external creator rather than internal profile,
- provide an email action,
- display `AI-generated ticket`,
- keep that marker after moving to any later board status.

Do not create a separate task renderer if the existing renderer can be minimally extended.

## Summary
Add `Email requests` as a new metric based on the real collector data contract.

Its click behavior must follow the requirements/Figma and must not break existing Summary cards.

## Required discipline
If a needed technical fact is not verifiable:
- document it as an open question,
- do not invent it,
- continue only with work that does not depend on the unknown fact.

If a current phase depends on unresolved information, stop that phase cleanly and update `MASTER.md`.

## Completion
A phase is complete only when:
- required implementation is done,
- validation passed,
- no new regression is known,
- phase report is updated,
- `MASTER.md` is updated,
- changed files are listed.
