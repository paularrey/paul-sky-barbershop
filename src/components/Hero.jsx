import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { BTN_PRIMARY, BTN_SECONDARY, CONTAINER, EYEBROW, SECTION } from '../lib/ui'

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
    <section className={`relative flex min-h-screen items-center overflow-hidden bg-zinc-950 ${SECTION}`} id="top">
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      <div className={`${CONTAINER} relative z-10 pt-24 pb-16`}>
        <motion.div className="max-w-2xl" variants={container} initial="hidden" animate="show">
          <motion.p className={EYEBROW} variants={item}>
            Est. 2026 · Premium Grooming
          </motion.p>

          <motion.h1
            className="mt-5 text-5xl font-semibold uppercase leading-tight tracking-tight md:text-7xl"
            variants={item}
          >
            Cuts that
            <span className="block text-amber-500 italic">command respect</span>
          </motion.h1>

          <motion.p className="mt-6 max-w-xl text-base text-zinc-400 md:text-lg" variants={item}>
            A dark-luxury barbershop where precision fades, sculpted beards and
            hot-towel shaves meet old-school craft and modern style.
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap gap-4" variants={item}>
            <button className={BTN_PRIMARY} type="button" onClick={onBook}>
              Book your chair
            </button>
            <a className={BTN_SECONDARY} href="#gallery">
              View the gallery
            </a>
          </motion.div>

          <motion.div className="mt-12 grid grid-cols-3 gap-6 border-t border-zinc-800/50 pt-8" variants={item}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong className="block font-display text-3xl text-amber-500 md:text-4xl">{stat.value}</strong>
                <span className="mt-1 block text-xs uppercase tracking-widest text-zinc-400">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-zinc-500 md:flex">
        <span>Scroll</span>
        <span className="h-10 w-px animate-pulse bg-amber-500" />
      </div>
    </section>
  )
}
