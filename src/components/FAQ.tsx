import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const ITEMS = [
  { qKey: 'faqQ1', aKey: 'faqA1', q: 'My phone can\'t connect to the PC?', a: 'Make sure both are on the same Wi-Fi and Juicy Player is running on the PC. The remote auto-discovers on the LAN; if it still fails, your firewall is likely blocking it — allow Juicy Player through private networks.' },
  { qKey: 'faqQ2', aKey: 'faqA2', q: 'Which formats are supported?', a: 'All common formats: MP3, FLAC, WAV, OGG, AAC, M4A, OPUS, AIFF, APE. Lossless formats (FLAC / APE / WAV) play bit-perfect, no transcoding.' },
  { qKey: 'faqQ3', aKey: 'faqA3', q: 'Is Juicy Player free?', a: 'Completely free — no ads, no in-app purchases. We don\'t track what you listen to either; your history stays on your own PC.' },
  { qKey: 'faqQ4', aKey: 'faqA4', q: 'Does the remote need an account?', a: 'No. It\'s pure LAN peer-to-peer — your data never leaves your router, so there\'s nothing to log into.' },
  { qKey: 'faqQ5', aKey: 'faqA5', q: 'When is the macOS version coming?', a: 'In development. Watch / Star the GitHub repo and you\'ll be notified the moment it ships.' },
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
            FAQ
          </span>
          <h2 data-i18n="faqTitle">Questions, answered</h2>
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
