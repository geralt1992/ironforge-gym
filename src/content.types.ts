// Types for src/content.ts. You normally never need to touch this file.

export interface Img {
  src: string
  width: number
  height: number
  alt: string
}

export interface ResponsiveImg extends Img {
  /** Smaller versions of the same image for srcset (largest one is `src`). */
  srcSet: { src: string; width: number }[]
}

/** Keys of sections that can be linked to. */
export type SectionKey = 'top' | 'about' | 'programs' | 'pricing' | 'gallery' | 'testimonials' | 'contact'

export interface Program {
  tag: string
  name: string
  description: string
  image: Img
}

export interface Plan {
  name: string
  price: string
  description: string
  features: string[]
  /** Shown crossed out ("not included"). */
  notIncluded: string[]
  featured: boolean
}

export interface Testimonial {
  text: string
  name: string
  role: string
  stars: number
  /** Optional photo; without it the initials are shown. */
  avatar?: Img
}

export interface OpeningHours {
  label: string
  /** schema.org day names for JSON-LD, e.g. ['Monday', 'Tuesday'] */
  days: string[]
  opens: string
  closes: string
}

export interface SocialLink {
  label: string
  short: string
  /** Leave empty to hide the icon. */
  url: string
}

export interface PrivacySection {
  heading: string
  paragraphs: string[]
}

export interface SiteContent {
  site: {
    name: string
    logoText: string
    /** Production URL without trailing slash (used for OG image, JSON-LD, canonical). */
    url: string
    lang: string
    locale: string
  }
  seo: {
    title: string
    description: string
    ogImage: Img
    /** true = search engines must not index the site (demo). Set to false for a real client. */
    noindex: boolean
  }
  demo: {
    barText: string
    barLinkText: string
    url: string
    titleSuffix: string
    seoDescription: string
    testimonialsLabel: string
    formTitle: string
    formMessage: string
    formLinkText: string
  }
  /** Section switches: false hides the section (and its menu links). */
  sections: {
    stats: boolean
    about: boolean
    programs: boolean
    pricing: boolean
    gallery: boolean
    testimonials: boolean
    cta: boolean
  }
  nav: {
    links: { label: string; section: SectionKey }[]
    cta: { label: string; section: SectionKey }
    menuLabel: string
    skipLink: string
    ariaLabel: string
  }
  hero: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    text: string
    primary: { label: string; section: SectionKey }
    secondary: { label: string; section: SectionKey }
    scrollLabel: string
    image: ResponsiveImg
  }
  stats: { value: string; suffix: string; label: string }[]
  about: {
    tag: string
    titleLine1: string
    titleLine2: string
    text: string
    mainImage: Img
    accentImage: Img
    badgeNumber: string
    badgeLine1: string
    badgeLine2: string
    features: { icon: string; title: string; text: string }[]
  }
  programs: {
    tag: string
    title: string
    introHover: string
    introTouch: string
    cardLink: string
    items: Program[]
  }
  pricing: {
    tag: string
    title: string
    text: string
    currency: string
    period: string
    featuredLabel: string
    /** Read by screen readers before crossed-out features. */
    notIncludedLabel: string
    featuredButton: string
    button: string
    plans: Plan[]
  }
  gallery: {
    tag: string
    title: string
    images: Img[]
  }
  testimonials: {
    tag: string
    title: string
    items: Testimonial[]
  }
  cta: {
    tag: string
    titleLine1: string
    titleLine2: string
    text: string
    button: { label: string; section: SectionKey }
    backgroundImage: string
  }
  contact: {
    tag: string
    titleLine1: string
    titleLine2: string
    text: string
    address: { street: string; postalCode: string; city: string; country: string }
    phone: string
    email: string
    labels: { address: string; phone: string; email: string }
    phoneNote: string
    emailNote: string
    form: {
      firstName: { label: string; placeholder: string }
      lastName: { label: string; placeholder: string }
      email: { label: string; placeholder: string }
      phone: { label: string; placeholder: string }
      interest: { label: string; options: string[] }
      message: { label: string; placeholder: string }
      submit: string
      sending: string
      successTitle: string
      success: string
      error: string
      privacyNote: string
      privacyLinkText: string
      emailSubject: string
    }
  }
  hours: OpeningHours[]
  social: SocialLink[]
  footer: {
    tagline: string
    programsTitle: string
    linksTitle: string
    hoursTitle: string
    copyright: string
    privacyLink: string
  }
  legal: {
    companyName: string
    oib: string
    address: string
    email: string
    hosting: string
    retention: string
    updated: string
  }
  privacyPolicy: {
    title: string
    intro: string
    backLink: string
    sections: PrivacySection[]
  }
  notFound: {
    title: string
    text: string
    button: string
  }
}
