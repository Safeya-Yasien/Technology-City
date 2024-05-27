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
  } catch (error) {
    console.error("Error: ", error.message);
  }
}
