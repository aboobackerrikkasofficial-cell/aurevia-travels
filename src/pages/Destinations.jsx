import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { Compass, ArrowRight, X, Star, Shield, MapPin } from 'lucide-react'

// Components
import SEO from '../components/SEO'
import LuxuryImage from '../components/LuxuryImage'

const destinationsData = [
  {
    id: 'maldives',
    name: 'Maldives',
    tagline: 'Tropical Isolation',
    price: '$15,000',
    duration: '7 Days / 6 Nights',
    rating: '4.98',
    image: '/images/maldives.png',
    highlights: [
      'Private overwater villa buyout with infinity pool',
      'Arrive via private seaplane transfer',
      'Exclusive underwater dinner at Ithaa Restaurant',
      '24/7 dedicated personal butler and chef'
    ],
    vibe: 'Complete tranquility, turquoise lagoons, white sand, and ultimate privacy.',
    ratingCount: 382
  },
  {
    id: 'dubai',
    name: 'Dubai',
    tagline: 'Oasis Grandeur',
    price: '$12,500',
    duration: '5 Days / 4 Nights',
    rating: '4.95',
    image: '/images/dubai.png',
    highlights: [
      'Helicopter pickup from airport to Burj Al Arab helipad',
      'Private desert safari with overnight luxury glass dome tent',
      'Private yacht cruise along the Marina skyline',
      'Personal shopper and VIP lounge bookings'
    ],
    vibe: 'Stunning modern architecture, luxury luxury beachclubs, desert sands, and skyscrapers.',
    ratingCount: 420
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    tagline: 'Alpine Majesty',
    price: '$18,000',
    duration: '8 Days / 7 Nights',
    rating: '4.99',
    image: '/images/switzerland.png',
    highlights: [
      'Private Zermatt luxury ski-in chalet with hot tub',
      'Glacier helicopter flight over the Matterhorn',
      'Private watchmaking masterclass in Geneva',
      'Luxury panorama train charter experience'
    ],
    vibe: 'Snow-capped peaks, alpine crisp air, absolute comfort, and mountain prestige.',
    ratingCount: 290
  },
  {
    id: 'bali',
    name: 'Bali',
    tagline: 'Spiritual Sanctuary',
    price: '$9,500',
    duration: '6 Days / 5 Nights',
    rating: '4.94',
    image: '/images/bali.png',
    highlights: [
      'Infinity pool jungle villa buyout in Ubud',
      'Private spiritual temple water cleansing ritual',
      'Helicopter transfer to Nusa Penida private beach',
      'Bespoke gourmet organic dining experiences'
    ],
    vibe: 'Lush tropical forests, quiet spiritual temples, active volcanoes, and zen atmospheres.',
    ratingCount: 512
  },
  {
    id: 'paris',
    name: 'Paris',
    tagline: 'Classical Romance',
    price: '$11,000',
    duration: '5 Days / 4 Nights',
    rating: '4.96',
    image: '/images/paris.png',
    highlights: [
      'Eiffel Tower penthouse suite with private balcony',
      'Private after-hours tour of the Louvre Museum',
      'Exclusive Michelin-starred cooking masterclass',
      'Chauffeur-driven vintage classic car tour'
    ],
    vibe: 'Sophisticated style, haute couture fashion, classical art history, and café culture.',
    ratingCount: 310
  },
  {
    id: 'turkey',
    name: 'Turkey',
    tagline: 'Fairy Chimney Valley',
    price: '$10,200',
    duration: '6 Days / 5 Nights',
    rating: '4.97',
    image: '/images/turkey.png',
    highlights: [
      'Historic luxury cave mansion suite in Cappadocia',
      'Private sunrise hot air balloon flight with champagne',
      'Yacht charter along the Bosphorus strait in Istanbul',
      'Gourmet Ottoman culinary tour'
    ],
    vibe: 'Hot air balloons, ancient historic ruins, Mediterranean breezes, and spice bazaars.',
    ratingCount: 245
  }
]

