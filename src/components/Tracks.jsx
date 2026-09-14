import { Binary, Braces, Crosshair, Eye, FileSearch, KeyRound, TerminalSquare } from 'lucide-react'

const tracks = [
  ['WEB', 'Break the surface. Find what hides behind the interface.', Braces, '03'],
  ['CRYPTO', 'Decode the echoes encrypted into the void.', KeyRound, '04'],
  ['PWN', 'Take control of the systems guarding each shard.', TerminalSquare, '05'],
  ['REVERSE', 'Rebuild the truth from fractured machinery.', Binary, '06'],
  ['FORENSICS', 'Read the traces left behind in the dark.', FileSearch, '07'],
  ['OSINT', 'The realm remembers more than it should.', Eye, '02'],
  ['MISC', 'Expect the unexpected at the edge of order.', Crosshair, '01'],
]

export default function Tracks() {
  const tilt = (event) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--rx', `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`)
    card.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - 0.5) * 7}deg`)
  }
  return <section id="tracks" className="tracks section-shell"><div className="track-heading reveal"><div><div className="section-kicker">03 / SELECT A PATH</div><h2>CHALLENGE<br /><em>TRACKS</em></h2></div><p>Seven disciplines. Seven routes through a realm designed to resist you.</p></div><div className="track-grid">{tracks.map(([name, description, Icon, index]) => <article className="track-card reveal" onMouseMove={tilt} onMouseLeave={(e) => { e.currentTarget.style.removeProperty('--rx'); e.currentTarget.style.removeProperty('--ry') }} key={name}><span className="fragment-index">{index}</span><Icon size={25} strokeWidth={1.3} /><h3>{name}</h3><p>{description}</p><div className="difficulty"><i /><i /><i /><span>LEVEL // UNKNOWN</span></div></article>)}</div></section>
}
