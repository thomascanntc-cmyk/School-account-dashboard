const expenseForm = document.getElementById("expense-form");
const expenseTable = document.getElementById("expenseTableBody"); // tbody
const totalDisplay = document.getElementById("total");
const ctx = document.getElementById("expenseChart").getContext("2d");

let expenses = JSON.parse(localStorage.getItem("schoolExpenses")) || [];
let total = 0;
let editIndex = null; // track which expense is being edited

// Chart setup
let chart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Fees", "Canteen", "Stationery", "Maintenance", "Utilities", "Others"],
    datasets: [{
      label: "Expenses by Category",
      data: [0, 0, 0, 0, 0, 0],
      backgroundColor: ["#ff6666", "#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#c299ff"],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Expense Breakdown by Category" }
    }
  }
});

// Initialize table & chart
function loadExpenses() {
  expenseTable.innerHTML = "";
  total = 0;
  let categoryTotals = { Fees: 0, Canteen: 0, Stationery: 0, Maintenance: 0, Utilities: 0, Others: 0 };

  expenses.forEach((exp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${exp.date}</td>
      <td>${exp.category}</td>
      <td>${exp.description}</td>
      <td>${exp.amount.toFixed(2)}</td>
      <td>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </td>
    `;
    expenseTable.appendChild(row);
    total += exp.amount;
    if (categoryTotals[exp.category] !== undefined) {
      categoryTotals[exp.category] += exp.amount;
    }
  });

  totalDisplay.textContent = total.toFixed(2);

  chart.data.datasets[0].data = Object.values(categoryTotals);
  chart.update();

  // Attach delete event listeners
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index");
      expenses.splice(idx, 1);
      localStorage.setItem("schoolExpenses", JSON.stringify(expenses));
      loadExpenses();
    });
  });

  // Attach edit event listeners
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      editIndex = e.target.getAttribute("data-index");
      const exp = expenses[editIndex];
      document.getElementById("category").value = exp.category;
      document.getElementById("description").value = exp.description;
      document.getElementById("amount").value = exp.amount;
    });
  });
}

// Add or update expense
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = new Date().toLocaleDateString();

  if (!category || !description || isNaN(amount)) {
    alert("Please fill all fields!");
    return;
  }

  if (editIndex !== null) {
    // Update existing expense
    expenses[editIndex] = { date, category, description, amount };
    editIndex = null;
  } else {
    // Add new expense
    const expense = { date, category, description, amount };
    expenses.push(expense);
  }

  localStorage.setItem("schoolExpenses", JSON.stringify(expenses));
  loadExpenses();
  expenseForm.reset();
});

// Handle logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser"); // clear session
  window.location.href = "login.html";     // redirect to login
});

// Restrict access if not logged in
const loggedInUser = localStorage.getItem("loggedInUser");
if (!loggedInUser) {
  window.location.href = "login.html";
} else {
  // Display logged-in user
  document.getElementById("userDisplay").textContent = loggedInUser;
}

// Handle logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser"); // clear session
  window.location.href = "login.html";     // redirect to login
});


// Initial load
loadExpenses();