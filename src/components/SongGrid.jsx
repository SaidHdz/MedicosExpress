import { motion } from 'framer-motion';
import SongCard from './SongCard';
import { useState, useEffect } from 'react';

const SongGrid = ({ songs, onSongClick, isModalOpen }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 py-12 auto-rows-fr px-4 md:px-0 overflow-visible">
      {songs.map((song, index) => (
        <motion.div 
          key={song.id} 
          initial={isMobile ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : { opacity: 0, y: 50, rotateX: 15, scale: 0.9 }}
          animate={isMobile ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : undefined}
          whileInView={!isMobile ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : undefined}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: isMobile ? 0 : 1.2, 
            delay: isMobile ? 0 : (index % 3) * 0.1,
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1.2
          }}
          className={`relative group transition-all duration-500 perspective-2000 overflow-visible ${
            index % 5 === 0 
              ? 'lg:col-span-2' 
              : 'aspect-square'
          }`}
        >
          <div className="w-full h-full overflow-visible">
            <SongCard 
                item={song} 
                onClick={onSongClick} 
                isModalOpen={isModalOpen}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SongGrid;
