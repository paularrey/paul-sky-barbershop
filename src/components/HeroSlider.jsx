import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Keyboard, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { HERO_SLIDES } from '../data/gallery'
import Reveal from './Reveal'
import { CONTAINER, EYEBROW, SECTION, SECTION_SUB, SECTION_TITLE } from '../lib/ui'

export default function HeroSlider() {
  return (
    <section className={`bg-zinc-950 ${SECTION}`} id="showcase">
      <div className={CONTAINER}>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={EYEBROW}>The Craft</span>
          <h2 className={SECTION_TITLE}>
            Haircut &amp; beard <span className="text-amber-500">showcase</span>
          </h2>
          <p className={SECTION_SUB}>
            A rotating selection of our sharpest work — fresh fades, textured
            crops and full beard transformations.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-12" delay={0.1}>
        <div className={CONTAINER}>
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
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-zinc-800/50 md:aspect-[16/9]">
                  <img src={slide.src} alt={slide.title} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <span className="text-xs uppercase tracking-[0.3em] text-amber-500">Signature look</span>
                    <h3 className="mt-1 text-2xl md:text-3xl">{slide.title}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Reveal>
    </section>
  )
}
