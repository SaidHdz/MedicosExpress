import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TimeCounter = () => {
  const [timePassed, setTimePassed] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // 17 de Julio de 2026, 22:00:00 (Hora Centro de México UTC-6)
    const startDate = new Date('2026-07-17T22:00:00-06:00').getTime();

    const updateCounter = () => {
      const now = new Date().getTime();
      let diff = now - startDate;
      if (diff < 0) diff = 0;

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimePassed({ years, months, days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  const NumberBlock = ({ value, label }) => (
    <div className="flex flex-col items-center min-w-[28px] sm:min-w-[40px]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 8, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -8, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.25 }}
          className="font-display italic text-[#fdfd96] text-2xl sm:text-4xl leading-none drop-shadow-[0_0_12px_rgba(253,253,150,0.6)] block"
        >
          {value.toString().padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
      <span className="text-[8px] sm:text-[10px] font-body uppercase tracking-[0.2em] text-white/50 mt-1 sm:mt-2">{label}</span>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="flex flex-col items-center sm:items-start bg-deep-black/60 border border-wine-red/30 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-xl shadow-[0_0_25px_rgba(114,47,55,0.25)] w-full sm:w-auto"
    >
      <span className="text-[9px] sm:text-xs uppercase tracking-[0.4em] text-wine-red font-bold mb-2 sm:mb-3 flex items-center gap-2 drop-shadow-[0_0_5px_rgba(114,47,55,0.8)]">
        <span className="w-2 h-2 rounded-full bg-wine-red shadow-[0_0_10px_rgba(114,47,55,1)] animate-pulse" />
        Tiempo conociéndonos
      </span>
      <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6">
        {timePassed.years > 0 && <NumberBlock value={timePassed.years} label="Años" />}
        {timePassed.months > 0 && <NumberBlock value={timePassed.months} label="Meses" />}
        <NumberBlock value={timePassed.days} label="Días" />
        <NumberBlock value={timePassed.hours} label="Horas" />
        <NumberBlock value={timePassed.minutes} label="Min" />
        <NumberBlock value={timePassed.seconds} label="Seg" />
      </div>
    </motion.div>
  );
};

export default TimeCounter;
