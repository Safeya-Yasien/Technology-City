const api = "https://fakestoreapi.com/products";
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
    <td>${product.price}</td>
    <td>${product.category}</td>
    <td>Nov 12, 10:45 PM</td>
    <td>
        <a
        href="#"
        class="dropdown"
        data-menu="product-edit-option"
        >
        <i class="fa-solid fa-ellipsis"></i>
        </a>
        <ul class="submenu" id="product-edit-option">
        <li>
            <a href="#">update</a>
        </li>
        <li>
            <a href="#">remove</a>
        </li>
        </ul>
    </td>

    `;

    tbody.appendChild(tr);
  });
}

function displayAddProductFrom() {
  AllTabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  const successMessage = document.querySelector(".success-message");
  successMessage.style.display = "none";

  $("#tab-3").addClass("active").hide().fadeIn(1000);
}

fetchProducts();
