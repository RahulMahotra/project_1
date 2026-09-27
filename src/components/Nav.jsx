import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Scramble from './Scramble'
import { profile } from '../data'

const links = [
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['About', '#about'],
  ['Contact', '#contact'],
]

const ease = [0.76, 0, 0.24, 1]

function useClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata',
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function MobileMenu({ open, onClose, time }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
          transition={{ duration: 0.8, ease }}
          className="fixed inset-0 z-[70] flex flex-col justify-between bg-ember px-5 pb-8 pt-24 text-ink sm:px-6"
        >
          <nav className="flex flex-col">
            {links.map(([l, h], i) => (
              <div key={l} className="overflow-hidden border-b border-ink/15">
                <motion.a
                  href={h}
                  onClick={onClose}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ duration: 0.7, delay: 0.25 + i * 0.07, ease }}
                  className="flex items-baseline justify-between py-3 font-serif text-[15vw] leading-none sm:text-7xl"
                >
                  <span>{l}</span>
                  <span className="font-mono text-xs">0{i + 1}</span>
                </motion.a>
              </div>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.2em]"
          >
            <div className="space-y-1">
              <a href={`mailto:${profile.email}`} className="block">{profile.email}</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="block">GitHub ↗</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="block">LinkedIn ↗</a>
            </div>
            <span>BLR {time}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Nav() {
  const time = useClock()
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <>
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-ember"
      />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[75] ${open ? '' : 'mix-blend-difference'}`}
      >
        <div className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 font-mono text-[11px] uppercase tracking-[0.2em] sm:px-6 md:px-10 ${open ? 'text-ink' : 'text-paper'}`}>
          <a href="#top" className="link-line" onClick={() => setOpen(false)}>RM ©2026</a>

          <nav className="hidden gap-8 md:flex">
            {links.map(([l, h]) => (
              <a key={l} href={h} className="link-line">
                <Scramble text={l.toUpperCase()} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <span className="hidden tabular-nums lg:inline">BLR · {time} IST</span>
            <a href={`mailto:${profile.email}`} className="link-line hidden md:inline">Say hi</a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative flex h-10 w-10 items-center justify-center md:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.4, ease }}
                className="absolute h-px w-6 bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                transition={{ duration: 0.4, ease }}
                className="absolute h-px w-6 bg-current"
              />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} time={time} />
    </>
  )
}
