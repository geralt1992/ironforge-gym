import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../lib/reveal'
import { cx } from '../lib/utils'

interface RevealProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/** Block that fades/slides in when it enters the viewport (classes: from-left, from-right, scale-in). */
export function Reveal({ className, style, children }: RevealProps) {
  const [ref, visible] = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={cx('reveal', className, visible && 'visible')} style={style}>
      {children}
    </div>
  )
}

/** Grid item with a staggered reveal delay. */
export function RevealItem({ className, delay, children }: { className?: string; delay?: string; children: ReactNode }) {
  return (
    <Reveal className={className} style={{ transitionDelay: delay ?? '0s', height: '100%' }}>
      {children}
    </Reveal>
  )
}

/** Gold line that draws itself when it enters the viewport. */
export function Divider({ center = false }: { center?: boolean }) {
  const [ref, visible] = useReveal<HTMLDivElement>()
  return <div ref={ref} className={cx('divider-anim', center && 'center', visible && 'visible')} aria-hidden="true" />
}
