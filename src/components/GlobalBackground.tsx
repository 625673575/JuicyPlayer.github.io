/** Red dark-style global background: starlight + grid + red glow */
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
