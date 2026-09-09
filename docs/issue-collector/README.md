# Issue Collector documentation

The Issue Collector extends Join with an email-driven AI intake workflow.

Start here:

- `ARCHITECTURE.md` – system overview
- `CONTRACTS.md` – Join-side contracts
- `N8N-CONTRACTS.md` – n8n payload and processing contracts
- `MAILBOX-MOVE.md` – final `erledigt` / `zu bearbeiten` mailbox wiring
- `SECURITY-VALIDATION.md` – final security checks
- `HOME-SETUP-GUIDE.md` – historical setup reference

The current implementation uses Firebase for Join application data, Supabase for automation state/quota and the mailbox Edge Function, and n8n for orchestration.
