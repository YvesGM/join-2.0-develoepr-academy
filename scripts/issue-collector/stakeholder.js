/** Functional stakeholder request-page behavior. */
(() => {
  document.addEventListener("DOMContentLoaded", initStakeholderPage);

  /** Initializes the stakeholder counter state and email action. */
  async function initStakeholderPage() {
    bindEmailAction();
    const counter = await window.issueCollectorCounter.loadRequestCounter();
    renderCounter(counter);
  }

  /** Renders counter values and delegates the matching page state. */
  function renderCounter(counter) {
    setText("request-counter-value", counter.used === null ? "—" : counter.used);
    setText("request-counter-limit", counter.limit);
    renderCounterState(resolveCounterState(counter));
  }

  /** Resolves the explicit stakeholder counter UI state. */
  function resolveCounterState(counter) {
    if (counter.limitReached === null) return "unavailable";
    return counter.limitReached ? "reached" : "available";
  }

  /** Applies one counter state without duplicating stakeholder markup. */
  function renderCounterState(state) {
    toggleCopy("request-normal-copy", state !== "available");
    toggleCopy("request-limit-copy", state !== "reached");
    toggleCopy("request-unavailable-copy", state !== "unavailable");
    document.body.dataset.requestState = state;
    setCtaLabel(state === "reached");
  }

  /** Updates one text node when it exists. */
  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = String(value);
  }

  /** Toggles one stakeholder copy block. */
  function toggleCopy(id, hidden) {
    document.getElementById(id)?.toggleAttribute("hidden", hidden);
  }

  /** Keeps the reached-state CTA wording aligned with the design. */
  function setCtaLabel(limitReached) {
    const button = document.getElementById("create-email-request");
    if (button) button.textContent = limitReached ? "Send an email" : "Create Email Request";
  }

  /** Binds the mail-client CTA to the configured public inbox address. */
  function bindEmailAction() {
    const button = document.getElementById("create-email-request");
    if (!button) return;
    const recipient = window.issueCollectorPublicConfig?.requestEmail || "";
    button.disabled = !isValidEmail(recipient);
    button.addEventListener("click", () => openMailClient(recipient));
  }

  /** Opens the user's default mail client for the validated recipient. */
  function openMailClient(recipient) {
    if (isValidEmail(recipient)) window.location.href = `mailto:${recipient}`;
  }

  /** Performs bounded validation for the public recipient address. */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
  }
})();
