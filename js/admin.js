// toggler menu
let navbarToggler = document.querySelector(".navbar-toggler");
let navbarVertical = document.querySelector(".navbar-vertical");

navbarToggler.addEventListener("click", showNav);

function showNav(e) {
  e.preventDefault();
  navbarVertical.classList.toggle("show");
}

// prducts
const content = document.getElementById("content");

function displayAddProductForm() {
  content.innerHTML = `
  <div>
  <h2 class="mb-4">Create a product</h2>
  <div class="row">
    <div class="col-12">
      <form class="row">
        <div class="col-12">
          <div class="form-floating position-relative">
            <input
              class="form-control"
              type="text"
              placeholder="Product title"
            />
            <label>Product title</label>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="form-floating position-relative">
            <input
              class="form-control"
              type="number"
              placeholder="Product price"
            />
            <label>Product price</label>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="form-floating position-relative">
            <input
              class="form-control"
              type="number"
              placeholder="Product taxs"
            />
            <label>Product taxs</label>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="form-floating position-relative">
            <input
              class="form-control"
              type="number"
              placeholder="Product Ads"
            />
            <label>Product Ads</label>
          </div>
        </div>
        <div
          class="col-md-3 col-sm-6 d-flex align-items-center total-box"
        >
          <p class="total mb-0">Total</p>
        </div>
        <div class="col-12">
          <div class="form-floating position-relative">
            <input
              class="form-control"
              type="number"
              placeholder="Product count"
            />
            <label>Product count</label>
          </div>
        </div>
        <div class="col-12">
          <div class="form-floating position-relative">
            <input
              class="form-control"
              type="text"
              placeholder="Product category"
            />
            <label>Product category</label>
          </div>
        </div>
        <div class="col-12">
          <div class="buttons">
            <button class="btn cancel-button" type="button">
              Cancel
            </button>
            <button
              class="btn px-5 px-sm-15 create-product"
              type="button"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
    
  `;
}

function displayProductList() {
  content.innerHTML = `
    <h2>Product List</h2>
    <!-- Product list HTML here -->
  `;
}

document.addEventListener("DOMContentLoaded", function () {
  const addProductLink = document.getElementById("addProductLink");
  const productListLink = document.getElementById("productListLink");

  addProductLink.addEventListener("click", function (event) {
    event.preventDefault();
    displayAddProductForm();
  });

  productListLink.addEventListener("click", function (event) {
    event.preventDefault();
    displayProductList();
  });
});
