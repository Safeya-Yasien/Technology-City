const api = "http://127.0.0.1:5000/api/products";

async function getProductData() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get("id");
  const response = await fetch(`${api}/${productId}`);
  const apiData = await response.json();

  displayProduct(apiData);
}

function displayProduct(product) {
  console.log(product)
  let productContainer = document.querySelector(".product .card");

  productContainer.innerHTML = `
          <div class="row g-0">
          <div class="col-md-6">
          <img src=${product.image_url}>
          </div>
          <div class="col-md-6 product-info">
          <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">
              ${product.description}
              </p>
              <p class="card-text price">${product.price}$</p>
              <div>
              <button class="btn">Add to cart</button>
              <button class="btn">Buy Now</button>
              </div>
          </div>
          </div>
          </div>
      `;
}

getProductData();
