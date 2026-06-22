const countdownNode = document.querySelector("[data-countdown]");
let secondsRemaining = 10;

function updateCountdown() {
  if (countdownNode) {
    countdownNode.textContent = String(secondsRemaining);
  }
}

updateCountdown();

const countdownTimer = window.setInterval(() => {
  secondsRemaining -= 1;
  updateCountdown();

  if (secondsRemaining <= 0) {
    window.clearInterval(countdownTimer);
    window.location.href = "/";
  }
}, 1000);
