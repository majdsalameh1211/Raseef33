"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LangPicker from "./LangPicker";
import MenuButton from "./MenuButton";
import MobileDropdown from "./MobileDropdown";

const DESKTOP_LINKS = [
  { label: "Home",    href: "#home",    id: "home"    },
  { label: "About",   href: "#about",   id: "about"   },
  { label: "Menus",   href: "#menu",    id: "menu"    },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [isMobile,      setIsMobile]      = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    DESKTOP_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = menuOpen ? "hidden" : "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, isMobile]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  function toggleMenu() { setMenuOpen(v => !v); }
  function closeMenu()  { setMenuOpen(false);   }

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: "var(--nav-h)",
          zIndex: 300,
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          background: scrolled
            ? "rgba(12,12,10,0.82)"
            : "rgba(12,12,10,0.18)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: scrolled
            ? "0.5px solid rgba(139,115,85,0.2)"
            : "0.5px solid rgba(139,115,85,0.06)",
          transition: "background 400ms ease, border-color 400ms ease",
        }}
      >
        {/* Left — Lang picker */}
        <LangPicker />

        {isMobile ? (
          /* Mobile — centered logo */
          <Link
            href="#home"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              gap: 4,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15,
              fontWeight: 300,
              letterSpacing: "0.34em",
              textTransform: "uppercase" as const,
              color: "#EDE8DF",
              lineHeight: 1,
            }}>
              RASEEF 33
            </span>
            <div style={{
              width: 24,
              height: "0.5px",
              background: "#B89040",
              opacity: 0.55,
            }} />
          </Link>
        ) : (
          /* Desktop — centered nav links */
          <nav
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              gap: 40,
            }}
          >
            {DESKTOP_LINKS.map(link => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    fontWeight: 400,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase" as const,
                    color: isActive ? "#B89040" : "rgba(232,226,215,0.5)",
                    textDecoration: "none",
                    position: "relative" as const,
                    paddingBottom: 4,
                    transition: "color 200ms",
                    whiteSpace: "nowrap" as const,
                  }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.color = "#B89040")
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.color = isActive
                      ? "#B89040"
                      : "rgba(232,226,215,0.5)")
                  }
                >
                  {link.label}
                  <span style={{
                    position: "absolute" as const,
                    bottom: 0,
                    left: 0,
                    width: isActive ? "100%" : "0%",
                    height: "0.5px",
                    background: "#B89040",
                    transition: "width 300ms ease",
                  }} />
                </a>
              );
            })}
          </nav>
        )}

        {/* Right — burger mobile only */}
        <div style={{ marginLeft: "auto" }}>
          {isMobile && (
            <MenuButton isOpen={menuOpen} onToggle={toggleMenu} />
          )}
        </div>
      </header>

      {isMobile && (
        <MobileDropdown
          isOpen={menuOpen}
          onClose={closeMenu}
          activeSection={activeSection}
        />
      )}
    </>
  );
}