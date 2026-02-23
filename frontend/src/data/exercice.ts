export type Exercice = {
  id: number;
  exercice: string; // tu peux renommer en slug plus tard
  level: number;
  title: string;
  description: string;
  starterCode: string;
  validate: (code: string) => boolean;
  nextExercice?: string;
};

export const exercices: Exercice[] = [
  {
    id: 1,
    exercice: "exercice-1",
    level: 1,
    title: "Crée tes premiers éléments HTML !",
    description: "Apprends à créer un titre avec <h1> et un paragraphe avec <p>.",
    starterCode: `<h1>Mon premier titre</h1>\n<p>Ceci est mon premier paragraphe !</p>`,
    validate: (code: string) =>
      code.includes("<h1>") &&
      code.includes("</h1>") &&
      code.includes("<p>") &&
      code.includes("</p>"),
    nextExercice: "exercice-2",
  },
  {
    id: 2,
    exercice: "exercice-2",
    level: 2,
    title: "Ajoute une image !",
    description: 'Apprends à créer une image avec <img> et un attribut src="/chat.jpg".',
    starterCode: '<img src="/chat.jpg" />',
    validate: (code: string) => code.includes("<img") && code.includes("src="),
    nextExercice: "exercice-3",
  },
];