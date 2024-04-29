const api = "http://127.0.0.1:5000/api/signup";

const signUpForm = document.querySelector(".register form");

signUpForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = signUpForm.querySelector("#name").value;
  const email = signUpForm.querySelector("#email").value;
  const password = signUpForm.querySelector("#password").value;
  const repeatPassword = signUpForm.querySelector("#repeat-password").value;

  // Validation
  if (name.trim() === "") {
    console.log("Please enter your name.");
    return;
  }

  if (email.trim() === "") {
    console.log("Please enter your email.");
    return;
  }

  if (password.trim() === "") {
    console.log("Please enter a password.");
    return;
  }

  if (password !== repeatPassword) {
    console.log("Passwords do not match.");
    return;
  }

  if (!document.getElementById("agree-term").checked) {
    console.log("Please agree to the terms of service.");
    return;
  }

  const requestBody = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log("registration successful");
      //   signUpForm.reset();
      redirectToLogin();
    } else {
      console.error("registration failed:", responseData.message);
    }
  } catch (error) {
    console.error("registration failed:", responseData.message);
  }
});

function redirectToLogin() {
  setTimeout(() => {
    window.location.href = "login.html";
  }, 3000);
}
