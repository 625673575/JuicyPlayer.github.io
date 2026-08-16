import { useEffect, useRef, useState } from 'react'

const ICON_PLAY = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)
const ICON_PAUSE = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
)

const BAR_COUNT = 28
const DURATION = 214 // 秒

function fmt(s: number): string {
  s = Math.max(0, Math.floor(s))
  return `${Math.floor(s / 60)}:${('0' + (s % 60)).slice(-2)}`
}

/** Hero 区域的模拟播放器：频谱条动画 + 进度条 + 音量 */
export default function LivePlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const barsRef = useRef<(HTMLDivElement | null)[]>([])

  // 频谱条动画
  useEffect(() => {
    let animId: number
    const render = () => {
      const now = performance.now() / 1000
      barsRef.current.forEach((bar, j) => {
        if (!bar) return
        let h: number
        if (playing) {
          h = 22 + (Math.sin(now * 6 + j * 0.5) * 0.5 + 0.5) * 58 + Math.random() * 14
        } else {
          h = 8 + (Math.sin(now * 1.5 + j) * 0.5 + 0.5) * 8
        }
        bar.style.height = `${h}%`
      })
      animId = requestAnimationFrame(render)
    }
    render()
    return () => cancelAnimationFrame(animId)
  }, [playing])

  // 进度条推进
  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => {
      setProgress((p) => (p >= DURATION ? 0 : p + 0.1))
    }, 100)
    return () => clearInterval(timer)
  }, [playing])

  return (
    <div className={`live-player${playing ? ' playing' : ''}`} id="livePlayer">
      <div className="lp-top">
        <div className="lp-art" id="lpArt">
          ♪
        </div>
        <div className="lp-meta">
          <div className="lp-track" id="lpTrack">
            Neon Tide{' '}
            <span className="lp-eq">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="lp-artist" id="lpArtist">
            Juicy Player Radio
          </div>
        </div>
      </div>
      <div className="lp-bars" id="lpBars">
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <div key={i} className="lp-bar" ref={(el) => { barsRef.current[i] = el }} />
        ))}
      </div>
      <div className="lp-controls">
        <button
          className="lp-play"
          id="lpPlay"
          aria-label="播放 / 暂停"
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? ICON_PAUSE : ICON_PLAY}
        </button>
        <div className="lp-progress" id="lpProgress">
          <div
            className="lp-progress-fill"
            id="lpFill"
            style={{ width: `${(progress / DURATION) * 100}%` }}
          />
        </div>
        <span className="lp-time" id="lpTime">
          {fmt(progress)}
        </span>
      </div>
      <div className="lp-vol">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 5 6 9H2v6h4l5 4z" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
        <input
          type="range"
          id="lpVol"
          min={0}
          max={100}
          value={volume}
          aria-label="音量"
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  )
}
