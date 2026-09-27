import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import Reveal from './Reveal'
import { stats } from '../data'

function Counter({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [n, setN] = useState(0)
  const num = parseInt(value.replace(/\D/g, ''), 10)
  const suffix = value.replace(/[\d]/g, '')

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur = 1400
    let raf
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur)
      const e = 1 - Math.pow(1 - p, 4)
      setN(Math.round(num * e))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, num])

  return (
    <span ref={ref} className="tabular-nums">
      {n}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="px-5 py-16 sm:px-6 md:px-10 md:py-28">
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="group border-l border-paper/10 pl-4 transition-colors duration-500 hover:border-ember sm:pl-5">
            <div className="font-serif text-[2.9rem] leading-none text-paper transition-colors duration-500 group-hover:text-ember sm:text-6xl md:text-7xl">
              <Counter value={s.value} />
            </div>
            <p className="mt-3 max-w-[14ch] text-sm text-ash">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
