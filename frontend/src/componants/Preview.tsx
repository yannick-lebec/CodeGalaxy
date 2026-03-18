type PreviewProps = {
  code: string;
  css: string;
};

export default function Preview({ code, css }: PreviewProps) {
  const srcDoc = `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          html, body {
            margin: 0;
            padding: 16px;
            font-family: Arial, sans-serif;
            background: white;
          }

          img {
            max-width: 100%;
            height: auto;
            display: block;
          }

          ${css}
        </style>
      </head>
      <body>
        ${code}
      </body>
    </html>
  `;

  return (
    <div className="preview-card">
      <div className="card-title">🚀 Résultat Magique</div>

      <div className="preview-wrapper">
        <iframe
          title="preview"
          sandbox="allow-scripts"
          srcDoc={srcDoc}
          className="preview-iframe"
        />
      </div>
    </div>
  );
}