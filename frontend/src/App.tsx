import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ExercicePage from "./pages/ExercicePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:slug" element={<ExercicePage />} />
    </Routes>
  );
}