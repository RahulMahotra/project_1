import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import { profile } from '../data'

const socials = [
  ['GitHub', profile.github],
  ['LinkedIn', profile.linkedin],
  ['LeetCode', profile.leetcode],
  ['Resume', profile.resume],
]

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <button onClick={copy} data-hover className="group mt-3 inline-flex max-w-full items-center gap-3 text-left text-base sm:text-lg">
      <span className="link-line truncate">{profile.email}</span>
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-paper/20 transition-colors group-hover:border-ember">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={14} className="text-ember" /></motion.span>
          ) : (
            <motion.span key="cp" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={13} /></motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: -30 }}
              exit={{ opacity: 0 }}
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ember px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink"
            >
              Copied
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const wordY = useTransform(scrollYProgress, [0.5, 1], ['60%', '0%'])

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden px-5 pt-28 sm:px-6 md:px-10 md:pt-48">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/10 blur-[120px] md:h-[60vw] md:w-[60vw]" />

      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ash">(04) — Let's talk</p>
      </Reveal>

      <Reveal delay={0.1}>
        <a
          href={`mailto:${profile.email}`}
          data-hover
          className="group mt-8 block font-serif text-[15vw] leading-[0.9] tracking-[-0.02em] sm:text-[12vw] lg:text-[clamp(5rem,9vw,10rem)]"
        >
          <span className="block">Got something</span>
          <span className="flex flex-wrap items-center gap-x-4">
            <em className="relative italic text-gold transition-colors duration-500 group-hover:text-ember">
              worth building?
              <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-ember transition-transform duration-700 group-hover:scale-x-100" />
            </em>
            <Magnetic strength={0.4}>
              <span className="flex h-[0.8em] w-[0.8em] items-center justify-center rounded-full bg-ember text-ink transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-[0.45em] w-[0.45em]" />
              </span>
            </Magnetic>
          </span>
        </a>
      </Reveal>

      <div className="mt-16 grid gap-10 border-t border-paper/10 pt-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">Email</p>
          <CopyEmail />
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-ash">Phone</p>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="link-line mt-3 inline-block text-base sm:text-lg">{profile.phone}</a>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">Elsewhere</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-1">
            {socials.map(([l, h]) => (
              <li key={l}>
                <a href={h} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-base sm:text-lg">
                  <span className="link-line">{l}</span>
                  <ArrowUpRight size={14} className="text-ash transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">Currently</p>
          <p className="mt-3 text-base sm:text-lg">Building at FamPay, Bengaluru.</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-ash">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            Open to freelance and interesting side quests
          </p>
        </Reveal>
      </div>

      <div className="relative z-10 mt-16 flex flex-col gap-2 border-t border-paper/10 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-ash md:mt-20 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} Rahul Mahotra</span>
        <span className="hidden md:inline">Designed and built with React, Tailwind and too much coffee.</span>
        <a href="#top" className="link-line self-start md:self-auto">Back to top ↑</a>
      </div>

      {/* giant wordmark rises from the bottom edge */}
      <div className="pointer-events-none relative -mx-5 mt-6 overflow-hidden sm:-mx-6 md:-mx-10" aria-hidden>
        <motion.div
          style={{ y: wordY }}
          className="select-none whitespace-nowrap text-center font-serif text-[21vw] leading-[0.78] tracking-[-0.04em] text-paper/[0.06] 2xl:text-[20rem]"
        >
          Mahotra<span className="text-ember/40">.</span>
        </motion.div>
      </div>
    </footer>
  )
}
