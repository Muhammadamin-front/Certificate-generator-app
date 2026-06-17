import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const PORT = process.env.PORT || 3001
const ADMIN_LOGIN = process.env.ADMIN_LOGIN
const ADMIN_HASH = process.env.ADMIN_PASSWORD_HASH
const JWT_SECRET = process.env.JWT_SECRET
const TOKEN_TTL = process.env.TOKEN_TTL || '12h'

if (!ADMIN_LOGIN || !ADMIN_HASH || !JWT_SECRET) {
  console.error(
    '✗ .env to‘liq emas. ADMIN_LOGIN, ADMIN_PASSWORD_HASH, JWT_SECRET kerak.\n' +
      '  Namuna uchun: cp .env.example .env  va  npm run hash',
  )
  process.exit(1)
}

const app = express()
app.use(cors())
app.use(express.json())

// Auth javoblari hech qachon keshlanmasligi kerak.
app.use('/api', (_req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

// Oddiy brute-force himoyasi: bir IP uchun urinishlarni cheklash.
const attempts = new Map() // ip -> { count, ts }
const WINDOW = 15 * 60 * 1000
const MAX_TRIES = 10

function rateLimited(ip) {
  const now = Date.now()
  const rec = attempts.get(ip)
  if (!rec || now - rec.ts > WINDOW) {
    attempts.set(ip, { count: 0, ts: now })
    return false
  }
  return rec.count >= MAX_TRIES
}

function bumpAttempts(ip) {
  const rec = attempts.get(ip) || { count: 0, ts: Date.now() }
  rec.count += 1
  attempts.set(ip, rec)
}

app.post('/api/login', async (req, res) => {
  const ip = req.ip
  if (rateLimited(ip)) {
    return res
      .status(429)
      .json({ error: 'Juda ko‘p urinish. Birozdan so‘ng qayta urining.' })
  }

  const { login, password } = req.body || {}
  const okLogin = typeof login === 'string' && login === ADMIN_LOGIN
  const okPass =
    okLogin && (await bcrypt.compare(String(password || ''), ADMIN_HASH))

  if (!okLogin || !okPass) {
    bumpAttempts(ip)
    return res.status(401).json({ error: 'Login yoki parol noto‘g‘ri' })
  }

  attempts.delete(ip)
  const token = jwt.sign({ role: 'admin', sub: login }, JWT_SECRET, {
    expiresIn: TOKEN_TTL,
  })
  res.json({ token })
})

app.get('/api/verify', (req, res) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    res.json({ ok: true, role: payload.role })
  } catch {
    res.status(401).json({ ok: false })
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`✓ Auth server ishlayapti: http://localhost:${PORT}`)
})
