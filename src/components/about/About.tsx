"use client";

export default function About() {
    return (
        <section id="about" className="about-section">
            {/* Blurred bg image */}
            <div className="about-blurred-bg" />

            {/* Dark warm overlay */}
            <div className="about-overlay" />

            {/* Content */}
            <div className="about-content">
                {/* Left — framed sharp image */}
                <div className="about-image-shell">
                    <div className="about-image-frame">
                        <div className="about-image" />

                        {/* Fade right edge into content */}
                        <div className="about-image-side-fade" />

                        {/* Fade bottom */}
                        <div className="about-image-bottom-fade" />
                    </div>
                </div>

                {/* Right — text */}
                <div className="about-text">
                    <span className="about-label">Our Story</span>

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
          min-height: unset;
          display: flex;
          align-items: center;
          background: #0c0804;
        }

        .about-blurred-bg {
          position: absolute;
          inset: 0;
          background-image: url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=60");
          background-size: cover;
          background-position: center;
          filter: blur(40px) saturate(0.6) sepia(0.2) brightness(0.4);
          transform: scale(1.12);
          z-index: 0;
        }

        .about-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 45%, rgba(196, 168, 74, 0.08), transparent 36%),
            rgba(12, 8, 4, 0.76);
          z-index: 1;
        }

.about-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100dvh;
  margin: 0;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  overflow: hidden;
  background: rgba(10, 7, 4, 0.42);
  border: none;
  box-shadow: none;
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
          border: 0.5px solid rgba(196, 168, 74, 0.2);
          background: #090604;
        }

        .about-image {
          position: absolute;
          inset: 0;
          background-image: url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80");
          background-size: cover;
          background-position: center;
          filter: saturate(0.82) sepia(0.15) brightness(0.9);
          transform: scale(1.01);
        }

        .about-image-side-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            transparent 58%,
            rgba(12, 8, 4, 0.42) 100%
          );
          pointer-events: none;
        }

        .about-image-bottom-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(12, 8, 4, 0.62) 0%,
            transparent 42%
          );
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

        .about-label {
          font-family: "Inter", sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c4a84a;
          margin-bottom: clamp(14px, 2vh, 20px);
          display: block;
        }

        .about-title {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(34px, 4.2vw, 58px);
          font-weight: 300;
          font-style: italic;
          color: #ede8df;
          line-height: 1.08;
          margin: 0 0 clamp(16px, 2vh, 22px);
          letter-spacing: 0.02em;
        }

        .about-rule {
          width: 40px;
          height: 0.5px;
          background: #c4a84a;
          opacity: 0.65;
          margin-bottom: clamp(18px, 3vh, 26px);
        }

        .about-body {
          font-family: "Inter", sans-serif;
          font-size: clamp(13px, 1vw, 14px);
          font-weight: 300;
          line-height: 1.85;
          color: rgba(237, 232, 223, 0.58);
          margin: 0 0 clamp(22px, 4vh, 34px);
          max-width: 470px;
        }

        .about-quote {
          margin: 0;
          padding: 0 0 0 18px;
          border-left: 0.5px solid rgba(196, 168, 74, 0.4);
        }

        .about-quote p {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(16px, 1.8vw, 22px);
          font-weight: 300;
          font-style: italic;
          color: #c4a84a;
          line-height: 1.55;
          margin: 0 0 10px;
          max-width: 430px;
        }

        .about-quote cite {
          font-family: "Inter", sans-serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(237, 232, 223, 0.28);
          font-style: normal;
        }

        .about-stats {
          display: flex;
          gap: clamp(18px, 3vw, 32px);
          margin-top: clamp(24px, 5vh, 38px);
          padding-top: clamp(20px, 4vh, 30px);
          border-top: 0.5px solid rgba(237, 232, 223, 0.07);
        }

        .about-stat-num {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(24px, 2.4vw, 30px);
          font-weight: 300;
          color: #ede8df;
          line-height: 1;
        }

        .about-stat-label {
          font-family: "Inter", sans-serif;
          font-size: 8px;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(237, 232, 223, 0.3);
          margin-top: 6px;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .about-section {
            height: auto;
            min-height: auto;
            align-items: stretch;
          }

          .about-content {
            width: 100%;
            height: auto;
            margin: 0;
            display: grid;
            grid-template-columns: 1fr;
            background: rgba(10, 7, 4, 0.36);
            border: none;
            box-shadow: none;
          }

          .about-image-shell {
            height: 300px;
            padding: 0;
          }

          .about-image-frame {
            height: 300px;
            border: none;
          }

          .about-image {
            background-position: center;
          }

          .about-image-side-fade {
            display: none;
          }

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

          .about-label {
            font-size: 8px;
            margin-bottom: 18px;
          }

          .about-title {
            font-size: 40px;
            margin-bottom: 20px;
          }

          .about-rule {
            margin-bottom: 24px;
          }

          .about-body {
            font-size: 14px;
            line-height: 1.85;
            max-width: none;
            margin-bottom: 32px;
          }

          .about-quote {
            padding-left: 16px;
          }

          .about-quote p {
            font-size: 21px;
            max-width: none;
          }

          .about-stats {
            justify-content: space-between;
            gap: 12px;
            margin-top: 34px;
            padding-top: 26px;
          }

          .about-stat-num {
            font-size: 27px;
          }

          .about-stat-label {
            font-size: 7px;
            letter-spacing: 0.1em;
            white-space: normal;
          }
        }
      `}</style>
        </section>
    );
}