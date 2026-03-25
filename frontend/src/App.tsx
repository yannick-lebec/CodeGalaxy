import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ExercicePage from "./pages/ExercicePage";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/:slug" element={<ExercicePage />} />
    </Routes>
  );
}
