/**
 * Shared Issue Collector domain helpers.
 * Keeps additive email-task metadata independent from board status.
 */
(function registerIssueCollectorDomain() {
  const TASK_SOURCE_EMAIL = "email";
  const TRIAGE_STATUS = "triage";
  const DAILY_REQUEST_LIMIT = 10;

  /** Returns normalized additive metadata from a task. */
  function getIssueCollectorTaskMetadata(task) {
    const creator = normalizeExternalCreator(task?.externalCreator);
    return {
      sourceType: task?.sourceType === TASK_SOURCE_EMAIL ? TASK_SOURCE_EMAIL : "",
      aiGenerated: task?.aiGenerated === true,
      externalCreator: creator,
      sourceMessageId: normalizeString(task?.sourceMessageId),
    };
  }

  /** Normalizes an external creator without creating a Join contact. */
  function normalizeExternalCreator(creator) {
    if (!creator || typeof creator !== "object") return null;
    const name = normalizeString(creator.name);
    const email = normalizeString(creator.email).toLowerCase();
    return name || email ? { name, email } : null;
  }

  /** Converts unknown scalar input to a trimmed string. */
  function normalizeString(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  window.issueCollectorDomain = Object.freeze({
    TASK_SOURCE_EMAIL,
    TRIAGE_STATUS,
    DAILY_REQUEST_LIMIT,
    getIssueCollectorTaskMetadata,
  });
})();
