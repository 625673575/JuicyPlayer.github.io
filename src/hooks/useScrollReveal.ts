import { useEffect, useRef } from 'react'

/**
 * 滚动揭示动画：当元素进入视口时添加 revealed class。
 * 返回一个 ref 数组，分别绑定到每个需要揭示的元素。
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(_count?: number) {
  const refs = useRef<(T | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    )

    refs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return refs
}
