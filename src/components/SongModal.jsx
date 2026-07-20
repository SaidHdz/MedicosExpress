import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, ChevronRight, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';

const SongModal = ({ song: item, isOpen, onClose }) => {
  const [selectedSubSong, setSelectedSubSong] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSelectedSubSong(null);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!item) return null;

  const isAlbum = item.type === 'album';
  const currentView = selectedSubSong || (!isAlbum ? item : null);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
            className="relative w-full max-w-5xl h-full lg:h-[600px] bg-[#080808] rounded-none sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row"
          >
            {/* ACTION BUTTONS */}
            <div className="absolute top-4 right-4 lg:top-8 lg:right-8 z-[100] flex gap-2">
              <button onClick={onClose} className="p-2.5 rounded-full bg-wine-red text-white shadow-lg active:scale-90 border border-wine-red/20">
                <X size={18} />
              </button>
            </div>

            {/* IMAGE SECTION */}
            <div className="relative overflow-hidden shrink-0 z-20 w-full lg:w-1/2 h-[40vh] lg:h-full">
              <div className="w-full h-full flex items-center justify-center bg-black/20">
                <img 
                  src={item.cover} 
                  alt="cover" 
                  className="object-cover shadow-2xl w-full h-full" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent pointer-events-none lg:hidden" />
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#080808] p-8 lg:p-12 justify-start lg:justify-center overflow-y-auto custom-modal-scroll">
              
              <AnimatePresence mode="wait">
                {!currentView && isAlbum ? (
                  <motion.div key="album-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                    <div className="flex flex-col gap-4 mb-8">
                        <div className="flex items-center gap-2">
                           <span className="px-3 py-1 bg-wine-red/20 text-wine-red text-[10px] uppercase tracking-widest rounded-full border border-wine-red/20 font-bold flex items-center gap-2 w-max">
                             <Layers size={14} /> Álbum
                           </span>
                        </div>
                        <h2 className="font-display italic text-white text-4xl lg:text-5xl tracking-tighter leading-none">{item.title}</h2>
                        <p className="text-[#fdfd96] font-body uppercase tracking-[0.3em] text-[12px] opacity-80">{item.artist}</p>
                    </div>

                    <div className="space-y-3">
                      {item.songs?.map((song) => (
                        <button 
                          key={song.id} 
                          onClick={() => setSelectedSubSong(song)}
                          className="w-full flex items-center justify-between p-4 bg-white/[0.03] hover:bg-[#fdfd96]/10 border border-white/5 rounded-2xl transition-all group text-left"
                        >
                          <span className="font-body text-base opacity-70 group-hover:text-white transition-colors">{song.title}</span>
                          <ChevronRight size={18} className="opacity-10 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#fdfd96]" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="song-detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                    {isAlbum && (
                      <button onClick={() => setSelectedSubSong(null)} className="flex items-center gap-2 text-wine-red text-[10px] uppercase tracking-widest font-bold mb-6 hover:text-[#fdfd96] transition-colors w-max">
                        <ChevronRight size={14} className="rotate-180" /> Volver al álbum
                      </button>
                    )}
                    
                    <div className="flex flex-col gap-4">
                        <h2 className="font-display italic text-white text-4xl lg:text-5xl tracking-tighter leading-none">{currentView.title}</h2>
                        <p className="text-[#fdfd96] font-body uppercase tracking-[0.3em] text-[12px] opacity-80">{item.artist}</p>
                    </div>

                    <div className="mt-8 space-y-8">
                      {currentView.note && (
                        <p className="text-xl lg:text-2xl font-display italic leading-snug text-aged-cream/90 border-l-4 border-[#fdfd96] pl-6 py-2">
                          "{currentView.note}"
                        </p>
                      )}

                      {currentView.spotifyUrl ? (
                        <a 
                          href={currentView.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#1DB954] text-white rounded-full font-body uppercase tracking-[0.2em] text-[10px] font-bold hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-[#1DB954]/20 w-max"
                        >
                          <PlayCircle size={20} /> Reproducir en Spotify
                        </a>
                      ) : (
                        <div className="text-white/30 text-xs italic">Link de Spotify no disponible.</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SongModal;
