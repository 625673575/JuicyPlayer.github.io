import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Moon, Sun } from 'lucide-react'
import { Accent } from '../hooks/useAccent'

interface NavbarProps {
  theme: string
  onToggleTheme: () => void
  accent: Accent
  onChangeAccent: (a: Accent) => void
  onOpenPalette: () => void
}

const ACCENTS: { id: Accent; color: string; label: string }[] = [
  { id: 'lime', color: '#ccff00', label: 'Lime' },
  { id: 'emerald', color: '#10b981', label: 'Emerald' },
  { id: 'cyan', color: '#22d3ee', label: 'Cyan' },
  { id: 'violet', color: '#a78bfa', label: 'Violet' },
]

export default function Navbar({
  theme,
  onToggleTheme,
  accent,
  onChangeAccent,
  onOpenPalette,
}: NavbarProps) {
  const [_scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className="navbar"
      id="navbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="nav-pill">
        <a href="#" className="nav-brand">
          <img src="/JuicyPlayer.github.io/images/icon_256.png" alt="Juicy Player" className="nav-logo" />
          <span>Juicy Player</span>
        </a>
        <div className="nav-links">
          <a href="#features" data-i18n="navFeatures">Features</a>
          <a href="#showcase" data-i18n="navShowcase">Preview</a>
          <a href="#download" data-i18n="navDownload">Download</a>
        </div>
        <div className="nav-extra">
            <motion.button
              className="icon-btn"
              aria-label="Search / command palette"
              onClick={onOpenPalette}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search width={18} height={18} />
            </motion.button>
            <motion.button
              className="icon-btn"
              aria-label="Toggle dark / light"
              aria-pressed={theme === 'light' ? 'true' : 'false'}
              onClick={onToggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? <Sun width={18} height={18} /> : <Moon width={18} height={18} />}
              </motion.div>
            </motion.button>
            <div className="accent-picker" aria-label="Accent color">
              {ACCENTS.map((a) => (
                <motion.button
                  key={a.id}
                  className={`accent-dot${accent === a.id ? ' active' : ''}`}
                  style={{ background: a.color }}
                  aria-label={a.label}
                  onClick={() => onChangeAccent(a.id)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
    </motion.nav>
  )
}
