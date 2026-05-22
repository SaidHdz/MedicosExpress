import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Music, User, Quote, Calendar, Image as ImageIcon, Trash2, Layers, Save, Sparkles, MessageSquare } from 'lucide-react';

const moods = [
  { id: 'nostalgia', label: 'Nostalgia', color: '#8B2E2E' },
  { id: 'dolor', label: 'Dolor', color: '#4A148C' },
  { id: 'tristeza', label: 'Tristeza', color: '#1A365D' },
  { id: 'amor', label: 'Amor', color: '#C2185B' },
  { id: 'rabia', label: 'Rabia', color: '#D32F2F' },
  { id: 'paz', label: 'Paz', color: '#FFBF00' }
];

const AddSongForm = ({ isOpen, onClose, onAdd, initialData = null }) => {
  const [type, setType] = useState('single');
  const [formData, setFormData] = useState({
    title: '', artist: '', cover: '', 
    date: new Date().toISOString().split('T')[0],
    quote: '', interpretation: '', mood: 'nostalgia', songs: []
  });

  const resetForm = () => {
    setFormData({
      title: '', artist: '', cover: '',
      date: new Date().toISOString().split('T')[0],
      quote: '', interpretation: '', mood: 'nostalgia', songs: []
    });
    setType('single');
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setType(initialData.type);
    } else if (isOpen) {
      resetForm();
    }
  }, [initialData, isOpen]);

  const addSongToAlbum = () => {
    setFormData({
      ...formData,
      songs: [...formData.songs, { id: crypto.randomUUID(), title: '', quote: '', interpretation: '', mood: 'nostalgia' }]
    });
  };

  const removeSongFromAlbum = (id) => {
    setFormData({ ...formData, songs: formData.songs.filter(s => s.id !== id) });
  };

  const updateAlbumSong = (id, field, value) => {
    setFormData({
      ...formData,
      songs: formData.songs.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Para álbumes, el moodColor del álbum será el del primer track por defecto para la visualización en el grid
    const mainMood = type === 'single' ? formData.mood : (formData.songs[0]?.mood || 'nostalgia');
    const moodColor = moods.find(m => m.id === mainMood)?.color || '#f5f5dc';
    
    // Asegurar que cada canción tenga su color
    const processedSongs = formData.songs.map(s => ({
      ...s,
      moodColor: moods.find(m => m.id === s.mood)?.color || '#f5f5dc'
    }));

    onAdd({ 
      ...formData, 
      type, 
      mood: mainMood, 
      moodColor,
      songs: processedSongs 
    });
    resetForm();
    onClose();
  };

  const MoodSelector = ({ selected, onSelect, label = "¿Qué sentimiento te transmite?" }) => (
    <div className="space-y-4">
      <label className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-body block">{label}</label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {moods.map(m => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            className={`px-4 py-3 rounded-xl border transition-all flex flex-col items-center gap-2 group ${
              selected === m.id ? 'bg-aged-cream border-aged-cream text-black shadow-lg scale-[1.02]' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10'
            }`}
          >
            <div className="w-2 h-2 rounded-full transition-transform group-hover:scale-125" style={{ backgroundColor: m.color, boxShadow: selected === m.id ? `0 0 10px ${m.color}` : 'none' }} />
            <span className="text-[9px] uppercase tracking-widest font-bold">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep-black/90 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="relative w-full max-w-2xl h-full bg-[#080808] border-l border-white/5 p-8 md:p-14 overflow-y-auto shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-10 right-10 z-10">
              <button 
                onClick={onClose} 
                className="p-3 rounded-full bg-white/5 text-white/40 hover:text-wine-red hover:bg-white/10 transition-all active:scale-90"
              >
                <X size={24} />
              </button>
            </div>

            <header className="mb-14">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-amber-accent mb-4"
              >
                <Sparkles size={16} />
                <span className="text-[10px] uppercase tracking-[0.4em] font-body font-bold">Archivo Rokola</span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-display italic tracking-tighter leading-none">
                {initialData ? 'Editar Memoria' : 'Nueva Memoria'}
              </h2>
              
              <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 mt-10 w-fit">
                <button 
                  onClick={() => setType('single')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest transition-all ${type === 'single' ? 'bg-wine-red text-white shadow-lg' : 'text-white/30 hover:text-white/60'}`}
                >
                  <Music size={14} /> Sencillo
                </button>
                <button 
                  onClick={() => {
                    setType('album');
                    if (formData.songs.length === 0) addSongToAlbum();
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest transition-all ${type === 'album' ? 'bg-wine-red text-white shadow-lg' : 'text-white/30 hover:text-white/60'}`}
                >
                  <Layers size={14} /> Álbum
                </button>
              </div>
            </header>

            <form onSubmit={handleSubmit} className="space-y-12 pb-20">
              <div className="space-y-10">
                {/* Meta Section */}
                <section className="space-y-8">
                  <div className="grid grid-cols-1 gap-8">
                    <div className="group relative space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-body block group-focus-within:opacity-100 group-focus-within:text-wine-red transition-all">
                        {type === 'single' ? 'Título de la canción' : 'Título del Álbum'}
                      </label>
                      <input
                        required
                        className="w-full bg-white/[0.02] border-b border-white/10 p-0 py-4 text-2xl font-display italic focus:outline-none focus:border-wine-red transition-all placeholder:opacity-10"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        placeholder={type === 'single' ? "Ej: Sayonara" : "Ej: Sayonara (The Album)"}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group relative space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-body block transition-all group-focus-within:opacity-100 group-focus-within:text-wine-red">
                          Artista / Autor
                        </label>
                        <input
                          required
                          className="w-full bg-transparent border-b border-white/10 py-3 text-lg font-body focus:outline-none focus:border-wine-red transition-all"
                          value={formData.artist}
                          onChange={e => setFormData({...formData, artist: e.target.value})}
                          placeholder="Nombre del artista"
                        />
                      </div>
                      <div className="group relative space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-body block transition-all group-focus-within:opacity-100 group-focus-within:text-wine-red">
                          Fecha
                        </label>
                        <input
                          type="date"
                          required
                          className="w-full bg-transparent border-b border-white/10 py-3 text-lg font-body focus:outline-none focus:border-wine-red transition-all color-scheme-dark"
                          value={formData.date}
                          onChange={e => setFormData({...formData, date: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="group relative space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-body block">
                      Imagen de Portada (URL o Archivo)
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="flex-1 relative group">
                         <input
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-xs font-body focus:outline-none focus:border-wine-red transition-all"
                          value={formData.cover}
                          onChange={e => setFormData({...formData, cover: e.target.value})}
                          placeholder="Pega el enlace de la imagen aquí..."
                        />
                        <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 text-wine-red" />
                      </div>
                      <label className="flex-shrink-0 bg-white/5 hover:bg-wine-red/10 border border-white/10 p-4 rounded-2xl cursor-pointer transition-all active:scale-95 group">
                        <Plus size={20} className="text-white/40 group-hover:text-wine-red" />
                        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            try {
                              const compressedDataUrl = await compressImage(file);
                              setFormData({ ...formData, cover: compressedDataUrl });
                            } catch (error) {
                              alert('Error al procesar la imagen. Inténtalo de nuevo.');
                            }
                          }
                        }} />
                      </label>
                    </div>
                  </div>
                </section>

                {/* Content Section */}
                <section className="pt-10 border-t border-white/5">
                  {type === 'single' ? (
                    <div className="space-y-10">
                      <MoodSelector 
                        selected={formData.mood} 
                        onSelect={(mood) => setFormData({...formData, mood})} 
                      />
                      
                      <div className="group relative space-y-4">
                        <div className="flex items-center gap-2 opacity-30">
                          <Quote size={14} className="text-wine-red" />
                          <label className="text-[10px] uppercase tracking-[0.3em] font-body">La dedicatoria (Frase icónica)</label>
                        </div>
                        <textarea
                          required
                          rows={2}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-xl font-display italic focus:outline-none focus:border-wine-red focus:bg-white/[0.05] transition-all resize-none placeholder:opacity-10 leading-snug"
                          value={formData.quote}
                          onChange={e => setFormData({...formData, quote: e.target.value})}
                          placeholder='"Escribe aquí esa frase que te pegó fuerte..."'
                        />
                      </div>
                      <div className="group relative space-y-4">
                        <div className="flex items-center gap-2 opacity-30">
                          <MessageSquare size={14} className="text-wine-red" />
                          <label className="text-[10px] uppercase tracking-[0.3em] font-body block">Tu interpretación personal</label>
                        </div>
                        <textarea
                          required
                          rows={5}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-lg font-body leading-relaxed opacity-80 focus:outline-none focus:border-wine-red focus:bg-white/[0.04] transition-all resize-none italic"
                          value={formData.interpretation}
                          onChange={e => setFormData({...formData, interpretation: e.target.value})}
                          placeholder="Cuéntanos la historia completa detrás de esta elección..."
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Layers size={18} className="text-wine-red" />
                          <label className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-body font-bold text-wine-red">Tracks a incluir en el Álbum</label>
                        </div>
                        <button 
                          type="button" 
                          onClick={addSongToAlbum} 
                          className="px-5 py-2.5 bg-wine-red/10 hover:bg-wine-red text-wine-red hover:text-white border border-wine-red/20 rounded-full flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
                        >
                          <Plus size={14} /> Añadir Canción
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-8">
                        {formData.songs.map((song, idx) => (
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={song.id} 
                            className="group p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] relative hover:border-wine-red/30 transition-all shadow-xl"
                          >
                            <button 
                              type="button" 
                              onClick={() => removeSongFromAlbum(song.id)} 
                              className="absolute top-8 right-8 p-2 rounded-full bg-white/5 text-white/20 hover:text-wine-red hover:bg-wine-red/10 transition-all"
                            >
                              <Trash2 size={18} />
                            </button>

                            <div className="space-y-8">
                              <div className="space-y-3">
                                <div className="flex items-center gap-3 opacity-40">
                                  <Music size={14} />
                                  <label className="text-[9px] uppercase tracking-[0.3em] font-body">Título de la Canción 0{idx + 1}</label>
                                </div>
                                <input
                                  required
                                  className="w-full bg-transparent border-b border-white/10 p-0 py-2 text-2xl font-display italic focus:outline-none focus:border-wine-red transition-all text-white placeholder:opacity-10"
                                  placeholder="Nombre del track..."
                                  value={song.title}
                                  onChange={e => updateAlbumSong(song.id, 'title', e.target.value)}
                                />
                              </div>

                              <MoodSelector 
                                label="Sentimiento para este track:"
                                selected={song.mood} 
                                onSelect={(mood) => updateAlbumSong(song.id, 'mood', mood)} 
                              />
                              
                              <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3 opacity-40">
                                    <Quote size={14} />
                                    <label className="text-[9px] uppercase tracking-[0.3em] font-body text-amber-accent">Frase Dedicada</label>
                                  </div>
                                  <input
                                    required
                                    className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm font-display italic focus:outline-none focus:border-wine-red transition-all opacity-80"
                                    placeholder='"Escribe aquí la frase más importante de este track..."'
                                    value={song.quote}
                                    onChange={e => updateAlbumSong(song.id, 'quote', e.target.value)}
                                  />
                                </div>
                                
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3 opacity-40">
                                    <MessageSquare size={14} />
                                    <label className="text-[9px] uppercase tracking-[0.3em] font-body">Interpretación</label>
                                  </div>
                                  <textarea
                                    required
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm font-body leading-relaxed opacity-60 focus:outline-none focus:border-wine-red transition-all resize-none italic"
                                    placeholder="¿Qué significa este track específicamente dentro de este álbum?"
                                    value={song.interpretation}
                                    onChange={e => updateAlbumSong(song.id, 'interpretation', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        {formData.songs.length === 0 && (
                          <div className="py-20 border-2 border-dashed border-white/5 rounded-[3rem] text-center opacity-20">
                            <Layers size={40} className="mx-auto mb-4" />
                            <p className="font-body uppercase tracking-[0.2em] text-xs">No has añadido canciones aún</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </section>
              </div>

              <div className="pt-10">
                <button
                  type="submit"
                  className="w-full bg-wine-red text-white py-6 rounded-[2.5rem] font-body uppercase tracking-[0.4em] text-xs font-bold hover:brightness-125 transition-all shadow-[0_20px_60px_rgba(114,47,55,0.4)] active:scale-[0.98] flex items-center justify-center gap-4 group"
                >
                  <Save size={18} className="group-hover:rotate-12 transition-transform" />
                  {initialData ? 'Sellar Cambios en el Archivo' : 'Sellar Nueva Memoria'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddSongForm;
