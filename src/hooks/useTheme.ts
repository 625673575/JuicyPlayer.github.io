import { useEffect } from 'react'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'jp-theme'

function getInitialTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'dark' || saved === 'light') return saved
  return 'dark'
}

/** Manage dark/light theme, writing state to <html data-theme> and localStorage */
export function useTheme(theme: Theme) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])
}

export { getInitialTheme }
export type { Theme }
