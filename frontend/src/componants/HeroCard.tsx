type HeroCardProps = {
    onStart: () => void;
};



export default function HeroCard({onStart}: HeroCardProps) {
    return(
        <section className="hero-card">
          <div className="hero-left">
            <div className="badge">1</div>
            <h2>Crée tes premiers éléments HTML !</h2>
            <p>
              Apprends à créer un titre avec &lt;h1&gt; et un paragraphe avec
              &lt;p&gt;.
            </p>
          </div>
          <button className="btn-commencer" onClick={onStart}>
            Commencer
          </button>
        </section>
    )
}