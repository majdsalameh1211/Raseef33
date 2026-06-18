'use client'

import Image from 'next/image'
import { MenuItem } from '@/types/menu.types'

interface MenuCardProps {
  item: MenuItem
  onClick: (item: MenuItem) => void
}

export default function MenuCard({ item, onClick }: MenuCardProps) {
  return (
    <button
      className="menu-card"
      onClick={() => onClick(item)}
      aria-label={`View details for ${item.name_en}`}
    >
      {/* Fixed-size image container */}
      <div className="menu-card__img-wrap">
        <Image
          src={item.image}
          alt={item.name_en}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="menu-card__img"
          onError={(e) => {
            const t = e.currentTarget as HTMLImageElement
            t.style.display = 'none'
          }}
        />

        {/* Dark gradient — name/price sit on top of this */}
        <div className="menu-card__overlay" aria-hidden="true" />

        {/* Name + price overlaid bottom-left */}
        <div className="menu-card__info">
          <span className="menu-card__name">{item.name_en}</span>
          <span className="menu-card__price">
            {item.price_bottle
              ? `Glass ₪${item.price} · Bottle ₪${item.price_bottle}`
              : `₪${item.price}`}
          </span>
        </div>
      </div>

      <style jsx>{`
        .menu-card {
          display: block;
          width: 100%;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
          border-radius: 0;
          outline: none;
        }

        .menu-card:focus-visible .menu-card__img-wrap {
          outline: 1.5px solid var(--gold);
          outline-offset: 2px;
        }

        /* Fixed height — same on every card regardless of image */
        .menu-card__img-wrap {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: #1a1410;
          border-radius: 4px;
        }

        .menu-card__img {
          object-fit: cover;
          filter: saturate(0.82) sepia(0.15) brightness(0.88);
          transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-card:hover .menu-card__img {
          transform: scale(1.05);
        }

        /* Gradient — heavier at bottom so text is always legible */
        .menu-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(10, 7, 3, 0) 30%,
            rgba(10, 7, 3, 0.88) 100%
          );
        }

        /* Info — pinned to bottom-left inside the card */
        .menu-card__info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .menu-card__name {
          font-family: var(--font-cormorant), serif;
          font-size: 18px;
          font-weight: 300;
          font-style: italic;
          color: var(--ivory);
          line-height: 1.2;
        }

        .menu-card__price {
          font-family: var(--font-inter), sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: var(--gold);
        }
      `}</style>
    </button>
  )
}