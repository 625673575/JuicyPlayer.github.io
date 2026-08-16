import { useState } from 'react'

export default function PlayerDownload() {
  const [activePlatform, setActivePlatform] = useState<'win' | 'mac'>('win')

  return (
    <section className="app-dl" id="app">
      <div className="container">
        <div className="section-header">
          <span className="section-tag" data-i18n="appTag">
            下载播放器
          </span>
          <h2 data-i18n="appTitle">Juicy Player — 你的音乐播放器</h2>
          <p className="section-desc" data-i18n="appDesc">
            简洁、专注的桌面音频播放器，支持多种格式
          </p>
        </div>
        <div className="app-dl-wrapper">
          <div className="app-tabs" role="tablist">
            <button
              className={`app-tab${activePlatform === 'win' ? ' active' : ''}`}
              role="tab"
              data-platform="win"
              aria-selected={activePlatform === 'win'}
              onClick={() => setActivePlatform('win')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
              </svg>
              <span>Windows</span>
            </button>
            <button
              className={`app-tab${activePlatform === 'mac' ? ' active' : ''}`}
              role="tab"
              data-platform="mac"
              aria-selected={activePlatform === 'mac'}
              onClick={() => setActivePlatform('mac')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>macOS</span>
            </button>
          </div>

          {/* Windows 面板 */}
          <div className={`app-panel${activePlatform === 'win' ? ' active' : ''}`} data-platform="win">
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
                  通过 Microsoft Store 安装，自动更新，安全可靠。
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span data-i18n="appWinBtn">在 Microsoft Store 获取</span>
                </a>
              </div>
            </div>
          </div>

          {/* macOS 面板 */}
          <div className={`app-panel${activePlatform === 'mac' ? ' active' : ''}`} data-platform="mac">
            <div className="app-panel-inner">
              <div className="app-panel-preview app-panel-coming">
                <svg viewBox="0 0 24 24" width="80" height="80" fill="#6b6b82">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className="app-coming-soon" data-i18n="appMacSoon">
                  Coming Soon
                </span>
              </div>
              <div className="app-panel-info">
                <h3 data-i18n="appMacTitle">Juicy Player for macOS</h3>
                <p className="app-panel-desc" data-i18n="appMacDesc">
                  macOS 版本正在开发中，敬请期待。
                </p>
                <button className="btn btn-primary btn-lg" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                  <span data-i18n="appMacBtn">敬请期待</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
