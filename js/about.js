window.addEventListener("DOMContentLoaded", () => {
  const accordionButtons = document.querySelectorAll(".accordion-button");
  accordionButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const icon = button.querySelector(".accordion-icon svg");
      if (icon.classList.contains("fa-plus")) {
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
      } else {
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
      }
    });
  });
});
