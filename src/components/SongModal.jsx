import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, ChevronRight, Trash2, Edit2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { initialSongs } from '../data/songs';
import TextType from './TextType';

const SongModal = ({ song: item, isOpen, onClose, onDelete, onEdit }) => {
  const [selectedSubSong, setSelectedSubSong] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSelectedSubSong(null); // Reset when closing
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!item) return null;
  const isAlbum = item.type === 'album';
  const isProduction = initialSongs && initialSongs.length > 0;

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta memoria?')) {
      onDelete(item.id);
      onClose();
    }
  };

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
            layoutId={`card-${item.id}`}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
            className="relative w-full max-w-6xl h-full lg:h-[750px] bg-[#080808] rounded-none sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row"
          >
            {/* ACTION BUTTONS */}
            <div className="absolute top-4 right-4 lg:top-8 lg:right-8 z-[100] flex gap-2">
              {!isProduction && (
                <>
                  <button onClick={() => onEdit(item)} className="p-2.5 rounded-full bg-black/40 text-white/40 hover:text-amber-accent transition-all backdrop-blur-md border border-white/5">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={handleDelete} className="p-2.5 rounded-full bg-black/40 text-white/40 hover:text-wine-red transition-all backdrop-blur-md border border-white/5">
                    <Trash2 size={18} />
                  </button>
                </>
              )}
              <button onClick={onClose} className="p-2.5 rounded-full bg-wine-red text-white shadow-lg active:scale-90 border border-wine-red/20">
                <X size={18} />
              </button>
            </div>

            {/* IMAGE SECTION */}
            <motion.div 
              layout
              className={`relative overflow-hidden shrink-0 transition-all duration-700 ease-in-out z-20
                ${isMobile 
                    ? selectedSubSong ? 'h-[12vh] w-full sticky top-0 bg-[#080808]/90 backdrop-blur-xl border-b border-white/5' : 'aspect-square w-full'
                    : selectedSubSong ? 'w-56 h-56 m-8 rounded-2xl shadow-2xl border border-white/10' : 'w-1/2 h-full'}`}
            >
              <div className={`w-full h-full flex items-center transition-all duration-700 ${isMobile && selectedSubSong ? 'justify-start px-6 gap-4' : 'justify-center'}`}>
                <motion.img 
                  layoutId={`image-${item.id}`}
                  src={item.cover} 
                  alt="cover" 
                  className={`object-cover transition-all duration-700 shadow-2xl w-full h-full
                    ${isMobile && selectedSubSong ? '!w-12 !h-14 rounded-lg' : 'rounded-none'}`} 
                />
                
                {/* Mobile Sticky Title when song is selected */}
                {isMobile && selectedSubSong && (
                    <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="overflow-hidden pr-16"
                    >
                        <TextType
                            key={selectedSubSong.id}
                            text={selectedSubSong.title}
                            as="h4"
                            className="font-display italic text-white text-base truncate leading-tight"
                            typingSpeed={80}
                            showCursor={false}
                            loop={false}
                        />
                        <p className="text-[8px] uppercase tracking-widest text-amber-accent opacity-60">{item.artist}</p>
                    </motion.div>
                )}
              </div>
              {isMobile && !selectedSubSong && <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent pointer-events-none" />}
            </motion.div>

            {/* CONTENT AREA */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#080808]">
              
              {/* DESKTOP HEADER */}
              {!isMobile && (
                <header className="px-12 pt-12 pb-6 shrink-0 border-b border-white/5 bg-[#080808]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-2 py-0.5 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.moodColor }} />
                      <span className="text-[9px] uppercase tracking-widest opacity-60 font-body">{item.mood}</span>
                    </div>
                    {isAlbum && <span className="px-2 py-0.5 bg-wine-red/20 text-wine-red text-[9px] uppercase tracking-widest rounded-full border border-wine-red/20 font-bold">Álbum</span>}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                        <TextType
                            key={selectedSubSong ? selectedSubSong.id : item.id}
                            text={selectedSubSong ? selectedSubSong.title : item.title}
                            as={isMobile && selectedSubSong ? "h4" : "h2"}
                            className={isMobile && selectedSubSong ? "font-display italic text-white text-base truncate leading-tight" : "font-display italic text-white text-5xl lg:text-6xl tracking-tighter leading-none truncate"}
                            typingSpeed={80}
                            showCursor={false}
                            loop={false}
                        />
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-amber-accent font-body uppercase tracking-[0.3em] text-[10px] flex items-center gap-2 opacity-60">
                      <User size={12} /> {item.artist}
                    </div>
                    {selectedSubSong && (
                      <button onClick={() => setSelectedSubSong(null)} className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-wine-red/20 border border-white/10 rounded-lg text-[9px] uppercase tracking-widest text-aged-cream/60 hover:text-white transition-all">
                        <ChevronRight size={12} className="rotate-180" /> Volver al álbum
                      </button>
                    )}
                  </div>
                </header>
              )}

              {/* SCROLLABLE CONTENT */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto custom-modal-scroll">
                <div className={`p-8 lg:p-12 ${isMobile && selectedSubSong ? 'pt-6' : ''}`}>
                  
                  {isMobile && !selectedSubSong && (
                      <header className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="px-2 py-0.5 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.moodColor }} />
                                <span className="text-[9px] uppercase tracking-widest opacity-60 font-body">{item.mood}</span>
                            </div>
                            {isAlbum && <span className="px-2 py-0.5 bg-wine-red/20 text-wine-red text-[9px] uppercase tracking-widest rounded-full border border-wine-red/20 font-bold">Álbum</span>}
                        </div>
                        <TextType
                            key={item.id}
                            text={item.title}
                            as="h2"
                            className="text-5xl font-display italic text-white leading-none tracking-tighter mb-4"
                            typingSpeed={80}
                            showCursor={false}
                            loop={false}
                        />
                        <p className="text-amber-accent font-body uppercase tracking-[0.3em] text-[10px] opacity-60">{item.artist}</p>
                      </header>
                  )}

                  <AnimatePresence mode="wait">
                    {!selectedSubSong ? (
                      <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                        {!isAlbum ? (
                          <div className="space-y-10">
                            <p className="text-2xl lg:text-4xl font-display italic leading-snug text-aged-cream/90 border-l-4 border-wine-red pl-8 py-2">"{item.quote}"</p>
                            <p className="text-lg lg:text-xl font-body leading-relaxed opacity-60 italic max-w-3xl">{item.interpretation}</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-3 max-w-xl pb-10">
                            <span className="text-[9px] uppercase tracking-[0.4em] opacity-20 mb-4 block font-body">Tracks del archivo</span>
                            {item.displaySongs?.map((song) => (
                              <button key={song.id} onClick={() => { setSelectedSubSong(song); scrollRef.current?.scrollTo(0,0); }} className="w-full flex items-center justify-between p-6 bg-white/[0.03] hover:bg-wine-red/10 border border-white/5 rounded-2xl transition-all group text-left">
                                <div className="flex items-center gap-4">
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: song.moodColor, boxShadow: `0 0 8px ${song.moodColor}` }} />
                                  <span className="font-body text-base opacity-70 group-hover:text-white transition-colors">{song.title}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-[8px] uppercase tracking-widest opacity-30 font-body group-hover:opacity-100 transition-opacity">{song.mood}</span>
                                  <ChevronRight size={18} className="opacity-10 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-wine-red" />
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div key="sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
                        {isMobile && (
                           <button onClick={() => setSelectedSubSong(null)} className="flex items-center gap-2 text-wine-red text-[10px] uppercase tracking-widest font-bold mb-6">
                            <ChevronRight size={14} className="rotate-180" /> Volver al álbum
                          </button>
                        )}
                        <div className="flex items-center gap-3">
                          <div className="px-2 py-0.5 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedSubSong.moodColor }} />
                            <span className="text-[9px] uppercase tracking-widest opacity-60 font-body">{selectedSubSong.mood}</span>
                          </div>
                        </div>
                        <p className="text-2xl lg:text-4xl font-display italic leading-snug text-aged-cream/90 border-l-4 border-wine-red pl-8 py-2">"{selectedSubSong.quote}"</p>
                        <p className="text-lg lg:text-xl font-body leading-relaxed opacity-60 italic max-w-3xl">{selectedSubSong.interpretation}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* FOOTER */}
              <footer className="shrink-0 p-6 lg:p-8 border-t border-white/5 flex items-center justify-between text-[9px] uppercase tracking-[0.4em] opacity-20 font-body bg-[#080808]">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {new Date(item.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </footer>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SongModal;
