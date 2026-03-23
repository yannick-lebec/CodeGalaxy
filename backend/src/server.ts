// Import des dépendances
import express from "express";
import cors from "cors";
import { pool } from "./db";
import "dotenv/config"; // Permet d'utiliser les variables d'environnement

// Création de l'application Express
const app = express();

// Autorise les requêtes venant du frontend
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter((o): o is string => Boolean(o));

app.use(cors({ origin: allowedOrigins }));

// Permet de lire les requêtes JSON
app.use(express.json());

// Définition du port (variable d’environnement ou 3000 par défaut)
const PORT = Number(process.env.PORT) || 3000;

/* ================= ROUTE : GET /exercices ================= */

app.get("/exercices", async (_req, res) => {
  try {

    // Requête SQL pour récupérer tous les exercices
    const result = await pool.query(
      "SELECT id, slug, level, title, description, starter_code, next_exercice FROM exercices ORDER BY level ASC"
    );

    // Retourne les données en JSON
    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

/* ================= ROUTE : GET /exercices/:slug ================= */

app.get("/exercices/:slug", async (req, res) => {
  try {

    // Récupération du paramètre dynamique dans l'URL
    const { slug } = req.params;

    // Requête SQL paramétrée (protection contre injection SQL)
    const result = await pool.query(
      "SELECT id, slug, level, title, description, starter_code, next_exercice FROM exercices WHERE slug = $1",
      [slug]
    );

    // Si aucun exercice trouvé
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Exercice introuvable" });
    }

    // Retourne le premier résultat
    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

/* ================= LANCEMENT DU SERVEUR ================= */

app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});