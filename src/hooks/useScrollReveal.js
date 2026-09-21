import { useEffect } from 'react'

/**
 * Observes every `.reveal` element under rootRef and adds `.reveal-visible`
 * the first time it scrolls into view, then stops watching it.
 * Pairs with the Lenis smooth-scroll instance already running in App.jsx.
 */
export default function useScrollReveal(rootRef, deps = []) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const els = root.querySelectorAll('.reveal')
    if (!els.length) return

    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('reveal-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
