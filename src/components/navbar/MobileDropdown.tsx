"use client";

const NAV_LINKS = [
  {
    id: "home",
    label: "Home",
    href: "#home",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: "about",
    label: "About",
    href: "#about",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    id: "menu",
    label: "Menus",
    href: "#menu",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20"/>
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
      </svg>
    ),
  },
  {
    id: "gallery",
    label: "Gallery",
    href: "#gallery",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
};

export default function MobileDropdown({ isOpen, onClose, activeSection }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        top: "var(--nav-h)",
        right: 16,
        zIndex: 250,
        display: "flex",
        flexDirection: "column" as const,
        gap: 8,
        pointerEvents: isOpen ? "all" : "none",
      }}
    >
      {NAV_LINKS.map((link, i) => {
        const isActive = activeSection === link.id;
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            aria-label={link.label}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: isActive
                ? "rgba(184,144,64,0.18)"
                : "rgba(12,12,10,0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: isActive
                ? "0.5px solid rgba(184,144,64,0.8)"
                : "0.5px solid rgba(184,144,64,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isActive ? "#B89040" : "rgba(232,226,215,0.5)",
              textDecoration: "none",
              transform: isOpen
                ? "translateY(0) scale(1)"
                : "translateY(-8px) scale(0.8)",
              opacity: isOpen ? 1 : 0,
              transition: `
                transform 350ms cubic-bezier(0.23,1,0.32,1) ${i * 50}ms,
                opacity 350ms ease ${i * 50}ms,
                border-color 200ms ease,
                color 200ms ease,
                background 200ms ease
              `,
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.borderColor = "rgba(184,144,64,0.7)";
                e.currentTarget.style.color = "#B89040";
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.borderColor = "rgba(184,144,64,0.3)";
                e.currentTarget.style.color = "rgba(232,226,215,0.5)";
              }
            }}
          >
            {link.icon}
          </a>
        );
      })}
    </div>
  );
}