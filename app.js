// app.js
const express = require('express');
const app = express();

// Placeholder data
const employees = [
  { id: 1, name: 'Chicken Johnson', position: 'Manager' },
  { id: 2, name: 'Bobert Smith', position: 'Developer' },
  { id: 3, name: 'Mickie Leebron', position: 'Developer' },
];

// GET / => "Hello employees"
app.get('/', (req, res) => {
  res.send('Hello employees');
});

// GET /employees => array of employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// GET /employees/random => one random employee
app.get('/employees/random', (req, res) => {
  const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
  res.json(randomEmployee);
});

// GET /employees/:id => employee by ID or 404
app.get('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(e => e.id === id);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

module.exports = app;

