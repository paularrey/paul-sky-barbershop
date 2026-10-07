import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { GALLERY_IMAGES } from '../data/gallery'
import Reveal from './Reveal'
import { CONTAINER, EYEBROW, SECTION, SECTION_TITLE } from '../lib/ui'

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
    <section className={`bg-zinc-900 ${SECTION}`} id="testimonials">
      <div className={CONTAINER}>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={EYEBROW}>Testimonials</span>
          <h2 className={SECTION_TITLE}>
            Words from the <span className="text-amber-500">chair</span>
          </h2>
        </Reveal>

        <Reveal className="mt-12" delay={0.08}>
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
                <figure className="flex h-full flex-col items-center justify-between rounded-lg border border-zinc-800/50 bg-zinc-950 p-8 text-center md:p-12">
                  <div>
                    <div className="text-lg tracking-[6px] text-amber-500" aria-label="5 out of 5 stars">
                      ★★★★★
                    </div>
                    <blockquote className="mt-6 font-display text-xl italic leading-relaxed text-zinc-100 md:text-2xl">
                      “{review.quote}”
                    </blockquote>
                  </div>

                  <figcaption className="mt-8 flex items-center justify-center gap-4">
                    <img
                      src={review.avatar}
                      alt=""
                      className="h-14 w-14 rounded-full border-2 border-amber-500 object-cover"
                      loading="lazy"
                    />
                    <div className="text-left">
                      <strong className="block text-sm font-semibold text-zinc-100">{review.name}</strong>
                      <span className="text-xs uppercase tracking-widest text-zinc-400">{review.role}</span>
                    </div>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  )
}
