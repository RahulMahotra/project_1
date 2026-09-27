import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Reveal, { SectionHead, ease } from './Reveal'
import { experience, education } from '../data'

function Row({ e, open, onToggle, i }) {
  return (
    <Reveal delay={i * 0.05}>
      <button
        onClick={onToggle}
        data-cursor={open ? 'Close' : 'Open'}
        aria-expanded={open}
        className="group relative flex w-full items-center justify-between gap-4 overflow-hidden border-t border-paper/10 py-7 text-left sm:gap-6 md:py-10"
      >
        {/* accent wash sweeps in on hover */}
        <span
          aria-hidden
          className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
          style={{ background: `linear-gradient(to top, ${e.accent}14, transparent)` }}
        />
        <div className="relative flex items-baseline gap-4 sm:gap-6 md:gap-12">
          <span className="hidden font-mono text-xs text-ash sm:inline">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3 className="font-serif text-[2.6rem] leading-none sm:text-5xl md:text-6xl lg:text-7xl">
              <span
                className="inline-block transition-all duration-500 group-hover:translate-x-2 group-hover:italic"
                style={{ color: open ? e.accent : undefined }}
              >
                {e.company}
              </span>
            </h3>
            <p className="mt-2 text-sm text-bone/80 sm:mt-3 md:text-base">{e.role}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ash md:hidden">{e.period}</p>
          </div>
        </div>
        <div className="relative flex shrink-0 items-center gap-6">
          <div className="hidden text-right font-mono text-[11px] uppercase tracking-widest text-ash md:block">
            <div>{e.period}</div>
            <div className="mt-1">{e.location}</div>
          </div>
          <motion.span
            animate={{ rotate: open ? 45 : 0, backgroundColor: open ? e.accent : 'rgba(0,0,0,0)', color: open ? '#0a0a0b' : '#f4f1ea' }}
            transition={{ duration: 0.4, ease }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 transition-colors group-hover:border-paper md:h-11 md:w-11"
          >
            <Plus size={18} />
          </motion.span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="overflow-hidden"
          >
            <ul className="grid gap-4 pb-10 pt-2 sm:pl-10 md:grid-cols-2 md:gap-x-10 md:pl-[4.5rem]">
              {e.points.map((p, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + j * 0.06, duration: 0.5, ease }}
                  className="flex gap-3 text-[15px] leading-relaxed text-bone/85"
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: e.accent }} />
                  {p}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  )
}

export default function Experience() {
  const [open, setOpen] = useState(0)
  return (
    <section id="experience" className="px-5 py-20 sm:px-6 md:px-10 md:py-36">
      <SectionHead index="02" title="Experience" sub="Three companies, one thread: ship fast, measure everything, keep the UI honest." />
      <div className="border-b border-paper/10">
        {experience.map((e, i) => (
          <Row key={e.company} e={e} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>

      <Reveal className="mt-16 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash">Education</p>
        <div className="md:text-right">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl">{education.school}</p>
          <p className="mt-1 text-sm text-ash">
            {education.degree} · {education.period} · {education.gpa}
          </p>
        </div>
      </Reveal>
    </section>
  )
}
