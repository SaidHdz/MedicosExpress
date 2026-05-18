### **Plan de Implementación**

#### **Stack**

* **React** (Vite) \+ **Tailwind CSS** \+ **React Bits** para componentes animados  
* **localStorage** para persistir las canciones (sin backend, todo en el browser)  
* Fuentes: `Playfair Display` (display) \+ `DM Serif Text` (body)  
* Paleta: negro profundo, crema envejecido, un acento en rojo vino o ámbar

---

#### **Estructura de carpetas**

src/

├── components/

│   ├── Hero.jsx              \# Portada animada con título

│   ├── FilterBar.jsx         \# Filtros de mood y fecha

│   ├── SongGrid.jsx          \# Grid tipo álbum con las tarjetas

│   ├── SongCard.jsx          \# Tarjeta individual (vinilo flip)

│   ├── SongModal.jsx         \# Vista expandida con interpretación

│   └── AddSongForm.jsx       \# Formulario para agregar canciones

├── data/

│   └── songs.js              \# Canciones iniciales (Sayonara, Omakase, ATP...)

├── hooks/

│   └── useSongs.js           \# Estado global \+ CRUD \+ localStorage

└── App.jsx

---

#### **Modelo de datos — cada canción**

js

{

  id: "uuid",

  title: "Sayonara",

  artist: "Artista",

  cover: "/covers/sayonara.jpg",   // URL o null → placeholder generado

  mood: "nostalgia",               // nostalgia | dolor | amor | rabia | paz

  moodColor: "\#8B2E2E",

  date: "2024-03-15",              // fecha en que la viviste

  quote: "La frase que más te pegó...",

  interpretation: "Tu texto largo aquí...",

  addedAt: timestamp

}

---

#### **Pantallas / Vistas**

**① Hero / Portada**

* Título animado con React Bits (`TextReveal` o `SplitText`)  
* Fondo con grain texture \+ partículas sutiles  
* CTA: "Ver colección"

**② Colección (main view)**

* Grid asimétrico 2–3 columnas  
* Cada `SongCard` tiene efecto flip al hover: frente \= cover \+ título, reverso \= mood \+ quote corta  
* Botón `+` flotante para agregar canción

**③ FilterBar**

* Filtro por **mood** → pills con color de cada mood  
* Filtro por **fecha** → selector de rango (mes/año) o botones tipo "este año", "hace 6 meses", etc.  
* Contador: *"Mostrando 4 de 12 canciones"*

**④ SongModal**

* Se abre al click en una tarjeta  
* Layout editorial: cover grande a la izquierda, texto a la derecha  
* Tipografía grande para la quote, cuerpo para tu interpretación  
* Animación de entrada con React Bits (`BlurFade` o similar)

**⑤ AddSongForm**

* Drawer o modal lateral  
* Campos: título, artista, URL cover, mood (selector visual con colores), fecha, quote, interpretación  
* Se guarda en localStorage via `useSongs`

---

#### **Fases de desarrollo**

| Fase | Qué construyes | Estimado |
| ----- | ----- | ----- |
| 1 | Setup Vite \+ Tailwind \+ React Bits, datos mock, `useSongs` hook | \~1h |
| 2 | `SongCard` con flip animation \+ `SongGrid` | \~2h |
| 3 | `SongModal` con interpretación completa | \~1h |
| 4 | `FilterBar` (mood \+ fecha) | \~1.5h |
| 5 | `AddSongForm` \+ persistencia localStorage | \~1.5h |
| 6 | Hero animado \+ polish visual final | \~1h |

