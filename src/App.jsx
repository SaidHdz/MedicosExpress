import KanjiBg from "./components/KanjiBg";
import Countdown from "./components/Countdown";
import Tracklist from "./components/Tracklist";
import OmakaseLogo from "./components/OmakaseLogo";

export default function App() {
  return (
    <>
      <KanjiBg />
      <main className="wrapper">
        <header className="flex flex-col items-center">
          <OmakaseLogo size={120} />
          <p className="artist-label mt-8">Álvaro Díaz</p>
          <h1 className="album-title">OMAKASE</h1>
          <p className="album-subtitle">お ま か せ</p>
        </header>

        <section className="countdown-section">
          <p className="drop-label">22 · Mayo · 2026</p>
          <Countdown />
        </section>

        <section className="tracklist-section">
          <Tracklist />
        </section>

        <section className="presave-section">
          <h2 className="presave-title">PRE-SAVE ALBUM</h2>
          <p className="artist-label">No te pierdas el lanzamiento</p>
          <button className="presave-btn">SPOTIFY PRE-SAVE</button>
          <button className="presave-btn" style={{ background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)", marginTop: "-0.5rem" }}>
            APPLE MUSIC
          </button>
        </section>

        <footer style={{ textAlign: "center", padding: "4rem 0", opacity: 0.3, fontSize: "0.6rem", letterSpacing: "0.2em" }}>
          © 2026 ÁLVARO DÍAZ — OMAKASE PROJECT
        </footer>
      </main>
    </>
  );
}
