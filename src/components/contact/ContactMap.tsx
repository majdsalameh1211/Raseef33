import { CONTACT_INFO } from './contact.types';

export default function ContactMap() {
  return (
    <div className="map-row">
      <iframe
        src={CONTACT_INFO.mapEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0, display: 'block', filter: 'saturate(0.7) sepia(0.25) brightness(0.75)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="RASEEF 33 location on Google Maps"
      />

      <style jsx>{`
        .map-row {
          height: 320px;
          border: 0.5px solid rgba(196, 168, 74, 0.22);
          border-top: none;
          overflow: hidden;
          position: relative;
        }

        @media (max-width: 767px) {
          .map-row {
            height: 240px;
          }
        }
      `}</style>
    </div>
  );
}