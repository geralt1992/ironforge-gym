// Downloads the source photos and writes optimized WebP files to public/images.
// Usage: npm run images
//
// For a new client: replace `src` with a Pexels photo ID or a local file path
// (e.g. 'images-src/hero.jpg'), run the script, then copy the printed
// width/height values into src/content.ts.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const OUT_DIR = path.resolve('public/images')

/** name → output file prefix, widths → one WebP per width */
const IMAGES = [
  { name: 'hero', src: 1552242, widths: [768, 1280, 1920], quality: 62 },
  { name: 'about-main', src: 1229356, widths: [1000] },
  { name: 'about-accent', src: 416778, widths: [800] },
  { name: 'program-powerlifting', src: 1552106, widths: [800] },
  { name: 'program-hiit', src: 703012, widths: [800] },
  { name: 'program-yoga', src: 4056535, widths: [800] },
  { name: 'program-boxing', src: 5750952, widths: [800] },
  { name: 'program-bodybuilding', src: 1431282, widths: [800] },
  { name: 'gallery-1', src: 2261477, widths: [800] },
  { name: 'gallery-2', src: 1552103, widths: [800] },
  { name: 'gallery-3', src: 4164761, widths: [800] },
  { name: 'gallery-4', src: 1547248, widths: [800] },
  { name: 'gallery-5', src: 2247179, widths: [800] },
  { name: 'cta', src: 841130, widths: [1000], quality: 60 },
]

async function loadSource(src, maxWidth) {
  if (typeof src === 'number') {
    // Pexels CDN: ask for 2x the largest width so the downscale stays sharp
    const url = `https://images.pexels.com/photos/${src}/pexels-photo-${src}.jpeg?auto=compress&cs=tinysrgb&w=${maxWidth * 2}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`)
    return Buffer.from(await res.arrayBuffer())
  }
  if (!existsSync(src)) throw new Error(`Missing local file: ${src}`)
  return readFile(src)
}

await mkdir(OUT_DIR, { recursive: true })

for (const image of IMAGES) {
  const maxWidth = Math.max(...image.widths)
  const input = await loadSource(image.src, maxWidth)
  for (const width of image.widths) {
    const file = image.widths.length > 1 ? `${image.name}-${width}.webp` : `${image.name}.webp`
    const { data, info } = await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: image.quality ?? 72, effort: 6 })
      .toBuffer({ resolveWithObject: true })
    await writeFile(path.join(OUT_DIR, file), data)
    console.log(`${file.padEnd(30)} ${String(info.width).padStart(4)} × ${String(info.height).padEnd(4)} ${(data.length / 1024).toFixed(1)} KB`)
  }
}
