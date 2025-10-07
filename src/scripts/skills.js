document.addEventListener('DOMContentLoaded', () => {
  function animateProgressBars() {
    document.querySelectorAll(".progress-bar").forEach(bar => {
      const value = parseInt(bar.getAttribute("data-value")) || 0;
      const rect = bar.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight - 50 && !bar.classList.contains("filled")) {
        bar.classList.add("filled");
        bar.style.width = value + "%";

        let counter = 0;
        const interval = setInterval(() => {
          if (counter >= value) {
            clearInterval(interval);
          } else {
            counter++;
            bar.textContent = counter + "%";
          }
        }, Math.max(8, Math.floor(1500 / Math.max(value,1))));
      }
    });
  }

  window.addEventListener("scroll", animateProgressBars);
  window.addEventListener("load", animateProgressBars);
});