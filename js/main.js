const api = "http://127.0.0.1:5000/api/products";
const landingPage = document.querySelector(".landing");
const productsContent = document.querySelector(".products-content");
const productRow = document.querySelector("#product-row");
const showMoreBtn = document.querySelector("#show-more");

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

async function fetchData() {
  const response = await fetch(api);
  const apiData = await response.json();
  return apiData;
}

// display products
async function displayData() {
  const apiData = await fetchData();

  displayProducts(apiData.slice(0, 6));

  showMoreBtn.addEventListener("click", () => {
    window.location.href = "all_products.html";
  });
}

function displayProducts(products) {
  let html = "";

  for (const product of products) {
    html += `
      <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
        <div class="box" onclick='openProductPage(${JSON.stringify(
          product.id
        )})'>
          <div class='product-img'>
            <img src='${product.image_url}' alt=''>
          </div>
          <div class="product-header">
            <h2>${product.name}</h2>
            <p>${product.description} </p>
          </div>
          <div class="product-footer">
            <div class="product-price">
              <p>${product.price}$</p>
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  productRow.innerHTML = html;
}

function openProductPage(productId) {
  window.location.href = `single_product.html?id=${productId}`;
}

changeLandingBackground();
displayData();
