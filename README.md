# ✨ CodeGalaxy

CodeGalaxy est une plateforme d’apprentissage interactive du HTML.
L’utilisateur peut écrire du code, voir le rendu en temps réel et naviguer entre différents exercices stockés en base de données.

Ce projet est un MVP full-stack développé avec React, Express et PostgreSQL (Neon), dockerisé pour faciliter le déploiement.

## 🚀 Fonctionnalités

✍️ Éditeur de code HTML interactif

👀 Preview en temps réel via une sandbox (iframe)

✅ Système de validation des exercices

➡️ Navigation dynamique entre exercices

📚 Exercices stockés en base PostgreSQL

🌐 API REST avec Express

🐳 Environnement dockerisé (frontend + backend)

## 🛠️ Stack technique
Frontend

React

TypeScript

Vite

React Router

useState

async/await

fetch

Backend

Node.js

Express

PostgreSQL (pg)

Pool de connexions

Base de données

PostgreSQL (Neon)

DevOps

Docker

Docker Compose

## 🏗️ Architecture
React (Frontend)
        ↓ fetch API
Express (Backend)
        ↓ SQL
PostgreSQL (Neon)
### 📦 Installation
1️⃣ Cloner le projet
git clone https://github.com/yannick-lebec/CodeGalaxy.git
cd CodeGalaxy
2️⃣ Créer un fichier .env à la racine
DATABASE_URL=postgresql://USER:PASSWORD@HOST.neon.tech/DBNAME?sslmode=require
3️⃣ Lancer le projet
docker compose up --build

### Frontend :
http://localhost:5173

### Backend :
http://localhost:3000

## 📚 Structure du projet
CodeGalaxy/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   └── db.ts
│
└── docker-compose.yml
🗄️ Base de données

### Le projet utilise une seule table : exercices.

Table exercices

id (PRIMARY KEY)

slug (unique)

level

title

description

starter_code

next_exercice

Les exercices sont récupérés dynamiquement via l’API Express.

### 🔐 Bonnes pratiques

Requêtes SQL paramétrées ($1)

Pool PostgreSQL

Variables d’environnement

Architecture REST

Séparation frontend / backend

## 🎯 Objectif pédagogique

Ce projet démontre la maîtrise de :

React (state, routing, événements)

async/await

Express (routes API)

SQL (SELECT avec paramètres)

PostgreSQL

Docker

## 👨‍💻 Auteur

Projet réalisé dans le cadre de la formation Ada Tech School.