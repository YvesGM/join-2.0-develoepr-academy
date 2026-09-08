# PHASE-01 – Requirements Matrix

## Status
COMPLETED

## Goal
Map Academy requirements, tutorial decisions, Figma, and current code.

## Sources
- current repository
- project planning document
- Figma:
  - https://www.figma.com/design/k5eJt25u0iRylf0McQcVne/Join-Version-1-KI-gest%C3%BCtzte-Automatisierung?node-id=0-1&p=f
  - https://www.figma.com/design/k5eJt25u0iRylf0McQcVne/Join-Version-1-KI-gest%C3%BCtzte-Automatisierung?node-id=45-2487&p=f

## Required matrix columns
- ID
- Requirement
- Source
- Existing behavior
- Required behavior
- Target file(s)
- Dependencies
- Risk
- Open question
- Acceptance test

## Must include
- role-selection welcome
- stakeholder view
- 10/day limit UI
- email CTA
- Summary `Email requests`
- Triage board column
- AI-generated label
- external creator
- email action
- persistent AI marker
- n8n mail ingestion contract
- AI extraction
- validation/error handling
- manual review
- duplicate protection
- security
- desktop/mobile Figma

## Completion gate
No implementation-critical requirement remains unmapped.

## Phase report — 2026-09-07

### Predecessor validation
PHASE-00 revalidated before starting: all 24 recorded source SHA-256 values match.
All ten isolated Node vm/assert behavior checks passed again: status order, unknown
cached status, cache metadata loss, live metadata retention, missing Triage column,
empty assignments, legacy assignment fallback, subtasks, Summary alias and HTML sink.
No predecessor repair or full repository rescan was necessary.

### Scope and evidence status
This phase maps requirements only. No implementation or domain contract is finalized.
The existing task/Board/Summary paths were checked against their current source.
All acceptance tests below are FUTURE acceptance criteria, not completed feature tests.
Only the predecessor checks and document consistency checks have been executed.

Source keys used in the matrix:

| Key | Source | Evidence |
|---|---|---|
| U | User's phase-execution instructions in this conversation | Authoritative constraints |
| A | [AGENT.md](../../../AGENT.md) | Read in this run |
| M | [MASTER.md](MASTER.md) | Read in this run |
| ARC | [ARCHITECTURE.md](../ARCHITECTURE.md) | Read in this run |
| P01 | This phase's original instructions above | Read in this run; explicitly require 10/day |
| P02 | [Domain Contracts](phase-02-domain-contracts.md) | Scope read; phase not started |
| P03 | [Functional Integration](phase-03-functional-integration.md) | Scope read; phase not started |
| P04 | [Board Triage](phase-04-board-triage.md) | Scope read; phase not started |
| P05 | [Summary](phase-05-summary.md) | Scope read; Board navigation explicit |
| P06 | [Stakeholder Flow](phase-06-stakeholder-flow.md) | Scope read; phase not started |
| P07 | [n8n Contracts](phase-07-n8n-contracts.md) | Scope read; phase not started |
| P08 | [Security](phase-08-security-validation.md) | Scope read; phase not started |
| P09 | [Desktop Styling](phase-09-styling-desktop.md) | Scope read; phase not started |
| P10 | [Mobile Styling](phase-10-styling-mobile.md) | Scope read; phase not started |
| P11 | [Regression](phase-11-regression.md) | Scope read; phase not started |
| P12 | [Final Validation](phase-12-final-validation.md) | Scope read; phase not started |
| AUD | [Repository Audit](phase-00-audit.md) | Revalidated against current source |
| F | Supplied Figma file plus tutorial screenshots/user walkthrough | Verified for the implementation-critical states listed below |
| EXT | Tutorial screenshots and user walkthrough supplied in the active conversation | Reviewed for stakeholder, quota, Summary, Triage and AI-ticket behavior |

F in a Source cell now refers to verified Figma/tutorial design evidence from the active
conversation. Exact pixel measurements remain intentionally deferred to PHASE-09/10.

