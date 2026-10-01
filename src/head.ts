// Builds the <head> tags (title, SEO, Open Graph, Twitter, JSON-LD) from content.ts.
// Used at build time by scripts/prerender.mjs.
import { content, DEMO_MODE } from './content'

export type PageKey = 'home' | 'privacy' | 'notFound'

const PAGE_PATHS: Record<PageKey, string> = {
  home: '/',
  privacy: '/politika-privatnosti',
  notFound: '/404',
}

function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function pageTitle(page: PageKey): string {
  const { seo, site, privacyPolicy, notFound, demo } = content
  const base =
    page === 'home' ? seo.title : `${page === 'privacy' ? privacyPolicy.title : notFound.title} — ${site.name}`
  return DEMO_MODE ? `${base} | ${demo.titleSuffix}` : base
}

function jsonLd(): string {
  const { site, seo, contact, hours, pricing, social } = content
  const prices = pricing.plans.map((p) => Number(p.price)).filter((n) => !Number.isNaN(n))
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    '@id': `${site.url}/#teretana`,
    name: site.name,
    description: seo.description,
    url: `${site.url}/`,
    image: `${site.url}${seo.ogImage.src}`,
    telephone: contact.phone,
    email: contact.email,
    priceRange: prices.length ? `${Math.min(...prices)}–${Math.max(...prices)} ${pricing.currency}` : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      postalCode: contact.address.postalCode,
      addressLocality: contact.address.city,
      addressCountry: contact.address.country,
    },
    openingHoursSpecification: hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: social.map((s) => s.url).filter(Boolean),
  }
  // "<" is escaped so the JSON can never close the <script> tag early
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
}

export function buildHead(page: PageKey): string {
  const { site, seo, demo, hero } = content
  const title = pageTitle(page)
  const description = DEMO_MODE ? demo.seoDescription : seo.description
  const url = `${site.url}${PAGE_PATHS[page]}`
  const image = `${site.url}${seo.ogImage.src}`
  const noindex = seo.noindex || page === 'notFound'

  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}">`,
    noindex ? '<meta name="robots" content="noindex, nofollow">' : `<link rel="canonical" href="${esc(url)}">`,
  ]

  if (page !== 'notFound') {
    tags.push(
      '<meta property="og:type" content="website">',
      `<meta property="og:locale" content="${esc(site.locale)}">`,
      `<meta property="og:site_name" content="${esc(site.name)}">`,
      `<meta property="og:title" content="${esc(title)}">`,
      `<meta property="og:description" content="${esc(description)}">`,
      `<meta property="og:url" content="${esc(url)}">`,
      `<meta property="og:image" content="${esc(image)}">`,
      `<meta property="og:image:width" content="${seo.ogImage.width}">`,
      `<meta property="og:image:height" content="${seo.ogImage.height}">`,
      `<meta property="og:image:alt" content="${esc(seo.ogImage.alt)}">`,
      '<meta name="twitter:card" content="summary_large_image">',
      `<meta name="twitter:title" content="${esc(title)}">`,
      `<meta name="twitter:description" content="${esc(description)}">`,
      `<meta name="twitter:image" content="${esc(image)}">`,
      `<meta name="twitter:image:alt" content="${esc(seo.ogImage.alt)}">`,
    )
  }

  if (page === 'home') {
    const srcset = hero.image.srcSet.map((s) => `${s.src} ${s.width}w`).join(', ')
    tags.push(
      `<link rel="preload" as="image" href="${hero.image.src}" imagesrcset="${srcset}" imagesizes="100vw" fetchpriority="high">`,
      jsonLd(),
    )
  }

  // Without JavaScript the scroll animations never run, so show everything
  tags.push(
    '<noscript><style>.reveal,.gallery-strip-reveal .gallery-item{opacity:1!important;transform:none!important}.divider-anim{width:60px!important}</style></noscript>',
  )

  return tags.join('\n    ')
}
