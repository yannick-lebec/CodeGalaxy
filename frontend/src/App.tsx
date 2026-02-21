import { useState } from "react";
import "./index.css";
import EditorCard from "./componants/EditorCard";
import Header from "./componants/Header";
import HeroCard from "./componants/HeroCard";
import Preview from "./componants/Preview";

export default function App() {
  const [code, setCode] = useState(`<h1>Mon premier titre</h1>
<p>Ceci est mon premier paragraphe !</p>`);

  return (
    <div className="cg-app">
      <Header />
      <main className="cg-main container">
        <HeroCard onStart={() => setCode("")} />

        <section className="work-area" style={{ position: "relative" }}>
          <EditorCard code={code} onChange={setCode} />

          <Preview code={code} />
        </section>
      </main>
    </div>
  );
}
