import { motion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

export default function Reveal({ children, delay = 0, y = 32, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({ index, title, sub }) {
  return (
    <div className="relative mb-12 flex items-end justify-between gap-6 pb-6 md:mb-20">
      <div>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="overflow-hidden pb-[0.08em] font-serif text-[2.75rem] leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
        >
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '105%' }, show: { y: 0 } }}
            transition={{ duration: 1, ease }}
          >
            {title}
          </motion.span>
        </motion.h2>
        {sub && (
          <Reveal delay={0.15}>
            <p className="mt-3 max-w-md text-sm text-ash md:text-base">{sub}</p>
          </Reveal>
        )}
      </div>
      <Reveal delay={0.1}>
        <span className="font-mono text-xs text-ash">({index})</span>
      </Reveal>
      {/* rule draws itself in */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-paper/15"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease, delay: 0.1 }}
      />
    </div>
  )
}
