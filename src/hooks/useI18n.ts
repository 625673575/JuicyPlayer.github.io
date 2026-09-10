import { useCallback, useEffect, useRef } from 'react'
import { DICT, Lang } from '../i18n/dictionary'

const STORAGE_KEY = 'jp-lang'

function detectLang(): Lang {
  return 'en'
}

/** i18n hook: applies translations to all [data-i18n] elements */
export function useI18n(lang: Lang) {
  const langRef = useRef(lang)
  langRef.current = lang

  // Apply translations to all [data-i18n] elements
  const apply = useCallback((l: Lang) => {
    const dict = DICT[l]
    if (!dict) return

    document.documentElement.lang = 'en'

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n')
      if (key && dict[key] !== undefined) el.textContent = dict[key]
    })

    document.title = dict.pageTitle || document.title

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc && dict.heroDesc) metaDesc.setAttribute('content', dict.heroDesc)

    // Sync Open Graph / Twitter social meta
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    const twTitle = document.querySelector('meta[name="twitter:title"]')
    const twDesc = document.querySelector('meta[name="twitter:description"]')
    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogTitle) ogTitle.setAttribute('content', dict.pageTitle || '')
    if (ogDesc && dict.heroDesc) ogDesc.setAttribute('content', dict.heroDesc)
    if (twTitle) twTitle.setAttribute('content', dict.pageTitle || '')
    if (twDesc && dict.heroDesc) twDesc.setAttribute('content', dict.heroDesc)
    if (ogLocale) ogLocale.setAttribute('content', 'en_US')

    localStorage.setItem(STORAGE_KEY, l)
  }, [])

  useEffect(() => {
    apply(lang)
  }, [lang, apply])

  const t = useCallback((key: string): string => {
    return DICT[langRef.current][key] ?? key
  }, [])

  return { t, lang }
}

export { detectLang }
