document.querySelectorAll("[data-show-password]").forEach((checkbox) => {
  const targetId = checkbox.getAttribute("data-show-password");
  const passwordInput = document.getElementById(targetId);

  if (!passwordInput) return;

  checkbox.addEventListener("change", () => {
    passwordInput.type = checkbox.checked ? "text" : "password";
  });
});
