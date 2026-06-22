const headerActions = document.querySelector(".admin-header__actions");
const adminForm = document.querySelector("[data-admin-form]") || document.querySelector(".admin-panel form");
const saveStatus = document.querySelector("[data-save-status]") || document.querySelector(".admin-status-pill");
const saveButton = document.querySelector(".admin-actions button[type='submit']");

const DEFAULT_BOOKING_CATEGORIES = [
  { label: "Hair", services: ["Haircut", "Color", "Balayage", "Blowout", "Extensions", "Treatments"] },
  { label: "Nails", services: ["Classic Manicure", "Gel Manicure", "Pedicure", "Nail Art"] },
  { label: "Massage", services: ["Swedish Massage", "Deep Tissue Massage", "Scalp Massage", "Hot Stone Massage"] },
  { label: "Brows", services: ["Brow Shaping", "Brow Tint", "Brow Lamination"] },
  { label: "Lashes", services: ["Lash Lift", "Lash Tint", "Classic Lash Extensions"] },
  { label: "Bridal", services: ["Bridal Hair", "Bridal Trial", "Bridal Party Styling"] }
];

const DEFAULT_HOURS = [
  ["Monday", "9:00 AM", "6:00 PM", false],
  ["Tuesday", "9:00 AM", "6:00 PM", false],
  ["Wednesday", "9:00 AM", "6:00 PM", false],
  ["Thursday", "9:00 AM", "7:00 PM", false],
  ["Friday", "9:00 AM", "7:00 PM", false],
  ["Saturday", "10:00 AM", "4:00 PM", false],
  ["Sunday", "9:00 AM", "6:00 PM", true]
];

if (headerActions) {
  headerActions.remove();
}

if (saveButton) {
  saveButton.textContent = "Save";
}

