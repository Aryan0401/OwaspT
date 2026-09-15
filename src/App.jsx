import { lazy, Suspense, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SoulCursor from './components/SoulCursor'
import RulesModal from './components/RulesModal'
import RegistrationModal from './components/RegistrationModal'
import { useScrollReveal } from './hooks/useScrollReveal'
import { sfx } from './utils/audio'

// Lazy-load below-the-fold content
const About      = lazy(() => import('./components/About'))
const Tracks     = lazy(() => import('./components/Tracks'))
const Timeline   = lazy(() => import('./components/Timeline'))
const Prizes     = lazy(() => import('./components/Prizes'))
const Register   = lazy(() => import('./components/Register'))
const Sponsors   = lazy(() => import('./components/Sponsors'))
const Footer     = lazy(() => import('./components/Footer'))

function Cursor() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const isPointerFine = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches
    setEnabled(isPointerFine)

    if (!isPointerFine) return undefined

    const dot = document.querySelector('.cursor-dot')
    const ring = document.querySelector('.cursor-ring')
    if (!dot || !ring) return undefined

    let x = -100
    let y = -100
    let ringX = -100
    let ringY = -100
    let frame

    const move = (event) => {
      x = event.clientX
      y = event.clientY
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    const animate = () => {
      ringX += (x - ringX) * 0.18
      ringY += (y - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', move)
    animate()

    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
    }
  }, [])

  return enabled ? (
    <>
      <span className="cursor-dot" />
      <span className="cursor-ring" />
      <SoulCursor />
    </>
  ) : null
}

export default function App() {
  useScrollReveal()

  const [rulesOpen, setRulesOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    let lastHovered = null

    const handleClick = (e) => {
      const target = e.target.closest('button, a, [role="button"], .soul-shard-card, .timeline-event, .stat, .prize-card')
      if (target) {
        sfx.playClick()
      }
    }

    const handlePointerOver = (e) => {
      const target = e.target.closest('button, a, [role="button"], .soul-shard-card, .timeline-filter-btn, .prize-card, .stat, .sponsor-card')
      if (target && target !== lastHovered) {
        lastHovered = target
        sfx.playHover()
      }
    }

    const handlePointerOut = (e) => {
      if (lastHovered && !e.target.closest('button, a, [role="button"], .soul-shard-card, .timeline-filter-btn, .prize-card, .stat, .sponsor-card')) {
        lastHovered = null
      }
    }

    window.addEventListener('click', handleClick, { passive: true })
    window.addEventListener('pointerover', handlePointerOver, { passive: true })
    window.addEventListener('pointerout', handlePointerOut, { passive: true })

    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('pointerover', handlePointerOver)
      window.removeEventListener('pointerout', handlePointerOut)
    }
  }, [])

  const handleOpenRegister = () => setRegisterOpen(true)
  const handleOpenRules = () => setRulesOpen(true)

  return (
    <>
      <Cursor />
      <div className="grain" />
      
      <Navbar
        onOpenRegister={handleOpenRegister}
        onOpenRules={handleOpenRules}
      />

      <main>
        <Hero
          onOpenRegister={handleOpenRegister}
          onOpenRules={handleOpenRules}
        />

        <Suspense fallback={<div className="section-loader" />}>
          <About />
          <Tracks />
          <Timeline />
          <Prizes />
          <Register onOpenRegister={handleOpenRegister} />
          <Sponsors />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer onOpenRules={handleOpenRules} />
      </Suspense>

      <RulesModal
        isOpen={rulesOpen}
        onClose={() => setRulesOpen(false)}
      />

      <RegistrationModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </>
  )
}
