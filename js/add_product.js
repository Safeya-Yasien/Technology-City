const productName = document.querySelector("#product-title"),
  productDescription = document.querySelector("#product-description"),
  productCategory = document.querySelector("#product-category"),
  productPrice = document.querySelector("#product-price"),
  publishProductButton = document.querySelector("#publish-product-button"),
  discardProductButton = document.querySelector("#discard-product-button"),
  uploadImgButton = document.querySelector("#file"),
  uploadedImgContainer = document.querySelector(".uploaded-img");

let uploadedImgUrl = "";

// events
publishProductButton.addEventListener("click", addProduct);
discardProductButton.addEventListener("click", clearData);
uploadImgButton.addEventListener("change", uploadImg);

// check if the url contain productid to update it
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

if (productId) {
  fetchProductData(productId);
}

async function fetchProductData(productId) {
  try {
    const response = await fetch(`${api}/${productId}`);

    if (!response.ok) {
      throw new Error("Faild to fetch product data.");
    }

    const productData = await response.json();
    console.log(productData);

    // populate input fields
    populateInputFields(productData);

    // chagne publish button to update
    publishProductButton.innerHTML = "Update Product";
  } catch (error) {
    console.log("Error fetching product data:", error.message);
  }
}

function populateInputFields(product) {
  productName.value = product.name;
  productDescription.value = product.description;
  productCategory.value = product.category;

  // start displaying img
  uploadedImgUrl = product.image_url;
  document.querySelector("#output").src = uploadedImgUrl;
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn";
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    uploadedImgUrl = "";
    document.querySelector("#output").src = uploadedImgUrl;
    uploadedImgContainer.removeChild(deleteButton);

    uploadImgButton.removeEventListener("change", uploadImg);
    uploadImgButton.addEventListener("change", uploadImg);
  });
  uploadedImgContainer.appendChild(deleteButton);
  // end displaying img

  productPrice.value = product.price;
}

async function addProduct() {
  // check if all required fileds are filled
  if (
    productName.value === "" ||
    productPrice.value === "" ||
    productCategory.value === "" ||
    uploadedImgUrl === ""
  ) {
    return;
  }

  let newProduct = {
    name: productName.value.trim().toLowerCase(),
    description: productDescription.value.trim()
      ? productDescription.value.toLowerCase()
      : "No description provided",
    category: productCategory.value.trim(),
    image_url: uploadedImgUrl,
    price: productPrice.value.trim(),
  };

  console.log(newProduct);

  try {
    let requestMethod = "POST";
    let apiUrl = api;

    if (productId) {
      requestMethod = "PUT";
      apiUrl = `${api}/${productId}`;
    }

    const response = await fetch(apiUrl, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    // test api
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("Faild to add/update product.");
    }

    if (publishProductButton.innerHTML === "Update Product") {
      displaySuccessMessage("Product Updated Successfully");
    } else {
      publishProductButton.innerHTML === "Publish Product";
      displaySuccessMessage("Product Added Successfully");
    }

    publishProductButton.innerHTML = "Publish Product";

    clearData();
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

// clearn data from input fields
function clearData() {
  productName.value = "";
  productDescription.value = "";
  productCategory.value = "";
  productPrice.value = "";

  const uploadedImage = uploadedImgContainer.querySelector("img");
  const deleteButton = uploadedImgContainer.querySelector("button");
  if (uploadedImage) {
    uploadedImgContainer.removeChild(uploadedImage);
  }
  if (deleteButton) {
    uploadedImgContainer.removeChild(deleteButton);
  }
}

// upload img
function uploadImg(event) {
  let image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);

  uploadedImgUrl = image.src;
  console.log("Uploaded image URL:", uploadedImgUrl);

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn";
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    uploadedImgContainer.removeChild(deleteButton);
    image.src = "";
    uploadImgButton.removeEventListener("change", uploadImg);
    uploadImgButton.addEventListener("change", uploadImg);
    uploadedImgUrl = "";
  });

  uploadedImgContainer.appendChild(deleteButton);
}

// if product created successfully
function displaySuccessMessage(message) {
  const successMessageCotainer = document.querySelector(
    ".success-message-container"
  );
  const successMessage = document.querySelector(".success-message");
  const productsPageLink = document.querySelector(".see-products");
  successMessage.innerHTML = message;
  successMessageCotainer.style.display = "block";

  productsPageLink.addEventListener("click", redirectToProductsPage);
}

// redirect to products page
function redirectToProductsPage() {
  window.location.href = "admin_products.html";
}