### Figma access and frame register
File key: k5eJt25u0iRylf0McQcVne.
The active conversation supplied direct Figma metadata for page `0:1`, including the
implementation-critical Stakeholder, limit, Summary and Email-mask frames, plus tutorial
screenshots showing the intended runtime states. Exact pixel styling remains intentionally
deferred to PHASE-09/10, where direct frame inspection and two visual comparison rounds
are mandatory.

| Frame reference | Node | Verified requirement evidence |
|---|---|---|
| Main design page | `0:1` | Desktop/mobile Join design tree contains existing Join plus new stakeholder flow |
| Welcome / role selection | `350504:9300` | Stakeholder `Create request` and team-member login branches |
| Stakeholder | `350504:9311` | `0 of 10 requests used today`, email-based request explanation and CTA |
| Limit reached | `350504:9548` | `10 of 10`, warning state, email still allowed, manual team review instead of AI |
| Email mask | `350504:9168` | External mail-client/reference flow; project must not build an internal mail app |
| Summary user | `45:2195` | New `Email requests` metric card with distinct number emphasis |
| Board/Triage | Tutorial screenshot + Figma page tree | New first column `Triage`; generated cards reuse normal board card design |
| AI task detail | Tutorial screenshots | External creator, email action and persistent `AI-generated ticket` marker |
| Mobile | page `0:1` dedicated mobile frames | Stakeholder/limit states exist at 428×926 target; exact pixel work deferred to PHASE-10 |

Verified tutorial behavior from the user walkthrough:
- Welcome chooser is shown on entry.
- Stakeholder `Create request` opens the stakeholder welcome/request view.
- Email CTA opens the user's mailbox/mail client.
- Sending a mail triggers n8n.
- Maximum 10 automated stakeholder requests per day.
- Under the limit, n8n sends normalized mail content to an AI agent.
- AI extracts title, task label/category, external creator, priority and deadline.
- Generated tasks start in `Triage`.
- Summary receives `Email requests`; clicking it opens the normal board.
- External mail creator is displayed as external, with an email action.
- `AI-generated ticket` stays visible even after the task leaves Triage.
- Existing Join is extended, not generally refactored.

### Target legend
Paths below are relative to repository root. Existing paths are verified; proposed
paths are planning targets only and do not claim files, routes or functions exist.
Final new filenames/routing are to be settled in the responsible implementation phase.

| Target | Files / responsibility |
|---|---|
| FLOW | Proposed sites/welcome.html, sites/stakeholder.html and scripts/issue-collector/stakeholder.js; existing index.html as member-login destination |
| COUNTER | Proposed scripts/issue-collector/request-counter.js; shared read adapter for Stakeholder and Summary, storage path not selected |
| CONTRACT | Proposed docs/issue-collector/CONTRACTS.md; smallest additive domain interfaces, PHASE-02 |
| N8N | Proposed docs/issue-collector/N8N.md and safe fixtures under docs/issue-collector/fixtures/; workflow/secrets configured separately |
| BHTML | sites/taskboard.html |
| BCORE | scripts/taskboard_core.js: BOARD_STATUSES, normalizeCachedBoardTask, buildColumnsFromCachedTasks |
| BRENDER | scripts/taskboard_render.js: normalizeTask, buildColumnsFromTasks, filterTasks, renderTaskDetail |
| BTEMPLATE | scripts/taskboardTemplate.js: getCardTemplate, getTaskDetailTemplate, getEditTaskTemplate, renderMoveToItems |
| BEDIT | scripts/taskboard_edit.js: saveTaskEdit, onDrop, moveTaskToStatus, updateSubtaskStatus |
| SUMMARY | sites/summary.html and scripts/summary.js: loadSummary, calculateTaskStats, renderSummary |
| STYLE | Existing styles/summary.css and taskboard_base/overlays/modal/modal_subtasks/responsive.css; proposed scoped styles/issue-collector.css |
| MANUAL | scripts/taskeditor.js, taskeditorSelections.js, taskeditorSubtasks.js, taskeditorButtons.js; sites/task-editor.html and BHTML; preserve existing behavior |
| LEGACY | index.html, scripts/login-auth.js, login.js, sign-up.js, auth-guard.js, user-context.js, contacts*.js and existing secondary pages; verification targets, not blanket edit scope |
| VALIDATION | Phase reports for P08–P12; future relevant fixtures/checks, no new test framework chosen |

