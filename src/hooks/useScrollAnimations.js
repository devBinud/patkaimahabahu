import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollAnimations
 * Professional scroll animation system powered by GSAP & ScrollTrigger.
 * Automatically discovers elements with data-animate attributes or .gsap-* classes
 * within the referenced container, ensuring clean React lifecycle management with gsap.context.
 */
export default function useScrollAnimations(dependencies = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !containerRef.current) return

    const isMobile = window.innerWidth <= 768
    const yDistance = isMobile ? 22 : 36
    const xDistance = isMobile ? 24 : 42

    const ctx = gsap.context(() => {
      // 1. Fade Up elements
      const fadeUpElements = containerRef.current.querySelectorAll('[data-animate="fade-up"], .gsap-fade-up')
      fadeUpElements.forEach((el) => {
        const delay = parseFloat(el.getAttribute('data-delay') || 0)
        const duration = parseFloat(el.getAttribute('data-duration') || 0.85)

        gsap.fromTo(
          el,
          { opacity: 0, y: yDistance },
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

      // 2. Slide from Left elements
      const fadeLeftElements = containerRef.current.querySelectorAll('[data-animate="fade-left"], .gsap-fade-left')
      fadeLeftElements.forEach((el) => {
        const delay = parseFloat(el.getAttribute('data-delay') || 0)
        const duration = parseFloat(el.getAttribute('data-duration') || 0.85)

        gsap.fromTo(
          el,
          { opacity: 0, x: -xDistance },
          {
            opacity: 1,
            x: 0,
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

      // 3. Slide from Right elements
      const fadeRightElements = containerRef.current.querySelectorAll('[data-animate="fade-right"], .gsap-fade-right')
      fadeRightElements.forEach((el) => {
        const delay = parseFloat(el.getAttribute('data-delay') || 0)
        const duration = parseFloat(el.getAttribute('data-duration') || 0.85)

        gsap.fromTo(
          el,
          { opacity: 0, x: xDistance },
          {
            opacity: 1,
            x: 0,
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

      // 4. Subtle Zoom/Scale In elements
      const zoomElements = containerRef.current.querySelectorAll('[data-animate="zoom-in"], .gsap-zoom-in')
      zoomElements.forEach((el) => {
        const delay = parseFloat(el.getAttribute('data-delay') || 0)
        const duration = parseFloat(el.getAttribute('data-duration') || 0.9)

        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.93 },
          {
            opacity: 1,
            scale: 1,
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

      // 5. Clip / Reveal effect (clean curtain reveal)
      const clipElements = containerRef.current.querySelectorAll('[data-animate="clip-reveal"], .gsap-clip-reveal')
      clipElements.forEach((el) => {
        const delay = parseFloat(el.getAttribute('data-delay') || 0)
        const duration = parseFloat(el.getAttribute('data-duration') || 0.95)

        gsap.fromTo(
          el,
          {
            opacity: 0,
            clipPath: 'inset(12% 0 12% 0)'
          },
          {
            opacity: 1,
            clipPath: 'inset(0% 0 0% 0)',
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        )
      })

      // 6. Staggered groups (for cards, metrics, buttons, grids)
      const staggerContainers = containerRef.current.querySelectorAll('[data-animate="stagger"], .gsap-stagger')
      staggerContainers.forEach((container) => {
        const targetSelector = container.getAttribute('data-stagger-target') || ':scope > *'
        const items = container.querySelectorAll(targetSelector)
        if (!items.length) return

        const staggerTime = parseFloat(container.getAttribute('data-stagger-time') || 0.1)
        const delay = parseFloat(container.getAttribute('data-delay') || 0)
        const duration = parseFloat(container.getAttribute('data-duration') || 0.75)

        gsap.fromTo(
          items,
          { opacity: 0, y: yDistance },
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
