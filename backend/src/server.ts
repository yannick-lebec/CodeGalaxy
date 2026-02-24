import express from "express";
import cors from "cors";
import { pool } from "./db";
import "dotenv/config";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

app.get("/exercices", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, slug, level, title, description, starter_code, next_exercice FROM exercices ORDER BY level ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get("/exercices/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      "SELECT id, slug, level, title, description, starter_code, next_exercice FROM exercices WHERE slug = $1",
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Exercice introuvable" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});