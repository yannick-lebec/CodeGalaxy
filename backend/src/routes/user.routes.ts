import { Router } from "express"
import { users } from "../db/users"
import { authMiddleware, type AuthRequest } from "../middleware/auth.middleware"

const router = Router()

router.get("/me", authMiddleware, (req: AuthRequest, res) => {
  const user = users.find(u => u.id === req.user?.userId)
  if (!user) return res.status(404).json({ message: "User introuvable" })

  return res.json({ id: user.id, email: user.email })
})

export default router