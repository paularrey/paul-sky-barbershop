import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BTN_PRIMARY, CONTAINER } from '../lib/ui'

const LINKS = [
  { href: '#showcase', label: 'Showcase' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

const NAV_LINK =
  'text-sm font-medium uppercase tracking-widest text-zinc-400 hover:text-amber-500 transition-colors'

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
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? 'bg-zinc-950/90 backdrop-blur border-b border-zinc-800/50'
            : 'border-b border-transparent'
        }`}
      >
        <div className={`${CONTAINER} flex h-20 items-center justify-between gap-6`}>
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo.png" alt="PAULSKY Barbershop logo" className="h-11 w-11 rounded-full object-cover" />
            <span className="font-display text-xl font-semibold uppercase tracking-widest">PAULSKY</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className={NAV_LINK}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className={BTN_PRIMARY} type="button" onClick={onBook}>
              Book Now
            </button>
            <button
              className="flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-md border border-zinc-700 hover:border-zinc-500 transition-colors md:hidden"
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span className="h-0.5 w-5 bg-zinc-100" />
              <span className="h-0.5 w-5 bg-zinc-100" />
              <span className="h-0.5 w-5 bg-zinc-100" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col border-l border-zinc-800/50 bg-zinc-900 p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Mobile menu"
            >
              <div className="mb-8 flex items-center justify-between">
                <img src="/logo.png" alt="" className="h-11 w-11 rounded-full object-cover" />
                <button
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-zinc-700 text-zinc-100 hover:border-zinc-500 transition-colors"
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col" aria-label="Mobile">
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-zinc-800 py-4 text-sm font-medium uppercase tracking-widest text-zinc-300 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <button
                className={`${BTN_PRIMARY} mt-auto w-full`}
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
