# Mailbox move – final n8n wiring

The incoming request email remains the source message. After processing, n8n calls the Supabase Edge Function `move-mail` with the IMAP UID from `Email Trigger (IMAP)`.

## Required mailbox result

- successful automatic ticket creation → `erledigt`
- quota reached → `zu bearbeiten`
- AI provider error → `zu bearbeiten`
- AI output validation error → `zu bearbeiten`
- Firebase creation error → `zu bearbeiten`

## Supabase Edge Function

Path:

```text
supabase/functions/move-mail/index.ts
```

Secrets required in the linked Supabase project:

```text
ISSUE_MAIL_HOST
ISSUE_MAIL_PORT
ISSUE_MAIL_USER
ISSUE_MAIL_PASSWORD
ISSUE_MAIL_MOVE_SECRET
```

Deploy from the repository root:

```powershell
npx supabase functions deploy move-mail
```

The repository config disables Supabase JWT verification only for this function. The function itself requires the private `x-issue-collector-secret` header and only accepts the two fixed target folders.

## n8n HTTP Request node settings

Use the production URL:

```text
https://uhzhroacvnwemikgqjqe.supabase.co/functions/v1/move-mail
```

Common settings for every move node:

```text
Method: POST
Authentication: None
Send Headers: On
Header Name: x-issue-collector-secret
Header Value: <same value as ISSUE_MAIL_MOVE_SECRET>
Send Body: On
Body Content Type: JSON
```

Success body:

```json
{
  "uid": "{{ $('Email Trigger (IMAP)').item.json.attributes.uid }}",
  "targetFolder": "erledigt"
}
```

Error/limit body:

```json
{
  "uid": "{{ $('Email Trigger (IMAP)').item.json.attributes.uid }}",
  "targetFolder": "zu bearbeiten"
}
```

## Nodes to add to `Join - Issue Collector`

```text
Send Success Reply
→ Move Mail to Erledigt

Send Limit Reply
→ Move Mail to Review

Send AI Error Reply
→ Move Mail to Review

Send AI Validation Error Reply
→ Move Mail to Review

Send Firebase Error Reply
→ Move Mail to Review
```

For all five move nodes set n8n error handling to continue with the workflow output instead of aborting the already completed processing result. A mailbox move failure must be visible in the execution, but must not undo an already created Join task or suppress the stakeholder reply.

## Verification

Run one success mail and one deliberate error/limit case. Confirm in webmail that the original messages leave `INBOX` and appear in the expected folder.
