import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GALLERY_IMAGES } from '../data/gallery'
import Reveal from './Reveal'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'cuts', label: 'Cuts' },
  { id: 'fades', label: 'Fades' },
  { id: 'beard', label: 'Beard' },
  { id: 'styling', label: 'Styling' },
]

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)

  const images = useMemo(
    () =>
      filter === 'all'
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === filter),
    [filter],
  )

  useEffect(() => {
    if (active === null) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight')
        setActive((i) => (i === null ? i : (i + 1) % images.length))
      if (e.key === 'ArrowLeft')
        setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length))
    }
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
    }
  }, [active, images.length])

  return (
    <section className="section" id="gallery">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal>
            <span className="eyebrow">Portfolio</span>
            <h2 className="section-title">
              The <span className="gold">gallery</span>
            </h2>
            <p className="section-sub">
              {GALLERY_IMAGES.length} looks from the chair — filter by style and
              tap any photo to view it full size.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="gallery__filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter-btn ${filter === f.id ? 'is-active' : ''}`}
                onClick={() => {
                  setFilter(f.id)
                  setActive(null)
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="gallery__grid">
          <AnimatePresence mode="popLayout">
            {images.map((img, i) => (
              <motion.button
                key={img.src}
                layout
                type="button"
                className="gallery__item"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(i)}
                aria-label="Open image"
              >
                <img src={img.src} alt={`Barbershop look ${i + 1}`} loading="lazy" />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active !== null && images[active] && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="lightbox__bar">
              <span className="lightbox__count">
                {active + 1} / {images.length}
              </span>
              <button
                className="icon-btn"
                type="button"
                aria-label="Close"
                onClick={() => setActive(null)}
              >
                ✕
              </button>
            </div>
            <div className="lightbox__stage">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[active].src}
                  src={images[active].src}
                  alt={`Barbershop look ${active + 1}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>
            <div className="lightbox__nav">
              <button
                className="icon-btn"
                type="button"
                aria-label="Previous image"
                onClick={() => setActive((active - 1 + images.length) % images.length)}
              >
                ←
              </button>
              <button
                className="icon-btn"
                type="button"
                aria-label="Next image"
                onClick={() => setActive((active + 1) % images.length)}
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
