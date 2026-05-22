import { useState, useEffect } from 'react';
import { initialSongs } from '../data/songs';
import { saveData, loadData } from './storage';

export const useSongs = () => {
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carga inicial y migración
  useEffect(() => {
    const initCollection = async () => {
      try {
        // 1. Intentar cargar de IndexedDB
        const stored = await loadData();
        if (stored && Array.isArray(stored)) {
          setCollection(stored);
        } else {
          // 2. Si no hay en IndexedDB, intentar migrar de localStorage
          const legacy = localStorage.getItem('rokola_collection');
          if (legacy) {
            const parsedLegacy = JSON.parse(legacy);
            setCollection(parsedLegacy);
            await saveData(parsedLegacy); // Guardar en el nuevo sistema
            // Opcional: localStorage.removeItem('rokola_collection');
          } else if (initialSongs && initialSongs.length > 0) {
            setCollection(initialSongs);
          }
        }
      } catch (e) {
        console.error("Error inicializando colección:", e);
      } finally {
        setIsLoading(false);
      }
    };

    initCollection();
  }, []);

  // Guardado automático en IndexedDB
  useEffect(() => {
    if (!isLoading) {
      saveData(collection).catch(e => {
        console.error("Fallo crítico al guardar en IndexedDB:", e);
        // Si falla IndexedDB (raro), intentamos forzar una descarga para que el usuario no pierda el trabajo
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(collection, null, 2));
        const link = document.createElement('a');
        link.href = dataStr;
        link.download = "EMERGENCIA_ROKOLA_BACKUP.json";
        link.click();
        alert('¡ERROR CRÍTICO DE ALMACENAMIENTO! El navegador no permite guardar más datos. Se ha descargado automáticamente un archivo de respaldo (EMERGENCIA_ROKOLA_BACKUP.json). No cierres la pestaña sin asegurar ese archivo.');
      });
    }
  }, [collection, isLoading]);

  const addEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: crypto.randomUUID(),
      addedAt: Date.now(),
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
