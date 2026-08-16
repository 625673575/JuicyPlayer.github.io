import { useParticleCanvas } from '../hooks/useParticleCanvas'

export default function ParticleBackground() {
  const canvasRef = useParticleCanvas()
  return <canvas ref={canvasRef} id="particles-canvas" />
}
