import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../lib/auth-client";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const result = await signIn.email({ email, password });
        if (result.error) {
          setError("Email ou mot de passe incorrect.");
        } else {
          navigate("/");
        }
      } else {
        const result = await signUp.email({ name, email, password });
        if (result.error) {
          setError(result.error.message || "Erreur lors de l'inscription.");
        } else {
          navigate("/");
        }
      }
    } catch {
      setError("Une erreur est survenue. Réessaie !");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🚀</div>
        <h1 className="auth-title">CodeGalaxy</h1>
        <p className="auth-subtitle">
          {isLogin ? "Content de te revoir !" : "Rejoins l'aventure !"}
        </p>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? "active" : ""}`}
            onClick={() => { setIsLogin(true); setError(""); }}
          >
            Se connecter
          </button>
          <button
            className={`auth-tab ${!isLogin ? "active" : ""}`}
            onClick={() => { setIsLogin(false); setError(""); }}
          >
            S'inscrire
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-field">
              <label>👤 Ton prénom</label>
              <input
                type="text"
                placeholder="Ex: Lucas"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-field">
            <label>📧 Email</label>
            <input
              type="email"
              placeholder="ton@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label>🔒 Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
              minLength={8}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "⏳ Chargement..." : isLogin ? "🚀 Se connecter" : "🌟 Créer mon compte"}
          </button>
        </form>

        <button className="auth-back" onClick={() => navigate("/")}>
          ← Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
