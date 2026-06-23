(() => {
  const src = "/admin-arc-equation-sync.js";
  if (document.querySelector(`script[src="${src}"]`)) return;

  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  document.head.appendChild(script);
})();
