import { Trophy, Gift, Shirt, Star, Users, Crown, Gem, Sparkles } from 'lucide-react'
import PrizeCharacter3D from './PrizeCharacter3D'

const medals = [
  {
    place: '02',
    tier: 'SILVER',
    title: 'RUNNER UP',
    tag: 'THE SECOND TO AWAKEN',
    cash: '₹25,000',
    character: 'gamora',
    characterTitle: 'GAMORA',
    characterRole: 'THE GODSLAYER',
    footerText: 'SOLVE · LEARN · RECLAIM',
    perks: [
      { text: '6-Month HTB VIP Vouchers', icon: Gift },
      { text: 'Silver Relic Trophy', icon: Trophy },
      { text: 'OWASP PCCOE Merch Kit', icon: Shirt },
      { text: 'Exclusive Hall of Fame Slot', icon: Star },
    ],
  },
  {
    place: '01',
    tier: 'GOLD',
    title: 'CHAMPION',
    tag: 'THE APEX RECLAIMER',
    cash: '₹35,000',
    character: 'thanos',
    characterTitle: 'THANOS',
    characterRole: 'THE SOUL STONE BEARER',
    footerText: 'LEGENDS · SOLVE · RECLAIM',
    perks: [
      { text: '1-Year HTB VIP+ Subscriptions', icon: Crown },
      { text: 'Golden Soul Relic Trophy', icon: Gem },
      { text: 'VIP Swag Box & Stickers', icon: Gift },
      { text: 'Interview Fast-track with Sponsors', icon: Users },
    ],
  },
  {
    place: '03',
    tier: 'BRONZE',
    title: 'THIRD PLACE',
    tag: 'THE FINAL ASCENT',
    cash: '₹15,000',
    character: 'redskull',
    characterTitle: 'RED SKULL',
    characterRole: 'THE VORMIR KEEPER',
    footerText: 'PERSIST · SOLVE · RISE',
    perks: [
      { text: '3-Month HTB VIP Vouchers', icon: Gift },
      { text: 'Bronze Relic Trophy', icon: Trophy },
      { text: 'OWASP PCCOE Merch Kit', icon: Shirt },
      { text: 'Hall of Fame Feature', icon: Star },
    ],
  },
]

export default function Prizes() {
  return (
    <section id="prizes" className="prizes section-shell">
      <div className="prize-heading reveal">
        <div className="section-kicker">04 / THE RECKONING</div>
        <h2>CLAIM YOUR<br /><em>REWARD</em></h2>
        <p className="prize-sub">
          ₹75,000 in cash bounties, certifications, and premium security subscriptions await the sharpest minds.
        </p>
      </div>

      <div className="prize-grid">
        {medals.map((medal) => {
          const isChampion = medal.place === '01'

          return (
            <article
              className={`prize-card prize-card--${isChampion ? '1' : medal.place === '02' ? '2' : '3'} reveal`}
              key={medal.title}
            >
              {/* Corner brackets */}
              <span className="card-bracket card-bracket--tl" aria-hidden="true" />
              <span className="card-bracket card-bracket--br" aria-hidden="true" />

              <div className="prize-card-header">
                <span className="prize-rank">RANK // {medal.place}</span>
                <span className={`prize-tier-badge prize-tier-badge--${medal.tier.toLowerCase()}`}>
                  {medal.tier} DIVISION <Sparkles size={10} style={{ marginLeft: 4 }} />
                </span>
              </div>

              <div className="prize-character-frame">
                <div className="prize-character-copy" aria-hidden="true">
                  <span>{medal.characterTitle}</span>
                  <small>{medal.characterRole}</small>
                </div>
                <PrizeCharacter3D character={medal.character} />
                <span className="prize-character-scanline" aria-hidden="true" />
              </div>

              <h3>{medal.title}</h3>
              <p className="prize-tag">{medal.tag}</p>
              <div className="prize-cash">{medal.cash}</div>
              <div className="prize-divider" />

              <ul className="prize-perks-list">
                {medal.perks.map((perk) => {
                  const PerkIcon = perk.icon
                  return (
                    <li key={perk.text}>
                      <PerkIcon size={16} /> <span>{perk.text}</span>
                    </li>
                  )
                })}
              </ul>

              <div className="prize-footer-text">
                {medal.footerText}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
