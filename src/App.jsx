import { useMemo, useRef, useState } from 'react'
import Certificate from './components/Certificate.jsx'
import LoadingOverlay from './components/LoadingOverlay.jsx'
import Login from './components/Login.jsx'
import Splash from './components/Splash.jsx'
import { exportPng, exportPdf } from './utils/export.js'
import {
  buildFileName,
  displayToIso,
  isoToDisplay,
  randomCertNo,
  todayStr,
} from './utils/format.js'
import { useAuth } from './hooks/useAuth.js'
import { useStageScale } from './hooks/useStageScale.js'
import { FIELDS } from './data/fields.js'
import { CERT_W, CERT_H, defaultCertData } from './data/certDefaults.js'

export default function App() {
  const { authed, checking, login, logout } = useAuth()

  const certRef = useRef(null)
  const [stageRef, scale] = useStageScale(CERT_W, CERT_H)
  const [busy, setBusy] = useState(false)
  const [data, setData] = useState(defaultCertData)

  const fileName = useMemo(() => buildFileName(data.fullName), [data.fullName])

  const update = (key) => (e) =>
    setData((d) => ({ ...d, [key]: e.target.value }))

  const runExport = async (kind) => {
    if (!certRef.current || busy) return
    setBusy(true)
    // Animatsiya ko'rinib turishi uchun bir lahza kutamiz, so'ng og'ir render.
    await new Promise((r) => setTimeout(r, 1200))
    try {
      if (kind === 'png') await exportPng(certRef.current, fileName)
      else await exportPdf(certRef.current, fileName)
    } catch (err) {
      console.error(err)
      alert('Xatolik yuz berdi: ' + (err?.message || err))
    } finally {
      setBusy(false)
    }
  }

  if (checking) return <Splash />
  if (!authed) return <Login onLogin={login} />

  return (
    <div className="app">
      <aside className="panel">
        <div className="panel__brand">
          <span className="panel__logo">Z·X</span>
          <div>
            <h1>AURUM Sertifikat</h1>
            <p>Admin paneli</p>
          </div>
          <button
            className="panel__logout"
            type="button"
            onClick={logout}
            title="Chiqish"
          >
            ⎋
          </button>
        </div>

        <div className="panel__form">
          {FIELDS.map((f) =>
            f.type === 'date' ? (
              <label className="field" key={f.key}>
                <span>{f.label}</span>
                <input
                  type="date"
                  value={displayToIso(data[f.key])}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      [f.key]: isoToDisplay(e.target.value),
                    }))
                  }
                />
              </label>
            ) : (
              <label className="field" key={f.key}>
                <span>{f.label}</span>
                <input
                  type="text"
                  value={data[f.key]}
                  placeholder={f.placeholder}
                  onChange={update(f.key)}
                />
              </label>
            ),
          )}

          <div className="panel__row">
            <button
              className="btn btn--ghost"
              type="button"
              onClick={() => setData((d) => ({ ...d, certNo: randomCertNo() }))}
            >
              ↻ Yangi raqam
            </button>
            <button
              className="btn btn--ghost"
              type="button"
              onClick={() => setData((d) => ({ ...d, date: todayStr() }))}
            >
              📅 Bugun
            </button>
          </div>
        </div>

        <div className="panel__actions">
          <button
            className="btn btn--gold"
            type="button"
            disabled={busy}
            onClick={() => runExport('png')}
          >
            ⬇ PNG yuklab olish
          </button>
          <button
            className="btn btn--dark"
            type="button"
            disabled={busy}
            onClick={() => runExport('pdf')}
          >
            ⬇ PDF yuklab olish
          </button>
        </div>

        <p className="panel__hint">
          Yuqori sifat: ~3360px PNG · A4 landshaft PDF
        </p>
      </aside>

      <main className="stage" ref={stageRef}>
        <div
          className="stage__scaler"
          style={{ width: CERT_W * scale, height: CERT_H * scale }}
        >
          <div className="stage__inner" style={{ transform: `scale(${scale})` }}>
            <Certificate ref={certRef} data={data} />
          </div>
        </div>
      </main>

      {busy ? <LoadingOverlay /> : null}
    </div>
  )
}
