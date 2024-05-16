const api = "http://127.0.0.1:5000/api";
const dropDown = document.querySelectorAll(".dropdown");
const barButton = document.querySelector(".bar");
const sideBar = document.querySelector(".sidebar");

// sidebar
barButton.addEventListener("click", displaySideBar);
function displaySideBar() {
  sideBar.classList.toggle("active");
}

// dropdown menus
dropDown.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    let dropdownLink = link.getAttribute("data-menu");

    let subMenu = document.getElementById(dropdownLink);

    subMenu.classList.toggle("show");
  });
});
