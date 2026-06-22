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

function renumberLinkRows(list) {
  list.querySelectorAll(".link-row").forEach((row, index) => {
    const labelInput = row.querySelector("[data-link-label]");
    const urlInput = row.querySelector("[data-link-url]");
    const labelField = row.querySelector("label[for^='header-link-label']");
    const urlField = row.querySelector("label[for^='header-link-url']");
    const newNumber = index + 1;

    if (labelInput) {
      labelInput.id = `header-link-label-${newNumber}`;
      labelInput.name = `headerLinkLabel${newNumber}`;
    }

    if (urlInput) {
      urlInput.id = `header-link-url-${newNumber}`;
      urlInput.name = `headerLinkUrl${newNumber}`;
    }

    if (labelField) {
      labelField.setAttribute("for", `header-link-label-${newNumber}`);
      labelField.textContent = `Label ${newNumber}`;
    }

    if (urlField) {
      urlField.setAttribute("for", `header-link-url-${newNumber}`);
      urlField.textContent = `Link ${newNumber}`;
    }
  });
}

function updateHeaderLinkLimit() {
  const list = document.querySelector("[data-header-link-list]");
  const counter = document.querySelector("[data-header-link-count]");
  const addButton = document.querySelector("[data-add-header-link]");

  if (!list) return;

  const count = list.querySelectorAll(".link-row").length;

  if (counter) {
    counter.textContent = `${count}/12 header links`;
  }

  if (addButton) {
    addButton.disabled = count >= 12;
    addButton.textContent = count >= 12 ? "Header Link Limit Reached" : "Add Header Link";
  }
}

function createHeaderLinkRow() {
  const list = document.querySelector("[data-header-link-list]");
  if (!list) return;

  const count = list.querySelectorAll(".link-row").length;
  if (count >= 12) return;

  const nextNumber = count + 1;
  const row = document.createElement("div");
  row.className = "link-row";
  row.innerHTML = `
    <div class="admin-field">
      <label for="header-link-label-${nextNumber}">Label ${nextNumber}</label>
      <input id="header-link-label-${nextNumber}" name="headerLinkLabel${nextNumber}" type="text" value="New Link" data-link-label />
    </div>
    <div class="admin-field">
      <label for="header-link-url-${nextNumber}">Link ${nextNumber}</label>
      <input id="header-link-url-${nextNumber}" name="headerLinkUrl${nextNumber}" type="text" value="#" data-link-url />
    </div>
    <button class="button button--ghost" type="button" data-remove-header-link>Remove</button>
  `;

  list.appendChild(row);
  updateHeaderLinkLimit();
}

document.querySelector("[data-add-header-link]")?.addEventListener("click", createHeaderLinkRow);

document.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-header-link]");
  if (!removeButton) return;

  const list = document.querySelector("[data-header-link-list]");
  const row = removeButton.closest(".link-row");

  if (row && list) {
    row.remove();
    renumberLinkRows(list);
    updateHeaderLinkLimit();
  }
});

updateHeaderLinkLimit();

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
