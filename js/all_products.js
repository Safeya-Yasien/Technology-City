const productsCategories = document.querySelector(".products-categories");
productsCategories.style.marginTop = "150px";

async function displayAllProducts() {
  const response = await fetch(api);
  const apiData = await response.json();

  const productRow = document.getElementById("product-row");
  let html = "";

  for (const product of apiData) {
    html += `
        <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
          <div class="box" onclick='openProductPage(${JSON.stringify(
            product.id
          )})'>
            <div class="product-header">
              <h2>${product.name}</h2>
              <p>${product.description}</p>
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

displayAllProducts();
