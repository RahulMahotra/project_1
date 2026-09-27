import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const words = ['Namaste', 'Hello', 'Bonjour', 'こんにちは', 'Hola', 'Ciao']

export default function Preloader({ onDone }) {
  const [i, setI] = useState(0)
  const [show, setShow] = useState(true)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let raf
    const step = (t) => {
      const p = Math.min(100, Math.round(((t - start) / 1900) * 100))
      setPct(p)
      if (p < 100) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (i < words.length - 1) {
      const t = setTimeout(() => setI(i + 1), i === 0 ? 700 : 160)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setShow(false), 500)
    return () => clearTimeout(t)
  }, [i])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="pre"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-paper text-ink"
          exit={{ y: '-100%', borderBottomLeftRadius: '50% 10%', borderBottomRightRadius: '50% 10%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            key={words[i]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 font-serif text-5xl md:text-7xl"
          >
            <span className="h-2 w-2 rounded-full bg-ember" />
            {words[i]}
          </motion.p>
          <span className="absolute bottom-6 right-6 font-serif text-6xl tabular-nums md:bottom-10 md:right-10 md:text-8xl">
            {pct}<span className="text-ember">%</span>
          </span>
          <span className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60 md:bottom-10 md:left-10">
            Rahul Mahotra — Portfolio
          </span>
          <span className="absolute inset-x-0 bottom-0 h-1 origin-left bg-ember" style={{ transform: `scaleX(${pct / 100})` }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
