import { useEffect, useMemo, useRef, useState } from 'react'

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

export default function CommandPalette({ open, onClose, onToggleLang, onToggleTheme }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return q ? ITEMS.filter((it) => it.label.toLowerCase().includes(q)) : ITEMS
  }, [query])

  // 打开时聚焦输入框，过滤变化时重置选中项
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

  // 全局 Ctrl/Cmd+K 快捷键
  useEffect(() => {
    // 打开/关闭由父组件控制，这里不重复绑定
    return () => {}
  }, [])

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

  // 滚动选中项到可视区域
  useEffect(() => {
    if (!listRef.current) return
    const active = listRef.current.children[activeIdx] as HTMLElement | undefined
    active?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  return (
    <div
      className={`palette-backdrop${open ? ' show' : ''}`}
      id="palette"
      role="dialog"
      aria-modal="true"
      aria-label="命令面板"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="palette">
        <input
          ref={inputRef}
          className="palette-input"
          id="paletteInput"
          type="text"
          placeholder="搜索功能或跳转…  (Ctrl/⌘ + K)"
          autoComplete="off"
          aria-label="搜索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
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
              >
                <span className="pi-ico">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))
          )}
        </div>
        <div className="palette-hint">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> 选择
          </span>
          <span>
            <kbd>↵</kbd> 跳转
          </span>
          <span>
            <kbd>esc</kbd> 关闭
          </span>
          <span>
            <kbd>⌘</kbd>/<kbd>Ctrl</kbd> <kbd>K</kbd> 打开
          </span>
        </div>
      </div>
    </div>
  )
}
