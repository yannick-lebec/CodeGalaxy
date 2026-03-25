import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../componants/Header";
import { useSession } from "../lib/auth-client";

const features = [
  {
    icon: "🏗️",
    title: "HTML",
    desc: "Construis la structure de tes pages web avec les balises essentielles.",
  },
  {
    icon: "🎨",
    title: "CSS",
    desc: "Donne du style et de la couleur à tes créations web.",
  },
  {
    icon: "🎮",
    title: "Interactif",
    desc: "Apprends en faisant : code dans l'éditeur, vois le résultat en direct.",
  },
];

const steps = [
  { num: "1", label: "Lis le défi" },
  { num: "2", label: "Écris ton code" },
  { num: "3", label: "Valide et avance" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const [nextSlug, setNextSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      setNextSlug(null);
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    async function loadProgress() {
      try {
        const [exercicesRes, progressRes] = await Promise.all([
          fetch(`${API_URL}/exercices`),
          fetch(`${API_URL}/progress`, { credentials: "include" }),
        ]);
        const exercices: { slug: string }[] = await exercicesRes.json();
        const completed: string[] = await progressRes.json();

        const next = exercices.find((e) => !completed.includes(e.slug));
        setNextSlug(next ? next.slug : exercices[exercices.length - 1].slug);
      } catch {
        setNextSlug(null);
      }
    }

    loadProgress();
  }, [session]);

  return (
    <div>
      <Header />
      <div className="home-page">
        {/* Hero */}
        <main className="home-hero">
          <div className="floating floating-1">🌟</div>
          <div className="floating floating-2">🚀</div>
          <div className="floating floating-3">💻</div>

          <div className="home-hero-badge">🏆 Connecte-toi pour garder ton score !</div>
          <h1 className="home-hero-title">
            Apprends à coder <br />
            <span className="home-hero-gradient">en t'amusant</span>
          </h1>
          <p className="home-hero-desc">
            Pars en mission, découvre le HTML et le CSS, et crée tes premières
            pages web étape par étape.
          </p>

          {session && nextSlug ? (
            <button
              className="home-start-btn"
              onClick={() => navigate(`/${nextSlug}`)}
            >
              Continuer l'aventure →
            </button>
          ) : (
            <button
              className="home-start-btn"
              onClick={() => navigate("/exercice-1")}
            >
              Commencer l'aventure →
            </button>
          )}
        </main>

        {/* Features */}
        <section className="home-features">
          {features.map((f) => (
            <div className="home-feature-card" key={f.title}>
              <div className="home-feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </section>

        {/* How it works */}
        <section className="home-steps">
          <h2 className="home-steps-title">Comment ça marche ?</h2>
          <div className="home-steps-row">
            {steps.map((s, i) => (
              <div className="home-step" key={s.num}>
                <div className="home-step-num">{s.num}</div>
                <div className="home-step-label">{s.label}</div>
                {i < steps.length - 1 && (
                  <div className="home-step-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA bottom */}
        <section className="home-cta">
          <h2>Prêt à explorer la galaxie du code ?</h2>
          <button
            className="home-start-btn"
            onClick={() => navigate(nextSlug && session ? `/${nextSlug}` : "/exercice-1")}
          >
            Lancer le premier exercice 🚀
          </button>
        </section>
      </div>
    </div>
  );
}
