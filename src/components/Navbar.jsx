import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = (id) => {
    document.querySelector(`#${id.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--solid' : ''}`}>
      <button className="brand" onClick={() => navigate('home')} aria-label="Go to ByteMe CTF home">
        <span>OWASP</span>
        <small>PCCOE Student Chapter</small>
      </button>
      <button className="nav-register" onClick={() => navigate('register')}>
        Register now <span>↗</span>
      </button>
    </header>
  )
}

