import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Keyboard, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { HERO_SLIDES } from '../data/gallery'
import Reveal from './Reveal'

export default function HeroSlider() {
  return (
    <section className="section showcase" id="showcase">
      <div className="container section-head section-head--center">
        <Reveal>
          <span className="eyebrow">The Craft</span>
          <h2 className="section-title">
            Haircut &amp; beard <span className="gold">showcase</span>
          </h2>
          <p className="section-sub">
            A rotating selection of our sharpest work — fresh fades, textured
            crops and full beard transformations.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <Swiper
          modules={[Autoplay, EffectFade, Pagination, Keyboard, Navigation]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={900}
          loop
          autoplay={{ delay: 4200, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          keyboard={{ enabled: true }}
          grabCursor
          a11y={{ enabled: true }}
        >
          {HERO_SLIDES.map((slide) => (
            <SwiperSlide key={slide.src}>
              <img src={slide.src} alt={slide.title} loading="lazy" />
              <div className="slide-caption">
                <span>Signature look</span>
                <h3>{slide.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
    </section>
  )
}
