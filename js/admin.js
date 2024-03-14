// toggler menu
let navbarToggler = document.querySelector(".navbar-toggler");
let navbarVertical = document.querySelector(".navbar-vertical");

navbarToggler.addEventListener("click", showNav);

function showNav(e) {
  e.preventDefault();
  navbarVertical.classList.toggle("show");
}

// nav
const navLinks = document.querySelectorAll(".nav-links .nav-link");
$(navLinks).on("click", function () {
  $(navLinks).removeClass("active");
  $(this).addClass("active");
});

// create prducts
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
              id="product-title"
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
              id="product-price"
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
              id="product-taxs"
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
              id="product-ads"
            />
            <label>Product Ads</label>
          </div>
        </div>
        <div
          class="col-md-3 col-sm-6 d-flex align-items-center total-box"
        >
          <p class="total mb-0" id="product-total-price"></p>
        </div>
        <div class="col-12">
          <div class="form-floating position-relative">
            <input
              class="form-control"
              type="text"
              placeholder="Product tags"
              id="product-tags"
            />
            <label>Product tags</label>
          </div>
        </div>
        <div class="col-12">
          <div class="form-floating position-relative">
            <input
              class="form-control"
              type="text"
              placeholder="Product category"
              id="product-category"
            />
            <label>Product category</label>
          </div>
        </div>
        <div class="col-12">
          <div class="buttons">
            <button
              class="btn cancel-button"
              type="button"
              id="cancel-button"
            >
              Cancel
            </button>
            <button
              class="btn px-5 px-sm-15 create-product"
              type="button"
              id="create-button"
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

  const productTitle = document.getElementById("product-title"),
    productPrice = document.getElementById("product-price"),
    productTaxs = document.getElementById("product-taxs"),
    productAds = document.getElementById("product-ads"),
    productTotalPrice = document.getElementById("product-total-price"),
    productTags = document.getElementById("product-tags"),
    productCategory = document.getElementById("product-category"),
    cancelProductButton = document.getElementById("cancel-button"),
    createProductButton = document.getElementById("create-button"),
    products = [];

  createProductButton.addEventListener("click", createProduct);
  productPrice.addEventListener("keyup", getTotal);
  productTaxs.addEventListener("keyup", getTotal);
  productAds.addEventListener("keyup", getTotal);

  function getTotal() {
    if (productPrice.value !== "") {
      let result = +productPrice.value + +productTaxs.value + +productAds.value;
      productTotalPrice.innerHTML = result;
    } else {
      productTotalPrice.innerHTML = "";
    }
  }

  function createProduct() {
    let newProduct = {
      title: productTitle.value.toLowerCase(),
      price: productPrice.value,
      taxs: productTaxs.value,
      ads: productAds.value,
      total: productTotalPrice.innerHTML,
      tags: productTags.value.toLowerCase(),
      category: productCategory.value.toLowerCase(),
      publishedDate: getDate(),
    };

    if (
      productTitle.value !== "" &&
      productPrice.value !== "" &&
      productCategory.value !== "" &&
      productTags.value !== ""
    ) {
      products.push(newProduct);
      console.log(products);
    }

    clearData();
    // displayProducts();
  }

  function clearData() {
    productTitle.value = "";
    productPrice.value = "";
    productTaxs.value = "";
    productAds.value = "";
    productTotalPrice.innerHTML = "";
    productTags.value = "";
    productCategory.value = "";
  }

  function getDate() {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let currentDate = `${day}/${month}/${year}`;
    return currentDate;
  }

  // function displayProducts() {
  //   getTotal();
  //   let table = "";

  //   for (let i = 0; i < products.length; i++) {
  //     table += createTable(i);
  //   }

  //   document.getElementById("tbody").innerHTML = table;
  // }

  //   function createTable(index) {
  //     return `

  //               <tr>
  //                 <th scope="row">
  //                   <form>
  //                     <input class="form-check-input" type="checkbox" />
  //                   </form>
  //                 </th>
  //                 <td>
  //                   <a href="#" class="roundend-2">
  //                     <img src="imgs/proudct-phone.png" alt="" />
  //                   </a>
  //                 </td>
  //                 <td>
  //                   <a href="#">
  //                     ${products[index].title}
  //                   </a>
  //                 </td>
  //                 <td>${products[index].price}</td>
  //                 <td>${products[index].category}</td>
  //                 <td>
  //                   <div class="d-flex flex-wrap gap-2">
  //                     <a href="#"><span class="badge-tag badge">${
  //                       products[index].tags
  //                     }</span></a>
  //                     <a href="#"><span class="badge-tag badge">${
  //                       products[index].tags
  //                     }</span></a>
  //                     <a href="#"
  //                       ><span class="badge-tag badge">${
  //                         products[index].tags
  //                       }</span></a
  //                     >
  //                   </div>
  //                 </td>
  //                 <td><i class="fa-regular fa-star"></i></td>
  //                 <td>${getDate()}</td>
  //                 <td>
  //                   <i class="fa-solid fa-ellipsis"></i>
  //                 </td>
  //               </tr>

  // `;
  //   }

  // createProduct();
}

