import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NumberBlock = ({ value, label, size }) => {
  const isSmall = size === 'small';
  return (
    <div className={`flex flex-col items-center ${isSmall ? 'min-w-[16px] sm:min-w-[20px]' : 'min-w-[28px] sm:min-w-[40px]'}`}>
      <div className="relative flex justify-center items-center">
        <span className={`invisible font-display italic leading-none ${isSmall ? 'text-sm sm:text-xl' : 'text-2xl sm:text-4xl'}`}>00</span>
        <AnimatePresence>
          <motion.span
            key={value}
            initial={{ opacity: 0, scale: 0.5, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.6, y: -5, position: "absolute" }}
            transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.5 }}
            className={`absolute font-display italic text-[#fdfd96] leading-none ${isSmall ? 'text-sm sm:text-xl' : 'text-2xl sm:text-4xl drop-shadow-[0_0_8px_rgba(253,253,150,0.5)]'}`}
          >
            {value.toString().padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className={`font-body uppercase tracking-[0.2em] text-white/50 ${isSmall ? 'text-[5px] sm:text-[7px] mt-0.5' : 'text-[8px] sm:text-[10px] mt-1 sm:mt-2'}`}>
        {isSmall ? label.substring(0,3) : label}
      </span>
    </div>
  );
};

const LargeCounter = ({ timePassed }) => {
  return (
    <div className="flex flex-col items-center sm:items-start bg-deep-black/60 border border-wine-red/30 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto backdrop-blur-md shadow-[0_0_25px_rgba(114,47,55,0.25)]">
      <span className="text-[9px] sm:text-xs uppercase tracking-[0.4em] text-wine-red font-bold mb-2 sm:mb-3 flex items-center gap-2 drop-shadow-[0_0_5px_rgba(114,47,55,0.8)]">
        <span className="w-2 h-2 rounded-full bg-wine-red shadow-[0_0_10px_rgba(114,47,55,1)] animate-pulse" />
        Tiempo conociéndonos
      </span>
      <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6">
        {timePassed.years > 0 && <><NumberBlock size="large" value={timePassed.years} label="Años" /><span className="text-white/20 font-display italic -translate-y-1">:</span></>}
        {timePassed.months > 0 && <><NumberBlock size="large" value={timePassed.months} label="Meses" /><span className="text-white/20 font-display italic -translate-y-1">:</span></>}
        <NumberBlock size="large" value={timePassed.days} label="Días" />
        <span className="text-white/20 font-display italic -translate-y-1">:</span>
        <NumberBlock size="large" value={timePassed.hours} label="Horas" />
        <span className="text-white/20 font-display italic -translate-y-1">:</span>
        <NumberBlock size="large" value={timePassed.minutes} label="Minutos" />
        <span className="text-white/20 font-display italic -translate-y-1">:</span>
        <NumberBlock size="large" value={timePassed.seconds} label="Segundos" />
      </div>
    </div>
  );
};

const SmallCounter = ({ timePassed }) => {
  return (
    <div className="flex items-center bg-deep-black/95 border border-wine-red/50 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 backdrop-blur-xl shadow-[0_0_30px_rgba(114,47,55,0.4)]">
      <div className="flex items-center gap-1.5 sm:gap-3">
        {timePassed.years > 0 && <><NumberBlock size="small" value={timePassed.years} label="Años" /><span className="text-white/20 font-display italic -translate-y-1">:</span></>}
        {timePassed.months > 0 && <><NumberBlock size="small" value={timePassed.months} label="Meses" /><span className="text-white/20 font-display italic -translate-y-1">:</span></>}
        <NumberBlock size="small" value={timePassed.days} label="Días" />
        <span className="text-white/20 font-display italic -translate-y-1">:</span>
        <NumberBlock size="small" value={timePassed.hours} label="Horas" />
        <span className="text-white/20 font-display italic -translate-y-1">:</span>
        <NumberBlock size="small" value={timePassed.minutes} label="Minutos" />
        <span className="text-white/20 font-display italic -translate-y-1">:</span>
        <NumberBlock size="small" value={timePassed.seconds} label="Segundos" />
      </div>
    </div>
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
    <>
      {/* El contador original se queda en su lugar normal, fluyendo con la página sin causar lag */}
      <LargeCounter timePassed={timePassed} />

      {/* El contador pequeño hace POP en la esquina superior cuando scrolleas hacia abajo */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, y: -20, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: -20, rotate: 5 }}
            transition={{ type: "spring", stiffness: 450, damping: 25, mass: 0.8 }}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100] origin-top-right cursor-pointer"
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <SmallCounter timePassed={timePassed} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TimeCounter;
