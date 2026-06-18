'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const PHOTOS = [
  { id: 1,  src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85&fit=crop', alt: 'Signature dish' },
  { id: 2,  src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=85&fit=crop', alt: 'Grilled skewer' },
  { id: 3,  src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=85&fit=crop', alt: 'Kitchen fire' },
  { id: 4,  src: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=1200&q=85&fit=crop', alt: 'Negroni cocktail' },
  { id: 5,  src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=85&fit=crop', alt: 'Wine selection' },
  { id: 6,  src: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1200&q=85&fit=crop', alt: 'Bar interior' },
  { id: 7,  src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&fit=crop', alt: 'Restaurant atmosphere' },
  { id: 8,  src: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200&q=85&fit=crop', alt: 'Lamb skewer' },
  { id: 9,  src: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=1200&q=85&fit=crop', alt: 'Dark cocktail' },
  { id: 10, src: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=1200&q=85&fit=crop', alt: 'Sparkling wine' },
]

function buildFanPositions(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const mid = (count - 1) / 2
    const offset = i - mid
    const spread = 160
    return {
      x: offset * spread,
      y: Math.abs(offset) * 6,
      rotate: offset * 5,
      z: count - Math.abs(Math.round(offset)),
    }
  })
}

// ── Lightbox ──
function Lightbox({ photo, onClose }: { photo: typeof PHOTOS[0]; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

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
          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 95vw, 80vw" className="lb-img" priority />
          <div className="lb-border" aria-hidden="true" />
          <button className="lb-close" onClick={onClose} aria-label="Close">×</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Single photo card ──
function GalleryPhoto({
  photo, pos, globalIndex, onClick,
}: {
  photo: typeof PHOTOS[0]
  pos: { x: number; y: number; rotate: number; z: number }
  globalIndex: number
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={`View ${photo.alt}`}
      initial={{ y: -30, opacity: 0, scale: 0.88 }}
      animate={{ x: pos.x, y: pos.y, opacity: 1, scale: 1, rotate: pos.rotate }}
      transition={{
        type: 'spring', stiffness: 55, damping: 13,
        delay: globalIndex * 0.07,
        opacity: { duration: 0.3, delay: globalIndex * 0.07 },
      }}
      whileHover={{ scale: 1.08, zIndex: 500, transition: { duration: 0.18 } }}
      whileTap={{ scale: 0.97 }}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: pos.z, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
    >
      <div className="g-card">
        <Image src={photo.src} alt={photo.alt} fill sizes="180px" className="g-card__img" draggable={false} />
        <div className="g-card__gradient" />
        <div className="g-card__border" />
      </div>
      <style jsx>{`
        .g-card {
          position: relative; width: 180px; height: 240px;
          overflow: hidden; border-radius: 0;
          box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4);
          transition: box-shadow 0.25s ease;
        }
        .g-card:hover { box-shadow: 0 20px 56px rgba(0,0,0,0.72), 0 4px 12px rgba(0,0,0,0.5); }
        .g-card :global(.g-card__img) {
          object-fit: cover;
          filter: saturate(0.82) sepia(0.15) brightness(0.88);
          pointer-events: none; transition: filter 0.35s ease;
        }
        .g-card:hover :global(.g-card__img) { filter: saturate(0.95) sepia(0.08) brightness(0.96); }
        .g-card__gradient {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 45%, rgba(12,8,4,0.5) 100%);
          pointer-events: none;
        }
        .g-card__border {
          position: absolute; inset: 0;
          border: 0.5px solid rgba(196,168,74,0.28);
          pointer-events: none; transition: border-color 0.25s;
        }
        .g-card:hover .g-card__border { border-color: rgba(196,168,74,0.65); }
      `}</style>
    </motion.button>
  )
}

// ── Fan row ──
function FanRow({ photos, rowIndex, onPhotoClick }: {
  photos: typeof PHOTOS
  rowIndex: number
  onPhotoClick: (p: typeof PHOTOS[0]) => void
}) {
  const positions = buildFanPositions(photos.length)
  return (
    <motion.div
      className="fan-row"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="fan-anchor">
        {photos.map((photo, i) => (
          <GalleryPhoto
            key={photo.id}
            photo={photo}
            pos={positions[i]}
            globalIndex={i} // reset per row so each new row animates fresh
            onClick={() => onPhotoClick(photo)}
          />
        ))}
      </div>
      <style jsx>{`
        
        .fan-row {
          position: relative; width: 100%; height: 300px; max-width: 100%;
          display: flex; align-items: center; justify-content: center; margin: 0 auto;
          overflow: visible;
        }
        .fan-anchor { position: relative; width: 180px; height: 240px; flex-shrink: 0; }
      `}</style>
    </motion.div>
  )
}

// ── Gallery section ──
export default function Gallery() {
  const [active, setActive]       = useState<typeof PHOTOS[0] | null>(null)
  const [perRow, setPerRow]       = useState(5)
  const [visibleRows, setVisibleRows] = useState(1) // updated after mount based on screen

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768
      setPerRow(mobile ? 3 : 5)
      // Mobile starts with 2 rows (shows 5 photos: 3+2)
      // Desktop starts with 1 row (shows 5 photos)
      setVisibleRows(mobile ? 2 : 1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Split ALL photos into rows
  const allRows: typeof PHOTOS[] = []
  for (let i = 0; i < PHOTOS.length; i += perRow) {
    allRows.push(PHOTOS.slice(i, i + perRow))
  }

  const shownRows   = allRows.slice(0, visibleRows)
  const hasMore     = visibleRows < allRows.length

  return (
    <section
      id="gallery"
      className="gallery-section"
      aria-label="Gallery"
      style={{ '--section-bg-image': 'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=60")' } as React.CSSProperties}
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

        {/* Rows — only visible rows rendered */}
        <div className="gallery-rows">
          <AnimatePresence>
            {shownRows.map((rowPhotos, rowIndex) => (
              <FanRow
                key={rowIndex}
                photos={rowPhotos}
                rowIndex={rowIndex}
                onPhotoClick={setActive}
              />
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Button — separate sub-section, outside the fan overflow area */}
      <div className="gallery-actions">
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              className="gallery-more-btn"
              onClick={() => setVisibleRows((v) => v + 1)}
            >
              Show More
            </button>
          </motion.div>
        )}
        {!hasMore && allRows.length > 1 && (
          <motion.p
            className="gallery-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            — End of Gallery —
          </motion.p>
        )}
      </div>

      {active && <Lightbox photo={active} onClose={() => setActive(null)} />}

      <style jsx>{`
        .gallery-section {
          position: relative; overflow: hidden;
          padding: var(--section-pad-v, 100px) 0 160px;
          background: var(--bg-section, #0c0804);
        }
        .gallery-heading { text-align: center; margin-bottom: 80px; }
        .gallery-rule {
          width: 36px; height: 0.5px;
          background: #C4A84A; opacity: 0.65; margin: 12px auto 0;
        }
        .gallery-hint {
          font-family: var(--font-inter, 'Inter', sans-serif);
          font-size: 9px; font-weight: 400;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: rgba(237,232,223,0.28); margin-top: 18px;
        }
        .gallery-rows { display: flex; flex-direction: column; gap: 48px; align-items: center; width: 100%; }

        /* Show More button */
        .gallery-actions { display: flex; justify-content: center; align-items: center; padding: 60px 0 0; position: relative; z-index: 3; }
        .gallery-more-btn {
          font-family: var(--font-inter, 'Inter', sans-serif);
          font-size: 10px; font-weight: 400;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--gold, #C4A84A);
          background: transparent;
          border: 0.5px solid rgba(196,168,74,0.45);
          padding: 14px 40px;
          cursor: pointer;
          border-radius: 0;
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .gallery-more-btn:hover {
          background: rgba(196,168,74,0.1);
          border-color: rgba(196,168,74,0.8);
        }

        /* End label */
        .gallery-end { text-align: center;
          text-align: center; margin-top: 56px;
          font-family: var(--font-inter, 'Inter', sans-serif);
          font-size: 9px; font-weight: 400;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(237,232,223,0.18);
        }

        /* Lightbox */
        :global(.lb-backdrop) {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(6,4,2,0.92);
          display: flex; align-items: center; justify-content: center; margin: 0 auto;
          padding: 24px;
        }
        :global(.lb-frame) {
          position: relative; width: min(80vw, 900px);
          height: min(80vh, 640px); overflow: hidden; border-radius: 0;
        }
        :global(.lb-img) { object-fit: cover; filter: saturate(0.88) sepia(0.1) brightness(0.95); }
        :global(.lb-border) { position: absolute; inset: 0; border: 0.5px solid rgba(196,168,74,0.35); pointer-events: none; }
        :global(.lb-close) {
          position: absolute; top: 14px; right: 14px;
          width: 32px; height: 32px; border-radius: 50%;
          border: 0.5px solid rgba(237,232,223,0.35);
          background: rgba(10,7,3,0.6); color: rgba(237,232,223,0.8);
          font-size: 18px; display: flex; align-items: center;
          justify-content: center; cursor: pointer; line-height: 1; z-index: 10;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        :global(.lb-close:hover) {
          border-color: rgba(196,168,74,0.6);
          color: #C4A84A; background: rgba(196,168,74,0.12);
        }

        @media (max-width: 768px) {
          .gallery-rows { gap: 32px; }
          :global(.lb-frame) { width: 95vw; height: 70vh; }
        }
      `}</style>
    </section>
  )
}