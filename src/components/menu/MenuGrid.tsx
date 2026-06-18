'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { MenuItem } from '@/types/menu.types'
import MenuCard from './MenuCard'

interface MenuGridProps {
  items: MenuItem[]
  onCardClick: (item: MenuItem) => void
}

// One row visible initially — always shows just enough to fill one row
// Each "Show More" reveals exactly one more row
function getColCount(): number {
  if (typeof window === 'undefined') return 3
  const w = window.innerWidth
  if (w < 640)  return 1   // mobile single column
  if (w < 1024) return 2   // tablet 2 cols
  if (w < 1400) return 3   // desktop 3 cols
  return 4                  // wide 4 cols
}

function getInitialCount(): number {
  if (typeof window === 'undefined') return 3
  const w = window.innerWidth
  if (w < 640) return 5    // mobile — show 5 items upfront (scrollable)
  return getColCount()     // desktop — exactly 1 row
}

function getLoadMoreCount(): number {
  if (typeof window === 'undefined') return 3
  const w = window.innerWidth
  if (w < 640) return 5   // mobile loads 5 more
  return getColCount()    // desktop loads 1 full row
}

export default function MenuGrid({ items, onCardClick }: MenuGridProps) {
  const [visible, setVisible]       = useState(false)
  const [showCount, setShowCount]   = useState(6) // will be corrected on mount
  const gridRef = useRef<HTMLDivElement>(null)

  // Set correct initial count after mount (client only)
  useEffect(() => {
    setShowCount(getInitialCount())
  }, [])

  // Reset to initial count + re-animate on tab/section switch
  useEffect(() => {
    setVisible(false)
    setShowCount(getInitialCount())
    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [items])

  const visibleItems = items.slice(0, showCount)
  const hasMore      = showCount < items.length

  const loadMore = useCallback(() => {
    setShowCount((c) => Math.min(c + getLoadMoreCount(), items.length))
  }, [items.length])

  return (
    <div ref={gridRef}>
      <div className={`menu-grid ${visible ? 'menu-grid--visible' : ''}`} role="list">
        {visibleItems.map((item, i) => (
          <div
            key={item.id}
            className="menu-grid__item"
            role="listitem"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            <MenuCard item={item} onClick={onCardClick} />
          </div>
        ))}
      </div>

      {/* Load more button */}
      {hasMore && (
        <div className="menu-grid__more">
          <button className="menu-grid__more-btn" onClick={loadMore}>
            Show More
          </button>
        </div>
      )}

      <style jsx>{`
        .menu-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }

        .menu-grid__item {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .menu-grid--visible .menu-grid__item {
          opacity: 1;
          transform: translateY(0);
        }

        /* 2 columns from 640px */
        @media (min-width: 640px) {
          .menu-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        /* 3 columns from 1024px */
        @media (min-width: 1024px) {
          .menu-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }

        /* 4 columns from 1400px */
        @media (min-width: 1400px) {
          .menu-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Show More — same style as gallery button */
        .menu-grid__more {
          display: flex;
          justify-content: center;
          margin-top: 32px;
        }

        .menu-grid__more-btn {
          font-family: var(--font-inter, 'Inter', sans-serif);
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold, #C4A84A);
          background: transparent;
          border: 0.5px solid rgba(196, 168, 74, 0.45);
          padding: 14px 40px;
          cursor: pointer;
          border-radius: 0;
          transition: background 0.25s ease, border-color 0.25s ease;
        }

        .menu-grid__more-btn:hover {
          background: rgba(196, 168, 74, 0.1);
          border-color: rgba(196, 168, 74, 0.8);
        }
      `}</style>
    </div>
  )
}