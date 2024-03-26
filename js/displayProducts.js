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

  for (let i = 0; i < apiData.length; i++) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    

    <td>
        <div class="form">
        <input type="checkbox" class="form-check-input" />
        </div>
    </td>
    <td>
        <a class="product-img" href="#">
        <img src="${apiData[i].image}" />
        </a>
    </td>
    <td>
        <a class="product-name" href="#">
        ${apiData[i].title}
        </a>
    </td>
    <td class='product-price-update'>${apiData[i].price}</td>
    <td class='product-category-update'>${apiData[i].category}</td>
    <td>Nov 12, 10:45 PM</td>
    <td class='position-relative'>
        <a
        href="#"
        class="ellipsis-menu-toggle"
        >
        <i class="fa-solid fa-ellipsis"></i>
        </a>
        <ul class="ellipsis-menu submenu">
        <li>
        <a href="#" onclick='displayAddProductFrom(${JSON.stringify(
          apiData[i]
        )})'>update</a>
        </li>
        <li>
            <a href="#" onclick='removeProduct(${i})'>remove</a>
        </li>
        </ul>
    </td>

    `;

    tbody.appendChild(tr);

    const ellipsisMenuToggle = tr.querySelector(".ellipsis-menu-toggle");
    const ellipsisMenu = tr.querySelector(".ellipsis-menu");
    ellipsisMenuToggle.addEventListener("click", showOptions);

    function showOptions(event) {
      event.preventDefault();

      ellipsisMenu.classList.toggle("show");
    }
  }
}

function removeProduct(index) {
  const localStorageData = JSON.parse(localStorage.getItem("product")) || [];

  localStorageData.splice(index, 1);

  localStorage.setItem("product", JSON.stringify(localStorageData));

  fetchProducts();
}

function displayAddProductFrom(product) {
  AllTabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  const successMessage = document.querySelector(".success-message");
  successMessage.style.display = "none";

  $("#tab-3").addClass("active").hide().fadeIn(1000);

  productTitle.value = product.title;
  productDescription.value = product.description;
  productCategory.value = product.category;
  productPrice.value = product.price;

  if (product.image) {
    const imgElement = document.createElement("img");
    imgElement.src = product.image;

    uploadedImgContainer.innerHTML = "";
    uploadedImgContainer.appendChild(imgElement);
  }
}

fetchProducts();
