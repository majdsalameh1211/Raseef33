"use client";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "0.5px solid rgba(139,115,85,0.2)",
      }}
    >
      {/* ── Main area ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: "52px 24px 40px",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20,
              fontWeight: 300,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--ivory)",
              lineHeight: 1,
            }}
          >
            RASEEF 33
          </span>
          <div
            style={{
              width: 28,
              height: "0.5px",
              background: "var(--gold)",
              opacity: 0.55,
            }}
          />
        </div>

        {/* Socials */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: "0.5px solid var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gold)",
                textDecoration: "none",
                transition: "color 200ms, border-color 200ms, background 200ms",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--gold)";
                e.currentTarget.style.color = "var(--bg)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--gold)";
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: "0.5px solid rgba(232,226,215,0.05)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            fontWeight: 300,
            letterSpacing: "0.1em",
            color: "rgba(232,226,215,0.25)",
          }}
        >
          © {year} RASEEF 33. All rights reserved.
        </span>

        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy Policy", "Accessibility"].map(label => (
            <a
              key={label}
              href="#"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 300,
                letterSpacing: "0.1em",
                color: "rgba(232,226,215,0.25)",
                textDecoration: "none",
                transition: "color 200ms",
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.color = "rgba(232,226,215,0.6)")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.color = "rgba(232,226,215,0.25)")
              }
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}