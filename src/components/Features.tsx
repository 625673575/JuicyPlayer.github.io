import { motion } from 'framer-motion'
import { Music, Volume2, ListMusic, ArrowRight } from 'lucide-react'

const FEATURES = [
  {
    img: '/JuicyPlayer.github.io/images/feature-play.png',
    alt: 'Playback Control',
    titleKey: 'f1Title',
    descKey: 'f1Desc',
    title: '🎵 Playback Control',
    desc: 'Play, pause, skip tracks, seek through the progress bar — with lock-screen and notification bar support. Pair with Juicy Remoter for phone control.',
    icon: Music,
    accent: 'red',
    big: true,
  },
  {
    img: '/JuicyPlayer.github.io/images/feature-volume.png',
    alt: 'Volume & Equalizer',
    titleKey: 'f2Title',
    descKey: 'f2Desc',
    title: '🔊 Volume & Equalizer',
    desc: 'Adjust system and player volume in real-time, switch equalizer presets to find your perfect sound.',
    icon: Volume2,
    accent: 'orange',
    big: false,
  },
  {
    img: '/JuicyPlayer.github.io/images/feature-playlist.png',
    alt: 'Playlist',
    titleKey: 'f3Title',
    descKey: 'f3Desc',
    title: '📋 Playlist',
    desc: 'Browse the full playlist, search songs, view album art and track info — switch tracks anytime.',
    icon: ListMusic,
    accent: 'purple',
    big: false,
  },
]

const ACCENT_MAP: Record<string, string> = {
  red: 'rgba(239, 35, 60, 0.1)',
  orange: 'rgba(255, 107, 53, 0.1)',
  purple: 'rgba(139, 92, 246, 0.1)',
  blue: 'rgba(59, 157, 255, 0.1)',
  green: 'rgba(22, 199, 132, 0.1)',
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag" data-i18n="featureTag">
            Core Features
          </span>
          <h2 data-i18n="featureTitle">Why JuicyPlayer</h2>
          <p className="section-desc" data-i18n="featureDesc">
            Simple, efficient, and elegant desktop music experience
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={i}
                className={`bento-card${f.big ? ' bento-card-big' : ''}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
                viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="bento-card-inner">
                  <div className="bento-icon-wrap">
                    <Icon width={24} height={24} />
                  </div>
                  <h3 data-i18n={f.titleKey}>{f.title}</h3>
                  <p data-i18n={f.descKey}>{f.desc}</p>
                  {f.big && (
                    <div className="bento-img-wrap">
                      <img src={f.img} alt={f.alt} className="bento-img" />
                    </div>
                  )}
                  <div className="bento-card-footer">
                    <span className="bento-link">Learn more</span>
                    <ArrowRight width={16} height={16} />
                  </div>
                </div>
                <div className="bento-glow" style={{ background: `radial-gradient(circle at top right, ${ACCENT_MAP[f.accent]}, transparent 70%)` }} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
