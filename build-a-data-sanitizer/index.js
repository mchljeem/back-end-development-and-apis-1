
const express = require('express');
const path = require('path');

const { inputCleaner, inputValidator } = require('./middleware');

const app = express();
const PORT = 3000;

// Parse form data
app.use(express.urlencoded({ extended: false }));

// Redirect the homepage to the form
app.get('/', (req, res) => {
  res.redirect('/form');
});

// Serve the HTML form
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Process submitted form data
app.post('/submit', inputCleaner, inputValidator, (req, res) => {
  res.send(`Username: ${req.body.username}, Comment: ${req.body.comment}`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
