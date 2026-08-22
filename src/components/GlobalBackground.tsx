/** 红色暗黑风格全局背景：星光 + 网格 + 红晕 */
export default function GlobalBackground() {
  return (
    <>
      <div className="global-bg">
        <div className="global-bg-glow" />
        <div className="stars-1" />
        <div className="stars-2" />
      </div>
      <div className="global-bg-grid" />
      <div className="gradient-blur" />
    </>
  )
}
