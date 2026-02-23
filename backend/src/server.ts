import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

// Route test
app.get("/", (_req, res) => {
  res.json({ message: "Backend OK 🚀" });
});

app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});