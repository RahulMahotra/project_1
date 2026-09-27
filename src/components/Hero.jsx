import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import mountain from '../assets/rahul-mountain.jpg'
import Magnetic from './Magnetic'
import Scramble from './Scramble'

const ease = [0.22, 1, 0.36, 1]
const rotating = ['interfaces', 'products', 'tools', 'experiences']

// Each letter rises in on load, and hops when hovered.
function Letters({ word, delay, className = '' }) {
  return (
    <span className={`inline-flex overflow-hidden -mt-[0.12em] pt-[0.12em] pb-[0.1em] pr-[0.06em] ${className}`} aria-label={word}>
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: delay + i * 0.04, ease }}
          whileHover={{ y: '-12%', color: '#ff5a1f', transition: { duration: 0.2 } }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % rotating.length), 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <motion.span layout transition={{ duration: 0.45, ease }} className="relative inline-grid overflow-hidden align-bottom">
      {/* invisible sizer matches the current word so there is no gap */}
      <span className="invisible col-start-1 row-start-1 font-serif italic">{rotating[i]}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={rotating[i]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          className="col-start-1 row-start-1 font-serif italic text-gold"
        >
          {rotating[i]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}

function SpinBadge() {
  const text = 'AVAILABLE FOR SIDE QUESTS · BASED IN BENGALURU · '
  return (
    <Magnetic strength={0.5}>
      <a href="#contact" data-cursor="Hi!" className="group relative block h-32 w-32 lg:h-36 lg:w-36" aria-label="Get in touch">
        <motion.svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
        >
          <defs>
            <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-paper font-mono" style={{ fontSize: 6.6 }}>
            <textPath href="#circle" textLength="236" lengthAdjust="spacing">{text}</textPath>
          </text>
        </motion.svg>
        <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-ember text-ink transition-transform duration-500 group-hover:scale-110">
          <ArrowUpRight size={22} className="transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </a>
    </Magnetic>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // cursor spotlight
  const mx = useMotionValue(-1000)
  const my = useMotionValue(-1000)
  const smx = useSpring(mx, { stiffness: 80, damping: 20 })
  const smy = useSpring(my, { stiffness: 80, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${smx}px ${smy}px, rgba(255,90,31,0.14), transparent 70%)`

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <section id="top" ref={ref} onMouseMove={onMove} className="relative min-h-[100svh] overflow-hidden">
      {/* photo: full-bleed below lg, right half on lg+ */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="photo-mask absolute inset-0 lg:left-auto lg:w-[55%]"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.4, ease, delay: 0.2 }}
      >
        <img
          src={mountain}
          alt="Rahul looking out over snow-covered mountains at golden hour"
          className="h-full w-full object-cover object-[62%_20%] sm:object-[65%_center]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10 lg:bg-gradient-to-r lg:from-ink lg:via-ink/10 lg:to-transparent" />
      </motion.div>

      {/* spotlight follows cursor (desktop only) */}
      <motion.div aria-hidden style={{ background: spotlight }} className="pointer-events-none absolute inset-0 z-[5] hidden lg:block" />

      {/* text */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-28 sm:px-6 md:px-10 md:pb-16"
      >
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70 sm:text-[11px]">
          <Scramble text="Software Engineer · Frontend · Bengaluru" auto delay={0.8} />
        </p>

        <h1 className="font-serif text-[22vw] leading-[0.85] tracking-[-0.02em] sm:text-[17vw] lg:text-[clamp(6rem,11vw,12.5rem)]">
          <Letters word="Rahul" delay={0.3} />
          <br />
          <Letters word="Mahotra" delay={0.5} className="italic text-gold" />
        </h1>

        <div className="mt-8 flex flex-col gap-8 sm:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease }}
            className="max-w-md text-base leading-snug text-bone sm:text-lg md:text-xl"
          >
            I build <RotatingWord /> people actually enjoy using. Frontend-leaning full-stack
            engineer, three years of shipping at scale. Currently at FamPay, previously Juspay.
          </motion.p>

          <div className="flex items-end justify-between gap-6">
            <motion.a
              href="#work"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-paper"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 transition-colors group-hover:border-ember group-hover:bg-ember group-hover:text-ink">
                <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
                  <ArrowDown size={16} />
                </motion.span>
              </span>
              Scroll
            </motion.a>

            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.5, duration: 1, ease }}
              className="hidden sm:block"
            >
              <SpinBadge />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
