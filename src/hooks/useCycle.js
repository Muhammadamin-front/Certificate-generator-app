import { useEffect, useState } from 'react'

// 0..length-1 indekslarini `delay` ms oralig'ida aylantiradi.
export function useCycle(length, delay) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (length <= 0) return
    const id = setInterval(() => {
      setIndex((v) => (v + 1) % length)
    }, delay)
    return () => clearInterval(id)
  }, [length, delay])

  return index
}
