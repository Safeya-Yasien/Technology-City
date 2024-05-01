const productsAddProductButton = document.querySelector(
  "#products-add-product"
);
// const deleteAllBtn = document.querySelector("#delete-all");

// events
productsAddProductButton.addEventListener("click", redirectToAddProductPage);
// deleteAllBtn.addEventListener("click", deleteAllProducts);

// fetch product form api
async function fetchProducts() {
  const response = await fetch(api);
  const apiData = await response.json();

  displayProducts(apiData);
}

// display products in table
function displayProducts(apiData) {
  console.log(apiData);

  const tbody = document.querySelector("#tab-2 .display-products");
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
        <img class='product-img' src='${apiData[i].image_url}' alt=''>
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
  window.location.href = `add_product.html?productId=${id}`;
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

function redirectToAddProductPage() {
  window.location.href = "add_product.html";
}

// not work yet
// async function deleteAllProducts() {
//   const response = await fetch(api, {
//     method: "DELETE",
//   });

//   try {
//     if (!response.ok) {
//       throw new Error("Faild to delete product.");
//     }
//     fetchProducts();
//   } catch (error) {
//     console.log("Error", error);
//   }
// }

fetchProducts();
