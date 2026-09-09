/**
 * @category Board
 * @file taskboard-status-notifications.js
 * Best-effort n8n notifications for task status changes.
 */

/** Sends a status-change notification without blocking board persistence. */
async function notifyTaskStatusChange(taskId, oldStatus, newStatus) {
    const endpoint = window.issueCollectorPublicConfig?.statusWebhookEndpoint;
    const task = boardTaskCache[taskId];
    const creator = resolveNotificationCreator(task);
    if (!endpoint || !creator?.email) return;
    try { await postStatusChange(endpoint, taskId, task, creator, oldStatus, newStatus); }
    catch (error) { console.warn('Status notification failed:', error); }
}

/** Resolves an internal or external creator with a usable email address. */
function resolveNotificationCreator(task) {
    if (task?.aiGenerated && task.externalCreator?.email) return task.externalCreator;
    return task?.creator?.type === 'internal' ? task.creator : null;
}

/** Posts the status-change contract to n8n. */
function postStatusChange(endpoint, taskId, task, creator, oldStatus, newStatus) {
    return fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildStatusPayload(taskId, task, creator, oldStatus, newStatus))
    });
}

/** Builds the status-change payload consumed by n8n. */
function buildStatusPayload(taskId, task, creator, oldStatus, newStatus) {
    return { taskId, title: task?.title || '', oldStatus, newStatus,
        creatorEmail: creator.email || '', creatorName: creator.name || '',
        creatorType: task?.aiGenerated ? 'external' : 'internal' };
}
