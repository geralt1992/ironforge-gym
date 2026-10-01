import { content } from '../content'
import { useReveal } from '../lib/reveal'
import { SECTION_IDS } from '../lib/sections'
import { cx } from '../lib/utils'
import { Divider, Reveal } from './Reveal'

export function Gallery() {
  const { gallery } = content
  const [stripRef, stripVisible] = useReveal<HTMLDivElement>()

  return (
    <section id={SECTION_IDS.gallery} className="gallery">
      <Reveal className="gallery-header">
        <div className="section-tag">{gallery.tag}</div>
        <h2 className="section-title">{gallery.title}</h2>
        <Divider center />
      </Reveal>
      <div ref={stripRef} className={cx('gallery-strip gallery-strip-reveal', stripVisible && 'visible')}>
        {gallery.images.map((image, i) => (
          <div className="gallery-item" key={image.src} style={{ transitionDelay: `${i * 0.08}s` }}>
            <img
              className="gallery-img"
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
