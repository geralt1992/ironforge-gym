import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/utils'

// The effects write straight to the DOM instead of React state, so scrolling and
// moving the mouse never re-render the page.

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const root = document.documentElement
      const max = root.scrollHeight - root.clientHeight
      const progress = max > 0 ? root.scrollTop / max : 0
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />
}

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    // Mouse-only effect: skipped on touch screens and with reduced motion
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || prefersReducedMotion()) return

    let frame = 0
    let x = 0
    let y = 0
    const apply = () => {
      frame = 0
      el.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`
    }
    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (!frame) frame = requestAnimationFrame(apply)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

export function ClickParticles() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 8; i++) {
        const p = document.createElement('div')
        p.className = 'particle'
        p.style.left = `${e.clientX + (Math.random() * 40 - 20)}px`
        p.style.top = `${e.clientY + (Math.random() * 40 - 20)}px`
        p.style.animationDelay = `${Math.random() * 0.3}s`
        p.style.width = p.style.height = `${Math.random() * 4 + 2}px`
        document.body.appendChild(p)
        window.setTimeout(() => p.remove(), 3200)
      }
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return null
}
