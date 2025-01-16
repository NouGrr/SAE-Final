# Utiliser une image officielle de Node.js comme image de base
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier tout le code de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel ton serveur écoute
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
