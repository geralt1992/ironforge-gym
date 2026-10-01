import { content } from '../content'
import { SECTION_IDS, sectionHref } from '../lib/sections'
import { Divider, Reveal, RevealItem } from './Reveal'

export function Programs() {
  const { programs } = content
  return (
    <section id={SECTION_IDS.programs} className="programs">
      <Reveal className="programs-header">
        <div className="section-tag">{programs.tag}</div>
        <h2 className="section-title">{programs.title}</h2>
        <Divider center />
        <p className="section-sub">
          <span className="hint-hover">{programs.introHover}</span>
          <span className="hint-touch">{programs.introTouch}</span>
        </p>
      </Reveal>
      <div className="programs-grid">
        {programs.items.map((program, i) => (
          <RevealItem key={program.name} className="scale-in" delay={`${i * 0.08}s`}>
            <a href={sectionHref('contact')} className="program-card">
              <img
                className="program-img"
                src={program.image.src}
                width={program.image.width}
                height={program.image.height}
                alt={program.image.alt}
                loading="lazy"
                decoding="async"
              />
              <div className="program-overlay">
                <div className="program-tag">{program.tag}</div>
                <h3 className="program-title">{program.name}</h3>
                <p className="program-desc">{program.description}</p>
                <span className="program-arrow">{programs.cardLink}</span>
              </div>
            </a>
          </RevealItem>
        ))}
      </div>
    </section>
  )
}
