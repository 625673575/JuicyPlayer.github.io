import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  baseOpacity: number
  hue: number
  reset: () => void
}

/**
 * 粒子背景：在 canvas 上绘制互相连接的粒子，
 * 鼠标靠近时粒子会被推开。
 */
export function useParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const PARTICLE_COUNT = 80

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    const handleLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }
    document.addEventListener('mousemove', handleMouse)
    document.addEventListener('mouseleave', handleLeave)

    // 创建粒子
    const particles: Particle[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p: Particle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.5 + 0.1,
        baseOpacity: 0,
        hue: Math.random() * 30 - 15,
        reset() {
          this.x = Math.random() * canvas!.width
          this.y = Math.random() * canvas!.height
          this.size = Math.random() * 2.5 + 0.5
          this.speedX = (Math.random() - 0.5) * 0.6
          this.speedY = (Math.random() - 0.5) * 0.6
          this.opacity = Math.random() * 0.5 + 0.1
          this.baseOpacity = this.opacity
          this.hue = Math.random() * 30 - 15
        },
      }
      p.baseOpacity = p.opacity
      particles.push(p)
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      particles.forEach((p) => {
        // 鼠标排斥
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150
          p.x += (dx / dist) * force * 2
          p.y += (dy / dist) * force * 2
          p.opacity = Math.min(1, p.baseOpacity + force * 0.5)
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.05
        }

        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0 || p.x > canvas!.width || p.y < 0 || p.y > canvas!.height) p.reset()

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        const g = 107 + p.hue
        const b = 53 + p.hue
        ctx!.fillStyle = `rgba(255, ${Math.floor(g)}, ${Math.floor(b)}, ${p.opacity})`
        ctx!.fill()
      })

      // 连线
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(255, 140, 90, ${0.12 * (1 - dist / 180)})`
            ctx!.lineWidth = 0.8
            ctx!.stroke()
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', handleMouse)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return canvasRef
}
