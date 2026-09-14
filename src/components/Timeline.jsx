import { useEffect, useRef } from 'react'
import anime from 'animejs/lib/anime.es.js'

const events = [
  ['01', 'REGISTRATION OPENS', '[PLACEHOLDER DATE]', 'The first signal leaves the realm.'],
  ['02', 'TEAM BRIEFING', '[PLACEHOLDER DATE]', 'Receive your instructions. Gather your crew.'],
  ['03', 'CTF BEGINS', '[PLACEHOLDER DATE]', 'The fragments wake. The hunt begins.'],
  ['04', 'CTF ENDS', '[PLACEHOLDER DATE]', 'Time folds. Submit your final flags.'],
  ['05', 'RESULTS', '[PLACEHOLDER DATE]', 'The realm reveals its champions.'],
]

export default function Timeline() {
  const line = useRef()
  useEffect(() => {
    const target = line.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        anime({ targets: target, scaleY: [0, 1], transformOrigin: 'top', duration: 1900, easing: 'easeOutExpo' })
        observer.disconnect()
      }
    }, { threshold: 0.2 })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])
  return <section id="timeline" className="timeline section-shell"><div className="timeline-intro reveal"><div className="section-kicker">04 / THE ASCENT</div><h2>THE SIGNAL<br /><em>UNFOLDS</em></h2></div><div className="timeline-list"><div className="timeline-line" ref={line} />{events.map(([number, title, date, detail], index) => <article className={`timeline-event ${index % 2 ? 'timeline-event--right' : ''} reveal`} key={title}><div className="timeline-dot" /><div className="timeline-card"><span>{number}</span><h3>{title}</h3><b>{date}</b><p>{detail}</p></div></article>)}</div></section>
}
