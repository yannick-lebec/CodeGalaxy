import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sql } from "./db/client";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) throw new Error("JWT_SECRET manquant dans .env");

// ✅ init tables (si pas déjà créées)
async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS courses (
      id BIGSERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS user_progress (
      user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      progress INT NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (user_id, course_id)
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id)`;
  console.log("DB ready");
}

// ✅ middleware auth
function authMiddleware(req: any, res: any, next: any) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }
  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token invalide" });
  }
}

// ✅ routes
app.get("/", (_req, res) => res.json({ ok: true }));

app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  const existing = await sql<{ id: number }[]>`
    SELECT id FROM users WHERE email = ${email} LIMIT 1
  `;
  if (existing.length) {
    return res.status(409).json({ message: "Utilisateur déjà existant" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const created = await sql<{ id: number; email: string }[]>`
    INSERT INTO users (email, password_hash)
    VALUES (${email}, ${passwordHash})
    RETURNING id, email
  `;

  return res.status(201).json({ message: "Compte créé", user: created[0] });
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  const rows = await sql<{ id: number; email: string; password_hash: string }[]>`
    SELECT id, email, password_hash
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  const user = rows[0];
  if (!user) return res.status(401).json({ message: "Identifiants invalides" });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: "Identifiants invalides" });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  return res.json({ token });
});

app.get("/user/me", authMiddleware, async (req: any, res) => {
  const userId = req.user.userId as number;

  const rows = await sql<{ id: number; email: string }[]>`
    SELECT id, email FROM users WHERE id = ${userId} LIMIT 1
  `;
  const user = rows[0];
  if (!user) return res.status(404).json({ message: "User introuvable" });

  return res.json(user);
});

initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
  })
  .catch((err) => {
    console.error("DB init error:", err);
    process.exit(1);
  });