const SERVICES = {
  cut: { title: "Cut", description: "A tailored cut shaped around your face, texture, and everyday routine.", bookingLabel: "Book a Haircut", bookingUrl: "/book-appointment/?category=Hair&service=Haircut", arcAngle: -90, armAngle: null, pointingMode: "connector" },
  color: { title: "Color", description: "Custom color designed for dimension, tone, and a finish that feels intentional.", bookingLabel: "Book Color", bookingUrl: "/book-appointment/?category=Hair&service=Color", arcAngle: -62, armAngle: -24, pointingMode: "arm" },
  balayage: { title: "Balayage", description: "Soft, dimensional color for a bright, natural finish.", bookingLabel: "Book Balayage", bookingUrl: "/book-appointment/?category=Hair&service=Balayage", arcAngle: -34, armAngle: -8, pointingMode: "arm" },
  blowout: { title: "Blowout", description: "Smooth, polished styling for everyday confidence or a special moment.", bookingLabel: "Book a Blowout", bookingUrl: "/book-appointment/?category=Hair&service=Blowout", arcAngle: -6, armAngle: 14, pointingMode: "arm" },
  extensions: { title: "Extensions", description: "Length, fullness, and shape added with a natural-looking finish.", bookingLabel: "Book Extensions", bookingUrl: "/book-appointment/?category=Hair&service=Extensions", arcAngle: 22, armAngle: 34, pointingMode: "arm" },
  bridal: { title: "Bridal Hair", description: "Elegant, lasting styles designed around the dress, the day, and the person wearing it.", bookingLabel: "Book Bridal Hair", bookingUrl: "/book-appointment/?category=Bridal&service=Bridal%20Hair", arcAngle: 50, armAngle: null, pointingMode: "connector" },
  treatments: { title: "Treatments", description: "Repair, moisture, shine, and strength for hair that needs extra care.", bookingLabel: "Book a Treatment", bookingUrl: "/book-appointment/?category=Hair&service=Treatments", arcAngle: 72, armAngle: null, pointingMode: "connector" }
};

const ARC_EQUATION = Object.freeze({
  centerX: 895,
  centerY: 612,
  radius: 377,
  canvasWidth: 1440,
  canvasHeight: 1024,
  headerHeight: 104,
  footerHeight: 48,
  visualStartPercent: 41.4,
  visualWidthPercent: 58.6
});

const SERVICE_ORDER = ["cut", "color", "balayage", "blowout", "extensions", "bridal", "treatments"];
const SAFE_ARM_RANGE = Object.freeze({ min: -42, max: 42 });
const NEUTRAL_ARM_ANGLE = -8;
const CALIBRATION_KEY = "studioSolModelCalibration";
const visualColumn = document.querySelector(".visual-column");
const prefersFineHover = window.matchMedia("(hover: hover) and (pointer: fine)");
let activeServiceId = "balayage";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function arcCanvasPoint(angleDeg) {
  const radians = angleDeg * Math.PI / 180;
  return {
    x: ARC_EQUATION.centerX + ARC_EQUATION.radius * Math.cos(radians),
    y: ARC_EQUATION.centerY + ARC_EQUATION.radius * Math.sin(radians)
  };
}

function arcPercentPoint(angleDeg) {
  const point = arcCanvasPoint(angleDeg);
  const visualStartX = ARC_EQUATION.canvasWidth * ARC_EQUATION.visualStartPercent / 100;
  const visualWidth = ARC_EQUATION.canvasWidth * ARC_EQUATION.visualWidthPercent / 100;
  const visualHeight = ARC_EQUATION.canvasHeight - ARC_EQUATION.headerHeight - ARC_EQUATION.footerHeight;

  return {
    x: ((point.x - visualStartX) / visualWidth) * 100,
    y: ((point.y - ARC_EQUATION.headerHeight) / visualHeight) * 100
  };
}

function getEquationTargets() {
  return SERVICE_ORDER.reduce((targets, serviceId) => {
    targets[serviceId] = arcPercentPoint(SERVICES[serviceId].arcAngle);
    return targets;
  }, {});
}

function applyArcEquation() {
  const targets = getEquationTargets();
  const arc = document.querySelector(".service-arc");
  const path = arc?.querySelector(".service-arc__path");
  const visualWidth = ARC_EQUATION.canvasWidth * ARC_EQUATION.visualWidthPercent / 100;
  const visualHeight = ARC_EQUATION.canvasHeight - ARC_EQUATION.headerHeight - ARC_EQUATION.footerHeight;
  const rx = ARC_EQUATION.radius / visualWidth * 100;
  const ry = ARC_EQUATION.radius / visualHeight * 100;
  const start = arcPercentPoint(SERVICES.cut.arcAngle);
  const end = arcPercentPoint(SERVICES.treatments.arcAngle);

  if (path) {
    path.setAttribute("d", `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${rx.toFixed(2)} ${ry.toFixed(2)} 0 0 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`);
    path.dataset.arcEquation = "(x - 895)^2 + (y - 612)^2 = 377^2";
  }

  if (arc) {
    arc.querySelectorAll("circle").forEach((circle) => circle.remove());
    SERVICE_ORDER.forEach((serviceId) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", targets[serviceId].x.toFixed(2));
      circle.setAttribute("cy", targets[serviceId].y.toFixed(2));
      circle.setAttribute("r", "0.5");
      circle.dataset.serviceArcTarget = serviceId;
      arc.appendChild(circle);
    });
  }

  Object.entries(targets).forEach(([serviceId, point]) => {
    document.querySelectorAll(`.service-node[data-service-id="${serviceId}"]`).forEach((node) => {
      node.style.setProperty("--x", `${point.x.toFixed(2)}%`);
      node.style.setProperty("--y", `${point.y.toFixed(2)}%`);
      node.dataset.arcEquation = "true";
    });
  });
}

