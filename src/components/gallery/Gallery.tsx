'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85&fit=crop',
    alt: 'Signature dish',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=85&fit=crop',
    alt: 'Grilled skewer',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=85&fit=crop',
    alt: 'Kitchen fire',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=1200&q=85&fit=crop',
    alt: 'Negroni cocktail',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=85&fit=crop',
    alt: 'Wine selection',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1200&q=85&fit=crop',
    alt: 'Bar interior',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&fit=crop',
    alt: 'Restaurant atmosphere',
  },
]

const FAN: { x: number; y: number; rotate: number; z: number }[] = [
  { x: -480, y: 20, rotate: -10, z: 10 },
  { x: -240, y: 10, rotate:  -5, z: 20 },
  { x: -120, y:  5, rotate:  -2, z: 25 },
  { x:    0, y:  0, rotate:   0, z: 30 },
  { x:  120, y:  5, rotate:   2, z: 25 },
  { x:  240, y: 10, rotate:   5, z: 20 },
  { x:  480, y: 20, rotate:  10, z: 10 },
]

// ── Lightbox ──
function Lightbox({
  photo,
  onClose,
}: {
  photo: (typeof PHOTOS)[0]
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="lb-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="lb-frame"
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 95vw, 80vw"
            className="lb-img"
            priority
          />
          {/* Gold border */}
          <div className="lb-border" aria-hidden="true" />

          {/* Close button */}
          <button className="lb-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Single photo card ──
function GalleryPhoto({
  photo,
  pos,
  index,
  onClick,
}: {
  photo: (typeof PHOTOS)[0]
  pos: (typeof FAN)[0]
  index: number
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={`View ${photo.alt}`}
      initial={{ y: -40, opacity: 0, rotate: 0, scale: 0.85 }}
      animate={{ x: pos.x, y: pos.y, opacity: 1, rotate: pos.rotate, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 55,
        damping: 13,
        delay: index * 0.08,
        opacity: { duration: 0.35, delay: index * 0.08 },
      }}
      whileHover={{ scale: 1.07, zIndex: 500, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: pos.z,
        padding: 0,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
      }}
    >
      <div className="g-card">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="200px"
          className="g-card__img"
          draggable={false}
        />
        <div className="g-card__gradient" />
        <div className="g-card__border" />
      </div>

      <style jsx>{`
        .g-card {
          position: relative;
          width: 200px;
          height: 260px;
          overflow: hidden;
          border-radius: 0;
          box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4);
          transition: box-shadow 0.25s ease;
        }

        .g-card:hover {
          box-shadow: 0 20px 56px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.5);
        }

        .g-card :global(.g-card__img) {
          object-fit: cover;
          filter: saturate(0.82) sepia(0.15) brightness(0.88);
          pointer-events: none;
          transition: filter 0.35s ease;
        }

        .g-card:hover :global(.g-card__img) {
          filter: saturate(0.95) sepia(0.08) brightness(0.96);
        }

        .g-card__gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 45%, rgba(12,8,4,0.5) 100%);
          pointer-events: none;
        }

        .g-card__border {
          position: absolute;
          inset: 0;
          border: 0.5px solid rgba(196,168,74,0.28);
          pointer-events: none;
          transition: border-color 0.25s;
        }

        .g-card:hover .g-card__border {
          border-color: rgba(196,168,74,0.65);
        }
      `}</style>
    </motion.button>
  )
}

// ── Gallery section ──
export default function Gallery() {
  const [active, setActive] = useState<(typeof PHOTOS)[0] | null>(null)

  // Close on Escape
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setActive(null)
  }

  return (
    <section
      id="gallery"
      className="gallery-section"
      aria-label="Gallery"
      onKeyDown={handleKey}
      style={{
        '--section-bg-image': 'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=60")',
      } as React.CSSProperties}
    >
      <div className="section-bg" />
      <div className="section-overlay" />

      <div className="section-inner">
        <div className="gallery-heading">
          <span className="section-eyebrow">Gallery</span>
          <h2 className="section-title">Inside Raseef 33</h2>
          <div className="gallery-rule" />
          <p className="gallery-hint">Click a photo to expand</p>
        </div>

        <div className="gallery-stage">
          <div className="gallery-anchor">
            {PHOTOS.map((photo, i) => (
              <GalleryPhoto
                key={photo.id}
                photo={photo}
                pos={FAN[i]}
                index={i}
                onClick={() => setActive(photo)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {active && <Lightbox photo={active} onClose={() => setActive(null)} />}

      <style jsx>{`
        .gallery-section {
          position: relative;
          overflow: hidden;
          padding: var(--section-pad-v, 100px) 0 200px;
          background: var(--bg-section, #0c0804);
        }

        .gallery-heading {
          text-align: center;
          margin-bottom: 100px;
        }

        .gallery-rule {
          width: 36px;
          height: 0.5px;
          background: #C4A84A;
          opacity: 0.65;
          margin: 12px auto 0;
        }

        .gallery-hint {
          font-family: var(--font-inter, 'Inter', sans-serif);
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(237,232,223,0.28);
          margin-top: 18px;
        }

        .gallery-stage {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: visible;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-anchor {
          position: relative;
          width: 200px;
          height: 260px;
          flex-shrink: 0;
        }

        /* Lightbox styles */
        :global(.lb-backdrop) {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(6, 4, 2, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        :global(.lb-frame) {
          position: relative;
          width: min(80vw, 900px);
          height: min(80vh, 640px);
          overflow: hidden;
          border-radius: 0;
        }

        :global(.lb-img) {
          object-fit: cover;
          filter: saturate(0.88) sepia(0.1) brightness(0.95);
        }

        :global(.lb-border) {
          position: absolute;
          inset: 0;
          border: 0.5px solid rgba(196,168,74,0.35);
          pointer-events: none;
        }

        :global(.lb-close) {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 0.5px solid rgba(237,232,223,0.35);
          background: rgba(10,7,3,0.6);
          color: rgba(237,232,223,0.8);
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          line-height: 1;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          z-index: 10;
        }

        :global(.lb-close:hover) {
          border-color: rgba(196,168,74,0.6);
          color: #C4A84A;
          background: rgba(196,168,74,0.12);
        }

        @media (max-width: 900px) {
          .gallery-stage {
            transform: scale(0.75);
            transform-origin: center top;
            height: 240px;
          }
        }

        @media (max-width: 560px) {
          .gallery-stage {
            transform: scale(0.52);
            height: 170px;
          }

          :global(.lb-frame) {
            width: 95vw;
            height: 70vh;
          }
        }
      `}</style>
    </section>
  )
}