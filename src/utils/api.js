// Backend bilan aloqa. /api manzili Vite proksisi orqali serverga yo'naltiriladi.
const BASE = import.meta.env.VITE_API_BASE || '/api'

async function readJson(res) {
  try {
    return await res.json()
  } catch {
    return {}
  }
}

export async function apiLogin(login, password) {
  let res
  try {
    res = await fetch(`${BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    })
  } catch {
    throw new Error('Serverga ulanib bo‘lmadi. Backend ishlayaptimi?')
  }
  const data = await readJson(res)
  if (!res.ok) {
    throw new Error(data.error || 'Kirishda xatolik yuz berdi')
  }
  return data.token
}

export async function apiVerify(token) {
  if (!token) return false
  try {
    const res = await fetch(`${BASE}/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.ok
  } catch {
    return false
  }
}
