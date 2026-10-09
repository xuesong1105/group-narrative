import type { ReactNode } from 'react'

export function Panel({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-line bg-ink-2/80 p-6 sm:p-8 ${className}`}
    >
      <p className="mb-6 text-xs tracking-[0.3em] text-faint">{label}</p>
      {children}
    </div>
  )
}
