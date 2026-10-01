import { About } from './components/About'
import { CallToAction } from './components/CallToAction'
import { Contact } from './components/Contact'
import { ClickParticles, CursorGlow, ScrollProgress } from './components/Effects'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Pricing } from './components/Pricing'
import { Programs } from './components/Programs'
import { StatsBar } from './components/StatsBar'
import { Testimonials } from './components/Testimonials'
import { content } from './content'

export default function App() {
  const { sections, nav } = content
  return (
    <>
      <a href="#sadrzaj" className="skip-link">
        {nav.skipLink}
      </a>
      <ScrollProgress />
      <CursorGlow />
      <ClickParticles />
      <Header />
      <main id="sadrzaj">
        <Hero />
        {sections.stats && <StatsBar />}
        {sections.about && <About />}
        {sections.programs && <Programs />}
        {sections.pricing && <Pricing />}
        {sections.gallery && <Gallery />}
        {sections.testimonials && <Testimonials />}
        {sections.cta && <CallToAction />}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
