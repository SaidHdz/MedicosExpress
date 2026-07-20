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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('rokola_tutorial_seen');
    if (!hasSeen) {
      setIsTutorialOpen(true);
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [collection]);

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
      
      {/* Header Estático Natural */}
      <header className="max-w-7xl mx-auto pt-8 sm:pt-12 px-4 sm:px-6 relative z-30">
        <div className="flex flex-col xl:flex-row justify-between items-center gap-6 xl:gap-0">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 w-full xl:w-auto">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-12 h-12 bg-wine-red rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(114,47,55,0.4)] shrink-0">
                <span className="font-display italic font-bold text-2xl">H</span>
              </div>
              <span className="font-display italic text-3xl tracking-tight">para ti richelle</span>
            </div>
            
            {/* El contador ahora maneja su propia lógica de aparición Flotante vs Estática */}
            <TimeCounter isScrolled={isScrolled} />
          </div>

          <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-body hidden xl:block max-w-[250px] text-right">
            archivo de canciones que me hacen pensar en ti
          </div>
        </div>
      </header>

      <div key={isTutorialOpen ? 'tutorial' : 'content'} className="pt-8 md:pt-12 pb-24">
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
