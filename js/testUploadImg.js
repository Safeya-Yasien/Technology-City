const uploadImgForm = document.getElementById("upload-img-form");
console.log(uploadImgForm);
const inputImg = document.getElementById("input-img");
const uploadedImage = document.getElementById("output");
// const inputImg = document.getElementById("file");
console.log(inputImg);

uploadImgForm.addEventListener("submit", uploadImg);

// function uploadImg(event) {
//   event.preventDefault();


//   const formData = new FormData();

//   formData.append("inputImg", inputImg.files[0]);


//   uploadedImage.src = URL.createObjectURL(inputImg.files[0]);

// }

function uploadImg(event) {
  event.preventDefault();

  const formData = new FormData();
  const uploadedFile = inputImg.files[0];

  formData.append("inputImg", uploadedFile);
  uploadedImage.src = URL.createObjectURL(uploadedFile);

  console.log("Path of the uploaded image:", uploadedFile.name);
}


