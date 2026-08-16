import { useState } from 'react'

const ITEMS = [
  { qKey: 'faqQ1', aKey: 'faqA1', q: '手机和电脑连不上怎么办？', a: '先确认电脑和手机连的是同一个 Wi-Fi，且电脑端 Juicy Player 正在运行。遥控器会在局域网内自动发现播放器；若仍搜不到，多半是系统防火墙拦了它，到防火墙设置里允许 Juicy Player 通过专用网络即可。' },
  { qKey: 'faqQ2', aKey: 'faqA2', q: '支持哪些音频格式？', a: '常见格式基本全覆盖：MP3、FLAC、WAV、OGG、AAC、M4A、OPUS、AIFF、APE。无损格式（FLAC / APE / WAV）原样输出，不做转码，保留细节。' },
  { qKey: 'faqQ3', aKey: 'faqA3', q: 'Juicy Player 收费吗？', a: '完全免费，无广告、无内购。我们也不收集你的听歌记录——播放历史只存在你自己的电脑上。' },
  { qKey: 'faqQ4', aKey: 'faqA4', q: '遥控器需要注册账号吗？', a: '不需要。遥控走纯局域网点对点连接，数据不出你的路由器，自然也用不着登录。' },
  { qKey: 'faqQ5', aKey: 'faqA5', q: 'macOS 版什么时候出？', a: '正在开发中。给 GitHub 仓库点个 Watch / Star，版本一发布你就能第一时间收到通知。' },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="howto" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-tag" data-i18n="faqTag">
            常见问题
          </span>
          <h2 data-i18n="faqTitle">你可能想问</h2>
        </div>
        <div className="faq">
          {ITEMS.map((item, i) => (
            <div key={i} className={`faq-item${openIdx === i ? ' open' : ''}`}>
              <button
                className="faq-q"
                aria-expanded={openIdx === i}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span data-i18n={item.qKey}>{item.q}</span>
                <span className="faq-ico">+</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner" data-i18n={item.aKey}>
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
