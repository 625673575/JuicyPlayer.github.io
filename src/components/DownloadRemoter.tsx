import { useEffect, useRef } from 'react'

export default function DownloadRemoter() {
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
    <section className="download" id="download">
      <div className="container">
        <div className="section-header">
          <span className="section-tag" data-i18n="dlTag">
            手机遥控
          </span>
          <h2 data-i18n="dlTitle">Juicy Remoter — 遥控器</h2>
          <p className="section-desc" data-i18n="dlDesc">
            用手机遥控 JuicyPlayer 播放器，局域网内即时响应
          </p>
        </div>
        <div className="download-grid">
          {/* Android */}
          <div className="dl-card" data-reveal ref={(el) => { cardsRef.current[0] = el }}>
            <div className="dl-icon-wrap">
              <svg viewBox="0 0 24 24" width="44" height="44" fill="#3ddc84">
                <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0012 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31A5.983 5.983 0 006 7h12c0-2.12-1.1-3.98-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
              </svg>
            </div>
            <h3 data-i18n="dlAndTitle">Juicy Remoter · Android</h3>
            <span className="dl-version">v1.0.0</span>
            <p className="dl-note" data-i18n="dlAndNote">
              Android 7.0+
            </p>
            <a href="/JuicyPlayer.github.io/downloads/JuicyPlayer-Remote-1.0.0.apk" className="btn btn-primary btn-block">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span data-i18n="dlAndBtn">下载 APK</span>
            </a>
            <span className="dl-size" data-i18n="dlAndSize">
              约 57 MB · .apk
            </span>
          </div>

          {/* Windows */}
          <div className="dl-card" data-reveal ref={(el) => { cardsRef.current[1] = el }}>
            <div className="dl-icon-wrap">
              <svg viewBox="0 0 24 24" width="44" height="44" fill="#00aef0">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
              </svg>
            </div>
            <h3 data-i18n="dlWinTitle">Juicy Remoter · Windows</h3>
            <span className="dl-version">v1.0.0</span>
            <p className="dl-note" data-i18n="dlWinNote">
              Windows 10 / 11 · 64-bit
            </p>
            <a href="/JuicyPlayer.github.io/downloads/JuicyPlayer-Setup-1.0.0.exe" className="btn btn-primary btn-block">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span data-i18n="dlWinBtn">下载安装包</span>
            </a>
            <span className="dl-size" data-i18n="dlWinSize">
              约 14 MB · .exe
            </span>
          </div>
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
