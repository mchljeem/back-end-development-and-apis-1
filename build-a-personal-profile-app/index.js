
const express = require('express');

const app = express();

const PORT = 3000;

// Homepage route
app.get('/', (req, res) => {
  res.send("Welcome to Camper Bot's homepage!");
});

// Hobbies route
app.get('/hobbies', (req, res) => {
  res.send('I cycle, go boating, and play guitar.');
});

// Skills route
app.get('/skills', (req, res) => {
  res.send('JavaScript, Node.js, and Express.js!');
});

// Personal profile API route
app.get('/api/profile', (req, res) => {
  res.json({
    name: 'Camper Bot',
    hobbies: ['cycling', 'boating', 'guitar'],
    skills: ['JavaScript', 'Node.js', 'Express.js']
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
