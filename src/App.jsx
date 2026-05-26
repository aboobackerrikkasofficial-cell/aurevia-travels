import { useEffect, useState, Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LazyMotion, m, AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import Lenis from 'lenis'

const loadFeatures = () => import('./features.js').then((res) => res.default)

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Lazy loaded pages for performance (code splitting)
const Home = lazy(() => import('./pages/Home'))
const Destinations = lazy(() => import('./pages/Destinations'))
const Packages = lazy(() => import('./pages/Packages'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Booking = lazy(() => import('./pages/Booking'))

// Luxury loading skeleton
const PageLoader = () => (
  <div className="min-h-screen w-full bg-[#0a0a0c] flex items-center justify-center">
    <div className="space-y-4 text-center">
      <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto" />
      <p className="text-[10px] tracking-[0.3em] uppercase text-text-secondary animate-pulse">
        Compiling Aurevia Portal...
      </p>
    </div>
  </div>
)

export default function App() {
  const location = useLocation()
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [cursorOpacity, setCursorOpacity] = useState(0)
  const [isHoveringMagnet, setIsHoveringMagnet] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  )

  // 1. Detect prefers-reduced-motion media query
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const listener = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  // 2. Lenis Smooth Scroll Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // 3. Route Change Scroll to Top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  // 4. Magnetic Cursor Glow Movement & snapped logic
  useEffect(() => {
    const updateCursor = (e) => {
      let x = e.clientX
      let y = e.clientY

      // Find closest magnet target
      const magnetElements = document.querySelectorAll('.magnet-target')
      let snapped = false

      if (!prefersReducedMotion) {
        for (const el of magnetElements) {
          const rect = el.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          
          // Distance from mouse to center of magnet target
          const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY)

          // If within hover range (50px of center), snap cursor to button center
          if (distance < 60) {
            x = centerX
            y = centerY
            snapped = true
            setIsHoveringMagnet(true)
            
            // Subtle layout attraction offset on the button itself (Apple style)
            el.style.transform = `translate(${(e.clientX - centerX) * 0.15}px, ${(e.clientY - centerY) * 0.15}px)`
            break
          } else {
            el.style.transform = 'none'
          }
        }
      }

      if (!snapped) {
        setIsHoveringMagnet(false)
        magnetElements.forEach(el => {
          el.style.transform = 'none'
        })
      }

      setCursorPos({ x, y })
      setCursorOpacity(1)
    }

    const hideCursor = () => {
      setCursorOpacity(0)
    }

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mouseleave', hideCursor)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mouseleave', hideCursor)
    }
  }, [prefersReducedMotion])

  return (
    <HelmetProvider>
      <LazyMotion features={loadFeatures}>
        <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-gold selection:text-[#0a0a0c] bg-[#0a0a0c]">
          {/* 8K Film Grain Overlay */}
          <div className="film-grain" />

          {/* Magnetic Custom Cursor Ring */}
          {!prefersReducedMotion && (
            <div
              className={`fixed pointer-events-none z-50 rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHoveringMagnet
                  ? 'w-16 h-16 bg-gold/10 border border-gold/40 scale-105'
                  : 'w-7 h-7 border border-white/20'
              }`}
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
                opacity: cursorOpacity,
                transitionProperty: 'width, height, background-color, border-color, transform, opacity',
              }}
            />
          )}

          {/* Mouse Follow Ambient Glow */}
          {!prefersReducedMotion && (
            <div
              className="cursor-glow hidden md:block"
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
                opacity: cursorOpacity,
              }}
            />
          )}

          {/* Primary Sticky Header */}
          <Navbar />

          {/* Page Routing Container */}
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <m.div
                  key={location.pathname}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/booking" element={<Booking />} />
                  </Routes>
                </m.div>
              </AnimatePresence>
            </Suspense>
          </main>

          {/* Footer Area */}
          <Footer />
        </div>
      </LazyMotion>
    </HelmetProvider>
  )
}
