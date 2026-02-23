import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EditorCard from "../componants/EditorCard";
import Header from "../componants/Header";
import HeroCard from "../componants/HeroCard";
import Preview from "../componants/Preview";

import { exercices } from "../data/exercice";
import type { Exercice } from "../data/exercice";

export default function ExercicePage() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const exercise = useMemo<Exercice | null>(() => {
    return exercices.find((e) => e.exercice === slug) ?? null;
  }, [slug]);

  const [code, setCode] = useState<string>("");

  // ✅ à chaque changement d'exercice (slug), on charge le starterCode
  useEffect(() => {
    if (exercise) {
      
     setTimeout(() => {
      setCode(exercise.starterCode);
     }, 100);
      
    }
  }, [exercise]);

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

  function goNext() {
    if (exercise && exercise.nextExercice) {
      navigate(`/${exercise.nextExercice}`);
    }
  }

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
            key={exercise.exercice}
            code={code}
            onChange={setCode}
            validate={exercise.validate}
            onNext={goNext}
          />

          <Preview code={code} />
        </section>
      </main>
    </div>
  );
}