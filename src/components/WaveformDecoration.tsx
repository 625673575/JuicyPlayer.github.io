import { useEffect, useRef } from 'react'

/**
 * Hero 底部的音频波形装饰：用正弦波叠加绘制跳动的频谱柱。
 */
export default function WaveformDecoration() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0

    function resize() {
      const parent = canvas!.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      canvas!.width = rect.width
      canvas!.height = 120
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      const bars = 120
      const barWidth = canvas!.width / bars

      for (let i = 0; i < bars; i++) {
        const x = i * barWidth
        const height =
          Math.sin(i * 0.15 + time) * 25 +
          Math.sin(i * 0.05 + time * 0.7) * 18 +
          Math.cos(i * 0.08 + time * 1.3) * 12 +
          Math.sin(i * 0.3 + time * 2) * 8 +
          35

        const gradient = ctx!.createLinearGradient(0, 60 - height / 2, 0, 60 + height / 2)
        gradient.addColorStop(0, 'rgba(255,107,53,0.2)')
        gradient.addColorStop(0.3, 'rgba(255,140,90,0.5)')
        gradient.addColorStop(0.5, 'rgba(255,217,61,0.6)')
        gradient.addColorStop(0.7, 'rgba(255,140,90,0.5)')
        gradient.addColorStop(1, 'rgba(255,107,53,0.2)')
        ctx!.fillStyle = gradient

        const barH = Math.max(height, 4)
        const radius = Math.min(barWidth / 2 - 0.5, 2)
        ctx!.beginPath()
        ctx!.roundRect(x, 60 - barH / 2, barWidth - 1, barH, radius)
        ctx!.fill()
      }

      time += 0.04
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="waveform-decoration" id="waveformCanvas" />
}
