import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { FaXmark } from 'react-icons/fa6';
import person1Img from '../../assets/testimonials/person1.jpg';
import person2Img from '../../assets/testimonials/person2.jpg';
import person3Img from '../../assets/testimonials/person3.jpg';
import './PersonTestimonials.css';

const RAW_TESTIMONIALS = [
  {
    id: 1,
    theme: 'theme-amber',
    tag: 'Stories That Matter',
    quote:
      '“When our village was submerged during the devastating flood, the Patkai Mahabahu Foundation team arrived with food, clean drinking water, and dry rations within hours. Their selfless seva gave our entire family the courage to rebuild.”',
    author: 'Pranjal Bora, Deochora Village',
    image: person1Img,
    fullStory:
      'During the severe flash floods in our region, our house was submerged up to four feet. Roads were cut off, and there was acute shortage of food and drinking water. The volunteers of Patkai Mahabahu Foundation arrived in boats within hours, distributing cooked meals, dry rations, and chlorine tablets. They also helped our children with basic study materials after the waters receded. We will forever remain grateful for their dedication.'
  },
  {
    id: 2,
    theme: 'theme-amber',
    tag: 'Stories That Matter',
    quote:
      '“The medical relief camp organized by Patkai Mahabahu Foundation was a true blessing for our elders and young children. Free medicines and primary health check-ups were provided right at our doorstep when government facilities were completely cut off.”',
    author: 'Ranjita Chetia, Riverside Settlement',
    image: person2Img,
    fullStory:
      'Post-flood waterborne diseases spread rapidly across our village. My elderly mother was severely ill, and travelling to the town hospital was impossible due to washed-out bridges. The medical team of Patkai Mahabahu Foundation set up a two-day camp in our community hall, diagnosed patients, and distributed essential antibiotics, ORS packets, and vitamins completely free. Their care saved many lives.'
  },
  {
    id: 3,
    theme: 'theme-amber',
    tag: 'Stories That Matter',
    quote:
      '“Seeing the transparent grassroots work of Patkai Mahabahu Foundation inspired me to join hands as a ground seva volunteer. Rebuilding homes and delivering essential supplies directly into hands who need it most brings genuine purpose.”',
    author: 'Hiteswar Saikia, Ground Seva Volunteer',
    image: person3Img,
    fullStory:
      'I have witnessed many relief organizations, but the dedication and transparency of Patkai Mahabahu Foundation stands apart. Every rupee donated translates directly into ration kits, clean water filters, and zinc sheets for rebuilding broken roofs. Working alongside the ground team during relief distribution showed me the real power of compassionate community service.'
  }
];

// Replicate array 9 times for deep buffer seamless infinite horizontal track
const SETS_COUNT = 9;
const SLIDES_DATA = Array.from({ length: SETS_COUNT }, (_, setIdx) =>
  RAW_TESTIMONIALS.map((t) => ({ ...t, slideKey: `set${setIdx}-${t.id}` }))
).flat();

const RAW_COUNT = RAW_TESTIMONIALS.length; // 3
// Start centered at Set 4 (middle set, index 12)
const INITIAL_INDEX = RAW_COUNT * 4;

