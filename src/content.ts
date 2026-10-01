/* ==========================================================================
   SADRŽAJ STRANICE — za novog klijenta mijenjaš ovu datoteku i src/theme.css.
   Sve tekstove, slike, cijene, radno vrijeme i kontakt uređuješ ovdje.
   ========================================================================== */
import type { SiteContent } from './content.types'

/** Demo način: demo traka na vrhu, oznaka „(demo)” uz recenzije, „Demo paketa Start” u naslovu,
 *  a kontakt forma ništa ne šalje. Za pravog klijenta postavi na false. */
export const DEMO_MODE = true

/** FormSubmit AJAX adresa, npr. 'https://formsubmit.co/ajax/info@klijent.hr'
 *  (ili nasumični alias koji FormSubmit pošalje nakon aktivacije). Koristi se samo kad je DEMO_MODE false. */
export const FORM_ENDPOINT = ''

const contactEmail = 'info@ironforge.example'

// Podaci za Politiku privatnosti. Oznake [PODACI KLIJENTA] zamijeni stvarnim podacima.
const legal: SiteContent['legal'] = {
  companyName: '[PODACI KLIJENTA: puni naziv tvrtke ili obrta]',
  oib: '[PODACI KLIJENTA: OIB]',
  address: '[PODACI KLIJENTA: adresa sjedišta]',
  email: '[PODACI KLIJENTA: e-mail za upite o privatnosti]',
  hosting: '[PODACI KLIJENTA: pružatelj hostinga, npr. Vercel Inc. ili Cloudflare, Inc.]',
  retention: '[PODACI KLIJENTA: rok čuvanja, npr. 12 mjeseci od zadnje komunikacije]',
  updated: '[PODACI KLIJENTA: datum zadnje izmjene]',
}

