import { DemoBar } from '../components/DemoBar'
import { Footer } from '../components/Footer'
import { WithPlaceholders } from '../components/Placeholders'
import { content, DEMO_MODE } from '../content'

export function PrivacyPage() {
  const { privacyPolicy, site, nav } = content
  return (
    <>
      <a href="#sadrzaj" className="skip-link">
        {nav.skipLink}
      </a>
      <header className="page-header">
        {DEMO_MODE && <DemoBar />}
        <nav className="nav scrolled" aria-label={nav.ariaLabel}>
          <a href="/" className="nav-logo">
            {site.logoText}
          </a>
          <a href="/" className="nav-back">
            {privacyPolicy.backLink}
          </a>
        </nav>
      </header>
      <main id="sadrzaj" className="legal-page">
        <h1 className="section-title">{privacyPolicy.title}</h1>
        <div className="divider" />
        <p className="legal-intro">
          <WithPlaceholders text={privacyPolicy.intro} />
        </p>
        {privacyPolicy.sections.map((section) => (
          <section key={section.heading} className="legal-section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <WithPlaceholders text={paragraph} />
              </p>
            ))}
          </section>
        ))}
      </main>
      <Footer base="/" />
    </>
  )
}
