# PHASE-00 – Repository Audit

## Status
COMPLETED

## Goal
Build one reliable map of the current repository. No feature implementation.

## Read
Full repository once.

## Verify
- actual page structure
- active vs generated/legacy files
- current Firebase initialization and paths
- auth/user context
- current task schema
- category and priority values
- status values
- task creation path
- board load/render/update path
- task detail rendering
- Summary load/render path
- responsive CSS organization
- relevant assets
- existing documentation/build/test commands

## Output
Document:
- relevant files,
- dependencies,
- active data flow,
- legacy areas to avoid,
- exact integration points for later phases.

## Do not
- refactor
- rename
- move files
- implement Issue Collector
- fix unrelated bugs

## Completion gate
Audit is sufficiently precise that later phases can use targeted context instead of rescanning the repository.

## Audit report — 2026-09-07

### Scope and evidence
- PHASE-00 only; no feature implementation, refactor, rename, or runtime edit.
- Previous completed phase: NONE; predecessor validation not applicable.
- Complete workspace inventory: 173 files, including ignored firebaseConfig.js.
- All 173 files read for inventory/fingerprints; 162 text/source/assets classified.
- Active page/script references and CSS imports checked; relevant flows inspected below.
- Generated output and historical data inspected only for classification/schema differences.
- Workspace has no .git directory; git status fails with "not a git repository".
- Evidence is local source plus isolated Node execution, not a live database snapshot.

### Repository map
| Area | Files and role |
|---|---|
| Entry | index.html: existing member login, guest button, signup and public legal links |
| Main pages | sites/summary.html, sites/taskboard.html, sites/task-editor.html, sites/contacts.html |
| Secondary pages | sites/sign-up.html, sites/help.html, sites/privacy-policy.html, sites/legal-notice.html |
| Public legal pages | sites/logout-privacy.html, sites/logout-legal.html |
| Shared runtime | script.js: validation, password toggles, logout, profile menu/mobile help |
| Firebase | scripts/firebaseConfig.js, scripts/db.js |
| Session | scripts/auth-guard.js, scripts/user-context.js, scripts/login-auth.js |
| Login/signup UI | scripts/login.js, scripts/sign-up.js |
| Task creation | scripts/taskeditor.js, taskeditorSelections.js, taskeditorSubtasks.js, taskeditorButtons.js (all under scripts/) |
| Board | scripts/taskboard_core.js, taskboard_render.js, taskboard_edit.js, taskboardTemplate.js |
| Summary | scripts/summary.js |
| Contacts | scripts/contacts.js, contacts-data.js, contacts-ui.js, contacts-mobile.js (all under scripts/) |
| Avatar helper | scripts/avatar-utils.js |
| Inactive seed | scripts/seed.js is referenced by index.html but its database code is entirely commented |
| Historical export | Datenbank-export.json; never a current schema/data authority |
| Generated output | out/index.html, global.html, 14 source HTML pages, scripts and styles |
| Planning | AGENT.md, docs/issue-collector/README.md, ARCHITECTURE.md, execution/MASTER.md and phase-00 through phase-12 |
| Tooling | package.json, package-lock.json, jsdoc.json, jsdoc-andi.json, .gitignore |
| Artifacts | .DS_Store files; no runtime relevance |

No stakeholder page, collector adapter, n8n workflow, Firebase rules, emulator configuration,
test suite, CI workflow, or frontend build configuration exists in this inventory.
A separate Academy specification/tutorial/project planning document is not present;
the available planning sources are the control files and ARCHITECTURE.md.

### Page dependencies and load order
All 11 active HTML pages load Firebase app/auth/database compat 9.23.0 from gstatic,
then firebaseConfig.js and db.js. These are classic scripts, sharing globals.
- index.html then loads script.js → login.js → login-auth.js → seed.js.
- Board then loads auth-guard → user-context → script.js → avatar-utils →
  taskboardTemplate → taskeditor → taskeditorSelections → taskeditorSubtasks →
  taskeditorButtons → taskboard_core → taskboard_render → taskboard_edit.
- Standalone editor: auth-guard → user-context → taskeditor → taskeditorSelections →
  taskeditorSubtasks → taskeditorButtons → script.js → avatar-utils.
