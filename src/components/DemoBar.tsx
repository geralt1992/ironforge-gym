import type { Ref } from 'react'
import { content } from '../content'

export function DemoBar({ ref }: { ref?: Ref<HTMLDivElement> }) {
  const { demo } = content
  return (
    <div ref={ref} className="demo-bar">
      <span>{demo.barText}</span>
      <a href={demo.url} target="_blank" rel="noopener">
        {demo.barLinkText}
      </a>
    </div>
  )
}
