import { useCallback, useEffect, useState } from 'react'
import { useI18n, detectLang } from './hooks/useI18n'
import { Lang } from './i18n/dictionary'

import GlobalBackground from './components/GlobalBackground'
import PageLoader from './components/PageLoader'
import ParticleBackground from './components/ParticleBackground'
import FloatingShapes from './components/FloatingShapes'
import HeadphoneShowcase from './components/HeadphoneShowcase'
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
  const [lang] = useState<Lang>(detectLang)
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Sync language to [data-i18n] elements
  useI18n(lang)

  const openPalette = useCallback(() => setPaletteOpen(true), [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])

  // Global Ctrl/Cmd+K to open command palette
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

  // Smooth scroll (anchor links)
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

      <Navbar onOpenPalette={openPalette} />

      <main className="site-shell">
        <Hero />
        <FormatMarquee />
        <PlayerDownload />
        <Features />
        <Showcase />
        <DownloadRemoter />
        <HowItWorks />
        <FAQ />
      </main>

      <HeadphoneShowcase lang={lang} />
      <Footer />

      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </>
  )
}
