// const api = "http://127.0.0.1:5000/api";
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
    // console.log(response)
    const apiData = await response.json();
    // return apiData;
    displayProducts(apiData);
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
    // fetchUserData();
    // displayUserName();
  } else {
    loginRegister.classList.remove("hide");
    logout.classList.add("hide");
  }

  logout.addEventListener("click", handleLogout);
}

function handleLogout() {
  localStorage.removeItem("accessToken");
  window.location.href = "register.html";
}

// async function fetchUserData() {
//   try {
//     const apiKey = localStorage.getItem("accessToken")
//     const response = await fetch(`${api}/users`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${apiKey}`
//       },
//     });

//     console.log("response of fetch user data", response);
//     if (response.ok) {
//       const data = await response.json();
//       console.log("signup users data", data);
//       // displayUserName(data);
//     }
//   } catch (error) {
//     console.error("Error: ", error.message);
//   }
// }

// function displayUserName(userData) {
//   const userName = document.querySelector(".user-name");
//   userName.textContent = userData.first_name;
// }

// Display products based on the provided array of products

function displayProducts(products) {
  // console.log(products)
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
            <div class="product-price">
              <p>${product.price}$</p>
              <a href='#' class='add-to-cart-button' onclick='addToCart(${JSON.stringify(
                product.id
              )})'>
                <i class="fa-solid fa-cart-shopping"></i>
              </a>
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

// async function filterProducts(valueAttribute) {
//   try {
//     const apiData = await fetchData();
//     if (valueAttribute === "all") {
//       // Show all products
//       filteredProducts = apiData.slice(0, 6);
//     } else {
//       // Filter products based on category
//       filteredProducts = apiData
//         .filter(
//           (product) =>
//             product.category &&
//             product.category.toLowerCase() === valueAttribute.toLowerCase()
//         )
//         .slice(0, 6);
//     }
//     displayProducts(filteredProducts);
//   } catch (error) {
//     console.error("Error filtering products:", error);
//   }
// }

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

// // Initial display of products
// async function displayData() {
//   // await filterProducts("all");
// }

// add to cart
async function addToCart(productId) {
  console.log(productId);

  if (isLoggedIn()) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${api}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 2,
        }),
      });
      console.log(response);
    } catch (error) {
      console.error("Error: ", error.message);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateHeaderLinks();
  // displayData();
  fetchData();
});
