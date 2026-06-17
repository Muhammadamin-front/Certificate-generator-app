import { useState } from 'react'

// Backend orqali admin autentifikatsiyasi. `onLogin` promise qaytaradi.
export default function Login({ onLogin }) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      await onLogin(login.trim(), password)
    } catch (err) {
      setError(err?.message || 'Kirishda xatolik yuz berdi')
      setShake(true)
      setTimeout(() => setShake(false), 450)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="login">
      <div className="login__glow" />
      <form
        className={'login__card' + (shake ? ' login__card--shake' : '')}
        onSubmit={submit}
      >
        <div className="login__logo">Z·X</div>
        <h1 className="login__brand">Z.X&nbsp;AURUM</h1>
        <p className="login__sub">— LOGISTIC —</p>
        <div className="login__rule" />

        <h2 className="login__title">Admin kirish</h2>
        <p className="login__hint">Tizimga faqat administrator kira oladi</p>

        <label className="login__field">
          <span>Login</span>
          <input
            type="text"
            autoComplete="username"
            value={login}
            placeholder="Login"
            disabled={busy}
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>

        <label className="login__field">
          <span>Parol</span>
          <div className="login__pass">
            <input
              type={show ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              placeholder="Parol"
              disabled={busy}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="login__eye"
              onClick={() => setShow((s) => !s)}
              tabIndex={-1}
            >
              {show ? '🙈' : '👁'}
            </button>
          </div>
        </label>

        {error ? <div className="login__error">⚠ {error}</div> : null}

        <button
          type="submit"
          className="btn btn--gold login__submit"
          disabled={busy}
        >
          {busy ? 'Tekshirilmoqda…' : 'Kirish'}
        </button>
      </form>
    </div>
  )
}
