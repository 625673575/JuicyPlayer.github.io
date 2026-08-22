import { useEffect } from 'react'

export type Accent = 'lime' | 'emerald' | 'cyan' | 'violet'

const STORAGE_KEY = 'jp-accent'

function getInitialAccent(): Accent {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'lime' || saved === 'emerald' || saved === 'cyan' || saved === 'violet') {
    return saved
  }
  return 'lime'
}

/** 管理强调色，将状态写入 <html data-accent> 和 localStorage */
export function useAccent(accent: Accent) {
  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent)
    localStorage.setItem(STORAGE_KEY, accent)
  }, [accent])
}

export { getInitialAccent }
