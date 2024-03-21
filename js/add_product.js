const productTitle = document.querySelector("#product-title"),
  productDescription = document.querySelector("#product-description"),
  productCategory = document.querySelector("#product-category"),
  productPrice = document.querySelector("#product-price"),
  publishProductButton = document.querySelector("#publish-product-button"),
  discardProductButton = document.querySelector("#discard-product-button"),
  uploadImgButton = document.querySelector("#file"),
  uploadedImgContainer = document.querySelector(".uploaded-img");
let products;

publishProductButton.addEventListener("click", addProduct);
discardProductButton.addEventListener("click", clearData);
uploadImgButton.addEventListener("change", uploadImg);

function checkProductInLocalStorage() {
  if (localStorage.getItem("product") !== null) {
    products = JSON.parse(localStorage.getItem("product"));
  } else {
    products = [];
  }
}

function addProduct() {
  if (
    productTitle.value === "" ||
    productPrice.value === "" ||
    productCategory.value === "" ||
    !uploadedImgContainer.querySelector("img")
  )
    return;

  let imgSrc = null;
  const uploadedImage = uploadedImgContainer.querySelector("img");
  if (uploadedImage) {
    imgSrc = uploadedImage.src;
  }

  let newProduct = {
    title: productTitle.value.trim().toLowerCase(),
    description: productDescription.value.trim()
      ? productDescription.value.toLowerCase()
      : "No description provided",
    category: productCategory.value.trim().toLowerCase(),
    image: imgSrc,
    price: productPrice.value.trim(),
  };

  if (
    productTitle.value !== "" &&
    productPrice.value !== "" &&
    productCategory.value !== "" &&
    imgSrc
  ) {
    products.push(newProduct);
    displaySuccessMessage();
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(products));
}

function clearData() {
  productTitle.value = "";
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

checkProductInLocalStorage();

// upload img
function uploadImg(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const imgSrc = e.target.result;

      // Create a new image element
      const imgElement = document.createElement("img");
      imgElement.src = imgSrc;

      // Create a delete button
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        uploadedImgContainer.removeChild(imgElement);
        uploadedImgContainer.removeChild(deleteButton);

        // Reattach event listener after deleting
        uploadImgButton.value = "";
        uploadImgButton.removeEventListener("change", uploadImg);
        uploadImgButton.addEventListener("change", uploadImg);
      });

      uploadedImgContainer.appendChild(imgElement);
      uploadedImgContainer.appendChild(deleteButton);
    };
    reader.readAsDataURL(file);
  }
}

function displaySuccessMessage() {
  const successMessage = document.querySelector(".success-message");
  const productsPageLink = document.querySelector(".see-products");
  successMessage.style.display = "block";

  productsPageLink.addEventListener("click", redirectToProductsPage);
}

function redirectToProductsPage() {
  const AllTabs = document.querySelectorAll(".tab");
  const tabTwo = document.querySelector("#tab-2");

  AllTabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  tabTwo.classList.add("active");

  location.reload();
}
