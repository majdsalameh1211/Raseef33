// src/types/menu.types.ts

export interface MenuItem {
  id: string
  name_he: string
  name_en: string
  description_en: string
  ingredients: string[]
  price: number
  price_bottle?: number   // wine only — glass vs bottle price
  image: string
}

export interface MenuSection {
  id: string
  label_he: string
  label_en: string
  items: MenuItem[]
}

export interface MenuData {
  category: 'food' | 'drinks'
  sections: MenuSection[]
}

export type MenuTab = 'food' | 'drinks'