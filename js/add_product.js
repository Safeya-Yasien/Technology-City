const productName = document.querySelector("#product-title"),
  productDescription = document.querySelector("#product-description"),
  productPrice = document.querySelector("#product-price"),
  publishProductButton = document.querySelector("#publish-product-button"),
  discardProductButton = document.querySelector("#discard-product-button"),
  uploadImgButton = document.querySelector("#file"),
  uploadedImgContainer = document.querySelector(".uploaded-img");
publishProductButton.addEventListener("click", addProduct);
discardProductButton.addEventListener("click", clearData);
uploadImgButton.addEventListener("change", uploadImg);

async function addProduct() {
  if (productName.value === "" || productPrice.value === "") {
    // || !uploadedImgContainer.querySelector("img"))

    return;
  }

  let imgSrc = null;
  const uploadedImage = uploadedImgContainer.querySelector("img");
  if (uploadedImage) {
    imgSrc = uploadedImage.src;
  }

  let newProduct = {
    name: productName.value.trim().toLowerCase(),
    description: productDescription.value.trim()
      ? productDescription.value.toLowerCase()
      : "No description provided",
    image: imgSrc,
    price: productPrice.value.trim(),
  };

  try {
    let requestMethod = "POST";

    if (publishProductButton.innerHTML === "Update Product") {
      requestMethod = "PUT";
    }

    const response = await fetch(api, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    console.log(response);

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

function clearData() {
  productName.value = "";
  productDescription.value = "";
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
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const imgSrc = e.target.result;

      const imgElement = document.createElement("img");
      imgElement.src = imgSrc;
      imgElement.alt = "product";

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        uploadedImgContainer.removeChild(imgElement);
        uploadedImgContainer.removeChild(deleteButton);

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

function redirectToProductsPage() {
  const AllTabs = document.querySelectorAll(".tab");
  const tabTwo = document.querySelector("#tab-2");

  fetchProducts();

  AllTabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  $(tabTwo).hide().fadeIn(1000);
}
