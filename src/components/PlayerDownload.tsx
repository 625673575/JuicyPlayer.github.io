import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Apple, ExternalLink } from 'lucide-react'

export default function PlayerDownload() {
  const [activePlatform, setActivePlatform] = useState<'win' | 'mac'>('win')

  return (
    <section className="app-dl" id="app">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag" data-i18n="appTag">
            Download Player
          </span>
          <h2 data-i18n="appTitle">JuicyPlayer — Your Music Player</h2>
          <p className="section-desc" data-i18n="appDesc">
            A clean, focused desktop audio player supporting multiple formats
          </p>
        </motion.div>
        <div className="app-dl-wrapper">
          <div className="app-tabs" role="tablist">
            <button
              className={`app-tab${activePlatform === 'win' ? ' active' : ''}`}
              role="tab"
              data-platform="win"
              aria-selected={activePlatform === 'win'}
              onClick={() => setActivePlatform('win')}
            >
              <Monitor width={20} height={20} />
              <span>Windows</span>
            </button>
            <button
              className={`app-tab${activePlatform === 'mac' ? ' active' : ''}`}
              role="tab"
              data-platform="mac"
              aria-selected={activePlatform === 'mac'}
              onClick={() => setActivePlatform('mac')}
            >
              <Apple width={20} height={20} />
              <span>macOS</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activePlatform === 'win' ? (
              <motion.div
                key="win"
                className="app-panel active"
                data-platform="win"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="app-panel-inner">
                  <div className="app-panel-preview">
                    <img
                      src="/JuicyPlayer.github.io/images/Microsoft_Store.png"
                      alt="Juicy Player Windows"
                      className="app-panel-img"
                    />
                  </div>
                  <div className="app-panel-info">
                    <h3 data-i18n="appWinTitle">Juicy Player for Windows</h3>
                    <p className="app-panel-desc" data-i18n="appWinDesc">
                      Install from Microsoft Store — auto updates, secure and reliable.
                    </p>
                    <div className="app-panel-meta">
                      <span className="app-ver">v1.0.0</span>
                      <span data-i18n="appWinReq">Windows 10/11 · 64-bit</span>
                    </div>
                    <a
                      href="https://apps.microsoft.com/detail/9PK77MF93KZM"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-lg"
                    >
                      <ExternalLink width={20} height={20} />
                      <span data-i18n="appWinBtn">Get from Microsoft Store</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="mac"
                className="app-panel active"
                data-platform="mac"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="app-panel-inner">
                  <div className="app-panel-preview app-panel-coming">
                    <Apple width={80} height={80} color="#6b6b82" />
                    <span className="app-coming-soon" data-i18n="appMacSoon">
                      Coming Soon
                    </span>
                  </div>
                  <div className="app-panel-info">
                    <h3 data-i18n="appMacTitle">Juicy Player for macOS</h3>
                    <p className="app-panel-desc" data-i18n="appMacDesc">
                      macOS version is in development, stay tuned.
                    </p>
                    <button className="btn btn-primary btn-lg" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                      <span data-i18n="appMacBtn">Coming Soon</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
