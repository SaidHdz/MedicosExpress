import omakaseCover from '../assets/omakase.png';
import royCover from '../assets/roy.png';
import sisifoCover from '../assets/sisifo.jpg';
import aceleraaCover from '../assets/aceleraa.png';
import loteCover from '../assets/lote.jpg';
import tuVasSinCover from '../assets/tu vas sin.jpg';
import sayonaraCover from '../assets/sayonara.jpg';
import felicilandiaCover from '../assets/ab67616d0000b2734385062efd655ededc0d2caa (1)felicilandia.jpg';
import deidadCover from '../assets/deidad.jpg';
import cosasCover from '../assets/cosas.jpg';

export const initialSongs = [
  {
    id: "saiko-cosas",
    title: "COSAS QUE NO TE DIJE",
    artist: "Saiko",
    cover: cosasCover,
    note: "vamos a escribir nuestras iniciales juntas, eh, la verdad que tu me gustas",
    spotifyUrl: "https://open.spotify.com/search/Saiko%20COSAS%20QUE%20NO%20TE%20DIJE",
    type: "single",
    date: new Date().toISOString()
  },
  {
    id: "kyotto-cosas-que-jamas",
    title: "Cosas Que Jamás Diría a Nadie",
    artist: "Kyotto",
    cover: deidadCover,
    note: "ven y vamos a querernos como si na' de esto doliera",
    spotifyUrl: "https://open.spotify.com/search/Kyotto%20Cosas%20Que%20Jamas%20Diria%20a%20Nadie",
    type: "single",
    date: new Date().toISOString()
  },
  {
    id: "alvarodiaz-gatillera",
    title: "Gatillera",
    artist: "Álvaro Díaz",
    cover: felicilandiaCover,
    note: "no se que dia e' ya va a anochece' y no quiero hacer nada mas que mirar tu cara",
    spotifyUrl: "https://open.spotify.com/search/Alvaro%20Diaz%20Gatillera",
    type: "single",
    date: new Date().toISOString()
  },
  {
    id: "alvarodiaz-sinpoderes",
    title: "SIN PODERES",
    artist: "Álvaro Díaz",
    cover: sayonaraCover,
    note: "es que tu na ma, me dejas sin poderes",
    spotifyUrl: "https://open.spotify.com/search/Alvaro%20Diaz%20SIN%20PODERES",
    type: "single",
    date: new Date().toISOString()
  },
  {
    id: "relsb-tu-vas-sin",
    title: "TU VAS SIN (fav)",
    artist: "Rels B",
    cover: tuVasSinCover,
    note: "yo quiero todo, quiero que tu te enamores, baby, yo te quiero solo pa mi",
    spotifyUrl: "https://open.spotify.com/search/Rels%20B%20TU%20VAS%20SIN",
    type: "single",
    date: new Date().toISOString()
  },
  {
    id: "bigsempa-laguera",
    title: "La Güera",
    artist: "Big Sempa",
    cover: loteCover,
    note: "Porque somos raros y nos entendemos, Ya no importa nada porque nos tenemos",
    spotifyUrl: "https://open.spotify.com/search/Big%20Sempa%20La%20Guera",
    type: "single",
    date: new Date().toISOString()
  },
  {
    id: "aceleraaa",
    title: "ACELERAAÁ",
    artist: "Artista",
    cover: aceleraaCover,
    note: "Ma, tú ere mi estilo, tú mi type beat",
    spotifyUrl: "https://open.spotify.com/search/ACELERAA%C3%81",
    type: "single",
    date: new Date().toISOString()
  },
  {
    id: "nsqk-nadie-mas",
    title: "NADIE MAS!",
    artist: "NSQK",
    cover: sisifoCover,
    note: "por que eres tu, no quiero a nadie mas",
    spotifyUrl: "https://open.spotify.com/search/NSQK%20NADIE%20MAS!",
    type: "single",
    date: new Date().toISOString()
  },
  {
    id: "nsqk-si-en-tu-mente",
    title: "Si en tu mente estuve",
    artist: "NSQK",
    cover: royCover,
    note: "Que solo quiero saber Si una mariposa viste en tu ventana Cómo te pediste el café por la mañana Y si en tu mente estuve",
    spotifyUrl: "https://open.spotify.com/search/NSQK%20Si%20en%20tu%20mente%20estuve",
    type: "single",
    date: new Date().toISOString()
  },
  {
    id: "omakase-album",
    title: "OMAKASE",
    artist: "Álvaro Díaz",
    cover: omakaseCover,
    type: "album",
    date: new Date().toISOString(),
    songs: [
      {
        id: "bimel",
        title: "BIMEL.",
        note: "", 
        spotifyUrl: "https://open.spotify.com/search/Alvaro%20Diaz%20BIMEL"
      },
      {
        id: "spacexxx",
        title: "SPACEXXX.",
        note: "pensando en ti pensando en ti to el dia, toa despeinada con una tshirt mia", 
        spotifyUrl: "https://open.spotify.com/search/Alvaro%20Diaz%20SPACEXXX"
      },
      {
        id: "inarow62",
        title: "INAROW62.",
        note: "", 
        spotifyUrl: "https://open.spotify.com/search/Alvaro%20Diaz%20INAROW62"
      },
      {
        id: "nopodemos",
        title: "NO PODEMOS SER AMIGOS",
        note: "", 
        spotifyUrl: "https://open.spotify.com/search/Alvaro%20Diaz%20NO%20PODEMOS%20SER%20AMIGOS"
      }
    ]
  }
];
