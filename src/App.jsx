import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import HeroSlider from './components/HeroSlider'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import Reveal from './components/Reveal'
import { BTN_PRIMARY, CONTAINER, EYEBROW, SECTION, SECTION_SUB, SECTION_TITLE } from './lib/ui'

function Loader({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1400)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      <div className="text-center">
        <img src="/logo.png" alt="" className="mx-auto h-24 w-24 rounded-full object-cover animate-spin-y" />
        <span className="mt-4 block text-xs uppercase tracking-[0.4em] text-amber-500">PAULSKY Barbershop</span>
      </div>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [bookingOpen, setBookingOpen] = useState(false)
  const openBooking = () => setBookingOpen(true)

  return (
    <>
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>

      <Header onBook={openBooking} />

      <motion.main
        className="bg-zinc-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <Hero onBook={openBooking} />
        <HeroSlider />
        <Services onBook={openBooking} />
        <Gallery />
        <Testimonials />

        <section className={`bg-zinc-950 ${SECTION}`}>
          <div className={CONTAINER}>
            <Reveal className="rounded-lg border border-amber-500/30 bg-zinc-900 px-6 py-16 text-center">
              <span className={EYEBROW}>Walk-ins welcome</span>
              <h2 className={SECTION_TITLE}>
                Your next best look is <span className="text-amber-500">one click away</span>
              </h2>
              <p className={`${SECTION_SUB} mx-auto max-w-xl`}>
                Reserve your chair in under a minute. Evening and Saturday slots
                fill up fast — book ahead to avoid the wait.
              </p>
              <div className="mt-8 flex justify-center">
                <button className={BTN_PRIMARY} type="button" onClick={openBooking}>
                  Book an appointment
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </motion.main>

      <Footer onBook={openBooking} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
