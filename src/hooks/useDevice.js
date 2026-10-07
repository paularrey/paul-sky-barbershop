import { useEffect, useMemo, useState } from 'react'

export function getDeviceTier() {
  if (typeof navigator === 'undefined') return 'high'

  const cores = navigator.hardwareConcurrency || 4
  const memory = navigator.deviceMemory || 4
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const saveData = navigator.connection?.saveData === true

  if (cores <= 4 && memory <= 4 && coarse) return 'low'
  if (saveData || cores <= 2 || memory <= 2) return 'low'
  if (coarse || cores <= 6 || memory <= 4) return 'medium'
  return 'high'
}

export function hasWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    )
  } catch {
    return false
  }
}

export function useDeviceTier() {
  const tier = useMemo(() => getDeviceTier(), [])
  const webgl = useMemo(() => hasWebGL(), [])
  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  return { tier, webgl, reducedMotion }
}

export function useInView(ref, { once = true, margin = '0px' } = {}) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { margin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, once, margin])

  return inView
}
