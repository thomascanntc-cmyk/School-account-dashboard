// login.js

document.addEventListener("DOMContentLoaded", () => {
  // Handle login form submission
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (username && password) {
        // Save logged in user to localStorage
        localStorage.setItem("loggedInUser", username);

        // Redirect to dashboard
        window.location.href = "index.html";
      } else {
        alert("Please enter both username and password.");
      }
    });
  }

  // Logout button logic (on dashboard page)
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  }
});