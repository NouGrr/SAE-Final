const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;

function connectToDatabase() {
    const connection = mysql.createConnection({
        host: 'host.docker.internal',  // Utiliser 'host.docker.internal' pour se connecter à l'hôte local depuis Docker
        user: 'root',
        password: 'root',
        database: 'saes5'
      });

  connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données:', err.stack);
      setTimeout(connectToDatabase, 5000); // Réessayer après 5 secondes si la connexion échoue
      return;
    }
    console.log('Connecté à la base de données MySQL');
  });

  return connection;
}

// Connexion initiale à la base de données
connectToDatabase();

// Exemple d'API REST
app.get('/', (req, res) => {
  res.send('API fonctionne !');
});

app.listen(port, () => {
  console.log(`Serveur API démarré sur http://localhost:${port}`);
});
