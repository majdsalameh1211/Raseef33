'use client'

import { useState, useCallback } from 'react'
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

// Background image for this section — swap to any food/interior photo
const MENU_BG = foodData.sections[0].items[0].image

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

  const sectionLabel = activeSection.label_en

  return (
    <section
      id="menus"
      className="menu-section"
      aria-label="Menu"
      style={{ '--section-bg-image': `url("${MENU_BG}")` } as React.CSSProperties}
    >
      {/* Shared bg system — defined in globals.css */}
      <div className="section-bg" />
      <div className="section-overlay" />

      <div className="section-inner">
        {/* Heading */}
        <div className="menu-heading">
          <span className="section-eyebrow">Our Menu</span>
          <h2 className="section-title">The Raseef 33 Menu</h2>
          <div className="section-rule" />
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
          overflow: hidden;
          padding: var(--section-pad-v) 0;
          background: var(--bg-section);
        }

        .menu-heading {
          text-align: center;
          margin-bottom: 40px;
        }

        /* section-eyebrow, section-title, section-rule come from globals.css */
        /* Override rule alignment — centered in menu, left-aligned in about */
        .menu-heading .section-rule {
          margin: 12px auto 0;
        }

        @media (max-width: 768px) {
          .menu-heading {
            margin-bottom: 28px;
          }
        }
      `}</style>
    </section>
  )
}