import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "200kb" }));

// health
app.get("/api/health", (_, res) => res.json({ ok: true }));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
