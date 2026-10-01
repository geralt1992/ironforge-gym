import { content } from '../content'
import { SECTION_IDS } from '../lib/sections'
import { ContactForm } from './ContactForm'
import { Divider, Reveal } from './Reveal'

export function Contact() {
  const { contact } = content
  const { address } = contact
  const items = [
    {
      icon: '📍',
      title: contact.labels.address,
      lines: [address.street, `${address.postalCode} ${address.city}`],
    },
    {
      icon: '📞',
      title: contact.labels.phone,
      lines: [contact.phone, contact.phoneNote],
      href: `tel:${contact.phone.replace(/\s+/g, '')}`,
    },
    {
      icon: '✉️',
      title: contact.labels.email,
      lines: [contact.email, contact.emailNote],
      href: `mailto:${contact.email}`,
    },
  ]

  return (
    <section id={SECTION_IDS.contact} className="contact">
      <div className="contact-grid">
        <Reveal className="from-left">
          <div className="section-tag">{contact.tag}</div>
          <h2 className="section-title">
            {contact.titleLine1}
            <br />
            {contact.titleLine2}
          </h2>
          <Divider />
          <p className="section-sub contact-sub">{contact.text}</p>
          {items.map((item) => (
            <div className="contact-item" key={item.title}>
              <div className="contact-icon" aria-hidden="true">
                {item.icon}
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>
                  {item.href ? <a href={item.href}>{item.lines[0]}</a> : item.lines[0]}
                  <br />
                  {item.lines[1]}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="from-right">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
