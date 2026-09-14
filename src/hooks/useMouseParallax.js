import { useEffect, useState } from 'react'

export function useMouseParallax(amount = 1) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const onMove = (event) => {
      setPosition({
        x: (event.clientX / window.innerWidth - 0.5) * amount,
        y: (event.clientY / window.innerHeight - 0.5) * amount,
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [amount])

  return position
}
