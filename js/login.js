// const api = "http://127.0.0.1:5000/api/authenticate";
const api = "http://196.218.124.110:5000/api/authenticate";

const loginForm = document.querySelector(".login form");
const message = document.querySelector(".message");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = loginForm.querySelector("#email").value;
  const password = loginForm.querySelector("#password").value;

  // Validation
  if (email.trim() === "") {
    message.innerHTML = "Please enter your email.";
    return;
  }

  if (password.trim() === "") {
    message.innerHTML = "Please enter your password.";
    return;
  }

  const responseBody = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(responseBody),
    });

    console.log(response);
    if (response.ok) {
      const responseData = await response.json();
      saveToLocalStorage(responseData);
      redirectToHome();
    } else {
      console.error("Login failed:");
    }
  } catch (error) {
    console.error("Login Faild", error.message);
  }
});

function saveToLocalStorage(userData) {
  localStorage.setItem("accessToken", userData.token);
}

// redirect to home page
function redirectToHome() {
  window.location.href = "index.html";
}
