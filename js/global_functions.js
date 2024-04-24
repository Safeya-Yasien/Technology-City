const api = "http://127.0.0.1:5000/api/products";

async function fetchData() {
  const response = await fetch(api);
  const apiData = await response.json();
  return apiData;
}

const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    navLink.forEach((item) => {
      item.classList.remove("active");
    });
    link.classList.add("active");
  });
});
