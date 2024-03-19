// const content = document.getElementById("content");
// const addProductButton = document.getElementById("add-product-button");

// addProductButton.addEventListener("click", function (event) {
//   event.preventDefault();

//   displayAddProductForm();
// });

// function displayAddProductForm() {
//   content.innerHTML = `
//   <div>
//   <h2 class="mb-4">Create a product</h2>
//   <div class="row">
//     <div class="col-12">
//       <form class="row">
//         <div class="col-12">
//           <div class="form-floating position-relative">
//             <input
//               class="form-control"
//               type="text"
//               placeholder="Product title"
//               id='product-title'
//             />
//             <label>Product title</label>
//           </div>
//         </div>
//         <div class="col-md-3 col-sm-6">
//           <div class="form-floating position-relative">
//             <input
//               class="form-control"
//               type="number"
//               placeholder="Product price"
//               id='product-price'
//               onkeyup="getTotal()"

//             />
//             <label>Product price</label>
//           </div>
//         </div>
//         <div class="col-md-3 col-sm-6">
//           <div class="form-floating position-relative">
//             <input
//               class="form-control"
//               type="number"
//               placeholder="Product taxs"
//               id='product-taxs'
//             />
//             <label>Product taxs</label>
//           </div>
//         </div>
//         <div class="col-md-3 col-sm-6">
//           <div class="form-floating position-relative">
//             <input
//               class="form-control"
//               type="number"
//               placeholder="Product Ads"
//               id='product-ads'
//             />
//             <label>Product Ads</label>
//           </div>
//         </div>
//         <div
//           class="col-md-3 col-sm-6 d-flex align-items-center total-box"
//         >
//           <p class="total mb-0"></p>
//         </div>
//         <div class="col-12">
//           <div class="form-floating position-relative">
//             <input
//               class="form-control"
//               type="text"
//               placeholder="Product tags"
//               id='product-tags'
//             />
//             <label>Product tags</label>
//           </div>
//         </div>
//         <div class="col-12">
//           <div class="form-floating position-relative">
//             <input
//               class="form-control"
//               type="text"
//               placeholder="Product category"
//               id='product-category'
//             />
//             <label>Product category</label>
//           </div>
//         </div>
//         <div class="col-12">
//           <div class="buttons">
//             <button class="btn cancel-button" type="button" id='cancel-button'>
//               Cancel
//             </button>
//             <button
//               class="btn px-5 px-sm-15 create-product"
//               type="button" id='create-button'>
//               Create
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   </div>
// </div>

//   `;

//   const productTitle = document.getElementById("product-title"),
//     productPrice = document.getElementById("product-price"),
//     productTaxs = document.getElementById("product-taxs"),
//     productAds = document.getElementById("product-ads"),
//     productTotalPrice = document.getElementById("product-total-price"),
//     productTags = document.getElementById("product-tags"),
//     productCategory = document.getElementById("product-category"),
//     cancelProductButton = document.getElementById("cancel-button"),
//     createProductButton = document.getElementById("create-button"),
//     products = [];

//   createProductButton.addEventListener("click", createProduct);

//   function getTotal() {
//     if (productPrice.value !== "") {
//       let result = +productPrice.value + +productTaxs.value + +productAds.value;
//       productTotalPrice.innerHTML = result;
//     } else {
//       productTotalPrice.innerHTML = "";
//     }
//   }

//   function createProduct() {
//     let newProduct = {
//       title: productTitle.value.toLowerCase(),
//       price: productPrice.value,
//       taxs: productTaxs.value,
//       ads: productAds.value,
//       total: productTotalPrice.innerHTML,
//       tags: productTags.value.toLowerCase(),
//       category: productCategory.value.toLowerCase(),
//       publishedDate: getDate(),
//     };

//     if (
//       productTitle.value !== "" &&
//       productPrice.value !== "" &&
//       productCategory.value !== "" &&
//       productTags.value !== ""
//     ) {
//       products.push(newProduct);
//     }

//     clearData();
//     displayProducts();
//   }

//   function clearData() {
//     productTitle.value = "";
//     productPrice.value = "";
//     productTaxs.value = "";
//     productAds.value = "";
//     productTotalPrice.innerHTML = "";
//     productTags.value = "";
//     productCategory.value = "";
//   }

//   function getDate() {
//     const date = new Date();

//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();

//     let currentDate = `${day}/${month}/${year}`;
//   }

//   function displayProducts() {
//     let table = "";

//     for (let i = 0; i < products.length; i++) {
//       table += createTable(i);
//     }

//     document.getElementById("tbody").innerHTML = table;
//   }

//   function createTable(index) {
//     return `


//               <tr>
//                 <th scope="row">
//                   <form>
//                     <input class="form-check-input" type="checkbox" />
//                   </form>
//                 </th>
//                 <td>
//                   <a href="#" class="roundend-2">
//                     <img src="imgs/proudct-phone.png" alt="" />
//                   </a>
//                 </td>
//                 <td>
//                   <a href="#">
//                     ${products[index].title}
//                   </a>
//                 </td>
//                 <td>${products[index].price}</td>
//                 <td>${products[index].category}</td>
//                 <td>
//                   <div class="d-flex flex-wrap gap-2">
//                     <a href="#"><span class="badge-tag badge">${
//                       products[index].tags
//                     }</span></a>
//                     <a href="#"><span class="badge-tag badge">${
//                       products[index].tags
//                     }</span></a>
//                     <a href="#"
//                       ><span class="badge-tag badge">${
//                         products[index].tags
//                       }</span></a
//                     >
//                   </div>
//                 </td>
//                 <td><i class="fa-regular fa-star"></i></td>
//                 <td>${getDate()}</td>
//                 <td>
//                   <i class="fa-solid fa-ellipsis"></i>
//                 </td>
//               </tr>


// `;
//   }

//   createProduct();
// }
