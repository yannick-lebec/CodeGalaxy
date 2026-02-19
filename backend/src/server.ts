import "dotenv/config";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import { initDb } from "./db/init";


initDb()
  .then(() => console.log("DB ready"))
  .catch((err) => console.error("DB init error:", err));

const app = express()

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())

app.get("/", (_req, res) => res.json({ ok: true }))

app.use("/auth", authRoutes)
app.use("/user", userRoutes)

const PORT = Number(process.env.PORT) || 3000

app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`)
})