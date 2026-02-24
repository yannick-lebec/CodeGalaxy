✨ CodeGalaxy

CodeGalaxy est une plateforme d’apprentissage interactive du HTML.
L’utilisateur peut écrire du code, voir le rendu en temps réel et naviguer entre différents exercices stockés en base de données.

Ce projet est un MVP full-stack développé avec React, Express et PostgreSQL (Neon), dockerisé pour faciliter le déploiement.

🚀 Fonctionnalités

✍️ Éditeur de code HTML interactif

👀 Preview en temps réel via une sandbox (iframe)

✅ Système de validation des exercices

➡️ Navigation dynamique entre exercices

📚 Exercices stockés en base PostgreSQL

🌐 API REST avec Express

🐳 Environnement dockerisé (frontend + backend)

🛠️ Stack technique
Frontend

React

TypeScript

Vite

React Router

Gestion d’état avec useState

Requêtes asynchrones avec fetch et async/await

Backend

Node.js

Express

PostgreSQL (client pg)

Pool de connexions

Base de données

PostgreSQL (Neon - base cloud)

DevOps

Docker

Docker Compose

🏗️ Architecture
React (Frontend)
        ↓ fetch API
Express (Backend)
        ↓ SQL
PostgreSQL (Neon)
Flux d’une requête

L’utilisateur ouvre un exercice.

Le frontend fait un fetch vers /exercices/:slug.

Le backend exécute une requête SQL paramétrée.

PostgreSQL retourne les données.

Le frontend affiche l’exercice et le starter code.

📦 Installation en local
1️⃣ Cloner le projet
git clone https://github.com/yannick-lebec/CodeGalaxy.git
cd CodeGalaxy
2️⃣ Configurer les variables d’environnement

Créer un fichier .env à la racine du projet :

DATABASE_URL=postgresql://USER:PASSWORD@HOST.neon.tech/DBNAME?sslmode=require

⚠️ Remplacer par votre URL Neon.

3️⃣ Lancer le projet avec Docker
docker compose up --build

Frontend :

http://localhost:5173

Backend :

http://localhost:3000
📚 Structure du projet
CodeGalaxy/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   └── db.ts
│
├── docker-compose.yml
└── README.md
🗄️ Base de données

Le projet utilise PostgreSQL (Neon).

Table exercices
Colonne	Type	Description
id	SERIAL (PK)	Identifiant unique
slug	VARCHAR	Identifiant URL unique
level	INT	Niveau de difficulté
title	TEXT	Titre de l’exercice
description	TEXT	Description pédagogique
starter_code	TEXT	Code initial affiché
next_exercice	VARCHAR	Slug de l’exercice suivant

Les exercices sont récupérés dynamiquement via l’API Express.

🔐 Bonnes pratiques implémentées

Requêtes SQL paramétrées ($1) pour éviter les injections SQL

Pool de connexions PostgreSQL

Variables d’environnement pour sécuriser la connexion à la base

Séparation frontend / backend

Architecture REST

🎯 Objectif pédagogique

Ce projet démontre la maîtrise de :

React (routing, state, gestion d’événements)

Fonctions asynchrones (async/await)

Création d’API REST avec Express

Requêtes SQL (SELECT avec paramètres)

Connexion à une base PostgreSQL cloud

Conteneurisation avec Docker

👨‍💻 Auteur

Projet réalisé dans le cadre de la formation Ada Tech School.