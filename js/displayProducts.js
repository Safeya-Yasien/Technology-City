const productsAddProductButton = document.querySelector(
  "#products-add-product"
);
const AllTabs = document.querySelectorAll(".tab");

productsAddProductButton.addEventListener("click", displayAddProductFrom);

async function fetchProducts() {
  const response = await fetch(api);
  const apiData = await response.json();

  displayProducts(apiData);
}

function displayProducts(apiData) {
  console.log(apiData);

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
        <img src='' alt=''>
    </td>
    <td>
        <a class="product-name" href="#">
        ${apiData[i].name}
        </a>
    </td>
    <td class='product-price-update'>${apiData[i].price}</td>
    <td class='product-description-update product-description'>${
      apiData[i].description
    }</td>
    <td>${formatDate(apiData[i].created_at)}</td>
    <td class='position-relative'>
        <a
        href="#"
        class="ellipsis-menu-toggle"
        >
        <i class="fa-solid fa-ellipsis"></i>
        </a>
        <ul class="ellipsis-menu submenu">
        <li>
            <a href="#" onclick='updateProduct(${JSON.stringify(
              apiData[i].id
            )})'>update</a>
        </li>
        <li>
            <a href="#" onclick='removeProduct(${JSON.stringify(
              apiData[i].id
            )})'>remove</a>
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

// fomrat date
function formatDate(date) {
  const options = {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: "true",
  };

  const createdProductDate = new Date(date).toLocaleString("en-US", options);
  return createdProductDate;
}

// update product
async function updateProduct(id) {
  try {
    const response = await fetch(`${api}/${id}`);
    if (!response.ok) {
      throw new Error("Faild to fetch this product.");
    }

    const responseData = await response.json();
    console.log(responseData);

    populateFormFields(responseData);
    publishProductButton.removeEventListener("click", handleUpdate);
    publishProductButton.addEventListener("click", () => handleUpdate(id));

    publishProductButton.innerHTML = "Update Product";
    switchToTab("#tab-3");
  } catch (error) {
    console.log("Error", error);
  }
}

async function handleUpdate(id) {
  try {
    let updatedProduct = {
      name: productName.value.trim().toLowerCase(),
      description: productDescription.value.trim()
        ? productDescription.value.toLowerCase()
        : "No description provided",
      price: productPrice.value.trim(),
    };

    const updateResponse = await fetch(`${api}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!updateResponse.ok) {
      throw new Error("Faild to fetch this product.");
    }
    displaySuccessMessage("Product Updated Successfully");
    publishProductButton.innerHTML === "Publish Product";

    clearData();

    switchToTab("#tab-2");
    fetchProducts();
  } catch (error) {
    console.log("Error", error);
  }
}

function switchToTab(tabId) {
  removeSuccessMess();
  removeActiveTab();
  $(tabId).addClass("active").hide().fadeIn(1000);
}

function populateFormFields(responseData) {
  productName.value = responseData.name;
  productDescription.value = responseData.description;
  productPrice.value = responseData.price;
}

async function removeProduct(id) {
  const response = await fetch(`${api}/${id}`, {
    method: "DELETE",
  });

  try {
    if (!response.ok) {
      throw new Error("Faild to delete product.");
    }

    fetchProducts();
  } catch (error) {
    console.log("Error", error);
  }
}

function displayAddProductFrom() {
  removeSuccessMess();
  removeActiveTab();

  $("#tab-3").addClass("active").hide().fadeIn(1000);
}

function removeSuccessMess() {
  const successMessageContainer = document.querySelector(
    ".success-message-container"
  );
  successMessageContainer.style.display = "none";
}

function removeActiveTab() {
  AllTabs.forEach((tab) => {
    tab.classList.remove("active");
  });
}

fetchProducts();
