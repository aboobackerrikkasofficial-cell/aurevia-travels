import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { Menu, X, Compass, User } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setTimeout(() => setIsOpen(false), 0)
  }, [location])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/packages' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-effect py-4 shadow-lg border-b border-white/5' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="font-display text-xl md:text-2xl font-semibold tracking-[0.25em] text-white transition-all duration-300 group-hover:text-gold uppercase">
            Aurevia
          </span>
          <span className="hidden xs:inline font-sans text-xs tracking-[0.4em] text-gold uppercase mt-1">
            Travels
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-white transition-colors duration-300 py-2"
              >
                {link.name}
                {isActive && (
                  <m.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/login"
            className="magnet-target text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-white flex items-center gap-1.5 transition-colors duration-300"
          >
            <User size={13} className="text-gold" />
            Login
          </Link>
          <Link
            to="/signup"
            className="magnet-target text-xs tracking-[0.2em] uppercase bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-full transition-all duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/booking"
            className="magnet-target text-xs tracking-[0.2em] uppercase bg-gold hover:bg-gold-hover text-[#0a0a0c] font-medium px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-gold/5"
          >
            <Compass size={14} className="animate-spin-slow" />
            Plan Journey
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-gold transition-colors duration-300 p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass-effect border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col space-y-5 px-8 py-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm tracking-[0.25em] uppercase transition-colors duration-300 ${
                      isActive ? 'text-gold' : 'text-text-secondary hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
              <div className="h-[1px] bg-white/5 my-2" />
              <div className="flex flex-col space-y-4 pt-2">
                <Link
                  to="/login"
                  className="text-sm tracking-[0.25em] uppercase text-text-secondary hover:text-white flex items-center gap-2 transition-colors duration-300"
                >
                  <User size={15} className="text-gold" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm tracking-[0.25em] uppercase text-text-secondary hover:text-white transition-colors duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to="/booking"
                  className="text-sm tracking-[0.25em] uppercase bg-gold text-[#0a0a0c] font-medium py-3 rounded-full text-center hover:bg-gold-hover transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Compass size={15} />
                  Plan Journey
                </Link>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