// display products
function displayProducs() {
  fetch("https://fakestoreapi.com/products/category/electronics")
    .then((res) => res.json())
    .then((json) => displayData(json));
}
function displayData(data) {
  console.log(data);
  const content = document.getElementById("content");

  content.innerHTML = `
  <div>
  <div class="products">
    <h2 class="mb-4">Products</h2>
    <div class="nav nav-links mb-2">
      <div class="nav-item">
        <a href="#" class="nav-link active"
          >All
          <span>(1222)</span>
        </a>
      </div>
      <div class="nav-item">
        <a href="#" class="nav-link"
          >Published
          <span>(70348)</span>
        </a>
      </div>
      <div class="nav-item">
        <a href="#" class="nav-link"
          >Drafts
          <span>(17)</span>
        </a>
      </div>
      <div class="nav-item">
        <a href="#" class="nav-link"
          >On discount
          <span>(810)</span>
        </a>
      </div>
    </div>
    <div class="mb-4 proudcts-groups">
      <div class="d-flex gap-3 align-items-center flex-wrap">
        <div class="search-box">
          <form class="position-relative">
            <input
              class="search-input form-control position-relative"
              type="search"
              placeholder="Search products"
            />
            <i class="fa-solid fa-magnifying-glass search-box-icon"></i>
          </form>
        </div>
        <div class="scrollbar">
          <div class="btn-group">
            <div class="dropdown">
              <button
                type="button"
                class="btn"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
                <i class="fa-solid fa-angle-down ms-2"></i>
              </button>
              <div
                class="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <a href="#" class="dropdown-item">Laptops</a>
                <a href="#" class="dropdown-item">Phones</a>
                <a href="#" class="dropdown-item">Accessories</a>
              </div>
            </div>
          </div>
        </div>
        <div class="add-product">
          <button class="btn">
            <i class="fa-solid fa-plus me-2"></i>
            Add product
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            <form>
              <input class="form-check-input" type="checkbox" />
            </form>
          </th>
          <th scope="col"></th>
          <th scope="col" style="width: 280px">
            Product name
            <i class="fa-solid fa-sort"></i>
          </th>
          <th scope="col">Price</th>
          <th scope="col">
            Category
            <i class="fa-solid fa-sort"></i>
          </th>
          <th scope="col">Tags</th>
          <th scope="col"></th>
          <th scope="col">published on</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <form>
              <input class="form-check-input" type="checkbox" />
            </form>
          </th>
          <td>
            <a href="#" class="roundend-2">
              <img src="${data[0].image}" alt="" />
            </a>
          </td>
          <td>
            <a href="#">
              ${data[0].title}
            </a>
          </td>
          <td>${data[0].price}</td>
          <td>Phone</td>
          <td>
            <div class="d-flex flex-wrap gap-2">
              <a href="#"><span class="badge-tag badge">Apple</span></a>
              <a href="#"><span class="badge-tag badge">White</span></a>
              <a href="#"
                ><span class="badge-tag badge">Lifestyle</span></a
              >
            </div>
          </td>
          <td><i class="fa-regular fa-star"></i></td>
          <td>Nov 12, 10:45 PM</td>
          <td>
            <i class="fa-solid fa-ellipsis"></i>
          </td>
        </tr>

        <tr>
          <th scope="row">
            <form>
              <input class="form-check-input" type="checkbox" />
            </form>
          </th>
          <td>
            <a href="#" class="roundend-2">
              <img src="${data[1].image}" alt="" />
            </a>
          </td>
          <td>
            <a href="#">
              ${data[1].title}
            </a>
          </td>
          <td>${data[1].price}</td>
          <td>Phone</td>
          <td>
            <div class="d-flex flex-wrap gap-2">
              <a href="#"><span class="badge-tag badge">Apple</span></a>
              <a href="#"><span class="badge-tag badge">White</span></a>
              <a href="#"
                ><span class="badge-tag badge">Lifestyle</span></a
              >
            </div>
          </td>
          <td><i class="fa-regular fa-star"></i></td>
          <td>Nov 12, 10:45 PM</td>
          <td>
            <i class="fa-solid fa-ellipsis"></i>
          </td>
        </tr>
        
    <tbody>
      
    </table>
  </div>
</div>
  `;
}

document.addEventListener("DOMContentLoaded", function () {
  const createProductButton = document.getElementById("create-product-button");
  const showProductsButton = document.getElementById("show-products-button");
  const addProductButton = document.getElementById("add-product-button");

  createProductButton.addEventListener("click", function (event) {
    event.preventDefault();
    displayAddProductForm();
  });

  addProductButton.addEventListener("click", function (event) {
    event.preventDefault();
    displayAddProductForm();
  });

  showProductsButton.addEventListener("click", function (event) {
    event.preventDefault();
    displayProducs();
  });
});
