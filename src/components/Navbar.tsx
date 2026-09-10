import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

interface NavbarProps {
  onOpenPalette: () => void
}

export default function Navbar({ onOpenPalette }: NavbarProps) {
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
        </div>
      </div>
    </motion.nav>
  )
}
