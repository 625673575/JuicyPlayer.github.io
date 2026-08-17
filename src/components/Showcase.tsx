import { motion } from 'framer-motion'

const ITEMS = [
  {
    img: '/JuicyPlayer.github.io/images/showcase-android.png',
    alt: 'Juicy Remoter 遥控器界面',
    titleKey: 'sc1Title',
    descKey: 'sc1Desc',
    title: 'Juicy Remoter 遥控器',
    desc: 'Material Design 风格，暗色主题，手势操作',
  },
  {
    img: '/JuicyPlayer.github.io/images/showcase-windows.png',
    alt: 'Juicy Player 播放器界面',
    titleKey: 'sc2Title',
    descKey: 'sc2Desc',
    title: 'Juicy Player 播放器',
    desc: '极简播放器界面，专注音乐，低资源占用',
  },
  {
    img: '/JuicyPlayer.github.io/images/connect.png',
    alt: '无缝连接',
    titleKey: 'sc3Title',
    descKey: 'sc3Desc',
    title: '无缝连接',
    desc: '同一局域网自动发现，无需手动输入 IP',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export default function Showcase() {
  return (
    <section className="showcase" id="showcase">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag" data-i18n="showcaseTag">
            产品预览
          </span>
          <h2 data-i18n="showcaseTitle">精致的界面设计</h2>
        </motion.div>
        <div className="showcase-grid">
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              className="showcase-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="showcase-img">
                <img src={item.img} alt={item.alt} className="showcase-img-src" />
              </div>
              <h3 data-i18n={item.titleKey}>{item.title}</h3>
              <p data-i18n={item.descKey}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
