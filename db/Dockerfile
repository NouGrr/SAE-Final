# Utiliser une image de base Node.js
FROM node:16

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier le package.json et package-lock.json (si présent)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source de l'application
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
