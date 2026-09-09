import { ImapFlow } from "imapflow";

const ALLOWED_TARGETS = new Set(["erledigt", "zu bearbeiten"]);

/** Returns one required Edge Function secret. */
function getSecret(name: string): string {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new Error(`Missing secret: ${name}`);
  return value;
}

/** Creates a JSON response. */
function json(body: unknown, status = 200): Response {
  return Response.json(body, { status });
}

/** Verifies the private n8n-to-function shared secret. */
function isAuthorized(request: Request): boolean {
  const expected = getSecret("ISSUE_MAIL_MOVE_SECRET");
  return request.headers.get("x-issue-collector-secret") === expected;
}

/** Validates the n8n request payload. */
function parsePayload(value: unknown): { uid: number; targetFolder: string } {
  if (!value || typeof value !== "object") throw new Error("Invalid JSON body");
  const body = value as Record<string, unknown>;
  const uid = Number(body.uid);
  const targetFolder = String(body.targetFolder ?? "").trim();
  if (!Number.isInteger(uid) || uid <= 0) throw new Error("Invalid IMAP uid");
  if (!ALLOWED_TARGETS.has(targetFolder)) throw new Error("Invalid targetFolder");
  return { uid, targetFolder };
}

/** Creates the target folder when it is not present yet. */
async function ensureMailbox(client: ImapFlow, path: string): Promise<void> {
  const mailboxes = await client.list();
  if (mailboxes.some((mailbox) => mailbox.path === path)) return;
  await client.mailboxCreate(path);
}

/** Moves one original INBOX message by IMAP UID. */
async function moveMessage(uid: number, targetFolder: string): Promise<void> {
  const client = new ImapFlow({
    host: getSecret("ISSUE_MAIL_HOST"),
    port: Number(getSecret("ISSUE_MAIL_PORT")),
    secure: true,
    auth: {
      user: getSecret("ISSUE_MAIL_USER"),
      pass: getSecret("ISSUE_MAIL_PASSWORD"),
    },
    logger: false,
  });

  await client.connect();
  try {
    await ensureMailbox(client, targetFolder);
    const lock = await client.getMailboxLock("INBOX");
    try {
      const moved = await client.messageMove(uid, targetFolder, { uid: true });
      if (!moved) throw new Error(`Message UID ${uid} was not moved`);
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
}

/** Handles one authenticated move request from n8n. */
async function handleRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);
  if (!isAuthorized(request)) return json({ ok: false, error: "Unauthorized" }, 401);
  const payload = parsePayload(await request.json());
  await moveMessage(payload.uid, payload.targetFolder);
  return json({ ok: true, ...payload });
}

Deno.serve(async (request) => {
  try {
    return await handleRequest(request);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("move-mail failed:", message);
    return json({ ok: false, error: message }, 400);
  }
});
