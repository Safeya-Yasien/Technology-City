const api = "http://127.0.0.1:5000/api/products";
const dropDown = document.querySelectorAll(".dropdown");

// dropdown menus
dropDown.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    let dropdownLink = link.getAttribute("data-menu");

    let subMenu = document.getElementById(dropdownLink);

    subMenu.classList.toggle("show");
  });
});