- Summary: auth-guard → user-context → summary.js → script.js.
- Contacts: deferred scripts; auth-guard → user-context → avatar-utils →
  contacts-data → contacts-ui → contacts-mobile → contacts → script.js.
- Signup: script.js → avatar-utils → sign-up.js.
- Internal privacy/legal pages load auth-guard, user-context and script.js.
- Help and public logout-privacy/logout-legal load user-context and script.js without auth-guard.
- Seven inline scripts handle initial splash/auth visibility.
- Sidebar/header/profile markup is embedded in individual HTML pages, not a shared component.

### Firebase and session boundary
- db.js calls firebase.initializeApp(firebaseConfig), then exposes const db = firebase.database().
- The local config targets project join-2483 and its europe-west1 default RTDB.
- Config values are not copied into this report. .gitignore excludes firebaseConfig.js
  at any level and node_modules. The config is nevertheless present in this workspace.
- Verified active paths: tasks, tasks/{taskId}, tasks/{taskId}/subtasks/{index},
  contacts, contacts/{contactId}, users/{userId}, taskUsers, taskUsers/{taskId}.
- No active collector counter/request/message/deduplication path exists.
- Login uses signInWithEmailAndPassword; successful login stores session userId,
  clears guest flags, sets skipSplash and redirects to sites/summary.html.
- Guest login sets guestLogin=1 in sessionStorage and localStorage, clears session userId,
  then opens Summary. It does not call anonymous Firebase sign-in.
- Auth guard allows guest flags or an authenticated Firebase user; otherwise ../index.html.
- user-context resolves guest first, then stored userId, current auth UID or auth observer.
- Profiles are read from users/{id}; missing profiles can cause a fallback profile update.
- Signup uses Firebase Auth and writes name/email/color/createdAt to users/{uid}.
- Internal own-account assignments use synthetic self_{uid} IDs. External senders must
  not be represented through this mechanism or written to Contacts/users.
- Live data, deployed rules, access rights, and Firebase connectivity remain unverified.

### Current task schema and creation
The active buildTaskObject output, not historical exports, defines the creation shape:

| Field | Current source behavior |
|---|---|
| title | Trimmed titleInput string; required |
| description | Trimmed first textarea string |
| dueDate | dateInput string, normally YYYY-MM-DD; required |
| priority | urgent / medium / low from data-prio; creation default medium |
| category | user-story / technical-task from categoryInput.dataset.value |
| assignedTo | Array of {id, name} from checked contacts |
| subtasks | Array of {id, title, completed:false}; id via crypto.randomUUID() |
| status | Standalone todo; board override uses currentSelectedStatus, default todo |
| createdAt | Date.now() epoch milliseconds |

- Task ID is the Firebase push key, not a required task field.
- saveTaskToFirebase creates tasks.push() and calls set(task).
- validateTaskForm requires title/date/category; no complete external-input validation.
- getSubtasks reads span.textContent, including the displayed bullet prefix.
- setMinDateToToday exists but is not called by the observed editor initialization.
- Standalone success closes modal if present, shows toast and redirects after 2200 ms.
- Board overrides buildTaskObject, handleTaskCreatedSuccess and closeAddTaskModal
  through later script declarations; preserve this actual load order.
- Board creation success resets the form and reloads the board.
- Categories' visible labels are User Story and Technical Task.
- loadCategories also contains a native-select alternative, but active HTML uses
  categoryInput/categoryDropdown with data-value slugs.
- Current task creation has no creator, email source, AI marker, or collector metadata.

Historical distinction: Datenbank-export.json has roots contacts/subtasks/taskUsers/tasks/
userTasks/users and three tasks with title/description/dueDate/priority/status only.
Historical priorities include normal/urgent/medium, statuses todo/done, no category.
Commented seed data contains high and separate subtasks/isDone. These are not new enums.

### Board data/render/update flow
1. taskboard_render.js calls renderBoard on script load.
2. readBoardCache reads join_board_cache_v1 and normalizes cached tasks.
3. Cached cards render first, then fetchBoardData reads tasks and contacts.
4. getContactsMap adds the signed-in own-account contact through user-context.
5. getLegacyTaskConnections reads taskUsers when any task lacks an assignedTo array.
6. normalizeTask spreads the task, resolves assignments and normalizes subtasks.
7. buildColumnsFromTasks → getCardTemplate → renderColumnHTML writes existing columns.
8. Fresh normalized tasks become boardTaskCache and localStorage cache.

