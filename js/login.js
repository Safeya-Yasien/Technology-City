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

    console.log(response)
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData)
      redirectToHome();
    } else {
      console.error("Login failed:", responseData.message);
    }
  } catch (error) {
    console.error("Login Faild");
  }
});

// redirect to home page
function redirectToHome() {
  console.log("go to home")
  // window.location.href = "index.html";
  // document.querySelector(".login-register").classList.add("hide")

  // setTimeout(() => {
  //   window.location.href = "index.html";
  // }, 2000);
  // setTimeout(() => {
  //   window.location.href = `index.html?loginState=${token}`;
  // }, 2000);
  window.location.href = "index.html";

  setTimeout(() => {
    const loginRegisterIcons = document.querySelector(".login-register");
    if (loginRegisterIcons) {
      loginRegisterIcons.style.display = "none";
    }
  }, 500);

}
