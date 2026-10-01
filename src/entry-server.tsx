// Build-time renderer used by scripts/prerender.mjs (not shipped to the browser).
import { StrictMode, type ReactNode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { content } from './content'
import { buildHead, type PageKey } from './head'
import { NotFoundPage } from './pages/NotFoundPage'
import { PrivacyPage } from './pages/PrivacyPage'

const PAGES: Record<PageKey, () => ReactNode> = {
  home: () => <App />,
  privacy: () => <PrivacyPage />,
  notFound: () => <NotFoundPage />,
}

export const lang = content.site.lang

export function render(page: PageKey): { head: string; html: string } {
  return {
    head: buildHead(page),
    html: renderToString(<StrictMode>{PAGES[page]()}</StrictMode>),
  }
}
