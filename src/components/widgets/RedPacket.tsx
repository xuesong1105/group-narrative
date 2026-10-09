import { ArrowCounterClockwise } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useLocalState } from '../../hooks'
import { Panel } from './Panel'

function Packet({
  amount,
  caption,
  blessing,
  small = false,
  onOpen,
}: {
  amount: number
  caption: string
  blessing: string
  small?: boolean
  onOpen?: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <button
      type="button"
      aria-pressed={open}
      aria-label={open ? `已拆开：${amount} 元，点击合上` : `拆开${caption}`}
      onClick={() => {
        if (!open) onOpen?.()
        setOpen((v) => !v)
      }}
      className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-[22px] bg-gradient-to-b from-seal to-seal-deep shadow-[0_30px_60px_-20px_rgba(224,72,63,0.55)] transition-transform duration-200 hover:-translate-y-1 active:scale-[0.98] ${
        small ? 'h-56 w-40' : 'h-72 w-52 sm:h-80 sm:w-56'
      }`}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-[42%] origin-top rounded-b-[50%] bg-[#ea5a50] shadow-[0_6px_14px_rgba(0,0,0,0.25)]"
        animate={{ scaleY: open ? 0.55 : 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      />
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.div
            key="open"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 pt-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs tracking-[0.3em] text-gold/80">{caption}</span>
            <span
              className={`font-display font-semibold tabular-nums text-gold ${small ? 'text-4xl' : 'text-6xl'}`}
            >
              <span className="mr-1 align-top text-[0.45em]">¥</span>
              {amount.toFixed(2)}
            </span>
            <span className="text-sm text-paper/85">{blessing}</span>
          </motion.div>
        ) : (
          <motion.div
            key="closed"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <span
              className={`absolute left-1/2 top-[42%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold font-serif font-bold text-seal-deep shadow-lg transition-transform duration-300 group-hover:rotate-12 ${
                small ? 'size-14 text-xl' : 'size-20 text-3xl'
              }`}
            >
              開
            </span>
            <span className="absolute inset-x-0 bottom-7 text-center text-sm tracking-[0.25em] text-gold/90">
              {caption}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export function LovePacket() {
  return (
    <Panel label="红包 · 点击拆开">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end">
        <Packet amount={50} caption="恋爱红包" blessing="恭喜脱单，百年好合" />
        <dl className="grid w-full grid-cols-2 gap-x-6 gap-y-4 text-sm sm:w-auto sm:grid-cols-1">
          <div>
            <dt className="text-faint">触发条件</dt>
            <dd className="mt-1 text-paper">确认恋爱关系</dd>
          </div>
          <div>
            <dt className="text-faint">金额</dt>
            <dd className="mt-1 font-display text-2xl text-gold">¥50</dd>
          </div>
          <div>
            <dt className="text-faint">收款方</dt>
            <dd className="mt-1 text-paper">全体群成员</dd>
          </div>
          <div>
            <dt className="text-faint">可否赖账</dt>
            <dd className="mt-1 text-paper">不可</dd>
          </div>
        </dl>
      </div>
    </Panel>
  )
}

export function CleanPacket() {
  const [count, setCount] = useLocalState('rule2-fines', 0)

  return (
    <Panel label="罚款红包 · 每拆一次记一笔">
      <div className="flex flex-col items-center gap-8 sm:flex-row">
        <Packet
          small
          amount={1}
          caption="违规红包"
          blessing="下不为例"
          onOpen={() => setCount((c) => c + 1)}
        />
        <div className="w-full text-center sm:text-left">
          <p className="text-sm text-faint">你在本设备上累计开出的罚单</p>
          <p className="mt-2 font-display text-6xl tabular-nums text-paper">
            <motion.span key={count} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
              {count}
            </motion.span>
            <span className="ml-2 text-lg text-muted">张</span>
          </p>
          <p className="mt-1 text-sm text-muted">合计 ¥{count.toFixed(2)}，已充公</p>
          {count > 0 && (
            <button
              type="button"
              onClick={() => setCount(0)}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-paper/40 hover:text-paper"
            >
              <ArrowCounterClockwise size={16} />
              特赦，清零
            </button>
          )}
        </div>
      </div>
    </Panel>
  )
}
