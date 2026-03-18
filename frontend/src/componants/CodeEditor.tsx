import { useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";

type CodeEditorProps = {
  code: string;
  onChange: (value: string) => void;
  language?: "html" | "css" | "javascript";
};

export default function CodeEditor({
  code,
  onChange,
  language = "html",
}: CodeEditorProps) {
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
      fixedOverflowWidgets: true,
      fontSize: 16,
      wordWrap: "on",
      scrollBeyondLastLine: false,
      automaticLayout: true,
    });
  };

  return (
    <Editor
      height="100%"
      language={language}
      value={code}
      onChange={(value) => onChange(value ?? "")}
      onMount={handleMount}
    />
  );
}