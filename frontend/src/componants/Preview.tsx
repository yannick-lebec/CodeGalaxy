type PreviewProps = {
  code: string;
};

export default function Preview({code}: PreviewProps) {
  return (
    <div className="preview-card">
      <div className="card-title"> 🚀 Résultat Magique</div>
      <div className="preview-wrapper">
        <iframe
          title="preview"
          sandbox="allow-scripts"
          srcDoc={code}
          className="preview-iframe"
        />
      </div>
    </div>
  );
}
