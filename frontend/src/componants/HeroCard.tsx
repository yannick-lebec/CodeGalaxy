// Typage des propriétés reçues par le composant
type HeroCardProps = {
  level: number;          // niveau de l'exercice
  title: string;          // titre de l'exercice
  description: string;    // description pédagogique
  onStart: () => void;    // fonction appelée au clic sur "Commencer"
};

// Composant d'affichage de la carte d’introduction de l’exercice
export default function HeroCard({
  level,
  title,
  description,
  onStart,
}: HeroCardProps) {

  return (
    // Section sémantique représentant la zone principale d'introduction
    <section className="hero-card">

      <div className="hero-left">

        {/* Badge affichant le niveau */}
        <div className="badge">{level}</div>

        {/* Titre dynamique */}
        <h2>{title}</h2>

        {/* Description dynamique */}
        <p>{description}</p>

      </div>

      {/* Bouton qui déclenche la fonction passée en props */}
      <button className="btn-commencer" onClick={onStart}>
        Commencer
      </button>

    </section>
  );
}