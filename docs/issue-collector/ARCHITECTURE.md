# Architecture Reference

```text
Stakeholder UI
    ↓
Email client
    ↓
Inbox
    ↓
n8n
    ↓
Normalize / Validate / Deduplicate
    ↓
Daily Limit
    ├─ reached → Manual Review
    └─ available
          ↓
        AI Agent
          ↓
      Structured Output
          ↓
      Validation / Sanitization
          ↓
      Join Task Mapping
          ↓
Firebase Realtime Database
          ↓
Existing Join Board
          ↓
Triage
```

AI-generated tasks remain normal Join tasks plus minimal additive metadata.

They must keep their AI-generated marker after leaving Triage.
