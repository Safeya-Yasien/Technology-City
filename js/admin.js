let navbarToggler = document.querySelector(".navbar-toggler");
let navbarVertical = document.querySelector(".navbar-vertical");

navbarToggler.addEventListener("click", showNav);

function showNav(e) {
  e.preventDefault();
  navbarVertical.classList.toggle("show");
}

