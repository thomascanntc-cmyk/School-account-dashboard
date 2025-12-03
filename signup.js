document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;

  // Retrieve existing accounts from localStorage or create empty object
  let accounts = JSON.parse(localStorage.getItem("accounts")) || {};

  // Check if email already exists
  if (accounts[email]) {
    alert("An account with this email already exists. Please log in.");
    window.location.href = "login.html";
    return;
  }

  // Save new account
  accounts[email] = {
    fullname,
    phone,
    password
  };

  localStorage.setItem("accounts", JSON.stringify(accounts));

  alert("Account created successfully! You can now log in.");
  window.location.href = "login.html";
});