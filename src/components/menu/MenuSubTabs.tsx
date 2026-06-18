'use client'

import { useRef, useState, useEffect } from 'react'
import { MenuSection } from '@/types/menu.types'

interface MenuSubTabsProps {
  sections: MenuSection[]
  active: string
  onChange: (id: string) => void
}

export default function MenuSubTabs({ sections, active, onChange }: MenuSubTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showFade, setShowFade] = useState(false)

  // Show right fade if content overflows
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const check = () => setShowFade(el.scrollWidth > el.clientWidth + 4)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [sections])

  // Scroll active tab into view within the container only
  // — uses scrollLeft instead of scrollIntoView which shifts the whole page
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const activeBtn = container.querySelector<HTMLButtonElement>('[data-active="true"]')
    if (!activeBtn) return
    const containerWidth = container.clientWidth
    const btnLeft = activeBtn.offsetLeft
    const btnWidth = activeBtn.offsetWidth
    const targetScroll = btnLeft - containerWidth / 2 + btnWidth / 2
    container.scrollTo({ left: targetScroll, behavior: 'smooth' })
  }, [active])

  return (
    <div className="subtabs-wrap" role="tablist" aria-label="Menu sub-category">
      <div className="subtabs-scroll" ref={scrollRef}>
        {sections.map((section) => (
          <button
            key={section.id}
            role="tab"
            data-active={active === section.id}
            aria-selected={active === section.id}
            onClick={() => onChange(section.id)}
            className={`subtabs-btn ${active === section.id ? 'subtabs-btn--active' : ''}`}
          >
            {section.label_en}
          </button>
        ))}
      </div>

      {showFade && <div className="subtabs-fade" aria-hidden="true" />}

      <style jsx>{`
        .subtabs-wrap {
          position: relative;
          border-bottom: 0.5px solid rgba(196, 168, 74, 0.15);
          margin-top: 24px;
          /* Prevent the scroll container from bleeding into page layout */
          overflow: hidden;
        }

        .subtabs-scroll {
          display: flex;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          justify-content: center;
        }

        .subtabs-scroll::-webkit-scrollbar {
          display: none;
        }

        .subtabs-btn {
          display: flex;
          align-items: center;
          padding: 10px 18px;
          white-space: nowrap;
          flex-shrink: 0;
          position: relative;
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 0;
          font-family: var(--font-inter), sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(237, 232, 223, 0.38);
          transition: color 0.25s ease;
        }

        .subtabs-btn::after {
          content: '';
          position: absolute;
          bottom: -0.5px;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--gold);
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .subtabs-btn--active::after {
          transform: scaleX(1);
        }

        .subtabs-btn--active {
          color: var(--gold);
        }

        .subtabs-btn:hover:not(.subtabs-btn--active) {
          color: rgba(237, 232, 223, 0.65);
        }

        /* Right fade — signals overflow on mobile */
        .subtabs-fade {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 48px;
          background: linear-gradient(to right, transparent, var(--bg));
          pointer-events: none;
        }

        @media (max-width: 480px) {
          .subtabs-btn {
            padding: 9px 14px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  )
}