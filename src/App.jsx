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

function Loader({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1400)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      <div className="loader__inner">
        <img src="/logo.png" alt="" />
        <span>PAULSKY Barbershop</span>
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
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <Hero onBook={openBooking} />
        <HeroSlider />
        <Services onBook={openBooking} />
        <Gallery />
        <Testimonials />

        <section className="section">
          <div className="container">
            <Reveal className="cta-band">
              <span className="eyebrow">Walk-ins welcome</span>
              <h2>
                Your next best look is <span className="gold">one click away</span>
              </h2>
              <p>
                Reserve your chair in under a minute. Evening and Saturday slots
                fill up fast — book ahead to avoid the wait.
              </p>
              <button className="btn btn--gold" type="button" onClick={openBooking}>
                Book an appointment
              </button>
            </Reveal>
          </div>
        </section>
      </motion.main>

      <Footer onBook={openBooking} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
