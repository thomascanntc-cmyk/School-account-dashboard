// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  // Get accounts from localStorage
  let accounts = JSON.parse(localStorage.getItem("accounts")) || {};

  if (accounts[email] && accounts[email].password === password) {
    // Save logged-in user
    localStorage.setItem("loggedInUser", email);
    window.location.href = "index.html"; // redirect to dashboard
  } else {
    document.getElementById("errorMsg").textContent = "Incorrect Login Details";
  }
});