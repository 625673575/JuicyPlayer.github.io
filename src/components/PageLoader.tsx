import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`page-loader${done ? ' done' : ''}`} id="pageLoader">
      <img
        src="/JuicyPlayer.github.io/images/icon_256.png"
        alt="Juicy Player"
        className="loader-logo"
      />
      <div className="loader-bar">
        <div className="loader-bar-inner" />
      </div>
    </div>
  )
}
