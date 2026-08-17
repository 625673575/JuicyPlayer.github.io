import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const ITEMS = [
  { qKey: 'faqQ1', aKey: 'faqA1', q: '手机和电脑连不上怎么办？', a: '先确认电脑和手机连的是同一个 Wi-Fi，且电脑端 Juicy Player 正在运行。遥控器会在局域网内自动发现播放器；若仍搜不到，多半是系统防火墙拦了它，到防火墙设置里允许 Juicy Player 通过专用网络即可。' },
  { qKey: 'faqQ2', aKey: 'faqA2', q: '支持哪些音频格式？', a: '常见格式基本全覆盖：MP3、FLAC、WAV、OGG、AAC、M4A、OPUS、AIFF、APE。无损格式（FLAC / APE / WAV）原样输出，不做转码，保留细节。' },
  { qKey: 'faqQ3', aKey: 'faqA3', q: 'Juicy Player 收费吗？', a: '完全免费，无广告、无内购。我们也不收集你的听歌记录——播放历史只存在你自己的电脑上。' },
  { qKey: 'faqQ4', aKey: 'faqA4', q: '遥控器需要注册账号吗？', a: '不需要。遥控走纯局域网点对点连接，数据不出你的路由器，自然也用不着登录。' },
  { qKey: 'faqQ5', aKey: 'faqA5', q: 'macOS 版什么时候出？', a: '正在开发中。给 GitHub 仓库点个 Watch / Star，版本一发布你就能第一时间收到通知。' },
]

function FAQItem({ item, isOpen, toggle }: { item: typeof ITEMS[0]; isOpen: boolean; toggle: () => void }) {
  return (
    <div className={`faq-item${isOpen ? ' open' : ''}`}>
      <button
        className="faq-q"
        aria-expanded={isOpen}
        onClick={toggle}
      >
        <span data-i18n={item.qKey}>{item.q}</span>
        <motion.span
          className="faq-ico"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <Plus width={20} height={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="faq-a-inner" data-i18n={item.aKey}>
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="howto" id="faq">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag" data-i18n="faqTag">
            常见问题
          </span>
          <h2 data-i18n="faqTitle">你可能想问</h2>
        </motion.div>
        <div className="faq">
          {ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIdx === i}
              toggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
