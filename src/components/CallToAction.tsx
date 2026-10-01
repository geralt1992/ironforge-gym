import { useEffect, useRef, useState } from 'react'
import { content } from '../content'
import { sectionHref } from '../lib/sections'
import { Divider, Reveal } from './Reveal'

export function CallToAction() {
  const { cta } = content
  const sectionRef = useRef<HTMLElement>(null)
  const [loadBackground, setLoadBackground] = useState(false)

  // The background is a CSS image (it keeps the fixed/parallax look), so it is
  // lazy-loaded by hand: only set when the section gets close to the viewport.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoadBackground(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="cta">
      <div
        className="cta-bg"
        style={loadBackground ? { backgroundImage: `url('${cta.backgroundImage}')` } : undefined}
      />
      <div className="cta-overlay" />
      <Reveal className="cta-content scale-in">
        <div className="section-tag">{cta.tag}</div>
        <h2 className="section-title">
          {cta.titleLine1}
          <br />
          <span className="text-accent">{cta.titleLine2}</span>
        </h2>
        <Divider center />
        <p className="section-sub">{cta.text}</p>
        <a href={sectionHref(cta.button.section)} className="btn-primary">
          {cta.button.label}
        </a>
      </Reveal>
    </section>
  )
}
