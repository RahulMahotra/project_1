import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal, { SectionHead } from './Reveal'
import shimla from '../assets/rahul-shimla.jpg'
import { quotes, skills } from '../data'

// Each word brightens as it scrolls through the viewport.
function ScrollWords({ text, accentFrom }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="flex flex-wrap font-serif text-[2rem] leading-[1.12] sm:text-4xl md:text-5xl">
      {words.map((w, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return <Word key={i} progress={scrollYProgress} range={[start, end]} accent={i >= accentFrom}>{w}</Word>
      })}
    </p>
  )
}

function Word({ children, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <motion.span style={{ opacity, y }} className={`mr-[0.25em] ${accent ? 'italic text-gold' : 'text-paper'}`}>
      {children}
    </motion.span>
  )
}

const headline = 'I grew up in the hills, studied in Guwahati, and now write code in Bengaluru. I like software that gets out of the way.'
const accentFrom = headline.split(' ').indexOf('I', 5)

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 2])

  return (
    <section id="about" ref={ref} className="px-5 py-20 sm:px-6 md:px-10 md:py-36">
      <SectionHead index="03" title="About" />

      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        {/* photo */}
        <div className="md:col-span-5">
          <Reveal>
            <motion.div style={{ rotate }} className="group relative mx-auto aspect-[4/5] max-w-md overflow-hidden md:aspect-[3/4] md:max-w-none">
              <motion.img
                src={shimla}
                alt="Rahul standing on the Mall Road in Shimla in front of the old Town Hall"
                style={{ y, scale: 1.18 }}
                className="h-full w-full object-cover grayscale-[35%] transition-[filter] duration-700 group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/70 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-bone backdrop-blur">
                <span>Shimla, HP</span>
                <span>31.10°N 77.17°E</span>
              </div>
              {/* sticker */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: 1, rotate: 12 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.4 }}
                className="absolute right-4 top-4 flex h-20 w-20 items-center justify-center rounded-full bg-gold text-center font-mono text-[9px] font-medium uppercase leading-tight tracking-wider text-ink shadow-xl sm:h-24 sm:w-24 sm:text-[10px]"
              >
                Off the<br />clock
              </motion.div>
            </motion.div>
          </Reveal>
        </div>

        {/* copy */}
        <div className="flex flex-col justify-between md:col-span-7 md:pl-4 lg:pl-8">
          <div>
            <ScrollWords text={headline} accentFrom={accentFrom} />
            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-6 text-[15px] leading-relaxed text-bone/80 sm:text-base lg:grid-cols-2">
                <p>
                  I've built real-time dashboards that stream a hundred million events a day,
                  an AI assistant that turns plain English into working configs, component
                  libraries shared across web and mobile, and consumer app screens used by
                  millions. Mostly React and TypeScript, with enough Node, Python and infra to
                  ship end to end.
                </p>
                <p>
                  I care about the boring things that make products feel expensive: bundle budgets,
                  render performance, honest loading states, keyboard access. I also write about
                  DSA and core CS on GeeksforGeeks. Off the clock it's football, Leetcode streaks,
                  and any road that ends in snow.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-12">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-ash">Toolkit</p>
            <ul className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.025, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  data-hover
                  className="rounded-full border border-paper/15 px-3.5 py-1.5 text-[13px] text-bone/80 transition-colors hover:border-ember hover:bg-ember hover:text-ink"
                >
                  {s}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* quotes */}
      <div className="mt-24 grid gap-12 border-t border-paper/10 pt-14 md:mt-28 md:grid-cols-3 md:gap-10">
        {quotes.map((q, i) => (
          <Reveal key={q.by} delay={i * 0.1}>
            <blockquote className="group relative">
              <span aria-hidden className="absolute -left-1 -top-10 font-serif text-8xl leading-none text-ember/30 transition-colors duration-500 group-hover:text-ember">“</span>
              <p className="relative font-serif text-2xl leading-snug text-paper md:text-[1.7rem] lg:text-3xl">{q.text}</p>
              <footer className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ash">— {q.by}</footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
