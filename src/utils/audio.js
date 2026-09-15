// Web Audio API Synthesizer for Cyberpunk Sci-Fi Sound Effects
// 100% synthesized, 0 external audio files, zero load latency.

class SoundFX {
  constructor() {
    this.ctx = null
    this.muted = false

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('byteme_sfx_muted')
        if (saved !== null) {
          this.muted = saved === 'true'
        }
      } catch {
        // ignore
      }
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        this.ctx = new AudioContext()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  setMuted(muted) {
    this.muted = muted
    try {
      localStorage.setItem('byteme_sfx_muted', String(muted))
    } catch {
      // ignore
    }
  }

  isMuted() {
    return this.muted
  }

  // Tactical hover chirp / blip
  playHover() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      const t = this.ctx.currentTime
      osc.frequency.setValueAtTime(880, t)
      osc.frequency.exponentialRampToValueAtTime(1320, t + 0.04)

      gain.gain.setValueAtTime(0.04, t)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(t)
      osc.stop(t + 0.04)
    } catch {
      // AudioContext fallback
    }
  }

  // Crisp cyber switch click
  playClick() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      const t = this.ctx.currentTime
      osc.frequency.setValueAtTime(440, t)
      osc.frequency.exponentialRampToValueAtTime(110, t + 0.06)

      gain.gain.setValueAtTime(0.08, t)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(t)
      osc.stop(t + 0.06)
    } catch {
      // ignore
    }
  }

  // Terminal keystroke sound
  playKey() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sawtooth'
      const t = this.ctx.currentTime
      osc.frequency.setValueAtTime(600 + Math.random() * 200, t)

      gain.gain.setValueAtTime(0.02, t)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(t)
      osc.stop(t + 0.025)
    } catch {
      // ignore
    }
  }

  // Victory / sanity flag / registration success chord
  playSuccess() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return

      const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        const t = this.ctx.currentTime + idx * 0.08
        osc.frequency.setValueAtTime(freq, t)

        gain.gain.setValueAtTime(0.07, t)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(t)
        osc.stop(t + 0.45)
      })
    } catch {
      // ignore
    }
  }

  // Cyber error / denied buzz
  playError() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sawtooth'
      const t = this.ctx.currentTime
      osc.frequency.setValueAtTime(140, t)
      osc.frequency.linearRampToValueAtTime(80, t + 0.18)

      gain.gain.setValueAtTime(0.09, t)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(t)
      osc.stop(t + 0.18)
    } catch {
      // ignore
    }
  }

  // Glitch burst
  playGlitch() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return

      for (let i = 0; i < 3; i++) {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'square'
        const t = this.ctx.currentTime + i * 0.03
        osc.frequency.setValueAtTime(200 + Math.random() * 800, t)

        gain.gain.setValueAtTime(0.04, t)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(t)
        osc.stop(t + 0.03)
      }
    } catch {
      // ignore
    }
  }
}

export const sfx = new SoundFX()
