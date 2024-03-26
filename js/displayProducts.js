const api = "https://fakestoreapi.com/products/category/electronics";
const productsAddProductButton = document.querySelector(
    "#products-add-product"
  ),
  AllTabs = document.querySelectorAll(".tab");

productsAddProductButton.addEventListener("click", displayAddProductFrom);

async function fetchProducts() {
  const response = await fetch(api);
  const apiData = await response.json();

  const localStorageData = JSON.parse(localStorage.getItem("product")) || [];
  const mergedData = localStorageData.concat(apiData);
  displayProducts(mergedData);
}

function displayProducts(apiData) {
  const tbody = document.querySelector("#tab-2 .products-table table tbody");
  tbody.innerHTML = "";

  apiData.forEach((product) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    

    <td>
        <div class="form">
        <input type="checkbox" class="form-check-input" />
        </div>
    </td>
    <td>
        <a class="product-img" href="#">
        <img src="${product.image}" />
        </a>
    </td>
    <td>
        <a class="product-name" href="#">
        ${product.title}
        </a>
    </td>
    <td class='product-price-update'>${product.price}</td>
    <td class='product-category-update'>${product.category}</td>
    <td>Nov 12, 10:45 PM</td>
    <td>
        <a
        href="#"
        class="ellipsis-menu-toggle"
        >
        <i class="fa-solid fa-ellipsis"></i>
        </a>
        <ul class="ellipsis-menu submenu">
        <li>
            <a href="#" id='update-product'>update</a>
        </li>
        <li>
            <a href="#" id='remove-product'>remove</a>
        </li>
        </ul>
    </td>

    `;

    tbody.appendChild(tr);

    const ellipsisMenuToggle = tr.querySelector(".ellipsis-menu-toggle");
    const ellipsisMenu = tr.querySelector(".ellipsis-menu");
    const updateProductLink = tr.querySelector("#update-product");
    const removeProductLink = tr.querySelector("#remove-product");
    ellipsisMenuToggle.addEventListener("click", showOptions);

    function showOptions(event) {
      event.preventDefault();

      ellipsisMenu.classList.toggle("show");
    }

    removeProductLink.addEventListener("click", (event) => {
      event.preventDefault();
      removeProduct(tr);
    });

    function removeProduct(productRow) {
      productRow.remove();
      localStorage.getItem("product");
    }

    updateProductLink.addEventListener("click", (event) => {
      event.preventDefault();
      displayAddProductFrom(tr);
    });
  });
}

function displayAddProductFrom(product) {
  AllTabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  const successMessage = document.querySelector(".success-message");
  successMessage.style.display = "none";

  console.log(product);

  const productName = document.querySelector(".product-name"),
    productCategoryUpdate = document.querySelector(".product-category-update"),
    productPriceUpdate = document.querySelector(".product-price-update");

  const productTitle = document.querySelector("#product-title"),
    productCategory = document.querySelector("#product-category"),
    productPrice = document.querySelector("#product-price");

  productTitle.value = productName.innerHTML.trim();
  productCategory.value = productCategoryUpdate.innerHTML.trim();
  productPrice.value = productPriceUpdate.innerHTML.trim();

  $("#tab-3").addClass("active").hide().fadeIn(1000);
}

fetchProducts();
