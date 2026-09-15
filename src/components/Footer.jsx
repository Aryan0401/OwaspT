import { ArrowUp } from 'lucide-react'

export default function Footer({ onOpenRules }) {
  return (
    <footer>
      <div className="footer-brand-col">
        <div className="footer-brand-header">
          <img src="/assets/owasp-logo.png" alt="OWASP Logo" className="footer-logo-img" width="28" height="28" />
          <h3>ByteMe <em>CTF</em></h3>
        </div>
        <p>OWASP PCCOE Student Chapter</p>
        <small className="footer-affil">
          Pimpri Chinchwad College of Engineering, Sector 26, Pradhikaran, Nigdi, Pune, Maharashtra 411044
        </small>
      </div>

      <nav className="footer-nav" aria-label="Social and resource links">
        <a href="https://instagram.com/owasp_pccoe" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://linkedin.com/company/owasp-pccoe" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/owasp-pccoe" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://discord.gg/invite/owasp-pccoe" target="_blank" rel="noopener noreferrer">
          Discord
        </a>
        <a href="mailto:owasp@pccoepune.org">
          owasp@pccoepune.org
        </a>
      </nav>

      <div className="footer-actions">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="back-to-top-btn"
          title="Return to peak"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      <div className="footer-bottom">
        <small>
          © 2026 OWASP PCCOE Student Chapter. All rights reserved. Organised for educational and offensive-security research purposes.
        </small>
        <span className="footer-tagline">
          TRAP THE FLAG. FREE THE SOUL.
        </span>
      </div>
    </footer>
  )
}
