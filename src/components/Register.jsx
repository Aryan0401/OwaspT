export default function Register({ onOpenRegister }) {
  return (
    <section id="register" className="register">
      <div className="register-energy" />
      <div className="register-gate-rings" aria-hidden="true">
        <div className="gate-ring gate-ring--outer" />
      </div>

      <div className="register-inner reveal">
        <span className="section-kicker">08 / REGISTRATION</span>

        <h2>
          <em>REGISTER</em>
        </h2>

        <p className="register-desc">
          36 hours. 7 challenge tracks. Free and open to all squads worldwide.
        </p>

        <div className="register-cta-wrap">
          {/* Ember-keycap button */}
          <span className="ember-btn-wrap">
            <button
              className="register-gate-btn"
              onClick={onOpenRegister}
              aria-label="Register squad for ByteMe CTF"
            >
              {/* orange dot beacon */}
              <span className="btn-beacon" aria-hidden="true" />
              <span className="btn-text">REGISTER SQUAD</span>
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </button>
            <span className="ember-btn-glow" aria-hidden="true" />
            <span className="ember-btn-bloom" aria-hidden="true" />
          </span>
        </div>

        {/* Minimal High-Tech Meta Strip */}
        <div className="register-meta-strip">
          <div className="register-meta-item">
            <span className="register-meta-label">TIMEFRAME</span>
            <b className="register-meta-val">OCTOBER 10–11, 2026</b>
            <span className="register-meta-sub">36-Hour Sprint</span>
          </div>

          <div className="register-meta-divider" aria-hidden="true" />

          <div className="register-meta-item">
            <span className="register-meta-label">SQUAD SIZE</span>
            <b className="register-meta-val">1–4 OPERATIVES</b>
            <span className="register-meta-sub">Solo or Teams</span>
          </div>

          <div className="register-meta-divider" aria-hidden="true" />

          <div className="register-meta-item">
            <span className="register-meta-label">ENTRY</span>
            <b className="register-meta-val">100% FREE · ONLINE</b>
            <span className="register-meta-sub">Global Access</span>
          </div>
        </div>
      </div>
    </section>
  )
}

