import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react'
import { sfx } from '../utils/audio'

export default function Navbar({ onOpenRegister, onOpenRules }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [muted, setMuted] = useState(() => sfx.isMuted())

  const leftNavLinks = [
    { id: 'about', label: 'About', index: '01' },
    { id: 'tracks', label: 'Tracks', index: '02' },
    { id: 'timeline', label: 'Timeline', index: '03' },
    { id: 'prizes', label: 'Prizes', index: '04' },
  ]
  const rightNavLinks = [
    { id: 'rules', label: 'Rules', index: '05', isModal: true },
    { id: 'sponsors', label: 'Partners', index: '06' },
  ]

  const allLinks = [...leftNavLinks, ...rightNavLinks]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32)

      const sections = ['home', 'about', 'tracks', 'timeline', 'prizes', 'register', 'sponsors']
      const scrollPos = window.scrollY + 200
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = (id, isModal = false) => {
    setMobileMenuOpen(false)
    if (isModal && id === 'rules') {
      onOpenRules?.()
      return
    }
    const element = document.querySelector(`#${id.toLowerCase()}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleSound = () => {
    const next = !muted
    setMuted(next)
    sfx.setMuted(next)
    if (!next) {
      sfx.playSuccess()
    }
  }

  return (
    <>
      {/* Top Main Navbar */}
      <header className={`navbar ${scrolled ? 'navbar--solid' : ''}`}>
        <button className="brand" onClick={() => navigate('home')} aria-label="Go to ByteMe CTF home">
          <div className="brand-logo-wrap">
            <img src="/assets/owasp-logo.png" alt="OWASP Logo" className="brand-logo-img" width="32" height="32" />
            <div className="brand-text">
              <span>OWASP</span>
              <small>PCCOE</small>
            </div>
          </div>
        </button>

        <div className="nav-actions">
          {/* Audio FX Toggle */}
          <button
            className={`nav-audio-btn ${muted ? 'nav-audio-btn--muted' : ''}`}
            onClick={toggleSound}
            aria-label={muted ? 'Enable sound effects' : 'Mute sound effects'}
            title={muted ? 'Enable Cyber SFX' : 'Mute Cyber SFX'}
          >
            {muted ? (
              <VolumeX size={15} />
            ) : (
              <>
                <Volume2 size={15} />
                <span className="audio-bars" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </>
            )}
            <span className="audio-label">{muted ? 'SFX: OFF' : 'SFX: ON'}</span>
          </button>

          <span className="nav-ember-wrap">
            <button
              className="nav-register"
              onClick={() => onOpenRegister ? onOpenRegister() : navigate('register')}
              aria-label="Register team"
            >
              <span className="nav-register-beacon" aria-hidden="true" />
              <span>REGISTER</span>
              <span className="nav-register-arrow" aria-hidden="true">↗</span>
            </button>
            <span className="nav-ember-glow" aria-hidden="true" />
            <span className="nav-ember-bloom" aria-hidden="true" />
          </span>

          <button
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Vertical Navigation Bar — Left Side */}
      <nav className="vertical-nav vertical-nav--left desktop-only" aria-label="Left Side Navigation">
        <div className="vertical-nav-indicator" />
        <div className="vertical-nav-group">
          {leftNavLinks.map((link) => (
            <button
              key={link.id}
              className={`vertical-nav-btn ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => navigate(link.id, link.isModal)}
            >
              <span className="vnav-label">{link.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Vertical Navigation Bar — Right Side */}
      <nav className="vertical-nav vertical-nav--right desktop-only" aria-label="Right Side Navigation">
        <div className="vertical-nav-indicator" />
        <div className="vertical-nav-group">
          {rightNavLinks.map((link) => (
            <button
              key={link.id}
              className={`vertical-nav-btn ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => navigate(link.id, link.isModal)}
            >
              <span className="vnav-label">{link.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-nav-header">
          <span className="mobile-nav-title">SIGNAL DIRECTORY</span>
          <button
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mobile-nav-links">
          {allLinks.map((link) => (
            <button
              key={link.id}
              className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => navigate(link.id, link.isModal)}
            >
              <span>{link.label}</span>
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
        <div className="mobile-nav-footer">
          <button
            className="button-magnetic mobile-register-btn"
            onClick={() => {
              setMobileMenuOpen(false)
              if (onOpenRegister) onOpenRegister()
              else navigate('register')
            }}
          >
            REGISTER FOR BYTEME CTF <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
