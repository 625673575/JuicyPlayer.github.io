import { useEffect, useState } from 'react'

/** 鼠标跟随光斑：一个延迟跟随鼠标的渐变光晕 */
export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let animId: number

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      setVisible(true)
    }
    const handleLeave = () => setVisible(false)

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)

    function animate() {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      setPos({ x: currentX, y: currentY })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div
      className="cursor-glow"
      id="cursorGlow"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: visible ? 1 : 0,
      }}
    />
  )
}
