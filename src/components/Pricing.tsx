import { content } from '../content'
import { SECTION_IDS, sectionHref } from '../lib/sections'
import { cx } from '../lib/utils'
import { Divider, Reveal, RevealItem } from './Reveal'

export function Pricing() {
  const { pricing } = content
  return (
    <section id={SECTION_IDS.pricing} className="pricing">
      <Reveal className="pricing-header">
        <div className="section-tag">{pricing.tag}</div>
        <h2 className="section-title">{pricing.title}</h2>
        <Divider center />
        <p className="section-sub">{pricing.text}</p>
      </Reveal>
      <div className="pricing-grid">
        {pricing.plans.map((plan, i) => (
          <RevealItem key={plan.name} className={plan.featured ? 'scale-in' : 'from-left'} delay={`${i * 0.15}s`}>
            <div className={cx('pricing-card', plan.featured && 'featured')}>
              {plan.featured && (
                <span className="pricing-badge" aria-hidden="true">
                  {pricing.featuredLabel}
                </span>
              )}
              <h3 className="pricing-name">{plan.name}</h3>
              <p className="pricing-price">
                <span className="pricing-amount">{plan.price}</span>
                <span className="pricing-currency">{pricing.currency}</span>
                <span className="pricing-period">{pricing.period}</span>
                {plan.featured && <span className="sr-only"> ({pricing.featuredLabel})</span>}
              </p>
              <p className="pricing-desc">{plan.description}</p>
              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="disabled">
                    <span className="sr-only">{pricing.notIncludedLabel} </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={sectionHref('contact')}
                className={cx(plan.featured ? 'btn-primary' : 'btn-outline', 'pricing-btn')}
              >
                {plan.featured ? pricing.featuredButton : pricing.button}
              </a>
            </div>
          </RevealItem>
        ))}
      </div>
    </section>
  )
}
