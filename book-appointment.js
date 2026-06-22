const SERVICE_OPTIONS = {
  Hair: ["Haircut", "Color", "Balayage", "Blowout", "Extensions", "Treatments"],
  Nails: ["Classic Manicure", "Gel Manicure", "Pedicure", "Nail Art"],
  Massage: ["Swedish Massage", "Deep Tissue Massage", "Scalp Massage", "Hot Stone Massage"],
  Brows: ["Brow Shaping", "Brow Tint", "Brow Lamination"],
  Lashes: ["Lash Lift", "Lash Tint", "Classic Lash Extensions"],
  Bridal: ["Bridal Hair", "Bridal Trial", "Bridal Party Styling"]
};

const categorySelect = document.querySelector("[data-category-select]");
const serviceSelect = document.querySelector("[data-service-select]");
const timeSelect = document.querySelector("[data-time-select]");
const bookingForm = document.querySelector("[data-booking-form]");
const bookingStatus = document.querySelector("[data-booking-status]");

function normalizeServiceName(value = "") {
  return value.trim().toLowerCase().replace(/[-_]+/g, " ");
}

function findCategoryForService(serviceName) {
  const normalized = normalizeServiceName(serviceName);
  return Object.entries(SERVICE_OPTIONS).find(([, services]) =>
    services.some((service) => normalizeServiceName(service) === normalized)
  )?.[0];
}

function setOptions(select, values, placeholder) {
  if (!select) return;

  select.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = placeholder;
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  select.appendChild(placeholderOption);

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function populateCategories() {
  setOptions(categorySelect, Object.keys(SERVICE_OPTIONS), "Choose a category");
}

function populateServices(category, selectedService = "") {
  const services = SERVICE_OPTIONS[category] || [];
  setOptions(serviceSelect, services, category ? "Choose a service" : "Choose a category first");

  if (selectedService && services.includes(selectedService)) {
    serviceSelect.value = selectedService;
  }
}

function formatTime(hour, minute) {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

function populateTimes() {
  const times = [];

  for (let hour = 9; hour <= 18; hour += 1) {
    for (let minute = 0; minute < 60; minute += 15) {
      if (hour === 18 && minute > 0) continue;
      times.push(formatTime(hour, minute));
    }
  }

  setOptions(timeSelect, times, "Choose a time");
}

function applyQueryDefaults() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const service = params.get("service");

  if (category && SERVICE_OPTIONS[category]) {
    categorySelect.value = category;
    populateServices(category, service || "");
    return;
  }

  if (service) {
    const matchedCategory = findCategoryForService(service);
    if (matchedCategory) {
      categorySelect.value = matchedCategory;
      populateServices(matchedCategory, SERVICE_OPTIONS[matchedCategory].find((item) => normalizeServiceName(item) === normalizeServiceName(service)) || "");
    }
  }
}

populateCategories();
populateServices("");
populateTimes();
applyQueryDefaults();

categorySelect?.addEventListener("change", () => {
  populateServices(categorySelect.value);
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (bookingStatus) {
    bookingStatus.textContent = "Appointment request ready";
    bookingStatus.classList.add("is-ready");
  }
});
