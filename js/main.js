fetch("https://fakestoreapi.com/products/category/electronics")
  .then((res) => res.json())
  .then((json) => displayData(json));

function displayData(data) {
  console.log(data);

  const productsContent = document.querySelector(".products-content");

  let html = ""; // Initialize an empty string to store HTML content

  data.forEach((product) => {
    html += `
      <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
        <div class="box">
          <div class="product-header">
            <h2>${product.title}</h2>
            <p onclick='revalHiddenOverflow(this)' class='truncate'>${product.description} </p>
          </div>

          <img src="${product.image}" />

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
              <p>${product.price}</p>
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  productsContent.innerHTML = `<div class="row">${html}</div>`; // Set the HTML content inside the productsContent element
}

function revalHiddenOverflow(description) {
  description.classList.toggle("truncate");
}
