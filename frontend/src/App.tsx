import { useState } from "react";
import CodeEditor from "./componants/CodeEditor";
import { useAuth } from "./auth/useAuth";
import Login from "./pages/Login";
import "./index.css";

export default function App() {
  const { token, logout } = useAuth();

  const [code, setCode] = useState(`<h1>Mon premier titre</h1>
<p>Ceci est mon premier paragraphe !</p>`);

  return (
    <div className="cg-app">
      <header className="cg-header">
        <div className="cg-header-inner">
          <div className="title">
            <div className="brand">
              CodeGalaxy <span className="sparkle">✨</span>
            </div>
            <div className="subtitle">Explore l'univers du code</div>
          </div>

          {token && (
            <button onClick={logout} className="cg-btn">
              Se déconnecter
            </button>
          )}
        </div>
      </header>

      <main className="cg-main container">
        <section className="hero-card">
          <div className="hero-left">
            <div className="badge">1</div>
            <h2>Crée tes premiers éléments HTML !</h2>
            <p>
              Apprends à créer un titre avec &lt;h1&gt; et un paragraphe avec
              &lt;p&gt;.
            </p>
          </div>
        </section>

        <section className="work-area" style={{ position: "relative" }}>
          {/* 🔒 Si pas connecté, on bloque la zone avec Login */}
          {!token ? (
            <div className="auth-gate">
              <h2>🔒 Connecte-toi pour débloquer le Labo</h2>
              <Login />
            </div>
          ) : (
            <>
              <div className="editor-card">
                <div className="card-title">Labo de Code</div>
                <div className="editor-wrapper">
                  <CodeEditor code={code} onChange={setCode} />
                </div>
              </div>

              <div className="preview-card">
                <div className="card-title"> 🚀 Résultat Magique</div>
                <div className="preview-wrapper">
                  <iframe
                    title="preview"
                    sandbox="allow-scripts"
                    srcDoc={code}
                    className="preview-iframe"
                  />
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}