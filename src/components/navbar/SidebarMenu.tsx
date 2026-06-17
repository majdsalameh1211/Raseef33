"use client";

type NavLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const NAV_LINKS: NavLink[] = [
  {
    label: "Home",
    href: "#home",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "About",
    href: "#about",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    label: "Menus",
    href: "#menu",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
      </svg>
    ),
  },
  {
    label: "Gallery",
    href: "#gallery",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    label: "Contact",
    href: "#contact",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SidebarMenu({ isOpen, onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 150,
          background: "rgba(8,8,6,0.4)",
          backdropFilter: isOpen ? "blur(2px)" : "none",
          WebkitBackdropFilter: isOpen ? "blur(2px)" : "none",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "opacity 400ms ease",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 160,
          width: "clamp(220px, 28vw, 280px)",
          background: "rgba(12,12,10,0.6)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderLeft: "0.5px solid rgba(139,115,85,0.2)",
          display: "flex",
          flexDirection: "column" as const,
          justifyContent: "space-between",
          paddingTop: "var(--nav-h)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 420ms cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        {/* Links */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column" as const,
            padding: "32px 0 0 28px",
            borderLeft: "0.5px solid rgba(139,115,85,0.15)",
            margin: "0 24px",
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "13px 0",
                textDecoration: "none",
                borderBottom:
                  i < NAV_LINKS.length - 1
                    ? "0.5px solid rgba(232,226,215,0.05)"
                    : "none",
                color: "rgba(232,226,215,0.35)",
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                transform: isOpen ? "translateX(0)" : "translateX(16px)",
                opacity: isOpen ? 1 : 0,
                transition: `
                  transform 500ms cubic-bezier(0.23,1,0.32,1) ${120 + i * 60}ms,
                  opacity 500ms ease ${120 + i * 60}ms,
                  color 200ms ease
                `,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "rgba(232,226,215,0.9)";
                const icon = e.currentTarget.querySelector(
                  "[data-icon]"
                ) as HTMLElement | null;
                if (icon) icon.style.color = "#B89040";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "rgba(232,226,215,0.35)";
                const icon = e.currentTarget.querySelector(
                  "[data-icon]"
                ) as HTMLElement | null;
                if (icon) icon.style.color = "rgba(139,115,85,0.6)";
              }}
            >
              <span
                data-icon=""
                style={{
                  color: "rgba(139,115,85,0.6)",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                  transition: "color 200ms ease",
                }}
              >
                {link.icon}
              </span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom CTAs */}
        <div
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column" as const,
            gap: 8,
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 500ms ease 400ms, transform 500ms ease 400ms",
          }}
        >
          
          <a
            href="#contact"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 44,
              background: "#B89040",
              color: "#090907",
              fontFamily: "'Inter', sans-serif",
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              transition: "background 200ms",
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

          
          <a
            href="#menu"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 44,
              background: "transparent",
              color: "rgba(232,226,215,0.5)",
              fontFamily: "'Inter', sans-serif",
              fontSize: 9,
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              border: "0.5px solid rgba(139,115,85,0.25)",
              transition: "border-color 200ms, color 200ms",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(139,115,85,0.6)";
              e.currentTarget.style.color = "rgba(232,226,215,0.8)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(139,115,85,0.25)";
              e.currentTarget.style.color = "rgba(232,226,215,0.5)";
            }}
          >
            View Menu
          </a>

          {/* Utility links */}
          <div
            style={{
              display: "flex",
              gap: 16,
              paddingTop: 8,
              justifyContent: "center",
            }}
          >
            {[
              {
                label: "Call",
                href: "tel:+97246638071",
                icon: (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14 19.79 19.79 0 0 1 1.61 5.38 2 2 0 0 1 3.6 3.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
                  </svg>
                ),
              },
              {
                label: "Directions",
                href: "https://maps.google.com/?q=HaAtzmaut+33+Haifa",
                icon: (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
              },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: "rgba(232,226,215,0.2)",
                  textDecoration: "none",
                  transition: "color 200ms",
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.color = "rgba(232,226,215,0.6)")
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.color = "rgba(232,226,215,0.2)")
                }
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}