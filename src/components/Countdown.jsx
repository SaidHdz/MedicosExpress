import { useState, useEffect } from "react";
import { RELEASE_DATE } from "../data/tracks";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const tick = () => {
      const diff = RELEASE_DATE - new Date();
      if (diff <= 0) {
        // Al llegar a cero, intentamos enviar una notificación si hay permiso
        if (Notification.permission === "granted") {
          new Notification("¡OMAKASE YA DISPONIBLE!", {
            body: "El nuevo álbum de Álvaro Díaz ya está disponible en todas las plataformas.",
            icon: "/icon-192.png"
          });
        }
        return setTimeLeft(null);
      }
      setTimeLeft({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000)  / 60000),
        secs:  Math.floor((diff % 60000)    / 1000),
      });
    };
    
    // Solicitar permiso de notificación al montar
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // timeLeft === null → el álbum ya salió
  if (!timeLeft) return (
    <div className="released-container">
      <p className="released">ALBUM DISPONIBLE</p>
      <div className="released-glitch">YA DISPONIBLE</div>
    </div>
  );

  const unitLabels = {
    days: "DÍAS",
    hours: "HORAS",
    mins: "MINS",
    secs: "SEGS"
  };

  return (
    <div className="countdown-grid">
      {Object.entries(timeLeft).map(([unit, val]) => (
        <div key={unit} className="time-unit">
          <span className="time-number">{String(val).padStart(2, "0")}</span>
          <span className="time-label">{unitLabels[unit]}</span>
        </div>
      ))}
    </div>
  );
}
