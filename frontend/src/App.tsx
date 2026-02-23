import { Navigate, Routes, Route } from "react-router-dom";
import ExercicePage from "./pages/ExercicePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/exercice-1" replace />} />
      <Route path="/:slug" element={<ExercicePage />} />
    </Routes>
  );
}