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

function App() {
  const { collection, addEntry, deleteEntry, updateEntry, resetCollection, exportCollection, importCollection } = useSongs();
  
  // Si el archivo songs.js tiene datos, asumimos que es la versión de "producción" para invitados
  const isProduction = initialSongs && initialSongs.length > 0;

  const [selectedItem, setSelectedItem] = useState(null);
  const [activeMood, setActiveMood] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [activeType, setActiveType] = useState('all'); // all, album, single, only-songs
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleFormSubmit = (data) => {
    if (editingItem) {
      updateEntry(data);
    } else {
      addEntry(data);
    }
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

  const filteredCollection = displayCollection.filter(item => {
    const itemYear = new Date(item.date).getFullYear();
    const currentYear = new Date().getFullYear();
    const matchesMood = activeMood === 'all' || item.mood === activeMood;
    const matchesYear = activeYear === 'all' || (activeYear === 'Older' ? itemYear < currentYear - 1 : itemYear === activeYear);
    const matchesType = activeType === 'all' || activeType === 'only-songs' || item.type === activeType;
    return matchesMood && matchesYear && matchesType;
  });

  return (
    <div className="min-h-screen bg-deep-black text-aged-cream relative selection:bg-wine-red selection:text-white">
      <Grain />
      
      {/* Navbar Mobile/Desktop */}
      <nav className="sticky top-0 z-[40] bg-deep-black/60 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 bg-wine-red rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(114,47,55,0.4)]">
              <span className="font-display italic font-bold text-lg">R</span>
            </div>
            <span className="font-display italic text-xl tracking-tight hidden sm:block">Rokola</span>
          </div>

          {/* Desktop Actions - Ocultos en producción */}
          {!isProduction && (
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={exportCollection}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-all hover:translate-y-[-1px]"
              >
                <Download size={14} /> Exportar
              </button>
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-all cursor-pointer hover:translate-y-[-1px]">
                <Upload size={14} /> Importar
                <input type="file" accept=".json" className="hidden" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => importCollection(ev.target.result);
                    reader.readAsText(file);
                  }
                }} />
              </label>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-wine-red hover:bg-wine-red/80 px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-body transition-all active:scale-95 shadow-xl flex items-center gap-2"
              >
                <Plus size={16} /> Añadir Memoria
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle - Solo si no es producción */}
          {!isProduction && (
            <button className="md:hidden p-2 text-aged-cream/60" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay - Solo si no es producción */}
      {!isProduction && (
        <div className={`fixed inset-0 z-[45] bg-deep-black transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
            <button 
              onClick={() => { setIsFormOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full bg-wine-red py-6 rounded-2xl text-xl font-display italic flex items-center justify-center gap-4"
            >
              <Plus size={24} /> Añadir Memoria
            </button>
            <div className="grid grid-cols-2 gap-4 w-full">
              <button onClick={() => { exportCollection(); setIsMobileMenuOpen(false); }} className="bg-white/5 py-4 rounded-xl text-xs uppercase tracking-widest flex flex-col items-center gap-2">
                <Download size={20} /> Exportar
              </button>
              <label className="bg-white/5 py-4 rounded-xl text-xs uppercase tracking-widest flex flex-col items-center gap-2 cursor-pointer">
                <Upload size={20} /> Importar
                <input type="file" accept=".json" className="hidden" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => { importCollection(ev.target.result); setIsMobileMenuOpen(false); };
                    reader.readAsText(file);
                  }
                }} />
              </label>
            </div>
            <button onClick={() => { resetCollection(); setIsMobileMenuOpen(false); }} className="mt-8 text-[10px] uppercase tracking-[0.3em] opacity-30 flex items-center gap-2">
              <Trash2 size={12} /> Limpiar Archivo
            </button>
          </div>
        </div>
      )}

      <div className="pt-12 md:pt-24 pb-24">
        <Hero />

        <main className="max-w-7xl mx-auto px-4 md:px-12">
          <FilterBar 
            activeMood={activeMood}
            onMoodChange={setActiveMood}
            activeYear={activeYear}
            onYearChange={setActiveYear}
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
      />

      <AddSongForm 
        isOpen={isFormOpen} 
        onClose={handleFormClose} 
        onAdd={handleFormSubmit}
        initialData={editingItem}
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
