import { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useScroll, useSpring } from 'framer-motion';
import { Music, Layers } from 'lucide-react';
import TiltedCard from './TiltedCard';
import ProfileCard from './ProfileCard';
import { initialSongs } from '../data/songs';

// Encapsulate overlay to safely use hooks inside render props
const AlbumOverlay = ({ item, x, y, isMobile }) => {
  const parallaxX = useTransform(x, [0, 300], [-10, 10]);
  const parallaxY = useTransform(y, [0, 300], [-10, 10]);

  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      <motion.div 
        className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end"
        style={{ x: isMobile ? 0 : parallaxX, y: isMobile ? 0 : parallaxY }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-wine-red text-[8px] uppercase tracking-widest rounded flex items-center gap-1 shadow-lg border border-white/10 text-white font-bold text-xs">
            <Layers size={8} /> Álbum
          </span>
          <span className="text-[8px] uppercase tracking-widest opacity-70 font-body drop-shadow-md text-white font-medium text-xs">
            {item.songs?.length || 0} canciones
          </span>
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

  const springConfig = { stiffness: 90, damping: 25, mass: 0.8 };
  const rotateXScroll = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [35, 0, -45]), springConfig);
  const zScroll = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [-180, 0, -220]), springConfig);
  const scaleScroll = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.05, 0.88]), springConfig);
  
  const brightnessValue = useTransform(scrollYProgress, [0, 0.45, 0.5, 0.55, 1], [0.6, 1, 1, 1, 0.6]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!item) return null;
  const isAlbum = item.type === 'album';

  const desktopIdle = !isModalOpen && !isMobile ? { 
    rotateZ: [0, 0.5, 0, -0.5, 0],
    rotateX: [1, -1, 1],
    rotateY: [-2, 2, -2]
  } : { rotateZ: 0, rotateX: 0, rotateY: 0 };

  const handleCardClick = (e) => {
    // Only trigger if the actual target is the clickable area, not accidental taps
    e.stopPropagation();
    onClick?.(item);
  };

  return (
    <div ref={containerRef} className="w-full h-full relative pointer-events-none">
      <motion.div 
        layoutId={`card-${item.id}`}
        transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.8 }}
        className="w-full h-full absolute inset-0 z-10 pointer-events-auto"
      >
        <motion.div
          className="w-full h-full cursor-pointer relative preserve-3d"
          animate={!isModalOpen ? (isMobile ? { rotateX: rotateXScroll.get(), z: zScroll.get(), scale: scaleScroll.get() } : desktopIdle) : { rotateX: 0, rotateY: 0, rotateZ: 0, z: 0, scale: 1 }}
          style={isMobile && !isModalOpen ? { 
            rotateX: rotateXScroll, 
            z: zScroll, 
            scale: scaleScroll, 
            perspective: "1500px",
            filter: `brightness(${brightnessValue.get()})`
          } : {}}
          transition={!isMobile && !isModalOpen ? { duration: 10, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 350, damping: 30 }}
          onClick={handleCardClick}
        >
          {isAlbum ? (
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
                <AlbumOverlay item={item} x={x} y={y} isMobile={isMobile} />
              )}
            />
          ) : (
            <div className="w-full h-full relative">
              <ProfileCard
                name={item.title}
                title={item.quote}
                handle={item.artist}
                status={item.mood}
                avatarUrl={item.cover}
                behindGlowEnabled={!isMobile} 
                enableTilt={!isMobile} 
                onContactClick={() => onClick?.(item)}
              />
              {!isMobile && (
                <motion.div 
                  className="absolute inset-0 pointer-events-none z-30 rounded-[30px] overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_6s_infinite]" />
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SongCard;
