import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Layers } from 'lucide-react';
import TiltedCard from './TiltedCard';

const CardOverlay = ({ item, isMobile }) => {
  const isAlbum = item.type === 'album';

  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      <div 
        className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end"
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
      </div>
    </div>
  );
};

const SongCard = ({ item, onClick, isModalOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

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
        className="w-full h-full absolute inset-0 z-10"
        style={{
          filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.5))`
        }}
      >
        <motion.div
          className={`w-full h-full cursor-pointer relative preserve-3d rounded-[30px] ${isMobile ? 'touch-pan-y' : ''}`}
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
            overlayContent={() => (
              <CardOverlay item={item} isMobile={isMobile} />
            )}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SongCard;
