import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EditorCard from "../componants/EditorCard";
import Header from "../componants/Header";
import HeroCard from "../componants/HeroCard";
import Preview from "../componants/Preview";

type ExerciceApi = {
  id: number;
  slug: string;
  level: number;
  title: string;
  description: string;
  starter_code: string;
  starter_css?: string;
  next_exercice: string | null;
};

const validators: Record<string, (code: string, css: string) => boolean> = {
  "exercice-1": (code) =>
    code.includes("<h1>") &&
    code.includes("</h1>"),

  "exercice-2": (code) =>
    code.includes("<p>") &&
    code.includes("</p>"),

  "exercice-3": (code) =>
    code.includes("<img") &&
    code.includes('src="/chat.jpg"'),

  "exercice-4": (code) =>
    code.includes("<button>") &&
    code.includes("</button>") &&
    code.includes("Clique-moi"),

  "exercice-5": (code, css) =>
    code.includes("<h1>") &&
    code.includes("</h1>") &&
    css.includes("color") &&
    css.includes("red"),

  "exercice-6": (code, css) =>
    code.includes("<p>") &&
    code.includes("</p>") &&
    css.includes("font-size"),

  "exercice-7": (code, css) =>
    code.includes("<img") &&
    code.includes('src="/chat.jpg"') &&
    css.includes("margin") &&
    css.includes("auto"),

  "exercice-8": (code, css) =>
    code.includes("<div") &&
    code.includes("<h1>") &&
    code.includes("<img") &&
    code.includes("<p>") &&
    css.includes(".carte"),
};

export default function ExercicePage() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const [exercise, setExercise] = useState<ExerciceApi | null>(null);
  const [code, setCode] = useState("");
  const [css, setCss] = useState("");
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    async function loadExercise() {
      setLoading(true);
      setNetworkError(false);

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const MAX_RETRIES = 5;
      const RETRY_DELAY = 3000;

      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const res = await fetch(`${API_URL}/exercices/${slug}`);

          if (cancelled) return;

          if (res.status === 404) {
            setExercise(null);
            setLoading(false);
            return;
          }

          if (!res.ok) throw new Error(`Server error ${res.status}`);

          const data: ExerciceApi = await res.json();
          setExercise(data);
          setCode(data.starter_code ?? "");
          setCss(data.starter_css ?? "");
          setLoading(false);
          return;
        } catch (err) {
          console.error(`Attempt ${attempt} failed:`, err);
          if (attempt < MAX_RETRIES) {
            setNetworkError(true);
            await new Promise((r) => setTimeout(r, RETRY_DELAY));
            if (cancelled) return;
          }
        }
      }

      if (!cancelled) {
        setExercise(null);
        setLoading(false);
      }
    }

    loadExercise();
    setStarted(false);
    return () => { cancelled = true; };
  }, [slug]);

  function goNext() {
    if (exercise?.next_exercice) {
      navigate(`/${exercise.next_exercice}`);
    }
  }

  if (loading) {
    return (
      <div className="cg-app">
        <Header />
        <main className="cg-main container">
          <h2>{networkError ? "Connexion au serveur..." : "Chargement..."}</h2>
        </main>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="cg-app">
        <Header />
        <main className="cg-main container">
          <h2>Exercice introuvable</h2>
          <button onClick={() => navigate("/exercice-1")}>Retour</button>
        </main>
      </div>
    );
  }

  const validate = validators[exercise.slug] ?? (() => false);
  const requireStart = exercise.level <= 4;

  return (
    <div className="cg-app">
      <Header />

      <main className="cg-main container">
        <HeroCard
          level={exercise.level}
          title={exercise.title}
          description={exercise.description}
          onStart={() => {
            setCode("");
            setCss("");
            setStarted(true);
          }}
        />

        <section className="work-area">
          <EditorCard
            code={code}
            css={css}
            onChange={setCode}
            onCssChange={setCss}
            validate={validate}
            onNext={goNext}
            hasNext={!!exercise.next_exercice}
            canValidate={!requireStart || started}
          />

          <Preview code={code} css={css} />
        </section>
      </main>
    </div>
  );
}