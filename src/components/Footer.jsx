import Reveal from './Reveal'

const YEAR = new Date().getFullYear()

export default function Footer({ onBook }) {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__grid">
          <Reveal className="footer__brand">
            <a href="#top" className="brand">
              <img src="/logo.png" alt="PAULSKY Barbershop logo" className="footer__logo" />
              <span className="brand__name">PAULSKY</span>
            </a>
            <p>
              Dark luxury grooming since 2014. Precision cuts, fades and beard
              craft — walk in sharp, walk out sharper.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h4>Opening hours</h4>
            <ul>
              <li>Mon – Fri · 09:00 – 20:00</li>
              <li>Saturday · 09:00 – 18:00</li>
              <li>Sunday · Closed</li>
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <h4>Explore</h4>
            <ul>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#testimonials">Reviews</a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onBook}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    color: 'inherit',
                  }}
                >
                  Book now
                </button>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.18}>
            <h4>Find us</h4>
            <ul>
              <li>Kasinala Street</li>
              <li>
                <a href="tel:+33123456789">+33 1 23 45 67 89</a>
              </li>
              <li>
                <a href="mailto:hello@paulsky.com">hello@paulsky.com</a>
              </li>
              <li>Instagram · @paulsky</li>
            </ul>
          </Reveal>
        </div>

        <div className="footer__bottom">
          <span>© {YEAR} PAULSKY Barbershop. All rights reserved.</span>
          <span>Crafted with precision · Cuts · Fades · Shaves</span>
        </div>
      </div>
    </footer>
  )
}
