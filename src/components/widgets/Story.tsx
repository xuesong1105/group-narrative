import { MapPin, Clock, Users } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import portrait from '../../assets/wang-huanxiao.jpg'
import { Panel } from './Panel'

const QUOTE = '所以我们要实现共产主义'

export function Quote() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-seal-deep/25 via-ink-2 to-ink-2 p-8 sm:p-12">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-2 -top-10 font-display text-[12rem] leading-none text-seal/20"
      >
        “
      </span>
      <motion.blockquote
        className="relative font-serif text-3xl leading-snug sm:text-5xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }}
        aria-label={QUOTE}
      >
        {QUOTE.split('').map((ch, i) => (
          <motion.span
            key={i}
            aria-hidden
            className={i < 2 ? 'text-gold' : ''}
            variants={{
              hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
              show: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            transition={{ duration: 0.5 }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.blockquote>
      <footer className="relative mt-10 flex items-center gap-4">
        <span className="h-px w-10 bg-paper/30" />
        <span className="text-sm text-muted">
          教练 <span className="text-faint">· 本群最幸运之人</span>
        </span>
      </footer>
    </div>
  )
}

export function Debt() {
  const rows = [
    ['债务人', '王欢笑'],
    ['债权人', '猫猫'],
    ['标的', '腿 × 1'],
    ['期限', '未约定'],
    ['利息', '按群规另计'],
  ]
  return (
    <div className="grid items-stretch gap-4 sm:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
      <figure className="relative min-h-72 overflow-hidden rounded-3xl border border-line bg-ink-3">
        <img
          src={portrait}
          alt="王欢笑，黑金队服，双臂交叉"
          className="absolute inset-0 size-full object-cover object-[78%_22%]"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/75 to-transparent px-5 pb-5 pt-16">
          <p className="text-xs tracking-[0.3em] text-gold">债务人档案</p>
          <p className="mt-1 font-serif text-2xl">王欢笑</p>
          <p className="mt-0.5 text-sm text-muted">Wang Huanxiao · CS2 · 2025</p>
        </figcaption>
      </figure>
      <Panel label="借据 · No. 006" className="h-full">
        <dl className="divide-y divide-dashed divide-line pb-16">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between py-3.5">
              <dt className="text-sm text-faint">{k}</dt>
              <dd className="font-serif text-lg">{v}</dd>
            </div>
          ))}
        </dl>
        <motion.div
          className="pointer-events-none absolute bottom-8 right-6 rounded-xl border-[3px] border-seal px-4 py-2 font-serif text-2xl font-bold tracking-widest text-seal sm:right-10"
          initial={{ opacity: 0, scale: 2.2, rotate: -4 }}
          whileInView={{ opacity: 0.9, scale: 1, rotate: -14 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.4 }}
        >
          未偿还
        </motion.div>
      </Panel>
    </div>
  )
}

export function Ticket() {
  return (
    <div className="relative">
      <div className="spot pointer-events-none absolute -top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
      <div className="relative flex overflow-hidden rounded-3xl border border-line bg-ink-2">
        <div className="flex-1 p-6 sm:p-8">
          <p className="text-xs tracking-[0.3em] text-faint">ADMIT ALL · 全体群成员</p>
          <p className="mt-4 font-serif text-3xl sm:text-4xl">猫猫 · 专场演出</p>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-faint" /> 时间：待定
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-faint" /> 地点：待定
            </li>
            <li className="flex items-center gap-3">
              <Users size={18} className="text-faint" /> 座位：已为每一位群友保留
            </li>
          </ul>
        </div>
        <div className="relative flex w-24 shrink-0 flex-col items-center justify-center border-l-2 border-dashed border-line sm:w-32">
          <span className="absolute -left-3 -top-3 size-6 rounded-full bg-ink" />
          <span className="absolute -bottom-3 -left-3 size-6 rounded-full bg-ink" />
          <span className="font-display text-5xl text-paper/90">0</span>
          <span className="mt-1 text-center text-xs leading-relaxed text-faint">
            已观看
            <br />
            次数
          </span>
        </div>
      </div>
    </div>
  )
}
