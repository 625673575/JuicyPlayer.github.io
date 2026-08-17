import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Moon, Sun } from 'lucide-react'
import { Accent } from '../hooks/useAccent'
import { Lang } from '../i18n/dictionary'

interface NavbarProps {
  lang: Lang
  onToggleLang: () => void
  theme: string
  onToggleTheme: () => void
  accent: Accent
  onChangeAccent: (a: Accent) => void
  onOpenPalette: () => void
}

const ACCENTS: { id: Accent; color: string; label: string }[] = [
  { id: 'orange', color: '#ff6b35', label: '橙色' },
  { id: 'purple', color: '#8b5cf6', label: '紫色' },
  { id: 'green', color: '#16c784', label: '绿色' },
  { id: 'pink', color: '#ff4d8d', label: '粉色' },
]

export default function Navbar({
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  accent,
  onChangeAccent,
  onOpenPalette,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      id="navbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="nav-inner">
        <a href="#" className="nav-brand">
          <img src="/JuicyPlayer.github.io/images/icon_256.png" alt="Juicy Player" className="nav-logo" />
          <span>Juicy Player</span>
        </a>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#features" data-i18n="navFeatures">功能</a>
            <a href="#showcase" data-i18n="navShowcase">预览</a>
            <a href="#download" data-i18n="navDownload">下载</a>
          </div>
          <div className="nav-extra">
            <motion.button
              className="icon-btn"
              aria-label="搜索 / 命令面板"
              onClick={onOpenPalette}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search width={18} height={18} />
            </motion.button>
            <motion.button
              className="icon-btn"
              aria-label="切换深色 / 浅色"
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
            <div className="accent-picker" aria-label="强调色">
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
            <motion.button
              className="lang-btn"
              aria-label="Switch language"
              onClick={onToggleLang}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {lang === 'zh' ? 'EN' : '中文'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