Exact extension points and existing limitations:
- BOARD_STATUSES in taskboard_core.js is todo/in-progress/await-feedback/done.
- Column maps are separately fixed in buildColumnsFromCachedTasks (core),
  buildColumnsFromTasks and filterTasks (render).
- Matching HTML column IDs live in sites/taskboard.html; Done has no Add button.
- renderMoveToItems in taskboardTemplate.js uses BOARD_STATUSES plus a label map.
- Cached normalization explicitly selects fields, losing any additive metadata,
  and turns an unknown cached status into todo.
- Live normalization preserves additive metadata, but an unknown status renders no card.
- Assigned entries can be contact-ID strings or objects with id/name/color/initials.
  Explicit empty assignedTo suppresses legacy taskUsers fallback.
- Subtask strings and object/array collections normalize to title/completed;
  normalization drops subtask IDs and does not map historical isDone.
- Search matches title/description/formatted dueDate, triggered at 0 or >=3 characters.
- openTaskDetail uses boardTaskCache first, otherwise fetchTaskWithContacts.
- renderTaskDetail inserts getTaskDetailTemplate into #task-overlay .overlay-card.
- Existing details show category/title/description/date/priority/assignees/subtasks;
  there is no current creator section or sender email action.
- editTask uses the same overlay and cache; saveTaskEdit PATCHes only title,
  description, dueDate, priority, subtasks and assignedTo, then merges the cache.
- onDrop PATCHes status; moveTaskToStatus also validates BOARD_STATUSES.
  Neither operation replaces the full Firebase task.
- updateSubtaskStatus writes only tasks/{id}/subtasks/{index}.
- deleteTask removes tasks/{id} and taskUsers/{id}, clears cache and re-renders.
- These existing paths must remain the only board/card/detail/task model paths.

### Summary flow
- summary.js calls loadSummary immediately.
- It renders join_summary_cache_v1 (userName/tasks), or Guest plus empty metrics,
  then reads tasks and user name and refreshes cache/UI.
- calculateTaskStats counts all tasks, todo, in-progress, done, urgent and feedback.
- Summary accepts both await-feedback and awaiting-feedback; Board only await-feedback.
- Urgent count has no status restriction. Closest deadline includes all future/today tasks,
  regardless of priority or completed status. Preserve these existing calculations.
- IDs: total-tasks, todo-tasks, inprogress-tasks, done-tasks, urgent-tasks,
  awaitFeedback-tasks, next-deadline; containers .metrics-section and .row-bottom.
- All six existing metric cards navigate to ./taskboard.html without filter parameters.
- Email requests does not exist. Its data source/meaning needs a collector contract;
  do not infer it from total task count or invent a Firebase counter path.
- Mobile greeting is enabled at <=992px and uses cached/current profile text.

### Contacts boundary and shared globals
- Contacts CRUD and local fallback live in contacts-data.js; UI and mobile controls
  are separate. Local keys: join_contacts_local and join_contacts_cache_v1.
- Contact deletion PATCHes affected task assignedTo lists and taskUsers maps;
  it does not replace whole tasks. Keep collector creator metadata independent.
- contacts-ui.js/createContactDetailsEmailNode uses textContent and mailto;
  this is an existing UI reference, not a reason to load Contacts on the board.
