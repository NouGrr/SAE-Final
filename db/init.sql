CREATE TABLE IF NOT EXISTS calendrier (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL
);

-- Exemple d'insertion de données
INSERT INTO calendrier (title, date, time) VALUES ('Test', '2025-01-18', '14:00:00');
