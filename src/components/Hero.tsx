import { motion } from 'framer-motion'
import { Play, Download } from 'lucide-react'
import { useLatestRelease, RELEASES_PAGE_URL, formatMB } from '../hooks/useLatestRelease'

export default function Hero() {
  const release = useLatestRelease()
  const x64 = release?.x64

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
          <span className="pulse-dot" />
          <span className="hero-badge-text" data-i18n="heroBadge">
            Desktop Music Player
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
          <a
            href={x64?.browser_download_url ?? RELEASES_PAGE_URL}
            className="hero-btn-primary"
            {...(x64 ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          >
            <Download width={20} height={20} />
            <span data-i18n="heroDownload">Free Download</span>
          </a>
          <a href="#features" className="hero-btn-secondary">
            <span className="hero-btn-play-icon">
              <Play width={20} height={20} fill="currentColor" />
            </span>
            <span data-i18n="heroLearn">Learn More</span>
          </a>
        </motion.div>

        {/* Version / size meta */}
        <motion.div
          className="hero-dl-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          {release && <span>v{release.version}</span>}
          {x64 && <span>{formatMB(x64.size)}</span>}
          <span data-i18n="heroReq">Windows 10 / 11 · 64-bit &amp; ARM64</span>
        </motion.div>
      </div>
    </header>
  )
}
