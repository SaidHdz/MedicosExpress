import { useState, useEffect } from 'react';
import { initialSongs } from '../data/songs';

export const useSongs = () => {
  const [collection, setCollection] = useState(() => {
    // Si hay datos en el archivo estático, los usamos como prioridad para la versión publicada
    if (initialSongs && initialSongs.length > 0) {
      return initialSongs;
    }
    const saved = localStorage.getItem('rokola_collection');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('rokola_collection', JSON.stringify(collection));
  }, [collection]);

  const addEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: crypto.randomUUID(),
      addedAt: Date.now(),
      // entry.type puede ser 'album' o 'single'
      songs: entry.type === 'album' ? entry.songs : []
    };
    setCollection(prev => [newEntry, ...prev]);
  };

  const deleteEntry = (id) => {
    setCollection(prev => prev.filter(item => item.id !== id));
  };

  const updateEntry = (updatedEntry) => {
    setCollection(prev => prev.map(item => item.id === updatedEntry.id ? updatedEntry : item));
  };

  const resetCollection = () => {
    localStorage.removeItem('rokola_collection');
    localStorage.removeItem('rokola_songs'); // Limpiar rastro viejo
    setCollection([]);
  };

  const exportCollection = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(collection, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "rokola_archive.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importCollection = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data)) {
        setCollection(data);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Error al importar JSON:", e);
      return false;
    }
  };

  return {
    collection,
    addEntry,
    deleteEntry,
    updateEntry,
    resetCollection,
    exportCollection,
    importCollection
  };
};
