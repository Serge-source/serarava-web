import { describe, it, expect } from 'vitest'
import {
  categories,
  units,
  amenities,
  explore,
  gallery,
  seo,
  contact,
  property,
} from '../../content/seed'

describe('seed data integrity', () => {
  it('has exactly 3 categories', () => {
    expect(categories).toHaveLength(3)
  })

  it('category slugs are studios, suites, villa', () => {
    expect(categories.map(c => c.slug)).toEqual(['studios', 'suites', 'villa'])
  })

  it('has exactly 11 units', () => {
    expect(units).toHaveLength(11)
  })

  it('all units reference a valid category', () => {
    const slugs = new Set(categories.map(c => c.slug))
    for (const u of units) {
      expect(slugs.has(u.category)).toBe(true)
    }
  })

  it('studios has 7 units', () => {
    expect(units.filter(u => u.category === 'studios')).toHaveLength(7)
  })

  it('suites has 3 units', () => {
    expect(units.filter(u => u.category === 'suites')).toHaveLength(3)
  })

  it('villa has 1 unit', () => {
    expect(units.filter(u => u.category === 'villa')).toHaveLength(1)
  })

  it('all units have a name and maxGuests > 0', () => {
    for (const u of units) {
      expect(u.name.length).toBeGreaterThan(0)
      expect(u.maxGuests).toBeGreaterThan(0)
    }
  })

  it('amenities have icon, title and text', () => {
    for (const a of amenities) {
      expect(a.icon.length).toBeGreaterThan(0)
      expect(a.title.length).toBeGreaterThan(0)
      expect(a.text.length).toBeGreaterThan(0)
    }
  })

  it('explore entries have a category and title', () => {
    for (const e of explore) {
      expect(e.cat.length).toBeGreaterThan(0)
      expect(e.title.length).toBeGreaterThan(0)
    }
  })

  it('gallery items have an id and category', () => {
    for (const g of gallery) {
      expect(g.id.length).toBeGreaterThan(0)
      expect(g.cat.length).toBeGreaterThan(0)
    }
  })

  it('SEO entries cover all 11 public routes', () => {
    expect(seo.length).toBeGreaterThanOrEqual(11)
  })

  it('SEO titles are non-empty strings', () => {
    for (const s of seo) {
      expect(typeof s.title).toBe('string')
      expect(s.title.length).toBeGreaterThan(0)
    }
  })

  it('SEO descriptions are ≥ 50 and ≤ 300 characters', () => {
    for (const s of seo) {
      expect(s.description.length).toBeGreaterThanOrEqual(50)
      expect(s.description.length).toBeLessThanOrEqual(300)
    }
  })

  it('property has name and tagline', () => {
    expect(property.name).toBe('Serava Retreats')
    expect(property.tagline.length).toBeGreaterThan(0)
  })

  it('contact email looks like an email address', () => {
    expect(contact.email).toMatch(/@/)
  })
})
