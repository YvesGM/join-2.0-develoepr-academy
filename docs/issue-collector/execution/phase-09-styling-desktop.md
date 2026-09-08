# PHASE-09 – Desktop Styling

## Status
COMPLETED

## Goal
Align all Issue Collector desktop states with the 1440 × 1024 Figma/tutorial reference after functional logic was stabilized.

## Predecessor validation
PHASE-08 was revalidated before visual work:
- `scripts/issue-collector/domain.js` still parses,
- `scripts/taskboardTemplate.js` still escapes external/AI text,
- category and priority allowlists remain intact,
- external creator email remains validated before a `mailto:` action is rendered.

No PHASE-08 repair was required.

## Figma/reference state
Known Figma nodes remained:
- Welcome `350504:9300`
- Stakeholder `350504:9311`
- Stakeholder limit reached `350504:9548`
- Email mask `350504:9168`
- Summary user `45:2195`

A fresh Figma MCP screenshot call was attempted during this phase, but the connected Figma Starter plan returned its MCP call-limit paywall. The phase therefore used the exact Figma/tutorial captures supplied by the user together with the previously verified node metadata rather than inventing values.

## Desktop implementation
Added one desktop-only extension stylesheet:

```text
styles/issue-collector-desktop.css
```

It is loaded after existing styles only on the four affected page families:
- public Welcome/login entry,
- Stakeholder page,
- Summary,
- Board.

This avoids broad edits to unrelated legacy styles.

### Welcome / Role Selection
Aligned:
- full dark-blue backdrop,
- centered 790 × ~400 white card,
- Figma-sized Welcome heading/underline,
- two role choices,
- blue `Create request` action,
- outlined `Member log in` action,
- public login header/footer hidden only while role selection is active.

`welcome.js` now toggles one styling state class and still preserves the existing member-login behavior.

### Stakeholder
Aligned:
- logo position,
- back arrow,
- top-right request counter,
- centered Welcome heading,
- two-column copy/illustration composition,
- normal blue counter state,
- orange reached state,
- pink limit notice,
- blue email CTA with checkmark,
- bottom legal links.

Added two local reference illustration assets derived from the user-supplied Figma/tutorial captures because the original Figma asset export was unavailable at the MCP limit:

```text
assets/img/issue-collector-stakeholder.png
assets/img/issue-collector-stakeholder-limit.png
```

Stakeholder copy was also restored to the Figma wording for the AI ticket, deadline/priority and 10-request/manual-review explanation.

### Summary
Kept the existing Summary layout and only finalized the `Email requests` card:
- fixed 168px desktop width matching the reference grid,
- distinct violet/blue numeric value,
- existing card hover behavior preserved.

### Board / Triage
Aligned the five-column desktop board to the Figma proportions:
- Board title/header position,
- `Triage` first,
- five 216px columns,
- ~20px column gaps,
- existing search/add controls retained,
- existing card renderer retained,
- category card styling preserved.

### AI-generated task detail
Aligned additive Issue Collector metadata:
- `AI-generated ticket` shown as the smaller provenance label next to the category rather than a second heavy pill,
- external creator rendered with compact green `Extern` tag,
- e-mail action styled as the light-blue secondary action,
- external Creator is shown before Due date/Priority to match the supplied task-detail reference.

No second task renderer was created.

## Comparison passes
### Pass 1
Measured the supplied 1440 × 1024 Figma/tutorial captures against the current implementation and mapped the visible proportions back to desktop pixels. Key corrections included:
- Welcome card ≈790px wide,
- stakeholder logo ≈40px from the left / 30px from the top,
- stakeholder counter ≈160px from the right,
- content composition widened to ≈968px,
- Board grid columns ≈216px with ≈20px gaps,
- Board grid beginning before the indented header title as shown in the reference.

### Pass 2
Rendered static 1440 × 1024 HTML/CSS snapshots locally with the available renderer and rechecked the changed layouts against the supplied references. The second pass corrected:
- Welcome role-option structure/button widths,
- Stakeholder heading/copy vertical spacing,
- persistent provenance/detail ordering,
- desktop-only scoping to avoid premature mobile overrides.

The local renderer is not the production browser and has limitations around fixed/flex behavior, so exact runtime browser review remains part of PHASE-11/12 regression/final validation; no unsupported values were invented to compensate for renderer quirks.

## Validation
- `scripts/issue-collector/welcome.js`: syntax PASS
- `scripts/taskboardTemplate.js`: syntax PASS
- all four affected HTML pages load the desktop extension stylesheet
- stakeholder illustration assets resolve locally
- new desktop stylesheet: 397 lines, within 400-line limit
- `taskboardTemplate.js`: 378 lines, within 400-line limit
- no unrelated legacy stylesheet was refactored
- existing mobile rules were not redesigned in this phase

## Changed files
- `index.html`
- `sites/stakeholder.html`
- `sites/summary.html`
- `sites/taskboard.html`
- `scripts/issue-collector/welcome.js`
- `scripts/taskboardTemplate.js`
- `styles/issue-collector-desktop.css`
- `assets/img/issue-collector-stakeholder.png`
- `assets/img/issue-collector-stakeholder-limit.png`
- `docs/issue-collector/execution/phase-09-styling-desktop.md`
- `docs/issue-collector/execution/MASTER.md`

## Completion gate
Passed for desktop implementation based on the available exact supplied Figma/tutorial captures and two comparison passes. PHASE-10 must now perform the dedicated mobile implementation rather than shrinking these desktop rules.
