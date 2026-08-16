import { useCallback, useEffect, useRef } from 'react'
import { DICT, Lang } from '../i18n/dictionary'

const STORAGE_KEY = 'jp-lang'

function detectLang(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'zh' || saved === 'en') return saved
  const nav = (navigator.language || '').toLowerCase()
  return nav.startsWith('zh') ? 'zh' : 'en'
}

/** 国际化 hook：返回当前语言、切换函数、以及翻译函数 t */
export function useI18n(lang: Lang, setLang: (l: Lang) => void) {
  const langRef = useRef(lang)
  langRef.current = lang

  // 应用翻译到所有 [data-i18n] 元素
  const apply = useCallback((l: Lang) => {
    const dict = DICT[l]
    if (!dict) return

    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en'

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n')
      if (key && dict[key] !== undefined) el.textContent = dict[key]
    })

    document.title = dict.pageTitle || document.title

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc && dict.heroDesc) metaDesc.setAttribute('content', dict.heroDesc)

    // 同步 Open Graph / Twitter 社交元信息
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    const twTitle = document.querySelector('meta[name="twitter:title"]')
    const twDesc = document.querySelector('meta[name="twitter:description"]')
    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogTitle) ogTitle.setAttribute('content', dict.pageTitle || '')
    if (ogDesc && dict.heroDesc) ogDesc.setAttribute('content', dict.heroDesc)
    if (twTitle) twTitle.setAttribute('content', dict.pageTitle || '')
    if (twDesc && dict.heroDesc) twDesc.setAttribute('content', dict.heroDesc)
    if (ogLocale) ogLocale.setAttribute('content', l === 'zh' ? 'zh_CN' : 'en_US')

    localStorage.setItem(STORAGE_KEY, l)
  }, [])

  useEffect(() => {
    apply(lang)
  }, [lang, apply])

  const toggle = useCallback(() => {
    setLang(langRef.current === 'zh' ? 'en' : 'zh')
  }, [setLang])

  const t = useCallback((key: string): string => {
    return DICT[langRef.current][key] ?? key
  }, [])

  return { t, toggle, lang }
}

export { detectLang }
