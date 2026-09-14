import { useEffect } from 'react'
import anime from 'animejs/lib/anime.es.js'

export function useScrollReveal(selector = '.reveal') {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = [...document.querySelectorAll(selector)]
    if (!nodes.length) return undefined

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.revealed) return
        entry.target.dataset.revealed = 'true'
        if (reducedMotion) {
          entry.target.classList.add('is-visible')
          return
        }
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 760,
          easing: 'easeOutCubic',
        })
        entry.target.classList.add('is-visible')
      })
    }, { threshold: 0.14 })

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [selector])
}
