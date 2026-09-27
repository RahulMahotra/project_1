import { useEffect, useRef, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

// Text that decodes from random glyphs. Runs on mount (if `auto`) and on hover.
export default function Scramble({ text, auto = false, delay = 0, className = '', speed = 45 }) {
  const [out, setOut] = useState(auto ? '' : text)
  const timer = useRef(0)

  const run = () => {
    clearTimeout(timer.current)
    let frame = 0
    const total = Math.max(18, text.length * 1.1)
    const tick = () => {
      frame++
      const progress = frame / total
      setOut(
        text
          .split('')
          .map((c, i) => {
            if (c === ' ') return ' '
            if (i < progress * text.length) return c
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join(''),
      )
      if (frame < total) timer.current = setTimeout(tick, 1000 / speed)
      else setOut(text)
    }
    tick()
  }

  useEffect(() => {
    if (!auto) return
    const t = setTimeout(run, delay * 1000)
    return () => { clearTimeout(t); clearTimeout(timer.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span className={className} onMouseEnter={run} aria-label={text}>
      <span aria-hidden>{out || ' '}</span>
    </span>
  )
}
