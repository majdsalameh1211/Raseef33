"use client";

import { useEffect, useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1600&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1600&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=80",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(v => (v + 1) % IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        height: "100svh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a08",
      }}
    >
      {/* Image slider */}
      {IMAGES.map((src, i) => (
        <div
          key={src}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1)" : "scale(1.04)",
            transition: "opacity 1400ms ease, transform 1400ms ease",
            filter: "saturate(0.82) sepia(0.18) brightness(0.92)",
            zIndex: 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(15,10,4,0.3) 0%, rgba(15,10,4,0.78) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        {/* Title — first */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(52px, 14vw, 120px)",
            fontWeight: 300,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "#EDE8DF",
            lineHeight: 0.95,
            margin: 0,
            textShadow: "0 2px 24px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)",
          }}
        >
          RASEEF 33
        </h1>

        {/* Gold rule */}
        <div
          style={{
            width: 48,
            height: "0.5px",
            background: "#B89040",
            opacity: 0.7,
            margin: "16px auto",
          }}
        />

        {/* Eyebrow — second */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase" as const,
            color: "#B89040",
            margin: "0 0 32px",
            textShadow: "0 1px 12px rgba(0,0,0,0.8)",
          }}
        >
          Arab-Galilean Food Bar · Haifa
        </p>

        {/* Tagline — third */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(10px, 1.5vw, 12px)",
            fontWeight: 300,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "rgba(237,232,223,0.6)",
            margin: "16px 0 64px",
            textShadow: "0 1px 12px rgba(0,0,0,0.8)",
          }}
        >
          Galilean Soul &nbsp;·&nbsp; Haifa Energy
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap" as const,
            justifyContent: "center",
          }}
        >
          <a
            href="#menu"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 56,
              padding: "0 40px",
              background: "transparent",
              color: "#EDE8DF",
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              border: "1px solid rgba(237,232,223,0.6)",
              transition: "border-color 220ms, background 220ms",
              whiteSpace: "nowrap" as const,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(237,232,223,1)";
              e.currentTarget.style.background = "rgba(237,232,223,0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(237,232,223,0.6)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Check Our Menu
          </a>

          <a
            href="#contact"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 56,
              padding: "0 40px",
              background: "#B89040",
              color: "#090907",
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              transition: "background 220ms",
              whiteSpace: "nowrap" as const,
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.background = "#EDE8DF")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.background = "#B89040")
            }
          >
            Book a Table
          </a>
        </div>
      </div>

      {/* Bottom center — dots + arrow */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          gap: 12,
          zIndex: 2,
        }}
      >
        {/* Slider dots */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? 32 : 8,
                height: 2,
                background: i === current
                  ? "#B89040"
                  : "rgba(237,232,223,0.4)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 300ms ease, background 300ms ease",
              }}
            />
          ))}
        </div>

{/* Animated chevron — mobile only */}
        <div id="scroll-arrow">
          <button
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Scroll to next section"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              gap: 3,
              animation: "arrowBounce 1.6s ease-in-out infinite",
              padding: 8,
            }}
          >
            <svg width="32" height="18" viewBox="0 0 32 18" fill="none"
              stroke="rgba(184,144,64,0.9)" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1,1 16,16 31,1" />
            </svg>
            <svg width="32" height="18" viewBox="0 0 32 18" fill="none"
              stroke="rgba(184,144,64,0.4)" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1,1 16,16 31,1" />
            </svg>
          </button>
        </div>

      </div>{/* ← closes bottom center div */}

      <style>{`
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%       { transform: translateY(5px); opacity: 0.5; }
        }
        #scroll-arrow { display: flex; }
        @media (min-width: 768px) {
          #scroll-arrow { display: none; }
        }
        @media (max-width: 640px) {
          #home a {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>

    </section>
  );

}