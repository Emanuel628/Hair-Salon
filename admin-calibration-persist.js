(() => {
  const KEY = "studioSolModelCalibration";

  function q(selector) {
    return document.querySelector(selector);
  }

  function readStore() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch {
      return {};
    }
  }

  function numberFromText(value) {
    const parsed = Number.parseFloat(String(value || "").replace("°", ""));
    return Number.isFinite(parsed) ? parsed : null;
  }

  function readNumber(selector, fallback = 0) {
    const value = Number.parseFloat(q(selector)?.value);
    return Number.isFinite(value) ? value : fallback;
  }

  function saveCurrentCalibration() {
    const selected = q("[data-calibration-select]")?.value || "balayage";
    const angle = numberFromText(q("[data-calibration-readout-angle]")?.textContent);
    if (!Number.isFinite(angle)) return;

    const store = readStore();
    const nextStore = {
      ...store,
      updatedAt: new Date().toISOString(),
      activeTarget: selected,
      angles: {
        ...(store.angles || {}),
        [selected]: angle
      },
      settings: {
        pivotXPercent: readNumber("[data-origin-x]", 8),
        pivotYPercent: readNumber("[data-origin-y]", 50),
        angleOffset: readNumber("[data-angle-offset]", 0),
        armTipPercent: readNumber("[data-tip-percent]", 100)
      }
    };

    localStorage.setItem(KEY, JSON.stringify(nextStore));
    updateSavedMessage(selected, angle);
  }

  function updateSavedMessage(selected, angle) {
    let note = q("[data-calibration-saved-note]");
    const panel = q(".calibration-panel");
    if (!panel) return;

    if (!note) {
      note = document.createElement("p");
      note.className = "calibration-field-note";
      note.dataset.calibrationSavedNote = "";
      panel.appendChild(note);
    }

    note.textContent = `Saved to landing page: ${selected} = ${angle.toFixed(2)}°`;
  }

  function bootPersistence() {
    const angleNode = q("[data-calibration-readout-angle]");
    if (!angleNode || angleNode.dataset.persistObserver === "true") return;

    angleNode.dataset.persistObserver = "true";
    const observer = new MutationObserver(saveCurrentCalibration);
    observer.observe(angleNode, { childList: true, characterData: true, subtree: true });

    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-recalibrate-model], [data-recalibrate-once], [data-calibration-target]")) {
        window.setTimeout(saveCurrentCalibration, 80);
      }
    });

    document.addEventListener("input", (event) => {
      if (event.target.closest("[data-origin-x], [data-origin-y], [data-angle-offset], [data-tip-percent]")) {
        window.setTimeout(saveCurrentCalibration, 80);
      }
    });

    document.addEventListener("change", () => window.setTimeout(saveCurrentCalibration, 80));
    window.setTimeout(saveCurrentCalibration, 350);
  }

  window.setTimeout(bootPersistence, 350);
})();
