const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Ajout de bcrypt pour le hachage des mots de passe
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
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

// Route pour obtenir les événements
app.get('/events', (req, res) => {
  db.query('SELECT * FROM calendrier', (err, results) => {
    if (err) {
      console.error('Erreur MySQL dans /events (GET) :', err); // Debug
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// Route pour ajouter un événement
app.post('/events', (req, res) => {
  const { title, date, time } = req.body;
  console.log('Données reçues :', { title, date, time }); // Debug

  if (!title || !date || !time) {
    res.status(400).send('Title, date, and time are required');
    return;
  }

  db.query(
    'INSERT INTO calendrier (title, date, time) VALUES (?, ?, ?)',
    [title, date, time],
    (err, results) => {
      if (err) {
        console.error('Erreur MySQL dans /events (POST) :', err); // Debug
        res.status(500).send('Erreur lors de l\'ajout de l\'événement');
        return;
      }
      res.status(201).json({ message: 'Événement ajouté', eventId: results.insertId });
    }
  );
});

// Route pour supprimer un événement
app.delete('/events/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM calendrier WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erreur MySQL dans /events/:id (DELETE) :', err); // Debug
      res.status(500).send(err);
      return;
    }
    res.send('Événement supprimé');
  });
});

// Route pour l'enregistrement d'un utilisateur
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Vérification des données
  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe sont requis' });
  }

  // Hachage du mot de passe
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Erreur lors du hachage du mot de passe', err);
      return res.status(500).json({ message: 'Erreur de sécurité lors de l\'enregistrement' });
    }

    // Insérer l'utilisateur dans la base de données
    db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error('Erreur lors de l\'insertion de l\'utilisateur', err);
          return res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
        }
        res.status(201).json({ message: 'Utilisateur créé avec succès', userId: results.insertId });
      }
    );
  });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
