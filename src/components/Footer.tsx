import { content } from '../content'
import { navLinks, sectionHref } from '../lib/sections'
import { formatTime } from '../lib/utils'

const YEAR = new Date().getFullYear()

/** `base` is '' on the home page and '/' on other pages, so section links always work. */
export function Footer({ base = '' }: { base?: string }) {
  const { footer, site, hours, programs, sections } = content
  const socials = content.social.filter((s) => s.url.trim() !== '')

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href={base ? '/' : sectionHref('top')} className="nav-logo">
            {site.logoText}
          </a>
          <p>{footer.tagline}</p>
          {socials.length > 0 && (
            <div className="footer-socials">
              {socials.map((s) => (
                <a key={s.label} href={s.url} className="social-btn" aria-label={s.label} target="_blank" rel="noopener">
                  {s.short}
                </a>
              ))}
            </div>
          )}
        </div>

        {sections.programs && (
          <div className="footer-col">
            <h3>{footer.programsTitle}</h3>
            <ul>
              {programs.items.map((p) => (
                <li key={p.name}>
                  <a href={sectionHref('programs', base)}>{p.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="footer-col">
          <h3>{footer.linksTitle}</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.section}>
                <a href={sectionHref(link.section, base)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>{footer.hoursTitle}</h3>
          <ul className="footer-hours">
            {hours.map((h) => [
              <li key={`${h.label}-day`}>{h.label}</li>,
              <li key={`${h.label}-time`}>
                {formatTime(h.opens)} – {formatTime(h.closes)}
              </li>,
            ])}
          </ul>
        </div>
      </div>

      <div className="footer-bottom-wrap">
        <div className="footer-bottom">
          <p>
            © <span suppressHydrationWarning>{YEAR}</span> {footer.copyright}
          </p>
          <p>
            <a href="/politika-privatnosti">{footer.privacyLink}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
