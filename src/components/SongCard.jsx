import { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Music, Layers } from 'lucide-react';
import TiltedCard from './TiltedCard';
import ProfileCard from './ProfileCard';

const SongCard = ({ item, onClick, isModalOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  if (!item) return null;
  const isAlbum = item.type === 'album';

  // We disable the animate prop when isModalOpen is true to avoid loop conflicts
  const idleAnimation = !isModalOpen ? { 
    rotateZ: [0, 1, 0, -1, 0],
    rotateX: [2, -2, 2],
    rotateY: [-3, 3, -3]
  } : {};

  if (isAlbum) {
    return (
      <motion.div 
        layoutId={`card-${item.id}`}
        transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.8 }}
        animate={idleAnimation}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          layout: { type: "spring", stiffness: 350, damping: 30, mass: 0.8 }
        }}
        className="relative h-full w-full group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick?.(item)}
      >
        <TiltedCard
          imageSrc={item.cover}
          altText={item.title}
          captionText={`${item.artist} — ${item.songs?.length || 0} canciones`}
          containerHeight="100%"
          containerWidth="100%"
          imageHeight="100%"
          imageWidth="100%"
          rotateAmplitude={12}
          scaleOnHover={1.02}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={({ x, y, rotateX, rotateY }) => (
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              
              <motion.div 
                className="absolute inset-0 p-6 flex flex-col justify-end"
                style={{
                  x: useTransform(x, [0, 300], [-10, 10]),
                  y: useTransform(y, [0, 300], [-10, 10]),
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-wine-red text-[8px] uppercase tracking-widest rounded flex items-center gap-1 shadow-lg border border-white/10">
                    <Layers size={8} /> Álbum
                  </span>
                  <span className="text-[8px] uppercase tracking-widest opacity-70 font-body drop-shadow-md">
                    {item.songs?.length || 0} canciones
                  </span>
                </div>
                <h3 className="text-2xl font-display italic text-aged-cream leading-tight drop-shadow-2xl">{item.title}</h3>
                <p className="text-amber-accent font-body font-medium uppercase tracking-[0.2em] text-[10px] mt-1 drop-shadow-md">{item.artist}</p>
              </motion.div>
            </div>
          )}
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      layoutId={`card-${item.id}`}
      className="w-full h-full cursor-pointer relative" 
      onClick={() => onClick?.(item)}
    >
      <ProfileCard
        name={item.title}
        title={item.quote}
        handle={item.artist}
        status={item.mood}
        avatarUrl={item.cover}
        behindGlowEnabled={true}
        behindGlowColor={item.moodColor || 'rgba(114, 47, 55, 0.4)'}
        enableTilt={true}
        onContactClick={() => onClick?.(item)}
      />
      {/* Subtle Idle Shimmer for Singles */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-30 rounded-[30px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_6s_infinite]" />
      </motion.div>
    </motion.div>
  );
};

export default SongCard;
