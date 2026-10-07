import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BTN_PRIMARY, BTN_SECONDARY, INPUT, LABEL } from '../lib/ui'

const SERVICE_OPTIONS = [
  'Signature Haircut',
  'Skin Fade',
  'Beard Sculpting',
  'Hot Towel Shave',
  'The Full Experience',
  'Kids Cut',
]

const BARBERS = ['Any barber', 'Adrian', 'Leo', 'Marco', 'Sofia']

const TIME_SLOTS = ['09:30', '10:30', '11:30', '14:00', '15:00', '16:30', '18:00', '19:30']

const EMPTY = {
  name: '',
  phone: '',
  service: SERVICE_OPTIONS[0],
  barber: BARBERS[0],
  date: '',
  time: '',
  notes: '',
}

const TODAY = new Date().toISOString().split('T')[0]

function BookingForm({ onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const firstField = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => firstField.current?.focus(), 350)
    return () => clearTimeout(timer)
  }, [])

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name'
    if (!/^[\d+\s()-]{6,}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number'
    if (!form.date) next.date = 'Pick a date'
    if (!form.time) next.time = 'Pick a time'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (validate()) setDone(true)
  }

  if (done) {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-500 bg-amber-500/10 text-2xl text-amber-500">
          ✓
        </div>
        <h3 className="mt-5 text-3xl">Request received</h3>
        <p className="mt-3 text-sm text-zinc-400">
          Thanks {form.name.split(' ')[0]} — we will call you shortly to confirm
          your {form.service} on {form.date} at {form.time}.
        </p>
        <button className={`${BTN_PRIMARY} mt-6 w-full`} type="button" onClick={onClose}>
          Done
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="bk-name">
            Full name
          </label>
          <input
            id="bk-name"
            ref={firstField}
            className={`${INPUT} mt-2`}
            value={form.name}
            onChange={set('name')}
            placeholder="John Doe"
            autoComplete="name"
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label className={LABEL} htmlFor="bk-phone">
            Phone
          </label>
          <input
            id="bk-phone"
            className={`${INPUT} mt-2`}
            value={form.phone}
            onChange={set('phone')}
            placeholder="+33 6 12 34 56 78"
            inputMode="tel"
            autoComplete="tel"
          />
          {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
        </div>

        <div>
          <label className={LABEL} htmlFor="bk-service">
            Service
          </label>
          <select id="bk-service" className={`${INPUT} mt-2`} value={form.service} onChange={set('service')}>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="bk-barber">
            Barber
          </label>
          <select id="bk-barber" className={`${INPUT} mt-2`} value={form.barber} onChange={set('barber')}>
            {BARBERS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="bk-date">
            Date
          </label>
          <input
            id="bk-date"
            type="date"
            min={TODAY}
            className={`${INPUT} mt-2`}
            value={form.date}
            onChange={set('date')}
          />
          {errors.date && <p className="mt-1.5 text-xs text-red-400">{errors.date}</p>}
        </div>

        <div>
          <label className={LABEL} htmlFor="bk-time">
            Time
          </label>
          <select id="bk-time" className={`${INPUT} mt-2`} value={form.time} onChange={set('time')}>
            <option value="">Select a slot</option>
            {TIME_SLOTS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {errors.time && <p className="mt-1.5 text-xs text-red-400">{errors.time}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="bk-notes">
            Notes (optional)
          </label>
          <textarea
            id="bk-notes"
            rows={3}
            className={`${INPUT} mt-2 h-auto py-3`}
            value={form.notes}
            onChange={set('notes')}
            placeholder="Reference cut, allergies, special request…"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button className={`${BTN_SECONDARY} flex-1`} type="button" onClick={onClose}>
          Cancel
        </button>
        <button className={`${BTN_PRIMARY} flex-1`} type="submit">
          Request booking
        </button>
      </div>
    </form>
  )
}

export default function BookingModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    document.body.classList.add('modal-open')
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label="Book an appointment"
        >
          <motion.div
            className="no-scrollbar max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg border border-zinc-800/50 bg-zinc-900 p-6 md:p-8"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
                  Reservation
                </span>
                <h3 className="mt-2 text-3xl">Book your chair</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Choose your service and slot — we confirm by phone.
                </p>
              </div>
              <button
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-zinc-700 text-zinc-100 hover:border-zinc-500 transition-colors"
                type="button"
                aria-label="Close"
                onClick={onClose}
              >
                ✕
              </button>
            </div>

            <BookingForm onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
