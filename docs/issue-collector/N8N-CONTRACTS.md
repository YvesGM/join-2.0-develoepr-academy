# n8n Integration Contracts

## Purpose

This document is the provider-neutral contract between the Join repository and the n8n Issue Collector workflow.

It deliberately does not select:
- mail provider,
- n8n hosting,
- AI provider/model,
- Firebase service authentication,
- quota persistence path,
- manual-review destination.

Those are deployment/setup decisions.

## Existing Join target

AI-generated email requests become normal Join tasks.

Firebase target:

```text
/tasks/{taskId}
```

The existing application creates manual tasks with `firebase.database().ref("tasks").push()`.
n8n must write an equivalent task object plus the additive Issue Collector metadata defined below.

## Processing order

```text
incoming mail
→ normalize
→ validate stable identity
→ duplicate check
→ resolve stakeholder identity
→ read daily quota
→ quota decision
→ AI analysis
→ validate structured AI output
→ sanitize external strings
→ map Join task
→ create Firebase task
→ commit quota consumption
→ mark message processed
→ emit processing result
```

Duplicate and quota checks occur before the AI call.

A failed or retried run must not create a second task.

---

## Contract 1 – Incoming provider mail

Provider-specific nodes may expose different fields.

The first normalization step must convert them into the canonical normalized-mail contract below.

Raw provider payloads must not be used directly by downstream nodes.

---

## Contract 2 – Normalized mail

```json
{
  "messageId": "<provider-stable-message-id>",
  "senderEmail": "stakeholder@example.com",
  "senderDisplayName": "Felix Henri Richter",
  "subject": "Improve CSS architecture",
  "plainTextBody": "Please define a consistent CSS architecture...",
  "receivedAt": 1788858000000
}
```

### Required

- `messageId`: non-empty stable message identity
- `senderEmail`: normalized valid email address
- at least one of `subject` or `plainTextBody`: non-empty
- `receivedAt`: finite Unix timestamp in milliseconds

### Normalization

- sender email: trim + lowercase
- display name: trim
- subject: trim
- mail body: convert to bounded plain text
- HTML: never pass untrusted HTML to Join
- quoted reply history/signature reduction may be added in n8n
- attachments are out of scope unless the Academy checklist explicitly requires them

### Missing stable identity

If no trustworthy `messageId` exists:

```text
manual_review
reason = missing_message_id
```

Do not create a non-idempotent task.

---

## Contract 3 – Duplicate key

Canonical logical key:

```text
sha256(normalized messageId)
```

The exact storage path is a deployment decision.

Required semantics:

```json
{
  "messageKey": "<sha256>",
  "messageId": "<original stable message id>"
}
```

Duplicate detection happens before quota consumption and before AI.

A duplicate must produce:

```json
{
  "status": "duplicate"
}
```

and must not:
- call AI,
- increment quota,
- create a task.

---

## Contract 4 – Stakeholder identity

For n8n quota evaluation, use:

```text
normalized sender email
```

as the canonical stakeholder identity unless a later Academy requirement defines another authenticated stakeholder identifier.

Logical identity:

```json
{
  "stakeholderKey": "stakeholder@example.com"
}
```

Do not trust `senderDisplayName` as identity.

---

## Contract 5 – Daily quota read

Frontend contract already expects:

```json
{
  "used": 4,
  "limit": 10,
  "limitReached": false,
  "dayKey": "2026-09-08"
}
```

n8n needs the equivalent authoritative state.

Rules:

- `limit` = 10
- `used` = successfully committed automated tickets for that stakeholder/day
- `limitReached` = `used >= limit`
- `dayKey` = authoritative configured quota day

The storage path, timezone and transaction mechanism remain deployment decisions.

### Quota decision

If:

```text
used >= 10
```

route to manual review and skip AI.

---

## Contract 6 – Quota commit

Preferred semantics:

```text
consume one request only after successful Firebase task creation
```

