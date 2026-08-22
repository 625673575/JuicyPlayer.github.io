import { useCallback, useEffect, useState } from 'react'
import { useTheme, getInitialTheme, type Theme } from './hooks/useTheme'
import { useAccent, getInitialAccent, type Accent } from './hooks/useAccent'
import { useI18n, detectLang } from './hooks/useI18n'
import { Lang } from './i18n/dictionary'

import GlobalBackground from './components/GlobalBackground'
import PageLoader from './components/PageLoader'
import ParticleBackground from './components/ParticleBackground'
import FloatingShapes from './components/FloatingShapes'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FormatMarquee from './components/FormatMarquee'
import PlayerDownload from './components/PlayerDownload'
import Features from './components/Features'
import Showcase from './components/Showcase'
import DownloadRemoter from './components/DownloadRemoter'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [accent, setAccent] = useState<Accent>(getInitialAccent)
  const [lang, setLang] = useState<Lang>(detectLang)
  const [paletteOpen, setPaletteOpen] = useState(false)

  // 同步主题 / 强调色到 <html> 属性
  useTheme(theme)
  useAccent(accent)

  // 同步语言到 [data-i18n] 元素
  const { toggle: toggleLang } = useI18n(lang, setLang)

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const openPalette = useCallback(() => setPaletteOpen(true), [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])

  // 全局 Ctrl/Cmd+K 打开命令面板
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 平滑滚动（锚点链接）
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      <GlobalBackground />
      <PageLoader />
      <ScrollProgress />
      <FloatingShapes />
      <ParticleBackground />

      <Navbar
        lang={lang}
        onToggleLang={toggleLang}
        theme={theme}
        onToggleTheme={toggleTheme}
        accent={accent}
        onChangeAccent={setAccent}
        onOpenPalette={openPalette}
      />

      <main className="site-shell">
        <Hero lang={lang} />
        <FormatMarquee />
        <PlayerDownload />
        <Features />
        <Showcase />
        <DownloadRemoter />
        <HowItWorks />
        <FAQ />
      </main>

      <Footer />

      <CommandPalette
        open={paletteOpen}
        onClose={closePalette}
        onToggleLang={toggleLang}
        onToggleTheme={toggleTheme}
      />
    </>
  )
}
