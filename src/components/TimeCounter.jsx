import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LargeCounter = ({ timePassed }) => {
  const NumberBlock = ({ value, label }) => (
    <div className="flex flex-col items-center min-w-[28px] sm:min-w-[40px]">
      <div className="relative flex justify-center items-center">
        <span className="invisible font-display italic leading-none text-2xl sm:text-4xl">00</span>
        <AnimatePresence>
          <motion.span
            key={value}
            initial={{ y: 15, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -15, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute font-display italic text-[#fdfd96] text-2xl sm:text-4xl leading-none drop-shadow-[0_0_8px_rgba(253,253,150,0.5)]"
          >
            {value.toString().padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-body uppercase tracking-[0.2em] text-white/50 text-[8px] sm:text-[10px] mt-1 sm:mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center sm:items-start bg-deep-black/60 border border-wine-red/30 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto mt-4 sm:mt-0 backdrop-blur-md shadow-[0_0_25px_rgba(114,47,55,0.25)]"
    >
      <span className="text-[9px] sm:text-xs uppercase tracking-[0.4em] text-wine-red font-bold mb-2 sm:mb-3 flex items-center gap-2 drop-shadow-[0_0_5px_rgba(114,47,55,0.8)]">
        <span className="w-2 h-2 rounded-full bg-wine-red shadow-[0_0_10px_rgba(114,47,55,1)] animate-pulse" />
        Tiempo conociéndonos
      </span>
      <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6">
        {timePassed.years > 0 && <><NumberBlock value={timePassed.years} label="Años" /><span className="text-white/20 font-display italic -translate-y-1">:</span></>}
        {timePassed.months > 0 && <><NumberBlock value={timePassed.months} label="Meses" /><span className="text-white/20 font-display italic -translate-y-1">:</span></>}
        <NumberBlock value={timePassed.days} label="Días" />
        <span className="text-white/20 font-display italic -translate-y-1">:</span>
        <NumberBlock value={timePassed.hours} label="Horas" />
        <span className="text-white/20 font-display italic -translate-y-1">:</span>
        <NumberBlock value={timePassed.minutes} label="Minutos" />
        <span className="text-white/20 font-display italic -translate-y-1">:</span>
        <NumberBlock value={timePassed.seconds} label="Segundos" />
      </div>
    </motion.div>
  );
};

const SmallCounter = ({ timePassed }) => {
  const NumberBlock = ({ value, label }) => (
    <div className="flex flex-col items-center min-w-[16px] sm:min-w-[20px]">
      <div className="relative flex justify-center items-center">
        <span className="invisible font-display italic leading-none text-sm sm:text-xl">00</span>
        <AnimatePresence>
          <motion.span
            key={value}
            initial={{ y: 8, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute font-display italic text-[#fdfd96] text-sm sm:text-xl leading-none"
          >
            {value.toString().padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-body uppercase tracking-[0.2em] text-white/50 text-[5px] sm:text-[7px] mt-0.5">
        {label.substring(0,3)}
      </span>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex items-center bg-deep-black/90 border border-wine-red/30 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 backdrop-blur-md shadow-lg"
    >
      <div className="flex items-center gap-1.5 sm:gap-3">
        {timePassed.years > 0 && <><NumberBlock value={timePassed.years} label="Años" /><span className="text-white/20 font-display italic -translate-y-1">:</span></>}
        {timePassed.months > 0 && <><NumberBlock value={timePassed.months} label="Meses" /><span className="text-white/20 font-display italic -translate-y-1">:</span></>}
        <NumberBlock value={timePassed.days} label="Días" />
        <span className="text-white/20 font-display italic -translate-y-1">:</span>
        <NumberBlock value={timePassed.hours} label="Horas" />
        <span className="text-white/20 font-display italic -translate-y-1">:</span>
        <NumberBlock value={timePassed.minutes} label="Minutos" />
        <span className="text-white/20 font-display italic -translate-y-1">:</span>
        <NumberBlock value={timePassed.seconds} label="Segundos" />
      </div>
    </motion.div>
  );
};

const TimeCounter = ({ isScrolled = false }) => {
  const [timePassed, setTimePassed] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
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

  return (
    <div className="relative flex items-center justify-center w-full sm:w-auto h-full">
      <AnimatePresence mode="wait">
        {isScrolled ? (
          <SmallCounter key="small" timePassed={timePassed} />
        ) : (
          <LargeCounter key="large" timePassed={timePassed} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeCounter;
