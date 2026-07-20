import { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useScroll, useSpring } from 'framer-motion';
import { Music, Layers } from 'lucide-react';
import TiltedCard from './TiltedCard';

const CardOverlay = ({ item, x, y, isMobile }) => {
  const parallaxX = useTransform(x, [0, 300], [-10, 10]);
  const parallaxY = useTransform(y, [0, 300], [-10, 10]);
  const isAlbum = item.type === 'album';

  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      <motion.div 
        className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end"
        style={{ x: isMobile ? 0 : parallaxX, y: isMobile ? 0 : parallaxY }}
      >
        <div className="flex items-center gap-2 mb-2">
          {item.type === 'album' ? (
            <span className="px-2 py-0.5 bg-wine-red text-[8px] uppercase tracking-widest rounded flex items-center gap-1 shadow-lg border border-white/10 text-white font-bold text-xs">
              <Layers size={8} /> Álbum
            </span>
          ) : (
            <span className="px-2 py-0.5 bg-white/10 text-[8px] uppercase tracking-widest rounded flex items-center gap-1 shadow-lg border border-white/10 text-white font-bold text-xs">
              <Music size={8} /> Sencillo
            </span>
          )}
        </div>
        <h3 className="text-xl md:text-2xl font-display italic text-aged-cream leading-tight drop-shadow-2xl">{item.title}</h3>
        <p className="text-amber-accent font-body font-medium uppercase tracking-[0.2em] text-[10px] mt-1 drop-shadow-md">{item.artist}</p>
      </motion.div>
    </div>
  );
};

const SongCard = ({ item, onClick, isModalOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  const rotateXScroll = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]), springConfig);
  const zScroll = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, -100]), springConfig);
  const scaleScroll = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]), springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!item) return null;

  const desktopIdle = !isModalOpen && !isMobile ? { 
    rotateZ: [0, 0.5, 0, -0.5, 0],
    rotateX: [1, -1, 1],
    rotateY: [-2, 2, -2]
  } : { rotateZ: 0, rotateX: 0, rotateY: 0 };

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <motion.div 
        layoutId={`card-${item.id}`}
        transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.8 }}
        className="w-full h-full absolute inset-0 z-10"
        style={{
          filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.5))`
        }}
      >
        <motion.div
          className={`w-full h-full cursor-pointer relative preserve-3d rounded-[30px] ${isMobile ? 'touch-pan-y' : ''}`}
          style={isMobile && !isModalOpen ? { 
            rotateX: rotateXScroll, 
            z: zScroll, 
            scale: scaleScroll, 
            perspective: "2000px"
          } : {}}
          animate={!isModalOpen && !isMobile ? desktopIdle : {}}
          transition={!isMobile && !isModalOpen ? { duration: 10, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 350, damping: 30 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick?.(item);
          }}
        >
          <TiltedCard
            imageSrc={item.cover}
            altText={item.title}
            captionText={`${item.artist}`}
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            rotateAmplitude={isMobile ? 0 : 12}
            scaleOnHover={isMobile ? 1 : 1.02}
            showTooltip={!isMobile}
            displayOverlayContent={true}
            overlayContent={({ x, y }) => (
              <CardOverlay item={item} x={x} y={y} isMobile={isMobile} />
            )}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SongCard;
