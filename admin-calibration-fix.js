(() => {
  const TARGETS = {
    cut: { label: "Cut", x: 50, y: 4 },
    color: { label: "Color", x: 67.8, y: 15.6 },
    balayage: { label: "Balayage", x: 75.8, y: 35.9 },
    blowout: { label: "Blowout", x: 76.5, y: 57.9 },
    extensions: { label: "Extensions", x: 70, y: 78.8 },
    bridal: { label: "Bridal Hair", x: 54.2, y: 93.2 },
    treatments: { label: "Treatments", x: 34.2, y: 87.2 }
  };

  const ARM = {
    left: 51.5,
    top: 31.5,
    width: 62,
    height: 9
  };

  let liveFrame = null;
  let liveOn = false;

  function q(selector) {
    return document.querySelector(selector);
  }

  function readNum(selector, fallback) {
    const value = Number.parseFloat(q(selector)?.value);
    return Number.isFinite(value) ? value : fallback;
  }

  function installExtraControls() {
    const panel = q(".calibration-panel");
    const viewer = q("[data-calibration-viewer]");
    const mainButton = q("[data-recalibrate-model]");
    if (!panel || !viewer || panel.dataset.fixedCalibration === "true") return;

    panel.dataset.fixedCalibration = "true";
    if (mainButton) mainButton.textContent = "Start Live Recalibration";

    if (!q("[data-calibration-tip]")) {
      const tip = document.createElement("span");
      tip.className = "calibration-tip";
      tip.dataset.calibrationTip = "";
      viewer.appendChild(tip);
    }

    mainButton?.insertAdjacentHTML("afterend", `
      <button class="button button--ghost" type="button" data-recalibrate-once>Recalibrate Once</button>
      <div class="calibration-control-grid">
        <div class="admin-field">
          <label for="calibration-origin-x">Pivot X %</label>
          <input id="calibration-origin-x" type="number" step="0.1" value="8" data-origin-x />
        </div>
        <div class="admin-field">
          <label for="calibration-origin-y">Pivot Y %</label>
          <input id="calibration-origin-y" type="number" step="0.1" value="50" data-origin-y />
        </div>
        <div class="admin-field">
          <label for="calibration-angle-offset">Angle offset</label>
          <input id="calibration-angle-offset" type="number" step="0.1" value="0" data-angle-offset />
        </div>
        <div class="admin-field">
          <label for="calibration-tip-percent">Arm tip %</label>
          <input id="calibration-tip-percent" type="number" step="0.1" value="100" data-tip-percent />
        </div>
      </div>
      <p class="calibration-field-note">This now recalculates from a stable shoulder pivot, not from the rotated arm box.</p>
    `);
  }

  function stableModelRect(viewer, model) {
    const vr = viewer.getBoundingClientRect();
    const mr = model.getBoundingClientRect();
    return {
      left: mr.left - vr.left,
      top: mr.top - vr.top,
      width: mr.width,
      height: mr.height
    };
  }

  function targetPoint(viewer) {
    const selected = q("[data-calibration-select]")?.value || "balayage";
    const target = TARGETS[selected] || TARGETS.balayage;
    const vr = viewer.getBoundingClientRect();
    return {
      x: vr.width * target.x / 100,
      y: vr.height * target.y / 100,
      label: target.label
    };
  }

  function pivotPoint(modelRect) {
    const originX = readNum("[data-origin-x]", 8);
    const originY = readNum("[data-origin-y]", 50);
    const armLeft = modelRect.width * ARM.left / 100;
    const armTop = modelRect.height * ARM.top / 100;
    const armWidth = modelRect.width * ARM.width / 100;
    const armHeight = modelRect.height * ARM.height / 100;

    return {
      x: modelRect.left + armLeft + armWidth * originX / 100,
      y: modelRect.top + armTop + armHeight * originY / 100,
      armWidth,
      originX
    };
  }

  function marker(selector, point) {
    const node = q(selector);
    if (!node) return;
    node.style.left = `${point.x}px`;
    node.style.top = `${point.y}px`;
  }

  function fixedRecalibrate() {
    installExtraControls();

    const viewer = q("[data-calibration-viewer]");
    const model = q("[data-calibration-model]");
    if (!viewer || !model) return;

    const pivot = pivotPoint(stableModelRect(viewer, model));
    const center = targetPoint(viewer);
    const dx = center.x - pivot.x;
    const dy = center.y - pivot.y;
    const rawAngle = Math.atan2(dy, dx) * 180 / Math.PI;
    const offset = readNum("[data-angle-offset]", 0);
    const angle = rawAngle + offset;
    const distance = Math.hypot(dx, dy);
    const tipPercent = readNum("[data-tip-percent]", 100);
    const tipDistance = pivot.armWidth * (tipPercent - pivot.originX) / 100;
    const tip = {
      x: pivot.x + Math.cos(angle * Math.PI / 180) * tipDistance,
      y: pivot.y + Math.sin(angle * Math.PI / 180) * tipDistance
    };

    viewer.style.setProperty("--calibration-arm-angle", `${angle.toFixed(2)}deg`);

    const vector = q("[data-calibration-vector]");
    if (vector) {
      vector.style.left = `${pivot.x}px`;
      vector.style.top = `${pivot.y}px`;
      vector.style.width = `${distance}px`;
      vector.style.transform = `rotate(${rawAngle}deg)`;
    }

    marker("[data-calibration-pivot]", pivot);
    marker("[data-calibration-center]", center);
    marker("[data-calibration-tip]", tip);

    const selected = q("[data-calibration-select]")?.value || "balayage";
    document.querySelectorAll("[data-calibration-target]").forEach((circle) => circle.classList.toggle("is-active", circle.dataset.calibrationTarget === selected));
    document.querySelectorAll("[data-calibration-label]").forEach((label) => label.classList.toggle("is-active", label.dataset.calibrationLabel === selected));

    q("[data-calibration-readout-target]").textContent = center.label;
    q("[data-calibration-readout-pivot]").textContent = `x ${pivot.x.toFixed(1)}, y ${pivot.y.toFixed(1)}`;
    q("[data-calibration-readout-center]").textContent = `x ${center.x.toFixed(1)}, y ${center.y.toFixed(1)}`;
    q("[data-calibration-readout-angle]").textContent = `${angle.toFixed(2)}°`;
    q("[data-calibration-code]").textContent = `Stable math:\npivot = model rect + arm percent + origin percent\ntarget = viewer size × SVG circle percent\nangle = atan2(${center.y.toFixed(1)} - ${pivot.y.toFixed(1)}, ${center.x.toFixed(1)} - ${pivot.x.toFixed(1)})\nangle = ${rawAngle.toFixed(2)}° + offset ${offset.toFixed(2)}° = ${angle.toFixed(2)}°`;
  }

  function tick() {
    if (!liveOn) {
      liveFrame = null;
      return;
    }
    fixedRecalibrate();
    liveFrame = requestAnimationFrame(tick);
  }

  function startLive() {
    liveOn = true;
    const button = q("[data-recalibrate-model]");
    if (button) {
      button.textContent = "Stop Live Recalibration";
      button.classList.add("calibration-live-on");
    }
    if (!liveFrame) liveFrame = requestAnimationFrame(tick);
  }

  function stopLive() {
    liveOn = false;
    if (liveFrame) cancelAnimationFrame(liveFrame);
    liveFrame = null;
    const button = q("[data-recalibrate-model]");
    if (button) {
      button.textContent = "Start Live Recalibration";
      button.classList.remove("calibration-live-on");
    }
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-recalibrate-model]")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      liveOn ? stopLive() : startLive();
      return;
    }

    if (event.target.closest("[data-recalibrate-once]")) {
      event.preventDefault();
      fixedRecalibrate();
    }
  }, true);

  document.addEventListener("input", (event) => {
    if (event.target.closest("[data-origin-x], [data-origin-y], [data-angle-offset], [data-tip-percent]")) fixedRecalibrate();
  });

  document.addEventListener("change", fixedRecalibrate);
  window.addEventListener("resize", fixedRecalibrate);
  setTimeout(fixedRecalibrate, 200);
})();