function formatTime(hour, minute) {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

function buildTimeOptions(selectedTime) {
  let options = "";

  for (let hour = 6; hour <= 22; hour += 1) {
    for (let minute = 0; minute < 60; minute += 15) {
      if (hour === 22 && minute > 0) continue;
      const value = formatTime(hour, minute);
      options += `<option value="${value}" ${value === selectedTime ? "selected" : ""}>${value}</option>`;
    }
  }

  return options;
}

function createServiceRow(serviceLabel = "New Service") {
  const row = document.createElement("div");
  row.className = "service-option-row";
  row.innerHTML = `
    <div class="admin-field">
      <label>Service option</label>
      <input type="text" value="${serviceLabel}" data-service-option-input />
    </div>
    <button class="button button--ghost" type="button" data-remove-service-option>Remove</button>
  `;
  return row;
}

function createCategoryCard(category = { label: "New Category", services: ["New Service"] }) {
  const card = document.createElement("article");
  card.className = "booking-category-card";
  card.innerHTML = `
    <div class="booking-category-card__top">
      <div class="admin-field">
        <label>Dropdown category</label>
        <input type="text" value="${category.label}" data-booking-category-input />
      </div>
      <button class="button button--ghost" type="button" data-remove-booking-category>Remove Category</button>
    </div>
    <div class="service-option-list" data-service-option-list></div>
    <button class="button button--ghost link-editor__add" type="button" data-add-service-option>Add Service Option</button>
  `;

  const list = card.querySelector("[data-service-option-list]");
  category.services.forEach((service) => list.appendChild(createServiceRow(service)));

  return card;
}

function createHoursRow(day, openTime, closeTime, isClosed) {
  const row = document.createElement("div");
  row.className = "hours-row";
  row.innerHTML = `
    <div>
      <p class="hours-row__day">${day}</p>
      <label class="hours-closed-toggle">
        <input type="checkbox" ${isClosed ? "checked" : ""} data-closed-day />
        Closed
      </label>
    </div>
    <div class="admin-field">
      <label>${day} open</label>
      <select data-open-time>${buildTimeOptions(openTime)}</select>
    </div>
    <div class="admin-field">
      <label>${day} close</label>
      <select data-close-time>${buildTimeOptions(closeTime)}</select>
    </div>
    <span class="link-row__locked-pill">Hours</span>
  `;
  return row;
}

function ensureBookingAdminSection() {
  const pageList = document.querySelector(".admin-page-list");
  const actions = document.querySelector(".admin-actions");

  if (pageList && !pageList.querySelector('[data-admin-page="booking"]')) {
    const bookingButton = document.createElement("button");
    bookingButton.className = "admin-page-link";
    bookingButton.type = "button";
    bookingButton.dataset.adminPage = "booking";
    bookingButton.setAttribute("aria-pressed", "false");
    bookingButton.innerHTML = `<span>Booking</span><span aria-hidden="true">06</span>`;

    const footerButton = pageList.querySelector('[data-admin-page="footer"]');
    pageList.insertBefore(bookingButton, footerButton || null);
  }

  if (actions && !document.querySelector('[data-admin-content="booking"]')) {
    const panel = document.createElement("div");
    panel.className = "admin-content-page";
    panel.dataset.adminContent = "booking";
    panel.innerHTML = `
      <section class="admin-section">
        <h2>Book appointment page</h2>
        <p class="admin-section__copy">
          Edit the appointment page words, dropdown menu options, and salon hours that control available appointment times.
        </p>
        <div class="admin-form-grid">
          <div class="admin-field">
            <label for="booking-page-kicker">Page kicker</label>
            <input id="booking-page-kicker" name="bookingPageKicker" type="text" value="Book Appointment" />
          </div>
          <div class="admin-field">
            <label for="booking-page-title">Page title</label>
            <input id="booking-page-title" name="bookingPageTitle" type="text" value="Let’s get you scheduled." />
          </div>
          <div class="admin-field admin-field--full">
            <label for="booking-page-copy">Page text</label>
            <textarea id="booking-page-copy" name="bookingPageCopy">Choose a category, pick the service that fits, then select a time in clean 15-minute increments.</textarea>
          </div>
        </div>
      </section>

      <section class="admin-section">
        <h2>Booking dropdown menus</h2>
        <p class="admin-section__copy">
          The first dropdown uses categories. The second dropdown updates based on the category selected by the client.
        </p>
        <div class="booking-menu-builder">
          <button class="button button--ghost link-editor__add" type="button" data-add-booking-category>Add Category</button>
          <div class="booking-menu-builder" data-booking-category-list></div>
        </div>
      </section>

      <section class="admin-section">
        <h2>Business hours</h2>
        <p class="admin-section__copy">
          Set the salon’s weekly hours. The appointment time box will use these hours and stay in 15-minute increments unless changed later.
        </p>
        <div class="admin-form-grid">
          <div class="admin-field admin-field--full">
            <label for="booking-time-increment">Appointment time increments</label>
            <select id="booking-time-increment" name="bookingTimeIncrement">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>60 minutes</option>
            </select>
          </div>
        </div>
        <div class="business-hours-editor" data-business-hours-list></div>
      </section>
    `;

    actions.parentNode.insertBefore(panel, actions);

    const categoryList = panel.querySelector("[data-booking-category-list]");
    DEFAULT_BOOKING_CATEGORIES.forEach((category) => categoryList.appendChild(createCategoryCard(category)));

    const hoursList = panel.querySelector("[data-business-hours-list]");
    DEFAULT_HOURS.forEach(([day, openTime, closeTime, isClosed]) => {
      hoursList.appendChild(createHoursRow(day, openTime, closeTime, isClosed));
    });
  }
}

function setAdminPage(target) {
  document.querySelectorAll("[data-admin-page]").forEach((item) => {
    const isActive = item.dataset.adminPage === target;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });

  document.querySelectorAll("[data-admin-content]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.adminContent === target);
  });
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

ensureBookingAdminSection();
updateHeaderLinkLimit();

document.addEventListener("click", (event) => {
  const adminPageButton = event.target.closest("[data-admin-page]");
  if (adminPageButton) {
    setAdminPage(adminPageButton.dataset.adminPage);
    return;
  }

  if (event.target.closest("[data-add-header-link]")) {
    createHeaderLinkRow();
    return;
  }

  const removeHeaderButton = event.target.closest("[data-remove-header-link]");
  if (removeHeaderButton) {
    const list = document.querySelector("[data-header-link-list]");
    const row = removeHeaderButton.closest(".link-row");

    if (row && list) {
      row.remove();
      renumberLinkRows(list);
      updateHeaderLinkLimit();
    }
    return;
  }

  if (event.target.closest("[data-add-booking-category]")) {
    document.querySelector("[data-booking-category-list]")?.appendChild(createCategoryCard());
    return;
  }

  const removeCategoryButton = event.target.closest("[data-remove-booking-category]");
  if (removeCategoryButton) {
    removeCategoryButton.closest(".booking-category-card")?.remove();
    return;
  }

  const addServiceButton = event.target.closest("[data-add-service-option]");
  if (addServiceButton) {
    addServiceButton.closest(".booking-category-card")?.querySelector("[data-service-option-list]")?.appendChild(createServiceRow());
    return;
  }

  const removeServiceButton = event.target.closest("[data-remove-service-option]");
  if (removeServiceButton) {
    removeServiceButton.closest(".service-option-row")?.remove();
  }
});

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
