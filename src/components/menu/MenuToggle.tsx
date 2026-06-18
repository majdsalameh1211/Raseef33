'use client'

import { MenuTab } from '@/types/menu.types'

interface MenuToggleProps {
  active: MenuTab
  onChange: (tab: MenuTab) => void
}

const TABS: { id: MenuTab; label: string }[] = [
  { id: 'food',   label: 'Food'   },
  { id: 'drinks', label: 'Drinks' },
]

export default function MenuToggle({ active, onChange }: MenuToggleProps) {
  return (
    <div className="menu-toggle" role="tablist" aria-label="Menu category">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={`menu-toggle__btn ${active === tab.id ? 'menu-toggle__btn--active' : ''}`}
        >
          {tab.label}
        </button>
      ))}

      <style jsx>{`
        .menu-toggle {
          display: flex;
          justify-content: center;
          gap: 0;
          border-bottom: 0.5px solid rgba(196, 168, 74, 0.2);
          margin-bottom: 0;
        }

        .menu-toggle__btn {
          position: relative;
          padding: 12px 36px;
          font-family: var(--font-inter), sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(237, 232, 223, 0.35);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.25s ease;
          /* flat rectangle — no border-radius per design system */
          border-radius: 0;
        }

        .menu-toggle__btn::after {
          content: '';
          position: absolute;
          bottom: -0.5px;
          left: 0;
          right: 0;
          height: 1.5px;
          background: var(--gold);
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }

        .menu-toggle__btn--active {
          color: var(--gold);
        }

        .menu-toggle__btn--active::after {
          transform: scaleX(1);
        }

        .menu-toggle__btn:hover:not(.menu-toggle__btn--active) {
          color: rgba(237, 232, 223, 0.65);
        }

        @media (max-width: 480px) {
          .menu-toggle__btn {
            padding: 10px 28px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  )
}