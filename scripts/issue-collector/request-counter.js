/**
 * Provider-neutral daily request-counter adapter.
 * The authoritative data source is connected later with n8n/Firebase.
 */
(function registerIssueCollectorCounter() {
  const limit = window.issueCollectorDomain?.DAILY_REQUEST_LIMIT || 10;

  /** Loads the current counter from an optional authoritative provider. */
  async function loadRequestCounter() {
    const provider = window.issueCollectorCounterProvider;
    if (typeof provider !== "function") return unavailableCounter();
    try {
      return normalizeCounter(await provider(), limit);
    } catch (error) {
      console.error("Issue Collector counter unavailable:", error);
      return unavailableCounter();
    }
  }

  /** Normalizes provider data without converting unknown state into zero. */
  function normalizeCounter(value, fallbackLimit) {
    const used = Number.isInteger(value?.used) && value.used >= 0 ? value.used : null;
    const safeLimit = Number.isInteger(value?.limit) && value.limit > 0 ? value.limit : fallbackLimit;
    return { used, limit: safeLimit, limitReached: used === null ? null : used >= safeLimit, dayKey: value?.dayKey || null };
  }

  /** Returns an explicit unavailable counter state. */
  function unavailableCounter() {
    return { used: null, limit, limitReached: null, dayKey: null };
  }

  window.issueCollectorCounter = Object.freeze({ loadRequestCounter });
})();
