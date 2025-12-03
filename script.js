// script.js
document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseTableBody = document.getElementById("expenseTableBody");
  const totalDisplay = document.getElementById("total");
  const filterBtn = document.getElementById("filter-btn");
  const resetBtn = document.getElementById("reset-btn");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const chartCanvas = document.getElementById("expenseChart");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Initialize chart
  let expenseChart = new Chart(chartCanvas, {
    type: "pie",
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56",
          "#4BC0C0", "#9966FF", "#FF9F40"
        ]
      }]
    }
  });

  // Add expense
  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = new Date().toISOString().split("T")[0];

    if (!category || !description || isNaN(amount) || amount <= 0) {
      alert("Please fill all fields with valid data.");
      return;
    }

    const expense = { date, category, description, amount };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderTable(expenses);
    updateChart(expenses);
    expenseForm.reset();
  });

  // Render table
  function renderTable(data) {
    expenseTableBody.innerHTML = "";
    let total = 0;

    data.forEach((exp, index) => {
      total += exp.amount;
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${exp.date}</td>
        <td>${exp.category}</td>
        <td>${exp.description}</td>
        <td>${exp.amount.toFixed(2)}</td>
        <td><button class="delete-btn">Delete</button></td>
      `;

      // Attach delete event properly
      row.querySelector(".delete-btn").addEventListener("click", () => {
        deleteExpense(index);
      });

      expenseTableBody.appendChild(row);
    });

    totalDisplay.textContent = total.toFixed(2);
  }

  // Delete expense
  function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderTable(expenses);
    updateChart(expenses);
  }

  // Filter by date
  filterBtn.addEventListener("click", () => {
    const fromDate = document.getElementById("from-date").value;
    const toDate = document.getElementById("to-date").value;

    const filtered = expenses.filter(exp => {
      return (!fromDate || exp.date >= fromDate) &&
             (!toDate || exp.date <= toDate);
    });

    renderTable(filtered);
    updateChart(filtered);
  });

  // Reset filter
  resetBtn.addEventListener("click", () => {
    renderTable(expenses);
    updateChart(expenses);
  });

  // Clear all records
  clearAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all records?")) {
      expenses = [];
      localStorage.removeItem("expenses");
      renderTable(expenses);
      updateChart(expenses);
    }
  });

  // Update chart
  function updateChart(data) {
    const categories = {};
    data.forEach(exp => {
      categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
    });

    expenseChart.data.labels = Object.keys(categories);
    expenseChart.data.datasets[0].data = Object.values(categories);
    expenseChart.update();
  }

  // Initial load
  renderTable(expenses);
  updateChart(expenses);
});