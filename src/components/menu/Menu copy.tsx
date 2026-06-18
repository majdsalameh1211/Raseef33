'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { MenuTab, MenuSection, MenuItem, MenuData } from '@/types/menu.types'
import MenuToggle from './MenuToggle'
import MenuSubTabs from './MenuSubTabs'
import MenuGrid from './MenuGrid'
import MenuModal from './MenuModal'

import foodData from '@/data/menu-food.json'
import drinksData from '@/data/menu-drinks.json'

const DATA: Record<MenuTab, MenuData> = {
  food:   foodData   as MenuData,
  drinks: drinksData as MenuData,
}

// Use the first food item's image as the section background
// — always exists, warm food photo, perfect for blurring
const BG_IMAGE = foodData.sections[0].items[0].image

export default function Menu() {
  const [activeTab, setActiveTab]             = useState<MenuTab>('food')
  const [activeSectionId, setActiveSectionId] = useState<string>(DATA.food.sections[0].id)
  const [selectedItem, setSelectedItem]       = useState<MenuItem | null>(null)

  const handleTabChange = useCallback((tab: MenuTab) => {
    setActiveTab(tab)
    setActiveSectionId(DATA[tab].sections[0].id)
  }, [])

  const currentSections: MenuSection[] = DATA[activeTab].sections
  const activeSection: MenuSection =
    currentSections.find((s) => s.id === activeSectionId) ?? currentSections[0]

  const sectionLabel = `${activeSection.label_en}`

  return (
    <section id="menus" className="menu-section" aria-label="Menu">

      {/* Blurred photo background — same system as About section */}
      <div className="menu-bg" aria-hidden="true">
        <Image
          src={BG_IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="menu-bg__img"
          priority={false}
        />
      </div>
      {/* Dark warm overlay on top of blurred photo */}
      <div className="menu-bg-overlay" aria-hidden="true" />

      <div className="menu-inner">
        {/* Heading */}
        <div className="menu-heading">
          <p className="menu-eyebrow">Our Menu</p>
          <h2 className="menu-title">The Raseef 33 Menu</h2>
          <div className="menu-rule" aria-hidden="true" />
        </div>

        {/* Food | Drinks toggle */}
        <MenuToggle active={activeTab} onChange={handleTabChange} />

        {/* Sub-category tabs */}
        <MenuSubTabs
          sections={currentSections}
          active={activeSectionId}
          onChange={setActiveSectionId}
        />

        {/* Card grid */}
        <MenuGrid
          items={activeSection.items}
          onCardClick={setSelectedItem}
        />
      </div>

      {/* Detail modal */}
      <MenuModal
        item={selectedItem}
        sectionLabel={sectionLabel}
        onClose={() => setSelectedItem(null)}
      />

      <style jsx>{`
        .menu-section {
          position: relative;
          padding: 100px 0 120px;
          overflow: hidden;
          /* Base color — same as About/Hero, visible while bg image loads */
          background-color: #0F0D0A;
        }

        /* Blurred photo layer */
        .menu-bg {
          position: absolute;
          inset: -10%;
          z-index: 0;
          transform: scale(1.1);
          overflow: hidden;
        }

        .menu-bg :global(.menu-bg__img) {
          object-fit: cover;
          /* Identical filter to About section bg */
          filter: blur(40px) saturate(0.6) sepia(0.2) brightness(0.4);
        }

        /* Dark warm overlay — identical values to About section */
        .menu-bg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(12, 8, 4, 0.82);
          z-index: 1;
        }

        .menu-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Heading */
        .menu-heading {
          text-align: center;
          margin-bottom: 40px;
        }

        .menu-eyebrow {
          font-family: var(--font-inter), sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 12px;
        }

        .menu-title {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(34px, 3.5vw, 52px);
          font-weight: 300;
          font-style: italic;
          color: var(--ivory);
          margin: 0 0 4px;
          line-height: 1.1;
        }

        .menu-rule {
          width: 36px;
          height: 0.5px;
          background: var(--gold);
          margin: 12px auto 0;
        }

        @media (max-width: 768px) {
          .menu-section {
            padding: 72px 0 96px;
          }

          .menu-inner {
            padding: 0 16px;
          }

          .menu-heading {
            margin-bottom: 28px;
          }
        }
      `}</style>
    </section>
  )
}