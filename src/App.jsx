import { useState, useEffect } from 'react';
import { Plus, Download, Upload, Trash2, Menu, X as CloseIcon } from 'lucide-react';
import { useSongs } from './hooks/useSongs';
import SongGrid from './components/SongGrid';
import SongModal from './components/SongModal';
import AddSongForm from './components/AddSongForm';
import Hero from './components/Hero';
import Grain from './components/Grain';
import { initialSongs } from './data/songs';

import TimeCounter from './components/TimeCounter';
import Tutorial from './components/Tutorial';

function App() {
  const { collection, deleteEntry, updateEntry } = useSongs();
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('rokola_tutorial_seen');
    if (!hasSeen) {
      setIsTutorialOpen(true);
    }
  }, []);

  const handleNextItem = () => {
    if (!selectedItem) return;
    const currentIndex = collection.findIndex(item => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % collection.length;
    setSelectedItem(collection[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-deep-black text-aged-cream relative selection:bg-wine-red selection:text-white">
      <Grain />
      <Tutorial isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
      
      {/* Navbar Simple */}
      <nav className="sticky top-0 z-[40] bg-deep-black/60 backdrop-blur-xl border-b border-white/5 px-4 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row justify-between items-center gap-4 xl:gap-0">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 w-full xl:w-auto">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-10 h-10 bg-wine-red rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(114,47,55,0.4)] shrink-0">
                <span className="font-display italic font-bold text-xl">H</span>
              </div>
              <span className="font-display italic text-2xl tracking-tight">para ti richelle</span>
            </div>
            <TimeCounter />
          </div>

          <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-body hidden xl:block max-w-[250px] text-right">
            archivo de canciones que me hacen pensar en ti
          </div>
        </div>
      </nav>

      <div key={isTutorialOpen ? 'tutorial' : 'content'} className="pt-12 md:pt-24 pb-24">
        <Hero />

        <main className="max-w-7xl mx-auto px-4 md:px-12 relative">
          <SongGrid 
            songs={collection} 
            onSongClick={(item) => setSelectedItem(item)} 
            isModalOpen={!!selectedItem}
          />
        </main>
      </div>
      
      <SongModal 
        song={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
      
      <footer className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] opacity-20 font-body mb-4">
          para ti richelle &bull; PARA RICHESITA
        </p>
        <div className="h-px w-8 bg-wine-red mx-auto opacity-40" />
      </footer>
    </div>
  )
}

export default App
