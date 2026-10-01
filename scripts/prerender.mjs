// Runs after `vite build`: renders every page to static HTML (SEO, fast first paint)
// and injects the <head> tags built from src/content.ts.
import { readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const ssrDir = path.resolve('dist-ssr')
const { render, lang } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const PAGES = [
  { file: 'index.html', page: 'home' },
  { file: 'politika-privatnosti.html', page: 'privacy' },
  { file: '404.html', page: 'notFound' },
]

// Preload the two fonts used above the fold so the hero text does not jump when they load
const assets = await readdir(path.join(dist, 'assets'))
const criticalFonts = assets.filter((f) => /^(bebas-neue-latin-400-normal|inter-latin-wght-normal)-.+\.woff2$/.test(f))
const fontPreloads = criticalFonts.map(
  (f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`,
)

for (const { file, page } of PAGES) {
  const target = path.join(dist, file)
  const template = await readFile(target, 'utf8')
  const { head, html } = render(page)
  const headTags = page === 'home' ? [head, ...fontPreloads].join('\n    ') : head

  if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
    throw new Error(`${file}: missing <!--app-head--> or <!--app-html--> placeholder`)
  }
  const output = template
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace('<!--app-head-->', headTags)
    .replace('<!--app-html-->', html)

  await writeFile(target, output)
  console.log(`prerendered ${file}`)
}

await rm(ssrDir, { recursive: true, force: true })
