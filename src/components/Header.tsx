import { useEffect, useRef, useState } from 'react'
import { content, DEMO_MODE } from '../content'
import { navLinks, sectionHref } from '../lib/sections'
import { cx } from '../lib/utils'
import { DemoBar } from './DemoBar'

const MENU_ID = 'mobilni-izbornik'
const DESKTOP_QUERY = '(min-width: 901px)'

export function Header() {
  const { nav, site } = content
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The demo bar slides away on scroll; its height can change when the text wraps
  useEffect(() => {
    const bar = barRef.current
    const header = headerRef.current
    if (!bar || !header) return
    const update = () => header.style.setProperty('--demo-bar-h', `${bar.offsetHeight}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(bar)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const background = document.querySelectorAll('main, .site-footer')
    root.classList.add('menu-open') // stops the page from scrolling
    background.forEach((el) => el.setAttribute('inert', ''))
    menuRef.current?.querySelector('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onResize = () => {
      if (desktop.matches) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)

    return () => {
      root.classList.remove('menu-open')
      background.forEach((el) => el.removeAttribute('inert'))
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  const close = () => setOpen(false)
  const solid = scrolled || open

  return (
    <>
      <header ref={headerRef} className={cx('site-header', solid && 'is-scrolled')}>
        {DEMO_MODE && <DemoBar ref={barRef} />}
        <nav className={cx('nav', solid && 'scrolled')} aria-label={nav.ariaLabel}>
          <a href={sectionHref('top')} className="nav-logo">
            {site.logoText}
          </a>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.section}>
                <a href={sectionHref(link.section)}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <a href={sectionHref(nav.cta.section)} className="nav-cta">
              {nav.cta.label}
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls={MENU_ID}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="nav-toggle-icon" aria-hidden="true" />
              {nav.menuLabel}
            </button>
          </div>
        </nav>
      </header>

      <div id={MENU_ID} ref={menuRef} className="mobile-menu" hidden={!open}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.section}>
              <a href={sectionHref(link.section)} className="mobile-link" onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={sectionHref(nav.cta.section)} className="btn-primary mobile-cta" onClick={close}>
          {nav.cta.label}
        </a>
      </div>
    </>
  )
}
