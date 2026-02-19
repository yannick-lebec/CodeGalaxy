import { useState } from "react";
import { useAuth } from "../auth/useAuth";

export default function Login() {
  const { login } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  function resetFields() {
    setEmail("");
    setPassword("");
  }

  function switchMode(next: "login" | "register") {
    setMode(next);
    setError("");
    setInfo("");
    resetFields(); // ✅ vide quand on change de mode
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      if (mode === "register") {
        const res = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.message || "Inscription impossible");

        setInfo("Compte créé ✅ Tu peux te connecter.");
        resetFields();          // ✅ vide après inscription
        setMode("login");       // ✅ repasse en login
      } else {
        await login(email, password);
        resetFields();          // ✅ vide après login
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Erreur";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 10 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <button type="button" onClick={() => switchMode("login")} disabled={loading}>
          Se connecter
        </button>
        <button type="button" onClick={() => switchMode("register")} disabled={loading}>
          Créer un compte
        </button>
      </div>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10, maxWidth: 320 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="email"
          autoComplete="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="mot de passe"
          type="password"
          autoComplete={mode === "register" ? "new-password" : "current-password"}
        />

        <button type="submit" disabled={loading || !email || !password}>
          {loading ? "..." : mode === "register" ? "Créer mon compte" : "Se connecter"}
        </button>

        {info && <div style={{ color: "limegreen" }}>{info}</div>}
        {error && <div style={{ color: "crimson" }}>{error}</div>}
      </form>
    </div>
  );
}