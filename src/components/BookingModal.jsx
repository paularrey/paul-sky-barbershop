import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
    if (!/^[\d+\s()-]{6,}$/.test(form.phone.trim()))
      next.phone = 'Enter a valid phone number'
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
      <div className="success-state">
        <div className="success-state__icon">✓</div>
        <h3>Request received</h3>
        <p>
          Thanks {form.name.split(' ')[0]} — we will call you shortly to confirm
          your {form.service} on {form.date} at {form.time}.
        </p>
        <button className="btn btn--gold" type="button" onClick={onClose}>
          Done
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="form-grid">
        <div className="field field--full">
          <label htmlFor="bk-name">Full name</label>
          <input
            id="bk-name"
            ref={firstField}
            value={form.name}
            onChange={set('name')}
            placeholder="John Doe"
            autoComplete="name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="bk-phone">Phone</label>
          <input
            id="bk-phone"
            value={form.phone}
            onChange={set('phone')}
            placeholder="+33 6 12 34 56 78"
            inputMode="tel"
            autoComplete="tel"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor="bk-service">Service</label>
          <select id="bk-service" value={form.service} onChange={set('service')}>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="bk-barber">Barber</label>
          <select id="bk-barber" value={form.barber} onChange={set('barber')}>
            {BARBERS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="bk-date">Date</label>
          <input
            id="bk-date"
            type="date"
            min={TODAY}
            value={form.date}
            onChange={set('date')}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <div className="field">
          <label htmlFor="bk-time">Time</label>
          <select id="bk-time" value={form.time} onChange={set('time')}>
            <option value="">Select a slot</option>
            {TIME_SLOTS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {errors.time && <span className="error">{errors.time}</span>}
        </div>

        <div className="field field--full">
          <label htmlFor="bk-notes">Notes (optional)</label>
          <textarea
            id="bk-notes"
            rows={3}
            value={form.notes}
            onChange={set('notes')}
            placeholder="Reference cut, allergies, special request…"
          />
        </div>
      </div>

      <div className="modal__footer">
        <button className="btn btn--ghost" type="button" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn--gold" type="submit">
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
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label="Book an appointment"
        >
          <motion.div
            className="modal"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <div className="modal__head">
              <div>
                <span className="eyebrow">Reservation</span>
                <h3>Book your chair</h3>
                <p>Choose your service and slot — we confirm by phone.</p>
              </div>
              <button className="icon-btn" type="button" aria-label="Close" onClick={onClose}>
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
