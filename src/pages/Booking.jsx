import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { Calendar, Users, Plus, Check, ArrowRight, ArrowLeft, Download, Shield, Sparkles, Mail } from 'lucide-react'

// Components
import SEO from '../components/SEO'

const steps = [
  { id: 1, name: 'Destination' },
  { id: 2, name: 'Dates & Guests' },
  { id: 3, name: 'Service Tier' },
  { id: 4, name: 'Luxury Add-ons' },
  { id: 5, name: 'Traveller Info' },
  { id: 6, name: 'Payment' },
  { id: 7, name: 'Confirmation' }
]

const destinations = [
  { 
    name: 'Maldives', 
    price: 15000, 
    img: '/images/maldives.png', 
    desc: 'Tropical lagoons & total isolation',
    latLong: '3.2028° N, 73.2207° E',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Yacht Transfer', detail: 'VIP Customs exit at Male Terminal. Board private superyacht transfer to island resort. Sunset champagne reception.' },
      { day: 'Day 2', title: 'Lagoon Cruising', detail: 'Explore uninhabited sandbanks. Custom gourmet lunch served on a private beach. Evening marine biologist snorkeling tour.' },
      { day: 'Day 3', title: 'Underwater Gastronomy', detail: 'Sub-aquatic spa relaxation. 7-course degustation dinner at Ithaa Undersea Restaurant, paired with vintage cellar selections.' },
      { day: 'Day 4', title: 'Coral Reef Expedition', detail: 'Private deep-sea charter on luxury yacht. Manta ray diving and luxury wellness massage at villa overwater deck.' },
      { day: 'Day 5', title: 'Seaplane Departure', detail: 'Leisurely morning swimming. Scenic private seaplane flyover back to Male Airport for outbound private jet boarding.' }
    ]
  },
  { 
    name: 'Dubai', 
    price: 12500, 
    img: '/images/dubai.png', 
    desc: 'Opulent deserts & skyline suites',
    latLong: '25.2048° N, 55.2708° E',
    itinerary: [
      { day: 'Day 1', title: 'Helicopter Arrival', detail: 'Direct heli-shuttle from Dubai International terminal to Burj Al Arab helipad. Private check-in at luxury Royal Suite.' },
      { day: 'Day 2', title: 'Desert Glamping Oasis', detail: 'Private chauffeur transfer to Conservation Reserve. Custom falconry show, camel ride, luxury glass dome glamping under stars.' },
      { day: 'Day 3', title: 'Mega Yacht Cruise', detail: 'Half-day luxury charter around Palm Jumeirah. Gourmet seafood barbecue, sunset skyline photography session.' },
      { day: 'Day 4', title: 'High-Altitude Dinner', detail: 'Private luxury dining setup on the Burj Khalifa observation platform. Custom menu curated by Michelin-star culinary team.' },
      { day: 'Day 5', title: 'Elite Curation Shopping', detail: 'Personal shopper accompaniment at designer boutiques. Private chauffeur transfer to VIP departure lounge.' }
    ]
  },
  { 
    name: 'Switzerland', 
    price: 18000, 
    img: '/images/switzerland.png', 
    desc: 'Snow peaks & prestige chalets',
    latLong: '46.0207° N, 7.7491° E',
    itinerary: [
      { day: 'Day 1', title: 'Private Train Transit', detail: 'Board chartered panoramic train saloon from Zurich to Zermatt. Traditional welcome fondue at mountain-side luxury resort.' },
      { day: 'Day 2', title: 'Glacier Helicopter Tour', detail: 'Scenic helicopter flight over Matterhorn peaks. Mountaintop snow landing for a private champagne toast.' },
      { day: 'Day 3', title: 'Geneva Watch Tasting', detail: 'Chauffeur to Geneva watch atelier. Private custom watchmaking tasting session, watch engraving customization.' },
      { day: 'Day 4', title: 'Thermal Wellness Retreat', detail: 'Exclusive lease of luxury thermal baths. Aromatherapy massages and private wellness coach alignment.' },
      { day: 'Day 5', title: 'Alpine Departure', detail: 'Leisurely alpine trail walk. Private flight departure from Sion airfield.' }
    ]
  },
  { 
    name: 'Bali', 
    price: 9500, 
    img: '/images/bali.png', 
    desc: 'Rainforest wellness & zen pools',
    latLong: '8.4095° S, 115.1889° E',
    itinerary: [
      { day: 'Day 1', title: 'Jungle Villa Check-in', detail: 'Arrive in Ubud via private chauffeur. Settle into over-valley infinity pool suite. In-villa spiritual blessing ritual.' },
      { day: 'Day 2', title: 'Sacred Water Cleansing', detail: 'Exclusive early morning temple access. Guided water cleansing, organic farming tour, raw vegan gourmet lunch.' },
      { day: 'Day 3', title: 'Nusa Penida Yacht Cruise', detail: 'Sail to Nusa Penida on private yacht. Manta ray snorkeling, sunset beach picnic under palm arches.' },
      { day: 'Day 4', title: 'Volcanic Peak Sunrise', detail: 'Helicopter sunrise tour over Mt. Batur caldera. Wellness retreat massage and yoga session at the resort.' },
      { day: 'Day 5', title: 'Zen Departure', detail: 'Leisurely organic wellness juice alignment. Chauffeur transfer to Denpasar VIP terminal.' }
    ]
  },
  { 
    name: 'Paris', 
    price: 11000, 
    img: '/images/paris.png', 
    desc: 'Avenues of fashion, culture & art',
    latLong: '48.8566° N, 2.3522° E',
    itinerary: [
      { day: 'Day 1', title: 'Penthouse Check-in', detail: 'Private transfer from Paris Le Bourget airfield to Eiffel Suite. Welcome tasting of rare French wines.' },
      { day: 'Day 2', title: 'Louvre After-Hours', detail: 'Private after-hours tour of the Louvre Museum with art historian guide. Dinner at exclusive Palais-Royal restaurant.' },
      { day: 'Day 3', title: 'Haute Couture Curation', detail: 'Private styling session at luxury avenue fashion house. Custom atelier fitting, classic vintage car tour.' },
      { day: 'Day 4', title: 'Michelin Masterclass', detail: 'Private cooking session at 3-star Michelin kitchen. Exquisite tasting dinner paired with grand cru Champagnes.' },
      { day: 'Day 5', title: 'Palace Departure', detail: 'Chauffeur back to Le Bourget VIP aviation gate.' }
    ]
  },
  { 
    name: 'Turkey', 
    price: 10200, 
    img: '/images/turkey.png', 
    desc: 'Cappadocia balloons & cave mansion',
    latLong: '38.6431° N, 34.8289° E',
    itinerary: [
      { day: 'Day 1', title: 'Cave Mansion Check-in', detail: 'Private flight connection to Nevsehir. Check-in at historic luxury cave suite. Traditional clay bath spa.' },
      { day: 'Day 2', title: 'Sunrise Balloon Flight', detail: 'Exclusive private sunrise balloon flight over the Fairy Chimneys. Caviar & champagne landing celebration.' },
      { day: 'Day 3', title: 'Bosphorus Yacht Cruise', detail: 'Private jet link to Istanbul. Afternoon yacht cruise along the Bosphorus strait divider, private palace tour.' },
      { day: 'Day 4', title: 'Ottoman Feast Dinner', detail: '10-course historical Ottoman recipe degustation dinner. Private classical Turkish music recital.' },
      { day: 'Day 5', title: 'Historic Departure', detail: 'VIP airport transfer for outbound private jet charter connection.' }
    ]
  }
]

