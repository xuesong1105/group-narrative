import { spawn } from 'node:child_process'

const children = [
  spawn(
    process.execPath,
    ['--experimental-strip-types', '--disable-warning=ExperimentalWarning', 'server/index.ts'],
    { stdio: 'inherit', env: { ...process.env, PORT: '43129' } },
  ),
  spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '0.0.0.0', '--port', '43127'], {
    stdio: 'inherit',
  }),
]

function stop() {
  for (const child of children) child.kill('SIGTERM')
}

process.on('SIGINT', stop)
process.on('SIGTERM', stop)

for (const child of children) {
  child.on('exit', (code) => {
    stop()
    process.exit(code ?? 0)
  })
}
