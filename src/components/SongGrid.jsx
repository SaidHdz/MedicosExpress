import SongCard from './SongCard';

const SongGrid = ({ songs, onSongClick, isModalOpen }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 py-12 auto-rows-fr">
      {songs.map((song, index) => (
        <div 
          key={song.id} 
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
        </div>
      ))}
    </div>
  );
};

export default SongGrid;
