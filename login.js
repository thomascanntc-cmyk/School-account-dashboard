// login.js

// Handle login form submission
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
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

// Handle signup form submission (if you have a signup page)
document.getElementById("signupForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (username && password) {
    // Save new user (basic demo — replace with real backend logic)
    localStorage.setItem("loggedInUser", username);

    // Redirect to dashboard
    window.location.href = "index.html"; 
  } else {
    alert("Please fill in all fields.");
  }
});

// Logout button logic (on dashboard page)
document.getElementById("logoutBtn")?.addEventListener("click", function() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});