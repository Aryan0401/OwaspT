import { ShieldCheck, Zap, Globe, Award } from 'lucide-react'

const stats = [
  ['7+', 'CHALLENGE TRACKS'],
  ['1,500+', 'ESTIMATED HACKERS'],
  ['₹75,000+', 'PRIZE POOL & PERKS'],
  ['36 HRS', 'CONTINUOUS SIEGE'],
]

const features = [
  { icon: Zap, title: 'DYNAMIC SCORING' },
  { icon: Globe, title: 'GLOBAL COMPETITION' },
  { icon: ShieldCheck, title: 'CLOUD SANDBOXES' },
  { icon: Award, title: 'OFFICIAL BADGES' },
]

export default function About() {
  return (
    <section id="about" className="about section-shell">
      <div className="section-kicker reveal">01 / THE INVITATION</div>
      <div className="about-grid">
        <div className="about-copy reveal">
          <h2>ENTER THE<br /><em>SOUL REALM</em></h2>
        </div>
        <div className="about-detail reveal">
          <p>
            A relentless Capture The Flag siege pushing the boundaries of offensive security and vulnerability research. Race the clock to reclaim shattered digital souls across encrypted networks.
          </p>
        </div>
      </div>

      <div className="stat-row reveal">
        {stats.map(([value, label]) => (
          <div className="stat" key={label}>
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="about-features-grid reveal">
        {features.map((feat) => {
          const Icon = feat.icon
          return (
            <div className="about-feature-card" key={feat.title}>
              <div className="feat-icon-wrap">
                <Icon size={20} />
              </div>
              <h3>{feat.title}</h3>
            </div>
          )
        })}
      </div>
    </section>
  )
}
