import { useRef } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({
  code,
  onChange,
}: {
  code: string;
  onChange: (value: string) => void;
}) {
  const editorRef = useRef(null);

  function handleMount(editor, monaco) {
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
      fontSize: 16,
      scrollBeyondLastLine: false,
      automaticLayout: true,
    });
  }

  return (
    <Editor
      height="100%"
      defaultLanguage="html"
      value={code}
      onChange={(v) => onChange(v ?? "")}
      onMount={handleMount}
      options={{
        wordWrap: "on",
        lineNumbers: "on",
        glyphMargin: false,
        folding: true,
        minimap: { enabled: false },
      }}
    />
  );
}