import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import type { Rule, WidgetKind } from '../rules'
import { Gift, ExVote, Heartbeat } from './widgets/Civic'
import { Negation, Plato } from './widgets/Logic'
import { CleanPacket, LovePacket } from './widgets/RedPacket'
import { Debt, Quote, Ticket } from './widgets/Story'
import { Countdown, Incident } from './widgets/Time'

const widgets: Record<WidgetKind, () => ReactNode> = {
  'love-packet': () => <LovePacket />,
  'clean-packet': () => <CleanPacket />,
  incident: () => <Incident />,
  countdown: () => <Countdown />,
  quote: () => <Quote />,
  debt: () => <Debt />,
  negation: () => <Negation />,
  plato: () => <Plato />,
  'ex-vote': () => <ExVote />,
  ticket: () => <Ticket />,
  gift: () => <Gift />,
  heartbeat: () => <Heartbeat />,
}

const ease = [0.22, 1, 0.36, 1] as const

export function Chapter({ rule }: { rule: Rule }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const numeralY = useTransform(scrollYProgress, [0, 1], ['18%', '-18%'])
  const num = String(rule.no).padStart(2, '0')

  return (
    <section
      ref={ref}
      id={`rule-${rule.no}`}
      data-chapter={rule.no}
      aria-labelledby={`rule-${rule.no}-title`}
      className="relative flex min-h-[100svh] items-center border-t border-line/60 py-24 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5">
          <motion.span
            aria-hidden
            style={{ y: numeralY }}
            className="numeral-outline pointer-events-none absolute -left-2 -top-16 select-none font-display text-[9rem] font-light leading-none sm:text-[13rem] lg:-top-24"
          >
            {num}
          </motion.span>

          <motion.div
            className="relative pt-16 sm:pt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="flex items-center gap-3 text-xs tracking-[0.25em]">
              <span className="text-seal">{rule.cn}</span>
              <span className="h-px w-6 bg-line" />
              <span className="text-faint">{rule.tag}</span>
            </div>
            <h2
              id={`rule-${rule.no}-title`}
              className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
            >
              {rule.title}
            </h2>
            <figure className="mt-8 border-l-2 border-seal/70 pl-5">
              <figcaption className="mb-2 text-xs tracking-[0.25em] text-faint">群规原文</figcaption>
              <blockquote className="font-serif text-lg leading-relaxed text-paper/90">{rule.text}</blockquote>
            </figure>
            <p className="mt-8 max-w-prose leading-loose text-muted">{rule.story}</p>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-7 lg:self-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          {widgets[rule.widget]()}
        </motion.div>
      </div>
    </section>
  )
}
