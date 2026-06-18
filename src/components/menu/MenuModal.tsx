'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { MenuItem } from '@/types/menu.types'

interface MenuModalProps {
  item: MenuItem | null
  sectionLabel: string
  onClose: () => void
}

export default function MenuModal({ item, sectionLabel, onClose }: MenuModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [item])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Focus into modal on open
  useEffect(() => {
    if (item) modalRef.current?.focus()
  }, [item])

  if (!item) return null

  return (
    <div
      className={`modal-backdrop ${item ? 'modal-backdrop--open' : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name_en} details`}
    >
      <div
        ref={modalRef}
        className={`modal-card ${item ? 'modal-card--open' : ''}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Full-bleed background image */}
        <div className="modal-img-wrap">
          <Image
            src={item.image}
            alt={item.name_en}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className="modal-img"
            onError={(e) => {
              const t = e.currentTarget as HTMLImageElement
              t.style.display = 'none'
            }}
          />

          {/* Three-stop gradient: clear top → dark middle → very dark bottom */}
          <div className="modal-img-gradient" aria-hidden="true" />
        </div>

        {/* Close button — top right, always on top of image */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {/* Content panel anchored to bottom — sits ON the image */}
        <div className="modal-content">
          {/* Section label */}
          <p className="modal-eyebrow">{sectionLabel}</p>

          {/* Title */}
          <h3 className="modal-title">{item.name_en}</h3>

          {/* Gold rule */}
          <div className="modal-rule" aria-hidden="true" />

          {/* Description */}
          <p className="modal-desc">{item.description_en}</p>

          {/* Ingredients */}
          {item.ingredients.length > 0 && (
            <p className="modal-ingredients">
              {item.ingredients.join(' · ')}
            </p>
          )}

          {/* Price row */}
          <div className="modal-price-row">
            {item.price_bottle ? (
              <>
                <div className="modal-price-group">
                  <span className="modal-price-label">Glass</span>
                  <span className="modal-price">₪{item.price}</span>
                </div>
                <div className="modal-price-dot" aria-hidden="true" />
                <div className="modal-price-group">
                  <span className="modal-price-label">Bottle</span>
                  <span className="modal-price">₪{item.price_bottle}</span>
                </div>
              </>
            ) : (
              <span className="modal-price">₪{item.price}</span>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ── Backdrop ── */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(6, 4, 2, 0);
          transition: background 0.4s ease;
          pointer-events: none;
          padding: 24px 16px;
        }

        .modal-backdrop--open {
          background: rgba(6, 4, 2, 0.82);
          pointer-events: all;
        }

        /* ── Modal card ── */
        .modal-card {
          position: relative;
          width: 100%;
          max-width: 480px;
          height: 86svh;
          max-height: 700px;
          overflow: hidden;
          border-radius: 2px;
          border: 0.5px solid rgba(196, 168, 74, 0.2);
          outline: none;
          opacity: 0;
          transform: translateY(20px) scale(0.98);
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .modal-card--open {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* ── Full-bleed image ── */
        .modal-img-wrap {
          position: absolute;
          inset: 0;
          background: #1a1410;
        }

        .modal-img {
          object-fit: cover;
          filter: saturate(0.8) sepia(0.12) brightness(0.85);
        }

        /* Gradient: image visible at top, content readable at bottom */
        .modal-img-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(10, 7, 3, 0.15)  0%,
            rgba(10, 7, 3, 0.45)  42%,
            rgba(10, 7, 3, 0.88)  68%,
            rgba(10, 7, 3, 0.97) 100%
          );
        }

        /* ── Close ── */
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 0.5px solid rgba(237, 232, 223, 0.3);
          background: rgba(10, 7, 3, 0.5);
          color: rgba(237, 232, 223, 0.75);
          font-size: 18px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }

        .modal-close:hover {
          border-color: rgba(196, 168, 74, 0.6);
          color: var(--gold);
          background: rgba(196, 168, 74, 0.12);
        }

        /* ── Content — overlaid on image bottom ── */
        .modal-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 28px 28px 32px;
          z-index: 5;
        }

        .modal-eyebrow {
          font-family: var(--font-inter), sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 10px;
        }

        .modal-title {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(28px, 6vw, 38px);
          font-weight: 300;
          font-style: italic;
          color: var(--ivory);
          margin: 0;
          line-height: 1.1;
        }

        .modal-rule {
          width: 28px;
          height: 0.5px;
          background: var(--gold);
          margin: 14px 0;
        }

        .modal-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(237, 232, 223, 0.62);
          margin: 0 0 12px;
        }

        .modal-ingredients {
          font-family: var(--font-inter), sans-serif;
          font-size: 10px;
          font-weight: 400;
          color: rgba(237, 232, 223, 0.28);
          letter-spacing: 0.06em;
          line-height: 1.6;
          margin: 0 0 20px;
        }

        /* Price */
        .modal-price-row {
          display: flex;
          align-items: baseline;
          gap: 16px;
          border-top: 0.5px solid rgba(237, 232, 223, 0.1);
          padding-top: 16px;
        }

        .modal-price {
          font-family: var(--font-cormorant), serif;
          font-size: 28px;
          font-weight: 300;
          color: var(--ivory);
        }

        .modal-price-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .modal-price-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(237, 232, 223, 0.35);
        }

        .modal-price-dot {
          width: 1px;
          height: 28px;
          background: rgba(237, 232, 223, 0.12);
          align-self: flex-end;
          margin-bottom: 4px;
        }

        /* ── Mobile — full screen card ── */
        @media (max-width: 640px) {
          .modal-backdrop {
            padding: 0;
            align-items: flex-end;
          }

          .modal-card {
            max-width: 100%;
            height: 92svh;
            max-height: none;
            border-radius: 0;
            border-left: none;
            border-right: none;
            border-bottom: none;
            transform: translateY(100%);
            opacity: 1;
            transition: transform 0.42s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .modal-card--open {
            transform: translateY(0);
            opacity: 1;
          }

          .modal-content {
            padding: 24px 20px 40px;
          }
        }
      `}</style>
    </div>
  )
}