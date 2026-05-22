import { useState } from 'react';
import { Plus, Download, Upload, Trash2, Menu, X as CloseIcon } from 'lucide-react';
import { useSongs } from './hooks/useSongs';
import SongGrid from './components/SongGrid';
import SongModal from './components/SongModal';
import FilterBar from './components/FilterBar';
import AddSongForm from './components/AddSongForm';
import Hero from './components/Hero';
import Grain from './components/Grain';
import { initialSongs } from './data/songs';

import Tutorial from './components/Tutorial';

function App() {
  const { collection, deleteEntry, updateEntry } = useSongs();
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeMood, setActiveMood] = useState('all');
  const [activeType, setActiveType] = useState('all'); // all, album, single, only-songs

  const handleEdit = (item) => {
    // Desactivado en versión final
  };

  const getDisplayCollection = () => {
    if (activeType === 'only-songs') {
      const allSongs = [];
      collection.forEach(item => {
        if (item.type === 'single') {
          allSongs.push({ ...item });
        } else {
          item.songs.forEach(song => {
            allSongs.push({
              ...item,
              id: `${item.id}-${song.id}`,
              title: song.title,
              quote: song.quote,
              interpretation: song.interpretation,
              type: 'single'
            });
          });
        }
      });
      return allSongs;
    }
    return collection;
  };

  const displayCollection = getDisplayCollection();

  const filteredCollection = displayCollection.map(item => {
    const songsToFilter = item.songs || [];
    const displaySongs = activeMood === 'all' 
      ? songsToFilter 
      : songsToFilter.filter(s => s.mood === activeMood);
    
    return {
      ...item,
      displaySongs: displaySongs
    };
  }).filter(item => {
    const matchesMood = activeMood === 'all' || 
                       (item.type === 'single' && item.mood === activeMood) || 
                       (item.type === 'album' && item.displaySongs.length > 0);
                       
    const matchesType = activeType === 'all' || activeType === 'only-songs' || item.type === activeType;
    return matchesMood && matchesType;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleNextItem = () => {
    if (!selectedItem) return;
    const currentIndex = filteredCollection.findIndex(item => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredCollection.length;
    setSelectedItem(filteredCollection[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-deep-black text-aged-cream relative selection:bg-wine-red selection:text-white">
      <Grain />
      <Tutorial />
      
      {/* Navbar Simple */}
      <nav className="sticky top-0 z-[40] bg-deep-black/60 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 bg-wine-red rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(114,47,55,0.4)]">
              <span className="font-display italic font-bold text-lg">R</span>
            </div>
            <span className="font-display italic text-xl tracking-tight hidden sm:block">Rokola</span>
          </div>

          <div className="text-[9px] uppercase tracking-[0.4em] opacity-40 font-body hidden md:block">
            Archivo Digital de Memorias
          </div>
        </div>
      </nav>

      <div className="pt-12 md:pt-24 pb-24">
        <Hero />

        <main className="max-w-7xl mx-auto px-4 md:px-12 relative">
          <FilterBar 
            activeMood={activeMood}
            onMoodChange={setActiveMood}
            activeType={activeType}
            onTypeChange={setActiveType}
            totalSongs={displayCollection.length}
            visibleSongs={filteredCollection.length}
          />
          <SongGrid 
            songs={filteredCollection} 
            onSongClick={(item) => setSelectedItem(item)} 
            isModalOpen={!!selectedItem}
          />
        </main>
      </div>
      
      <SongModal 
        song={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        onDelete={deleteEntry}
        onEdit={handleEdit}
        onNext={handleNextItem}
      />
      
      <footer className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] opacity-20 font-body mb-4">
          ROKOLA &bull; MEMORIA ANALÓGICA
        </p>
        <div className="h-px w-8 bg-wine-red mx-auto opacity-40" />
      </footer>
    </div>
  )
}

export default App
