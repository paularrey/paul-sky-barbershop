import Reveal from './Reveal'
import { GALLERY_IMAGES } from '../data/gallery'

const SERVICES = [
  {
    title: 'Signature Haircut',
    desc: 'Consultation, precision cut, styling and a hot-towel finish tailored to your face shape.',
    tags: ['45 min', 'All hair types'],
    img: 0,
  },
  {
    title: 'Skin Fade',
    desc: 'Seamless blend from skin to length with razor detailing around the edges.',
    tags: ['50 min', 'Barber choice'],
    img: 4,
  },
  {
    title: 'Beard Sculpting',
    desc: 'Line-up, shaping and conditioning oil treatment for a sharp, healthy beard.',
    tags: ['30 min', 'Beard oil'],
    img: 8,
  },
  {
    title: 'Hot Towel Shave',
    desc: 'Traditional straight-razor shave with steam towels, pre-shave oil and balm.',
    tags: ['40 min', 'Classic ritual'],
    img: 12,
  },
  {
    title: 'The Full Experience',
    desc: 'Haircut, beard sculpt, hot-towel shave and a glass of whisky. Our masterclass session.',
    tags: ['90 min', 'Premium'],
    img: 16,
  },
  {
    title: 'Kids Cut',
    desc: 'Patient, friendly styling for our youngest gentlemen up to 12 years old.',
    tags: ['30 min', 'Under 12'],
    img: 20,
  },
]

export default function Services({ onBook }) {
  return (
    <section className="section section--alt" id="services">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal>
            <span className="eyebrow">Service Menu</span>
            <h2 className="section-title">
              Crafted for the <span className="gold">modern gentleman</span>
            </h2>
            <p className="section-sub">
              Every service is finished with premium products and a signature
              style consultation.
            </p>
          </Reveal>
        </div>

        <div className="services__grid">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.title}
              className="glass service-card"
              delay={(i % 3) * 0.08}
            >
              <div className="service-card__media">
                <img
                  src={GALLERY_IMAGES[service.img % GALLERY_IMAGES.length].src}
                  alt={service.title}
                  loading="lazy"
                />
              </div>
              <div className="service-card__body">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className="service-card__meta">
                  {service.tags.map((tag) => (
                    <span className="chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="btn btn--ghost" type="button" onClick={onBook}>
                  Book this
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
