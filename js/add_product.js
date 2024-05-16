const productName = document.querySelector("#product-title"),
  productDescription = document.querySelector("#product-description"),
  productCategory = document.querySelector("#product-category"),
  productPrice = document.querySelector("#product-price"),
  publishProductButton = document.querySelector("#publish-product-button"),
  discardProductButton = document.querySelector("#discard-product-button");
const uploadImgContainer = document.querySelector(".uploaded-img"),
  inputImg = document.getElementById("file"),
  outputImg = document.querySelector("#output");
let uploadedImgUrl = "";

// events
publishProductButton.addEventListener("click", addProduct);
discardProductButton.addEventListener("click", clearData);
inputImg.addEventListener("change", (event) => {
  const file = event.target.files[0];
  uploadFile(file);
});

// check if the url contain productid to update it
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

if (productId) {
  fetchProductData(productId);
}

async function fetchProductData(productId) {
  try {
    const response = await fetch(`${api}/products/${productId}`);

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
  outputImg.src = uploadedImgUrl;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    outputImg.src = "";
    uploadImgContainer.removeChild(deleteButton);

    inputImg.removeEventListener("change", uploadFile);
    inputImg.addEventListener("change", uploadFile);
    uploadedImgUrl = "";
  });
  uploadImgContainer.appendChild(deleteButton);

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
    category: productCategory.value.trim().toLowerCase(),
    image_url: uploadedImgUrl,
    price: productPrice.value.trim(),
  };

  try {
    let requestMethod = "POST";
    let apiUrl = `${api}/products`;

    if (productId) {
      requestMethod = "PUT";
      apiUrl = `${api}/products/${productId}`;
    }

    const response = await fetch(`${apiUrl}`, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    // console.log(response);

    const data = await response.json();
    console.log(data);

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

// start upload img
async function uploadFile(file) {
  let formData = new FormData();
  formData.append("image_url", file);

  try {
    const response = await fetch(`${api}/upload`, {
      method: "POST",
      body: formData,
    });

    // console.log(response);

    if (!response.ok) {
      throw new Error("Faild to upload file");
    }

    const data = await response.json();

    uploadedImgUrl = `//wsl.localhost/Ubuntu-20.04/home/safeyayasien/Projects/Technology-City_V3/${data.file_path}`;

    outputImg.src = uploadedImgUrl;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      outputImg.src = "";
      uploadImgContainer.removeChild(deleteButton);

      inputImg.removeEventListener("change", uploadFile);
      inputImg.addEventListener("change", uploadFile);
      uploadedImgUrl = "";
    });

    uploadImgContainer.appendChild(deleteButton);
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

// clearn data from input fields
function clearData() {
  productName.value = "";
  productDescription.value = "";
  productCategory.value = "";
  productPrice.value = "";
  uploadedImgUrl = "";
  outputImg.src = "";

  const deleteButton = uploadImgContainer.querySelector(".btn");
  if (deleteButton) {
    uploadImgContainer.removeChild(deleteButton);
  }
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
