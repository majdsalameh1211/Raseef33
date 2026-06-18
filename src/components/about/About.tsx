"use client";

// Background image for this section — swap to any food/interior photo
const ABOUT_BG = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=60";
const ABOUT_IMG = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80";

export default function About() {
  return (
    <section
      id="about"
      className="about-section"
      style={{ "--section-bg-image": `url("${ABOUT_BG}")` } as React.CSSProperties}
    >
      {/* Shared bg system — defined in globals.css */}
      <div className="section-bg" />
      <div className="section-overlay" />

      {/* Content */}
      <div className="about-content">
        {/* Left — framed sharp image */}
        <div className="about-image-shell">
          <div className="about-image-frame">
            <div
              className="about-image"
              style={{ backgroundImage: `url("${ABOUT_IMG}")` }}
            />
            <div className="about-image-side-fade" />
            <div className="about-image-bottom-fade" />
          </div>
        </div>

        {/* Right — text */}
        <div className="about-text">
          <span className="section-eyebrow">Our Story</span>

          <h2 className="about-title">
            In the Heart
            <br />
            of Haifa
          </h2>

          <div className="about-rule" />

          <p className="about-body">
            In the heart of Haifa&apos;s lower city, on the busy port street,
            RASEEF 33 brings together the flavors of the Galilee, the rhythm of
            the port, and the colorful culinary mosaic of Haifa. Local
            ingredients, open-kitchen energy, and warm hospitality shape every
            plate.
          </p>

          <blockquote className="about-quote">
            <p>
              &quot;Arab-Galilean cuisine inspired by Haifa&apos;s markets,
              port, and people.&quot;
            </p>
            <cite>— Chef Firas Khalila</cite>
          </blockquote>

          <div className="about-stats">
            {[
              { num: "2019", label: "Est. Haifa" },
              { num: "100%", label: "Local sourcing" },
              { num: "Daily", label: "Fresh menu" },
            ].map((s) => (
              <div className="about-stat" key={s.label}>
                <div className="about-stat-num">{s.num}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 100dvh;
          display: flex;
          align-items: center;
          background: var(--bg-section);
        }

        .about-content {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100dvh;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          overflow: hidden;
          background: rgba(10, 7, 4, 0.42);
        }

        .about-image-shell {
          position: relative;
          overflow: hidden;
          height: 100%;
          padding: 32px;
          box-sizing: border-box;
        }

        .about-image-frame {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border: var(--border-gold);
          background: #090604;
        }

        .about-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: var(--img-filter);
          transform: scale(1.01);
        }

        .about-image-side-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent 58%, rgba(12, 8, 4, 0.42) 100%);
          pointer-events: none;
        }

        .about-image-bottom-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(12, 8, 4, 0.62) 0%, transparent 42%);
          pointer-events: none;
        }

        .about-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 0;
          overflow: hidden;
          padding: clamp(32px, 5vh, 64px) clamp(36px, 5vw, 72px);
          box-sizing: border-box;
        }

        .about-title {
          font-family: var(--font-cormorant);
          font-size: clamp(34px, 4.2vw, 58px);
          font-weight: 300;
          font-style: italic;
          color: var(--ivory);
          line-height: 1.08;
          margin: 0 0 clamp(16px, 2vh, 22px);
          letter-spacing: 0.02em;
        }

        .about-rule {
          width: 40px;
          height: var(--rule-h);
          background: var(--gold);
          opacity: var(--rule-opacity);
          margin-bottom: clamp(18px, 3vh, 26px);
        }

        .about-body {
          font-family: var(--font-inter);
          font-size: clamp(13px, 1vw, 14px);
          font-weight: 300;
          line-height: 1.85;
          color: var(--ivory-muted);
          margin: 0 0 clamp(22px, 4vh, 34px);
          max-width: 470px;
        }

        .about-quote {
          margin: 0;
          padding: 0 0 0 18px;
          border-left: 0.5px solid rgba(196, 168, 74, 0.4);
        }

        .about-quote p {
          font-family: var(--font-cormorant);
          font-size: clamp(16px, 1.8vw, 22px);
          font-weight: 300;
          font-style: italic;
          color: var(--gold);
          line-height: 1.55;
          margin: 0 0 10px;
          max-width: 430px;
        }

        .about-quote cite {
          font-family: var(--font-inter);
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ivory-28);
          font-style: normal;
        }

        .about-stats {
          display: flex;
          gap: clamp(18px, 3vw, 32px);
          margin-top: clamp(24px, 5vh, 38px);
          padding-top: clamp(20px, 4vh, 30px);
          border-top: var(--border-ivory);
        }

        .about-stat-num {
          font-family: var(--font-cormorant);
          font-size: clamp(24px, 2.4vw, 30px);
          font-weight: 300;
          color: var(--ivory);
          line-height: 1;
        }

        .about-stat-label {
          font-family: var(--font-inter);
          font-size: 8px;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(237, 232, 223, 0.3);
          margin-top: 6px;
          white-space: nowrap;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .about-section {
            height: auto;
            align-items: stretch;
          }

          .about-content {
            height: auto;
            grid-template-columns: 1fr;
          }

          .about-image-shell {
            height: 300px;
            padding: 0;
          }

          .about-image-frame {
            height: 300px;
            border: none;
          }

          .about-image-side-fade { display: none; }

          .about-image-bottom-fade {
            background: linear-gradient(
              to top,
              rgba(12, 8, 4, 0.9) 0%,
              rgba(12, 8, 4, 0.48) 34%,
              transparent 72%
            );
          }

          .about-text {
            padding: 40px 24px 56px;
            overflow: visible;
          }

          .about-title   { font-size: 40px; margin-bottom: 20px; }
          .about-rule    { margin-bottom: 24px; }
          .about-body    { font-size: 14px; max-width: none; margin-bottom: 32px; }
          .about-quote p { font-size: 21px; max-width: none; }

          .about-stats {
            justify-content: space-between;
            gap: 12px;
            margin-top: 34px;
            padding-top: 26px;
          }

          .about-stat-num   { font-size: 27px; }
          .about-stat-label { font-size: 7px; white-space: normal; }
        }
      `}</style>
    </section>
  );
}