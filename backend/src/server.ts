// Import des dépendances
import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { pool } from "./db";
import { auth } from "./auth";

const app = express();

// CORS : autorise les origines connues avec credentials (cookies de session)
const allowedOrigins = [
  /^http:\/\/localhost:\d+$/,
  /^https:\/\/code-galaxy[a-z0-9-]*\.vercel\.app$/,
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

/* ================= BETTER AUTH ================= */

// Toutes les routes /api/auth/* sont gérées par Better Auth
app.all("/api/auth/*", toNodeHandler(auth));

/* ================= HELPER SESSION ================= */

async function getSession(req: express.Request) {
  return auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
}

/* ================= ROUTE : GET /exercices ================= */

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

/* ================= ROUTE : GET /exercices/:slug ================= */

app.get("/exercices/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      "SELECT id, slug, level, title, description, starter_code, starter_css, next_exercice FROM exercices WHERE slug = $1",
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

/* ================= ROUTE : GET /progress ================= */

app.get("/progress", async (req, res) => {
  try {
    const session = await getSession(req);
    if (!session) return res.status(401).json({ error: "Non authentifié" });

    const result = await pool.query(
      "SELECT exercice_slug FROM user_progress WHERE user_id = $1",
      [session.user.id]
    );
    res.json(result.rows.map((r) => r.exercice_slug));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

/* ================= ROUTE : POST /progress/:slug ================= */

app.post("/progress/:slug", async (req, res) => {
  try {
    const session = await getSession(req);
    if (!session) return res.status(401).json({ error: "Non authentifié" });

    const { slug } = req.params;
    await pool.query(
      "INSERT INTO user_progress (user_id, exercice_slug) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [session.user.id, slug]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

/* ================= LANCEMENT DU SERVEUR ================= */

app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});
