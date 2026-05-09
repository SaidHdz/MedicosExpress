const kanjis = ["お", "ま", "か", "せ"];

export default function KanjiBg() {
  return (
    <div className="kanji-bg">
      {kanjis.map((k, i) => (
        <span key={i} className={`k${i + 1}`}>{k}</span>
      ))}
    </div>
  );
}
