import { useState } from "react";
import CodeEditor from "./CodeEditor";

type EditorCardProps = {
  code: string;
  css: string;
  onChange: (value: string) => void;
  onCssChange: (value: string) => void;
  validate: (code: string) => boolean;
  onNext: () => void;
};

export default function EditorCard({
  code,
  css,
  onChange,
  onCssChange,
  validate,
  onNext,
}: EditorCardProps) {
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  function checkAnswer() {
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

      <div className="editor-section">
        <h3>HTML</h3>
        <div className="editor-box">
          <CodeEditor code={code} onChange={onChange} language="html" />
        </div>
      </div>

      <div className="editor-section">
        <h3>CSS</h3>
        <div className="editor-box">
          <CodeEditor code={css} onChange={onCssChange} language="css" />
        </div>
      </div>

      <button className="btn-valider" onClick={checkAnswer}>
        Valider
      </button>

      {message && <p>{message}</p>}

      {isCorrect && (
        <button className="btn-suivant" onClick={onNext}>
          Exercice suivant
        </button>
      )}
    </div>
  );
}