function readCalibration() {
  try {
    return JSON.parse(localStorage.getItem(CALIBRATION_KEY) || "{}");
  } catch {
    return {};
  }
}

function getCalibratedAngle(serviceId) {
  const calibration = readCalibration();
  const angle = Number.parseFloat(calibration?.angles?.[serviceId]);
  return Number.isFinite(angle) ? angle : null;
}

function resolvePointing(service, serviceId) {
  const photoMode = visualColumn?.dataset.photoMode || "showcase";
  if (photoMode !== "showcase") return { mode: "connector", angle: NEUTRAL_ARM_ANGLE };

  const calibratedAngle = getCalibratedAngle(serviceId);
  if (Number.isFinite(calibratedAngle)) return { mode: "arm", angle: calibratedAngle };

  const rawAngle = Number.isFinite(service.armAngle) ? service.armAngle : service.arcAngle;
  const safeAngle = clamp(rawAngle, SAFE_ARM_RANGE.min, SAFE_ARM_RANGE.max);
  const canUseArm = service.pointingMode === "arm" && Number.isFinite(service.armAngle) && rawAngle === safeAngle;
  return { mode: canUseArm ? "arm" : "connector", angle: canUseArm ? safeAngle : NEUTRAL_ARM_ANGLE };
}

function updateServiceCards(service) {
  document.querySelectorAll("[data-service-title]").forEach((node) => { node.textContent = service.title; });
  document.querySelectorAll("[data-service-description]").forEach((node) => { node.textContent = service.description; });
  document.querySelectorAll("[data-service-cta]").forEach((link) => {
    link.href = service.bookingUrl;
    const label = link.querySelector("span:first-child");
    if (label) label.textContent = service.bookingLabel;
  });
}

function updateServiceNodes(serviceId) {
  document.querySelectorAll("[data-service-id]").forEach((node) => {
    const isActive = node.dataset.serviceId === serviceId;
    node.classList.toggle("service-node--active", isActive && node.classList.contains("service-node"));
    node.classList.toggle("mobile-node--active", isActive && node.classList.contains("mobile-node"));
    const button = node.querySelector("button");
    if (button) button.setAttribute("aria-pressed", String(isActive));
  });
}

function setActiveService(serviceId) {
  activeServiceId = serviceId;
  const service = SERVICES[serviceId] || SERVICES.balayage;
  const pointing = resolvePointing(service, serviceId);
  document.documentElement.dataset.activeService = serviceId;
  visualColumn.dataset.pointingMode = pointing.mode;
  visualColumn.style.setProperty("--arm-angle", `${pointing.angle}deg`);
  updateServiceCards(service);
  updateServiceNodes(serviceId);
}

function bindServiceNodes() {
  document.querySelectorAll("[data-service-id]").forEach((node) => {
    const serviceId = node.dataset.serviceId;
    const button = node.querySelector("button");
    if (!serviceId || !button) return;
    button.addEventListener("click", () => setActiveService(serviceId));
    button.addEventListener("focus", () => setActiveService(serviceId));
    if (prefersFineHover.matches) button.addEventListener("mouseenter", () => setActiveService(serviceId));
  });
}

function routeBookingLinks() {
  document.querySelectorAll('a[href="#book"],a[href="#book-balayage"],a[href^="#book-"]').forEach((link) => {
    link.href = "/book-appointment/";
  });
}

function initReviewSlider() {
  const carousel = document.querySelector("[data-review-carousel]");
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll("[data-review-slide]")];
  const dots = [...carousel.querySelectorAll("[data-review-dot]")];
  if (slides.length < 2) return;
  let activeIndex = 0;

  function showReview(nextIndex) {
    const current = slides[activeIndex];
    const next = slides[nextIndex];
    current.classList.remove("is-active");
    current.classList.add("is-exiting");
    next.classList.remove("is-exiting");
    next.classList.add("is-active");
    dots.forEach((dot, index) => dot.classList.toggle("is-active", index === nextIndex));
    window.setTimeout(() => current.classList.remove("is-exiting"), 500);
    activeIndex = nextIndex;
  }

  window.setInterval(() => showReview((activeIndex + 1) % slides.length), 4800);
}

window.addEventListener("storage", (event) => {
  if (event.key === CALIBRATION_KEY) setActiveService(activeServiceId);
});

window.StudioSolPointing = {
  setActiveService,
  setPhotoMode(mode) {
    visualColumn.dataset.photoMode = mode === "owner-upload" ? "owner-upload" : "showcase";
    setActiveService(activeServiceId || "balayage");
  },
  refreshCalibration() {
    setActiveService(activeServiceId || "balayage");
  },
  applyArcEquation
};

applyArcEquation();
routeBookingLinks();
bindServiceNodes();
setActiveService("balayage");
initReviewSlider();
