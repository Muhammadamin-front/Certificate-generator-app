import { useElapsedTimer } from '../hooks/useElapsedTimer.js'
import { useCycle } from '../hooks/useCycle.js'
import { STAGES, FACTS } from '../data/loadingContent.js'

export default function LoadingOverlay() {
  const ms = useElapsedTimer()
  const stage = useCycle(STAGES.length, 900)
  const fact = useCycle(FACTS.length, 2600)

  const seconds = (ms / 1000).toFixed(2)
  // Progress halqasi ~5s ichida 0→95% gacha sekin to'ladi (taxminiy).
  const pct = Math.min(95, (ms / 5000) * 95)
  const R = 52
  const C = 2 * Math.PI * R
  const dash = (pct / 100) * C

  return (
    <div className="overlay">
      <div className="overlay__card">
        <div className="overlay__seal">
          <svg viewBox="0 0 140 140" className="overlay__ring">
            <circle className="overlay__ring-bg" cx="70" cy="70" r={R} />
            <circle
              className="overlay__ring-fg"
              cx="70"
              cy="70"
              r={R}
              strokeDasharray={`${dash} ${C}`}
            />
          </svg>
          <div className="overlay__coin">Z·X</div>
        </div>

        <div className="overlay__timer">{seconds}s</div>
        <div className="overlay__stage">{STAGES[stage]}</div>

        <div className="overlay__dots">
          {STAGES.map((_, i) => (
            <span
              key={i}
              className={
                'overlay__dot' + (i === stage ? ' overlay__dot--on' : '')
              }
            />
          ))}
        </div>

        <div className="overlay__fact" key={fact}>
          {FACTS[fact]}
        </div>
      </div>
    </div>
  )
}
