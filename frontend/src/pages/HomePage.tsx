import { useNavigate } from "react-router-dom";
import Header from "../componants/Header";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="home-page">
        <main className="home-hero">
          <div className="floating floating-1">🌟</div>
          <div className="floating floating-2">🚀</div>
          <div className="floating floating-3">💻</div>

          <h2>Apprends à coder en t’amusant</h2>
          <p>
            Pars en mission, découvre le HTML et le CSS, et crée tes premières
            pages web étape par étape.
          </p>

          <button
            className="home-start-btn"
            onClick={() => navigate("/exercice-1")}
          >
            Commencer l’aventure
          </button>
        </main>
      </div>
    </div>
  );
}
