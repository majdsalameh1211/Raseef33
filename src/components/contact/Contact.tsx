'use client';

import ContactHeader  from './ContactHeader';
import ContactHours   from './ContactHours';
import ContactReserve from './ContactReserve';
import ContactMap     from './ContactMap';

export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      style={{ '--section-bg-image': "url('/images/contact-bg.jpg')" } as React.CSSProperties}
    >
      {/* Blurred photo background — same pattern as Menu / Gallery */}
      <div className="section-bg"    aria-hidden="true" />
      <div className="section-overlay" aria-hidden="true" />

      <div className="section-inner contact-inner">
        <ContactHeader />

        {/* Two-column panel */}
        <div className="contact-panel">
          <ContactHours />
          <ContactReserve />
        </div>

        {/* Full-width map */}
        <ContactMap />
      </div>

      <style jsx>{`
        .contact-section {
          position: relative;
          overflow: hidden;
          padding: var(--section-pad-v, 100px) 0 0;
          background: var(--bg);
        }

        .contact-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* ── Two-column panel ── */
        .contact-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          /* 1px gap + matching bg creates the gold divider line */
          gap: 1px;
          background: rgba(196, 168, 74, 0.15);
          border: 0.5px solid rgba(196, 168, 74, 0.22);
          border-bottom: none;
          margin-bottom: 0;
        }

        /* ── Mobile: single column ── */
        @media (max-width: 767px) {
          .contact-section {
            padding: 72px 0 0;
          }

          .contact-panel {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}