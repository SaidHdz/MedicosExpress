import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

const Grain = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax layers for background depth
  const bgX = useTransform(springX, [0, window.innerWidth], [-20, 20]);
  const bgY = useTransform(springY, [0, window.innerHeight], [-20, 20]);
  
  const circleX = useTransform(springX, [0, window.innerWidth], [10, -10]);
  const circleY = useTransform(springY, [0, window.innerHeight], [10, -10]);

  return (
    <>
      {/* Dynamic Background Depth Layers */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deepest Layer: Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-60" />
        
        {/* Middle Layer: Floating Orbs for depth */}
        <motion.div 
          style={{ x: bgX, y: bgY }}
          className="absolute -inset-[10%] opacity-20"
        >
          <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-wine-red/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[20%] w-[30vw] h-[30vw] bg-amber-accent/10 blur-[100px] rounded-full" />
        </motion.div>

        {/* Top Layer: Subtle Floating Mesh/Grid */}
        <motion.div 
          style={{ x: circleX, y: circleY }}
          className="absolute -inset-[5%] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] contrast-200" 
        />
      </div>

      {/* The Grain Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.04] contrast-150 brightness-100 mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </>
  );
};

export default Grain;