const packages = [
  { name: 'Basic Edition', priceMod: 0, desc: 'First class travel, luxury suites' },
  { name: 'Premium Edition', priceMod: 4500, desc: 'Short-haul private jet, 5-star villa buyouts' },
  { name: 'Elite Edition', priceMod: 12000, desc: 'Long-range private jet, private island buyouts' }
]

const addonsList = [
  { id: 'concierge', name: 'VIP Concierge', price: 1500, desc: '24/7 dedicated local liaison' },
  { id: 'jet', name: 'Private Jet Upgrade', price: 18500, desc: 'Custom long-range routes' },
  { id: 'chauffeur', name: 'Luxury Chauffeur', price: 950, desc: 'Rolls Royce or Maybach standby' },
  { id: 'yacht', name: 'Yacht Access', price: 4500, desc: '4-hour evening catamaran cruise' }
]

const currencyRates = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 }
}

const avatars = [
  { name: 'Gold Crown', emoji: '👑' },
  { name: 'Private Jet', emoji: '🛩️' },
  { name: 'Yacht', emoji: '🛥️' },
  { name: 'Passport', emoji: '🛂' }
]

export default function Booking() {
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(1)
  const [currency, setCurrency] = useState('USD')

  // Booking states
  const [selectedDest, setSelectedDest] = useState(null)
  const [travelDates, setTravelDates] = useState('')
  const [travelersCount, setTravelersCount] = useState(2)
  const [selectedPackage, setSelectedPackage] = useState(packages[0])
  const [selectedAddons, setSelectedAddons] = useState([])
  const [travellerDetails, setTravellerDetails] = useState({ fullName: '', email: '', phone: '' })
  const [paymentDetails, setPaymentDetails] = useState({ cardName: '', cardNumber: '', cardExpiry: '', cardCvv: '' })
  const [formErrors, setFormErrors] = useState({})
  
  // Custom states for upgraded features
  const [savedProfiles, setSavedProfiles] = useState([])
  const [selectedAvatar, setSelectedAvatar] = useState('👑')
  const [activeDayIdx, setActiveDayIdx] = useState(0)
  const [activeConfirmTab, setActiveConfirmTab] = useState('receipt') // receipt or email
  const [bookingRef, setBookingRef] = useState('')

  // 1. Session persistence / recovery (Draft Recovery)
  useEffect(() => {
    const draft = localStorage.getItem('aurevia_booking_draft')
    if (draft) {
      try {
        const parsed = JSON.parse(draft)
        if (parsed.selectedDest) {
          const d = destinations.find(dest => dest.name === parsed.selectedDest.name)
          if (d) {
            setTimeout(() => setSelectedDest(d), 0)
          }
        }
        if (parsed.travelDates) {
          setTimeout(() => setTravelDates(parsed.travelDates), 0)
        }
        if (parsed.travelersCount) {
          setTimeout(() => setTravelersCount(parsed.travelersCount), 0)
        }
        if (parsed.selectedPackage) {
          const p = packages.find(pkg => pkg.name === parsed.selectedPackage.name)
          if (p) {
            setTimeout(() => setSelectedPackage(p), 0)
          }
        }
        if (parsed.selectedAddons) {
          setTimeout(() => setSelectedAddons(parsed.selectedAddons), 0)
        }
        if (parsed.travellerDetails) {
          setTimeout(() => setTravellerDetails(parsed.travellerDetails), 0)
        }
        if (parsed.currentStep && parsed.currentStep < 7) {
          setTimeout(() => setCurrentStep(parsed.currentStep), 0)
        }
      } catch (e) {
        console.warn('Failed to parse draft booking', e)
      }
    }

    // Load saved travelers list
    const profiles = localStorage.getItem('aurevia_saved_travelers')
    if (profiles) {
      try {
        const parsedProfiles = JSON.parse(profiles)
        setTimeout(() => setSavedProfiles(parsedProfiles), 0)
      } catch {
        setTimeout(() => setSavedProfiles([]), 0)
      }
    } else {
      // Default sample profile
      const defaultProfiles = [
        { id: 1, fullName: 'Alexander Vance', email: 'vance@aurevia.com', phone: '+41 22 550 1234', avatar: '👑' }
      ]
      setTimeout(() => {
        setSavedProfiles(defaultProfiles)
        localStorage.setItem('aurevia_saved_travelers', JSON.stringify(defaultProfiles))
      }, 0)
    }
  }, [])

  // Route state preloading overrides draft recovery
  useEffect(() => {
    if (location.state) {
      if (location.state.destination) {
        const d = destinations.find(dest => dest.name.toLowerCase() === location.state.destination.toLowerCase())
        if (d) {
          setTimeout(() => setSelectedDest(d), 0)
        }
      }
      if (location.state.package) {
        const p = packages.find(pkg => pkg.name.toLowerCase() === location.state.package.toLowerCase())
        if (p) {
          setTimeout(() => setSelectedPackage(p), 0)
        }
      }
      if (location.state.guests) {
        const g = parseInt(location.state.guests)
        if (!isNaN(g)) {
          setTimeout(() => setTravelersCount(g), 0)
        }
      }
      if (location.state.dates) {
        setTimeout(() => setTravelDates(location.state.dates), 0)
      }
    }
  }, [location])

  // Save draft on every selection update
  useEffect(() => {
    if (currentStep < 7) {
      const draft = {
        selectedDest,
        travelDates,
        travelersCount,
        selectedPackage,
        selectedAddons,
        travellerDetails,
        currentStep
      }
      localStorage.setItem('aurevia_booking_draft', JSON.stringify(draft))
    } else {
      // Clear draft on confirmation step
      localStorage.removeItem('aurevia_booking_draft')
    }
  }, [selectedDest, travelDates, travelersCount, selectedPackage, selectedAddons, travellerDetails, currentStep])

  // Real-time pricing calculations
  const calculatePricing = () => {
    if (!selectedDest) return { total: 0, subtotal: 0, tax: 0 }
    
    const baseSum = (selectedDest.price + selectedPackage.priceMod) * travelersCount
    const addonSum = selectedAddons.reduce((acc, addId) => {
      const add = addonsList.find(a => a.id === addId)
      return acc + (add ? add.price : 0)
    }, 0)

    const subtotal = baseSum + addonSum
    const tax = Math.round(subtotal * 0.08) // 8% luxury tax
    const total = subtotal + tax

    return { subtotal, tax, total }
  }

  const { subtotal, tax, total } = calculatePricing()
  const currentSymbol = currencyRates[currency].symbol
  const currentRate = currencyRates[currency].rate

  const convertPrice = (priceInUSD) => {
    return Math.round(priceInUSD * currentRate)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price)
  }

  // Next & Prev steps validation
  const validateStep = () => {
    const err = {}
    if (currentStep === 1 && !selectedDest) {
      err.destination = 'Please select a destination portal.'
    }
    if (currentStep === 2) {
      if (!travelDates) err.dates = 'Please select travel dates.'
      if (travelersCount < 1) err.guests = 'Traveler count must be at least 1.'
    }
    if (currentStep === 5) {
      if (!travellerDetails.fullName.trim()) err.fullName = 'Full name is required.'
      if (!travellerDetails.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(travellerDetails.email)) err.email = 'Valid email is required.'
      if (!travellerDetails.phone.trim()) err.phone = 'Phone number is required.'
    }
    if (currentStep === 6) {
      if (!paymentDetails.cardName.trim()) err.cardName = 'Cardholder name is required.'
      if (!paymentDetails.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) err.cardNumber = 'Card number must be 16 digits.'
      if (!paymentDetails.cardExpiry.match(/^\d{2}\/\d{2}$/)) err.cardExpiry = 'Expiry must be in MM/YY format.'
      if (!paymentDetails.cardCvv.match(/^\d{3}$/)) err.cardCvv = 'CVV must be 3 digits.'
    }

    setFormErrors(err)
    return Object.keys(err).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep === 6) {
        // Generate booking ref and save traveler profile to localStorage
        const ref = 'AV-' + Math.floor(100000 + Math.random() * 900000)
        setBookingRef(ref)

        // Save traveler details as a profile if not duplicate
        const isDuplicate = savedProfiles.some(p => p.email.toLowerCase() === travellerDetails.email.toLowerCase())
        if (!isDuplicate) {
          const newProfile = {
            id: Date.now(),
            fullName: travellerDetails.fullName,
            email: travellerDetails.email,
            phone: travellerDetails.phone,
            avatar: selectedAvatar
          }
          const updated = [...savedProfiles, newProfile]
          setSavedProfiles(updated)
          localStorage.setItem('aurevia_saved_travelers', JSON.stringify(updated))
        }
      }
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  // Toggle addons
  const handleToggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id))
    } else {
      setSelectedAddons([...selectedAddons, id])
    }
  }

  // Load saved profile
  const handleLoadProfile = (profile) => {
    setTravellerDetails({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone
    })
    setSelectedAvatar(profile.avatar)
  }

  // Generate itinerary file/print
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="relative w-full pt-32 pb-24 bg-[#0a0a0c] min-h-screen">
      <SEO
        title="Curate Journey"
        description="Book your bespoke travel package. Real-time pricing calculations, currency conversions, and itinerary curations."
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Form & Steps */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header */}
          <div className="space-y-3 text-left">
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase block">MEMBER BOOKINGS</span>
            <h1 className="font-display text-3xl md:text-5xl font-light text-white tracking-tight">
              Curate Your Expedition
            </h1>
          </div>

          {/* Stepper progress */}
          {currentStep <= 6 && (
            <div className="relative flex justify-between items-center w-full py-4 border-b border-white/5 overflow-x-auto select-none">
              {steps.slice(0, 6).map((s) => (
                <div key={s.id} className="flex items-center space-x-2 shrink-0 pr-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                    currentStep === s.id
                      ? 'bg-gold text-[#0a0a0c] border-gold'
                      : currentStep > s.id
                        ? 'bg-white/10 text-white border-white/10'
                        : 'bg-transparent text-text-secondary border-white/10'
                  }`}>
                    {currentStep > s.id ? <Check size={12} /> : s.id}
                  </div>
                  <span className={`text-[10px] tracking-widest uppercase transition-colors ${
                    currentStep === s.id ? 'text-white' : 'text-text-secondary'
                  }`}>
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Stepper Contents */}
          <div className="glass-effect rounded-3xl p-8 border border-white/5 min-h-[420px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Destination Selection */}
              {currentStep === 1 && (
                <m.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="text-left">
                    <h3 className="font-display text-lg text-white font-medium mb-1 tracking-wide">
                      Select Luxury Destination
                    </h3>
                    <p className="text-xs text-text-secondary font-light tracking-wide font-sans">
                      Choose your primary gateway location. Additional regional coordinates can be arranged with your butler.
                    </p>
                  </div>

                  {formErrors.destination && (
                    <p className="text-[10px] tracking-widest text-red-400 font-sans text-left">{formErrors.destination}</p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {destinations.map((dest) => (
                      <div
                        key={dest.name}
                        onClick={() => setSelectedDest(dest)}
                        className={`rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 relative h-[140px] flex flex-col justify-end p-5 ${
                          selectedDest?.name === dest.name
                            ? 'border-gold shadow-lg shadow-gold/5'
                            : 'border-white/5 hover:border-white/10'
                        }`}
                      >
                        <img
                          src={dest.img}
                          alt={dest.name}
                          className="absolute inset-0 w-full h-full object-cover brightness-[0.45] transition-transform duration-500 hover:scale-103"
                        />
                        <div className="relative z-10 text-left">
                          <h4 className="font-display text-md text-white font-medium tracking-wide">{dest.name}</h4>
                          <p className="text-[9px] text-text-secondary tracking-widest uppercase mt-0.5 font-sans">
                            From {currentSymbol}{formatPrice(convertPrice(dest.price))}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </m.div>
              )}

              {/* Step 2: Dates & Guests */}
              {currentStep === 2 && (
                <m.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="text-left">
                    <h3 className="font-display text-lg text-white font-medium mb-1 tracking-wide">
                      Dates & Guests
                    </h3>
                    <p className="text-xs text-text-secondary font-light tracking-wide font-sans">
                      Choose your departure window. All flight pathways and villa availability are locked upon authorization.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-left">
                      <label htmlFor="dates" className="text-[10px] tracking-[0.2em] text-text-secondary uppercase">Departure Date</label>
                      <div className="relative flex items-center">
                        <Calendar className="absolute left-4 text-gold" size={16} />
                        <input
                          id="dates"
                          type="date"
                          value={travelDates}
                          onChange={(e) => setTravelDates(e.target.value)}
                          className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-12 py-3.5 text-xs text-white rounded-xl outline-none tracking-wider transition-colors focus-visible:ring-1 focus-visible:ring-gold"
                        />
                      </div>
                      {formErrors.dates && (
                        <p className="text-[10px] text-red-400 font-sans">{formErrors.dates}</p>
                      )}
                    </div>

                    <div className="space-y-2 text-left">
                      <label htmlFor="guests" className="text-[10px] tracking-[0.2em] text-text-secondary uppercase">Traveler Count</label>
                      <div className="relative flex items-center">
                        <Users className="absolute left-4 text-gold" size={16} />
                        <input
                          id="guests"
                          type="number"
                          min="1"
                          max="20"
                          value={travelersCount}
                          onChange={(e) => setTravelersCount(parseInt(e.target.value) || 1)}
                          className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-12 py-3.5 text-xs text-white rounded-xl outline-none tracking-wider transition-colors focus-visible:ring-1 focus-visible:ring-gold"
                        />
                      </div>
                      {formErrors.guests && (
                        <p className="text-[10px] text-red-400 font-sans">{formErrors.guests}</p>
                      )}
                    </div>
                  </div>
                </m.div>
              )}

              {/* Step 3: Package Tiers */}
              {currentStep === 3 && (
                <m.div
                  key="step3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="text-left">
                    <h3 className="font-display text-lg text-white font-medium mb-1 tracking-wide">
                      Select Service Edition
                    </h3>
                    <p className="text-xs text-text-secondary font-light tracking-wide font-sans">
                      Define the level of logistical execution and lodging layout.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.name}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-6 rounded-2xl cursor-pointer border-2 transition-all duration-300 text-left flex flex-col justify-between h-[180px] ${
                          selectedPackage.name === pkg.name
                            ? 'bg-[#0f0f13] border-gold shadow-lg shadow-gold/5'
                            : 'bg-[#08080a] border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div>
                          <h4 className="font-display text-md text-white font-medium tracking-wide mb-2">{pkg.name}</h4>
                          <p className="text-[10px] text-text-secondary tracking-wide font-light font-sans leading-relaxed">
                            {pkg.desc}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-white/5">
                          <span className="text-[9px] tracking-[0.2em] text-text-secondary uppercase block">Modifier</span>
                          <span className="text-sm font-semibold text-white font-sans">
                            {pkg.priceMod === 0 ? 'Included' : `+${currentSymbol}${formatPrice(convertPrice(pkg.priceMod))}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </m.div>
              )}

              {/* Step 4: Luxury Add-ons */}
              {currentStep === 4 && (
                <m.div
                  key="step4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="text-left">
                    <h3 className="font-display text-lg text-white font-medium mb-1 tracking-wide">
                      Luxury Add-ons
                    </h3>
                    <p className="text-xs text-text-secondary font-light tracking-wide font-sans">
                      Bespoke amenities that elevate your transit and localized security.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addonsList.map((addon) => {
                      const isSelected = selectedAddons.includes(addon.id)
                      return (
                        <div
                          key={addon.id}
                          onClick={() => handleToggleAddon(addon.id)}
                          className={`p-5 rounded-2xl cursor-pointer border-2 transition-all duration-300 text-left flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#0f0f13] border-gold'
                              : 'bg-[#08080a] border-white/5 hover:border-white/10'
                          }`}
                        >
                          <div className="space-y-1">
                            <h4 className="text-xs font-semibold tracking-wider text-white uppercase">{addon.name}</h4>
                            <p className="text-[10px] text-text-secondary font-light font-sans leading-relaxed">{addon.desc}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-gold font-sans">+{currentSymbol}{formatPrice(convertPrice(addon.price))}</span>
                            {isSelected ? (
                              <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center text-[#0a0a0c] mt-1.5 ml-auto">
                                <Check size={11} />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center text-white/30 mt-1.5 ml-auto hover:border-gold hover:text-gold">
                                <Plus size={11} />
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </m.div>
              )}

              {/* Step 5: Traveller Details */}
              {currentStep === 5 && (
                <m.div
                  key="step5"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg text-white font-medium mb-1 tracking-wide">
                        Lead Traveller Details
                      </h3>
                      <p className="text-xs text-text-secondary font-light tracking-wide font-sans">
                        Primary contact credentials for flight Manifest filing and check-in rosters.
                      </p>
                    </div>

                    {/* Saved profiles dropdown */}
                    {savedProfiles.length > 0 && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:space-x-2 sm:gap-0 shrink-0">
                        <span className="text-[9px] tracking-widest text-gold uppercase font-bold">Autofill Profile</span>
                        <div className="flex flex-wrap gap-2">
                          {savedProfiles.map(prof => (
                            <button
                              key={prof.id}
                              type="button"
                              onClick={() => handleLoadProfile(prof)}
                              className="magnet-target px-3 py-1.5 rounded-lg border border-white/10 bg-white/3 text-[10px] text-white hover:border-gold transition-colors flex items-center gap-1.5"
                            >
                              <span>{prof.avatar}</span>
                              <span className="truncate max-w-[80px]">{prof.fullName.split(' ')[0]}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-2 text-left">
                      <label htmlFor="fullName" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Full Name</label>
                      <input
                        id="fullName"
                        type="text"
                        value={travellerDetails.fullName}
                        onChange={(e) => setTravellerDetails({ ...travellerDetails, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-5 py-3.5 text-xs text-white rounded-xl outline-none focus-visible:ring-1 focus-visible:ring-gold"
                      />
                      {formErrors.fullName && <p className="text-[10px] text-red-400 font-sans">{formErrors.fullName}</p>}
                    </div>

                    <div className="space-y-2 text-left">
                      <label htmlFor="email" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        value={travellerDetails.email}
                        onChange={(e) => setTravellerDetails({ ...travellerDetails, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-5 py-3.5 text-xs text-white rounded-xl outline-none focus-visible:ring-1 focus-visible:ring-gold"
                      />
                      {formErrors.email && <p className="text-[10px] text-red-400 font-sans">{formErrors.email}</p>}
                    </div>

                    <div className="space-y-2 text-left">
                      <label htmlFor="phone" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Phone Number</label>
                      <input
                        id="phone"
                        type="text"
                        value={travellerDetails.phone}
                        onChange={(e) => setTravellerDetails({ ...travellerDetails, phone: e.target.value })}
                        placeholder="+41 22 550 1234"
                        className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-5 py-3.5 text-xs text-white rounded-xl outline-none focus-visible:ring-1 focus-visible:ring-gold"
                      />
                      {formErrors.phone && <p className="text-[10px] text-red-400 font-sans">{formErrors.phone}</p>}
                    </div>
                  </div>

                  {/* Avatar Selector */}
                  <div className="space-y-3 pt-2 text-left">
                    <label className="text-[9px] tracking-[0.2em] text-text-secondary uppercase block">Select Avatar Mark</label>
                    <div className="flex gap-4">
                      {avatars.map(av => (
                        <button
                          key={av.name}
                          type="button"
                          onClick={() => setSelectedAvatar(av.emoji)}
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg transition-all ${
                            selectedAvatar === av.emoji
                              ? 'bg-gold/10 border-gold scale-105'
                              : 'bg-white/3 border-white/5 hover:border-white/10'
                          }`}
                          title={av.name}
                        >
                          {av.emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </m.div>
              )}

              {/* Step 6: Payment UI */}
              {currentStep === 6 && (
                <m.div
                  key="step6"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="text-left">
                    <h3 className="font-display text-lg text-white font-medium mb-1 tracking-wide">
                      Secure Bill Authorization
                    </h3>
                    <p className="text-xs text-text-secondary font-light tracking-wide font-sans">
                      Execute authorization for booking reservations. Direct bank paths can be requested with your liaison.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Visual Card Mockup */}
                    <div className="w-full h-[200px] rounded-2xl bg-gradient-to-br from-[#121217] via-[#22222a] to-[#0a0a0c] border border-white/15 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                      <div className="absolute right-[-40px] top-[-40px] w-32 h-32 bg-gold/5 blur-3xl rounded-full" />
                      
                      <div className="flex justify-between items-start">
                        <span className="font-display text-xs tracking-widest text-text-secondary uppercase">Aurevia Elite</span>
                        <Shield className="text-gold" size={20} />
                      </div>

                      <div className="space-y-4">
                        <div className="text-lg md:text-xl tracking-[0.2em] font-mono text-white text-left">
                          {paymentDetails.cardNumber 
                            ? paymentDetails.cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim() 
                            : '•••• •••• •••• ••••'}
                        </div>

                        <div className="flex justify-between items-end">
                          <div className="text-left">
                            <span className="text-[7px] tracking-wider text-text-secondary block">CARDHOLDER</span>
                            <span className="text-[10px] tracking-widest text-white uppercase font-mono truncate max-w-[150px]">
                              {paymentDetails.cardName || 'YOUR FULL NAME'}
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="text-[7px] tracking-wider text-text-secondary block">EXPIRY</span>
                            <span className="text-[10px] tracking-widest text-white font-mono">
                              {paymentDetails.cardExpiry || 'MM/YY'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4 text-left">
                      <div className="space-y-1">
                        <label htmlFor="cardName" className="text-[8px] tracking-[0.2em] text-text-secondary uppercase">Cardholder Name</label>
                        <input
                          id="cardName"
                          type="text"
                          value={paymentDetails.cardName}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                          placeholder="Alexander Vance"
                          className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-4 py-3 text-xs text-white rounded-xl outline-none focus-visible:ring-1 focus-visible:ring-gold"
                        />
                        {formErrors.cardName && <p className="text-[9px] text-red-400 font-sans">{formErrors.cardName}</p>}
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="cardNumber" className="text-[8px] tracking-[0.2em] text-text-secondary uppercase">Card Number</label>
                        <input
                          id="cardNumber"
                          type="text"
                          maxLength="16"
                          value={paymentDetails.cardNumber}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value.replace(/\D/g, '') })}
                          placeholder="4000123456789010"
                          className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-4 py-3 text-xs text-white rounded-xl outline-none focus-visible:ring-1 focus-visible:ring-gold"
                        />
                        {formErrors.cardNumber && <p className="text-[9px] text-red-400 font-sans">{formErrors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label htmlFor="cardExpiry" className="text-[8px] tracking-[0.2em] text-text-secondary uppercase">Expiry Date</label>
                          <input
                            id="cardExpiry"
                            type="text"
                            maxLength="5"
                            placeholder="MM/YY"
                            value={paymentDetails.cardExpiry}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardExpiry: e.target.value })}
                            className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-4 py-3 text-xs text-white rounded-xl outline-none focus-visible:ring-1 focus-visible:ring-gold"
                          />
                          {formErrors.cardExpiry && <p className="text-[9px] text-red-400 font-sans">{formErrors.cardExpiry}</p>}
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="cardCvv" className="text-[8px] tracking-[0.2em] text-text-secondary uppercase">CVV</label>
                          <input
                            id="cardCvv"
                            type="password"
                            maxLength="3"
                            placeholder="•••"
                            value={paymentDetails.cardCvv}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardCvv: e.target.value.replace(/\D/g, '') })}
                            className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-4 py-3 text-xs text-white rounded-xl outline-none focus-visible:ring-1 focus-visible:ring-gold"
                          />
                          {formErrors.cardCvv && <p className="text-[9px] text-red-400 font-sans">{formErrors.cardCvv}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </m.div>
              )}

              {/* Step 7: Confirmation Screen */}
              {currentStep === 7 && (
                <m.div
                  key="step7"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center text-gold animate-bounce">
                    <Sparkles size={28} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-2xl text-white font-light tracking-wide">
                      Itinerary Reservated Successfully
                    </h3>
                    <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed tracking-wider font-sans">
                      Thank you. Your booking reference <span className="font-bold text-white font-mono">{bookingRef}</span> is verified. A physical copy has been compiled for downloading.
                    </p>
                  </div>

                  {/* Receipt & Email confirmation toggles */}
                  <div className="flex space-x-4 border-b border-white/5 pb-2 w-full max-w-md">
                    <button
                      onClick={() => setActiveConfirmTab('receipt')}
                      className={`text-[10px] tracking-widest uppercase pb-2 border-b-2 font-medium transition-all duration-300 ${
                        activeConfirmTab === 'receipt' ? 'border-gold text-gold' : 'border-transparent text-text-secondary'
                      }`}
                    >
                      Printable Receipt
                    </button>
                    <button
                      onClick={() => setActiveConfirmTab('email')}
                      className={`text-[10px] tracking-widest uppercase pb-2 border-b-2 font-medium transition-all duration-300 ${
                        activeConfirmTab === 'email' ? 'border-gold text-gold' : 'border-transparent text-text-secondary'
                      }`}
                    >
                      Email Preview
                    </button>
                  </div>

                  {/* Printable Receipt layout */}
                  {activeConfirmTab === 'receipt' && (
                    <div id="print-area" className="w-full max-w-md p-6 rounded-2xl border border-white/10 bg-[#08080a] text-left space-y-4 shadow-xl">
                      <div className="flex justify-between items-start border-b border-white/5 pb-4">
                        <div>
                          <h4 className="font-display text-sm font-semibold tracking-widest text-white uppercase">Aurevia Travels</h4>
                          <span className="text-[9px] text-text-secondary tracking-widest uppercase font-sans">Geneva Portal</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] tracking-wider text-text-secondary block font-sans">REFERENCE</span>
                          <span className="text-xs font-mono font-bold text-gold">{bookingRef}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs tracking-wider font-sans">
                        <div>
                          <span className="text-[8px] text-text-secondary uppercase block">Lead Traveller</span>
                          <span className="text-white font-medium">{travellerDetails.fullName}</span>
                        </div>
                        <div>
                          <span className="text-[8px] text-text-secondary uppercase block">Destination</span>
                          <span className="text-white font-medium">{selectedDest?.name}</span>
                        </div>
                        <div>
                          <span className="text-[8px] text-text-secondary uppercase block">Departure Date</span>
                          <span className="text-white font-mono font-medium">{travelDates}</span>
                        </div>
                        <div>
                          <span className="text-[8px] text-text-secondary uppercase block">Guests count</span>
                          <span className="text-white font-medium">{travelersCount} traveler(s)</span>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-4 space-y-2 text-xs font-sans">
                        <div className="flex justify-between text-text-secondary">
                          <span>Tier: {selectedPackage.name}</span>
                          <span>{currentSymbol}{formatPrice(convertPrice(((selectedDest?.price || 0) + selectedPackage.priceMod) * travelersCount))}</span>
                        </div>
                        
                        {selectedAddons.length > 0 && (
                          <div className="space-y-1 pl-2 text-text-secondary text-[11px]">
                            {selectedAddons.map(addId => {
                              const add = addonsList.find(a => a.id === addId)
                              return (
                                <div key={addId} className="flex justify-between">
                                  <span>+ {add?.name}</span>
                                  <span>{currentSymbol}{formatPrice(convertPrice(add?.price || 0))}</span>
                                </div>
                              )
                            })}
                          </div>
                        )}

                        <div className="flex justify-between text-text-secondary">
                          <span>Luxury Taxes (8%)</span>
                          <span>{currentSymbol}{formatPrice(convertPrice(tax))}</span>
                        </div>

                        <div className="h-[1px] bg-white/5 my-2" />

                        <div className="flex justify-between font-bold text-white text-sm">
                          <span className="tracking-widest uppercase">Grand Total</span>
                          <span className="text-gold">{currentSymbol}{formatPrice(convertPrice(total))}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Email Confirmation UI Preview */}
                  {activeConfirmTab === 'email' && (
                    <div className="w-full max-w-md p-6 rounded-2xl border border-white/10 bg-[#0c0c10] text-left space-y-5 shadow-2xl relative overflow-hidden text-white font-sans">
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
                      
                      <div className="flex items-center space-x-3 text-gold">
                        <Mail size={16} />
                        <span className="text-[10px] tracking-widest uppercase font-bold">DISPATCHED EMAIL OUTLINE</span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold tracking-wide">Your private manifest is locked.</h4>
                        <p className="text-[11px] text-text-secondary leading-relaxed">
                          From: concierge@aurevia.com<br />
                          To: {travellerDetails.email}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/2 space-y-3 text-xs border border-white/5">
                        <p className="text-[11px] leading-relaxed text-white/90">
                          Dear {travellerDetails.fullName},<br /><br />
                          This email confirms that your bespoke itinerary to the <strong>{selectedDest?.name}</strong> is authorized under booking reference <strong>{bookingRef}</strong>.
                        </p>
                        <p className="text-[11px] leading-relaxed text-white/90">
                          Your dedicated destination butler is finalizing terminal transfers and custom meal selections. Expect a secure telephone call within 4 hours.
                        </p>
                        <div className="border-t border-white/5 pt-2 flex justify-between text-[10px] text-gold uppercase font-bold tracking-widest">
                          <span>Concierge Phone:</span>
                          <span>+41 (22) 550-1234</span>
                        </div>
                      </div>

                      <div className="text-[9px] text-text-secondary tracking-widest uppercase text-center">
                        SECURE ENCRYPTED ENVELOPE. CLOSED RESORT ROUTE.
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handlePrint}
                    className="magnet-target bg-white/5 hover:bg-white/10 text-white text-xs px-6 py-3.5 rounded-xl border border-white/10 tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2"
                  >
                    <Download size={14} className="text-gold" />
                    Download PDF Summary
                  </button>
                </m.div>
              )}
            </AnimatePresence>

            {/* Bottom Controls */}
            {currentStep <= 6 && (
              <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/5">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="magnet-target text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-white disabled:opacity-20 flex items-center gap-1.5 transition-colors focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <ArrowLeft size={14} />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  className="magnet-target bg-gold hover:bg-gold-hover text-[#0a0a0c] text-xs font-semibold px-6 py-3 rounded-xl tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-1.5 shadow-lg shadow-gold/5 focus-visible:ring-1 focus-visible:ring-gold"
                >
                  {currentStep === 6 ? 'Authorize Order' : 'Continue'}
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Floating Summary Sidebar (sticky) & Maps & Timeline */}
        {currentStep <= 6 && (
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            
            {/* Invoice Summary */}
            <div className="glass-effect rounded-3xl p-6 border border-white/5 space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h3 className="font-display text-sm font-semibold tracking-widest text-white uppercase">
                  Invoice Breakdown
                </h3>
                
                {/* Currency Selector inside summary */}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-transparent border-none text-[10px] tracking-widest text-gold outline-none cursor-pointer focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <option value="USD" className="bg-[#0a0a0c]">USD ($)</option>
                  <option value="EUR" className="bg-[#0a0a0c]">EUR (€)</option>
                  <option value="GBP" className="bg-[#0a0a0c]">GBP (£)</option>
                </select>
              </div>

              {selectedDest ? (
                <div className="space-y-4 text-left">
                  {/* Destination line */}
                  <div className="flex justify-between text-xs font-sans">
                    <div>
                      <span className="text-white font-medium block">{selectedDest.name}</span>
                      <span className="text-[10px] text-text-secondary">{travelersCount} Traveler(s)</span>
                    </div>
                    <span className="text-white font-mono">
                      {currentSymbol}{formatPrice(convertPrice(selectedDest.price * travelersCount))}
                    </span>
                  </div>

                  {/* Package line */}
                  <div className="flex justify-between text-xs border-t border-white/5 pt-3 font-sans">
                    <div>
                      <span className="text-white font-medium block">{selectedPackage.name}</span>
                      <span className="text-[10px] text-text-secondary">Tier Modifier</span>
                    </div>
                    <span className="text-white font-mono">
                      {selectedPackage.priceMod === 0 ? 'Included' : `${currentSymbol}${formatPrice(convertPrice(selectedPackage.priceMod * travelersCount))}`}
                    </span>
                  </div>

                  {/* Add-ons line */}
                  {selectedAddons.length > 0 && (
                    <div className="space-y-2 border-t border-white/5 pt-3 font-sans">
                      <span className="text-[10px] tracking-wider text-text-secondary block">Upgrades</span>
                      {selectedAddons.map((addId) => {
                        const add = addonsList.find(a => a.id === addId)
                        return (
                          <div key={addId} className="flex justify-between text-[11px] text-text-secondary">
                            <span>+ {add?.name}</span>
                            <span className="font-mono">{currentSymbol}{formatPrice(convertPrice(add?.price || 0))}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Pricing Summary */}
                  <div className="h-[1px] bg-white/5 my-4" />
                  
                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <span className="font-mono">{currentSymbol}{formatPrice(convertPrice(subtotal))}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Luxury Tax (8%)</span>
                      <span className="font-mono">{currentSymbol}{formatPrice(convertPrice(tax))}</span>
                    </div>
                    <div className="flex justify-between font-bold text-white text-sm pt-2 border-t border-white/5">
                      <span className="tracking-widest uppercase">Total Bill</span>
                      <span className="text-gold font-mono">{currentSymbol}{formatPrice(convertPrice(total))}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[8px] tracking-[0.15em] text-text-secondary uppercase pt-4 justify-center">
                    <Shield size={11} className="text-gold" />
                    Authorized Escrow Reserved
                  </div>
                </div>
              ) : (
                <p className="text-xs text-text-secondary tracking-wider text-center py-12 font-sans">
                  Configure gateway destination to compile live breakdown data.
                </p>
              )}
            </div>

            {/* Vector Map Preview Card */}
            {selectedDest && (
              <div className="glass-effect rounded-3xl p-5 border border-white/5 space-y-4 text-left">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] tracking-[0.2em] text-gold uppercase font-bold">PORTAL FLIGHT PATH</span>
                  <span className="text-[9px] tracking-wider text-text-secondary font-mono">{selectedDest.latLong}</span>
                </div>
                
                {/* SVG vector path visualization based on selected destination */}
                <div className="w-full h-[150px] bg-black/40 rounded-xl relative overflow-hidden border border-white/5 flex items-center justify-center select-none">
                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-5" 
                       style={{ backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }} 
                  />
                  
                  {/* Dynamic path vectors */}
                  <svg className="w-full h-full stroke-gold stroke-[1.5] fill-none" viewBox="0 0 200 150">
                    {/* Origin point (Geneva) */}
                    <circle cx="30" cy="90" r="3" fill="#fff" />
                    <text x="25" y="105" fill="#fafafa" fontSize="8" fontFamily="Satoshi">GVA</text>
                    
                    {/* Destination marker based on coords */}
                    <circle cx="150" cy="50" r="4" fill="#c6a97b" className="animate-pulse" />
                    <text x="145" y="40" fill="#c6a97b" fontSize="9" fontFamily="Clash Display" fontWeight="bold">
                      {selectedDest.name.toUpperCase()}
                    </text>

                    {/* Dotted path curve */}
                    <path d="M 30 90 Q 90 20 150 50" strokeDasharray="3 3" />
                  </svg>
                  
                  <div className="absolute bottom-3 left-3 bg-[#0a0a0c]/80 border border-white/10 px-2.5 py-1 rounded text-[8px] tracking-widest text-white font-sans uppercase">
                    Secure flight line active
                  </div>
                </div>
              </div>
            )}

            {/* Day-by-Day Accordion/Timeline */}
            {selectedDest && (
              <div className="glass-effect rounded-3xl p-5 border border-white/5 space-y-4 text-left">
                <span className="text-[9px] tracking-[0.2em] text-gold uppercase font-bold block">ITINERARY SEQUENCE</span>
                
                <div className="space-y-2">
                  {selectedDest.itinerary.map((day, idx) => (
                    <div 
                      key={day.day}
                      className="border-b border-white/5 last:border-none pb-2 last:pb-0"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveDayIdx(idx)}
                        className="w-full flex justify-between items-center text-xs text-white hover:text-gold transition-colors py-1.5"
                      >
                        <span className="font-semibold tracking-wider font-sans">{day.day}: {day.title}</span>
                        <span className="text-[10px] text-text-secondary font-mono">{activeDayIdx === idx ? '−' : '+'}</span>
                      </button>
                      
                      {activeDayIdx === idx && (
                        <m.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[10px] text-text-secondary leading-relaxed tracking-wider font-sans py-1"
                        >
                          {day.detail}
                        </m.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
