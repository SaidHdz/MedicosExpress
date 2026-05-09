import { useState, useEffect } from "react";
import { RELEASE_DATE } from "../data/tracks";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const tick = () => {
      const diff = RELEASE_DATE - new Date();
      if (diff <= 0) return setTimeLeft(null);
      setTimeLeft({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000)  / 60000),
        secs:  Math.floor((diff % 60000)    / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // timeLeft === null → el álbum ya salió
  if (!timeLeft) return <p className="released">YA DISPONIBLE</p>;

  return (
    <div className="countdown-grid">
      {Object.entries(timeLeft).map(([unit, val]) => (
        <div key={unit} className="time-unit">
          <span className="time-number">{String(val).padStart(2, "0")}</span>
          <span className="time-label">{unit}</span>
        </div>
      ))}
    </div>
  );
}
