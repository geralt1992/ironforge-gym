import { useEffect, useRef, useState, type FormEvent } from 'react'
import { content, DEMO_MODE, FORM_ENDPOINT } from '../content'
import { splitAround } from '../lib/utils'

type Status = 'idle' | 'sending' | 'success' | 'error' | 'demo'

const PRIVACY_URL = '/politika-privatnosti'

function DemoMessage() {
  const { demo } = content
  const parts = splitAround(demo.formMessage, demo.formLinkText)
  if (!parts) return <>{demo.formMessage}</>
  return (
    <>
      {parts[0]}
      <a href={demo.url} target="_blank" rel="noopener">
        {demo.formLinkText}
      </a>
      {parts[1]}
    </>
  )
}

/** Sends to FormSubmit (AJAX). Expects FORM_ENDPOINT like https://formsubmit.co/ajax/you@example.com */
async function sendToFormSubmit(form: HTMLFormElement, subject: string) {
  const data = Object.fromEntries(new FormData(form))
  const response = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...data, _subject: subject, _template: 'table', _captcha: 'false' }),
  })
  const result: { success?: string | boolean } | null = await response.json().catch(() => null)
  if (!response.ok || String(result?.success) !== 'true') throw new Error('FormSubmit error')
}

export function ContactForm() {
  const f = content.contact.form
  const [status, setStatus] = useState<Status>('idle')
  const [announcement, setAnnouncement] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'demo' || status === 'success') resultRef.current?.focus()
  }, [status])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget

    if (DEMO_MODE) {
      setStatus('demo')
      setAnnouncement(content.demo.formMessage)
      return
    }

    setStatus('sending')
    setAnnouncement(f.sending)
    try {
      if (!FORM_ENDPOINT) throw new Error('FORM_ENDPOINT is empty')
      await sendToFormSubmit(form, f.emailSubject)
      form.reset()
      setStatus('success')
      setAnnouncement(f.success)
    } catch {
      setStatus('error')
      setAnnouncement(f.error)
    }
  }

  const done = status === 'demo' || status === 'success'

  return (
    <div className="contact-form-wrap">
      {done ? (
        <div ref={resultRef} className="form-result" tabIndex={-1}>
          <div className="form-result-icon" aria-hidden="true">
            💪
          </div>
          <h3>{status === 'demo' ? content.demo.formTitle : f.successTitle}</h3>
          <p>{status === 'demo' ? <DemoMessage /> : f.success}</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit} aria-busy={status === 'sending'}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cf-ime">{f.firstName.label}</label>
              <input id="cf-ime" name="ime" type="text" autoComplete="given-name" placeholder={f.firstName.placeholder} required />
            </div>
            <div className="form-group">
              <label htmlFor="cf-prezime">{f.lastName.label}</label>
              <input id="cf-prezime" name="prezime" type="text" autoComplete="family-name" placeholder={f.lastName.placeholder} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cf-email">{f.email.label}</label>
            <input id="cf-email" name="email" type="email" autoComplete="email" placeholder={f.email.placeholder} required />
          </div>
          <div className="form-group">
            <label htmlFor="cf-telefon">{f.phone.label}</label>
            <input id="cf-telefon" name="telefon" type="tel" autoComplete="tel" placeholder={f.phone.placeholder} />
          </div>
          <div className="form-group">
            <label htmlFor="cf-interes">{f.interest.label}</label>
            <select id="cf-interes" name="interes">
              {f.interest.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cf-poruka">{f.message.label}</label>
            <textarea id="cf-poruka" name="poruka" rows={4} placeholder={f.message.placeholder} />
          </div>
          {/* Honeypot: hidden from people, FormSubmit drops messages where bots filled it in */}
          <input type="text" name="_honey" className="form-honeypot" autoComplete="off" />
          <button type="submit" className="btn-primary form-submit" disabled={status === 'sending'}>
            {status === 'sending' ? f.sending : f.submit}
          </button>
          {status === 'error' && <p className="form-error">{f.error}</p>}
          <p className="form-note">
            {f.privacyNote} <a href={PRIVACY_URL}>{f.privacyLinkText}</a>.
          </p>
        </form>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </div>
  )
}