export default function PersonTestimonials() {
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);
  const [enableTransition, setEnableTransition] = useState(true);
  const [modalStory, setModalStory] = useState(null);

  // Dragging states
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const dragStartXRef = useRef(0);
  const dragMovedRef = useRef(false);

  // Slide parameters
  const [slideParams, setSlideParams] = useState({ cardWidth: 840, gap: 24, containerWidth: 1200 });

  const updateSlideParams = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth || (typeof window !== 'undefined' ? window.innerWidth : 1200);
    let cardWidth = 840;
    let gap = 24;

    if (width < 640) {
      cardWidth = Math.min(width - 32, 440);
      gap = 14;
    } else if (width < 960) {
      cardWidth = Math.min(width - 80, 680);
      gap = 20;
    } else if (width < 1200) {
      cardWidth = 780;
      gap = 24;
    } else {
      cardWidth = 840;
      gap = 28;
    }

    setSlideParams({ cardWidth, gap, containerWidth: width });
  }, []);

  useEffect(() => {
    updateSlideParams();
    window.addEventListener('resize', updateSlideParams);
    return () => window.removeEventListener('resize', updateSlideParams);
  }, [updateSlideParams]);

  // Advance next / prev
  const slideNext = useCallback(() => {
    setEnableTransition(true);
    setActiveIndex((prev) => prev + 1);
  }, []);

  const slidePrev = useCallback(() => {
    setEnableTransition(true);
    setActiveIndex((prev) => prev - 1);
  }, []);

  // 1. TransitionEnd listener on the track: seamlessly snaps back to canonical middle set
  const handleTransitionEnd = (e) => {
    if (e.target !== trackRef.current || e.propertyName !== 'transform') return;

    const minSafe = RAW_COUNT * 2; // index 6
    const maxSafe = RAW_COUNT * 6; // index 18

    if (activeIndex >= maxSafe || activeIndex < minSafe) {
      setEnableTransition(false);
      const raw = ((activeIndex % RAW_COUNT) + RAW_COUNT) % RAW_COUNT;
      setActiveIndex(RAW_COUNT * 4 + raw);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
    }
  };

  // 2. Guaranteed Normalization Fallback: ensures carousel NEVER gets stuck or slides into blank space
  useEffect(() => {
    const minSafe = RAW_COUNT * 2; // 6
    const maxSafe = RAW_COUNT * 6; // 18

    if (activeIndex >= maxSafe || activeIndex < minSafe) {
      const fallbackTimer = setTimeout(() => {
        setEnableTransition(false);
        setActiveIndex((prev) => {
          const raw = ((prev % RAW_COUNT) + RAW_COUNT) % RAW_COUNT;
          return RAW_COUNT * 4 + raw;
        });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setEnableTransition(true);
          });
        });
      }, 700);

      return () => clearTimeout(fallbackTimer);
    }
  }, [activeIndex]);

  // 3. Tab Visibility handling: freeze timer when on another tab, normalize immediately when returning
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setActiveIndex((prev) => {
          if (prev >= RAW_COUNT * 6 || prev < RAW_COUNT * 2) {
            const raw = ((prev % RAW_COUNT) + RAW_COUNT) % RAW_COUNT;
            return RAW_COUNT * 4 + raw;
          }
          return prev;
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // 4. Automatic slide to next every 3.5 seconds infinitely (pauses safely when tab is hidden or user dragging)
  useEffect(() => {
    if (modalStory || isDragging) return;

    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      slideNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [modalStory, isDragging, slideNext]);

  // Unified Pointer Drag Handlers (supports mouse & touch seamlessly)
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragMovedRef.current = false;
    setEnableTransition(false);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 6) {
      dragMovedRef.current = true;
    }
    setDragOffset(deltaX);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    setEnableTransition(true);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const threshold = 55;
    if (dragOffset < -threshold) {
      slideNext();
    } else if (dragOffset > threshold) {
      slidePrev();
    }
    setDragOffset(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalStory) {
        if (e.key === 'Escape') setModalStory(null);
        return;
      }
      if (e.key === 'ArrowLeft') slidePrev();
      if (e.key === 'ArrowRight') slideNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalStory, slidePrev, slideNext]);

  const { cardWidth = 840, gap = 24 } = slideParams || {};

  // Measure the actual active card's layout position (cards now have two
  // distinct widths - active vs peek - so translateX must be derived from
  // real DOM geometry rather than a uniform-width formula) and center it.
  const [baseTranslateX, setBaseTranslateX] = useState(0);

  useLayoutEffect(() => {
    const containerEl = containerRef.current;
    const trackEl = trackRef.current;
    if (!containerEl || !trackEl) return;
    const activeEl = trackEl.children[activeIndex];
    if (!activeEl) return;

    const containerWidth = containerEl.offsetWidth || 0;
    const elWidth = activeEl.offsetWidth || 0;
    const elLeft = activeEl.offsetLeft || 0;

    setBaseTranslateX((containerWidth - elWidth) / 2 - elLeft);
  }, [activeIndex, slideParams]);

  const currentTranslateX = baseTranslateX + (dragOffset || 0);

  return (
    <section
      className="person-testimonials-section"
      aria-label="Person Testimonials"
    >
      <div
        className={`person-testimonials-carousel-viewport ${isDragging ? 'dragging' : ''}`}
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Continuous Horizontal Sliding Track */}
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          className="person-testimonials-track"
          style={{
            transform: `translateX(${currentTranslateX}px)`,
            gap: `${gap}px`,
            transition: enableTransition ? 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)' : 'none'
          }}
        >
          {SLIDES_DATA.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={item.slideKey}
                className={`person-testimonials-card ${item.theme || 'theme-amber'} ${isActive ? 'card-active' : 'card-peek'}`}
                style={{ width: `${cardWidth}px` }}
                onClick={() => {
                  if (!dragMovedRef.current && !isActive) {
                    setEnableTransition(true);
                    setActiveIndex(index);
                  }
                }}
              >
                {/* Left Content Side */}
                <div className="person-testimonial-content">
                  <h3 className="person-testimonial-tag">{item.tag}</h3>
                  <p className="person-testimonial-quote">{item.quote}</p>
                  <p className="person-testimonial-author">{item.author}</p>
                  <button
                    type="button"
                    className="btn-read-full-story"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (dragMovedRef.current) return;
                      setModalStory(item);
                    }}
                  >
                    Read full story
                  </button>
                </div>

                {/* Right Image Side (Non-hoverable solid integration) */}
                <div className="person-testimonial-image-box">
                  <img
                    src={item.image}
                    alt={item.author}
                    className="person-testimonial-portrait"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Read Full Story Modal */}
      {modalStory && (
        <div
          className="person-story-modal-overlay"
          onClick={() => setModalStory(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="person-story-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="person-modal-close-btn"
              onClick={() => setModalStory(null)}
              aria-label="Close story modal"
            >
              <FaXmark size={18} />
            </button>

            <div className="person-modal-header">
              <img
                src={modalStory.image}
                alt={modalStory.author}
                className="person-modal-thumb"
                draggable={false}
              />
              <div>
                <span className="person-modal-tag">{modalStory.tag}</span>
                <h4 className="person-modal-author">{modalStory.author}</h4>
              </div>
            </div>

            <div className="person-modal-body">
              <blockquote className="person-modal-quote">
                {modalStory.quote}
              </blockquote>
              <p className="person-modal-fullstory">
                {modalStory.fullStory}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
