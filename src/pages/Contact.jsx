import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { m, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, ShieldAlert } from 'lucide-react'

// Components
import SEO from '../components/SEO'
import { checkRateLimit, sanitizeInput } from '../utils/security'

// Zod Schema
const contactSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(6, { message: 'Please enter a valid phone number.' }),
  destination: z.string().min(1, { message: 'Please select a destination interest.' }),
  message: z.string().min(10, { message: 'Message must contain at least 10 characters.' })
})

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [rateLimitError, setRateLimitError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      destination: '',
      message: ''
    }
  })

  const onSubmit = async (data) => {
    setRateLimitError('')

    // 1. Rate Limit Enforcement
    if (!checkRateLimit('contact_submit', 2, 30000)) {
      setRateLimitError('Spam threshold exceeded. Please pause 30s before resubmitting.')
      return
    }

    // 2. Input Sanitization
    const sanitizedData = {
      fullName: sanitizeInput(data.fullName),
      email: sanitizeInput(data.email),
      phone: sanitizeInput(data.phone),
      destination: sanitizeInput(data.destination),
      message: sanitizeInput(data.message)
    }

    // Simulating secure pipeline dispatch
    await new Promise((resolve) => setTimeout(() => resolve(sanitizedData), 1500))
    setIsSuccess(true)
    reset()
    setTimeout(() => setIsSuccess(false), 6000)
  }

  return (
    <div className="relative w-full pt-32 pb-24 bg-[#0a0a0c]">
      <SEO
        title="Contact Private Concierge"
        description="Initiate coordinates. Connect with our Geneva head office or request customized private jet charters and luxury itineraries."
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left column: Contact Info & Map */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4 text-left">
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase block">GLOBAL INQUIRIES</span>
            <h1 className="font-display text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
              Connect With Our <br />
              Private Concierge
            </h1>
            <p className="text-xs text-text-secondary leading-relaxed tracking-wider font-light font-sans">
              Your inquiry is routed directly to a dedicated destination manager. Standard response turnaround is within 4 hours.
            </p>
          </div>

          <div className="space-y-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/5 text-gold rounded-xl shrink-0">
                <Mail size={16} />
              </div>
              <div>
                <h4 className="text-[10px] tracking-[0.2em] text-text-secondary uppercase">Email Concierge</h4>
                <a href="mailto:concierge@aurevia.com" className="text-xs text-white hover:text-gold tracking-widest transition-colors duration-300">
                  concierge@aurevia.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/5 text-gold rounded-xl shrink-0">
                <Phone size={16} />
              </div>
              <div>
                <h4 className="text-[10px] tracking-[0.2em] text-text-secondary uppercase">Secure Phone Line</h4>
                <a href="tel:+41225501234" className="text-xs text-white hover:text-gold tracking-widest transition-colors duration-300">
                  +41 (22) 550-1234
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/5 text-gold rounded-xl shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <h4 className="text-[10px] tracking-[0.2em] text-text-secondary uppercase">Geneva Head Office</h4>
                <p className="text-xs text-white tracking-wider font-light font-sans">
                  Rue du Rhône 14, 1204 Geneva, Switzerland
                </p>
              </div>
            </div>
          </div>

          {/* Premium Vector Map Placeholder */}
          <div className="rounded-3xl glass-effect p-6 border border-white/5 space-y-4 relative overflow-hidden h-[240px] flex flex-col justify-between">
            {/* Background design elements to mimic a grid map */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ 
                   backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, 
                   backgroundSize: '16px 16px' 
                 }} 
            />
            {/* Mock map outline lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-white" strokeWidth="1" fill="none">
              <path d="M 0 50 Q 150 150 300 80 T 600 200" />
              <path d="M 50 0 Q 120 180 200 300" />
              <circle cx="280" cy="110" r="4" fill="#c6a97b" />
              <circle cx="280" cy="110" r="12" stroke="#c6a97b" strokeWidth="1" strokeDasharray="3 3" />
            </svg>

            <div className="flex justify-between items-start relative z-10">
              <span className="text-[9px] tracking-[0.25em] text-gold uppercase font-bold">HQ COORDINATES</span>
              <span className="text-[9px] tracking-wider text-text-secondary">46.2044° N, 6.1432° E</span>
            </div>

            <div className="relative z-10 text-left">
              <h4 className="text-xs font-semibold text-white tracking-widest uppercase mb-1">Geneva HQ Portal</h4>
              <p className="text-[10px] text-text-secondary tracking-wider font-light font-sans">
                Direct helicopter pick-up coordinates mapped to airport terminal pad 4.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Form */}
        <div className="lg:col-span-7">
          <div className="glass-effect rounded-3xl p-8 md:p-12 border border-white/5 relative">
            <h3 className="font-display text-xl font-light text-white tracking-wide mb-8">
              Initiate Private Charter
            </h3>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <m.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-6 text-center py-12 flex flex-col items-center"
                >
                  <CheckCircle size={56} className="text-gold stroke-[1.5]" />
                  <div className="space-y-2">
                    <h4 className="font-display text-lg font-medium text-white tracking-wide">
                      Concierge Routing Initiated
                    </h4>
                    <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed tracking-wider font-sans">
                      Thank you. Your request has been assigned to a premium account manager. We will be in contact shortly.
                    </p>
                  </div>
                </m.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {rateLimitError && (
                    <div className="bg-red-950/20 border border-red-500/10 p-3.5 rounded-xl text-[10px] tracking-widest text-red-400 text-left font-sans flex items-center gap-1.5">
                      <ShieldAlert size={12} />
                      {rateLimitError}
                    </div>
                  )}

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-left">
                      <label htmlFor="fullName" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Full Name</label>
                      <input
                        id="fullName"
                        type="text"
                        {...register('fullName')}
                        placeholder="John Doe"
                        className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-5 py-3 text-xs text-white rounded-xl outline-none tracking-wider transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                      />
                      {errors.fullName && (
                        <span className="text-[10px] text-red-400 tracking-wider flex items-center gap-1">
                          <ShieldAlert size={10} />
                          {errors.fullName.message}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-left">
                      <label htmlFor="email" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="john@example.com"
                        className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-5 py-3 text-xs text-white rounded-xl outline-none tracking-wider transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-400 tracking-wider flex items-center gap-1">
                          <ShieldAlert size={10} />
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-left">
                      <label htmlFor="phone" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Phone Number</label>
                      <input
                        id="phone"
                        type="text"
                        {...register('phone')}
                        placeholder="+41 22 550 1234"
                        className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-5 py-3 text-xs text-white rounded-xl outline-none tracking-wider transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-red-400 tracking-wider flex items-center gap-1">
                          <ShieldAlert size={10} />
                          {errors.phone.message}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-left">
                      <label htmlFor="interest" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Destination Interest</label>
                      <div className="relative">
                        <select
                          id="interest"
                          {...register('destination')}
                          className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-5 py-3 text-xs text-white rounded-xl outline-none appearance-none tracking-wider transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                        >
                          <option value="">Select Destination</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Dubai">Dubai</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Bali">Bali</option>
                          <option value="Paris">Paris</option>
                          <option value="Turkey">Turkey</option>
                        </select>
                      </div>
                      {errors.destination && (
                        <span className="text-[10px] text-red-400 tracking-wider flex items-center gap-1">
                          <ShieldAlert size={10} />
                          {errors.destination.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="space-y-2 text-left">
                    <label htmlFor="message" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Special Requests / Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message')}
                      placeholder="Outline any charter requests, flight paths or dietary setups..."
                      className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-5 py-4 text-xs text-white rounded-xl outline-none tracking-wider transition-colors duration-300 resize-none leading-relaxed focus-visible:ring-1 focus-visible:ring-gold"
                    />
                    {errors.message && (
                      <span className="text-[10px] text-red-400 tracking-wider flex items-center gap-1">
                        <ShieldAlert size={10} />
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="magnet-target w-full bg-gold hover:bg-gold-hover disabled:bg-gold/50 disabled:cursor-not-allowed text-[#0a0a0c] text-xs font-semibold py-4 rounded-xl tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gold/15 focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    {isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  )
}
