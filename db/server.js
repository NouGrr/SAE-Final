const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'saes5'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.get('/events', (req, res) => {
  db.query('SELECT * FROM calendrier', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.post('/events', (req, res) => {
  const { title, date, time } = req.body;
  if (!title || !date || !time) {
    res.status(400).send('Title, date, and time are required');
    return;
  }
  db.query('INSERT INTO calendrier (title, date, time) VALUES (?, ?, ?)', [title, date, time], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de l\'ajout de l\'événement');
      return;
    }
    res.status(201).send('Événement ajouté');
  });
});

app.delete('/events/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM calendrier WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send('Événement supprimé');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});