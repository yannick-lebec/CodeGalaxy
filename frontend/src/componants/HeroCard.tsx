type HeroCardProps = {
  level: number;
  title: string;
  description: string;
  onStart: () => void;
};

export default function HeroCard({
  level,
  title,
  description,
  onStart,
}: HeroCardProps) {
  return (
    <section className="hero-card">
      <div className="hero-left">
        <div className="badge">{level}</div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button className="btn-commencer" onClick={onStart}>
        Commencer
      </button>
    </section>
  );
}