STYLE denotes only the exact files needed for the eventual change, not authorization
to restyle all listed files. Check <=400-line constraints before editing legacy files.

### Requirements matrix
Risk H = data loss/security/critical behavior; M = integration/UX; L = bounded documentation.
An open Q reference points to the decision register below. "None" means no additional
product decision is needed for that row; downstream engineering work is still required.

| ID | Requirement | Source | Existing behavior | Required behavior | Target file(s) | Dependencies | Risk | Open question | Acceptance test |
|---|---|---|---|---|---|---|---|---|---|
| IC-01 | Welcome role selection | U/A, P01/P03/P06, F | index.html immediately shows member/guest login | Offer member and stakeholder entry; preserve existing login destination and session semantics | FLOW, LEGACY (verify) | Q01/Q02; P03/P06 | H: redirects/session changes | Q02/Q11: exact entry URL, copy and navigation | Fresh session reaches both branches; member login and guest flow still reach Summary |
| IC-02 | Stakeholder view and back navigation | A, P03/P06, F | No stakeholder page in AUD | Separate stakeholder request view with return to role selection | FLOW | IC-01; P03/P06 | M: navigation trap | Q02/Q11: exact labels and route policy | Follow stakeholder branch, reload its URL and use Back without creating a team profile |
| IC-03 | Normal request state | P01/P06, F | No request state UI | Render normal stakeholder state from adapter data | FLOW, COUNTER | IC-05; P06 | M: hardcoded state | Q02/Q03: number meaning and normal-state copy | Contract fixtures for 0 and 9 of 10 produce the specified state using one rendering path |
| IC-04 | 10/day limit state | P01/P06, ARC, F | No daily limit | Show 10/day limit and reached state; authoritative enforcement remains outside browser | FLOW, COUNTER, CONTRACT, N8N | IC-05/23; P02/P06/P07 | H: false quota guarantee | Q03: scope/reset/counting; Q02/Q04: CTA when reached | Fixtures at 9/10, 10/10 and overflow display contract-defined states; browser cannot grant processing capacity |
| IC-05 | Shared counter adapter | A, P02/P03/P05/P06, M | Summary reads tasks; no collector source | Define one counter read boundary consumed by stakeholder and metric UI | COUNTER, CONTRACT, FLOW, SUMMARY | Q03/Q05/Q06; P02/P03 | H: invented path or exposure | Q03/Q05/Q06: source and read access | Both consumers receive the same contract fixture; missing/stale/error data follows explicit policy, not fake zero |
| IC-06 | Email CTA and email mask interpretation | ARC, P03/P06, F | Login uses mail icon only; no collector CTA | Hand off stakeholder request to email client; no custom client absent explicit requirement | FLOW, CONTRACT | IC-01/04; P03/P06 | H: wrong destination or mail logic in browser | Q02/Q04: recipient, prefill, cap behavior, meaning of mask | CTA opens intended email action with encoded approved values; clicking does not count as processed mail or create a task |
| IC-07 | Public Privacy and Legal links | P06, current index.html | Login links to sites/logout-privacy.html and logout-legal.html | Stakeholder flow offers existing public legal destinations | FLOW; sites/logout-privacy.html, sites/logout-legal.html (reuse) | IC-02; P06 | M: accidental auth redirect | Q02: Figma placement | Open both links from fresh stakeholder session; content is reachable without member login |
| IC-08 | Additive task model | A/ARC, P02/P03/P07 | Manual task shape at tasks/{pushKey}; no source/creator metadata | Keep that task shape and path; add only required AI/source/external metadata | CONTRACT, N8N, BCORE, BRENDER | Q07/Q09; P02/P03 | H: second model/data loss | Q09: exact minimal names/types | Validated AI fixture follows normal task load/render/edit paths; legacy fixture without additions still works |
| IC-09 | Existing category/priority values | A, P02, current MANUAL | Slugs user-story/technical-task; urgent/medium/low; creation default medium | Constrain mapped AI tasks to existing domain values, without adopting historical normal/high | CONTRACT, N8N | IC-08/21; P02/P07/P08 | H: incompatible payload | Q07: ambiguous AI output policy | Reject invalid enums; both valid categories and all three priorities render via existing controls/assets |
| IC-10 | Deterministic system metadata | P02, A/ARC | Manual code sets status and createdAt; Firebase supplies ID | Orchestration/mapping owns IDs, source identity, marker, initial status and timestamps | CONTRACT, N8N | IC-08/21/22; P02/P07 | H: AI-controlled identity/routing | Q07/Q08/Q09: deadline and ID rules | AI instructions to alter system fields cannot change mapped source identity, initial status or idempotency key |
| IC-11 | Triage first column | A/M, P04, F | Four fixed statuses and matching DOM columns | Order Triage → To do → In progress → Await feedback → Done using existing Board | BHTML, BCORE, BRENDER, BTEMPLATE, STYLE | IC-08; P04 | H: invisible tasks | Q02: exact Triage visual/control state; Q09: stored new status value | Empty/populated fresh and cached boards show five columns in order; prior four behave as before |
| IC-12 | AI email tasks enter Triage | A/ARC, P04/P07 | Standalone creation todo; board creation selected column | Validated email ingestion sets Triage independently of AI choice | CONTRACT, N8N, BCORE, BRENDER | IC-08/10/11; P02/P04/P07 | H: wrong initial state | Q09: exact status token | An accepted fixture is visible in first column through normal loader; manual tasks retain existing initial status |
| IC-13 | Existing drag/move supports Triage | P04, current BEDIT | Status PATCH; mobile target validated against BOARD_STATUSES | Extend existing actions/menu, preserving all other task fields | BCORE, BTEMPLATE, BEDIT | IC-11; P04 | H: metadata loss | Q02: exact new column controls | Move AI fixture through all five statuses with drag and menu; inspect stored task and reload after each |
| IC-14 | Board search and cache include Triage | P03/P04/P11, current BCORE/BRENDER | Fixed column maps; unknown live status omitted; cached unknown status becomes todo | All existing Board paths recognize Triage and retain required additions | BCORE, BRENDER | IC-08/11; P03/P04 | H: transient wrong status | Q09: cache compatibility/version handling | Reload with cache then fresh data; search title/description/date at existing thresholds; no task shifts to todo |
| IC-15 | AI-generated label on card and detail | A, P04, F | No AI indicator in either existing template | Show exact text AI-generated ticket for mapped AI tasks in existing renderer | BTEMPLATE, BCORE, BRENDER, STYLE | IC-08/14; P04/P09/P10 | M: false/missing marker | Q02: placement/states; Q09: marker field | Same AI fixture shows label on card/detail; manual fixture does not acquire a label |
| IC-16 | Persistent AI marker | A/M/ARC, P03/P04 | Live spread preserves extras, cached whitelist discards them; edits PATCH core fields | Retain AI/source/external metadata after cache, moves, edits and subtask updates | BCORE, BRENDER, BEDIT, BTEMPLATE | IC-08/13/14/15; P03/P04 | H: lost provenance | Q09: cache schema | Move Triage→Done, edit title, toggle subtask, reload cached/fresh views; marker and creator remain |
| IC-17 | External creator representation | A/M, P04, F | Detail has assignees, no creator; self_{uid} denotes internal account | Display external email creator separately from team assignees; no fake Join profile | CONTRACT, BTEMPLATE, BCORE, BRENDER | IC-08; P02/P04 | H: spoofed/internal identity | Q02/Q09: display name/fallback, display locations | Fixture renders external identity, preserves valid team assignments and writes no users/contacts record |
| IC-18 | Creator email action | A, P04, F | Board detail has no sender email action | Provide email action for validated external creator in existing detail path | BTEMPLATE, CONTRACT, proposed shared mail helper if needed | IC-17/27; P04/P08 | H: injected recipient/scheme | Q02/Q04: exact reply target, optional subject and placement | Valid sender opens intended email action; malformed/control-character data cannot construct an unsafe URI |
| IC-19 | Summary Email requests metric | A/M, P01/P05, F | Six metrics computed from tasks; no collector metric | Add real collector metric without altering existing stats/deadlines | SUMMARY, COUNTER, CONTRACT, STYLE | IC-05; P02/P05 | H: wrong measure or stale value | Q03/Q05: exact measure, time window and unknown state | Contract data drives value; moving/deleting a task affects metric only if specified; six old metrics remain identical |
| IC-20 | Summary state/color and Board navigation | P05, F, current sites/summary.html | Six cards navigate to ./taskboard.html without filter | New card navigates to Board; numeric/color states must follow Figma | SUMMARY, STYLE | IC-19; P05/P09/P10 | M: misleading state | Q02: thresholds/colors; no filter requirement established | Activate card by pointer/keyboard and reach Board; compare required numeric states to inspected Figma |
| IC-21 | AI extraction and structured output | P01/P02/P07/P08, ARC | No AI extraction in runtime | n8n invokes AI; validate structured output before Join mapping | CONTRACT, N8N | Q07; P02/P07/P08 | H: untrusted output | Q07: fields, missing/ambiguous values, deadline handling | Safe mail fixture produces conforming output; malformed JSON/invalid type/missing required value creates no task |
| IC-22 | Mail ingestion and normalization | A/ARC, P07 | No workflow/mail contract | Document incoming/normalized mail, trusted sender/message identity and mapping boundary | CONTRACT, N8N | Q04/Q07/Q08; P02/P07 | H: wrong source identity | Q07/Q08: provider envelope, headers, attachments/replies | Provider-independent example maps to normalized input; absent required identity is routed to specified error/review path |
| IC-23 | Authoritative daily limit and race safety | ARC, M, P07/P08 | No collector counter or transaction implementation | Enforce capacity in orchestration; define atomic accounting and cap→manual review branch | CONTRACT, N8N | IC-04/05/22; P02/P07/P08 | H: concurrent cap bypass | Q03/Q06/Q08: counting moment, reset, atomicity, retries | With one slot remaining and two distinct simultaneous emails, no more than one consumes automation capacity |
| IC-24 | Duplicate protection | A, P01/P07/P08 | tasks.push creates a new record on every call | Stable duplicate check across retries prevents duplicate task creation | CONTRACT, N8N | IC-10/22/23; P02/P07/P08 | H: duplicate tasks/quota drift | Q08: key namespace, missing ID, retention and thread rules | Same message retried and received concurrently yields at most one task and contract-defined counter consumption |
| IC-25 | Manual review | ARC, P01/P02/P07/P08 | No review destination/payload | Define manual-review payload; reached cap takes review branch; other review triggers explicit | CONTRACT, N8N | IC-21/23/24; P02/P07/P08 | H: lost request | Q08: destination, trigger policy, acknowledgement and PII | Reached-cap fixture yields review outcome without AI-created task; reviewer can identify request safely |
| IC-26 | Errors, retries and processing log | P01/P02/P07/P08, M | Legacy fetch/save errors logged to console only | Define structured processing/error/write-result contracts and retry policy for collector | CONTRACT, N8N, COUNTER | IC-21–25; P02/P07/P08 | H: silent loss/repeated writes | Q05/Q08: retry, notification, partial-write recovery | Simulate AI timeout and database failure before/after write; outcomes are explicit and retry never duplicates task |
| IC-27 | Untrusted HTML/email/AI boundary | A, P08, current BTEMPLATE/BEDIT | Dynamic values interpolated in HTML and edit attributes | Validate before writes and safely render external text/attributes/email actions in existing paths | CONTRACT, N8N, BTEMPLATE, BRENDER, BEDIT as required | IC-08/18/21; P07/P08 | H: stored XSS/injection | Q07/Q09: lengths, types and sanitizer policy | HTML/attribute/URI payloads in all external fields are rejected or rendered inert across card/detail/edit/cache |
| IC-28 | Prompt injection and deterministic ownership | A/P02/P08 | No external AI boundary | Treat email as untrusted data; AI cannot choose tools, credentials or system fields | CONTRACT, N8N | IC-10/21; P07/P08 | H: unauthorized orchestration | Q07: extraction prompt and model validation strategy | Email asking to override rules, expose credentials or alter status cannot change deterministic mapping or trigger side effects |
| IC-29 | Auto-reply loops, reply chains and spoofing | A/P08 | No incoming mail processing | Define loop suppression, thread/duplicate semantics and sender-trust treatment in n8n | CONTRACT, N8N | IC-22/24/26; P07/P08 | H: repeated processing/false identity | Q08: trusted headers, reply policy and outgoing notifications | Auto-generated mail, repeated reply and spoofed From fixtures follow specified reject/review policy without loops |
| IC-30 | No frontend secrets or AI/mail orchestration | U/A/M/ARC, P07/P08 | Firebase browser config exists; no collector workflow | Keep AI/mail/admin credentials and orchestration in n8n; browser limited to UI/adapters | FLOW, COUNTER, CONTRACT, N8N, VALIDATION | P03/P07/P08 | H: credential exposure | Q06/Q07: backend authentication/hosting | Inspect built/served project-owned sources and example fixtures; no AI/mail/admin credential or workflow execution in browser |
| IC-31 | Desktop Figma acceptance | U/A, P09, F | Existing desktop styles only; four-column Board | Match six new/changed screens at 1440 × 1024 after functional integration | FLOW, SUMMARY, BHTML, BTEMPLATE, STYLE, P09 report | Q02; P03–P08 stable | M: guessed design | Q02: exact desktop frames and states | Inspect frame; compare layout/type/color/assets/interactions; correct and document a second comparison for each screen |
| IC-32 | Dedicated mobile Figma acceptance | U/A, P10, F | Existing responsive Board/Sidebar/Summary; no collector mobile | Match dedicated mobile variants at 428 × 926, including touch/scroll/navigation | FLOW, SUMMARY, BHTML, BTEMPLATE, STYLE, P10 report | IC-31; Q02/Q10 | M: unusable overflow | Q02/Q10: mobile nodes and minimum width | Two documented comparisons per mobile screen/state, plus minimum-width/touch/overflow checks; no desktop shrink assumption |
| IC-33 | Preserve legacy behavior | U/A, P03/P04/P05/P11 | Existing Auth/Guest/Signup/Contacts/manual tasks and Board/Summary | Limit edits to required collector integration; repair only extension regressions | LEGACY, MANUAL, BCORE/BRENDER/BEDIT, SUMMARY (targeted) | AUD baseline; P11 | H: group-project regression | None; existing bugs are not new requirements | Exercise P11 route/action checklist and compare manual-task payload/stats/session behavior to audited baseline |
| IC-34 | Architecture and size discipline | U/A | Some untouched legacy files exceed limits; classic shared globals | Changed/new owned files <=400 lines, named functions <=14, SRP/JSDoc; no duplicate model/renderer/quickfix | Every future changed file; VALIDATION | P02–P12; AUD size map | H: parallel paths and scope creep | None | Check changed files/function lengths and non-trivial JSDoc; trace one task model and one Board renderer |
| IC-35 | Accessibility of new UI | P09/P10/P12, U/A | Mixed legacy inline click handlers, existing labels/ARIA | Validate keyboard/focus/labels and touch/scroll behavior of new/changed flow | FLOW, SUMMARY, BTEMPLATE, STYLE, VALIDATION | Q02; P09–P12 | M: inaccessible CTA/state | Q02: specified interaction states; no unprovided certification target | Keyboard reaches role/back/email/metric controls; visible focus and understandable state; overlays and touch interactions work |
| IC-36 | Phase order and evidence | U/A/M, P12 | PHASE-00 completed; PHASE-01 current | Logic first, per-phase validation/report/master update, no repeated completed phase or full rescan | execution/MASTER.md and relevant phase reports | Current phase gate | H: skipped gate | None | Reports identify source evidence, actual tests, changed files and open blockers; phase advances only after gate passes |

