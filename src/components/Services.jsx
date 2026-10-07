import Reveal from './Reveal'
import { GALLERY_IMAGES } from '../data/gallery'
import { BTN_SECONDARY, CONTAINER, EYEBROW, SECTION, SECTION_SUB, SECTION_TITLE } from '../lib/ui'

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

const CHIP = 'rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs uppercase tracking-wider text-amber-500'

export default function Services({ onBook }) {
  return (
    <section className={`bg-zinc-900 ${SECTION}`} id="services">
      <div className={CONTAINER}>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={EYEBROW}>Service Menu</span>
          <h2 className={SECTION_TITLE}>
            Crafted for the <span className="text-amber-500">modern gentleman</span>
          </h2>
          <p className={SECTION_SUB}>
            Every service is finished with premium products and a signature
            style consultation.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.title}
              className="flex flex-col overflow-hidden rounded-lg border border-zinc-800/50 bg-zinc-900 transition-colors hover:border-amber-500/40"
              delay={(i % 3) * 0.08}
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={GALLERY_IMAGES[service.img % GALLERY_IMAGES.length].src}
                  alt={service.title}
                  className="h-full w-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                <div>
                  <h3 className="text-2xl">{service.title}</h3>
                  <p className="mt-3 text-sm text-zinc-400">{service.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span className={CHIP} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button className={`${BTN_SECONDARY} w-full`} type="button" onClick={onBook}>
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
