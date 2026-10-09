import { ArrowCounterClockwise, Gavel, HandPalm, Heartbeat as HeartbeatIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion, useSpring, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'
import { Panel } from './Panel'

const SEATS = 6
const THRESHOLD = 3

export function ExVote() {
  const [votes, setVotes] = useState(0)
  const guilty = votes > THRESHOLD

  return (
    <Panel label={`陪审席 · 超过 ${THRESHOLD} 票即罚款`}>
      <div className="flex items-center gap-1.5 sm:gap-3">
        {Array.from({ length: SEATS }, (_, i) => {
          const filled = i < votes
          return (
            <div key={i} className="flex items-center gap-1.5 sm:gap-3">
              <motion.div
                className={`flex size-9 items-center justify-center rounded-full border sm:size-12 ${
                  filled
                    ? guilty
                      ? 'border-seal bg-seal text-paper'
                      : 'border-gold bg-gold/15 text-gold'
                    : 'border-line text-faint'
                }`}
                animate={{ scale: filled ? [1, 1.18, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <HandPalm size={18} weight={filled ? 'fill' : 'regular'} />
              </motion.div>
              {i === THRESHOLD - 1 && <span aria-hidden className="h-10 w-px bg-seal/60" />}
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex min-h-24 items-center rounded-2xl border border-line bg-ink p-5">
        <AnimatePresence mode="wait" initial={false}>
          {guilty ? (
            <motion.div
              key="guilty"
              className="flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Gavel size={32} className="shrink-0 text-seal" weight="duotone" />
              <div>
                <p className="font-serif text-xl text-seal">判决生效：罚款 ¥1</p>
                <p className="text-sm text-muted">{votes} 人认定该发言过于 EX，请当事人即刻发红包。</p>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="pending"
              className="text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              当前 <span className="font-display text-lg text-paper">{votes}</span> 票。
              {votes === 0 ? '尚无人举手，发言暂属清白。' : `还差 ${THRESHOLD + 1 - votes} 票即可定罪。`}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={votes >= SEATS}
          onClick={() => setVotes((v) => Math.min(SEATS, v + 1))}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-5 text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <HandPalm size={18} weight="bold" />
          我觉得 EX
        </button>
        <button
          type="button"
          disabled={votes === 0}
          onClick={() => setVotes(0)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm text-muted transition-colors hover:border-paper/40 hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowCounterClockwise size={16} />
          重新表决
        </button>
      </div>
    </Panel>
  )
}

const AMOUNTS = [200, 520, 666, 888, 1314]

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 120, damping: 20 })
  const text = useTransform(spring, (v) => Math.round(v).toLocaleString('zh-CN'))
  useEffect(() => {
    spring.set(value)
  }, [spring, value])
  return <motion.span>{text}</motion.span>
}

export function Gift() {
  const [amount, setAmount] = useState(520)
  const [people, setPeople] = useState(10)
  const total = amount * people

  return (
    <Panel label="随礼计算器">
      <fieldset>
        <legend className="mb-3 text-sm text-muted">每人份子钱</legend>
        <div className="flex flex-wrap gap-2">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={amount === a}
              onClick={() => setAmount(a)}
              className={`min-h-11 rounded-full border px-4 font-display text-base tabular-nums transition-colors ${
                amount === a
                  ? 'border-gold bg-gold text-ink'
                  : 'border-line text-paper hover:border-paper/40'
              }`}
            >
              ¥{a}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-7">
        <label htmlFor="people" className="flex items-baseline justify-between text-sm text-muted">
          <span>参与随礼的群友</span>
          <span className="font-display text-lg tabular-nums text-paper">{people} 人</span>
        </label>
        <input
          id="people"
          type="range"
          min={2}
          max={30}
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
          className="mt-3 h-11 w-full cursor-pointer accent-gold"
        />
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-ink p-5">
        <p className="text-xs tracking-[0.25em] text-faint">合计礼金</p>
        <p className="mt-2 font-display text-5xl tabular-nums text-gold">
          <span className="mr-1 text-2xl">¥</span>
          <AnimatedNumber value={total} />
        </p>
        <p className="mt-3 text-sm text-muted">
          约等于 <span className="text-paper">{Math.floor(total / 50)}</span> 个恋爱红包，或{' '}
          <span className="text-paper">{total.toLocaleString('zh-CN')}</span> 次颜涩罚款。
        </p>
      </div>
    </Panel>
  )
}

export function Heartbeat() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <p className="text-xs tracking-[0.3em] text-faint">群聊生命体征</p>
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-300" />
          存活
        </span>
      </div>
      <svg viewBox="0 0 600 140" className="mt-6 h-32 w-full" aria-hidden>
        <path
          d="M0 70 H140 L160 70 L175 30 L195 115 L215 15 L235 95 L250 70 H600"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="2"
          className="text-paper"
        />
        <path
          d="M0 70 H140 L160 70 L175 30 L195 115 L215 15 L235 95 L250 70 H600"
          fill="none"
          stroke="var(--color-seal)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ecg-line"
        />
      </svg>
      <div className="mt-4 flex items-end justify-between">
        <div className="flex items-center gap-3">
          <HeartbeatIcon size={28} className="text-seal" weight="duotone" />
          <div>
            <p className="text-xs text-faint">心率</p>
            <p className="font-display text-2xl">
              永不归零
            </p>
          </div>
        </div>
        <p className="text-right text-xs leading-relaxed text-faint">
          死亡申请
          <br />
          一律驳回
        </p>
      </div>
    </div>
  )
}
