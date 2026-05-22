import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const letters = "Rokola".split("");
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      z: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      y: 60, // Increased to avoid initial clipping during pop-up
      rotateX: 90,
      z: -100,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.div 
      style={{ y: y1, opacity: opacityTransform }}
      className="max-w-6xl mx-auto mb-16 md:mb-32 border-b border-aged-cream/5 pb-16 pt-10 overflow-visible px-4 md:px-0 relative z-10"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex perspective-1000 py-4" // Added padding to prevent letter clipping
      >
        {letters.map((letter, index) => (
          <motion.span
            variants={child}
            key={index}
            className="text-7xl sm:text-8xl md:text-[14rem] font-display italic tracking-tighter inline-block origin-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
          >
            {/* Base Letter */}
            <span className="relative z-10 text-aged-cream inline-block pb-2">{letter}</span>
            
            {/* Shiny Overlay */}
            <motion.span 
              className="absolute inset-0 z-20 text-transparent animate-shiny inline-block pb-2"
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              {letter}
            </motion.span>
          </motion.span>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-4 md:mt-0"
      >
        <div className="space-y-6 max-w-lg">
          <div className="h-[1px] w-24 bg-gradient-to-r from-wine-red to-transparent shadow-[0_0_15px_var(--color-wine-red)]" />
          <p className="text-xl md:text-3xl font-body opacity-60 leading-relaxed italic tracking-tight">
            "Algunas canciones que me recuerdan a ti"
          </p>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="px-4 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
            <span className="text-[10px] uppercase tracking-[0.5em] text-amber-accent font-body">Nuestro Archivo</span>
          </div>
          <div className="text-[9px] uppercase tracking-[0.3em] opacity-30 font-body">
            Analog Memories &bull; Vol. I
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
