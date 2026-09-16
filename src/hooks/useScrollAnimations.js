import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollAnimations
 * Unified single-effect scroll animation system powered by GSAP & ScrollTrigger.
 * All animated elements use ONE single consistent, smooth reveal showing from the top (fade-down).
 * No mixed directions (no left/right/zoom/clip) - clean, cohesive, and premium.
 */
export default function useScrollAnimations(dependencies = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !containerRef.current) return

    const isMobile = window.innerWidth <= 768
    // Enters smoothly from the top (negative y translation down to 0)
    const yTopOffset = isMobile ? -16 : -24

    const ctx = gsap.context(() => {
      // 1. Single individual animated elements (headings, text blocks, columns, cards)
      const singleElements = containerRef.current.querySelectorAll(
        '[data-animate]:not([data-animate="stagger"]), .gsap-reveal, .gsap-fade-up, .gsap-fade-left, .gsap-fade-right, .gsap-zoom-in, .gsap-clip-reveal'
      )

      singleElements.forEach((el) => {
        // Skip child elements of a stagger container to avoid duplicate animation
        if (el.closest('[data-animate="stagger"], .gsap-stagger')) return

        const delay = parseFloat(el.getAttribute('data-delay') || 0)
        const duration = parseFloat(el.getAttribute('data-duration') || 0.8)

        gsap.fromTo(
          el,
          { opacity: 0, y: yTopOffset },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        )
      })

      // 2. Staggered groups (cards, metric badges, button groups) - same single smooth effect from top
      const staggerContainers = containerRef.current.querySelectorAll('[data-animate="stagger"], .gsap-stagger')
      staggerContainers.forEach((container) => {
        const targetSelector = container.getAttribute('data-stagger-target') || ':scope > *'
        const items = container.querySelectorAll(targetSelector)
        if (!items.length) return

        const staggerTime = parseFloat(container.getAttribute('data-stagger-time') || 0.08)
        const delay = parseFloat(container.getAttribute('data-delay') || 0)
        const duration = parseFloat(container.getAttribute('data-duration') || 0.75)

        gsap.fromTo(
          items,
          { opacity: 0, y: yTopOffset },
          {
            opacity: 1,
            y: 0,
            duration,
            stagger: staggerTime,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        )
      })

      ScrollTrigger.refresh()
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, dependencies)

  return containerRef
}
