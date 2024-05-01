const loginForm = document.querySelector(".login form");
const message = document.querySelector(".message");
const api = "http://127.0.0.1:5000/api/authenticate";

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

    const responseData = await response.json();

    if (response.ok) {
      console.log("Login successful!");
      redirectToHome();
    } else {
      console.error("Login failed:", responseData.message);
    }
  } catch (error) {
    console.error("Login Faild");
  }
});

function redirectToHome() {
  window.location.href = "index.html";
}
