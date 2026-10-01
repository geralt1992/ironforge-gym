export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** '06:00' → '6:00' */
export function formatTime(time: string): string {
  return time.replace(/^0(\d)/, '$1')
}

/** Splits text so that the part matching `linkText` can be rendered as a link. */
export function splitAround(text: string, linkText: string): [string, string] | null {
  const index = text.indexOf(linkText)
  if (index === -1) return null
  return [text.slice(0, index), text.slice(index + linkText.length)]
}
