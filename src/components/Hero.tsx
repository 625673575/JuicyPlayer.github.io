import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Download } from 'lucide-react'
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
  const { scrollY } = useScroll()
  const orb1Y = useTransform(scrollY, [0, 500], [0, 150])
  const orb2Y = useTransform(scrollY, [0, 500], [0, -100])
  const orb3Y = useTransform(scrollY, [0, 500], [0, 75])

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

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  }

  const visualVariants = {
    hidden: { opacity: 0, x: 60, rotateY: -15 },
    visible: { opacity: 1, x: 0, rotateY: 0 },
  }

  return (
    <header className="hero" id="hero">
      <div className="hero-bg" />
      <div className="parallax-orbs" id="parallaxOrbs">
        <motion.div className="parallax-orb parallax-orb-1" style={{ y: orb1Y }} ref={(el) => { orbsRef.current[0] = el }} />
        <motion.div className="parallax-orb parallax-orb-2" style={{ y: orb2Y }} ref={(el) => { orbsRef.current[1] = el }} />
        <motion.div className="parallax-orb parallax-orb-3" style={{ y: orb3Y }} ref={(el) => { orbsRef.current[2] = el }} />
      </div>
      <div className="container hero-content">
        <motion.div
          className="hero-text"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        >
          <motion.div
            className="badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            data-i18n="heroBadge"
          >
            🎵 桌面音乐播放器
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <span data-i18n="heroTitle1">为你的音乐</span>
            <br />
            <span className="gradient-text" id="typewriter">
              {typewriterText}
            </span>
            <span className="typewriter-cursor" id="typeCursor" />
          </motion.h1>
          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            data-i18n="heroDesc"
          >
            Juicy Player 是一款简洁优雅的桌面音频播放器，支持手机遥控操控。播放、暂停、切歌、调节音量——一切尽在指尖。
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <a href="#app" className="btn btn-lg btn-primary">
              <Download width={20} height={20} />
              <span data-i18n="heroDownload">免费下载</span>
            </a>
            <a href="#showcase" className="btn btn-lg btn-ghost" data-i18n="heroLearn">
              了解更多
            </a>
          </motion.div>
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
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
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-visual"
          id="heroVisual"
          ref={heroVisualRef}
          variants={visualVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
        >
          <div ref={livePlayerRef}>
            <LivePlayer />
          </div>
        </motion.div>
      </div>
      <WaveformDecoration />
    </header>
  )
}
