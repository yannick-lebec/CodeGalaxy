import { useState } from "react";
import CodeEditor from "./CodeEditor";

// Typage des props reçues depuis le composant parent
type EditorCardProps = {
  code: string; // code HTML actuel
  onChange: (value: string) => void; // fonction pour mettre à jour le code
  validate: (code: string) => boolean; // fonction de validation
  onNext: () => void; // fonction pour passer à l'exercice suivant
};

export default function EditorCard({
  code,
  onChange,
  validate,
  onNext,
}: EditorCardProps) {

  // State pour afficher un message de validation
  const [message, setMessage] = useState("");

  // State pour savoir si la réponse est correcte
  const [isCorrect, setIsCorrect] = useState(false);

  // Fonction appelée lorsqu'on clique sur "Valider"
  function checkAnswer() {

    // On exécute la fonction de validation reçue en props
    const ok = validate(code);

    if (ok) {
      setMessage("👍 Réponse correcte !");
      setIsCorrect(true);
    } else {
      setMessage("👎 Réponse incorrecte. Réessaie !");
      setIsCorrect(false);
    }
  }

  return (
    <div className="editor-card">
      <div className="card-title">Labo de Code</div>

      {/* Éditeur de code contrôlé par React */}
      <div className="editor-wrapper">
        <CodeEditor code={code} onChange={onChange} />
      </div>

      {/* Bouton de validation */}
      <button className="btn-valider" onClick={checkAnswer}>
        Valider
      </button>

      {/* Affichage conditionnel du message */}
      {message && <p>{message}</p>}

      {/* Si la réponse est correcte, on affiche le bouton suivant */}
      {isCorrect && (
        <button className="btn-suivant" onClick={onNext}>
          Exercice suivant
        </button>
      )}
    </div>
  );
}