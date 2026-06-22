const CALIBRATION_TARGETS = [
  { id: "cut", label: "Cut", x: 50, y: 4 },
  { id: "color", label: "Color", x: 67.8, y: 15.6 },
  { id: "balayage", label: "Balayage", x: 75.8, y: 35.9 },
  { id: "blowout", label: "Blowout", x: 76.5, y: 57.9 },
  { id: "extensions", label: "Extensions", x: 70, y: 78.8 },
  { id: "bridal", label: "Bridal Hair", x: 54.2, y: 93.2 },
  { id: "treatments", label: "Treatments", x: 34.2, y: 87.2 }
];

function ensureCalibrationSection() {
  const pageList = document.querySelector(".admin-page-list");
  const actions = document.querySelector(".admin-actions");

  if (pageList && !pageList.querySelector('[data-admin-page="calibration"]')) {
    const calibrationButton = document.createElement("button");
    calibrationButton.className = "admin-page-link";
    calibrationButton.type = "button";
    calibrationButton.dataset.adminPage = "calibration";
    calibrationButton.setAttribute("aria-pressed", "false");
    calibrationButton.innerHTML = `<span>Calibration</span><span aria-hidden="true">07</span>`;

    const footerButton = pageList.querySelector('[data-admin-page="footer"]');
    pageList.insertBefore(calibrationButton, footerButton || null);
  }

  if (actions && !document.querySelector('[data-admin-content="calibration"]')) {
    const panel = document.createElement("div");
    panel.className = "admin-content-page";
    panel.dataset.adminContent = "calibration";
    panel.innerHTML = `
      <section class="admin-section">
        <h2>Model recalibration</h2>
        <p class="admin-section__copy">
          This live viewer mirrors the landing-page pointing setup. Recalibrate uses math to find the arm pivot, find the center of the selected SVG circle, calculate the angle with atan2, and rotate the arm directly toward that target.
        </p>

        <div class="calibration-shell">
          <div class="calibration-viewer" data-calibration-viewer>
            <div class="calibration-viewer__backdrop" aria-hidden="true">
              <div class="calibration-viewer__mirror"></div>
            </div>

            <div class="calibration-model" data-calibration-model>
              <img class="calibration-model__body" src="/assets/stylist-body-placeholder.svg" alt="" aria-hidden="true" />
              <span class="calibration-arm" data-calibration-arm><span></span></span>
            </div>

            <svg class="calibration-arc" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path class="calibration-arc__path" d="M50 4 A 28 45 0 1 1 34.2 87.2" />
              ${CALIBRATION_TARGETS.map((target) => `<circle class="calibration-target-circle${target.id === "balayage" ? " is-active" : ""}" data-calibration-target="${target.id}" cx="${target.x}" cy="${target.y}" r="0.8" />`).join("")}
            </svg>

            ${CALIBRATION_TARGETS.map((target) => `<span class="calibration-node-label${target.id === "balayage" ? " is-active" : ""}" data-calibration-label="${target.id}" style="--x:${target.x}%; --y:${target.y}%">${target.label}</span>`).join("")}

            <span class="calibration-vector" data-calibration-vector></span>
            <span class="calibration-pivot" data-calibration-pivot></span>
            <span class="calibration-center" data-calibration-center></span>
          </div>

          <div class="calibration-panel">
            <div class="admin-field">
              <label for="calibration-target">SVG circle target</label>
              <select id="calibration-target" data-calibration-select>
                ${CALIBRATION_TARGETS.map((target) => `<option value="${target.id}" ${target.id === "balayage" ? "selected" : ""}>${target.label}</option>`).join("")}
              </select>
            </div>

            <button class="button button--primary" type="button" data-recalibrate-model>Recalibrate Model</button>

            <div class="calibration-readout" aria-live="polite">
              <div><strong>Target:</strong> <span data-calibration-readout-target>Balayage</span></div>
              <div><strong>Arm pivot:</strong> <span data-calibration-readout-pivot>waiting</span></div>
              <div><strong>SVG center:</strong> <span data-calibration-readout-center>waiting</span></div>
              <div><strong>Calculated angle:</strong> <span data-calibration-readout-angle>waiting</span></div>
            </div>

            <pre class="calibration-code" data-calibration-code>Math: angle = atan2(targetY - pivotY, targetX - pivotX)</pre>
          </div>
        </div>
      </section>
    `;

    actions.parentNode.insertBefore(panel, actions);
  }
}