### Decision register and blockers
"Before" names the first dependent phase, not permission to skip this phase's Figma gate.

| Question | Missing fact / decision | Before | Affected requirements | Current disposition |
|---|---|---|---|---|
| Q01 | Are control files the complete Academy/planning/tutorial requirements, or is there another source? | P01 completion | IC-01–36 source completeness | Resolved for current implementation scope by user-provided tutorial walkthrough/screenshots; later checklist deltas remain additive |
| Q02 | Actual Figma content, exact desktop/mobile nodes, copy, state colors, controls and email-mask role | P01 completion | IC-01–04, IC-06/07, IC-11/13, IC-15/17–20, IC-31/32/35 | Resolved sufficiently for functional phases; exact pixel values remain a PHASE-09/10 acceptance dependency |
| Q03 | Limit scope, timezone/day boundary, received vs accepted count, reset, increment/rollback and cap behavior | P02 contract | IC-03–05, IC-19/23 | Open; 10/day established, all other semantics undecided |
| Q04 | Target inbox address, email prefill, sender reply target and CTA behavior at cap | P02/P03 | IC-06/18/22 | Open; no recipient or template invented |
| Q05 | Email requests metric definition, time window, stale/error/loading/unknown behavior | P02 contract | IC-05/19/20/26 | Open; Board navigation already established by P05 |
| Q06 | Counter read source/auth/rules, counter storage/concurrency and n8n Firebase authentication | P02 contract | IC-05/23/30 | Open; no new Firebase path or credential assumed |
| Q07 | Mail provider/trigger/hosting, AI provider/model, extraction fields/limits, missing values and final deadline rule | P02/P07 | IC-09/10/21/22/27/28/30 | Open; providers may remain setup parameters where contract-independent |
| Q08 | Message ID/dedup/thread rules, sender trust, review destination, retries/recovery, logs/notifications | P02/P07 | IC-10/22–26/29 | Open; define contract before dependent workflow setup |
| Q09 | Minimal additive field names/types, exact Triage token and cache compatibility handling | P02 | IC-08/10–12/14–17/27 | Deliberate P02 design work; no second task schema introduced |
| Q10 | Dedicated mobile frames and supported minimum viewport width | P01 mapping / P10 verification | IC-32 | Open; existing breakpoints do not establish product acceptance width |
| Q11 | Welcome entry URL/routing placement while keeping index.html login and guard behavior compatible | P03 | IC-01/02 | Proposed target paths are provisional; inspect Figma/prototype before choosing |