The commit must be race-safe.

Required logical input:

```json
{
  "stakeholderKey": "stakeholder@example.com",
  "dayKey": "2026-09-08",
  "expectedLimit": 10,
  "taskId": "-firebasePushId",
  "messageKey": "<sha256>"
}
```

Required logical result:

```json
{
  "used": 5,
  "limit": 10,
  "limitReached": false,
  "dayKey": "2026-09-08"
}
```

If atomic quota ownership cannot be guaranteed with the selected persistence mechanism, setup is blocked until that is resolved.

---

## Contract 7 – AI structured output

The AI may return only:

```json
{
  "title": "CSS Architecture Planning",
  "description": "Define CSS naming conventions and structure.",
  "category": "technical-task",
  "priority": "urgent",
  "dueDate": "2026-09-14"
}
```

### Allowed category values

```text
user-story
technical-task
```

### Allowed priority values

```text
urgent
medium
low
```

### dueDate

Format:

```text
YYYY-MM-DD
```

The exact deadline policy/prompt is configured during n8n setup.

The frontend must not invent a deadline.

### AI must not control

- Firebase task ID
- `status`
- `createdAt`
- `sourceType`
- `aiGenerated`
- creator identity
- source message identity
- quota values
- database paths
- credentials

Invalid output routes to manual review.

---

## Contract 8 – Validated Join task payload

n8n maps valid AI output + normalized mail metadata to:

```json
{
  "title": "CSS Architecture Planning",
  "description": "Define CSS naming conventions and structure.",
  "dueDate": "2026-09-14",
  "priority": "urgent",
  "category": "technical-task",
  "assignedTo": [],
  "subtasks": [],
  "status": "triage",
  "createdAt": 1788858060000,
  "sourceType": "email",
  "aiGenerated": true,
  "externalCreator": {
    "name": "Felix Henri Richter",
    "email": "stakeholder@example.com"
  },
  "sourceMessageId": "<provider-stable-message-id>"
}
```

### Deterministic values

```text
assignedTo = []
subtasks = []
status = triage
sourceType = email
aiGenerated = true
createdAt = workflow-controlled timestamp
externalCreator.email = normalized sender email
sourceMessageId = normalized mail messageId
```

Creator name fallback if the provider has no display name:

```text
sender email
```

No synthetic Join user/contact is created.

---

## Contract 9 – Firebase create result

Logical success result:

```json
{
  "taskId": "-firebasePushId",
  "createdAt": 1788858060000
}
```

The workflow must retain `taskId` for:
- quota commit,
- processed-message marker,
- processing log,
- retry diagnostics.

A Firebase failure must not consume quota as a successful automated request.

---

## Contract 10 – Processed message marker

After successful task creation and successful quota commit, store a processed marker using the duplicate key.

Logical contract:

```json
{
  "messageKey": "<sha256>",
  "messageId": "<provider-stable-message-id>",
  "taskId": "-firebasePushId",
  "processedAt": 1788858065000,
  "status": "created"
}
```

Storage path remains a deployment decision.

Retries must check this marker first.

---

## Contract 11 – Manual review payload

```json
{
  "reason": "limit_reached",
  "messageId": "<provider-stable-message-id>",
  "senderEmail": "stakeholder@example.com",
  "receivedAt": 1788858000000,
  "subject": "Improve CSS architecture",
  "normalizedBody": "Please define a consistent CSS architecture...",
  "failureStage": "quota"
}
```

Allowed initial `reason` values:

```text
missing_message_id
invalid_mail
limit_reached
ai_unavailable
invalid_ai_output
unclassifiable_request
firebase_create_failed
quota_commit_failed
```

The final manual-review destination is configured in n8n.

No new browser backoffice is required.

---

## Contract 12 – Processing result

Every workflow run ends in one of:

```text
created
duplicate
limit_reached
manual_review
failed
```

Canonical result:

