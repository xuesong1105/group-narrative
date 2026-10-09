import { motion, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { rules } from '../rules'

function useActiveChapter() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number(entry.target.getAttribute('data-chapter')))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    const onScroll = () => {
      const first = sections[0]
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) setActive(0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return active
}

export function Nav() {
  const active = useActiveChapter()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  const current = rules.find((r) => r.no === active)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex min-h-11 items-center gap-2 font-serif text-base font-semibold">
            <span className="flex size-7 items-center justify-center rounded-md bg-seal text-sm text-gold">规</span>
            群规
          </a>
          <p className="text-sm text-muted" aria-live="polite">
            {current ? (
              <>
                <span className="hidden sm:inline">{current.title} · </span>
                <span className="font-display tabular-nums text-paper">{String(active).padStart(2, '0')}</span>
                <span className="text-faint"> / 12</span>
              </>
            ) : (
              <span className="text-faint">十二条 · 编年史</span>
            )}
          </p>
        </div>
        <motion.div style={{ scaleX }} className="h-px origin-left bg-seal" />
      </header>

      <nav
        aria-label="章节导航"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 xl:flex"
      >
        {rules.map((r) => {
          const isActive = r.no === active
          return (
            <a
              key={r.no}
              href={`#rule-${r.no}`}
              aria-label={`${r.cn}：${r.title}`}
              aria-current={isActive ? 'true' : undefined}
              className="group flex h-7 items-center justify-end gap-3"
            >
              <span
                className={`whitespace-nowrap text-xs transition-all duration-300 ${
                  isActive ? 'text-paper opacity-100' : 'translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                }`}
              >
                {r.title}
              </span>
              <span
                className={`h-px transition-all duration-300 ${isActive ? 'w-8 bg-seal' : 'w-4 bg-faint group-hover:w-6 group-hover:bg-paper'}`}
              />
            </a>
          )
        })}
      </nav>
    </>
  )
}
