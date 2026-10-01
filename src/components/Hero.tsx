import { content, DEMO_MODE } from '../content'
import { SECTION_IDS, sectionHref } from '../lib/sections'
import { cx } from '../lib/utils'

export function Hero() {
  const { hero } = content
  const srcSet = hero.image.srcSet.map((s) => `${s.src} ${s.width}w`).join(', ')

  return (
    <section id={SECTION_IDS.top} className={cx('hero', DEMO_MODE && 'hero--demo')}>
      <img
        className="hero-bg"
        src={hero.image.src}
        srcSet={srcSet}
        sizes="100vw"
        width={hero.image.width}
        height={hero.image.height}
        alt={hero.image.alt}
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-eyebrow">{hero.eyebrow}</span>
        <h1 className="hero-title">
          {hero.titleLine1}
          <br />
          <span>{hero.titleLine2}</span>
        </h1>
        <p className="hero-sub">{hero.text}</p>
        <div className="hero-btns">
          <a href={sectionHref(hero.primary.section)} className="btn-primary">
            {hero.primary.label}
          </a>
          <a href={sectionHref(hero.secondary.section)} className="btn-outline">
            {hero.secondary.label}
          </a>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line" />
        <span>{hero.scrollLabel}</span>
      </div>
    </section>
  )
}
