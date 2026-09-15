import { useState, useEffect } from 'react'
import { X, CheckCircle2, Shield, Copy, Check, Download, Users, ArrowRight, Sparkles } from 'lucide-react'

export default function RegistrationModal({ isOpen, onClose }) {
  const [existingReg, setExistingReg] = useState(null)
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    college: '',
    discordTag: '',
    teamSize: '2',
    experience: 'Intermediate',
    memberNames: '',
  })
  const [errors, setErrors] = useState({})
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('byteme_team_registration')
      if (saved) {
        setExistingReg(JSON.parse(saved))
      }
    } catch {
      // ignore
    }
  }, [isOpen])

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

  const validate = () => {
    const errs = {}
    if (!formData.teamName.trim()) errs.teamName = 'Team name is required'
    if (!formData.leaderName.trim()) errs.leaderName = 'Team leader name is required'
    if (!formData.leaderEmail.trim() || !formData.leaderEmail.includes('@')) {
      errs.leaderEmail = 'A valid email is required'
    }
    if (!formData.college.trim()) errs.college = 'College or organization is required'
    if (!formData.discordTag.trim()) errs.discordTag = 'Discord username is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setTimeout(() => {
      const passId = `SOUL-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
      const registration = {
        ...formData,
        passId,
        registeredAt: new Date().toISOString(),
      }
      try {
        localStorage.setItem('byteme_team_registration', JSON.stringify(registration))
      } catch {
        // ignore
      }
      setExistingReg(registration)
      setSubmitting(false)
    }, 600)
  }

  const handleCopyTicket = () => {
    if (!existingReg) return
    navigator.clipboard?.writeText(existingReg.passId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleResetRegistration = () => {
    localStorage.removeItem('byteme_team_registration')
    setExistingReg(null)
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="register-modal-title">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-kicker">
            <Users size={14} /> TEAM TRANSMISSION GATE
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close registration modal">
            <X size={20} />
          </button>
        </div>

        {existingReg ? (
          <div className="ticket-view">
            <div className="ticket-badge">
              <CheckCircle2 size={16} /> REGISTRATION CONFIRMED
            </div>
            <h2 id="register-modal-title" className="modal-title">
              SOUL CREST <em>UNLOCKED</em>
            </h2>
            <p className="modal-subtitle">
              Your squad has been granted entry into the Soul Realm. Present your access token during the opening signal.
            </p>

            <div className="digital-ticket">
              <div className="ticket-header">
                <div className="ticket-brand">
                  <Shield size={20} />
                  <div>
                    <b>BYTEME CTF</b>
                    <small>OWASP PCCOE CHAPTER</small>
                  </div>
                </div>
                <span className="ticket-status">ACTIVE CODENAME</span>
              </div>

              <div className="ticket-body">
                <div className="ticket-field">
                  <span>TEAM CODENAME</span>
                  <strong>{existingReg.teamName}</strong>
                </div>
                <div className="ticket-field">
                  <span>TEAM LEADER</span>
                  <strong>{existingReg.leaderName}</strong>
                </div>
                <div className="ticket-field">
                  <span>AFFILIATION</span>
                  <strong>{existingReg.college}</strong>
                </div>
                <div className="ticket-field">
                  <span>CREW SIZE</span>
                  <strong>{existingReg.teamSize} Operative{existingReg.teamSize > 1 ? 's' : ''}</strong>
                </div>
                {existingReg.memberNames && (
                  <div className="ticket-field ticket-field--full">
                    <span>OPERATIVES</span>
                    <strong>{existingReg.memberNames}</strong>
                  </div>
                )}
              </div>

              <div className="ticket-footer">
                <div>
                  <span className="ticket-label">SOUL ACCESS TOKEN</span>
                  <code className="ticket-passcode">{existingReg.passId}</code>
                </div>
                <button className="ticket-copy-btn" onClick={handleCopyTicket} title="Copy Token ID">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'COPIED' : 'COPY'}
                </button>
              </div>
            </div>

            <div className="ticket-actions">
              <button
                className="button-magnetic"
                onClick={() => {
                  window.open('https://discord.gg/invite/owasp-pccoe', '_blank')
                }}
              >
                JOIN OPERATIVES DISCORD <ArrowRight size={16} />
              </button>
              <button className="text-button" onClick={handleResetRegistration}>
                Register a different team
              </button>
            </div>
          </div>
        ) : (
          <form className="registration-form" onSubmit={handleSubmit}>
            <h2 id="register-modal-title" className="modal-title">
              SUMMON YOUR <em>SQUAD</em>
            </h2>
            <p className="modal-subtitle">
              Free registration. Teams of 1–4 members. Challenge tracks open October 10, 2026.
            </p>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="teamName">TEAM CODENAME *</label>
                <input
                  id="teamName"
                  type="text"
                  placeholder="e.g. 0xByteBenders"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  className={errors.teamName ? 'input-error' : ''}
                />
                {errors.teamName && <span className="field-error">{errors.teamName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="teamSize">TEAM SIZE</label>
                <select
                  id="teamSize"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                >
                  <option value="1">1 Member (Solo Operative)</option>
                  <option value="2">2 Members (Duo)</option>
                  <option value="3">3 Members (Trio)</option>
                  <option value="4">4 Members (Full Squad)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="leaderName">LEADER / PRIMARY CONTACT *</label>
                <input
                  id="leaderName"
                  type="text"
                  placeholder="Full Name"
                  value={formData.leaderName}
                  onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                  className={errors.leaderName ? 'input-error' : ''}
                />
                {errors.leaderName && <span className="field-error">{errors.leaderName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="leaderEmail">COMMUNICATION EMAIL *</label>
                <input
                  id="leaderEmail"
                  type="email"
                  placeholder="leader@domain.com"
                  value={formData.leaderEmail}
                  onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })}
                  className={errors.leaderEmail ? 'input-error' : ''}
                />
                {errors.leaderEmail && <span className="field-error">{errors.leaderEmail}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="college">COLLEGE / INSTITUTION *</label>
                <input
                  id="college"
                  type="text"
                  placeholder="e.g. PCCOE Pune / Self"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className={errors.college ? 'input-error' : ''}
                />
                {errors.college && <span className="field-error">{errors.college}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="discordTag">DISCORD USERNAME *</label>
                <input
                  id="discordTag"
                  type="text"
                  placeholder="e.g. hacker#1337 or handle"
                  value={formData.discordTag}
                  onChange={(e) => setFormData({ ...formData, discordTag: e.target.value })}
                  className={errors.discordTag ? 'input-error' : ''}
                />
                {errors.discordTag && <span className="field-error">{errors.discordTag}</span>}
              </div>

              <div className="form-group form-group--full">
                <label htmlFor="memberNames">TEAM MEMBERS (NAMES &amp; EMAILS)</label>
                <input
                  id="memberNames"
                  type="text"
                  placeholder="e.g. Alice (alice@gmail.com), Bob (bob@gmail.com)"
                  value={formData.memberNames}
                  onChange={(e) => setFormData({ ...formData, memberNames: e.target.value })}
                />
              </div>

              <div className="form-group form-group--full">
                <label htmlFor="experience">EXPERIENCE LEVEL</label>
                <div className="radio-pill-group">
                  {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                    <label
                      key={lvl}
                      className={`radio-pill ${formData.experience === lvl ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="experience"
                        value={lvl}
                        checked={formData.experience === lvl}
                        onChange={() => setFormData({ ...formData, experience: lvl })}
                      />
                      {lvl}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button type="submit" className="button-magnetic form-submit-btn" disabled={submitting}>
                {submitting ? 'GENERATING SOUL TOKEN...' : 'REGISTER SQUAD & CLAIM TICKET'}
                {!submitting && <Sparkles size={16} />}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
