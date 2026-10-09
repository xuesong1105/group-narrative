import { MotionConfig } from 'motion/react'
import { LedgerProvider } from './ledger'
import { Chapter } from './components/Chapter'
import { Epilogue } from './components/Epilogue'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Prologue } from './components/Prologue'
import { rules } from './rules'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LedgerProvider>
      <div id="top" className="grain">
        <Nav />
        <main>
          <Hero />
          <Prologue />
          {rules.map((rule) => (
            <Chapter key={rule.no} rule={rule} />
          ))}
        </main>
        <Epilogue />
      </div>
      </LedgerProvider>
    </MotionConfig>
  )
}
