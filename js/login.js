const loginForm = document.querySelector(".login form");

const api = "http://127.0.0.1:5000/api/authenticate";

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = loginForm.querySelector("#email").value;
  const password = loginForm.querySelector("#password").value;

  // Validation
  if (email.trim() === "") {
    console.log("Please enter your email.");
    return;
  }

  if (password.trim() === "") {
    console.log("Please enter your password.");
    return;
  }

  //   console.log("Login successful!");
  //   redirectToHome();
  // });

  const responseBody = {
    emial: email,
    password: password,
  };

  try {
    const response = await fetch(api, {
      method: "POST",
      headers: "application/json",
      body: JSON.stringify(responseBody),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log("Login successful!");
      //   loginForm.reset();
      redirectToHome();
    } else {
      console.error("Login failed:", responseData.message);
    }
  } catch (error) {
    console.error("Login Faild");
  }
});

function redirectToHome() {
  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
}
