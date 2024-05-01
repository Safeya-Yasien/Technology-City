const api = "http://127.0.0.1:5000/api/signup";

const signUpForm = document.querySelector(".register form");

const message = document.querySelector(".message");

signUpForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const firstName = signUpForm.querySelector("#f-name").value,
    lastName = signUpForm.querySelector("#l-name").value,
    email = signUpForm.querySelector("#email").value,
    password = signUpForm.querySelector("#password").value,
    repeatPassword = signUpForm.querySelector("#repeat-password").value;

  // Validation
  if (firstName.trim() === "") {
    message.innerHTML = "Please enter your first name.";
    return;
  }
  if (lastName.trim() === "") {
    message.innerHTML = "Please enter your last name.";
    return;
  }

  if (email.trim() === "") {
    message.innerHTML = "Please enter your email.";
    return;
  }

  if (password.trim() === "") {
    message.innerHTML = "Please enter a password.";
    return;
  }

  if (password !== repeatPassword) {
    message.innerHTML = "Passwords do not match.";
    return;
  }

  if (!document.getElementById("agree-term").checked) {
    message.innerHTML = "Please agree to the terms of service.";
    return;
  }

  const requestBody = {
    email: email,
    password: password,
    first_name: firstName,
    last_name: lastName,
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
      redirectToLogin();
    } else {
      console.error("registration failed:", responseData.message);
    }
  } catch (error) {
    console.error("registration failed:", responseData.message);
  }
});

function redirectToLogin() {
  window.location.href = "login.html";
}
