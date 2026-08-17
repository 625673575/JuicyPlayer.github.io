import { motion } from 'framer-motion'
import { Smartphone, Monitor, Download } from 'lucide-react'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function DownloadRemoter() {
  return (
    <section className="download" id="download">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag" data-i18n="dlTag">
            手机遥控
          </span>
          <h2 data-i18n="dlTitle">Juicy Remoter — 遥控器</h2>
          <p className="section-desc" data-i18n="dlDesc">
            用手机遥控 JuicyPlayer 播放器，局域网内即时响应
          </p>
        </motion.div>
        <div className="download-grid">
          {/* Android */}
          <motion.div
            className="dl-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -8 }}
            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="dl-icon-wrap">
              <Smartphone width={44} height={44} color="#3ddc84" />
            </div>
            <h3 data-i18n="dlAndTitle">Juicy Remoter · Android</h3>
            <span className="dl-version">v1.0.0</span>
            <p className="dl-note" data-i18n="dlAndNote">
              Android 7.0+
            </p>
            <a href="/JuicyPlayer.github.io/downloads/JuicyPlayer-Remote-1.0.0.apk" className="btn btn-primary btn-block">
              <Download width={18} height={18} />
              <span data-i18n="dlAndBtn">下载 APK</span>
            </a>
            <span className="dl-size" data-i18n="dlAndSize">
              约 57 MB · .apk
            </span>
          </motion.div>

          {/* Windows */}
          <motion.div
            className="dl-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -8 }}
            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
            <div className="dl-icon-wrap">
              <Monitor width={44} height={44} color="#00aef0" />
            </div>
            <h3 data-i18n="dlWinTitle">Juicy Remoter · Windows</h3>
            <span className="dl-version">v1.0.0</span>
            <p className="dl-note" data-i18n="dlWinNote">
              Windows 10 / 11 · 64-bit
            </p>
            <a href="/JuicyPlayer.github.io/downloads/JuicyPlayer-Setup-1.0.0.exe" className="btn btn-primary btn-block">
              <Download width={18} height={18} />
              <span data-i18n="dlWinBtn">下载安装包</span>
            </a>
            <span className="dl-size" data-i18n="dlWinSize">
              约 14 MB · .exe
            </span>
          </motion.div>
        </div>
        <details className="history">
          <summary data-i18n="historySummary">📜 历史版本</summary>
          <p className="history-empty" data-i18n="historyEmpty">
            暂无历史版本
          </p>
        </details>
      </div>
    </section>
  )
}
