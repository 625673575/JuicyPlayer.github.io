import { useEffect, useRef } from 'react'

/**
 * Scroll reveal animation: adds the `revealed` class when an element enters the viewport.
 * Returns a ref array bound to each element that should be revealed.
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