export default function Destinations() {
  const navigate = useNavigate()
  const [selectedDest, setSelectedDest] = useState(null)

  const handleBook = (name) => {
    navigate('/booking', { state: { destination: name } })
  }

  // Structured Schema for destinations list
  const destinationsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": destinationsData.map((dest, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Place",
        "name": dest.name,
        "description": dest.vibe,
        "image": `https://aurevia.com${dest.image}`
      }
    }))
  }

  return (
    <div className="relative w-full pt-32 pb-24 bg-[#0a0a0c]">
      <SEO
        title="Curated Destinations"
        description="Explore Aurevia Travels handpicked luxury destinations. From private islands in the Maldives to alpine chalets in Switzerland."
        schema={destinationsSchema}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-[10px] tracking-[0.4em] text-gold uppercase block">BESPOKE ARCHIVE</span>
          <h1 className="font-display text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
            Curated Luxury Destinations
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed tracking-wider font-light">
            We operate in a highly selective list of regions globally. Each destination represents a handpicked portfolio of extreme comfort, privacy, and unique local immersion.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinationsData.map((dest) => (
            <m.div
              key={dest.id}
              className="rounded-3xl overflow-hidden glass-effect border border-white/5 relative group cursor-pointer flex flex-col h-[520px]"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedDest(dest)}
            >
              {/* Image with overlay */}
              <div className="relative h-[320px] overflow-hidden">
                <LuxuryImage
                  src={dest.image}
                  alt={dest.name}
                  className="transition-transform duration-700 group-hover:scale-105 brightness-[0.6]"
                  aspectRatio="none"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0c]/80" />
                <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
                  <span className="text-[9px] tracking-[0.25em] text-gold uppercase font-medium">
                    {dest.tagline}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-2xl text-white font-medium tracking-wide">
                      {dest.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-gold">
                      <Star size={12} className="fill-gold" />
                      <span className="text-[11px] font-semibold tracking-wider">{dest.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2 tracking-wider leading-relaxed font-light font-sans mb-4">
                    {dest.vibe}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <span className="text-[9px] tracking-[0.2em] text-text-secondary uppercase block">Starting From</span>
                    <span className="text-lg font-light text-white tracking-tight">{dest.price}</span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedDest(dest)
                      }}
                      className="magnet-target text-[10px] tracking-[0.2em] uppercase bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2.5 rounded-full transition-all duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                    >
                      Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleBook(dest.name)
                      }}
                      className="magnet-target text-[10px] tracking-[0.2em] uppercase bg-gold hover:bg-gold-hover text-[#0a0a0c] font-semibold px-4 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-gold/5 focus-visible:ring-1 focus-visible:ring-gold"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* 6. DETAIL MODAL */}
      <AnimatePresence>
        {selectedDest && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050507]/90 backdrop-blur-md"
            onClick={() => setSelectedDest(null)}
          >
            {/* Modal Box */}
            <m.div
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 15 }}
              transition={{ type: 'spring', duration: 0.45 }}
              className="w-full max-w-4xl glass-effect border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-12"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDest(null)}
                className="magnet-target absolute top-6 right-6 z-10 bg-black/40 hover:bg-black/60 border border-white/10 text-white hover:text-gold p-2.5 rounded-full transition-all duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                aria-label="Close details"
              >
                <X size={16} />
              </button>

              {/* Left Side: Image Banner */}
              <div className="col-span-12 md:col-span-5 h-[240px] md:h-auto relative">
                <LuxuryImage
                  src={selectedDest.image}
                  alt={selectedDest.name}
                  className="brightness-[0.7]"
                  aspectRatio="none"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#0a0a0c]" />
                
                {/* Floatings details */}
                <div className="absolute bottom-8 left-8 space-y-2 text-left">
                  <div className="bg-gold text-[#0a0a0c] text-[8px] tracking-[0.25em] uppercase font-bold px-3 py-1 rounded-full inline-block">
                    {selectedDest.tagline}
                  </div>
                  <h2 className="font-display text-3xl font-light text-white tracking-wide uppercase">
                    {selectedDest.name}
                  </h2>
                </div>
              </div>

              {/* Right Side: Editorial Info */}
              <div className="col-span-12 md:col-span-7 p-8 md:p-12 space-y-6 md:space-y-8 flex flex-col justify-between max-h-[75vh] md:max-h-none overflow-y-auto">
                <div className="space-y-6">
                  {/* Reviews & Badges */}
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center space-x-1 text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="fill-gold" />
                      ))}
                      <span className="text-[11px] font-semibold text-white ml-1.5">{selectedDest.rating}</span>
                      <span className="text-[10px] text-text-secondary font-sans">({selectedDest.ratingCount} reviews)</span>
                    </div>
                    <div className="h-3 w-[1px] bg-white/10" />
                    <div className="text-text-secondary tracking-widest flex items-center gap-1.5">
                      <MapPin size={12} className="text-gold" />
                      {selectedDest.duration}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] tracking-[0.2em] text-text-secondary uppercase">The Experience Vibe</h4>
                    <p className="text-xs text-text-secondary tracking-wider leading-relaxed font-light font-sans text-left">
                      {selectedDest.vibe}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] tracking-[0.2em] text-text-secondary uppercase text-left">Signature Highlights</h4>
                    <ul className="space-y-2.5 text-left">
                      {selectedDest.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5 text-xs text-white/90 tracking-wider">
                          <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0" />
                          <span className="font-sans">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Badges footer */}
                  <div className="flex gap-4 pt-2">
                    <div className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] text-gold uppercase border border-gold/20 bg-gold/5 px-3 py-1.5 rounded-lg">
                      <Shield size={11} />
                      All Inclusive
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] text-gold uppercase border border-gold/20 bg-gold/5 px-3 py-1.5 rounded-lg">
                      <Compass size={11} />
                      24/7 Concierge
                    </div>
                  </div>
                </div>

                {/* Bottom Checkout details */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="text-left">
                    <span className="text-[9px] tracking-[0.2em] text-text-secondary uppercase block">Est. Starting Price</span>
                    <span className="text-2xl font-light text-white tracking-tight">{selectedDest.price}</span>
                  </div>
                  
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => setSelectedDest(null)}
                      className="magnet-target text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-white transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => {
                        handleBook(selectedDest.name)
                        setSelectedDest(null)
                      }}
                      className="magnet-target text-xs tracking-[0.2em] uppercase bg-gold hover:bg-gold-hover text-[#0a0a0c] font-semibold px-6 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-gold/10 flex items-center gap-2 focus-visible:ring-1 focus-visible:ring-gold"
                    >
                      Configure Journey
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
