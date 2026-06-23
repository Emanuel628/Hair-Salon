(() => {
  const KEY = "studioSolModelCalibration";
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

  const SERVICES = {
    cut: { label: "Cut", angle: -90 },
    color: { label: "Color", angle: -62 },
    balayage: { label: "Balayage", angle: -34 },
    blowout: { label: "Blowout", angle: -6 },
    extensions: { label: "Extensions", angle: 22 },
    bridal: { label: "Bridal Hair", angle: 50 },
    treatments: { label: "Treatments", angle: 72 }
  };

  const ORDER = ["cut", "color", "balayage", "blowout", "extensions", "bridal", "treatments"];
  const ARM = { left: 51.5, top: 31.5, width: 62, height: 9 };
  let liveFrame = null;
  let liveOn = false;

  function q(selector) {
    return document.querySelector(selector);
  }

  function readNum(selector, fallback) {
    const value = Number.parseFloat(q(selector)?.value);
    return Number.isFinite(value) ? value : fallback;
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

  function getTargets() {
    return ORDER.reduce((targets, serviceId) => {
      targets[serviceId] = {
        ...SERVICES[serviceId],
        ...arcPercentPoint(SERVICES[serviceId].angle)
      };
      return targets;
    }, {});
  }

  function installControls() {
    const panel = q(".calibration-panel");
    const viewer = q("[data-calibration-viewer]");
    const mainButton = q("[data-recalibrate-model]");
    if (!panel || !viewer || panel.dataset.equationControls === "true") return;

    panel.dataset.equationControls = "true";
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
      <p class="calibration-field-note">Arc equation: (x - 895)² + (y - 612)² = 377². SVG points are projected from that circle.</p>
    `);
  }

  function applyEquationToDom() {
    const targets = getTargets();
    const arc = q(".calibration-arc");
    const path = q(".calibration-arc__path");
    const visualWidth = ARC_EQUATION.canvasWidth * ARC_EQUATION.visualWidthPercent / 100;
    const visualHeight = ARC_EQUATION.canvasHeight - ARC_EQUATION.headerHeight - ARC_EQUATION.footerHeight;
    const rx = ARC_EQUATION.radius / visualWidth * 100;
    const ry = ARC_EQUATION.radius / visualHeight * 100;
    const start = targets.cut;
    const end = targets.treatments;

    if (path) {
      path.setAttribute("d", `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${rx.toFixed(2)} ${ry.toFixed(2)} 0 0 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`);
      path.dataset.arcEquation = "(x - 895)^2 + (y - 612)^2 = 377^2";
    }

    if (arc) {
      arc.querySelectorAll("[data-calibration-target]").forEach((circle) => circle.remove());
      ORDER.forEach((serviceId) => {
        const target = targets[serviceId];
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.classList.add("calibration-target-circle");
        if (serviceId === (q("[data-calibration-select]")?.value || "balayage")) circle.classList.add("is-active");
        circle.dataset.calibrationTarget = serviceId;
        circle.setAttribute("cx", target.x.toFixed(2));
        circle.setAttribute("cy", target.y.toFixed(2));
        circle.setAttribute("r", "0.8");
        arc.appendChild(circle);
      });
    }

    ORDER.forEach((serviceId) => {
      const target = targets[serviceId];
      const label = q(`[data-calibration-label="${serviceId}"]`);
      if (label) {
        label.style.setProperty("--x", `${target.x.toFixed(2)}%`);
        label.style.setProperty("--y", `${target.y.toFixed(2)}%`);
        label.textContent = target.label;
      }
    });
  }

  function stableModelRect(viewer, model) {
    const vr = viewer.getBoundingClientRect();
    const mr = model.getBoundingClientRect();
    return { left: mr.left - vr.left, top: mr.top - vr.top, width: mr.width, height: mr.height };
  }

  function targetPoint(viewer) {
    const selected = q("[data-calibration-select]")?.value || "balayage";
    const targets = getTargets();
    const target = targets[selected] || targets.balayage;
    const vr = viewer.getBoundingClientRect();
    return { x: vr.width * target.x / 100, y: vr.height * target.y / 100, label: target.label, id: selected };
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

  function saveAngle(serviceId, angle) {
    let store = {};
    try { store = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { store = {}; }
    const next = {
      ...store,
      updatedAt: new Date().toISOString(),
      activeTarget: serviceId,
      angles: { ...(store.angles || {}), [serviceId]: Number(angle.toFixed(2)) },
      equation: "(x - 895)^2 + (y - 612)^2 = 377^2"
    };
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function recalibrateFromEquation() {
    installControls();
    applyEquationToDom();

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

    document.querySelectorAll("[data-calibration-target]").forEach((circle) => circle.classList.toggle("is-active", circle.dataset.calibrationTarget === center.id));
    document.querySelectorAll("[data-calibration-label]").forEach((label) => label.classList.toggle("is-active", label.dataset.calibrationLabel === center.id));

    q("[data-calibration-readout-target]").textContent = center.label;
    q("[data-calibration-readout-pivot]").textContent = `x ${pivot.x.toFixed(1)}, y ${pivot.y.toFixed(1)}`;
    q("[data-calibration-readout-center]").textContent = `x ${center.x.toFixed(1)}, y ${center.y.toFixed(1)}`;
    q("[data-calibration-readout-angle]").textContent = `${angle.toFixed(2)}°`;
    q("[data-calibration-code]").textContent = `Circle equation:\n(x - 895)² + (y - 612)² = 377²\nprojected SVG target = ${center.label}\nangle = atan2(${center.y.toFixed(1)} - ${pivot.y.toFixed(1)}, ${center.x.toFixed(1)} - ${pivot.x.toFixed(1)})\nangle = ${rawAngle.toFixed(2)}° + offset ${offset.toFixed(2)}° = ${angle.toFixed(2)}°`;

    saveAngle(center.id, angle);
  }

  function tick() {
    if (!liveOn) {
      liveFrame = null;
      return;
    }
    recalibrateFromEquation();
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
      event.stopImmediatePropagation();
      recalibrateFromEquation();
      return;
    }

    const circle = event.target.closest("[data-calibration-target]");
    if (circle) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const select = q("[data-calibration-select]");
      if (select) select.value = circle.dataset.calibrationTarget;
      recalibrateFromEquation();
    }
  }, true);

  document.addEventListener("input", (event) => {
    if (event.target.closest("[data-origin-x], [data-origin-y], [data-angle-offset], [data-tip-percent]")) {
      event.stopImmediatePropagation();
      recalibrateFromEquation();
    }
  }, true);

  document.addEventListener("change", (event) => {
    if (event.target.closest("[data-calibration-select]")) {
      event.stopImmediatePropagation();
      recalibrateFromEquation();
    }
  }, true);

  window.addEventListener("resize", recalibrateFromEquation);
  setTimeout(recalibrateFromEquation, 180);
  setTimeout(recalibrateFromEquation, 400);
})();
