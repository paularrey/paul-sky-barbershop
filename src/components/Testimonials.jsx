import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { GALLERY_IMAGES } from '../data/gallery'
import Reveal from './Reveal'

const REVIEWS = [
  {
    quote:
      'Best fade I have ever had in the city. The consultation, the hot towel, the music — everything feels premium.',
    name: 'Marcus L.',
    role: 'Client for 4 years',
    avatar: GALLERY_IMAGES[3]?.src,
  },
  {
    quote:
      'I came in for a trim and left with a whole new look. They actually listen and know exactly what suits your face.',
    name: 'Daniel R.',
    role: 'First visit',
    avatar: GALLERY_IMAGES[7]?.src,
  },
  {
    quote:
      'The beard sculpt is unreal. Sharp lines, zero irritation, and the beard oil they use smells incredible.',
    name: 'Yanis B.',
    role: 'Beard regular',
    avatar: GALLERY_IMAGES[11]?.src,
  },
  {
    quote:
      'Booked the Full Experience with a whisky. Ninety minutes of pure relaxation — worth every euro.',
    name: 'Thomas K.',
    role: 'VIP member',
    avatar: GALLERY_IMAGES[15]?.src,
  },
]

export default function Testimonials() {
  return (
    <section className="section section--alt" id="testimonials">
      <div className="container section-head section-head--center">
        <Reveal>
          <span className="eyebrow">Testimonials</span>
          <h2 className="section-title">
            Words from the <span className="gold">chair</span>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <div className="testimonials__wrap">
          <Swiper
            modules={[Autoplay, Pagination, Keyboard]}
            spaceBetween={24}
            slidesPerView={1}
            speed={700}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            grabCursor
          >
            {REVIEWS.map((review) => (
              <SwiperSlide key={review.name}>
                <figure className="testimonial">
                  <div className="testimonial__stars" aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <blockquote>“{review.quote}”</blockquote>
                  <figcaption className="testimonial__author">
                    <img
                      className="testimonial__avatar"
                      src={review.avatar}
                      alt=""
                      loading="lazy"
                    />
                    <div>
                      <strong>{review.name}</strong>
                      <span>{review.role}</span>
                    </div>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Reveal>
    </section>
  )
}
