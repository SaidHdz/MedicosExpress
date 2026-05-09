import { useEffect, useState } from "react";

const kanjis = ["お", "ま", "か", "せ"];

export default function KanjiBg() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="kanji-bg">
      {kanjis.map((k, i) => (
        <span 
          key={i} 
          className={`k${i + 1}`}
          style={{ 
            transform: `translateY(${offset * 0.1}px)`,
          }}
        >
          {k}
        </span>
      ))}
    </div>
  );
}
