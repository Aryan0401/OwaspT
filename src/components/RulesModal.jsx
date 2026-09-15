import { useEffect } from 'react'
import { X, ShieldAlert, Flag, Award, Terminal, Scale } from 'lucide-react'

export default function RulesModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="rules-title">
      <div className="modal-card modal-card--wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-kicker">
            <Scale size={14} /> OFFICIAL GUIDELINES
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close rules modal">
            <X size={20} />
          </button>
        </div>

        <h2 id="rules-title" className="modal-title">
          THE LAWS OF THE <em>SOUL REALM</em>
        </h2>
        <p className="modal-subtitle">
          Every participant entering ByteMe CTF agrees to uphold the integrity, fairness, and spirit of ethical cybersecurity.
        </p>

        <div className="rules-grid">
          <div className="rule-box">
            <div className="rule-box-header">
              <Flag size={18} />
              <h4>01. Flag Format</h4>
            </div>
            <p>
              All captured flags adhere to the standard format:
            </p>
            <div className="code-badge">
              <code>byteme&#123;s0ul_sh4rd_s4mpl3&#125;</code>
            </div>
            <small>Unless explicitly noted in a challenge description. Flags are case-sensitive.</small>
          </div>

          <div className="rule-box">
            <div className="rule-box-header">
              <Award size={18} />
              <h4>02. Dynamic Scoring</h4>
            </div>
            <p>
              Jeopardy-style scoring. Challenges start at <strong>500 points</strong> and decay dynamically based on solve count down to a minimum of <strong>100 points</strong>.
            </p>
            <small>First bloods on each challenge receive an additional score multiplier and custom soul flair.</small>
          </div>

          <div className="rule-box">
            <div className="rule-box-header">
              <ShieldAlert size={18} />
              <h4>03. Integrity &amp; Prohibitions</h4>
            </div>
            <ul>
              <li><strong>Zero Flag Sharing:</strong> No hints, leaks, or cross-team collusion.</li>
              <li><strong>No Infrastructure Sabotage:</strong> Do not attack competition servers, scoring engines, or other teams. Denial of Service (DoS/DDoS) is strictly forbidden.</li>
              <li><strong>No Automated Brute Force:</strong> Do not brute-force flag submission portals or platform APIs.</li>
            </ul>
          </div>

          <div className="rule-box">
            <div className="rule-box-header">
              <Terminal size={18} />
              <h4>04. Writeups &amp; Verification</h4>
            </div>
            <p>
              The top 10 teams on the leaderboard must provide clear, reproducible writeups for their solves within <strong>4 hours</strong> of the competition closing to claim prizes.
            </p>
            <small>Originality is strictly verified. Plagiarized or AI-generated junk writeups will disqualify the team.</small>
          </div>
        </div>

        <div className="modal-footer">
          <p className="modal-note">Questions? Open a ticket in the official OWASP PCCOE Discord server.</p>
          <button className="button-magnetic modal-action-btn" onClick={onClose}>
            I UNDERSTAND &amp; ACCEPT
          </button>
        </div>
      </div>
    </div>
  )
}
