const api = "http://127.0.0.1:5000/api";
const productsContent = document.querySelector(".products-content");
const categories = document.querySelectorAll(".products-categories .category");
const productRow = document.querySelector("#product-row");
let filteredProducts = [];

async function fetchData() {
  const response = await fetch(`${api}/products`);
  const apiData = await response.json();
  return apiData;
}

// Display products based on the provided array of products
function displayProducts(products) {
  let html = "";

  for (const product of products) {
    html += `
      <div class="col-lg-4 col-md-4 col-sm-6 mb-4" data-id='${product.id}'>
        <div class="box" onclick='openProductPage(${JSON.stringify(
          product.id
        )})' >
          <div class='product-img'>
            <img src='${product.image_url}' alt=''>
          </div>
          <div class="product-header">
            <h2>${product.name}</h2>
            <p>${product.description} </p>
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

async function filterProducts(valueAttribute) {
  const apiData = await fetchData();
  if (valueAttribute === "all") {
    // Show all products
    filteredProducts = apiData.slice(0, 6);
  } else {
    // Filter products based on category
    filteredProducts = apiData
      .filter(
        (product) =>
          product.category.toLowerCase() === valueAttribute.toLowerCase()
      )
      .slice(0, 6);
  }
  displayProducts(filteredProducts);
}

// Event listener for category filtering
categories.forEach((category) => {
  category.addEventListener("click", async (e) => {
    e.preventDefault();
    const valueAttribute = category.getAttribute("data-filter");
    await filterProducts(valueAttribute);
    // Remove active class from all categories and add it to the clicked category
    categories.forEach((category) =>
      category.classList.remove("active-portfolio")
    );
    category.classList.add("active-portfolio");
  });
});

// Initial display of products
async function displayData() {
  await filterProducts("all");
}

displayData();

// async function checkLoginStatus() {
//   try {
//     const response = await fetch(`${api}/authenticate`, {
//       // method: "POST",
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer MY-API-KEY",
//       },
//       // body: JSON.stringify({'message': 'User login successful'
//     });
//     console.log(response);
//   } catch (error) {
//     console.error("Checking login status.", error);
//   }
// }

// function checkLoginStatus() {
//   const queryString = window.location.search;
//   console.log(queryString);
//   const urlParams = new URLSearchParams(queryString);
//   console.log(urlParams);
//   const loginState = urlParams.get("loginState");
//   console.log(loginState);

//   if (loginState){
//     document.querySelector(".login-register").style.display='none'
//   }
// }

// window.addEventListener("load", checkLoginStatus);
