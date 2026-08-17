import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CornerDownLeft, ArrowUpDown } from 'lucide-react'

interface PaletteItem {
  label: string
  icon: string
  target?: string
  action?: 'lang' | 'theme'
}

const ITEMS: PaletteItem[] = [
  { label: '功能 Features', icon: '◆', target: '#features' },
  { label: '预览 Showcase', icon: '◈', target: '#showcase' },
  { label: '下载 Download', icon: '↓', target: '#download' },
  { label: '常见问题 FAQ', icon: '?', target: '#faq' },
  { label: '切换语言 Toggle language', icon: '文', action: 'lang' },
  { label: '切换主题 Toggle theme', icon: '☾', action: 'theme' },
]

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  onToggleLang: () => void
  onToggleTheme: () => void
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const panelVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export default function CommandPalette({ open, onClose, onToggleLang, onToggleTheme }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return q ? ITEMS.filter((it) => it.label.toLowerCase().includes(q)) : ITEMS
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIdx(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    setActiveIdx(0)
  }, [filtered.length])

  const activate = (item: PaletteItem) => {
    onClose()
    if (item.action === 'lang') onToggleLang()
    else if (item.action === 'theme') onToggleTheme()
    else if (item.target) {
      const el = document.querySelector(item.target)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => Math.min(filtered.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[activeIdx]) activate(filtered[activeIdx])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    if (!listRef.current) return
    const active = listRef.current.children[activeIdx] as HTMLElement | undefined
    active?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette-backdrop show"
          id="palette"
          role="dialog"
          aria-modal="true"
          aria-label="命令面板"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            className="palette"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div style={{ position: 'relative' }}>
              <Search width={18} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none' }} />
              <input
                ref={inputRef}
                className="palette-input"
                id="paletteInput"
                type="text"
                placeholder="搜索功能或跳转…"
                autoComplete="off"
                aria-label="搜索"
                style={{ paddingLeft: 46 }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="palette-list" id="paletteList" ref={listRef}>
              {filtered.length === 0 ? (
                <div className="palette-empty" data-i18n="paletteEmpty">
                  没有找到结果
                </div>
              ) : (
                filtered.map((item, idx) => (
                  <div
                    key={item.label}
                    className={`palette-item${idx === activeIdx ? ' active' : ''}`}
                    onClick={() => activate(item)}
                    onMouseEnter={() => setActiveIdx(idx)}
                  >
                    <span className="pi-ico">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))
              )}
            </div>
            <div className="palette-hint">
              <span><ArrowUpDown width={12} height={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> 选择</span>
              <span><CornerDownLeft width={12} height={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> 跳转</span>
              <span><kbd>esc</kbd> 关闭</span>
              <span><kbd>⌘</kbd>/<kbd>Ctrl</kbd> <kbd>K</kbd> 打开</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
