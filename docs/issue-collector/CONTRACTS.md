# Issue Collector Contracts

## Status
Defined in PHASE-02. Provider-specific infrastructure remains intentionally configurable.

## Existing Join enums

```text
category: user-story | technical-task
priority: urgent | medium | low
status: triage | todo | in-progress | await-feedback | done
```

`triage` is the only new task status. Manual task creation keeps its existing defaults.

## Additive task metadata

AI-generated email tasks extend the existing Join task object with only these fields:

```js
{
  sourceType: "email",
  aiGenerated: true,
  externalCreator: {
    name: string,
    email: string
  },
  sourceMessageId: string
}
```

Rules:
- existing task fields remain authoritative and unchanged,
- `sourceType` and `aiGenerated` are deterministic mapper values,
- `externalCreator` comes from normalized mail metadata, not AI output,
- `sourceMessageId` comes from the normalized provider message identity,
- no contact/user record is created for an external sender.

## Normalized incoming mail

```js
{
  messageId: string,
  senderEmail: string,
  senderDisplayName: string,
  subject: string,
  plainTextBody: string,
  receivedAt: number
}
```

Required before AI:
- messageId,
- senderEmail,
- subject or non-empty plainTextBody,
- receivedAt.

HTML mail must be normalized to safe text before the AI call. Missing stable message
identity routes to manual review rather than creating a non-idempotent ticket.

## AI structured output

```js
{
  title: string,
  description: string,
  category: "user-story" | "technical-task",
  priority: "urgent" | "medium" | "low",
  dueDate: "YYYY-MM-DD"
}
```

The AI must not return or control:
- task ID,
- status,
- createdAt,
- sourceType,
- aiGenerated,
- sourceMessageId,
- request counters,
- Firebase paths,
- credentials.

Invalid or incomplete structured output routes to manual review. No default deadline is
invented by the frontend.

## Join task mapper

The n8n mapping target is the existing task schema plus the additive metadata:

```js
{
  title,
  description,
  dueDate,
  priority,
  category,
  assignedTo: [],
  subtasks: [],
  status: "triage",
  createdAt,
  sourceType: "email",
  aiGenerated: true,
  externalCreator: { name, email },
  sourceMessageId
}
```

`assignedTo` starts empty unless a later Academy requirement explicitly defines an
automatic assignee rule.

## AI marker behavior

`aiGenerated === true` is provenance, not a status. It must remain true after moving a
task out of Triage and must survive cache, edit and subtask updates.

## External creator behavior

The external creator is displayed separately from `assignedTo`. The sender email may be
used to construct a validated `mailto:` action. It must never create a synthetic Join
profile or contact record.

## Summary Email requests metric

Until Academy evidence says otherwise, the project-side metric is defined as the number
of current Join tasks where both are true:

```text
sourceType === "email"
aiGenerated === true
```

It is independent of current board status, so moving an email task out of Triage does not
remove it from `Email requests`. Deleting the task removes it from the current metric.

This Summary metric is separate from the stakeholder 10/day quota counter.

## Stakeholder daily-counter interface

Frontend consumers depend on an adapter, not a Firebase path:

```js
{
  used: number | null,
  limit: 10,
  limitReached: boolean | null,
  dayKey: string | null
}
```

`used: null` means the authoritative counter source is not connected/available. The
frontend must not silently convert unknown state into zero.

Authoritative storage, authentication, timezone and race-safe increment semantics are
n8n/Firebase setup decisions and must not be guessed in browser code.

## Quota processing order

```text
normalize mail
→ validate required identity
→ duplicate check
→ authoritative daily-limit check
→ AI only if capacity is available
→ validate AI output
→ create Firebase task
→ commit quota consumption
→ mark message processed
```

The final implementation must make quota consumption and idempotency race-safe. A failed
retry must never create a duplicate task.

## Manual review payload

```js
{
  reason: string,
  messageId: string | null,
  senderEmail: string | null,
  receivedAt: number | null,
  subject: string,
  normalizedBody: string,
  failureStage: string
}
```

Destination/storage remains an n8n setup decision. No new browser backoffice is required.

## Processing result / error payload

```js
{
  status: "created" | "duplicate" | "limit_reached" | "manual_review" | "failed",
  stage: string,
  messageId: string | null,
  taskId: string | null,
  occurredAt: number,
  errorCode: string | null
}
```

Do not log full sensitive mail content unless required for the defined manual-review path.

## Provider-neutral open setup values

Still configured with n8n later:
- inbox/provider and recipient address,
- n8n hosting,
- AI provider/model,
- Firebase service authentication,
- authoritative quota storage and timezone,
- manual-review destination,
- retry/error notifications,
- exact AI deadline prompt/rule.
