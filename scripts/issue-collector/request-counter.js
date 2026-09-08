/**
 * Provider-neutral daily request-counter adapter.
 * Uses an injected provider or the configured public counter endpoint.
 */
(function registerIssueCollectorCounter() {
  const limit = window.issueCollectorDomain?.DAILY_REQUEST_LIMIT || 10;

  /** Loads the current counter from the configured authoritative provider. */
  async function loadRequestCounter() {
    const provider = resolveProvider();
    if (!provider) return unavailableCounter();
    try {
      return normalizeCounter(await provider(), limit);
    } catch (error) {
      console.error("Issue Collector counter unavailable:", error);
      return unavailableCounter();
    }
  }

  /** Resolves an injected provider before falling back to the public endpoint. */
  function resolveProvider() {
    if (typeof window.issueCollectorCounterProvider === "function") {
      return window.issueCollectorCounterProvider;
    }
    const endpoint = window.issueCollectorPublicConfig?.counterEndpoint || "";
    return isHttpUrl(endpoint) ? () => fetchCounter(endpoint) : null;
  }

  /** Reads the public counter JSON without browser caching. */
  async function fetchCounter(endpoint) {
    const response = await fetch(endpoint, { headers: { Accept: "application/json" }, cache: "no-store" });
    if (!response.ok) throw new Error(`Counter request failed (${response.status})`);
    return response.json();
  }

  /** Accepts only absolute HTTP(S) counter endpoints. */
  function isHttpUrl(value) {
    try {
      return ["http:", "https:"].includes(new URL(value).protocol);
    } catch {
      return false;
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
