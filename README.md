# Join 2.0 – Issue Collector

Extension of the Developer Akademie Join Kanban board with an AI-assisted stakeholder email workflow.

## Architecture

```text
Stakeholder email
→ n8n
→ Supabase automation state / quota / manual review
→ Gemini structured extraction
→ Firebase Realtime Database
→ Join Triage board
```

Additional automation:

```text
Join task status change
→ n8n webhook
→ status email to external creator
```

Mailbox processing:

```text
successful processing → erledigt
processing error/limit → zu bearbeiten
```

The mailbox move is implemented by the Supabase Edge Function `supabase/functions/move-mail` and invoked from n8n.

## Main components

- Vanilla JavaScript / HTML / CSS Join frontend
- Firebase Authentication and Realtime Database for Join application data
- Supabase for Issue Collector automation state and quota protection
- Supabase Edge Function for server-side IMAP message moves
- n8n for mail ingestion and workflow orchestration
- Gemini for structured issue extraction

## Issue Collector behavior

- incoming request emails are normalized and deduplicated
- global daily automation limit: 10 requests
- AI output maps title, description, category, priority, due date and explicit subtasks
- generated tasks start in `Triage`
- generated tasks preserve an AI-generated marker and external creator metadata
- manual tasks also start in `Triage` and use the logged-in member as internal creator
- external creators receive success/error/limit replies
- later task status changes can trigger an email notification

## Demo usage

1. Open the Join landing page and choose the stakeholder path.
2. Send a feature request or technical task to `info@schniefs-portfolio.de`.
3. n8n processes the incoming email, applies the daily quota, asks Gemini for structured issue data and creates the ticket in `Triage`.
4. Open the Join board and inspect the AI-generated ticket, creator information, priority, category, due date and optional subtasks.
5. Move an externally created ticket to another board column to trigger the n8n status-notification workflow.
6. Successful source emails are moved to `erledigt`; processing failures or quota rejections are moved to `zu bearbeiten`.

For a team-member demo, use the member login. The guest path signs in through Firebase Anonymous Authentication and is intended to remain read-only.

## n8n workflow exports

Repository workflow JSON files intentionally contain no connected credential objects. After importing them into another n8n instance, reconnect the required IMAP, SMTP, Supabase, Google Service Account and Gemini credentials manually.

The mailbox-move HTTP nodes use the repository-safe placeholder:

```text
__ISSUE_MAIL_MOVE_SECRET__
```

Replace that placeholder only inside n8n with the value stored as the Supabase secret `ISSUE_MAIL_MOVE_SECRET`. Do not commit the real value.

## Security

Do not commit secrets.

Local Firebase browser configuration is ignored through `.gitignore`. Service-account private keys, mailbox passwords, n8n credentials and Supabase secrets belong only in their respective secret stores.

Firebase Realtime Database production rules are intended to require Firebase authentication. Guest access uses Firebase anonymous authentication and should remain read-only at database-rule level.

Any service-account or mailbox password exposed outside its secret store must be rotated.

## Supabase setup

Link the project if needed:

```powershell
npx supabase link --project-ref uhzhroacvnwemikgqjqe
```

Apply migrations:

```powershell
npx supabase db push
```

Mailbox Edge Function secrets:

```powershell
npx supabase secrets set ISSUE_MAIL_HOST=w0204d77.kasserver.com
npx supabase secrets set ISSUE_MAIL_PORT=993
npx supabase secrets set ISSUE_MAIL_USER=<mailbox-user>
npx supabase secrets set ISSUE_MAIL_PASSWORD="<mailbox-password>"
npx supabase secrets set ISSUE_MAIL_MOVE_SECRET="<long-random-shared-secret>"
```

Deploy mailbox function:

```powershell
npx supabase functions deploy move-mail
```

Detailed n8n wiring: `docs/issue-collector/MAILBOX-MOVE.md`.

## Documentation

- `docs/issue-collector/ARCHITECTURE.md`
- `docs/issue-collector/CONTRACTS.md`
- `docs/issue-collector/N8N-CONTRACTS.md`
- `docs/issue-collector/SECURITY-VALIDATION.md`
- `docs/issue-collector/MAILBOX-MOVE.md`

## Final verification

Before submission verify:

- member login
- anonymous guest read access
- guest write rejection
- manual task → Triage + internal creator
- email task → Triage + external creator
- explicit subtasks
- daily counter and 10-request limit
- success/limit/error replies
- status-change notification
- successful mail → `erledigt`
- error/limit mail → `zu bearbeiten`
- Firebase rules deny unauthenticated database access
- current n8n workflow exports are committed without credentials
