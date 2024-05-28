const api = "http://196.218.124.110:5000/api";

const productsContent = document.querySelector(".products-content");
const categories = document.querySelectorAll(".products-categories .category");
const productRow = document.querySelector("#product-row");
let filteredProducts = [];

async function fetchData() {
  try {
    const response = await fetch(`${api}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const apiData = await response.json();
    return apiData;
    // displayProducts(apiData);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

// check if user loged in
function isLoggedIn() {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken !== null;
}

function updateHeaderLinks() {
  const loginRegister = document.querySelector(".login-register");
  const logout = document.querySelector("#logout");
  if (isLoggedIn()) {
    loginRegister.classList.add("hide");
    logout.classList.remove("hide");
  } else {
    loginRegister.classList.remove("hide");
    logout.classList.add("hide");
  }

  logout.addEventListener("click", handleLogout);
}

function displayProducts(products) {
  let html = "";

  for (const product of products) {
    html += `
      <div class="col-lg-4 col-md-4 col-sm-6 mb-4" data-id='${product.id}'>
        <div class="box">
          <div class='product-img' onclick='openProductPage(${JSON.stringify(
            product.id
          )})'>
            <img src='${product.image_url}' alt=''>
          </div>
          <div class="product-header">
            <h2>${product.name}</h2>
            <p>${product.description} </p>
          </div>
          <div class="product-footer">
            <div class="product-price d-flex align-items-center justify-content-between">
              <p>${product.price}$</p>
              <div class='product-qunatity'>
                <input class='form-control' type='number' value='1' id='quantity'>
                <a href='#' class='add-to-cart-button' onclick='addToCart(${JSON.stringify(
                  product.id
                )})'>
                  <i class="fa-solid fa-cart-shopping"></i>
                </a>
              </div>
            </div>
            <div class='view-button mt-4 hide' id='view-button-${product.id}'>
              <button class='btn view-cart'>
                <a class='text-white' href="cart.html">View cart</a>
              </button>
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

async function filterProducts(valueAttribute) {
  try {
    const apiData = await fetchData();
    if (valueAttribute === "all") {
      // Show all products
      filteredProducts = apiData.slice(0, 6);
    } else {
      // Filter products based on category
      filteredProducts = apiData
        .filter(
          (product) =>
            product.category &&
            product.category.toLowerCase() === valueAttribute.toLowerCase()
        )
        .slice(0, 6);
    }
    displayProducts(filteredProducts);
  } catch (error) {
    console.error("Error filtering products:", error);
  }
}

// Event listener for category filtering
categories.forEach((category) => {
  category.addEventListener("click", async (e) => {
    e.preventDefault();
    const valueAttribute = category.getAttribute("data-filter");
    await filterProducts(valueAttribute);
    categories.forEach((category) =>
      category.classList.remove("active-portfolio")
    );
    category.classList.add("active-portfolio");
  });
});

// // Initial display of products
async function displayData() {
  await filterProducts("all");
}

// add to cart
async function addToCart(productId) {
  event.preventDefault();
  if (isLoggedIn()) {
    try {
      const quanitty = document.querySelector("#quantity");
      const quantityValue = quanitty.value;
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${api}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantityValue,
        }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
        }
      }
      console.log(response);

      document
        .querySelector(`#view-button-${productId}`)
        .classList.remove("hide");
    } catch (error) {
      console.error("Error: ", error.message);
    }
  }
}

function handleLogout() {
  localStorage.removeItem("accessToken");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  updateHeaderLinks();
  displayData();
  // fetchData();
});
