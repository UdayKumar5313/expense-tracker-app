// Initialize data
let expenses = [];

// DOM elements
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');
const expenseList = document.getElementById('expense-list');
const expenseChart = document.getElementById('expense-chart');
const addExpenseButton = document.getElementById('add-expense');

// Add expense
addExpenseButton.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;
  const date = dateInput.value;

  if (amount && category && date) {
    expenses.push({ amount, category, date });
    updateExpenseList();
    updateChart();
    clearInputs();
  } else {
    alert('Please fill all fields!');
  }
});

// Update expense list
function updateExpenseList() {
  expenseList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.category} - $${expense.amount} (${expense.date})
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

// Delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  updateExpenseList();
  updateChart();
}

// Clear inputs
function clearInputs() {
  amountInput.value = '';
  categoryInput.value = '';
  dateInput.value = '';
}

// Generate pie chart
let chart;
function updateChart() {
  const categories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [{
      data: Object.values(categories),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9F40'],
    }]
  };

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(expenseChart, {
    type: 'pie',
    data,
  });
}
