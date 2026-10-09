import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs'
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { extname, join, sep } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dataDir = join(root, 'data')
const distDir = join(root, 'dist')
mkdirSync(dataDir, { recursive: true })

const db = new DatabaseSync(join(dataDir, 'qungui.sqlite'))
db.exec(`
  CREATE TABLE IF NOT EXISTS packets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname TEXT NOT NULL,
    kind TEXT NOT NULL CHECK (kind IN ('love', 'fine')),
    amount INTEGER NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS ex_votes (
    nickname TEXT PRIMARY KEY,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS gifts (
    nickname TEXT PRIMARY KEY,
    amount INTEGER NOT NULL,
    created_at TEXT NOT NULL
  );
`)

const GIFT_AMOUNTS = new Set([200, 520, 666, 888, 1314])
const PORT = Number(process.env.PORT) || 43129

type PacketKind = 'love' | 'fine'

function send(res: ServerResponse, status: number, body: unknown) {
  const payload = JSON.stringify(body)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(payload)
}

function nicknameOf(value: unknown) {
  if (typeof value !== 'string') return null
  const name = value.trim().replace(/\s+/g, ' ')
  if (name.length < 1 || name.length > 16) return null
  if (/[\u0000-\u001f]/.test(name)) return null
  return name
}

async function readJson(req: IncomingMessage) {
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += buf.length
    if (size > 20_000) throw new Error('请求太大')
    chunks.push(buf)
  }
  if (chunks.length === 0) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as Record<string, unknown>
}

function state() {
  const totals = db.prepare(`SELECT COUNT(*) AS count, COALESCE(SUM(amount), 0) AS total FROM packets`).get() as {
    count: number
    total: number
  }
  const loves = db.prepare(`SELECT COUNT(*) AS count FROM packets WHERE kind = 'love'`).get() as { count: number }
  const fines = db.prepare(`SELECT COUNT(*) AS count, COALESCE(SUM(amount), 0) AS total FROM packets WHERE kind = 'fine'`).get() as {
    count: number
    total: number
  }
  const recent = db
    .prepare(`SELECT id, nickname, kind, amount, created_at AS createdAt FROM packets ORDER BY id DESC LIMIT 8`)
    .all()
  const voters = db.prepare(`SELECT nickname FROM ex_votes ORDER BY created_at ASC`).all() as { nickname: string }[]
  const pledges = db
    .prepare(`SELECT nickname, amount FROM gifts ORDER BY created_at ASC`)
    .all() as { nickname: string; amount: number }[]
  const giftTotal = pledges.reduce((sum, item) => sum + item.amount, 0)
  return {
    packets: {
      count: totals.count,
      total: totals.total,
      loves: loves.count,
      fines: fines.count,
      fineTotal: fines.total,
      recent,
    },
    ex: { count: voters.length, voters: voters.map((row) => row.nickname) },
    gifts: { people: pledges.length, total: giftTotal, pledges },
  }
}

function recordPacket(name: string, kind: PacketKind) {
  const amount = kind === 'love' ? 50 : 1
  db.prepare(`INSERT INTO packets (nickname, kind, amount, created_at) VALUES (?, ?, ?, ?)`).run(
    name,
    kind,
    amount,
    new Date().toISOString(),
  )
}

async function handleApi(req: IncomingMessage, res: ServerResponse, url: URL) {
  try {
    if (req.method === 'GET' && url.pathname === '/api/state') {
      send(res, 200, state())
      return
    }
    if (req.method === 'POST' && url.pathname === '/api/packets') {
      const body = await readJson(req)
      const name = nicknameOf(body.nickname)
      const kind = body.kind === 'love' || body.kind === 'fine' ? body.kind : null
      if (!name) return send(res, 400, { error: '先写下你的名字，1 到 16 个字' })
      if (!kind) return send(res, 400, { error: '红包类型不对' })
      recordPacket(name, kind)
      send(res, 201, state())
      return
    }
    if (req.method === 'POST' && url.pathname === '/api/packets/reset-fines') {
      db.prepare(`DELETE FROM packets WHERE kind = 'fine'`).run()
      send(res, 200, state())
      return
    }
    if (req.method === 'POST' && url.pathname === '/api/ex/vote') {
      const body = await readJson(req)
      const name = nicknameOf(body.nickname)
      if (!name) return send(res, 400, { error: '先写下你的名字，1 到 16 个字' })
      const result = db.prepare(`INSERT OR IGNORE INTO ex_votes (nickname, created_at) VALUES (?, ?)`).run(name, new Date().toISOString())
      if (Number(result.changes) === 0) return send(res, 409, { error: '你已经举过手了' })
      send(res, 201, state())
      return
    }
    if (req.method === 'POST' && url.pathname === '/api/ex/reset') {
      db.prepare(`DELETE FROM ex_votes`).run()
      send(res, 200, state())
      return
    }
    if (req.method === 'POST' && url.pathname === '/api/gifts') {
      const body = await readJson(req)
      const name = nicknameOf(body.nickname)
      const amount = typeof body.amount === 'number' ? body.amount : Number(body.amount)
      if (!name) return send(res, 400, { error: '先写下你的名字，1 到 16 个字' })
      if (!GIFT_AMOUNTS.has(amount)) return send(res, 400, { error: '份子钱不在可选金额里' })
      db.prepare(
        `INSERT INTO gifts (nickname, amount, created_at) VALUES (?, ?, ?)
         ON CONFLICT(nickname) DO UPDATE SET amount = excluded.amount, created_at = excluded.created_at`,
      ).run(name, amount, new Date().toISOString())
      send(res, 201, state())
      return
    }
    send(res, 404, { error: '没有这个接口' })
  } catch {
    send(res, 400, { error: '请求没能处理' })
  }
}

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
}

function serveStatic(res: ServerResponse, url: URL) {
  const relative = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).replace(/^\/+/, '')
  const rootWithSep = distDir.endsWith(sep) ? distDir : distDir + sep
  let file = join(distDir, relative)
  const inside = file === distDir || file.startsWith(rootWithSep)
  if (!inside || !existsSync(file) || !statSync(file).isFile()) {
    file = join(distDir, 'index.html')
  }
  if (!existsSync(file)) {
    send(res, 404, { error: '页面还没构建，先执行 npm run build' })
    return
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
  createReadStream(file).pipe(res)
}

const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://127.0.0.1')
  if (url.pathname.startsWith('/api/')) {
    void handleApi(req, res, url)
    return
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    send(res, 405, { error: '不支持的方法' })
    return
  }
  serveStatic(res, url)
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`群账服务 http://127.0.0.1:${PORT}`)
})
