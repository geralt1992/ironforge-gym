import { content } from '../content'

export function NotFoundPage() {
  const { notFound, site } = content
  return (
    <main className="not-found">
      <a href="/" className="nav-logo">
        {site.logoText}
      </a>
      <p className="not-found-code" aria-hidden="true">
        404
      </p>
      <h1 className="section-title">{notFound.title}</h1>
      <p className="section-sub">{notFound.text}</p>
      <a href="/" className="btn-primary">
        {notFound.button}
      </a>
    </main>
  )
}
