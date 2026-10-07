import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useDeviceTier, useInView } from '../../hooks/useDevice'

const GOLD = '#d4af37'
const GOLD_SOFT = '#f0d68a'

function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildPositions(count) {
  const rand = mulberry32(20261006)
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 1) {
    arr[i * 3] = (rand() - 0.5) * 22
    arr[i * 3 + 1] = (rand() - 0.5) * 12
    arr[i * 3 + 2] = (rand() - 0.5) * 10 - 2
  }
  return arr
}

function Badge() {
  const group = useRef()
  const texture = useTexture('/logo.png')
  const logo = useMemo(() => {
    const t = texture.clone()
    t.colorSpace = THREE.SRGBColorSpace
    t.needsUpdate = true
    return t
  }, [texture])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const pointer = state.pointer
    g.rotation.y += delta * 0.45
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      Math.sin(t * 0.6) * 0.14 + pointer.y * 0.25,
      0.05,
    )
    g.position.y = Math.sin(t * 0.9) * 0.12
    g.position.x = THREE.MathUtils.lerp(g.position.x, pointer.x * 0.5, 0.05)
  })

  return (
    <group ref={group}>
      <mesh>
        <cylinderGeometry args={[1.55, 1.55, 0.16, 72]} />
        <meshStandardMaterial color="#1a1a1f" metalness={0.95} roughness={0.32} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.09, 24, 96]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.22} />
      </mesh>

      <mesh position={[0, 0, 0.085]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.4, 72]} />
        <meshStandardMaterial map={logo} metalness={0.35} roughness={0.45} />
      </mesh>

      <mesh position={[0, 0, -0.085]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.4, 72]} />
        <meshStandardMaterial map={logo} metalness={0.35} roughness={0.45} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.86, 0.03, 12, 96]} />
        <meshStandardMaterial
          color={GOLD_SOFT}
          metalness={1}
          roughness={0.3}
          emissive={GOLD}
          emissiveIntensity={0.18}
        />
      </mesh>
    </group>
  )
}

function Particles({ count }) {
  const points = useRef()
  const positions = useMemo(() => buildPositions(count), [count])

  useFrame((state, delta) => {
    const p = points.current
    if (!p) return
    const pointer = state.pointer
    p.rotation.y += delta * 0.03
    p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, pointer.y * 0.12, 0.04)
    p.position.x = THREE.MathUtils.lerp(p.position.x, pointer.x * 1.4, 0.05)
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color={GOLD_SOFT}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function Rig() {
  useFrame((state) => {
    const { camera, pointer } = state
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.6, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.4, 0.05)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Lights({ tier }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} castShadow={tier === 'high'} />
      <pointLight position={[-6, -2, 4]} intensity={26} color={GOLD} distance={20} />
      <pointLight position={[4, 3, -5]} intensity={14} color="#7aa7ff" distance={22} />
    </>
  )
}

export default function HeroCanvas() {
  const wrapper = useRef(null)
  const inView = useInView(wrapper, { once: false })
  const { tier, webgl, reducedMotion } = useDeviceTier()
  const [ready, setReady] = useState(false)
  const fallbackImg = '/WhatsApp Image 2026-10-06 at 13.17.15.jpeg'

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const particleCount = tier === 'high' ? 1100 : tier === 'medium' ? 600 : 280
  const dpr = tier === 'high' ? [1, 1.75] : tier === 'medium' ? [1, 1.4] : 1
  const showFallback = !webgl || reducedMotion

  return (
    <div className="hero__canvas" ref={wrapper} aria-hidden="true">
      {showFallback && <div className="hero__fallback" style={{ backgroundImage: `url(${fallbackImg})` }} />}

      {!showFallback && ready && inView && (
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0, 6.4], fov: 42 }}
          gl={{ antialias: tier !== 'low', alpha: true, powerPreference: 'high-performance' }}
          performance={{ min: 0.6 }}
        >
          <Suspense fallback={null}>
            <Lights tier={tier} />
            <Rig />
            <Particles count={particleCount} />
            <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
              <Badge />
            </Float>
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
