import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { Lang } from '../i18n/dictionary'

interface HeroProps {
  lang: Lang
}

export default function Hero({ lang }: HeroProps) {
  return (
    <header className="hero-centered" id="hero">
      <div className="hero-centered-inner">
        {/* Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="pulse-dot-cyan" />
          <span className="hero-badge-text" data-i18n="heroBadge">
            🎵 Desktop Music Player
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="hero-desc-centered"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          data-i18n="heroDesc"
        >
          JuicyPlayer is a clean, elegant desktop audio player with wireless remote control from your phone. Play, pause, skip, and adjust volume — all at your fingertips.
        </motion.p>

        {/* Dual CTA */}
        <motion.div
          className="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a href="#app" className="hero-btn-primary">
            <span data-i18n="heroDownload">Free Download</span>
          </a>
          <button className="hero-btn-secondary">
            <span className="hero-btn-play-icon">
              <Play width={20} height={20} fill="currentColor" />
            </span>
            <span data-i18n="heroLearn">Learn More</span>
          </button>
        </motion.div>
      </div>
    </header>
  )
}
