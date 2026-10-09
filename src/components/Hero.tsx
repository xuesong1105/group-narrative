import { ArrowDown } from '@phosphor-icons/react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="drift absolute left-1/2 top-1/3 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,72,63,0.28),transparent_60%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <motion.div style={{ y, opacity }} className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.p
          className="text-xs tracking-[0.4em] text-muted"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          现行有效 · 共十二条 · 全体群成员一体遵守
        </motion.p>

        <h1 className="mt-8 font-serif text-[22vw] font-bold leading-[0.95] tracking-tight sm:text-[11rem] lg:text-[13rem]">
          {['群', '规'].map((ch, i) => (
            <motion.span
              key={ch}
              className={`inline-block ${i === 1 ? 'text-seal' : ''}`}
              initial={{ opacity: 0, y: 60, rotate: i ? 6 : -6 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.2 + i * 0.15, ease }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-paper/85 sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
        >
          一部由红包、悬案、语录和一条腿写成的群聊编年史。
        </motion.p>

        <motion.a
          href="#prologue"
          className="mt-14 inline-flex min-h-11 items-center gap-3 text-sm text-muted transition-colors hover:text-paper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span className="flex size-11 items-center justify-center rounded-full border border-line">
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={18} />
            </motion.span>
          </span>
          向下滚动，开始阅读
        </motion.a>
      </motion.div>
    </section>
  )
}
