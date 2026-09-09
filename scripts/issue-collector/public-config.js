/**
 * Public Issue Collector configuration.
 * Values are intentionally non-secret and are filled during integration setup.
 */
window.issueCollectorPublicConfig = Object.freeze({
  requestEmail: "info@schniefs-portfolio.de",
  counterEndpoint: "https://schnief.app.n8n.cloud/webhook/issue-collector-counter",
  statusWebhookEndpoint: "https://schnief.app.n8n.cloud/webhook/join-task-status-changed",
});
