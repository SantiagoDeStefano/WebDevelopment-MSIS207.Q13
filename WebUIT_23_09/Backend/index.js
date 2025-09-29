// index.js
const express = require('express');
const app = express();
const port = 3001;

// A simple route
app.get('/', (req, res) => {
  res.send('Hello World from Joji!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
