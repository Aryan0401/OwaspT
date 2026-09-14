const stats = [['7+', 'CHALLENGE CATEGORIES'], ['[PLACEHOLDER]', 'PARTICIPANTS'], ['[PLACEHOLDER]', 'PRIZE POOL']]

export default function About() {
  return <section id="about" className="about section-shell">
    <div className="section-kicker reveal">01 / THE INVITATION</div>
    <div className="about-grid">
      <div className="about-copy reveal"><p className="eyebrow eyebrow--left"><span /> AN UNFOLDING REALM</p><h2>ENTER THE<br /><em>SOUL REALM</em></h2></div>
      <div className="about-detail reveal"><p>ByteMe CTF is a cybersecurity Capture The Flag experience where teams compete to uncover hidden flags, solve complex challenges, and reclaim fragments scattered across a digital realm.</p><small>Organized by <b>OWASP PCCOE Student Chapter</b></small></div>
    </div>
    <div className="stat-row reveal">{stats.map(([value, label]) => <div className="stat" key={label}><b>{value}</b><span>{label}</span></div>)}</div>
  </section>
}
