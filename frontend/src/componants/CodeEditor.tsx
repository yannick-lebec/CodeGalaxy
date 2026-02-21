import { useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";

export default function CodeEditor({
  code,
  onChange,
}: {
  code: string;
  onChange: (value: string) => void;
}) {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    monaco.editor.defineTheme("cg-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6a9955" },
        { token: "keyword", foreground: "c792ea", fontStyle: "bold" },
      ],
      colors: {
        "editor.background": "#412268",
        "editorLineNumber.foreground": "#5e4b8b",
        "editorCursor.foreground": "#ffd166",
      },
    });

    monaco.editor.setTheme("cg-dark");
    editor.updateOptions({
      minimap: { enabled: false },
    });
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="html"
      value={code}
      onChange={(value) => onChange(value ?? "")}
      onMount={handleMount}
    />
  );
}