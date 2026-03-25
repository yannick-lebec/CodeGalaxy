import { betterAuth } from "better-auth";
import { pool } from "./db";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BACKEND_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "http://localhost:5173",
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
  ],
  advanced: {
    // En production (domaines différents Vercel/Render), les cookies
    // doivent être SameSite=None + Secure pour passer le navigateur
    ...(isProduction && {
      defaultCookieAttributes: {
        sameSite: "none" as const,
        secure: true,
      },
    }),
  },
});
