/**
 * Shared Issue Collector domain helpers.
 * Keeps additive email-task metadata independent from board status.
 */
(function registerIssueCollectorDomain() {
  const TASK_SOURCE_EMAIL = "email";
  const TRIAGE_STATUS = "triage";
  const DAILY_REQUEST_LIMIT = 10;
  const MAX_CREATOR_NAME_LENGTH = 120;
  const MAX_MESSAGE_ID_LENGTH = 512;

  /** Returns normalized additive metadata from a task. */
  function getIssueCollectorTaskMetadata(task) {
    const creator = normalizeExternalCreator(task?.externalCreator);
    return {
      sourceType: task?.sourceType === TASK_SOURCE_EMAIL ? TASK_SOURCE_EMAIL : "",
      aiGenerated: task?.aiGenerated === true,
      externalCreator: creator,
      sourceMessageId: normalizeMessageId(task?.sourceMessageId),
    };
  }

  /** Normalizes an external creator without creating a Join contact. */
  function normalizeExternalCreator(creator) {
    if (!creator || typeof creator !== "object") return null;
    const name = normalizeText(creator.name, MAX_CREATOR_NAME_LENGTH);
    const email = normalizeEmail(creator.email);
    return name || email ? { name, email } : null;
  }

  /** Returns a conservative normalized email address or an empty string. */
  function normalizeEmail(value) {
    const email = normalizeText(value, 254).toLowerCase();
    return isValidEmail(email) ? email : "";
  }

  /** Validates the email subset supported by mailto rendering and quota identity. */
  function isValidEmail(value) {
    return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value);
  }

  /** Normalizes a provider message ID while keeping it opaque. */
  function normalizeMessageId(value) {
    return normalizeText(value, MAX_MESSAGE_ID_LENGTH);
  }

  /** Converts external scalar input to bounded printable text. */
  function normalizeText(value, maxLength) {
    if (typeof value !== "string") return "";
    return stripControlCharacters(value).trim().slice(0, maxLength);
  }

  /** Removes control characters that have no valid UI purpose. */
  function stripControlCharacters(value) {
    return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  }

  window.issueCollectorDomain = Object.freeze({
    TASK_SOURCE_EMAIL,
    TRIAGE_STATUS,
    DAILY_REQUEST_LIMIT,
    getIssueCollectorTaskMetadata,
    isValidEmail,
  });
})();
