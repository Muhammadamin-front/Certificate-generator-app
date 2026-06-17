import { useCallback, useEffect, useState } from 'react'
import { apiLogin, apiVerify } from '../utils/api.js'

const TOKEN_KEY = 'zx_admin_token'

function readToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

function writeToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignore */
  }
}

// Autentifikatsiya holatini boshqaradi: token saqlanadi va serverda tekshiriladi.
export function useAuth() {
  const [authed, setAuthed] = useState(false)
  // Token mavjud bo'lsa, dastlab uni serverda tekshiramiz (splash ko'rsatiladi).
  const [checking, setChecking] = useState(() => !!readToken())

  // Faqat mount'da: saqlangan tokenni serverda tasdiqlaymiz.
  useEffect(() => {
    const token = readToken()
    if (!token) return // checking allaqachon false

    let alive = true
    apiVerify(token).then((ok) => {
      if (!alive) return
      if (ok) setAuthed(true)
      else writeToken('')
      setChecking(false)
    })
    return () => {
      alive = false
    }
  }, [])

  const login = useCallback(async (loginValue, password) => {
    const token = await apiLogin(loginValue, password)
    writeToken(token)
    setAuthed(true)
  }, [])

  const logout = useCallback(() => {
    writeToken('')
    setAuthed(false)
  }, [])

  return { authed, checking, login, logout }
}
