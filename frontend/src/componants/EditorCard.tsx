import CodeEditor from "./CodeEditor"

type EditorCardProps = {
    code: string;
    onChange: (value: string) => void
}

export default function EditorCard({code, onChange}: EditorCardProps) {
    return (
        <div className="editor-card">
                    <div className="card-title">Labo de Code</div>
                    <div className="editor-wrapper">
                      <CodeEditor code={code} onChange={onChange} />
                    </div>
                  </div>
    )
}