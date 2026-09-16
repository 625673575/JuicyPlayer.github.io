import { motion } from 'framer-motion'
import { Smartphone, Monitor, Download } from 'lucide-react'
import { useLatestRelease, RELEASES_PAGE_URL, formatMB } from '../hooks/useLatestRelease'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function DownloadRemoter() {
  const release = useLatestRelease()
  const winAsset = release?.x64
  const winHref = winAsset?.browser_download_url ?? RELEASES_PAGE_URL

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
            Mobile Remote
          </span>
          <h2 data-i18n="dlTitle">Juicy Remoter — Remote Control</h2>
          <p className="section-desc" data-i18n="dlDesc">
            Control JuicyPlayer from your phone, instant response over LAN
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
            <a href="/JuicyPlayer.github.io/downloads/JuicyPlayer-Android-v1.0.0.apk" className="btn btn-primary btn-block">
              <Download width={18} height={18} />
              <span data-i18n="dlAndBtn">Download APK</span>
            </a>
            <span className="dl-size" data-i18n="dlAndSize">
              ~57 MB · .apk
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
            <span className="dl-version">{release ? `v${release.version}` : 'GitHub'}</span>
            <p className="dl-note" data-i18n="dlWinNote">
              Windows 10 / 11 · 64-bit
            </p>
            <a
              href={winHref}
              className="btn btn-primary btn-block"
              {...(winAsset ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <Download width={18} height={18} />
              <span data-i18n="dlWinBtn">Download Installer</span>
            </a>
            <span className="dl-size">
              {winAsset ? `${formatMB(winAsset.size)} · .exe` : '.exe · GitHub Releases'}
            </span>
          </motion.div>
        </div>
        <details className="history">
          <summary data-i18n="historySummary">Version History</summary>
          <p className="history-empty" data-i18n="historyEmpty">
            No previous versions yet
          </p>
        </details>
      </div>
    </section>
  )
}
