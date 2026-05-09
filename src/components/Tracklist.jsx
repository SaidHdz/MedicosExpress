import { useState } from "react";
import { tracks } from "../data/tracks";

// Iconos SVG simples
const ChevronDown = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon"><path d="m6 9 6 6 6-6"/></svg>;
const Video = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>;
const ExternalLink = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const Bell = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;

export default function Tracklist({ onTrackHover }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (track) => {
    if (expandedId === track.id) {
      setExpandedId(null);
      if (onTrackHover) onTrackHover(null);
    } else {
      setExpandedId(track.id);
      if (onTrackHover) onTrackHover(track.color || null);
    }
  };

  return (
    <ul className="tracklist">
      {tracks.map((track) => {
        const isExpanded = expandedId === track.id;
        const hasLinks = track.links !== null;
        
        return (
          <li 
            key={track.id} 
            className={`track-item ${isExpanded ? 'is-expanded' : ''}`}
            onClick={() => handleToggle(track)}
          >
            <div className="track-header">
              <div className="track-main">
                <span className="track-num">{String(track.id).padStart(2, "0")}</span>
                <div className="track-info">
                  <p className="track-name">{track.title}</p>
                  {track.feat && (
                    <p className="track-feat">ft. {track.feat.join(", ")}</p>
                  )}
                </div>
              </div>
              <div className="track-icon">
                <ChevronDown />
              </div>
            </div>

            <div className="track-details-container">
              <div className="track-details">
                {hasLinks ? (
                  <>
                    <div className="spotify-preview">
                      <iframe 
                        src={`https://open.spotify.com/embed/track/${track.links.spId}?utm_source=generator&theme=0`} 
                        width="100%" 
                        height="80" 
                        frameBorder="0" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        style={{ border: 'none' }}
                      ></iframe>
                    </div>
                    <div className="track-actions-row">
                      <a href={track.links.yt} target="_blank" rel="noreferrer" className="action-btn-link yt" onClick={(e) => e.stopPropagation()}>
                        <Video /> VIDEOCLIP
                      </a>
                      <a href={track.links.sp} target="_blank" rel="noreferrer" className="action-btn-link sp" onClick={(e) => e.stopPropagation()}>
                        <ExternalLink /> FULL TRACK
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="presave-track-zone" onClick={(e) => e.stopPropagation()}>
                    <p className="presave-text">ESTA PISTA AÚN NO ESTÁ DISPONIBLE</p>
                    <button className="action-btn-link presave-inner">
                      <Bell /> NOTIFICARME (PRE-SAVE)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
