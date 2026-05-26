import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { m } from 'framer-motion'
import { Shield, Sparkles, Star, Check, ChevronRight } from 'lucide-react'

// Components
import SEO from '../components/SEO'

const packageTiers = [
  {
    id: 'basic',
    name: 'Basic Edition',
    badge: 'LUXURY RETREAT',
    tagline: 'Refined comfort in curated settings.',
    prices: { USD: 8500, EUR: 7800, GBP: 6700 },
    icon: Shield,
    features: [
      'First-class commercial flights',
      'Curated 5-star boutique resort suites',
      'Dedicated local travel guide',
      'Premium private airport transfers',
      'Daily curated dining plans',
      'Standard 10AM - 6PM concierge assistance'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Edition',
    badge: 'MOST SELECTED',
    tagline: 'Complete bespoke detailing & private flights.',
    prices: { USD: 14500, EUR: 13300, GBP: 11400 },
    icon: Sparkles,
    popular: true,
    features: [
      'Private jet charter connections (short-haul)',
      'Luxury overwater/jungle villa buyout',
      '24/7 dedicated personal concierge',
      'Private yacht charter access',
      'Michelin-starred dinners included',
      'Customized daily wellness itineraries'
    ]
  },
  {
    id: 'elite',
    name: 'Elite Edition',
    badge: 'THE PEAK EXPERIENCE',
    tagline: 'Absolute autonomy, private jet & islands.',
    prices: { USD: 32000, EUR: 29500, GBP: 25200 },
    icon: Star,
    features: [
      'Long-range private jet access from home airport',
      'Private island buyouts and estate lockdowns',
      'Personal 24/7 private butler & masterchef crew',
      'Unlimited mega yacht and helicopter logistics',
      'VIP Customs Clearance at all border controls',
      'Guaranteed extreme privacy & security layout'
    ]
  }
]

export default function Packages() {
  const navigate = useNavigate()
  const [currency, setCurrency] = useState('USD')

  const currencySymbols = {
    USD: '$',
    URL: '€', // wait, EUR is symbol €, let's correct mapping below
    EUR: '€',
    GBP: '£'
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price)
  }

  const handleBook = (packageName) => {
    navigate('/booking', { state: { package: packageName } })
  }

  // Schema for packages
  const packagesSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Aurevia Travels Luxury Packages",
    "description": "Premium, Premium and Elite luxury travel service tiers.",
    "offers": packageTiers.map(tier => ({
      "@type": "Offer",
      "name": tier.name,
      "price": tier.prices.USD,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }))
  }

  return (
    <div className="relative w-full pt-32 pb-24 bg-[#0a0a0c]">
      <SEO
        title="Luxury Package Tiers"
        description="Select from our curated travel tiers: Basic, Premium, and Elite. Each includes dedicated logistics, accommodations, and concierge services."
        schema={packagesSchema}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4 text-left">
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase block">SERVICE TIERS</span>
            <h1 className="font-display text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              Bespoke Package Tiers
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed tracking-wider font-light">
              We offer three levels of curated detail. While each guarantees high-end lodging and dedicated logistics, the Elite tier delivers complete privacy, private transport buyouts, and unlimited concierge operations.
            </p>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 p-1.5 rounded-full shrink-0">
            {['USD', 'EUR', 'GBP'].map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`magnet-target text-[10px] tracking-widest px-4 py-2 rounded-full uppercase font-medium transition-all duration-300 focus-visible:ring-1 focus-visible:ring-gold ${
                  currency === cur
                    ? 'bg-gold text-[#0a0a0c] shadow-lg shadow-gold/5'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packageTiers.map((tier) => {
            const Icon = tier.icon
            return (
              <m.div
                key={tier.id}
                className={`rounded-3xl p-8 md:p-10 flex flex-col justify-between relative transition-all duration-500 ${
                  tier.popular
                    ? 'bg-[#0e0e12] border-2 border-gold/40 shadow-2xl shadow-gold/5'
                    : 'glass-effect border border-white/5 shadow-xl'
                } group`}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-[#0a0a0c] text-[8px] tracking-[0.25em] uppercase font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {tier.badge}
                  </div>
                )}

                <div>
                  {/* Top area */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-left">
                      {!tier.popular && (
                        <span className="text-[8px] tracking-[0.2em] text-gold uppercase block mb-1">
                          {tier.badge}
                        </span>
                      )}
                      <h3 className="font-display text-2xl font-light text-white tracking-wide">
                        {tier.name}
                      </h3>
                    </div>
                    <div className={`p-3 rounded-2xl ${tier.popular ? 'bg-gold/10 text-gold' : 'bg-white/5 text-text-secondary group-hover:text-gold'} transition-colors duration-300`}>
                      <Icon size={18} />
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary tracking-wider font-light text-left font-sans mb-8">
                    {tier.tagline}
                  </p>

                  {/* Pricing */}
                  <div className="mb-10 text-left">
                    <span className="text-[10px] tracking-[0.2em] text-text-secondary uppercase block mb-1">Curated From</span>
                    <div className="flex items-baseline space-x-1.5 text-white">
                      <span className="text-4xl font-light tracking-tight">
                        {currencySymbols[currency]}{formatPrice(tier.prices[currency])}
                      </span>
                      <span className="text-xs text-text-secondary tracking-widest uppercase font-sans">/ traveler</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-white/5 my-8" />

                  {/* Features List */}
                  <div className="space-y-4 text-left">
                    <h4 className="text-[10px] tracking-[0.2em] text-text-secondary uppercase">Included Services</h4>
                    <ul className="space-y-3.5">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-xs text-white/90 tracking-wider">
                          <Check size={14} className="text-gold shrink-0 mt-0.5" />
                          <span className="font-sans">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-12">
                  <button
                    onClick={() => handleBook(tier.name)}
                    className={`magnet-target w-full text-xs tracking-[0.25em] uppercase font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 focus-visible:ring-1 focus-visible:ring-gold ${
                      tier.popular
                        ? 'bg-gold hover:bg-gold-hover text-[#0a0a0c] shadow-lg shadow-gold/15'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                    }`}
                  >
                    Select Package
                    <ChevronRight size={14} />
                  </button>
                </div>
              </m.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
