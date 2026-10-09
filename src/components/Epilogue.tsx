import { ArrowUp } from '@phosphor-icons/react'
import { motion } from 'motion/react'

export function Epilogue() {
  return (
    <footer className="relative overflow-hidden border-t border-line/60 py-32 sm:py-44">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom,rgba(224,72,63,0.18),transparent_65%)]" />
      <motion.div
        className="relative mx-auto max-w-6xl px-5 text-center sm:px-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs tracking-[0.3em] text-faint">附则</p>
        <p className="mx-auto mt-8 max-w-2xl font-serif text-3xl leading-snug sm:text-5xl">
          以上十二条，自写入之日起生效，
          <span className="text-seal">解释权归全体群成员所有。</span>
        </p>
        <div className="mx-auto mt-14 flex size-24 rotate-[-8deg] items-center justify-center rounded-full border-2 border-seal/80 font-serif text-sm font-bold leading-tight tracking-widest text-seal">
          群规
          <br />
          生效
        </div>
        <a
          href="#top"
          className="mt-16 inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm text-muted transition-colors hover:border-paper/40 hover:text-paper"
        >
          <ArrowUp size={16} />
          回到开头，再读一遍
        </a>
      </motion.div>
    </footer>
  )
}
