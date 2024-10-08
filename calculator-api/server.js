const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to the Calculator API!');
});
app.post('/calculate', (req, res) => {
  const {num1, num2, operator} = req.body;
  let result;

  switch (operator) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    default:
      return res.status(400).json({error: 'Invalid operation'}); // This line sends the error message if the operator is invalid
  }

  res.json({result}); // This sends the result back as JSON
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