function getCenterPoint(element, relativeTo) {
  const elementRect = element.getBoundingClientRect();
  const parentRect = relativeTo.getBoundingClientRect();

  return {
    x: elementRect.left + elementRect.width / 2 - parentRect.left,
    y: elementRect.top + elementRect.height / 2 - parentRect.top
  };
}

function getArmPivotPoint(arm, relativeTo) {
  const armRect = arm.getBoundingClientRect();
  const parentRect = relativeTo.getBoundingClientRect();

  return {
    x: armRect.left - parentRect.left + armRect.width * 0.08,
    y: armRect.top - parentRect.top + armRect.height * 0.5
  };
}

function setCalibrationTarget(targetId) {
  document.querySelectorAll("[data-calibration-target]").forEach((circle) => {
    circle.classList.toggle("is-active", circle.dataset.calibrationTarget === targetId);
  });

  document.querySelectorAll("[data-calibration-label]").forEach((label) => {
    label.classList.toggle("is-active", label.dataset.calibrationLabel === targetId);
  });
}

function recalibrateModel() {
  const viewer = document.querySelector("[data-calibration-viewer]");
  const arm = document.querySelector("[data-calibration-arm]");
  const select = document.querySelector("[data-calibration-select]");
  const activeTarget = document.querySelector(`[data-calibration-target="${select?.value || "balayage"}"]`);

  if (!viewer || !arm || !activeTarget) return;

  setCalibrationTarget(select.value);

  const pivot = getArmPivotPoint(arm, viewer);
  const center = getCenterPoint(activeTarget, viewer);
  const dx = center.x - pivot.x;
  const dy = center.y - pivot.y;
  const radians = Math.atan2(dy, dx);
  const degrees = radians * (180 / Math.PI);
  const distance = Math.hypot(dx, dy);

  viewer.style.setProperty("--calibration-arm-angle", `${degrees.toFixed(2)}deg`);

  const vector = document.querySelector("[data-calibration-vector]");
  const pivotMarker = document.querySelector("[data-calibration-pivot]");
  const centerMarker = document.querySelector("[data-calibration-center]");

  if (vector) {
    vector.style.left = `${pivot.x}px`;
    vector.style.top = `${pivot.y}px`;
    vector.style.width = `${distance}px`;
    vector.style.transform = `rotate(${degrees}deg)`;
  }

  if (pivotMarker) {
    pivotMarker.style.left = `${pivot.x}px`;
    pivotMarker.style.top = `${pivot.y}px`;
  }

  if (centerMarker) {
    centerMarker.style.left = `${center.x}px`;
    centerMarker.style.top = `${center.y}px`;
  }

  const targetData = CALIBRATION_TARGETS.find((target) => target.id === (select?.value || "balayage"));
  document.querySelector("[data-calibration-readout-target]").textContent = targetData?.label || "Target";
  document.querySelector("[data-calibration-readout-pivot]").textContent = `x ${pivot.x.toFixed(1)}, y ${pivot.y.toFixed(1)}`;
  document.querySelector("[data-calibration-readout-center]").textContent = `x ${center.x.toFixed(1)}, y ${center.y.toFixed(1)}`;
  document.querySelector("[data-calibration-readout-angle]").textContent = `${degrees.toFixed(2)}°`;
  document.querySelector("[data-calibration-code]").textContent = `Math:\nangle = atan2(${center.y.toFixed(1)} - ${pivot.y.toFixed(1)}, ${center.x.toFixed(1)} - ${pivot.x.toFixed(1)})\nangle = ${degrees.toFixed(2)}deg\narm transform = rotate(${degrees.toFixed(2)}deg)`;
}

ensureCalibrationSection();
window.setTimeout(recalibrateModel, 80);

window.addEventListener("resize", recalibrateModel);

document.addEventListener("change", (event) => {
  const select = event.target.closest("[data-calibration-select]");
  if (!select) return;

  setCalibrationTarget(select.value);
  recalibrateModel();
});

document.addEventListener("click", (event) => {
  const circle = event.target.closest("[data-calibration-target]");
  if (circle) {
    const select = document.querySelector("[data-calibration-select]");
    if (select) select.value = circle.dataset.calibrationTarget;
    setCalibrationTarget(circle.dataset.calibrationTarget);
    recalibrateModel();
    return;
  }

  if (event.target.closest("[data-recalibrate-model]")) {
    recalibrateModel();
  }
});
