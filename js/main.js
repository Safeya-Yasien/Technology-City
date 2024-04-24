const landingPage = document.querySelector(".landing");
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

// display products
async function displayData() {
  const apiData = await fetchData();
  const productsContent = document.querySelector(".products-content");

  let html = "";

  for (let i = 0; i < apiData.length; i++) {
    html += `
      <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
        <div class="box" onclick='openProductPage(${JSON.stringify(
          apiData[i].id
        )})'>
          <div class="product-header">
            <h2>${apiData[i].name}</h2>
            <p>${apiData[i].description} </p>
          </div>
          <div class="product-footer">
            <div class="product-price">
              <p>${apiData[i].price}$</p>
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  productsContent.innerHTML = `<div class="row">${html}</div>`;
}

function openProductPage(productId) {
  window.location.href = `single_product.html?id=${productId}`;
}

changeLandingBackground();
displayData();
