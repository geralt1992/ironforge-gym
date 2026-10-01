import { useEffect, useRef, useState } from 'react'

/*
 * Scroll reveal: an element gets the `visible` class when it enters the viewport.
 *
 * Safety net: if an element sits on screen for 1.5 s and still has not been
 * revealed (IntersectionObserver missing or never firing), it is revealed anyway.
 */
const FALLBACK_MS = 1500

interface Pending {
  el: Element
  show: () => void
  onScreenSince?: number
}

const pending = new Set<Pending>()
let timer = 0
let frame = 0
let listening = false

function isOnScreen(el: Element): boolean {
  const r = el.getBoundingClientRect()
  return r.bottom > 0 && r.right > 0 && r.top < window.innerHeight && r.left < window.innerWidth
}

function check() {
  frame = 0
  window.clearTimeout(timer)
  const now = performance.now()
  let nextCheck = Infinity

  for (const item of pending) {
    if (!isOnScreen(item.el)) {
      item.onScreenSince = undefined
      continue
    }
    item.onScreenSince ??= now
    const waited = now - item.onScreenSince
    if (waited >= FALLBACK_MS) {
      pending.delete(item)
      item.show()
    } else {
      nextCheck = Math.min(nextCheck, FALLBACK_MS - waited)
    }
  }

  if (nextCheck !== Infinity) timer = window.setTimeout(check, nextCheck + 16)
  if (pending.size === 0) stopListening()
}

function scheduleCheck() {
  if (!frame) frame = requestAnimationFrame(check)
}

function startListening() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', scheduleCheck, { passive: true })
  window.addEventListener('resize', scheduleCheck)
}

function stopListening() {
  if (!listening) return
  listening = false
  window.removeEventListener('scroll', scheduleCheck)
  window.removeEventListener('resize', scheduleCheck)
}

function watch(item: Pending): () => void {
  pending.add(item)
  startListening()
  scheduleCheck()
  return () => {
    pending.delete(item)
    if (pending.size === 0) stopListening()
  }
}

export function useReveal<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let done = false
    let observer: IntersectionObserver | undefined
    let unwatch = () => {}

    const show = () => {
      if (done) return
      done = true
      observer?.disconnect()
      unwatch()
      setVisible(true)
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) show()
        },
        { threshold },
      )
      observer.observe(el)
    }
    unwatch = watch({ el, show })

    return () => {
      done = true
      observer?.disconnect()
      unwatch()
    }
  }, [threshold])

  return [ref, visible] as const
}
