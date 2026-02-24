// Import des composants de React Router
import { Navigate, Routes, Route } from "react-router-dom";

// Page principale d’affichage des exercices
import ExercicePage from "./pages/ExercicePage";

export default function App() {
  return (
    // Routes définit l’ensemble des routes de l’application
    <Routes>

      {/* Redirection automatique depuis la racine vers le premier exercice */}
      <Route path="/" element={<Navigate to="/exercice-1" replace />} />

      {/* Route dynamique : le paramètre slug change selon l’URL */}
      <Route path="/:slug" element={<ExercicePage />} />

    </Routes>
  );
}