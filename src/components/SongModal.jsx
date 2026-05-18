import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Quote, User, Layers, Music, ChevronRight, Trash2, Edit2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { initialSongs } from '../data/songs';

const SongModal = ({ song: item, isOpen, onClose, onDelete, onEdit }) => {
  const [selectedSubSong, setSelectedSubSong] = useState(null);
  
  // Si el archivo songs.js tiene datos, ocultamos botones de edición
  const isProduction = initialSongs && initialSongs.length > 0;

  useEffect(() => {
    if (!isOpen) setSelectedSubSong(null);
  }, [isOpen, item]);

  if (!item) return null;

  const isAlbum = item.type === 'album';

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta memoria?')) {
      onDelete(item.id);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep-black/95 backdrop-blur-md"
          />

          <motion.div
            layoutId={`card-${item.id}`}
            transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.8 }}
            className="relative w-full max-w-6xl bg-zinc-950 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 max-h-[90vh] overflow-y-auto"
          >
            <div className="absolute top-8 right-8 z-20 flex gap-3">
              {!isProduction && (
                <>
                  <button
                    onClick={() => onEdit(item)}
                    className="p-3 rounded-full bg-white/5 text-white/40 hover:text-amber-accent hover:bg-white/10 transition-all backdrop-blur-md"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-3 rounded-full bg-white/5 text-white/40 hover:text-wine-red hover:bg-white/10 transition-all backdrop-blur-md"
                  >
                    <Trash2 size={20} />
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="p-3 rounded-full bg-wine-red text-white hover:brightness-110 transition-all shadow-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
              <motion.div 
                layoutId={`image-${item.id}`}
                className="w-full lg:w-1/2 h-[400px] lg:h-auto overflow-hidden relative"
              >
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:hidden" />
              </motion.div>

              <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-zinc-950">
                <header className="mb-12">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.moodColor }} />
                      <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-body">{item.mood}</span>
                    </div>
                    {isAlbum && (
                        <span className="px-3 py-1 bg-wine-red/20 text-wine-red text-[10px] uppercase tracking-[0.2em] rounded-full border border-wine-red/20 flex items-center gap-2">
                            <Layers size={10} /> Álbum
                        </span>
                    )}
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl lg:text-7xl font-display italic mb-4 tracking-tighter leading-none"
                  >
                    {item.title}
                  </motion.h2>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 text-amber-accent font-body uppercase tracking-[0.3em] text-xs"
                  >
                    <User size={14} />
                    {item.artist}
                  </motion.div>
                </header>

                <div className="relative">
                  <AnimatePresence mode="wait">
                    {!selectedSubSong ? (
                      <motion.div
                        key="main"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-10"
                      >
                        {!isAlbum ? (
                          <>
                            <section className="space-y-4">
                              <div className="flex items-center gap-2 opacity-20">
                                <Quote size={16} />
                                <span className="text-[9px] uppercase tracking-[0.4em] font-body">La dedicatoria</span>
                              </div>
                              <p className="text-3xl font-display italic leading-snug text-aged-cream/90 border-l-4 border-wine-red pl-8 py-2">
                                "{item.quote}"
                              </p>
                            </section>

                            <section className="space-y-4">
                              <p className="text-xl font-body leading-relaxed opacity-60 italic">
                                {item.interpretation}
                              </p>
                            </section>
                          </>
                        ) : (
                          <section>
                            <div className="flex items-center gap-2 opacity-20 mb-6">
                              <Music size={16} />
                              <span className="text-[9px] uppercase tracking-[0.4em] font-body">Canciones del archivo</span>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                              {item.songs?.map((song) => (
                                <button
                                  key={song.id}
                                  onClick={() => setSelectedSubSong(song)}
                                  className="w-full flex items-center justify-between p-6 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-2xl transition-all group overflow-hidden relative"
                                >
                                  <div className="absolute inset-y-0 left-0 w-1 bg-wine-red transform -translate-x-full group-hover:translate-x-0 transition-transform" />
                                  <span className="font-body text-base opacity-80 group-hover:text-white transition-colors">{song.title}</span>
                                  <ChevronRight size={18} className="opacity-10 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-wine-red" />
                                </button>
                              ))}
                            </div>
                          </section>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sub"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                        <button 
                          onClick={() => setSelectedSubSong(null)}
                          className="group flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-wine-red/10 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-aged-cream/40 hover:text-white transition-all mb-8"
                        >
                          <ChevronRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> 
                          Regresar al álbum
                        </button>
                        
                        <div className="space-y-2">
                          <span className="text-[9px] uppercase tracking-[0.5em] text-wine-red font-body font-bold">Track Dedicado</span>
                          <h4 className="text-5xl font-display italic text-white tracking-tighter">{selectedSubSong.title}</h4>
                        </div>

                        <section className="space-y-4">
                          <p className="text-2xl font-display italic leading-relaxed text-aged-cream/90 border-l-4 border-wine-red pl-8 py-2">
                            "{selectedSubSong.quote}"
                          </p>
                        </section>

                        <section>
                          <p className="text-lg font-body leading-relaxed opacity-60 italic">
                            {selectedSubSong.interpretation}
                          </p>
                        </section>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <footer className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between text-[9px] uppercase tracking-[0.4em] opacity-30 font-body">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(item.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <div>Registro Musical</div>
                  </footer>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SongModal;
