# PHASE-11 – Regression

## Status
COMPLETED

## Goal
Ensure the Issue Collector extension did not break the existing Join project.

## Predecessor handling
PHASE-10 mobile implementation was technically complete but blocked by the external Figma MCP Starter-plan call limit.

The operator explicitly instructed continuation after that blocker was reported.

The direct two-pass mobile Figma comparison is **not claimed as performed**. It is carried forward to PHASE-12 as a residual visual acceptance item.

## Regression scope
Checked the existing Join flows requested by this phase:
- login
- guest login
- signup
- summary
- add task
- board load structure
- board search code
- task detail
- task edit/delete
- move/drag
- contacts boundary
- help
- privacy
- legal notice

## Legacy fingerprint validation
PHASE-00 recorded SHA-256 fingerprints for the relevant baseline files.

Still byte-identical to PHASE-00:
- `sites/task-editor.html`
- `scripts/db.js`
- `scripts/auth-guard.js`
- `scripts/user-context.js`
- `scripts/login-auth.js`
- `script.js`
- `scripts/avatar-utils.js`
- `scripts/taskeditor.js`
- `scripts/taskeditorSelections.js`
- `scripts/taskeditorSubtasks.js`
- `scripts/taskeditorButtons.js`
- `scripts/taskboard_edit.js`
- `styles/summary.css`
- `styles/taskboard_responsive.css`
- `package.json`

This confirms the core existing authentication/user-context/manual task-editor/edit-drag logic and the legacy responsive baseline were not rewritten by the Issue Collector phases.

Expected files changed since PHASE-00 are limited to the intended extension surfaces:
- `index.html`
- `sites/taskboard.html`
- `sites/summary.html`
- `scripts/taskboard_core.js`
- `scripts/taskboard_render.js`
- `scripts/taskboardTemplate.js`
- `scripts/summary.js`
- `styles/taskboard_base.css`

`firebaseConfig.js` is intentionally absent from the supplied ZIP/workspace and remains environment-specific/gitignored.

## Static/runtime-boundary checks

### JavaScript syntax
All project JavaScript files parsed with `node --check`.

Result:

```text
PASS
```

### HTML references
All local `src`/`href` references resolve after excluding:
- remote URLs,
- protocol-relative remote URLs,
- anchors/mailto,
- the intentionally environment-provided `firebaseConfig.js`.

Result:

```text
PASS
```

### Duplicate HTML IDs
No duplicate IDs were found in the active HTML pages.

Result:

```text
PASS
```

### CSS structural check
All stylesheet brace pairs are balanced.

Result:

```text
PASS
```

### Secrets scan
No obvious AI keys, Firebase API-key literals, private-key blocks or password literals were found in the new Issue Collector scripts/docs/fixtures.

Result:

```text
PASS
```

## Feature regression checks

### Board
Verified DOM column order:

```text
triage
todo
in-progress
await-feedback
done
```

The existing `taskboard_edit.js` remains byte-identical to PHASE-00, so existing edit/delete/move behavior was not generally rewritten.

The current taskboard script order loads:
- Issue Collector domain helpers,
- existing template,
- existing task editor modules,
- board core/render/edit.

### Manual task creation
`taskeditor.js` still creates standalone manual tasks with:

```text
status: todo
```

Issue Collector Triage does not replace the normal manual-task default.

### Summary
`summary.js` still calculates:
- total
- todo
- in-progress
- done
- urgent
- await-feedback

and additively calculates `Email requests` only for:

```text
sourceType === "email"
aiGenerated === true
```

The new metric target `#email-request-tasks` exists in `sites/summary.html`.

### Auth / signup / guest
The underlying auth implementation files are unchanged from PHASE-00:
- `script.js`
- `scripts/login-auth.js`
- `scripts/auth-guard.js`
- `scripts/user-context.js`

Only the public entry HTML gained the role-selection layer.

### Contacts / legal / help
No Issue Collector phase changed Contacts business logic or the Help/Privacy/Legal implementation files.

## Existing project tooling limitations
`npm test` still intentionally fails because `package.json` contains only the original placeholder:

```text
Error: no test specified
```

This is not an Issue Collector regression.

`npm run doc` could not execute in this sandbox because the local `jsdoc` binary is not executable (`Permission denied`). No project source was changed to work around that environment/tooling issue.

## Live integration limits
Not validated in this phase because they require the user's real environment:
- Firebase authentication against the real project,
- live Firebase reads/writes,
- real drag/drop browser interaction,
- real n8n workflow,
- real mail provider,
- live AI provider.

These remain final/manual integration checks rather than reasons to modify unrelated legacy code.

## Completion gate
Passed for repository-side regression.

No Issue Collector-caused regression requiring a source-code repair was found.

## Changed files
Documentation/state only:
- `docs/issue-collector/execution/phase-10-styling-mobile.md`
- `docs/issue-collector/execution/phase-11-regression.md`
- `docs/issue-collector/execution/MASTER.md`
