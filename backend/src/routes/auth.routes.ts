import { Router } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { users } from "../db/users"

const router = Router()

router.post("/register", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string }

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" })
  }

  const exists = users.find(u => u.email === email)
  if (exists) {
    return res.status(409).json({ message: "Utilisateur déjà existant" })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  users.push({
    id: crypto.randomUUID(),
    email,
    passwordHash,
  })

  return res.status(201).json({ message: "Compte créé" })
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string }

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" })
  }

  const user = users.find(u => u.email === email)
  if (!user) return res.status(401).json({ message: "Identifiants invalides" })

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ message: "Identifiants invalides" })

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  )

  return res.json({ token })
})

export default router