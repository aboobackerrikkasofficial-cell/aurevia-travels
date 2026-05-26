import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { m, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { ArrowRight, Compass, Calendar, Users, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

// Components
import SEO from '../components/SEO'
import LuxuryImage from '../components/LuxuryImage'

// Background Images for the Hero
const heroSlides = [
  {
    image: '/images/maldives.png',
    tagline: 'Private Islands',
    title: 'Maldives Overwater Luxury',
    desc: 'Unrivaled seclusion and crystal-clear waters await in your private overwater villa.'
  },
  {
    image: '/images/dubai.png',
    tagline: 'Elite Skyline',
    title: 'Dubai Oasis Skyline',
    desc: 'A spectacular fusion of ultra-modern grandeur and ancient desert mysteries.'
  },
  {
    image: '/images/switzerland.png',
    tagline: 'Alpine Retreats',
    title: 'Swiss Alpine Majesty',
    desc: 'Breathtaking peaks, pristine lakes, and world-class luxury winter chalets.'
  },
  {
    image: '/images/bali.png',
    tagline: 'Tropical Wellness',
    title: 'Bali Sanctuary Retreats',
    desc: 'Reconnect with your soul in exclusive private pools amid luxury rainforests.'
  }
]

const experiences = [
  {
    title: 'Private Island Tours',
    desc: 'Complete island buyout with dedicated concierge and personal chefs.',
    image: '/images/maldives.png',
  },
  {
    title: 'Helicopter Adventures',
    desc: 'Soar above dramatic coastlines and mountain ridges in luxury helicopters.',
    image: '/images/helicopter.png',
  },
  {
    title: 'Arctic Expeditions',
    desc: 'Sail through pristine fjords and sleep in glass igloos under northern lights.',
    image: '/images/switzerland.png',
  },
  {
    title: 'Luxury Yacht Experiences',
    desc: 'Charter private superyachts with professional crew across the Mediterranean.',
    image: '/images/yacht.png',
  },
  {
    title: 'Desert Safari Retreats',
    desc: 'Sleep in luxury glass dunes and enjoy private fire shows under the desert stars.',
    image: '/images/dubai.png',
  },
  {
    title: 'Private Jet Escapes',
    desc: 'Fly globally on bespoke flight paths with absolute luxury and discretion.',
    image: '/images/private_jet.png',
  }
]

const testimonials = [
  {
    quote: "Aurevia travels created an itinerary that exceeded all our expectations. The private yacht charter in the Mediterranean and the Maldives buyout was flawless. Absolutely unmatched hospitality.",
    author: "Elena Rostova",
    role: "Venture Partner, Switzerland",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "From the private jet transfer to the bespoke glacier dinner in the Swiss Alps, every single detail was planned to perfection. Aurevia is the gold standard of luxury travel.",
    author: "Maximilian Sterling",
    role: "CEO, Capital Group",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "We have worked with several elite agencies, but the personalization and access Aurevia provides is unprecedented. Their 24/7 concierge handled our sudden changes in minutes.",
    author: "Princess Sarah Al-Saud",
    role: "Royal Advisor, Dubai",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
  }
]

export default function Home() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Hero slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  // Parallax on Scroll
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Experiences Carousel Slider
  const [carouselIndex, setCarouselIndex] = useState(0)
  const carouselRef = useRef(null)
  const [dragWidth, setDragWidth] = useState(0)
  const x = useMotionValue(0)

  useEffect(() => {
    if (carouselRef.current) {
      setDragWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [])

  // Floating Booking State
  const [bookDestination, setBookDestination] = useState('')
  const [bookDates, setBookDates] = useState('')
  const [bookGuests, setBookGuests] = useState('2 Guests')

  const handleQuickBook = (e) => {
    e.preventDefault()
    navigate('/booking', { state: { destination: bookDestination, dates: bookDates, guests: bookGuests } })
  }

  // Testimonials state
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Homepage structured data schema (JSON-LD)
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Aurevia Travels",
    "description": "Curating bespoke, ultra-luxury travel experiences from Maldives villas to Swiss alpine chalets.",
    "url": "https://aurevia.com",
    "telephone": "+41-22-550-1234",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rue du Rhône 14",
      "addressLocality": "Geneva",
      "postalCode": "1204",
      "addressCountry": "CH"
    }
  }

  return (
    <div className="relative w-full">
      {/* Dynamic SEO Injection */}
      <SEO
        title="Travel Beyond Expectations | Curated Journeys"
        description="Aurevia Travels curates bespoke, ultra-luxury travel experiences, from Maldives private villas to Swiss chalet adventures. Plan your private jet journey."
        schema={homeSchema}
      />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Parallax Container */}
        <m.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 w-full h-full">
          {/* Animated Background Images */}
          <AnimatePresence mode="wait">
            <m.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <LuxuryImage
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover brightness-[0.35]"
                aspectRatio="none"
                priority={true}
              />
            </m.div>
          </AnimatePresence>
        </m.div>

        {/* Cinematic Film Overlay & Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/20 via-[#0a0a0c]/50 to-[#0a0a0c] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vh] bg-gold/5 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
        
        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          {/* Left: Copy details */}
          <div className="lg:col-span-7 text-left space-y-6 md:space-y-8">
            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full"
            >
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-ping" />
              <span className="text-[10px] md:text-xs tracking-[0.35em] text-gold uppercase font-medium">
                {heroSlides[currentSlide].tagline}
              </span>
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-4xl sm:text-5xl md:text-7xl font-light leading-[1.1] tracking-tight text-white"
            >
              Travel Beyond <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-gold to-white/70">
                Expectations
              </span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs sm:text-sm md:text-base text-text-secondary max-w-xl font-light tracking-wide leading-relaxed"
            >
              {heroSlides[currentSlide].desc} Curated experiences designed exclusively for the modern elite traveler.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/booking"
                className="magnet-target text-center text-xs tracking-[0.2em] uppercase bg-gold hover:bg-gold-hover text-[#0a0a0c] px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-xl shadow-gold/10"
              >
                Plan My Journey
              </Link>
              <Link
                to="/destinations"
                className="magnet-target text-center text-xs tracking-[0.2em] uppercase bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full transition-all duration-300"
              >
                Explore Luxury Destinations
              </Link>
            </m.div>
          </div>

          {/* Right: Floating Booking Widget */}
          <m.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 w-full glass-effect rounded-3xl p-8 border border-white/10 shadow-2xl relative"
          >
            <h3 className="font-display text-lg font-medium text-white mb-6 tracking-wide">
              Curate Your Expedition
            </h3>
            
            <form onSubmit={handleQuickBook} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="destination" className="text-[10px] tracking-[0.2em] text-text-secondary uppercase">Destination</label>
                <div className="relative flex items-center">
                  <Compass className="absolute left-4 text-gold" size={16} />
                  <select
                    id="destination"
                    value={bookDestination}
                    onChange={(e) => setBookDestination(e.target.value)}
                    required
                    className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-12 py-3.5 text-xs text-white rounded-xl outline-none appearance-none tracking-wider transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    <option value="" className="bg-[#0c0c0e]">Select Destination</option>
                    <option value="Maldives" className="bg-[#0c0c0e]">Maldives Luxury Islands</option>
                    <option value="Dubai" className="bg-[#0c0c0e]">Dubai Oasis Skyline</option>
                    <option value="Switzerland" className="bg-[#0c0c0e]">Switzerland Alpine Majesty</option>
                    <option value="Bali" className="bg-[#0c0c0e]">Bali Sanctuary Retreats</option>
                    <option value="Paris" className="bg-[#0c0c0e]">Paris Classical Avenues</option>
                    <option value="Turkey" className="bg-[#0c0c0e]">Turkey Hot Air Balloon Valley</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="dates" className="text-[10px] tracking-[0.2em] text-text-secondary uppercase">Travel Dates</label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-4 text-gold" size={16} />
                  <input
                    id="dates"
                    type="date"
                    value={bookDates}
                    onChange={(e) => setBookDates(e.target.value)}
                    required
                    className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-12 py-3.5 text-xs text-white rounded-xl outline-none tracking-wider transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="guests" className="text-[10px] tracking-[0.2em] text-text-secondary uppercase">Travelers</label>
                <div className="relative flex items-center">
                  <Users className="absolute left-4 text-gold" size={16} />
                  <select
                    id="guests"
                    value={bookGuests}
                    onChange={(e) => setBookGuests(e.target.value)}
                    className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-12 py-3.5 text-xs text-white rounded-xl outline-none appearance-none tracking-wider transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    <option value="1 Guest" className="bg-[#0c0c0e]">1 Guest</option>
                    <option value="2 Guests" className="bg-[#0c0c0e]">2 Guests</option>
                    <option value="4 Guests" className="bg-[#0c0c0e]">4 Guests</option>
                    <option value="6 Guests" className="bg-[#0c0c0e]">6+ Guests (Private Charter)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="magnet-target w-full mt-6 bg-gold hover:bg-gold-hover text-[#0a0a0c] text-xs font-semibold py-4 rounded-xl tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gold/15"
              >
                Launch Search
                <ArrowRight size={14} />
              </button>
            </form>
          </m.div>
        </div>
      </section>

      {/* 2. LUXURY STATISTICS */}
      <section className="py-20 bg-[#08080a] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { value: '25K+', label: 'Elite Travelers' },
            { value: '120+', label: 'Destinations' },
            { value: '4.9', label: 'Client Rating' },
            { value: '15', label: 'Years Experience' }
          ].map((stat, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="space-y-2"
            >
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-gold tracking-tight">
                {stat.value}
              </h2>
              <p className="text-[10px] sm:text-xs text-text-secondary tracking-[0.3em] uppercase">
                {stat.label}
              </p>
            </m.div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED EXPERIENCES SECTION (CAROUSEL) */}
      <section className="py-28 bg-[#0a0a0c] overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase block mb-3">EXCLUSIVE COLLECTION</span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-white tracking-tight">
              Featured Luxury Experiences
            </h2>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => {
                if (carouselIndex > 0) setCarouselIndex(carouselIndex - 1)
              }}
              disabled={carouselIndex === 0}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-gold flex items-center justify-center text-white disabled:opacity-30 disabled:hover:border-white/10 transition-colors duration-300"
              aria-label="Previous Experiences"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => {
                if (carouselIndex < experiences.length - 3) setCarouselIndex(carouselIndex + 1)
              }}
              disabled={carouselIndex >= experiences.length - 3}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-gold flex items-center justify-center text-white disabled:opacity-30 disabled:hover:border-white/10 transition-colors duration-300"
              aria-label="Next Experiences"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Drag Area */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <m.div
            ref={carouselRef}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ right: 0, left: -dragWidth }}
            style={{ x }}
            animate={{ x: -carouselIndex * 380 }} // approximate width + gap
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            {experiences.map((exp, index) => (
              <m.div
                key={index}
                className="min-w-[320px] sm:min-w-[360px] md:min-w-[380px] h-[480px] rounded-3xl overflow-hidden relative group border border-white/5"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
              >
                {/* Background Image using LuxuryImage for lazy loading */}
                <LuxuryImage
                  src={exp.image}
                  alt={exp.title}
                  className="transition-transform duration-700 group-hover:scale-105 brightness-[0.5]"
                  aspectRatio="none"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/20 to-transparent p-8 flex flex-col justify-end space-y-3">
                  <h3 className="font-display text-xl text-white font-medium tracking-wide">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-text-secondary tracking-wide leading-relaxed font-light font-sans">
                    {exp.desc}
                  </p>
                  
                  <div className="pt-2">
                    <Link
                      to="/booking"
                      className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold hover:text-white transition-colors duration-300"
                    >
                      Book Private Access
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* 4. ABOUT TEASER SECTION */}
      <section className="py-28 bg-[#08080a] relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase block">THE ART OF TRAVEL</span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
              Bespoke Journeys Crafted by Experts
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed tracking-wider font-light">
              At Aurevia, we believe travel is not simply about arriving at a location; it is an intimate conversation between your desires and the world’s most pristine corners.
            </p>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed tracking-wider font-light">
              Our specialists hold private keys to exclusive estates, charter pipelines, and private custom itineraries. We treat every expedition as a custom masterpiece.
            </p>
            <div className="pt-4">
              <Link
                to="/about"
                className="magnet-target inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold hover:text-white transition-all duration-300"
              >
                Learn More About Us
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 relative">
            <div className="col-span-8 rounded-3xl overflow-hidden h-[350px] border border-white/5">
              <LuxuryImage
                src="/images/private_jet.png"
                alt="Private Jet Experience"
                className="transition-transform duration-700 hover:scale-103 brightness-[0.7]"
                aspectRatio="none"
              />
            </div>
            <div className="col-span-4 rounded-3xl overflow-hidden h-[250px] mt-auto border border-white/5">
              <LuxuryImage
                src="/images/yacht.png"
                alt="Yacht Experience"
                className="transition-transform duration-700 hover:scale-103 brightness-[0.7]"
                aspectRatio="none"
              />
            </div>
            <div className="col-span-4 rounded-3xl overflow-hidden h-[200px] border border-white/5">
              <LuxuryImage
                src="/images/helicopter.png"
                alt="Helicopter Experience"
                className="transition-transform duration-700 hover:scale-103 brightness-[0.7]"
                aspectRatio="none"
              />
            </div>
            <div className="col-span-8 rounded-3xl overflow-hidden h-[300px] -mt-12 border border-white/5">
              <LuxuryImage
                src="/images/paris.png"
                alt="Paris Street"
                className="transition-transform duration-700 hover:scale-103 brightness-[0.7]"
                aspectRatio="none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS (SLIDER CAROUSEL) */}
      <section className="py-28 bg-[#0a0a0c] border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <span className="text-[10px] tracking-[0.4em] text-gold uppercase block">CLIENT STORIES</span>
          
          <div className="relative min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <m.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="space-y-8 flex flex-col items-center"
              >
                <Quote size={40} className="text-gold opacity-30 mx-auto" />
                <p className="font-display text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-white max-w-2xl tracking-wide">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                
                {/* Profile Card */}
                <div className="flex items-center space-x-4">
                  <LuxuryImage
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].author}
                    className="object-cover"
                    aspectRatio="1/1"
                    style={{ width: '48px', height: '48px', borderRadius: '9999px' }}
                  />
                  <div className="text-left">
                    <h4 className="text-xs font-semibold text-white tracking-widest uppercase">
                      {testimonials[activeTestimonial].author}
                    </h4>
                    <p className="text-[10px] text-text-secondary tracking-widest mt-0.5">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Testimonial Nav dots */}
          <div className="flex items-center justify-center space-x-3 pt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeTestimonial === i ? 'bg-gold w-6' : 'bg-white/10 hover:bg-white/30'
                }`}
                aria-label={`Testimonial slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
