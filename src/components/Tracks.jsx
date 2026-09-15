

const tracks = [
  {
    name: 'WEB',
    description: 'Break the surface. Exploit fragile APIs, server-side logic and authorization flaws.',
    shardId: '01',
    shardImg: '/assets/shards/shard-web.png',
    topics: ['SSRF', 'LFI', 'SQLi', 'XSS'],
    challenges: '6 CHALLENGES',
    difficulty: 'MEDIUM TO HARD',
    level: 2,
  },
  {
    name: 'CRYPTO',
    description: 'Decode mathematical echoes. Turn secrets into answers.',
    shardId: '02',
    shardImg: '/assets/shards/shard-crypto.png',
    topics: ['RSA', 'AES', 'ECC', 'Lattice'],
    challenges: '6 CHALLENGES',
    difficulty: 'MEDIUM TO HARD',
    level: 2,
  },
  {
    name: 'PWN',
    description: 'Take control. Exploit, escape, and bend the system.',
    shardId: '03',
    shardImg: '/assets/shards/shard-pwn.png',
    topics: ['Buffer Overflow', 'ROP', 'Heap', 'Binary'],
    challenges: '5 CHALLENGES',
    difficulty: 'HARD',
    level: 3,
  },
  {
    name: 'REVERSE',
    description: 'Deconstruct truth from compiled binaries. Understand. Rebuild.',
    shardId: '04',
    shardImg: '/assets/shards/shard-reverse.png',
    topics: ['Ghidra', 'IDA', 'Static Analysis', 'Deobfuscation'],
    challenges: '6 CHALLENGES',
    difficulty: 'MEDIUM TO HARD',
    level: 2,
  },
  {
    name: 'FORENSICS',
    description: 'Trace the truth. Find the evidence others miss.',
    shardId: '05',
    shardImg: '/assets/shards/shard-forensics.png',
    topics: ['PCAP', 'Memory', 'Artifacts', 'Log Analysis'],
    challenges: '5 CHALLENGES',
    difficulty: 'MEDIUM',
    level: 2,
  },
  {
    name: 'OSINT',
    description: 'The world leaves clues. Find them.',
    shardId: '06',
    shardImg: '/assets/shards/shard-osint.png',
    topics: ['Metadata', 'Recon', 'Social', 'Geolocation'],
    challenges: '5 CHALLENGES',
    difficulty: 'EASY TO MEDIUM',
    level: 1,
  },
  {
    name: 'MISC',
    description: 'Expect the unexpected.',
    shardId: '07',
    shardImg: '/assets/shards/shard-misc.png',
    topics: ['Stego', 'Hardware', 'Programming', 'Creative'],
    challenges: '5 CHALLENGES',
    difficulty: 'VARIES',
    level: 2,
    isCentered: true,
  },
]

export default function Tracks() {
  const tilt = (event) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--rx', `${((event.clientY - rect.top) / rect.height - 0.5) * -6}deg`)
    card.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - 0.5) * 8}deg`)
  }

  return (
    <section id="tracks" className="tracks cinematic-tracks">
      {/* Background Atmosphere Elements */}
      <div className="tracks-realm-overlay" aria-hidden="true" />
      
      {/* Floating Embers in Background */}
      <div className="tracks-embers" aria-hidden="true">
        <span className="ember ember--1" />
        <span className="ember ember--2" />
        <span className="ember ember--3" />
        <span className="ember ember--4" />
        <span className="ember ember--5" />
        <span className="ember ember--6" />
      </div>

      <div className="tracks-shell">
        {/* Cinematic Header */}
        <div className="tracks-cinematic-header reveal">
          <div className="header-title-block">
            <span className="section-kicker">02 / CHALLENGE TRACKS</span>
            <h2>
              CHALLENGE <em>TRACKS</em>
            </h2>
          </div>
        </div>

        {/* 3-Column Card Grid matching Reference */}
        <div className="track-grid-cinematic">
          {tracks.map((track) => (
            <article
              className={`soul-shard-card reveal ${track.isCentered ? 'soul-shard-card--centered' : ''}`}
              onMouseMove={tilt}
              onMouseLeave={(e) => {
                e.currentTarget.style.removeProperty('--rx')
                e.currentTarget.style.removeProperty('--ry')
              }}
              key={track.name}
            >
              {/* Card Top Row: Shard ID & Arrow Button */}
              <div className="shard-top-row">
                <span className="shard-badge">SHARD // {track.shardId}</span>
              </div>

              {/* Large Glowing Orange Crystal Shard (Emerging & Overlapping) */}
              <div className="shard-crystal-stage" aria-hidden="true">
                <div className="shard-crystal-glow" />
                <img
                  src={track.shardImg}
                  alt={`${track.name} Soul Fragment Shard`}
                  className="shard-crystal-img"
                  loading="lazy"
                />
              </div>

              {/* Shard Content */}
              <div className="shard-body">
                <h3 className="shard-name">{track.name}</h3>

                {/* Technical Tags */}
                <div className="shard-tags">
                  {track.topics.map((topic) => (
                    <span key={topic} className="shard-tag-pill">{topic}</span>
                  ))}
                </div>

                {/* Metadata Row: Difficulty & Challenges */}
                <div className="shard-meta-row">
                  <div className="shard-difficulty">
                    <div className="diff-dashes" aria-label={`Difficulty level ${track.level} of 3`}>
                      <i className={track.level >= 1 ? 'active' : ''} />
                      <i className={track.level >= 2 ? 'active' : ''} />
                      <i className={track.level >= 3 ? 'active' : ''} />
                    </div>
                    <span className="diff-text">{track.difficulty}</span>
                  </div>

                  <span className="shard-challenge-count">
                    {track.challenges}
                  </span>
                </div>


              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
