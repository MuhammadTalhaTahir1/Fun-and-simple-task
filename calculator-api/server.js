const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/calculate', (req, res) => {
  const {num1, num2, operation} = req.body;

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({error: 'Invalid input'});
  }

  let result;
  switch (operation) {
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
      return res.status(400).json({error: 'Invalid operation'});
  }

  res.json({result});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
