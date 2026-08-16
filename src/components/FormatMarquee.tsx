/** 格式跑马灯：循环滚动的音频格式列表 */
export default function FormatMarquee() {
  const text = (
    <>
      <b>MP3</b> &middot; FLAC &middot; WAV &middot; OGG &middot; AAC &middot; M4A &middot; OPUS &middot; AIFF &middot; APE
    </>
  )

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  )
}
