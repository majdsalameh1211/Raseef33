import BookButton from './BookButton';
import MapLinks from './MapLinks';
import { CONTACT_INFO } from './contact.types';

export default function ContactReserve() {
  return (
    <div className="col-reserve">
      <span className="col-label">Reserve &amp; Visit</span>

      {/* ── Book a Table ── */}
      <BookButton />

      {/* ── Address + map launchers ── */}
      <div className="address-block">
        <address className="address-content">
          <p className="address-main">{CONTACT_INFO.address}</p>
          <p className="address-sub">{CONTACT_INFO.entrance}</p>
        </address>
        <MapLinks />
      </div>

      {/* ── Phone ── */}
      <div className="phone-block">
        <div className="phone-icon" aria-hidden="true">
          {/* Phone icon — inline SVG */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
          </svg>
        </div>
        <div>
          <span className="phone-label">Reservations</span>
          <a href={CONTACT_INFO.phoneTel} className="phone-number">
            {CONTACT_INFO.phone}
          </a>
        </div>
      </div>

      <style jsx>{`
        .col-reserve {
          background: var(--bg);
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 28px;
        }

        .col-label {
          font-family: var(--font-inter);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0;
          display: block;
        }

        /* Address */
        .address-block {
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-top: 0.5px solid rgba(237, 232, 223, 0.08);
          padding-top: 24px;
          flex: 1;
          justify-content: center;
        }

        .address-content {
          font-style: normal;
        }

        .address-main {
          font-family: var(--font-cormorant);
          font-size: 24px;
          font-weight: 300;
          color: var(--ivory);
          letter-spacing: 0.04em;
          margin: 0 0 4px;
          line-height: 1.3;
        }

        .address-sub {
          font-family: var(--font-inter);
          font-size: 11px;
          font-weight: 300;
          color: var(--ivory-40);
          letter-spacing: 0.06em;
          margin: 0 0 4px;
        }

        /* Phone */
        .phone-block {
          display: flex;
          align-items: center;
          gap: 14px;
          border-top: 0.5px solid rgba(237, 232, 223, 0.08);
          padding-top: 24px;
        }

        .phone-icon {
          width: 36px;
          height: 36px;
          border: 0.5px solid rgba(196, 168, 74, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--gold);
        }

        .phone-label {
          font-family: var(--font-inter);
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ivory-28);
          display: block;
          margin-bottom: 3px;
        }

        .phone-number {
          font-family: var(--font-cormorant);
          font-size: 24px;
          font-weight: 300;
          letter-spacing: 0.1em;
          color: var(--ivory);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .phone-number:hover {
          color: var(--gold);
        }

        @media (max-width: 767px) {
          .col-reserve {
            padding: 36px 24px;
          }
        }
      `}</style>
    </div>
  );
}