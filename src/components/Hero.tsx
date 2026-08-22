import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { Lang, TYPEWRITER_TEXTS } from '../i18n/dictionary'

interface HeroProps {
  lang: Lang
}

/** 打字机效果 hook */
function useTypewriter(lang: Lang) {
  const [text, setText] = useState('')
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
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

    timerRef.current = setTimeout(type, 600)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [lang])

  return text
}

export default function Hero({ lang }: HeroProps) {
  const typewriterText = useTypewriter(lang)

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
            🎵 桌面音乐播放器
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="hero-line-1" data-i18n="heroTitle1">
            为你的音乐
          </span>
          <span className="hero-line-2">
            <span className="hero-gradient-text" id="typewriter">
              {typewriterText}
            </span>
            <span className="typewriter-cursor" id="typeCursor" />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="hero-desc-centered"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          data-i18n="heroDesc"
        >
          Juicy Player 是一款简洁优雅的桌面音频播放器，支持手机遥控操控。播放、暂停、切歌、调节音量——一切尽在指尖。
        </motion.p>

        {/* Dual CTA */}
        <motion.div
          className="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a href="#app" className="hero-btn-primary">
            <span data-i18n="heroDownload">免费下载</span>
          </a>
          <button className="hero-btn-secondary">
            <span className="hero-btn-play-icon">
              <Play width={20} height={20} fill="currentColor" />
            </span>
            <span data-i18n="heroLearn">观看演示</span>
          </button>
        </motion.div>
      </div>
    </header>
  )
}
