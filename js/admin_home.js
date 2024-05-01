const totalProducts = document.querySelector(".total-products");

async function getProductsLength() {
  const response = await fetch(api);
  const data = await response.json();
  const productsLength = data.length;
  return productsLength;
}

getProductsLength().then((productLength) => {
  totalProducts.innerHTML = productLength;
});