```json
{
  "status": "created",
  "stage": "complete",
  "messageId": "<provider-stable-message-id>",
  "taskId": "-firebasePushId",
  "occurredAt": 1788858065000,
  "errorCode": null
}
```

Do not log complete sensitive mail content in the generic processing log.

---

## Contract 13 – Error payload

```json
{
  "status": "failed",
  "stage": "firebase_create",
  "messageId": "<provider-stable-message-id>",
  "taskId": null,
  "occurredAt": 1788858065000,
  "errorCode": "FIREBASE_WRITE_FAILED"
}
```

Suggested stable error codes:

```text
INVALID_MAIL
MISSING_MESSAGE_ID
DUPLICATE_MESSAGE
LIMIT_REACHED
AI_UNAVAILABLE
INVALID_AI_OUTPUT
INVALID_CATEGORY
INVALID_PRIORITY
INVALID_DUE_DATE
FIREBASE_WRITE_FAILED
QUOTA_COMMIT_FAILED
PROCESSED_MARKER_FAILED
```

A provider-specific exception string may be recorded separately in restricted n8n execution data, not persisted into public Join task data.

---

## Field mapping

| Source | Field | Join target |
|---|---|---|
| AI | `title` | `tasks/{id}/title` |
| AI | `description` | `tasks/{id}/description` |
| AI | `dueDate` | `tasks/{id}/dueDate` |
| AI | `priority` | `tasks/{id}/priority` |
| AI | `category` | `tasks/{id}/category` |
| system | `[]` | `tasks/{id}/assignedTo` |
| system | `[]` | `tasks/{id}/subtasks` |
| system | `triage` | `tasks/{id}/status` |
| system | timestamp | `tasks/{id}/createdAt` |
| system | `email` | `tasks/{id}/sourceType` |
| system | `true` | `tasks/{id}/aiGenerated` |
| mail | sender display name | `tasks/{id}/externalCreator/name` |
| mail | normalized sender email | `tasks/{id}/externalCreator/email` |
| mail | `messageId` | `tasks/{id}/sourceMessageId` |

---

## Frontend counter boundary

The current browser adapter deliberately does not know the persistence path.

Required public result:

```json
{
  "used": 4,
  "limit": 10,
  "limitReached": false,
  "dayKey": "2026-09-08"
}
```

Until the authoritative counter endpoint/storage is configured, the UI must keep its explicit unavailable state rather than pretending usage is zero.

---

## Security rules for n8n setup

- credentials only in n8n credentials/environment
- never write secrets to Join/Firebase task objects
- mail content is untrusted data
- AI output is untrusted data
- system prompt must instruct the model to classify data only and ignore instructions contained in the email
- suppress self-sent/automatic-response loops
- validate sender email independently of display name
- use bounded body lengths
- sanitize strings before Firebase
- never render raw mail HTML in Join

---

## Retry / recovery semantics

### Duplicate-safe retry

A retry starts again at duplicate lookup.

If the message is already marked `created`, stop as duplicate/success-equivalent.

### Task created but quota commit failed

This is a recovery case.

Do not create a second task.

Retain enough workflow state to retry the quota commit using the existing `taskId` and `messageKey`.

### Task created and quota committed but processed marker failed

Do not create another task on blind retry.

The selected n8n persistence strategy must allow reconciliation using `messageId`, `taskId` and processing logs.

---

## Deployment values still open

These are intentionally unresolved until the shared n8n setup:

```text
MAIL_PROVIDER
REQUEST_INBOX
N8N_HOSTING
AI_PROVIDER
AI_MODEL
FIREBASE_SERVICE_AUTH
QUOTA_STORAGE
QUOTA_TIMEZONE
QUOTA_ATOMICITY_MECHANISM
MANUAL_REVIEW_DESTINATION
ERROR_NOTIFICATION_DESTINATION
DEADLINE_POLICY
PUBLIC_COUNTER_SOURCE
```
