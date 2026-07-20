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
    <div className="flex flex-col items-center min-w-[20px]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 5, opacity: 0, filter: "blur(2px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -5, opacity: 0, filter: "blur(2px)" }}
          transition={{ duration: 0.2 }}
          className="font-display italic text-[#fdfd96] text-sm sm:text-base leading-none drop-shadow-[0_0_8px_rgba(253,253,150,0.5)] block"
        >
          {value.toString().padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
      <span className="text-[6px] sm:text-[7px] font-body uppercase tracking-widest text-white/50 mt-1">{label}</span>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="flex flex-col bg-deep-black/40 border border-wine-red/20 rounded-xl px-3 sm:px-4 py-2 mt-2 sm:mt-0 backdrop-blur-md shadow-[0_0_15px_rgba(114,47,55,0.15)]"
    >
      <span className="text-[6px] sm:text-[7px] uppercase tracking-[0.3em] text-wine-red font-bold mb-1.5 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-wine-red shadow-[0_0_8px_rgba(114,47,55,0.8)] animate-pulse" />
        Tiempo conociéndonos
      </span>
      <div className="flex items-center gap-3 sm:gap-4">
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
