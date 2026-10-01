import { content } from '../content'
import { SECTION_IDS } from '../lib/sections'
import { Divider, Reveal, RevealItem } from './Reveal'

export function About() {
  const { about } = content
  return (
    <section id={SECTION_IDS.about} className="about">
      <div className="about-grid">
        <Reveal className="about-images from-left">
          <img
            className="about-img-main"
            src={about.mainImage.src}
            width={about.mainImage.width}
            height={about.mainImage.height}
            alt={about.mainImage.alt}
            loading="lazy"
            decoding="async"
          />
          <img
            className="about-img-accent"
            src={about.accentImage.src}
            width={about.accentImage.width}
            height={about.accentImage.height}
            alt={about.accentImage.alt}
            loading="lazy"
            decoding="async"
          />
          <div className="about-badge">
            <div className="about-badge-num">{about.badgeNumber}</div>
            <div className="about-badge-text">
              {about.badgeLine1}
              <br />
              {about.badgeLine2}
            </div>
          </div>
        </Reveal>
        <Reveal className="from-right">
          <div className="section-tag">{about.tag}</div>
          <h2 className="section-title">
            {about.titleLine1}
            <br />
            {about.titleLine2}
          </h2>
          <Divider />
          <p className="section-sub">{about.text}</p>
          <div className="about-features">
            {about.features.map((feature, i) => (
              <RevealItem key={feature.title} delay={`${(i + 1) * 0.12}s`}>
                <div className="about-feature">
                  <div className="about-feature-icon" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
