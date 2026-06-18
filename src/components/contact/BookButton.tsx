import { CONTACT_INFO } from './contact.types';

export default function BookButton() {
  return (
    <div className="book-wrap">
      <a href={CONTACT_INFO.bookUrl} className="book-btn" aria-label="Book a table at RASEEF 33">
        <span className="book-label">Book a Table</span>
        <span className="book-right">
          <span className="book-sub">Reservations recommended</span>
          <span className="book-arrow" aria-hidden="true">
            {/* Right arrow — inline SVG to avoid Tabler dependency here */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </span>
      </a>

      <style jsx>{`
        .book-wrap {
          position: relative;
        }

        .book-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 64px;
          background: transparent;
          border: 0.5px solid rgba(196, 168, 74, 0.22);
          padding: 0 24px;
          cursor: pointer;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease;
        }

        /* Gold fill sweeps left → right on hover */
        .book-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.38s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 0;
        }

        .book-btn:hover::before {
          transform: scaleX(1);
        }

        .book-label {
          font-family: var(--font-inter);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--gold);
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .book-btn:hover .book-label {
          color: var(--bg);
        }

        .book-right {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          z-index: 1;
        }

        .book-sub {
          font-family: var(--font-cormorant);
          font-size: 13px;
          font-weight: 300;
          font-style: italic;
          color: var(--ivory-40);
          letter-spacing: 0.04em;
          transition: color 0.3s ease;
        }

        .book-btn:hover .book-sub {
          color: rgba(15, 13, 10, 0.5);
        }

        .book-arrow {
          width: 28px;
          height: 28px;
          border: 0.5px solid rgba(196, 168, 74, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          flex-shrink: 0;
          transition: color 0.3s ease, border-color 0.3s ease;
        }

        .book-btn:hover .book-arrow {
          color: var(--bg);
          border-color: rgba(15, 13, 10, 0.2);
        }

        @media (max-width: 767px) {
          .book-sub {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}