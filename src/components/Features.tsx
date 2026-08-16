import { useEffect, useRef } from 'react'

interface Feature {
  img: string
  alt: string
  titleKey: string
  descKey: string
  title: string
  desc: string
}

const FEATURES: Feature[] = [
  {
    img: '/JuicyPlayer.github.io/images/feature-play.png',
    alt: '播放控制',
    titleKey: 'f1Title',
    descKey: 'f1Desc',
    title: '🎵 播放控制',
    desc: '播放、暂停、上下曲、拖动进度条——支持锁屏控制和通知栏快捷操作。配合 Juicy Remoter 遥控器，手机即遥控。',
  },
  {
    img: '/JuicyPlayer.github.io/images/feature-volume.png',
    alt: '音量与均衡',
    titleKey: 'f2Title',
    descKey: 'f2Desc',
    title: '🔊 音量 & 均衡器',
    desc: '实时调节系统音量和播放器音量，支持均衡器预设切换，找到最适合你的听感。',
  },
  {
    img: '/JuicyPlayer.github.io/images/feature-playlist.png',
    alt: '播放列表',
    titleKey: 'f3Title',
    descKey: 'f3Desc',
    title: '📋 播放列表',
    desc: '浏览完整播放列表、搜索歌曲、查看专辑封面和歌曲信息，随时切换想听的曲目。',
  },
]

export default function Features() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    )
    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-tag" data-i18n="featureTag">
            核心功能
          </span>
          <h2 data-i18n="featureTitle">为什么选择 Juicy Player</h2>
          <p className="section-desc" data-i18n="featureDesc">
            简洁、高效、优雅的桌面音乐体验
          </p>
        </div>
        <div className="feature-grid">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`feature-card${i % 2 === 1 ? ' feature-card-reverse' : ''}`}
              data-reveal
              ref={(el) => { cardsRef.current[i] = el }}
            >
              <div className="feature-img">
                <img src={f.img} alt={f.alt} className="feature-img-src" />
              </div>
              <div className="feature-info">
                <h3 data-i18n={f.titleKey}>{f.title}</h3>
                <p data-i18n={f.descKey}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
