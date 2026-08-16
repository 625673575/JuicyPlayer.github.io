import { useEffect, useRef, useState } from 'react'
import { Lang, TYPEWRITER_TEXTS } from '../i18n/dictionary'
import LivePlayer from './LivePlayer'
import WaveformDecoration from './WaveformDecoration'

interface HeroProps {
  lang: Lang
}

/** 打字机效果 hook */
function useTypewriter(lang: Lang) {
  const [text, setText] = useState('')
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    // 语言切换时重置
    setText('')
    indexRef.current = 0
    if (timerRef.current) clearTimeout(timerRef.current)

    const fullText = TYPEWRITER_TEXTS[lang]

    function type() {
      if (indexRef.current < fullText.length) {
        setText(fullText.slice(0, indexRef.current + 1))
        indexRef.current++
        timerRef.current = setTimeout(type, 100 + Math.random() * 50)
      }
    }

    timerRef.current = setTimeout(type, 300)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [lang])

  return text
}

export default function Hero({ lang }: HeroProps) {
  const typewriterText = useTypewriter(lang)
  const heroVisualRef = useRef<HTMLDivElement>(null)
  const livePlayerRef = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<(HTMLDivElement | null)[]>([])

  // 视差圆球
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      orbsRef.current.forEach((orb) => {
        if (!orb) return
        const speed = parseFloat(orb.dataset.speed || '0.1')
        orb.style.transform = `translateY(${scrollY * speed}px)`
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 3D 倾斜效果
  useEffect(() => {
    const visual = heroVisualRef.current
    const card = livePlayerRef.current
    if (!visual || !card) return

    const handleMove = (e: MouseEvent) => {
      const rect = visual.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`
      card.style.animation = 'none'
    }
    const handleLeave = () => {
      card.style.transform = ''
      card.style.animation = ''
    }

    visual.addEventListener('mousemove', handleMove)
    visual.addEventListener('mouseleave', handleLeave)
    return () => {
      visual.removeEventListener('mousemove', handleMove)
      visual.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <header className="hero" id="hero">
      <div className="hero-bg" />
      <div className="parallax-orbs" id="parallaxOrbs">
        <div className="parallax-orb parallax-orb-1" data-speed="0.3" ref={(el) => { orbsRef.current[0] = el }} />
        <div className="parallax-orb parallax-orb-2" data-speed="-0.2" ref={(el) => { orbsRef.current[1] = el }} />
        <div className="parallax-orb parallax-orb-3" data-speed="0.15" ref={(el) => { orbsRef.current[2] = el }} />
      </div>
      <div className="container hero-content">
        <div className="hero-text">
          <div className="badge" data-i18n="heroBadge">
            🎵 桌面音乐播放器
          </div>
          <h1>
            <span data-i18n="heroTitle1">为你的音乐</span>
            <br />
            <span className="gradient-text" id="typewriter">
              {typewriterText}
            </span>
            <span className="typewriter-cursor" id="typeCursor" />
          </h1>
          <p className="hero-desc" data-i18n="heroDesc">
            Juicy Player 是一款简洁优雅的桌面音频播放器，支持手机遥控操控。播放、暂停、切歌、调节音量——一切尽在指尖。
          </p>
          <div className="hero-actions">
            <a href="#app" className="btn btn-lg btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span data-i18n="heroDownload">免费下载</span>
            </a>
            <a href="#showcase" className="btn btn-lg btn-ghost" data-i18n="heroLearn">
              了解更多
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <strong>1</strong>
              <span data-i18n="statVersion">版本</span>
            </div>
            <div>
              <strong>Free</strong>
              <span data-i18n="statFree">免费</span>
            </div>
            <div>
              <strong>Wi-Fi</strong>
              <span data-i18n="statConn">遥控</span>
            </div>
          </div>
        </div>
        <div className="hero-visual" id="heroVisual" ref={heroVisualRef}>
          <div ref={livePlayerRef}>
            <LivePlayer />
          </div>
        </div>
      </div>
      <WaveformDecoration />
    </header>
  )
}
