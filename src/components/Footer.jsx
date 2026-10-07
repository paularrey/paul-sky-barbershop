import Reveal from './Reveal'
import { CONTAINER, EYEBROW, SECTION } from '../lib/ui'

const YEAR = new Date().getFullYear()

const LINK_CLASS = 'text-sm text-zinc-400 hover:text-amber-500 transition-colors'

export default function Footer({ onBook }) {
  return (
    <footer className={`border-t border-zinc-800/50 bg-zinc-900 ${SECTION}`} id="contact">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <a href="#top" className="flex items-center gap-3">
              <img src="/logo.png" alt="PAULSKY Barbershop logo" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-display text-xl font-semibold uppercase tracking-widest">PAULSKY</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-zinc-400">
              Dark luxury grooming since 2026. Precision cuts, fades and beard
              craft — walk in sharp, walk out sharper.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h4 className={`${EYEBROW} font-sans`}>Opening hours</h4>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              <li>Mon – Fri · 09:00 – 20:00</li>
              <li>Saturday · 09:00 – 18:00</li>
              <li>Sunday · Closed</li>
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <h4 className={`${EYEBROW} font-sans`}>Explore</h4>
            <ul className="mt-5 space-y-3">
              <li>
                <a className={LINK_CLASS} href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className={LINK_CLASS} href="#gallery">
                  Gallery
                </a>
              </li>
              <li>
                <a className={LINK_CLASS} href="#testimonials">
                  Reviews
                </a>
              </li>
              <li>
                <button className={`${LINK_CLASS} cursor-pointer`} type="button" onClick={onBook}>
                  Book now
                </button>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.18}>
            <h4 className={`${EYEBROW} font-sans`}>Find us</h4>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              <li>Kasinala Street</li>
              <li>
                <a className={LINK_CLASS} href="tel:+33123456789">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li>
                <a className={LINK_CLASS} href="mailto:hello@paulsky.com">
                  hello@paulsky.com
                </a>
              </li>
              <li>Instagram · @paulsky</li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/50 pt-6 text-sm text-zinc-500 sm:flex-row">
          <span>© {YEAR} PAULSKY Barbershop. All rights reserved.</span>
          <span>Crafted with precision · Cuts · Fades · Shaves</span>
        </div>
      </div>
    </footer>
  )
}
