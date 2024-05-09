const landingPage = document.querySelector(".landing");
const showMoreBtn = document.querySelector("#show-more");

showMoreBtn.addEventListener("click", productsPage);

const imgs = [
  "imgs/wallpaperflare-2.jpg",
  "imgs/wallpaperflare-3.jpg",
  "imgs/wallpaperflare-1.jpg",
  "imgs/wallpaperflare-4.jpg",
  "imgs/wallpaperflare-5.jpg",
];

// change  background color
let currentIndex = 0;
function changeLandingBackground() {
  landingPage.style.backgroundImage = `url('${imgs[currentIndex]}')`;

  if (currentIndex == imgs.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }

  setTimeout(() => changeLandingBackground(), 3000);
}

function productsPage() {
  window.location.href = "all_products.html";
}

changeLandingBackground();
