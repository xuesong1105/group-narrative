import { AnimatePresence, motion } from 'motion/react'
import { splitDuration, useNow } from '../../hooks'
import { INCIDENT_AT, REVEAL_AT } from '../../rules'
import { Panel } from './Panel'

function Digit({ value, unit }: { value: number; unit: string }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-16 min-w-16 items-center justify-center overflow-hidden rounded-2xl border border-line bg-ink px-3 sm:h-20 sm:min-w-20">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="font-display text-3xl tabular-nums text-paper sm:text-4xl"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-xs tracking-[0.2em] text-faint">{unit}</span>
    </div>
  )
}

function Clock({ ms }: { ms: number }) {
  const d = splitDuration(ms)
  return (
    <div className="flex flex-wrap gap-3 sm:gap-4" role="timer" aria-live="off">
      <Digit value={d.days} unit="天" />
      <Digit value={d.hours} unit="时" />
      <Digit value={d.minutes} unit="分" />
      <Digit value={d.seconds} unit="秒" />
    </div>
  )
}

function SplitText({ children }: { children: string }) {
  const base = 'block font-display text-5xl font-medium tracking-tight sm:text-7xl'
  return (
    <span className="relative block select-none" aria-label={children}>
      <span className={`${base} invisible`}>{children}</span>
      <motion.span
        aria-hidden
        className={`${base} absolute inset-0 text-paper`}
        style={{ clipPath: 'inset(0 0 52% 0)' }}
        initial={{ x: 0 }}
        whileInView={{ x: -10 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden
        className={`${base} absolute inset-0 text-seal`}
        style={{ clipPath: 'inset(48% 0 0 0)' }}
        initial={{ x: 0 }}
        whileInView={{ x: 10 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Incident() {
  const now = useNow()
  const passed = now >= INCIDENT_AT
  return (
    <Panel label="事变发生于 · 北京时间">
      <SplitText>2026.05.23</SplitText>
      <p className="mt-3 font-display text-2xl text-muted">18:30</p>
      <div className="my-8 h-px bg-line" />
      <p className="mb-4 text-sm text-muted">{passed ? '事变至今已过去' : '距离事变还有'}</p>
      <Clock ms={Math.abs(now - INCIDENT_AT)} />
    </Panel>
  )
}

export function Countdown() {
  const now = useNow()
  const revealed = now >= REVEAL_AT
  return (
    <Panel label="揭晓时刻 · 2027 年 5 月">
      {revealed ? (
        <div className="py-6">
          <p className="font-serif text-4xl text-gold">已到见分晓之时</p>
          <p className="mt-3 text-muted">答案请去群里问松哥本人。</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted">距离真相大白还有</p>
          <Clock ms={REVEAL_AT - now} />
          <div className="mt-8 flex items-center gap-3 text-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-gold" />
            </span>
            <span className="text-muted">案件状态：待揭晓</span>
          </div>
        </>
      )}
    </Panel>
  )
}
