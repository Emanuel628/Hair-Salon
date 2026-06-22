document.querySelectorAll("[data-admin-page]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.adminPage;

    document.querySelectorAll("[data-admin-page]").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.adminPage === target);
      item.setAttribute("aria-pressed", String(item.dataset.adminPage === target));
    });

    document.querySelectorAll("[data-admin-content]").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.adminContent === target);
    });
  });
});

const adminForm = document.querySelector("[data-admin-form]");
const saveStatus = document.querySelector("[data-save-status]");

if (adminForm && saveStatus) {
  adminForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveStatus.textContent = "Saved";
    saveStatus.classList.add("is-saved");
  });
}
