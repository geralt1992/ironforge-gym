import { content } from '../content'
import type { SectionKey, SiteContent } from '../content.types'

/** URL fragments (#…) of the sections. */
export const SECTION_IDS: Record<SectionKey, string> = {
  top: 'pocetak',
  about: 'o-nama',
  programs: 'programi',
  pricing: 'cijene',
  gallery: 'galerija',
  testimonials: 'recenzije',
  contact: 'kontakt',
}

const SWITCHES: Partial<Record<SectionKey, keyof SiteContent['sections']>> = {
  about: 'about',
  programs: 'programs',
  pricing: 'pricing',
  gallery: 'gallery',
  testimonials: 'testimonials',
}

export function isSectionEnabled(key: SectionKey): boolean {
  const flag = SWITCHES[key]
  return flag ? content.sections[flag] : true
}

/**
 * Link to a section. If the section is switched off in content.ts the link
 * points to the contact section instead, so no link ever leads nowhere.
 * `base` is '' on the home page and '/' on other pages.
 */
export function sectionHref(key: SectionKey, base = ''): string {
  return `${base}#${SECTION_IDS[isSectionEnabled(key) ? key : 'contact']}`
}

export const navLinks = content.nav.links.filter((link) => isSectionEnabled(link.section))
