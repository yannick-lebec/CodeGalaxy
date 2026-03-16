// Hooks React pour gérer le cycle de vie et le state
import { useEffect, useState } from "react";

// Hooks React Router pour récupérer les paramètres d'URL et naviguer
import { useNavigate, useParams } from "react-router-dom";

// Composants de l'application
import EditorCard from "../componants/EditorCard";
import Header from "../componants/Header";
import HeroCard from "../componants/HeroCard";
import Preview from "../componants/Preview";

// Typage des données reçues depuis l'API backend
type ExerciceApi = {
  id: number;
  slug: string;
  level: number;
  title: string;
  description: string;
  starter_code: string;
  next_exercice: string | null;
};

// Objet contenant les fonctions de validation pour chaque exercice
// La clé correspond au slug (identifiant unique)
// La valeur est une fonction qui vérifie si le code est correct
const validators: Record<string, (code: string) => boolean> = {
  "exercice-1": (code) =>
    code.includes("<h1>") &&
    code.includes("</h1>") &&
    code.includes("<p>") &&
    code.includes("</p>"),

  "exercice-2": (code) => code.includes("<img") && code.includes("src="),
};

export default function ExercicePage() {
  // Récupère le slug depuis l’URL (ex: /exercice-1)
  const { slug } = useParams<{ slug?: string }>();

  // Permet de naviguer vers une autre route
  const navigate = useNavigate();

  // State pour stocker les données de l’exercice
  const [exercise, setExercise] = useState<ExerciceApi | null>(null);

  // State pour stocker le code que l’utilisateur modifie
  const [code, setCode] = useState<string>("");

  // State pour gérer l’état de chargement
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect déclenché à chaque changement du slug
  // Permet de charger dynamiquement l’exercice correspondant
  useEffect(() => {
    if (!slug) return;

    async function loadExercise() {
      try {
        setLoading(true);

        // Appel à l'API backend
        const res = await fetch(`http://localhost:3000/exercices/${slug}`);

        // Si la réponse n'est pas valide
        if (!res.ok) {
          setExercise(null);
          return;
        }

        // Conversion de la réponse en JSON
        const data: ExerciceApi = await res.json();

        // Mise à jour du state avec les données reçues
        setExercise(data);

        // Initialise l’éditeur avec le starter code venant de la base
        setCode(data.starter_code);

      } catch (err) {
        console.error(err);
        setExercise(null);
      } finally {
        // Arrête le mode "chargement"
        setLoading(false);
      }
    }

    loadExercise();
  }, [slug]);

  // Fonction appelée lorsqu’on clique sur "Exercice suivant"
  function goNext() {
    if (exercise?.next_exercice) {
      navigate(`/${exercise.next_exercice}`);
    }
  }

  // Affichage pendant le chargement
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

  // Si l’exercice n’existe pas
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

  // Récupère la fonction de validation correspondant au slug actuel
  // Si aucune fonction n’est trouvée, on retourne false par défaut
  const validate = validators[exercise.slug] ?? (() => false);

  return (
    <div className="cg-app">
      <Header />

      <main className="cg-main container">

        {/* Carte contenant le niveau et la description */}
        <HeroCard
          level={exercise.level}
          title={exercise.title}
          description={exercise.description}
          onStart={() => setCode("")}
        />

        <section className="work-area" style={{ position: "relative" }}>

          {/* Composant éditeur avec validation */}
          <EditorCard
            key={exercise.slug}
            code={code}
            onChange={setCode}
            validate={validate}
            onNext={goNext}
          />

          {/* Preview en temps réel du code HTML */}
          <Preview code={code} />

        </section>
      </main>
    </div>
  );
}