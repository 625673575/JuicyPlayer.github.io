import { useEffect, useState } from 'react'
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
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
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
            <button
              id="searchToggle"
              className="icon-btn"
              aria-label="搜索 / 命令面板"
              onClick={onOpenPalette}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button
              id="themeToggle"
              className="icon-btn"
              aria-label="切换深色 / 浅色"
              aria-pressed={theme === 'light' ? 'true' : 'false'}
              onClick={onToggleTheme}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
            <div className="accent-picker" aria-label="强调色">
              {ACCENTS.map((a) => (
                <button
                  key={a.id}
                  className={`accent-dot${accent === a.id ? ' active' : ''}`}
                  style={{ background: a.color }}
                  aria-label={a.label}
                  onClick={() => onChangeAccent(a.id)}
                />
              ))}
            </div>
            <button
              id="langToggle"
              className="lang-btn"
              aria-label="Switch language"
              onClick={onToggleLang}
            >
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