export const content: SiteContent = {
  site: {
    name: 'IronForge',
    logoText: 'IRONFORGE',
    url: 'https://ironforge-gym-chi.vercel.app',
    lang: 'hr',
    locale: 'hr_HR',
  },

  seo: {
    title: 'IronForge — vrhunska teretana u Osijeku',
    description:
      'Teretana IronForge u Osijeku: powerlifting, HIIT, joga, boks i bodybuilding uz certificirane trenere. Članarine od 29 €/mj, prvih 7 dana besplatno.',
    ogImage: {
      src: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'IronForge — iskuj svoju legendu',
    },
    noindex: true,
  },

  demo: {
    barText: 'Demo stranica · izmišljena teretana · izradio Apex Edge Technologies',
    barLinkText: 'Želite ovakvu stranicu? →',
    url: 'https://apexedgetech.hr',
    titleSuffix: 'Demo paketa Start',
    seoDescription:
      'Demo stranica izmišljene teretane IronForge: programi, članarine, galerija i kontakt forma. Predložak paketa Start — izradio Apex Edge Technologies.',
    testimonialsLabel: 'Primjeri recenzija (demo)',
    formTitle: 'Demo stranica',
    formMessage:
      'Ovo je demo stranica, poruka nije poslana. Za ovakvu stranicu za vaš posao javite se na apexedgetech.hr.',
    formLinkText: 'apexedgetech.hr',
  },

  sections: {
    stats: true,
    about: true,
    programs: true,
    pricing: true,
    gallery: true,
    testimonials: true,
    cta: true,
  },

  nav: {
    links: [
      { label: 'O nama', section: 'about' },
      { label: 'Programi', section: 'programs' },
      { label: 'Cijene', section: 'pricing' },
      { label: 'Galerija', section: 'gallery' },
      { label: 'Kontakt', section: 'contact' },
    ],
    cta: { label: 'Učlani se', section: 'pricing' },
    menuLabel: 'Izbornik',
    skipLink: 'Preskoči na sadržaj',
    ariaLabel: 'Glavna navigacija',
  },

  hero: {
    eyebrow: 'Vrhunsko fitness iskustvo',
    titleLine1: 'ISKUJ SVOJU',
    titleLine2: 'LEGENDU',
    text: 'Ovdje se grade šampioni. Vrhunski prostor, treneri svjetske klase i zajednica koja te gura preko vlastitih granica.',
    primary: { label: 'Isprobaj besplatno', section: 'pricing' },
    secondary: { label: 'Pogledaj programe', section: 'programs' },
    scrollLabel: 'Skrolaj',
    image: {
      src: '/images/hero-1920.webp',
      width: 1920,
      height: 1275,
      alt: '',
      srcSet: [
        { src: '/images/hero-768.webp', width: 768 },
        { src: '/images/hero-1280.webp', width: 1280 },
        { src: '/images/hero-1920.webp', width: 1920 },
      ],
    },
  },

  stats: [
    { value: '12', suffix: '+', label: 'Godina izvrsnosti' },
    { value: '3800', suffix: '+', label: 'Aktivnih članova' },
    { value: '48', suffix: '', label: 'Stručnih trenera' },
    { value: '98', suffix: ' %', label: 'Zadovoljnih članova' },
  ],

  about: {
    tag: 'O nama',
    titleLine1: 'VIŠE OD TERETANE.',
    titleLine2: 'NAČIN ŽIVOTA.',
    text: 'Osnovan 2014., IronForge počiva na jednom uvjerenju: svatko nosi neiskorišteni potencijal. Naša misija je pružiti prostor, opremu i stručno vodstvo da ga oslobodiš.',
    mainImage: {
      src: '/images/about-main.webp',
      width: 1000,
      height: 750,
      alt: 'Vježbač s bučicom u tamnoj teretani',
    },
    accentImage: {
      src: '/images/about-accent.webp',
      width: 800,
      height: 534,
      alt: 'Vježbačica radi trbušnjake na strunjači',
    },
    badgeNumber: '12',
    badgeLine1: 'Godina',
    badgeLine2: 'izvrsnosti',
    features: [
      {
        icon: '⚡',
        title: 'Vrhunska oprema',
        text: 'Više od 200 sprava i rekvizita na 2000 m² prostora za trening.',
      },
      {
        icon: '🏆',
        title: 'Certificirani treneri',
        text: 'Svaki trener ima međunarodne certifikate i više od 5 godina profesionalnog iskustva.',
      },
      {
        icon: '🔬',
        title: 'Programi utemeljeni na znanosti',
        text: 'Svi programi temelje se na provjerenim načelima za maksimalne i održive rezultate.',
      },
    ],
  },

  programs: {
    tag: 'Programi treninga',
    title: 'ODABERI DISCIPLINU',
    introHover: 'Programi za svaki cilj i svaku razinu. Prijeđi mišem preko kartice za više detalja.',
    introTouch: 'Programi za svaki cilj i svaku razinu.',
    cardLink: 'Pošalji upit →',
    items: [
      {
        tag: 'Snaga i moć',
        name: 'Powerlifting',
        description:
          'Svladaj tri velika dizanja. Izgradi čistu, funkcionalnu snagu uz stručno vodstvo i periodizirani plan.',
        image: {
          src: '/images/program-powerlifting.webp',
          width: 800,
          height: 1205,
          alt: 'Vježbač izvodi čučanj s utegom',
        },
      },
      {
        tag: 'Kondicija',
        name: 'HIIT i kardio',
        description:
          'Sagori kalorije i podigni izdržljivost intenzivnim intervalnim treninzima za maksimalno topljenje masnoće.',
        image: {
          src: '/images/program-hiit.webp',
          width: 800,
          height: 534,
          alt: 'Vježbač podiže uteg s poda na grupnom treningu',
        },
      },
      {
        tag: 'Um i tijelo',
        name: 'Joga i istezanje',
        description: 'Vrati pokretljivost, smanji stres i izgradi otporno tijelo spremno za vrhunske rezultate.',
        image: {
          src: '/images/program-yoga.webp',
          width: 800,
          height: 534,
          alt: 'Vježbačica meditira na prostirci za jogu',
        },
      },
      {
        tag: 'Borilački sport',
        name: 'Boks',
        description: 'Kondicija cijelog tijela i tehnička preciznost. Poboljšaj koordinaciju i samopouzdanje.',
        image: {
          src: '/images/program-boxing.webp',
          width: 800,
          height: 1200,
          alt: 'Boksač u rukavicama trenira udarce u boksačkoj dvorani',
        },
      },
      {
        tag: 'Hipertrofija',
        name: 'Bodybuilding',
        description: 'Oblikuj tijelo ciljanim izolacijskim i složenim vježbama za maksimalan rast mišića.',
        image: {
          src: '/images/program-bodybuilding.webp',
          width: 800,
          height: 1067,
          alt: 'Bodybuilder s utegom u rukama',
        },
      },
    ],
  },

  pricing: {
    tag: 'Članarine',
    title: 'ULOŽI U SEBE',
    text: 'Fleksibilni paketi prilagođeni tvojim ciljevima. Otkaži kad god želiš — bez obveze, samo rezultati.',
    currency: '€',
    period: '/mj',
    featuredLabel: 'Najtraženije', // traka u kutu kartice: kratko, do ~12 znakova
    notIncludedLabel: 'Nije uključeno:',
    featuredButton: 'Kreni odmah',
    button: 'Odaberi paket',
    plans: [
      {
        name: 'Starter',
        price: '29',
        description: 'Savršen za početnike koji grade novu naviku.',
        features: [
          'Pristup teretani',
          'Svlačionica i ormarić',
          '2 grupna treninga tjedno',
          'Početna procjena forme',
          'Pristup mobilnoj aplikaciji',
        ],
        notIncluded: ['Osobni trener', 'Savjetovanje o prehrani', 'Sauna i zona za oporavak'],
        featured: false,
      },
      {
        name: 'Elite',
        price: '59',
        description: 'Sve što trebaš za brz napredak.',
        features: [
          'Neograničen pristup teretani',
          'Svi grupni treninzi',
          'Osobni trener (4× mjesečno)',
          'Savjetovanje o prehrani',
          'Sauna i zona za oporavak',
          'Pristup mobilnoj aplikaciji',
        ],
        notIncluded: [],
        featured: true,
      },
      {
        name: 'Pro',
        price: '99',
        description: 'Za posvećene sportaše koji jure vrhunske rezultate.',
        features: [
          'Neograničen pristup teretani',
          'Svi grupni treninzi',
          'Osobni trener (12× mjesečno)',
          'Tjedno praćenje prehrane',
          'Sauna i zona za oporavak',
          'Prednost pri rezervacijama',
          'Gostujuće ulaznice (2× mjesečno)',
          'Analiza sastava tijela',
        ],
        notIncluded: [],
        featured: false,
      },
    ],
  },

  gallery: {
    tag: 'Prostor',
    title: 'NAŠ PROSTOR',
    images: [
      { src: '/images/gallery-1.webp', width: 800, height: 534, alt: 'Mrtvo dizanje s utegom na gumenom podu' },
      { src: '/images/gallery-2.webp', width: 800, height: 532, alt: 'Vježbač podiže šipku u tamnoj teretani' },
      { src: '/images/gallery-3.webp', width: 800, height: 1200, alt: 'Vježbač s bučicom uz stalak s bučicama' },
      { src: '/images/gallery-4.webp', width: 800, height: 521, alt: 'Vježbač pokazuje mišiće ruku' },
      { src: '/images/gallery-5.webp', width: 800, height: 559, alt: 'Vježbačica izvodi veslanje s bučicom' },
    ],
  },

  testimonials: {
    tag: 'Iskustva članova',
    title: 'ŠTO KAŽU NAŠI ČLANOVI',
    items: [
      {
        text: 'IronForge mi je promijenio život. Za 8 mjeseci skinuo sam 28 kg i otkrio za što je moje tijelo sposobno. Treneri su svjetska klasa.',
        name: 'Ivan K.',
        role: 'Član od 2023.',
        stars: 5,
      },
      {
        text: 'Najbolja atmosfera u kojoj sam ikad trenirala. Oprema je vrhunska, a zajednica te drži motiviranom na svakom treningu.',
        name: 'Ana M.',
        role: 'Članica, paket Elite',
        stars: 5,
      },
      {
        text: 'Trenirao sam u teretanama u šest zemalja. IronForge je jedina koja bi mi stvarno nedostajala. Programi i treneri su bez premca.',
        name: 'Luka T.',
        role: 'Član, paket Pro',
        stars: 5,
      },
    ],
  },

  cta: {
    tag: 'Ograničena ponuda',
    titleLine1: 'KRENI DANAS.',
    titleLine2: '7 DANA BESPLATNO.',
    text: 'Bez kartice. Bez obveze. Samo dođi — ostalo prepusti nama.',
    button: { label: 'Zatraži probni tjedan', section: 'contact' },
    backgroundImage: '/images/cta.webp',
  },

  contact: {
    tag: 'Kontakt',
    titleLine1: 'ZAPOČNI SVOJE',
    titleLine2: 'PUTOVANJE',
    text: 'Spreman za promjenu? Pošalji nam poruku i trener će ti se javiti u roku od 24 sata.',
    address: { street: 'Ulica primjera 1', postalCode: '31000', city: 'Osijek', country: 'HR' },
    phone: '+385 31 000 000',
    email: contactEmail,
    labels: { address: 'Adresa', phone: 'Telefon', email: 'E-mail' },
    phoneNote: 'Svaki dan u radno vrijeme',
    emailNote: 'Odgovor unutar 24 h',
    form: {
      firstName: { label: 'Ime', placeholder: 'Ivan' },
      lastName: { label: 'Prezime', placeholder: 'Horvat' },
      email: { label: 'E-mail adresa', placeholder: 'ivan@example.com' },
      phone: { label: 'Broj telefona', placeholder: '+385 9X XXX XXXX' },
      interest: {
        label: 'Zanima me',
        options: ['Besplatni probni tjedan', 'Paket Starter', 'Paket Elite', 'Paket Pro', 'Osobni trening'],
      },
      message: { label: 'Poruka', placeholder: 'Napiši nam svoje ciljeve…' },
      submit: 'Pošalji poruku →',
      sending: 'Šaljem…',
      successTitle: 'PORUKA JE POSLANA!',
      success: 'Hvala! Trener će ti se javiti u roku od 24 sata.',
      error: `Poruka nije poslana. Pokušaj ponovno ili nam piši na ${contactEmail}.`,
      privacyNote: 'Podatke iz obrasca koristimo samo za odgovor na tvoj upit. Više u dokumentu',
      privacyLinkText: 'Politika privatnosti',
      emailSubject: 'Novi upit s web stranice',
    },
  },

  hours: [
    {
      label: 'Ponedjeljak – petak',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:00',
      closes: '23:00',
    },
    { label: 'Subota', days: ['Saturday'], opens: '07:00', closes: '22:00' },
    { label: 'Nedjelja', days: ['Sunday'], opens: '08:00', closes: '20:00' },
  ],

  // Ikona se prikazuje samo ako je URL upisan.
  social: [
    { label: 'Instagram', short: 'IG', url: '' },
    { label: 'Facebook', short: 'FB', url: '' },
    { label: 'YouTube', short: 'YT', url: '' },
    { label: 'TikTok', short: 'TT', url: '' },
  ],

  footer: {
    tagline: 'Vrhunsko fitness odredište za one koji ne pristaju na prosjek. Treniraj jače. Živi bolje.',
    programsTitle: 'Programi',
    linksTitle: 'Istraži',
    hoursTitle: 'Radno vrijeme',
    copyright: 'IronForge. Sva prava pridržana.',
    privacyLink: 'Politika privatnosti',
  },

  legal,

  privacyPolicy: {
    title: 'Politika privatnosti',
    intro: `Ova politika objašnjava kako ${legal.companyName} (u daljnjem tekstu: „mi”) prikuplja i obrađuje osobne podatke posjetitelja web stranice IronForge, u skladu s Općom uredbom o zaštiti podataka (EU) 2016/679 (GDPR) i Zakonom o provedbi Opće uredbe o zaštiti podataka.`,
    backLink: '← Natrag na početnu',
    sections: [
      {
        heading: 'Voditelj obrade',
        paragraphs: [
          `${legal.companyName}, OIB: ${legal.oib}, ${legal.address}.`,
          `Za sva pitanja o privatnosti pišite na ${legal.email}.`,
        ],
      },
      {
        heading: 'Koje podatke prikupljamo',
        paragraphs: [
          'Kad pošaljete upit putem kontakt obrasca, obrađujemo podatke koje sami unesete: ime i prezime, e-mail adresu, broj telefona (ako ga navedete), program ili paket koji vas zanima te sadržaj poruke.',
          'Stranica ne koristi kolačiće za praćenje ni alate za analitiku. Fontovi i fotografije poslužuju se s istog poslužitelja kao i stranica. [PODACI KLIJENTA: ažurirati ako se doda analitika ili drugi kolačići]',
        ],
      },
      {
        heading: 'Svrha i pravna osnova obrade',
        paragraphs: [
          'Podatke koristimo isključivo kako bismo odgovorili na vaš upit i dogovorili eventualnu suradnju (čl. 6. st. 1. toč. b) GDPR-a — radnje prije sklapanja ugovora na zahtjev ispitanika) te radi zaštite obrasca od zlouporabe (čl. 6. st. 1. toč. f) GDPR-a — legitimni interes).',
        ],
      },
      {
        heading: 'Primatelji podataka',
        paragraphs: [
          'Poruke s kontakt obrasca dostavljaju se putem usluge FormSubmit (formsubmit.co). [PODACI KLIJENTA: provjeriti uvjete usluge i prijenos podataka izvan EU]',
          `Stranica se poslužuje putem usluge: ${legal.hosting}.`,
          'Vaše podatke ne prodajemo niti ih dijelimo s trećim stranama u marketinške svrhe.',
        ],
      },
      {
        heading: 'Rok čuvanja',
        paragraphs: [
          `Podatke iz upita čuvamo ${legal.retention}, nakon čega ih brišemo, osim ako zakon ne propisuje dulje čuvanje.`,
        ],
      },
      {
        heading: 'Vaša prava',
        paragraphs: [
          `Možete zatražiti pristup svojim podacima, njihov ispravak ili brisanje, ograničenje obrade i prenosivost podataka te uložiti prigovor na obradu. Zahtjev pošaljite na ${legal.email}.`,
          'Ako smatrate da su vaša prava povrijeđena, možete podnijeti pritužbu Agenciji za zaštitu osobnih podataka (AZOP, azop.hr).',
        ],
      },
      {
        heading: 'Izmjene politike',
        paragraphs: [`Ovu politiku možemo povremeno ažurirati. Datum zadnje izmjene: ${legal.updated}.`],
      },
    ],
  },

  notFound: {
    title: 'Stranica nije pronađena',
    text: 'Stranica koju tražiš ne postoji ili je premještena.',
    button: 'Natrag na početnu',
  },
}
