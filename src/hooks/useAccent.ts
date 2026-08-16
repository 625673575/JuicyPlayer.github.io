import { useEffect } from 'react'

export type Accent = 'orange' | 'purple' | 'green' | 'pink' | 'blue'

const STORAGE_KEY = 'jp-accent'

function getInitialAccent(): Accent {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'orange' || saved === 'purple' || saved === 'green' || saved === 'pink' || saved === 'blue') {
    return saved
  }
  return 'orange'
}

/** 管理强调色，将状态写入 <html data-accent> 和 localStorage */
export function useAccent(accent: Accent) {
  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent)
    localStorage.setItem(STORAGE_KEY, accent)
  }, [accent])
}

export { getInitialAccent }
