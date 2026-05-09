import { useState } from "react";
import KanjiBg from "./components/KanjiBg";
import Countdown from "./components/Countdown";
import Tracklist from "./components/Tracklist";
import OmakaseLogo from "./components/OmakaseLogo";

export default function App() {
  const [glowColor, setGlowColor] = useState(null);

  // Gradiente radial sutil para el efecto de atmósfera
  const backgroundStyle = glowColor 
    ? { background: `radial-gradient(circle at 50% 30%, ${glowColor}33 0%, var(--bg) 70%)` }
    : { background: "var(--bg)" };

  return (
    <>
      {/* KanjiBg fuera del contenedor principal para asegurar estabilidad del posicionamiento fixed */}
      <KanjiBg />
      
      <div 
        className="app-container" 
        style={{ 
          ...backgroundStyle,
          transition: "background 1s ease"
        }}
      >
        <main className="wrapper">
          <header className="flex flex-col items-center">
            <OmakaseLogo size={120} color={glowColor || "var(--accent)"} />
            <p className="artist-label mt-8">
              Álvaro Díaz
            </p>
            <h1 className="album-title" style={{ color: glowColor || "var(--text)" }}>
              OMAKASE
            </h1>
            <p className="album-subtitle" style={{ color: glowColor || "var(--accent)" }}>
              お ま か せ
            </p>
          </header>

          <section className="countdown-section">
            <p className="drop-label">
              22 · Mayo · 2026
            </p>
            <Countdown />
          </section>

          <section className="tracklist-section">
            <Tracklist onTrackHover={setGlowColor} />
          </section>

          <section className="presave-section">
            <h2 className="presave-title">
              PRE-SAVE ALBUM
            </h2>
            <p className="artist-label">
              No te pierdas el lanzamiento
            </p>
            <button className="presave-btn">
              SPOTIFY PRE-SAVE
            </button>
          </section>

          <footer style={{ textAlign: "center", padding: "6rem 0 4rem", opacity: 0.4, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ 
              fontFamily: "'Space Mono', monospace", 
              fontSize: "0.7rem", 
              letterSpacing: "0.2em", 
              color: glowColor ? "var(--bg)" : "var(--accent)",
              fontWeight: 700
            }}>
              HECHO POR SAID_CRXZ — DE UN FAN PARA FANS
            </p>
            <p style={{ 
              fontSize: "0.5rem", 
              letterSpacing: "0.3em"
            }}>
              © 2026 ÁLVARO DÍAZ — OMAKASE PROJECT
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
