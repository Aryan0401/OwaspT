import { Mail } from 'lucide-react'

const partners = [
  'OWASP PCCOE',
  'PCCOE PUNE',
  'HACK THE BOX',
  'PORTSWIGGER',
  'TRYHACKME',
  'GITHUB CAMPUS',
]

export default function Sponsors() {
  return (
    <section id="sponsors" className="sponsors section-shell">
      <div className="section-kicker reveal">THE ALLIANCE</div>
      <h2 className="reveal">PARTNERS</h2>

      <div className="sponsor-grid reveal">
        {partners.map((partner) => (
          <div className="sponsor-card" key={partner}>
            <h3>{partner}</h3>
          </div>
        ))}
      </div>

      <div className="sponsor-cta-banner reveal">
        <div className="sponsor-cta-content">
          <h4>SUPPORT CYBER DEFENDERS</h4>
        </div>
        <a
          href="mailto:owasp@pccoepune.org?subject=ByteMe%20CTF%202026%20Sponsorship%20Inquiry"
          className="button-magnetic"
        >
          <Mail size={16} /> PARTNER WITH US
        </a>
      </div>
    </section>
  )
}