Q03–Q11 record downstream work explicitly instead of pretending storage/product defaults
exist. They do not block PHASE-01 now that the implementation-critical tutorial/Figma
behavior is verified. Stable domain decisions belong to PHASE-02.

### Coverage of the original must-include list
| Required topic | Requirement IDs |
|---|---|
| role-selection welcome | IC-01 |
| stakeholder view | IC-02/03/07 |
| 10/day limit UI | IC-04/05 |
| email CTA | IC-06 |
| Summary Email requests | IC-19/20 |
| Triage board column | IC-11–14 |
| AI-generated label | IC-15 |
| external creator | IC-17 |
| email action | IC-18 |
| persistent AI marker | IC-16 |
| n8n mail ingestion contract | IC-22 |
| AI extraction | IC-09/10/21/28 |
| validation/error handling | IC-26/27 |
| manual review | IC-25 |
| duplicate protection | IC-24/29 |
| security | IC-23/24/27–30 |
| desktop/mobile Figma | IC-31/32/35 |

### Current validation and completion gate
- PASS: PHASE-00 targeted predecessor evidence remains the accepted baseline.
- PASS: all 17 required topic groups are mapped.
- PASS: 36 rows contain the required matrix fields and future acceptance criteria.
- PASS: tutorial walkthrough resolves the stakeholder, quota, Summary, Triage, external creator, email action and persistent AI-label behavior.
- PASS: Figma evidence is sufficient to unblock functional/domain phases; pixel-perfect values remain deferred to the dedicated styling phases.
- PASS: unresolved n8n provider/storage details are explicitly isolated as downstream contract/setup questions instead of invented defaults.
- PHASE-01 completion gate PASSED.

### Handoff to PHASE-02
PHASE-02 must now define only the smallest additive contracts required by the verified
requirements. Q03–Q11 remain explicit inputs; where a provider/storage fact is still
unknown, define an interface/adapter contract rather than inventing infrastructure.

### Changed files in this run
- docs/issue-collector/execution/phase-01-requirements.md
- docs/issue-collector/execution/MASTER.md
