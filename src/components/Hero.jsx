import { lazy, Suspense, useEffect, useState } from 'react'
import anime from 'animejs/lib/anime.es.js'
import { ArrowDown, ArrowUpRight, Mouse, Rotate3D } from 'lucide-react'
import MagicRings from './MagicRings'

const SoulStoneScene = lazy(() => import('./SoulStoneScene'))
const EVENT_DATE = '[PLACEHOLDER_EVENT_DATE]'
const placeholderTime = { days: '28', hours: '14', minutes: '32', seconds: '17' }

function getTimeLeft() {
  if (EVENT_DATE.startsWith('[')) return placeholderTime
  const difference = new Date(EVENT_DATE).getTime() - Date.now()
  if (Number.isNaN(difference) || difference <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' }
  return {
    days: String(Math.floor(difference / 86400000)).padStart(2, '0'),
    hours: String(Math.floor((difference / 3600000) % 24)).padStart(2, '0'),
    minutes: String(Math.floor((difference / 60000) % 60)).padStart(2, '0'),
    seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
  }
}

function MagneticButton({ children, className = '', onClick }) {
  const onMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const button = event.currentTarget
    const bounds = button.getBoundingClientRect()
    anime.remove(button)
    anime({ targets: button, translateX: (event.clientX - bounds.left - bounds.width / 2) * 0.12, translateY: (event.clientY - bounds.top - bounds.height / 2) * 0.18, duration: 260, easing: 'easeOutQuad' })
  }
  const onLeave = (event) => anime({ targets: event.currentTarget, translateX: 0, translateY: 0, duration: 540, easing: 'easeOutElastic(1, .45)' })
  return <button className={`button-magnetic ${className}`} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</button>
}

export default function Hero() {
  const [time, setTime] = useState(getTimeLeft)
  useEffect(() => {
    const interval = window.setInterval(() => setTime(getTimeLeft()), 1000)
    return () => window.clearInterval(interval)
  }, [])
  const scrollToRegister = () => document.querySelector('#register')?.scrollIntoView({ behavior: 'smooth' })
  const units = [['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']]

  return (
    <section id="home" className="hero">
      <div className="hero-magic-rings" aria-hidden="true">
        <MagicRings
          colorTwo="#ff6f00ff"
          color="#FFB347"
          ringCount={2}
          speed={0.7}
          attenuation={25}
          lineThickness={1}
          baseRadius={0.28}
          radiusStep={0.16}
          scaleRate={0.1}
          opacity={0.8}
          blur={0}
          noiseAmount={0}
          rotation={0}
          ringGap={1.9}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.25}
          parallax={0.05}
          clickBurst
          centerOffset={[0, 0.055]}
          targetSelector=".scene, .stone-fallback"
        />
      </div>
      <div className="hero-horizon" />
      <div className="portal portal--core" />
      <div className="monolith monolith--left" /><div className="monolith monolith--right" />
      <div className="hero-cliffs hero-cliffs--far" /><div className="hero-cliffs hero-cliffs--near" />
      <div className="stone-pedestal" />
      <Suspense fallback={<div className="stone-fallback" aria-hidden="true"><i /></div>}><SoulStoneScene /></Suspense>
      <div className="stone-interaction-hint"><Rotate3D size={13} /> DRAG TO ROTATE</div>
      <div className="soul soul--one" /><div className="soul soul--two" /><div className="soul soul--three" />
      <p className="edge-copy edge-copy--left">IN A<br />DIGITAL REALM,<br />EVERY FLAG<br /><em>HOLDS A SOUL</em></p>
      <p className="edge-copy edge-copy--right">SOME<br />CHALLENGES<br />COST MORE<br />THAN JUST<br /><em>SKILLS</em></p>
      <div className="hero-content">
        <div className="eyebrow"><span /> OWASP PCCOE PRESENTS <span /></div>
        <h1><span>ByteMe</span> <strong>CTF</strong></h1>
        <p className="hero-tagline">TRAP THE FLAG. <i>FREE THE SOUL.</i></p>
        <div className="countdown" aria-label={EVENT_DATE.startsWith('[') ? 'Example countdown values' : 'Event countdown'}>
          {units.map(([key, label]) => <div className="time-block" key={key}><b>{time[key]}</b><span>{label}</span></div>)}
        </div>
        <MagneticButton className="hero-cta" onClick={scrollToRegister}>REGISTER NOW <ArrowUpRight size={17} /></MagneticButton>
      </div>
      <div className="hero-bottom-labels"><span>FIND</span><i /><span>SOLVE</span><i /><span>RECLAIM</span></div>
      <button className="scroll-cue" onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll to explore"><Mouse size={19} /><small>SCROLL TO EXPLORE</small><ArrowDown size={14} /></button>
    </section>
  )
}

export { MagneticButton }
