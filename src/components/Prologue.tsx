import { motion } from 'motion/react'
import { rules } from '../rules'

const ease = [0.22, 1, 0.36, 1] as const

export function Prologue() {
  return (
    <section id="prologue" className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-3xl"
        >
          <p className="text-xs tracking-[0.3em] text-seal">序言</p>
          <p className="mt-6 font-serif text-2xl leading-relaxed sm:text-4xl sm:leading-snug">
            每个群都有自己的宪法。
            <span className="text-muted">
              有的条款关乎钱，有的关乎风纪，有的只是一句没人能反驳的话。它们被一条条写下，从此不容置疑。
            </span>
          </p>
        </motion.div>

        <nav aria-label="目录" className="mt-20">
          <p className="mb-6 text-xs tracking-[0.3em] text-faint">目录</p>
          <motion.ol
            className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          >
            {rules.map((r) => (
              <motion.li
                key={r.no}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease }}
              >
                <a
                  href={`#rule-${r.no}`}
                  className="group flex h-full min-h-20 items-center gap-5 bg-ink-2 px-6 py-5 transition-colors hover:bg-ink-3"
                >
                  <span className="font-display text-2xl tabular-nums text-faint transition-colors group-hover:text-seal">
                    {String(r.no).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block text-xs text-faint">{r.tag}</span>
                    <span className="mt-1 block font-serif text-lg">{r.title}</span>
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ol>
        </nav>
      </div>
    </section>
  )
}
