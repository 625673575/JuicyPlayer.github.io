import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Lang, TYPEWRITER_TEXTS } from '../i18n/dictionary'

interface HeadphoneShowcaseProps {
  lang: Lang
}

/** Typewriter effect hook */
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

export default function HeadphoneShowcase({ lang }: HeadphoneShowcaseProps) {
  const typewriterText = useTypewriter(lang)

  return (
    <section className="headphone-showcase">
      <div className="container">
        <motion.div
          className="ultimate-banner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="hero-headline ultimate-headline">
            <span className="hero-line-1" data-i18n="heroTitle1">
              The Ultimate
            </span>
            <span className="hero-line-2">
              <span className="hero-gradient-text" id="typewriter">
                {typewriterText}
              </span>
              <span className="typewriter-cursor" id="typeCursor" />
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="headphone-image-wrap"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src="/JuicyPlayer.github.io/images/headphone-bg.jpg"
            alt="Encore One Headphones"
            className="headphone-image"
          />
        </motion.div>
      </div>
    </section>
  )
}
