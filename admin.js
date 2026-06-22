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
