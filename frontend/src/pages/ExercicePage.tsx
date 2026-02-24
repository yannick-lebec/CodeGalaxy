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
  next_exercice: string | null;
};

const validators: Record<string, (code: string) => boolean> = {
  "exercice-1": (code) =>
    code.includes("<h1>") &&
    code.includes("</h1>") &&
    code.includes("<p>") &&
    code.includes("</p>"),

  "exercice-2": (code) => code.includes("<img") && code.includes("src="),
};

export default function ExercicePage() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const [exercise, setExercise] = useState<ExerciceApi | null>(null);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  
  useEffect(() => {
    if (!slug) return;

    async function loadExercise() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/exercices/${slug}`);
        if (!res.ok) {
          setExercise(null);
          return;
        }
        const data: ExerciceApi = await res.json();
        setExercise(data);

        // starter code depuis la DB
        setCode(data.starter_code);
      } catch (err) {
        console.error(err);
        setExercise(null);
      } finally {
        setLoading(false);
      }
    }

    loadExercise();
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
          <h2>Chargement...</h2>
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

  // ✅ On récupère la bonne fonction validate selon le slug
  const validate = validators[exercise.slug] ?? (() => false);

  return (
    <div className="cg-app">
      <Header />
      <main className="cg-main container">
        <HeroCard
          level={exercise.level}
          title={exercise.title}
          description={exercise.description}
          onStart={() => setCode("")}
        />

        <section className="work-area" style={{ position: "relative" }}>
          <EditorCard
            key={exercise.slug}
            code={code}
            onChange={setCode}
            validate={validate}
            onNext={goNext}
          />

          <Preview code={code} />
        </section>
      </main>
    </div>
  );
}