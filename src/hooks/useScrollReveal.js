import { useEffect } from 'react'
import anime from 'animejs/lib/anime.es.js'

export function useScrollReveal(selector = '.reveal') {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const revealElement = (element) => {
      if (element.dataset.revealed) return
      element.dataset.revealed = 'true'
      if (reducedMotion) {
        element.classList.add('is-visible')
        return
      }
      anime({
        targets: element,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 760,
        easing: 'easeOutCubic',
      })
      element.classList.add('is-visible')
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        revealElement(entry.target)
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px 50px 0px' })

    const observedSet = new WeakSet()

    const scanAndObserve = () => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((el) => {
        if (!observedSet.has(el)) {
          observedSet.add(el)
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            revealElement(el)
          } else {
            observer.observe(el)
          }
        }
      })
    }

    // Initial pass
    scanAndObserve()

    // Watch for lazy-loaded components mounting into the DOM
    const mutationObserver = new MutationObserver(() => {
      scanAndObserve()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [selector])
}
