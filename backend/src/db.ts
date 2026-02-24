// Import du Pool depuis la librairie pg (PostgreSQL client)
import { Pool } from "pg";

// Création et export d’un pool de connexions
export const pool = new Pool({

  // URL de connexion récupérée depuis les variables d’environnement
  connectionString: process.env.DATABASE_URL,

  // Configuration SSL nécessaire pour Neon (base cloud)
  ssl: { rejectUnauthorized: false },
});