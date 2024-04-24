const bar = document.querySelector(".bar"),
  sideBar = document.querySelector(".sidebar"),
  dropDown = document.querySelectorAll(".dropdown"),
  tabLinks = document.querySelectorAll(".tab"),
  menuLinks = document.querySelectorAll(".menu-link");

// sidebar
$(bar).click(function () {
  $(sideBar).toggle();
});

// dropdown menus
dropDown.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    let dropdownLink = link.getAttribute("data-menu");

    let subMenu = document.getElementById(dropdownLink);

    subMenu.classList.toggle("show");
  });
});

// sidebar links
menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    let menuLink = link.getAttribute("data-area-tab");

    let tabId = $("#" + menuLink);

    tabLinks.forEach((tab) => {
      tab.classList.remove("active");
    });

    tabId.addClass("active").hide().fadeIn(1000);
  });
});
