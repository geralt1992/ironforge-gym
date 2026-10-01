import { useEffect, useState } from 'react'
import { content } from '../content'
import { useReveal } from '../lib/reveal'
import { cx, prefersReducedMotion } from '../lib/utils'

const DURATION = 1800

/**
 * Counts up from 0 when `active` turns true. The server-rendered HTML already
 * contains the final value (no-JS visitors and search engines see real numbers);
 * with reduced motion the final value is shown straight away.
 */
function AnimatedNumber({ value, suffix, active }: { value: string; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(value + suffix)

  useEffect(() => {
    if (!active || prefersReducedMotion()) return
    const target = parseFloat(value.replace(/[^0-9.]/g, ''))
    if (Number.isNaN(target)) return
    const prefix = value.match(/^[^0-9]*/)?.[0] ?? ''
    const decimals = value.includes('.') ? 1 : 0

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      if (progress < 1) {
        const current = decimals ? (eased * target).toFixed(decimals) : String(Math.floor(eased * target))
        setDisplay(prefix + current + suffix)
        frame = requestAnimationFrame(tick)
      } else {
        setDisplay(value + suffix)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, value, suffix])

  return <span className="ticker">{display}</span>
}

function StatItem({ stat, index }: { stat: (typeof content.stats)[number]; index: number }) {
  const [ref, visible] = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={cx('stat-item reveal scale-in', `stagger-${index + 1}`, visible && 'visible')}>
      <div className="stat-number">
        <AnimatedNumber value={stat.value} suffix={stat.suffix} active={visible} />
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  )
}

export function StatsBar() {
  return (
    <div className="stats-bar">
      {content.stats.map((stat, i) => (
        <StatItem key={stat.label} stat={stat} index={i} />
      ))}
    </div>
  )
}
