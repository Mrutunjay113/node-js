const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    data: 'Hello World',
  });
});

app.post('/', (req, res) => {
  res.status(200).send('POST request to the homepage');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
