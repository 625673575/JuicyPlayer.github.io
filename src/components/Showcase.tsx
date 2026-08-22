import { motion } from 'framer-motion'

const ITEMS = [
  {
    img: '/JuicyPlayer.github.io/images/showcase-windows.png',
    alt: 'Juicy Player 播放器界面',
    titleKey: 'sc2Title',
    descKey: 'sc2Desc',
    title: 'Juicy Player 播放器',
    desc: '极简播放器界面，专注音乐，低资源占用',
    size: 'wide' as const,
  },
  {
    img: '/JuicyPlayer.github.io/images/showcase-android.png',
    alt: 'Juicy Remoter 遥控器界面',
    titleKey: 'sc1Title',
    descKey: 'sc1Desc',
    title: 'Juicy Remoter 遥控器',
    desc: 'Material Design 风格，暗色主题，手势操作',
    size: 'tall' as const,
  },
  {
    img: '/JuicyPlayer.github.io/images/connect.png',
    alt: '无缝连接',
    titleKey: 'sc3Title',
    descKey: 'sc3Desc',
    title: '无缝连接',
    desc: '同一局域网自动发现，无需手动输入 IP',
    size: 'square' as const,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
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

        {/* 艺术性错位排列 */}
        <div className="showcase-art">
          {/* 第一行：宽幅 Windows 大图 */}
          <motion.div
            className="showcase-card showcase-wide"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -6 }}
            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="showcase-img-wrap">
              <img src={ITEMS[0].img} alt={ITEMS[0].alt} className="showcase-img" />
            </div>
            <div className="showcase-info">
              <h3 data-i18n={ITEMS[0].titleKey}>{ITEMS[0].title}</h3>
              <p data-i18n={ITEMS[0].descKey}>{ITEMS[0].desc}</p>
            </div>
          </motion.div>

          {/* 第二行：竖长 Android + 中方 Connect */}
          <div className="showcase-row">
            <motion.div
              className="showcase-card showcase-tall"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="showcase-img-wrap">
                <img src={ITEMS[1].img} alt={ITEMS[1].alt} className="showcase-img" />
              </div>
              <div className="showcase-info">
                <h3 data-i18n={ITEMS[1].titleKey}>{ITEMS[1].title}</h3>
                <p data-i18n={ITEMS[1].descKey}>{ITEMS[1].desc}</p>
              </div>
            </motion.div>

            <motion.div
              className="showcase-card showcase-square"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="showcase-img-wrap">
                <img src={ITEMS[2].img} alt={ITEMS[2].alt} className="showcase-img" />
              </div>
              <div className="showcase-info">
                <h3 data-i18n={ITEMS[2].titleKey}>{ITEMS[2].title}</h3>
                <p data-i18n={ITEMS[2].descKey}>{ITEMS[2].desc}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
