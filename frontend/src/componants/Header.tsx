import { useNavigate } from "react-router-dom";
import { useSession, signOut } from "../lib/auth-client";

export default function Header() {
  const navigate = useNavigate();
  const { data: session } = useSession();

  async function handleLogout() {
    await signOut();
    navigate("/");
  }

  return (
    <header className="cg-header">
      <div className="cg-header-inner">
        <div className="title" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <div className="brand">
            CodeGalaxy <span className="sparkle">✨</span>
          </div>
          <div className="subtitle">Explore l'univers du code</div>
        </div>

        <div className="header-auth">
          {session ? (
            <>
              <span className="header-user">👋 {session.user.name}</span>
              <button className="header-btn header-btn-logout" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <button className="header-btn header-btn-login" onClick={() => navigate("/auth")}>
              🚀 Se connecter
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
