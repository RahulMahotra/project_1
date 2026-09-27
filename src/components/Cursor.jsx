import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

// Dot + trailing ring. Grows over links; shows a label over elements with data-cursor="...".
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 450, damping: 38, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 450, damping: 38, mass: 0.4 })
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')
  const [down, setDown] = useState(false)

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => {
      const labelled = e.target.closest('[data-cursor]')
      setLabel(labelled ? labelled.dataset.cursor : '')
      setHover(!!e.target.closest('a, button, [data-hover]'))
    }
    const d = () => setDown(true)
    const u = () => setDown(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mousedown', d)
    window.addEventListener('mouseup', u)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', d)
      window.removeEventListener('mouseup', u)
    }
  }, [x, y])

  const size = label ? 88 : hover ? 60 : 32

  return (
    <>
      <motion.div
        className="cursor pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-ember"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: label ? 0 : down ? 0.5 : 1 }}
      />
      <motion.div
        className={`cursor pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full ${label ? 'bg-ember' : 'border border-paper/70 mix-blend-difference'}`}
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: size, height: size, opacity: hover || label ? 1 : 0.5, scale: down ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
