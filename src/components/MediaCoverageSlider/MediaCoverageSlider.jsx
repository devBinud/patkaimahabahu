import { useState, useEffect, useRef, useCallback } from 'react'
import { videoCoverage } from '../../data/mediaCoverage'
import VideoCoverageCard from '../VideoCoverageCard/VideoCoverageCard'
import './MediaCoverageSlider.css'

const RAW_COUNT = videoCoverage.length

// Three copies of the list (previous / current / next) let the track keep
// sliding in either direction; whenever it lands outside the middle copy it
// silently jumps to the same video in the middle copy.
const SLIDES = [0, 1, 2].flatMap((setIdx) =>
  videoCoverage.map((video) => ({ ...video, slideKey: `${setIdx}-${video.id}` }))
)

const AUTOPLAY_MS = 5000
const TRANSITION_MS = 600
const DRAG_THRESHOLD = 55

const rawIndexOf = (index) => ((index % RAW_COUNT) + RAW_COUNT) % RAW_COUNT

// Same card as the News & Media page, sized so about three show on desktop
function getCardLayout(width) {
  if (width < 640) return { cardWidth: Math.min(width - 72, 340), gap: 16 }
  if (width < 960) return { cardWidth: 330, gap: 20 }
  if (width < 1200) return { cardWidth: 350, gap: 24 }
  return { cardWidth: 380, gap: 28 }
}

export default function MediaCoverageSlider() {
  const [index, setIndex] = useState(RAW_COUNT)
  const [animate, setAnimate] = useState(true)
  const [layout, setLayout] = useState({ cardWidth: 380, gap: 28, containerWidth: 1200 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )

  const viewportRef = useRef(null)
  const dragStartXRef = useRef(0)
  const dragMovedRef = useRef(false)

  useEffect(() => {
    const measure = () => {
      const width = viewportRef.current?.offsetWidth || window.innerWidth
      setLayout({ ...getCardLayout(width), containerWidth: width })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Moves are clamped to the three copies so rapid clicks can't run off the track
  const move = useCallback((delta) => {
    setAnimate(true)
    setIndex((i) => Math.min(Math.max(i + delta, 0), SLIDES.length - 1))
  }, [])

  // Once the slide animation has finished, jump back into the middle copy
  // (a timer rather than transitionend, which never fires in hidden tabs or
  // with reduced motion)
  useEffect(() => {
    if (index >= RAW_COUNT && index < RAW_COUNT * 2) return
    const timer = setTimeout(() => {
      setAnimate(false)
      setIndex(RAW_COUNT + rawIndexOf(index))
    }, TRANSITION_MS + 50)
    return () => clearTimeout(timer)
  }, [index])

  // Re-enable the slide animation on the frame after a silent jump
  useEffect(() => {
    if (animate) return
    let innerFrame
    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => setAnimate(true))
    })
    return () => {
      cancelAnimationFrame(outerFrame)
      cancelAnimationFrame(innerFrame)
    }
  }, [animate])

  // Autoplay, paused while the visitor hovers, focuses or drags the slider
  useEffect(() => {
    if (reducedMotion || isPaused || isDragging) return
    const timer = setInterval(() => {
      if (!document.hidden) move(1)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [reducedMotion, isPaused, isDragging, move])

  // Pointer drag / swipe. The pointer is only captured once it actually moves,
  // so a plain click still reaches the links inside the card.
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return
    dragStartXRef.current = e.clientX
    dragMovedRef.current = false
    setIsDragging(true)
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    const delta = e.clientX - dragStartXRef.current
    if (!dragMovedRef.current && Math.abs(delta) > 6) {
      dragMovedRef.current = true
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {
        // pointer already released
      }
    }
    if (dragMovedRef.current) setDragOffset(delta)
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    setIsDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // pointer was never captured
    }
    if (dragOffset < -DRAG_THRESHOLD) move(1)
    else if (dragOffset > DRAG_THRESHOLD) move(-1)
    setDragOffset(0)
    // The click that follows a drag is dispatched before this timeout runs
    if (dragMovedRef.current) {
      setTimeout(() => {
        dragMovedRef.current = false
      }, 0)
    }
  }

  // A drag must not also count as a click on a card or link
  const handleClickCapture = (e) => {
    if (dragMovedRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      move(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      move(1)
    }
  }

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false)
  }

  const { cardWidth, gap, containerWidth } = layout
  const translateX = (containerWidth - cardWidth) / 2 - index * (cardWidth + gap) + dragOffset
  // Cards fully inside the viewport on each side of the centred one; only
  // these are exposed to keyboard and screen-reader users
  const visibleHalf = Math.max(0, Math.floor((containerWidth - cardWidth) / 2 / (cardWidth + gap)))
  const activeRaw = rawIndexOf(index)
  const slideTransition = animate && !isDragging && !reducedMotion
    ? `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
    : 'none'

  return (
    <div
      className="mcs-root"
      role="region"
      aria-roledescription="carousel"
      aria-label="Media coverage videos"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={viewportRef}
        className={`mcs-viewport${isDragging && dragOffset !== 0 ? ' is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
      >
        <div
          className="mcs-track"
          style={{ transform: `translateX(${translateX}px)`, gap: `${gap}px`, transition: slideTransition }}
        >
          {SLIDES.map((slide, i) => {
            const isVisible = Math.abs(i - index) <= visibleHalf
            return (
              <div
                key={slide.slideKey}
                className="mcs-slide"
                style={{ width: `${cardWidth}px` }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${rawIndexOf(i) + 1} of ${RAW_COUNT}`}
                aria-hidden={!isVisible}
              >
                <VideoCoverageCard video={slide} focusable={isVisible} />
              </div>
            )
          })}
        </div>
      </div>

      <div className="mcs-dots">
        {videoCoverage.map((video, dotIdx) => (
          <button
            key={video.id}
            type="button"
            className={`mcs-dot${dotIdx === activeRaw ? ' is-active' : ''}`}
            aria-label={`Show video ${dotIdx + 1} of ${RAW_COUNT}`}
            aria-current={dotIdx === activeRaw ? 'true' : undefined}
            onClick={() => move(dotIdx - activeRaw)}
          />
        ))}
      </div>
    </div>
  )
}
