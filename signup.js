// signup.js

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const username = document.getElementById("signupUsername").value.trim();
      const password = document.getElementById("signupPassword").value.trim();

      if (username && password) {
        // Save new user (demo only — replace with backend logic later)
        localStorage.setItem("loggedInUser", username);

        // Redirect to dashboard
        window.location.href = "index.html";
      } else {
        alert("Please fill in all fields.");
      }
    });
  }
});