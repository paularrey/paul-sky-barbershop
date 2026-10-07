import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GALLERY_IMAGES } from '../data/gallery'
import Reveal from './Reveal'
import { CONTAINER, EYEBROW, SECTION, SECTION_SUB, SECTION_TITLE } from '../lib/ui'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'cuts', label: 'Cuts' },
  { id: 'fades', label: 'Fades' },
  { id: 'beard', label: 'Beard' },
  { id: 'styling', label: 'Styling' },
]

const FILTER_BASE =
  'h-10 px-5 rounded-md border text-xs font-semibold uppercase tracking-wider transition-colors'
const FILTER_ACTIVE = 'bg-amber-500 border-amber-500 text-black'
const FILTER_IDLE = 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100'

const ICON_BTN =
  'flex h-11 w-11 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-amber-500 hover:text-amber-500 transition-colors'

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
      if (e.key === 'ArrowRight') setActive((i) => (i === null ? i : (i + 1) % images.length))
      if (e.key === 'ArrowLeft') setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length))
    }
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
    }
  }, [active, images.length])

  return (
    <section className={`bg-zinc-950 ${SECTION}`} id="gallery">
      <div className={CONTAINER}>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={EYEBROW}>Portfolio</span>
          <h2 className={SECTION_TITLE}>
            The <span className="text-amber-500">gallery</span>
          </h2>
          <p className={SECTION_SUB}>
            {GALLERY_IMAGES.length} looks from the chair — filter by style and
            tap any photo to view it full size.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-3" delay={0.05}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`${FILTER_BASE} ${filter === f.id ? FILTER_ACTIVE : FILTER_IDLE}`}
              onClick={() => {
                setFilter(f.id)
                setActive(null)
              }}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {images.map((img, i) => (
              <motion.button
                key={img.src}
                layout
                type="button"
                className="aspect-square w-full overflow-hidden rounded-lg border border-zinc-800/50 bg-zinc-900"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(i)}
                aria-label="Open image"
              >
                <img
                  src={img.src}
                  alt={`Barbershop look ${i + 1}`}
                  className="h-full w-full object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active !== null && images[active] && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-zinc-950/95 p-5 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.24em] text-amber-500">
                {active + 1} / {images.length}
              </span>
              <button className={ICON_BTN} type="button" aria-label="Close" onClick={() => setActive(null)}>
                ✕
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center py-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[active].src}
                  src={images[active].src}
                  alt={`Barbershop look ${active + 1}`}
                  className="max-h-full max-w-full rounded-lg border border-zinc-800/50 object-contain"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                className={ICON_BTN}
                type="button"
                aria-label="Previous image"
                onClick={() => setActive((active - 1 + images.length) % images.length)}
              >
                ←
              </button>
              <button
                className={ICON_BTN}
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
