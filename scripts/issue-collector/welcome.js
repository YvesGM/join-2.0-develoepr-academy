/** Handles the public role-selection entry on the existing login page. */
(function setupIssueCollectorWelcome() {
  document.addEventListener("DOMContentLoaded", initRoleSelection);

  /** Connects role-selection controls without changing the existing login logic. */
  function initRoleSelection() {
    document.body.classList.add("issue-welcome-active");
    document.getElementById("stakeholder-entry")?.addEventListener("click", openStakeholder);
    document.getElementById("member-entry")?.addEventListener("click", showMemberLogin);
  }

  /** Opens the public stakeholder request page. */
  function openStakeholder() {
    window.location.href = "./sites/stakeholder.html";
  }

  /** Reveals the unchanged existing member/guest login card. */
  function showMemberLogin() {
    document.body.classList.remove("issue-welcome-active");
    document.getElementById("role-selection")?.setAttribute("hidden", "");
    document.getElementById("login-card")?.removeAttribute("hidden");
    document.querySelector('.login-form input[name="email"]')?.focus();
  }
})();
