import React from 'react';
import { motion } from 'framer-motion';

const moods = [
  { id: 'all', label: 'Todos', color: '#f5f5dc' },
  { id: 'nostalgia', label: 'Nostalgia', color: '#8B2E2E' },
  { id: 'dolor', label: 'Dolor', color: '#4A148C' },
  { id: 'tristeza', label: 'Tristeza', color: '#1A365D' },
  { id: 'amor', label: 'Amor', color: '#C2185B' },
  { id: 'rabia', label: 'Rabia', color: '#D32F2F' },
  { id: 'paz', label: 'Paz', color: '#FFBF00' }
];

const FilterBar = ({ 
  activeMood, onMoodChange, 
  activeYear, onYearChange, 
  activeType, onTypeChange,
  totalSongs, visibleSongs 
}) => {
  const currentYear = new Date().getFullYear();
  const years = ['all', currentYear, currentYear - 1, 'Older'];
  const types = [
    { id: 'all', label: 'Todo' },
    { id: 'album', label: 'Álbumes' },
    { id: 'single', label: 'Singles' },
    { id: 'only-songs', label: 'Solo Canciones' }
  ];

  const handleMoodClick = (e, id) => {
    e.stopPropagation();
    onMoodChange(id);
  };

  const handleTypeClick = (e, id) => {
    e.stopPropagation();
    onTypeChange(id);
  };

  const handleYearClick = (e, id) => {
    e.stopPropagation();
    onYearChange(id);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 mb-12 md:mb-16 px-4 md:px-0 relative z-10">
      {/* Mood Filters - Scrollable on mobile */}
      <div className="flex flex-col gap-4">
        <span className="text-[10px] uppercase tracking-widest opacity-30 font-body block">Sentimiento:</span>
        <div className="flex overflow-x-auto md:flex-wrap gap-3 pb-2 md:pb-0 scrollbar-hide no-scrollbar">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={(e) => handleMoodClick(e, mood.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-body border transition-all duration-300 flex-shrink-0 ${
                activeMood === mood.id 
                  ? 'bg-aged-cream text-deep-black border-aged-cream shadow-[0_0_15px_rgba(253,252,240,0.3)]' 
                  : 'bg-transparent text-aged-cream/40 border-aged-cream/5 hover:border-aged-cream/20'
              }`}
            >
              <span 
                className="inline-block w-1.5 h-1.5 rounded-full mr-2" 
                style={{ backgroundColor: mood.color, boxShadow: `0 0 5px ${mood.color}` }}
              />
              {mood.label}
            </button>
          ))}
        </div>
      </div>

      {/* Year & Type Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-t border-aged-cream/5 pt-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          
          {/* Categoría Stacked on Mobile */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-widest opacity-30 font-body block shrink-0">Categoría:</span>
            <div className="flex flex-wrap bg-white/5 p-1 rounded-xl border border-white/5 gap-1 w-fit">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={(e) => handleTypeClick(e, type.id)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-widest font-body transition-all ${
                    activeType === type.id 
                      ? 'bg-wine-red text-white shadow-lg' 
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-widest opacity-30 font-body block">Año:</span>
            <div className="flex gap-4">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={(e) => handleYearClick(e, year)}
                  className={`text-xs font-body transition-all ${
                    activeYear === year 
                      ? 'text-aged-cream underline underline-offset-8 decoration-wine-red' 
                      : 'text-aged-cream/40 hover:text-aged-cream/60'
                  }`}
                >
                  {year === 'all' ? 'Ver todo' : year === 'Older' ? 'Anteriores' : year}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-body border-l-2 border-wine-red/30 pl-4 py-1">
          Archivo: <span className="text-aged-cream font-bold">{visibleSongs}</span> / {totalSongs}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
