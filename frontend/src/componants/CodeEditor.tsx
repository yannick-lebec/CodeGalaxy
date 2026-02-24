// Hook React permettant de garder une référence persistante
import { useRef } from "react";

// Composant Monaco Editor + typage du callback onMount
import Editor, { type OnMount } from "@monaco-editor/react";

export default function CodeEditor({
  code,
  onChange,
}: {
  code: string;
  onChange: (value: string) => void;
}) {

  // useRef permet de stocker une référence à l’éditeur Monaco
  // Cela permet d’accéder à l’instance plus tard si nécessaire
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  // Fonction appelée lorsque l’éditeur est monté dans le DOM
  const handleMount: OnMount = (editor, monaco) => {

    // On stocke l’instance de l’éditeur
    editorRef.current = editor;

    // Création d’un thème personnalisé
    monaco.editor.defineTheme("cg-dark", {
      base: "vs-dark",
      inherit: true,

      // Personnalisation des couleurs des tokens
      rules: [
        { token: "comment", foreground: "6a9955" },
        { token: "keyword", foreground: "c792ea", fontStyle: "bold" },
      ],

      // Personnalisation des couleurs globales de l’éditeur
      colors: {
        "editor.background": "#412268",
        "editorLineNumber.foreground": "#5e4b8b",
        "editorCursor.foreground": "#ffd166",
      },
    });

    // Application du thème personnalisé
    monaco.editor.setTheme("cg-dark");

    // Désactivation de la minimap
    editor.updateOptions({
      minimap: { enabled: false },
      fixedOverflowWidgets: true,
    });
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="html" // langage par défaut
      value={code} // valeur contrôlée par le state parent
      onChange={(value) => onChange(value ?? "")} // gestion de modification
      onMount={handleMount} // callback exécuté au montage
    />
  );
}