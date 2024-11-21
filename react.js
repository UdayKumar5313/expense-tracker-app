import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ amount: '', category: '', date: '' });

  const handleAddExpense = () => {
    setExpenses([...expenses, { ...form, amount: parseFloat(form.amount) }]);
    setForm({ amount: '', category: '', date: '' });
  };

  const categories = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
      },
    ],
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Expense Tracker</h1>
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div style={{ width: '50%', margin: 'auto', marginTop: '20px' }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
}

export default App;
