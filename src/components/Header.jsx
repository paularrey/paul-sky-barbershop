import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { href: '#showcase', label: 'Showcase' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export default function Header({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('modal-open', open)
    return () => document.body.classList.remove('modal-open')
  }, [open])

  return (
    <>
      <header className={`header ${scrolled || open ? 'is-scrolled' : ''}`}>
        <div className="container header__inner">
          <a href="#top" className="brand">
            <img src="/logo.png" alt="PAULSKY Barbershop logo" className="brand__logo" />
            <span className="brand__name">PAULSKY</span>
          </a>

          <nav className="nav" aria-label="Primary">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <button className="btn btn--gold" onClick={onBook} type="button">
              Book Now
            </button>
            <button
              className="burger"
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Mobile menu"
            >
              <div className="drawer__top">
                <img src="/logo.png" alt="" className="brand__logo" />
                <button
                  className="drawer__close"
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>
              {LINKS.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              ))}
              <button
                className="btn btn--gold"
                type="button"
                onClick={() => {
                  setOpen(false)
                  onBook()
                }}
              >
                Book an appointment
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
