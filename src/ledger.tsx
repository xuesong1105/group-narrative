import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLocalState } from './hooks'

export type GroupState = {
  packets: {
    count: number
    total: number
    loves: number
    fines: number
    fineTotal: number
    recent: { id: number; nickname: string; kind: 'love' | 'fine'; amount: number; createdAt: string }[]
  }
  ex: { count: number; voters: string[] }
  gifts: { people: number; total: number; pledges: { nickname: string; amount: number }[] }
}

type Ledger = {
  nickname: string
  setNickname: (value: string) => void
  state: GroupState | null
  error: string | null
  post: (path: string, body?: Record<string, unknown>) => Promise<void>
}

const LedgerContext = createContext<Ledger | null>(null)

export function LedgerProvider({ children }: { children: ReactNode }) {
  const [nickname, setNickname] = useLocalState('qungui-nickname', '')
  const [state, setState] = useState<GroupState | null>(null)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/state')
      if (!res.ok) throw new Error('群账暂时连不上')
      setState((await res.json()) as GroupState)
      setError(null)
    } catch {
      setError('群账暂时连不上')
    }
  }, [])

  useEffect(() => {
    void refresh()
    const id = window.setInterval(() => void refresh(), 5000)
    return () => window.clearInterval(id)
  }, [refresh])

  const post = useCallback(
    async (path: string, body: Record<string, unknown> = {}) => {
      const name = nickname.trim()
      if (!name) throw new Error('先在顶栏写下你的名字')
      const res = await fetch(path, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...body, nickname: name }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(data.error || '没有记上')
      await refresh()
    },
    [nickname, refresh],
  )

  return <LedgerContext value={{ nickname, setNickname, state, error, post }}>{children}</LedgerContext>
}

export function useLedger() {
  const ledger = useContext(LedgerContext)
  if (!ledger) throw new Error('useLedger 必须在 LedgerProvider 内使用')
  return ledger
}
