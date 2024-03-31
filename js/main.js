const landingPage = document.querySelector(".landing");
const imgs = [
  "imgs/wallpaperflare-2.jpg",
  "imgs/wallpaperflare-3.jpg",
  "imgs/wallpaperflare-1.jpg",
  "imgs/wallpaperflare-4.jpg",
  "imgs/wallpaperflare-5.jpg",
];

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

fetch("https://fakestoreapi.com/products/category/electronics")
  .then((res) => res.json())
  .then((json) => displayData(json));

function displayData(data) {
  const productsContent = document.querySelector(".products-content");

  let html = "";

  data.forEach((product) => {
    html += `
      <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
        <div class="box">
          <div class="product-header">
            <h2>${product.title}</h2>
            <p onclick='revalHiddenOverflow(this)' class='truncate'>${product.description} </p>
          </div>

          <div class="product-img">
            <a href="#">
              <img src="${product.image}" alt='product'/>
            </a>
          </div>

          <div class="product-footer">
            <div class="reviews">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>

            <div class="product-price">
              <p>${product.price}$</p>
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  productsContent.innerHTML = `<div class="row">${html}</div>`;
}

// products description
function revalHiddenOverflow(description) {
  description.classList.toggle("truncate");
}

changeLandingBackground();
