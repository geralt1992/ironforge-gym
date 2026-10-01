import { content, DEMO_MODE } from '../content'
import type { Testimonial } from '../content.types'
import { SECTION_IDS } from '../lib/sections'
import { Divider, Reveal, RevealItem } from './Reveal'

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Avatar({ item }: { item: Testimonial }) {
  if (item.avatar) {
    return (
      <img
        className="testimonial-avatar"
        src={item.avatar.src}
        width={item.avatar.width}
        height={item.avatar.height}
        alt=""
        loading="lazy"
        decoding="async"
      />
    )
  }
  return (
    <span className="testimonial-avatar testimonial-initials" aria-hidden="true">
      {initials(item.name)}
    </span>
  )
}

export function Testimonials() {
  const { testimonials, demo } = content
  return (
    <section id={SECTION_IDS.testimonials} className="testimonials">
      <Reveal className="testimonials-header">
        <div className="section-tag">{testimonials.tag}</div>
        <h2 className="section-title">{testimonials.title}</h2>
        <Divider center />
        {DEMO_MODE && <p className="demo-label">{demo.testimonialsLabel}</p>}
      </Reveal>
      <div className="testimonials-grid">
        {testimonials.items.map((item, i) => (
          <RevealItem key={item.name} delay={`${i * 0.15}s`}>
            <figure className="testimonial-card">
              <div className="testimonial-quote" aria-hidden="true" />
              <blockquote className="testimonial-text">{item.text}</blockquote>
              <div className="testimonial-stars" role="img" aria-label={`${item.stars}/5`}>
                {'★'.repeat(item.stars)}
              </div>
              <figcaption className="testimonial-author">
                <Avatar item={item} />
                <span>
                  <span className="testimonial-name">{item.name}</span>
                  <span className="testimonial-role">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </div>
    </section>
  )
}
