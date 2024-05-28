const api = "http://196.218.124.110:5000/api";

if (isLoggedIn()) {
  getCartProducts();
}

function isLoggedIn() {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken !== null;
}
async function getCartProducts() {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(`${api}/cart`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.clear();
        window.location.href = "login.html";
      }
    }
    const data = await response.json();
    console.log(data);
    showData(data);
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

function showData(cartProducts) {
  cartProducts.map((productInfo) => {
    showProduct(productInfo.product_id, productInfo.quantity);
  });
}

async function showProduct(productId, productQuantity) {
  try {
    const response = await fetch(`${api}/products/${productId}`);
    if (!response.ok) {
      console.error("Faild to fetch product");
    }
    const product = await response.json();
    const itemCart = document.querySelector(".item-carts tbody");
    const tr = document.createElement("tr");
    tr.classList.add("item-cart");

    tr.innerHTML = `
  <td class="product-name d-flex align-items-center">
    <div class="product-img">
      <img src=${product.image_url} alt="phone" />
    </div>
    <div class="product-info">
      <a href="#">${product.name}</a>
    </div>
  </td>
  <td class="product-quantity">
    <div class="e-quantity">
      <div class="quantity-button minus">-</div>
      <label for="quantity-number-1" class="sr-only"
        >Quantity</label
      >
      <input
        type="number"
        name="quantity"
        value=${productQuantity}
        id="quantity-number-1"
      />
      <div class="quantity-button plus">+</div>
    </div>
  </td>
  <td class="total-price">
    <p class="price">${product.price}$</p>
  </td>
  <td class="product-remove">
    <button class='btn' id='delete-product' onclick='deleteProduct(${JSON.stringify(
      product.id
    )})'>
      <a href="#" aria-label="remove item">
        <i class="fa-solid fa-xmark"></i>
      </a>
    </button>
  </td>
  `;
    itemCart.appendChild(tr);
  } catch (error) {
    console.error("Error", error.message);
  }
}

// delete product from cart
async function deleteProduct(productId) {
  event.preventDefault();

  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${api}/products/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      console.error("Didn't found product");
    }
    const data = await response.json();
    console.log(data);

    getCartProducts();
  } catch (error) {
    console.error("Error", error.message);
  }
}
