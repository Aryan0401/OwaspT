import { lazy, Suspense, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { useScrollReveal } from './hooks/useScrollReveal'

// Lazy-load everything below the fold
const About    = lazy(() => import('./components/About'))
const Lore     = lazy(() => import('./components/Lore'))
const Tracks   = lazy(() => import('./components/Tracks'))
const Timeline = lazy(() => import('./components/Timeline'))
const Prizes   = lazy(() => import('./components/Prizes'))
const FAQ      = lazy(() => import('./components/FAQ'))
const Register = lazy(() => import('./components/Register'))
const Sponsors = lazy(() => import('./components/Sponsors'))
const Footer   = lazy(() => import('./components/Footer'))


function Cursor() {
  const [enabled] = useState(() => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches)
  useEffect(() => {
    if (!enabled) return undefined
    const dot = document.querySelector('.cursor-dot')
    const ring = document.querySelector('.cursor-ring')
    let x = -100; let y = -100; let ringX = -100; let ringY = -100; let frame
    const move = (event) => { x = event.clientX; y = event.clientY; dot.style.transform = `translate3d(${x}px, ${y}px, 0)` }
    const animate = () => { ringX += (x - ringX) * 0.16; ringY += (y - ringY) * 0.16; ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`; frame = requestAnimationFrame(animate) }
    window.addEventListener('pointermove', move); animate()
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(frame) }
  }, [enabled])
  return enabled ? <><span className="cursor-dot" /><span className="cursor-ring" /></> : null
}

export default function App() {
  useScrollReveal()
  return <>
    <Cursor />
    <div className="grain" />
    <Navbar />
    <main>
      <Hero />
      <Suspense fallback={null}>
        <About /><Lore /><Tracks /><Timeline /><Prizes /><FAQ /><Register /><Sponsors />
      </Suspense>
    </main>
    <Suspense fallback={null}><Footer /></Suspense>
  </>
}
