document.querySelectorAll("[data-admin-page]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.adminPage;

    document.querySelectorAll("[data-admin-page]").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.adminPage === target);
      item.setAttribute("aria-pressed", String(item.datasetPage === target));
    });

    document.querySelectorAll("[data-admin-content]").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.adminContent === target);
    });
  });
});

const headerActions = document.querySelector(".admin-header__actions");
const adminForm = document.querySelector("[data-admin-form]") || document.querySelector(".admin-panel form");
const saveStatus = document.querySelector("[data-save-status]") || document.querySelector(".admin-status-pill");
const saveButton = document.querySelector(".admin-actions button[type='submit']");

if (headerActions) {
  headerActions.remove();
}

if (saveButton) {
  saveButton.textContent = "Save";
}

if (adminForm && saveStatus) {
  adminForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveStatus.textContent = "Saved";
    saveStatus.classList.add("is-saved");
    saveStatus.style.color = "#246b3d";
    saveStatus.style.background = "#dff4e6";
    saveStatus.style.border = "1px solid rgba(36, 107, 61, 0.18)";
  });
}
