// Typage des props reçues par le composant
type PreviewProps = {
  code: string; // code HTML à afficher dans la preview
};

export default function Preview({ code }: PreviewProps) {
  return (
    <div className="preview-card">

      {/* Titre de la carte */}
      <div className="card-title">🚀 Résultat Magique</div>

      <div className="preview-wrapper">

        {/* Iframe utilisée comme sandbox */}
        <iframe
          title="preview"                 // accessibilité
          sandbox="allow-scripts"         // limite les permissions (sécurité)
          srcDoc={code}                   // injecte directement le HTML
          className="preview-iframe"
        />

      </div>
    </div>
  );
}