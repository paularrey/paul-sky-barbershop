import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'

const HeroCanvas = lazy(() => import('./three/HeroCanvas'))

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
}

const item = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const stats = [
  { value: '12k+', label: 'Cuts delivered' },
  { value: '4.9', label: 'Google rating' },
  { value: '9', label: 'Master barbers' },
]

export default function Hero({ onBook }) {
  return (
    <section className="hero" id="top">
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>
      <div className="hero__vignette" />

      <div className="container hero__content">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p className="eyebrow" variants={item}>
            Est. 2026 · Premium Grooming
          </motion.p>

          <motion.h1 variants={item}>
            Cuts that
            <em>command respect</em>
          </motion.h1>

          <motion.p className="hero__lead" variants={item}>
            A dark-luxury barbershop where precision fades, sculpted beards and
            hot-towel shaves meet old-school craft and modern style.
          </motion.p>

          <motion.div className="hero__cta" variants={item}>
            <button className="btn btn--gold" type="button" onClick={onBook}>
              Book your chair
            </button>
            <a className="btn btn--ghost" href="#gallery">
              View the gallery
            </a>
          </motion.div>

          <motion.div className="hero__stats" variants={item}>
            {stats.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="hero__scroll">Scroll</div>
    </section>
  )
}
