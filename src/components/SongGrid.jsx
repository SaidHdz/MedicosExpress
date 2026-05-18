import { motion } from 'framer-motion';
import SongCard from './SongCard';

const SongGrid = ({ songs, onSongClick, isModalOpen }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 py-12 auto-rows-fr">
      {songs.map((song, index) => (
        <motion.div 
          key={song.id} 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.8, 
            delay: (index % 3) * 0.15,
            ease: [0.21, 1.11, 0.81, 0.99] // Custom cubic-bezier for a "lindo" bounce
          }}
          className={`relative group transition-all duration-500 ${
            index % 5 === 0 
              ? 'lg:col-span-2' 
              : 'aspect-square'
          }`}
        >
          <div className="w-full h-full">
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
