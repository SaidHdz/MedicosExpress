import { useState, useEffect } from 'react';
import { initialSongs } from '../data/songs';

export const useSongs = () => {
  // En esta versión final de regalo, la colección es estática y viene de songs.js
  const [collection, setCollection] = useState(initialSongs);
  const isLoading = false;

  // Desactivamos el guardado y la carga de IndexedDB/localStorage para la versión de entrega
  const addEntry = () => console.warn("Modo lectura: No se pueden añadir canciones.");
  const deleteEntry = () => console.warn("Modo lectura: No se pueden borrar canciones.");
  const updateEntry = () => console.warn("Modo lectura: No se pueden editar canciones.");
  const resetCollection = () => console.warn("Modo lectura: No se puede limpiar el archivo.");
  const exportCollection = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(collection, null, 2));
    const link = document.createElement('a');
    link.href = dataStr;
    link.download = "rokola_backup.json";
    link.click();
  };
  const importCollection = () => console.warn("Modo lectura: No se pueden importar datos.");

  return {
    collection,
    isLoading,
    addEntry,
    deleteEntry,
    updateEntry,
    resetCollection,
    exportCollection,
    importCollection
  };
};
