import { CONTACT_INFO } from './contact.types';

/* ── Waze SVG logo ─────────────────────────────────────────── */
function WazeSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M32 4C16.536 4 4 16.536 4 32c0 8.28 3.6 15.72 9.32 20.88L12 56l8-2c3.48 1.28 7.24 2 11.2 2C47.464 56 60 43.464 60 28S47.464 4 32 4z"
        fill="#09C7EE"
      />
      <ellipse cx="32" cy="30" rx="18" ry="16" fill="#fff" />
      {/* Eyes */}
      <circle cx="25" cy="26" r="2" fill="#333" />
      <circle cx="39" cy="26" r="2" fill="#333" />
      {/* Smile */}
      <path d="M26 33c1.5 2 4.5 3 6 3s4.5-1 6-3" stroke="#333" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Wheels */}
      <circle cx="25" cy="44" r="3.5" fill="#333" />
      <circle cx="40" cy="44" r="3.5" fill="#333" />
    </svg>
  );
}

/* ── Google Maps SVG logo ──────────────────────────────────── */
function GoogleMapsSvg() {
  return (
    <svg width="16" height="22" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="gm-pin" x1="0" y1="0" x2="24" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#EA4335" />
          <stop offset="35%"  stopColor="#FBBC04" />
          <stop offset="65%"  stopColor="#34A853" />
          <stop offset="100%" stopColor="#4285F4" />
        </linearGradient>
      </defs>
      <path
        d="M12 0C5.373 0 0 5.373 0 12c0 9 12 22 12 22S24 21 24 12C24 5.373 18.627 0 12 0z"
        fill="url(#gm-pin)"
      />
      <circle cx="12" cy="12" r="5" fill="white" />
    </svg>
  );
}

/* ── MapLinks component ────────────────────────────────────── */
export default function MapLinks() {
  return (
    <div className="map-links">
      <a
        href={CONTACT_INFO.wazeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="map-link"
        aria-label="Open location in Waze"
      >
        <WazeSvg />
        <span>Waze</span>
      </a>

      <a
        href={CONTACT_INFO.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="map-link"
        aria-label="Open location in Google Maps"
      >
        <GoogleMapsSvg />
        <span>Google Maps</span>
      </a>

      <style jsx>{`
        .map-links {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .map-link {
          display: flex;
          align-items: center;
          gap: 9px;
          height: 40px;
          padding: 0 16px;
          border: 0.5px solid rgba(237, 232, 223, 0.15);
          background: transparent;
          font-family: var(--font-inter);
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ivory-60);
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          white-space: nowrap;
        }

        .map-link:hover {
          background: rgba(237, 232, 223, 0.04);
          border-color: rgba(237, 232, 223, 0.3);
          color: var(--ivory);
        }
      `}</style>
    </div>
  );
}