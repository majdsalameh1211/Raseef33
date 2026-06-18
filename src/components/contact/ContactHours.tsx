import { CONTACT_HOURS } from './contact.types';

export default function ContactHours() {
  return (
    <div className="col-hours">
      <span className="col-label">Opening Hours</span>

      <ul className="hours-list">
        {CONTACT_HOURS.map(({ days, hours, closed }) => (
          <li key={days} className={`hours-row${closed ? ' hours-row--closed' : ''}`}>
            <span className="hours-days">{days}</span>
            <span className="hours-time">{hours}</span>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .col-hours {
          background: var(--bg);
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
        }

        .col-label {
          font-family: var(--font-inter);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 32px;
          display: block;
        }

        .hours-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          border-bottom: 0.5px solid rgba(237, 232, 223, 0.08);
          min-height: 64px;
        }

        .hours-row:last-child {
          border-bottom: none;
        }

        .hours-days {
          font-family: var(--font-inter);
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.06em;
          color: var(--ivory-60);
        }

        .hours-time {
          font-family: var(--font-cormorant);
          font-size: 22px;
          font-weight: 300;
          letter-spacing: 0.06em;
          color: var(--ivory);
        }

        /* Closed row */
        .hours-row--closed .hours-days {
          color: var(--ivory-28);
          font-style: italic;
        }

        .hours-row--closed .hours-time {
          font-family: var(--font-inter);
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ivory-28);
        }

        @media (max-width: 767px) {
          .col-hours {
            padding: 36px 24px;
          }

          .hours-row {
            min-height: 56px;
          }
        }
      `}</style>
    </div>
  );
}