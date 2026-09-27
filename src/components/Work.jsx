import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Reveal, { SectionHead } from './Reveal'
import { projects } from '../data'

function Card({ p, i }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const srx = useSpring(rx, { stiffness: 150, damping: 18 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18 })
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(255,90,31,0.18), transparent 65%)`

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    mx.set(px * 100)
    my.set(py * 100)
    ry.set((px - 0.5) * 8)
    rx.set((0.5 - py) * 8)
  }
  const onLeave = () => { rx.set(0); ry.set(0) }

  const Tag = p.link ? motion.a : motion.div

  return (
    <Reveal delay={(i % 2) * 0.1} className="[perspective:1200px]">
      <Tag
        ref={ref}
        href={p.link}
        target={p.link ? '_blank' : undefined}
        rel={p.link ? 'noreferrer' : undefined}
        data-cursor={p.link ? 'Open' : 'View'}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-paper/10 bg-paper/[0.02] p-6 transition-colors duration-500 hover:border-ember/50 sm:p-8 md:p-10"
      >
        <motion.span aria-hidden style={{ background: glow }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* giant index number sitting behind content */}
        <span aria-hidden className="outline-text pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 font-serif text-[11rem] leading-none opacity-25 transition-all duration-700 group-hover:-translate-x-2 group-hover:opacity-50 xl:block">
          {String(i + 1).padStart(2, '0')}
        </span>

        <div className="relative flex items-start justify-between gap-6" style={{ transform: 'translateZ(40px)' }}>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">{p.kind}</p>
            <h3 className="mt-4 font-serif text-3xl leading-none sm:text-4xl md:text-5xl">{p.title}</h3>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-ember group-hover:bg-ember group-hover:text-ink">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <p className="relative mt-6 max-w-lg text-[15px] xl:max-w-[68%] leading-relaxed text-bone/80 sm:mt-8 sm:text-base" style={{ transform: 'translateZ(25px)' }}>
          {p.desc}
        </p>

        <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-8 sm:pt-10" style={{ transform: 'translateZ(20px)' }}>
          {p.stack.map((s) => (
            <span key={s} className="rounded-full border border-paper/15 bg-ink/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ash backdrop-blur-sm transition-colors group-hover:border-paper/30 group-hover:text-bone">
              {s}
            </span>
          ))}
          <span className="ml-auto font-mono text-xs text-ash">{p.year}</span>
        </div>
      </Tag>
    </Reveal>
  )
}

export default function Work() {
  return (
    <section id="work" className="px-5 py-20 sm:px-6 md:px-10 md:py-36">
      <SectionHead index="01" title="Selected work" sub="Dashboards, AI tools, side projects. Things that had to work on day one for people who don't read docs." />
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {projects.map((p, i) => <Card key={p.title} p={p} i={i} />)}
      </div>
    </section>
  )
}
