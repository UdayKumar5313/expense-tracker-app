const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let expenses = [];

app.get('/expenses', (req, res) => {
  res.json(expenses);
});

app.post('/expenses', (req, res) => {
  const { amount, category, date } = req.body;
  expenses.push({ amount, category, date });
  res.json({ message: 'Expense added successfully' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
