"use client";

import { useRef, useState } from "react";

type Lang = "en" | "he" | "ar";

const LANGS: {
  code: Lang;
  native: string;
  flag: string;
  dir: "ltr" | "rtl";
}[] = [
  { code: "en", native: "English",  flag: "🇬🇧", dir: "ltr" },
  { code: "he", native: "עברית",    flag: "🇮🇱", dir: "rtl" },
  { code: "ar", native: "العربية",  flag: "🇸🇦", dir: "rtl" },
];

export default function LangPicker() {
  const [isOpen,     setIsOpen]     = useState(false);
  const [activeLang, setActiveLang] = useState<Lang>("en");
  const wrapRef = useRef<HTMLDivElement>(null);

  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (!wrapRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  }

  function select(lang: (typeof LANGS)[number]) {
    setActiveLang(lang.code);
    setIsOpen(false);
    document.documentElement.lang = lang.code;
    document.documentElement.dir  = lang.dir;
  }

  const current = LANGS.find(l => l.code === activeLang)!;

  return (
    <div
      ref={wrapRef}
      onBlur={handleBlur}
      style={{ position: "relative", zIndex: 10 }}
    >
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 2px",
        }}
      >
        {/* Globe */}
        <svg
          width="14" height="14" viewBox="0 0 14 14"
          fill="none" stroke="rgba(232,226,215,0.5)" strokeWidth="0.8"
        >
          <circle cx="7" cy="7" r="6" />
          <ellipse cx="7" cy="7" rx="2.5" ry="6" />
          <line x1="1" y1="5" x2="13" y2="5" />
          <line x1="1" y1="9" x2="13" y2="9" />
        </svg>

        {/* Current lang code */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            fontWeight: 400,
            letterSpacing: "0.14em",
            textTransform: "uppercase" as const,
            color: "#B89040",
          }}
        >
          {current.code.toUpperCase()}
        </span>

        {/* Chevron */}
        <svg
          width="8" height="8" viewBox="0 0 8 8"
          fill="none" stroke="rgba(232,226,215,0.3)" strokeWidth="0.8"
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 250ms ease",
          }}
        >
          <polyline points="1,2 4,6 7,2" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        role="listbox"
        aria-label="Language options"
        style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: 0,
          minWidth: 152,
          background: "rgba(12,12,10,0.92)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "0.5px solid rgba(139,115,85,0.25)",
          display: "flex",
          flexDirection: "column" as const,
          overflow: "hidden",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transform: isOpen ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 240ms ease, transform 240ms ease",
        }}
      >
        {LANGS.map((lang, i) => (
          <div key={lang.code}>
            {i > 0 && (
              <div
                style={{
                  height: "0.5px",
                  background: "rgba(139,115,85,0.15)",
                  margin: "0 12px",
                }}
              />
            )}
            <button
              role="option"
              aria-selected={activeLang === lang.code}
              onClick={() => select(lang)}
              tabIndex={isOpen ? 0 : -1}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 16px",
                textAlign: "left" as const,
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 300,
                letterSpacing: "0.08em",
                color: activeLang === lang.code
                  ? "#B89040"
                  : "rgba(232,226,215,0.45)",
                transition: "background 160ms, color 160ms",
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.background = "rgba(139,115,85,0.1)")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.background = "none")
              }
            >
              <span style={{ fontSize: 14 }}>{lang.flag}</span>
              <span>{lang.native}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}