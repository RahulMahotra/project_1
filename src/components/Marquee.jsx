import { useRef } from 'react'
import {
  motion, useAnimationFrame, useMotionValue, useScroll, useSpring,
  useTransform, useVelocity, wrap,
} from 'framer-motion'

// Scroll-reactive marquee: speeds up and flips direction with scroll, skews on fast flicks.
export default function Marquee({ items, baseVelocity = -3 }) {
  const x = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const skew = useTransform(smooth, [-2000, 2000], [8, -8])
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * f
    x.set(wrap(-50, 0, x.get() + move))
  })

  const xPct = useTransform(x, (v) => `${v}%`)
  const row = [...items, ...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden border-y border-paper/10 py-4 md:py-6" aria-label={items.join(', ')}>
      <motion.div style={{ x: xPct, skewX: skew }} className="flex w-max whitespace-nowrap" aria-hidden>
        {row.map((item, i) => (
          <span key={i} className="flex items-center font-serif text-3xl sm:text-4xl md:text-6xl">
            <span className={i % 2 ? 'outline-text italic' : 'text-paper'}>{item}</span>
            <svg viewBox="0 0 24 24" className="mx-6 h-4 w-4 fill-ember md:mx-10 md:h-6 md:w-6">
              <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
            </svg>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
