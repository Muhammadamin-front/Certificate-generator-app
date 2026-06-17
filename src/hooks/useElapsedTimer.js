import { useEffect, useRef, useState } from 'react'

// Komponent mount bo'lganidan beri o'tgan vaqtni (ms) jonli qaytaradi.
export function useElapsedTimer() {
  const [ms, setMs] = useState(0)
  const rafRef = useRef(0)
  const startRef = useRef(0)

  useEffect(() => {
    startRef.current = performance.now()

    const tick = () => {
      setMs(performance.now() - startRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return ms
}
