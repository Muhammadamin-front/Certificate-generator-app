import { useCallback, useLayoutEffect, useState } from 'react'

// Sertifikatni (baseW x baseH) konteyner o'lchamiga moslab masshtablaydi.
// Sertifikat elementi to'liq o'lchamda qoladi — faqat ko'rinishi kichrayadi.
//
// Callback-ref qaytaradi: stage elementi DOM'ga ulanganda (masalan, login'dan
// keyin) effekt qayta ishlab, ResizeObserver'ni o'rnatadi.
export function useStageScale(baseW, baseH) {
  const [node, setNode] = useState(null)
  const [scale, setScale] = useState(1)

  const ref = useCallback((el) => setNode(el), [])

  useLayoutEffect(() => {
    if (!node) return

    const fit = () => {
      const pad = node.clientWidth < 700 ? 28 : 48
      const sw = (node.clientWidth - pad) / baseW
      const sh = (node.clientHeight - pad) / baseH
      setScale(Math.max(0.18, Math.min(sw, sh, 1.15)))
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(node)
    // Shriftlar yuklangach qayta o'lchaymiz.
    document.fonts?.ready.then(fit)

    return () => ro.disconnect()
  }, [node, baseW, baseH])

  return [ref, scale]
}
