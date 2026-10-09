import { ArrowsClockwise, Minus, Plus } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Panel } from './Panel'

export function Negation() {
  const [n, setN] = useState(2)
  const isYes = n % 2 === 0

  return (
    <Panel label="否定计算器 · 原文为两个“不是”">
      <p className="flex min-h-20 flex-wrap items-center gap-x-1 gap-y-2 font-serif text-2xl leading-relaxed sm:text-3xl">
        <span>凯文</span>
        <AnimatePresence initial={false}>
          {Array.from({ length: n }, (_, i) => (
            <motion.span
              key={i}
              layout
              className="rounded-lg bg-seal/15 px-1.5 text-seal"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              不是
            </motion.span>
          ))}
        </AnimatePresence>
        <motion.span layout>萝莉控</motion.span>
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          aria-label="减少一个不是"
          disabled={n === 0}
          onClick={() => setN((v) => Math.max(0, v - 1))}
          className="flex size-11 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-paper/40 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus size={18} />
        </button>
        <span className="min-w-24 text-center text-sm text-muted">
          “不是” × <span className="font-display text-lg tabular-nums text-paper">{n}</span>
        </span>
        <button
          type="button"
          aria-label="增加一个不是"
          disabled={n >= 8}
          onClick={() => setN((v) => Math.min(8, v + 1))}
          className="flex size-11 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-paper/40 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-ink p-5">
        <p className="text-xs tracking-[0.25em] text-faint">逻辑结论</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={String(isYes)}
            className="mt-2 font-serif text-xl"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            凯文
            <span className={isYes ? 'text-seal' : 'text-gold'}>{isYes ? '是' : '不是'}</span>
            萝莉控
          </motion.p>
        </AnimatePresence>
        <p className="mt-2 text-xs text-faint">负负得正。本结论仅代表形式逻辑，不代表本群立场。</p>
      </div>
    </Panel>
  )
}

export function Plato() {
  const [flipped, setFlipped] = useState(false)

  return (
    <Panel label="翻开卡片，观测李哥">
      <div className="[perspective:1200px]">
        <motion.button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          aria-label={flipped ? '李哥不是柏拉图。点击再次翻面' : '李哥是柏拉图。点击翻面'}
          className="relative h-60 w-full cursor-pointer [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          <span className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-ink-3 to-ink [backface-visibility:hidden]">
            <span className="text-xs tracking-[0.3em] text-faint">正面</span>
            <span className="mt-3 font-serif text-3xl sm:text-4xl">
              李哥<span className="text-gold">是</span>柏拉图
            </span>
          </span>
          <span className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-seal/40 bg-gradient-to-br from-seal-deep/30 to-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="text-xs tracking-[0.3em] text-faint">反面</span>
            <span className="mt-3 font-serif text-3xl sm:text-4xl">
              李哥<span className="text-seal">不是</span>柏拉图
            </span>
          </span>
        </motion.button>
      </div>
      <p className="mt-5 flex items-center gap-2 text-sm text-muted">
        <ArrowsClockwise size={16} className="shrink-0" />
        两面都是真的。在被观测之前，它们同时成立。
      </p>
    </Panel>
  )
}
