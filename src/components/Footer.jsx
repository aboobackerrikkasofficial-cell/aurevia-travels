import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe, CreditCard, ArrowRight } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [language, setLanguage] = useState('EN')
  const [currency, setCurrency] = useState('USD')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }
    // Validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }

    setStatus({ type: 'success', message: 'Thank you. Welcome to Aurevia Journeys.' })
    setEmail('')
    setTimeout(() => setStatus({ type: '', message: '' }), 5000)
  }

  const destinations = ['Maldives', 'Dubai', 'Switzerland', 'Bali', 'Paris', 'Turkey']

  return (
    <footer className="bg-[#060608] border-t border-white/5 pt-20 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Column 1: Brand details */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col">
              <span className="font-display text-2xl font-semibold tracking-[0.25em] text-white uppercase">
                Aurevia
              </span>
              <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                Travels
              </span>
            </Link>
            <p className="text-xs text-text-secondary leading-relaxed tracking-wider">
              Curating bespoke, ultra-luxury travel experiences for the world's most discerning explorers. Discover travel beyond expectations.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 hover:border-gold flex items-center justify-center text-text-secondary hover:text-gold transition-all duration-300" aria-label="Instagram">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 hover:border-gold flex items-center justify-center text-text-secondary hover:text-gold transition-all duration-300" aria-label="Facebook">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 hover:border-gold flex items-center justify-center text-text-secondary hover:text-gold transition-all duration-300" aria-label="Twitter">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Popular destinations */}
          <div>
            <h4 className="font-display text-xs tracking-[0.3em] uppercase text-white font-semibold mb-6">
              Destinations
            </h4>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest}>
                  <Link
                    to="/destinations"
                    className="text-xs text-text-secondary hover:text-gold tracking-widest transition-colors duration-300"
                  >
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-display text-xs tracking-[0.3em] uppercase text-white font-semibold mb-6">
              Explorations
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/packages" className="text-xs text-text-secondary hover:text-gold tracking-widest transition-colors duration-300">
                  Luxury Packages
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-xs text-text-secondary hover:text-gold tracking-widest transition-colors duration-300">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xs text-text-secondary hover:text-gold tracking-widest transition-colors duration-300">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-gold tracking-widest transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-gold tracking-widest transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="font-display text-xs tracking-[0.3em] uppercase text-white font-semibold mb-3">
                Newsletter
              </h4>
              <p className="text-xs text-text-secondary tracking-widest">
                Receive exclusive travel inspirations.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center border border-white/10 hover:border-white/20 focus-within:border-gold rounded-full bg-white/2 overflow-hidden transition-all duration-300">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-5 py-3 text-xs text-white placeholder-white/30 border-none outline-none tracking-widest"
                />
                <button
                  type="submit"
                  className="bg-white/5 hover:bg-gold hover:text-[#0a0a0c] text-white p-3 rounded-full mr-1 transition-all duration-300"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
              {status.message && (
                <p className={`text-[10px] tracking-widest ${status.type === 'error' ? 'text-red-400' : 'text-gold'}`}>
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Separator */}
        <div className="h-[1px] bg-white/5 my-8" />

        {/* Bottom Area */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[10px] text-text-secondary tracking-[0.2em] text-center md:text-left">
            © {new Date().getFullYear()} AUREVIA TRAVELS. ALL RIGHTS RESERVED. SECURE ENCRYPTED BOOKING.
          </div>

          {/* Selectors */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-text-secondary">
              <Globe size={11} className="text-gold" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border-none text-[10px] tracking-widest text-white outline-none cursor-pointer"
              >
                <option value="EN" className="bg-[#0c0c0e]">EN (English)</option>
                <option value="FR" className="bg-[#0c0c0e]">FR (Français)</option>
                <option value="DE" className="bg-[#0c0c0e]">DE (Deutsch)</option>
              </select>
            </div>

            <div className="flex items-center space-x-1.5 text-text-secondary">
              <CreditCard size={11} className="text-gold" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none text-[10px] tracking-widest text-white outline-none cursor-pointer"
              >
                <option value="USD" className="bg-[#0c0c0e]">USD ($)</option>
                <option value="EUR" className="bg-[#0c0c0e]">EUR (€)</option>
                <option value="GBP" className="bg-[#0c0c0e]">GBP (£)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
