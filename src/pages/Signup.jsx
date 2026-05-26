import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { m, AnimatePresence } from 'framer-motion'
import { Shield, User, Mail, Phone, Lock, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react'

// Components
import SEO from '../components/SEO'
import { checkRateLimit, sanitizeInput } from '../utils/security'

// Zod Schema
const signupSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(6, { message: 'Please enter a valid phone number.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"]
})

export default function Signup() {
  const navigate = useNavigate()
  const [step, setStep] = useState('form') // form or otp
  const [otpVal, setOtpVal] = useState(['', '', '', '', '', ''])
  const [passwordStrength, setPasswordStrength] = useState({ label: 'None', color: 'bg-white/10', width: 'w-0' })
  const [rateLimitError, setRateLimitError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  })

  // Watch password field to update strength meter
  const password = watch('password')

  useEffect(() => {
    if (!password) {
      setPasswordStrength({ label: 'None', color: 'bg-white/10', width: '0%' })
      return
    }

    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++

    if (strength <= 1) {
      setPasswordStrength({ label: 'Weak', color: 'bg-red-500', width: '25%' })
    } else if (strength === 2) {
      setPasswordStrength({ label: 'Fair', color: 'bg-orange-500', width: '50%' })
    } else if (strength === 3) {
      setPasswordStrength({ label: 'Strong', color: 'bg-yellow-500', width: '75%' })
    } else {
      setPasswordStrength({ label: 'Elite', color: 'bg-emerald-500', width: '100%' })
    }
  }, [password])

  const onSubmitForm = async (data) => {
    setRateLimitError('')

    // 1. Rate Limiting Check
    if (!checkRateLimit('signup_attempts', 3, 60000)) {
      setRateLimitError('Too many requests. Please pause 60s.')
      return
    }

    // 2. Sanitization
    const sanitizedData = {
      fullName: sanitizeInput(data.fullName),
      email: sanitizeInput(data.email),
      phone: sanitizeInput(data.phone)
    }

    // Simulating signup API and sending OTP code
    await new Promise((resolve) => setTimeout(() => resolve(sanitizedData), 1500))
    setStep('otp')
  }

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false

    setOtpVal([...otpVal.map((d, idx) => (idx === index ? element.value : d))])

    // Focus next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus()
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    // Verify OTP code mockup
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setStep('success')
    setTimeout(() => {
      navigate('/login')
    }, 1500)
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-12 bg-[#0a0a0c] overflow-hidden">
      <SEO
        title="Member Registration"
        description="Register a secure account with Aurevia Travels to curate luxury travel configurations and secure private charters."
      />

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-lg px-6 z-10">
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-effect rounded-3xl p-8 md:p-10 border border-white/5 shadow-2xl relative"
        >
          {/* Brand Logo */}
          <div className="text-center mb-8 space-y-2">
            <Link to="/" className="flex flex-col items-center">
              <span className="font-display text-xl font-semibold tracking-[0.25em] text-white uppercase">
                Aurevia
              </span>
              <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase">
                Travels
              </span>
            </Link>
            <h2 className="text-xs text-text-secondary tracking-[0.15em] uppercase font-light font-sans">
              Create Bespoke Account
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {step === 'form' && (
              <m.form
                key="form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleSubmit(onSubmitForm)}
                className="space-y-5"
              >
                {rateLimitError && (
                  <div className="bg-red-950/20 border border-red-500/10 p-3.5 rounded-xl text-[10px] tracking-widest text-red-400 font-sans text-left flex items-center gap-1.5">
                    <ShieldAlert size={12} />
                    {rateLimitError}
                  </div>
                )}

                {/* Full Name */}
                <div className="space-y-2 text-left">
                  <label htmlFor="fullName" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Full Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-4 text-text-secondary" size={14} />
                    <input
                      id="fullName"
                      type="text"
                      {...register('fullName')}
                      placeholder="Alexander Vance"
                      className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-12 py-3.5 text-xs text-white rounded-xl outline-none tracking-wider transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-[10px] text-red-400 tracking-wider flex items-center gap-1">
                      <ShieldAlert size={10} />
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                {/* Email & Phone grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 text-left">
                    <label htmlFor="email" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Email Address</label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-4 text-text-secondary" size={14} />
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="vance@aurevia.com"
                        className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-12 py-3.5 text-xs text-white rounded-xl outline-none tracking-wider transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                      />
                    </div>
                    {errors.email && (
                      <span className="text-[10px] text-red-400 tracking-wider flex items-center gap-1">
                        <ShieldAlert size={10} />
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-left">
                    <label htmlFor="phone" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Phone Number</label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-4 text-text-secondary" size={14} />
                      <input
                        id="phone"
                        type="text"
                        {...register('phone')}
                        placeholder="+41 22 550 1234"
                        className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-12 py-3.5 text-xs text-white rounded-xl outline-none tracking-wider transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-[10px] text-red-400 tracking-wider flex items-center gap-1">
                        <ShieldAlert size={10} />
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Password Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 text-left">
                    <label htmlFor="password" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Password</label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 text-text-secondary" size={14} />
                      <input
                        id="password"
                        type="password"
                        {...register('password')}
                        placeholder="••••••••"
                        className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-12 py-3.5 text-xs text-white rounded-xl outline-none tracking-wider transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                      />
                    </div>
                    {/* Password Strength Meter */}
                    {password && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between items-center text-[9px] tracking-widest text-text-secondary uppercase">
                          <span>Password Integrity</span>
                          <span className="font-semibold text-white">{passwordStrength.label}</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${passwordStrength.color} transition-all duration-500`} style={{ width: passwordStrength.width }} />
                        </div>
                      </div>
                    )}
                    {errors.password && (
                      <span className="text-[10px] text-red-400 tracking-wider flex items-center gap-1">
                        <ShieldAlert size={10} />
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-left">
                    <label htmlFor="confirmPassword" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Confirm Password</label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 text-text-secondary" size={14} />
                      <input
                        id="confirmPassword"
                        type="password"
                        {...register('confirmPassword')}
                        placeholder="••••••••"
                        className="w-full bg-[#0a0a0c]/60 border border-white/10 focus:border-gold px-12 py-3.5 text-xs text-white rounded-xl outline-none tracking-wider transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-gold"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-[10px] text-red-400 tracking-wider flex items-center gap-1">
                        <ShieldAlert size={10} />
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="magnet-target w-full mt-4 bg-gold hover:bg-gold-hover disabled:bg-gold/50 disabled:cursor-not-allowed text-[#0a0a0c] text-xs font-semibold py-4 rounded-xl tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gold/15 focus-visible:ring-1 focus-visible:ring-gold"
                >
                  {isSubmitting ? 'Processing Registration...' : 'Register Secure Account'}
                  <ArrowRight size={14} />
                </button>

                {/* Google Sign-in */}
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="flex-shrink mx-4 text-[9px] tracking-[0.2em] text-text-secondary uppercase">Or Connections</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>

                <button
                  type="button"
                  className="magnet-target w-full bg-white/3 hover:bg-white/5 border border-white/5 text-white text-xs py-3.5 rounded-xl tracking-wider transition-all duration-300 flex items-center justify-center gap-2 focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
                  Sign up with Google
                </button>

                <div className="pt-2 flex flex-col items-center space-y-4 text-center">
                  <div className="flex items-center gap-1.5 text-[9px] tracking-[0.15em] text-text-secondary uppercase">
                    <Shield size={11} className="text-gold" />
                    Secure encrypted booking setup.
                  </div>
                  
                  <p className="text-[10px] tracking-wider text-text-secondary font-sans">
                    Already a registered member?{' '}
                    <Link to="/login" className="text-gold hover:text-white transition-colors duration-300 uppercase tracking-[0.15em] ml-1">
                      Login
                    </Link>
                  </p>
                </div>
              </m.form>
            )}

            {step === 'otp' && (
              <m.form
                key="otp"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleVerifyOtp}
                className="space-y-6 text-center py-6"
              >
                <div className="space-y-2">
                  <h3 className="font-display text-lg text-white font-medium tracking-wide">
                    Verify Your Credentials
                  </h3>
                  <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed tracking-wider font-light font-sans text-center">
                    We have dispatched a 6-digit confirmation code to your email. Enter the credentials below to authorize activation.
                  </p>
                </div>

                {/* OTP input boxes */}
                <div className="flex justify-center gap-2 md:gap-3 py-4">
                  {otpVal.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                      className="w-10 h-12 md:w-12 md:h-14 bg-[#0a0a0c]/60 border border-white/10 focus:border-gold rounded-xl text-center text-lg font-bold text-white outline-none tracking-normal transition-colors"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="magnet-target w-full bg-gold hover:bg-gold-hover text-[#0a0a0c] text-xs font-semibold py-4 rounded-xl tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gold/15 focus-visible:ring-1 focus-visible:ring-gold"
                >
                  Verify Verification Code
                  <ArrowRight size={14} />
                </button>

                <p className="text-[10px] tracking-widest text-text-secondary font-sans">
                  Didn't receive code?{' '}
                  <button type="button" className="text-gold hover:text-white uppercase tracking-widest transition-colors duration-300 ml-1">
                    Resend Code
                  </button>
                </p>
              </m.form>
            )}

            {step === 'success' && (
              <m.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4 flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold animate-bounce">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-display text-sm font-semibold text-white tracking-widest uppercase">
                  Account Verified
                </h3>
                <p className="text-[10px] text-text-secondary tracking-widest font-sans animate-pulse">
                  Setting up secure encryption profiles. Redirecting to login...
                </p>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </div>
  )
}
