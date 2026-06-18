'use client'

import { useEffect, useRef, useState } from 'react'
import { MenuItem } from '@/types/menu.types'
import MenuCard from './MenuCard'

interface MenuGridProps {
  items: MenuItem[]
  onCardClick: (item: MenuItem) => void
}

export default function MenuGrid({ items, onCardClick }: MenuGridProps) {
  const [visible, setVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  // Re-trigger fade animation on every tab/section switch
  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [items])

  return (
    <div
      ref={gridRef}
      className={`menu-grid ${visible ? 'menu-grid--visible' : ''}`}
      role="list"
    >
      {items.map((item, i) => (
        <div
          key={item.id}
          className="menu-grid__item"
          role="listitem"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <MenuCard item={item} onClick={onCardClick} />
        </div>
      ))}

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
      `}</style>
    </div>
  )
}