- getInitials is actually in taskeditorSelections.js (core's comment says taskeditor.js).
- finishSubtaskEdit is declared by taskeditorSubtasks.js and taskboard_edit.js with
  different signatures; Board's later declaration wins. Record as legacy collision.
- Other shared names include hasFirebaseAuth, isGuestSessionActive and page-specific
  contact helpers. New code must avoid accidental global name collisions.

### CSS and assets map
- style.css: reset and auth-check-pending visibility; styles/fonts.css: local Inter
  regular/italic variable fonts (100–900).
- Login: assets.css, login.css, login-responsive.css (768/420px); signup adds signup.css.
- Shared navigation: sidebar.css (desktop, <=992 bottom navigation, 320px rule).
- Summary: summary.css, including <=992 and landscape; generic .card/:root selectors.
- Board load order: taskboard_base → taskboard_overlays → taskboard_modal →
  taskboard_modal_subtasks → taskboard_responsive, plus sidebar/fonts/reset.
- Base board uses repeat(4, minmax(0, 280px)); responsive has 1400/1200/1024/992/
  768/576/480/360 rules; 993–1024 uses two columns, <=768 uses one column and
  horizontal task rows with 255px cards plus mobile move menus.
- Standalone editor uses task-editor.css plus summary/sidebar/fonts/reset.
  Board has its own embedded editor styles; it does not load task-editor.css.
- Contacts imports contacts-core, contacts-layout, contacts-breakpoints-desktop,
  contacts-breakpoints-mobile, contacts-overlay-responsive.
- Other scoped styles: help.css, legal-notice.css, privacy-policy-content.css.
- Assets: join_logo.svg/join_logo_dark.svg; mail/person/back/close/edit/delete/
  checkbox/search/move icons; prio-urgent/medium/low.svg; local Inter TTFs.
- Other priority icon names and unused/export-style assets also exist; use actual refs.
- No new visual implementation or Figma comparison was performed in PHASE-00.
  Exact desktop/mobile frames and styling values remain for the designated phases.

### Security and change constraints for later phases
- Task templates interpolate title/description/category/contact/subtask values directly
  into innerHTML, including edit attributes. External data must cross a validated,
  context-safe boundary before reaching these sinks.
- Source/AI metadata must survive both live and cached normalization, status moves,
  edits and detail rendering. The marker must not depend solely on Triage status.
- No n8n orchestration or mail/AI credentials belong in these browser scripts.
- Do not modify Auth, Signup, Guest, Contacts, historical exports or generated docs
  merely to fix existing shortcomings found by this audit.
- Existing files already above 400 lines include taskeditorSelections.js (491),
  login.js (402), sign-up.js (536), contacts-data.js (642), contacts-ui.js (527),
  contacts.js (460), summary.css (427), sidebar.css (502), task-editor.css (970),
  contacts-core.css (408). Untouched legacy files remain exempt.
- Relevant board files are currently below 400 (core 286, render 302, edit 384,
  templates 284); existing named functions can exceed 14 lines.
- Any later modified project file must meet <=400 lines and named functions <=14;
  plan narrow responsibility-based changes rather than a quickfix override file.

### Tooling and validation
- Node v24.19.0 available; no node_modules in workspace.
- package.json: CommonJS package metadata; browser code is classic scripts.
- npm test executed: exits 1 with "Error: no test specified"; existing placeholder,
  not a newly introduced failure. There is no usable test/build/dev script.
- npm run doc invokes jsdoc -c jsdoc.json; doc-andi invokes jsdoc-andi.json.
- doc-andi references absent scripts/taskboard.js; out also retains that old source page.
  Active Board uses the split files above. No generated docs rebuilt.
- Local syntax validation: vm.Script parsed all 23 project JS files and seven inline
  scripts successfully without executing Firebase or page startup.
- Reference validation: 311 local HTML src/href paths and 25 CSS url/import paths
  resolve after excluding external/protocol-relative URLs and decoding URL escapes.
- Ten isolated Node vm/assert checks passed: status order, cached unknown-status
  fallback, cache metadata loss, live metadata preservation, missing live Triage
  column, explicit-empty assignments, legacy assignment fallback, subtask
  normalization, Summary feedback alias and unescaped card template input.
- The unsafe HTML check only compared strings; it did not execute an HTML payload.
- Browser interaction, live auth/database, deployed security rules, screenshots and
  Figma comparisons were not tested. No runtime regression claim is made.
- Audit completion gate PASSED: later phases have targeted files/functions/dependencies.
  No runtime files changed, so the placeholder test does not block this documentation audit.

### Open questions / next-phase inputs
- Obtain or identify Academy requirements, tutorial decisions and any separate planning
  document for PHASE-01; do not claim absent sources have been reviewed.
- Inspect the supplied Figma file directly in PHASE-01 to map requirements and frame IDs;
  known IDs are listed in MASTER, not yet verified against design contents.
- Resolve the open n8n decisions in MASTER before dependent contracts/implementation.
- Define whether the 10/day scope is global/per sender, timezone/reset semantics,
  counting accepted vs received requests, failure/capacity behavior and read authorization.
- Define Email requests metric semantics and verified counter source.
- Confirm final recipient, deadline rule, deduplication identity, retry/manual-review
  destination and race-safe counter ownership. No defaults established in this audit.
- Determine supported minimum width and exact mobile frames from requirements/Figma.

### Changed files
- docs/issue-collector/execution/phase-00-audit.md (this report)
- docs/issue-collector/execution/MASTER.md (execution state)

### Revalidation before PHASE-01
Read this report and compare only relevant source fingerprints below; re-read any
changed file and its direct dependencies, then update the affected audit finding.
Verify the documented script order, task enums/schema, cache behavior and Summary path.
Do not repeat a full repository scan or silently treat this report as fresher than source.

| Relevant unchanged source | SHA-256 at audit |
|---|---|
| index.html | 45C528F72317B828D8F328B25405990D6E04AC043E3247BD80B7417B9C06A42E |
| sites/taskboard.html | 7BC79811EE1037652FBE5938E9B123C17862A38D7ED62150794E634C416CFD56 |
| sites/task-editor.html | 7BD8179A414AF30137F3E68B7C694553F7B12AD5055C7A358A7DA83FEC0FFEB0 |
| sites/summary.html | 42C1B899F9E137A5984A4CAB107E0729F0333F7257ECB20733AD3D8D8EF86A57 |
| scripts/db.js | BD66BC6830D8B3FA21B1D434E91822B2F186297CA2FCF53CEA98B789A5AC7422 |
| scripts/firebaseConfig.js | 4363D2CE4C828C395CD197C2C421A0244F7FC8A84135A373E6E8F0F7705309FD |
| scripts/auth-guard.js | A09E2EB0B23C0D8D3243AD3343926212B6C1CEA3E17B2ED03D47D7AD743E8947 |
| scripts/user-context.js | EBC16950A2EB77E7856513F7FAA527B0362831405E7A0E5149014482F4A58F1F |
| scripts/login-auth.js | 1397FDFF6A9C77786E1D0A756335D2C7CA4D937D9058D8359A0B19543AC2B9BA |
| script.js | 410BF21A53F3EC90EFF44123A8097DF5437AAA3A37DF498504AF9811F15383D2 |
| scripts/avatar-utils.js | 96A2C4CC09CBDC77E3C9A79255F15EDB807AD67F036527CF61D87131BEB0CD4C |
| scripts/taskeditor.js | FF98B8919B6F8C03E345597DC4FEB336ED64A5A6705DA913AEDB95F4E70F050E |
| scripts/taskeditorSelections.js | 73287FADF28929CA198B401A190FE10A320D9D086718C5B0A325AF95ACA2BE69 |
| scripts/taskeditorSubtasks.js | B8F9511D33C9C52CA1D07B30EE0EA77106900B8F4235548E3CC43A5F0776E3FF |
| scripts/taskeditorButtons.js | 928E92470328EB6E19889965645815A847EA59148226F6F3879199619711D5BA |
| scripts/taskboard_core.js | AC8AC646208932AFB3D60B79B38568C36794D8AEE6F1442B81102E63A21DF2F1 |
| scripts/taskboard_render.js | 6CF9093797EC46AC824303BA5EE3CE8995DE5CD5010AF37CAA5D50C6153A78D0 |
| scripts/taskboard_edit.js | 5F34D650B1DE575433E76649F1BA5D5390B5E1316DB22B293D03F7D8942CED3E |
| scripts/taskboardTemplate.js | 972987B9CCC29B6F644F09DBD0C586FCC89D6F3068F07E2B6C15C5E657B940AF |
| scripts/summary.js | E359D66947643192608437A46F5BCA428520E73085F2385910810C6727904787 |
| styles/summary.css | D21BD3002A3B952F627B4019581392724B04730AA7AC8C55D42FA0086B1D0BC4 |
| styles/taskboard_base.css | 62CCD31467E047FB02665A81AE0AAD6D9153A583FDE44ED51B6B6604F2A3EA0F |
| styles/taskboard_responsive.css | 91F1640905D8819D1C18F5EBC06997978FC677435C2831EB10ED1F5E3D67ACC9 |
| package.json | A2630EB71C1074FFC918AAEE0BE3B595DB0944311BEA4A6F709300DD4993CDBF |
