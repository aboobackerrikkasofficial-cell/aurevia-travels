import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { m } from 'framer-motion'
import { Shield, Mail, Lock, ArrowRight, ShieldAlert } from 'lucide-react'

// Components
import SEO from '../components/SEO'
import { checkRateLimit, sanitizeInput } from '../utils/security'

// Zod Schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' })
})

export default function Login() {
  const navigate = useNavigate()
  const [authError, setAuthError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    setAuthError('')

    // 1. Rate Limiting check
    if (!checkRateLimit('login_attempts', 5, 60000)) {
      setAuthError('Too many attempts. Please pause 60s.')
      return
    }

    // 2. Input Sanitization
    const email = sanitizeInput(data.email)
    const password = sanitizeInput(data.password)

    // Simulating authentication pipeline
    await new Promise((resolve) => setTimeout(() => resolve({ email, password }), 1500))

    setIsSuccess(true)
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 bg-[#0a0a0c] overflow-hidden">
      <SEO
        title="Member Login"
        description="Securely log in to the Aurevia Travels portal to view your itineraries and update your traveler profile."
      />

      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md px-6 z-10">
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-effect rounded-3xl p-8 md:p-10 border border-white/5 shadow-2xl relative"
        >
          {/* Top Brand Logo */}
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
              Secure Member Entrance
            </h2>
          </div>

          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mx-auto text-gold animate-pulse">
                <Shield size={20} />
              </div>
              <h3 className="font-display text-sm font-semibold text-white tracking-widest uppercase">
                Access Authorized
              </h3>
              <p className="text-[10px] text-text-secondary tracking-widest font-sans animate-pulse">
                Redirecting to Aurevia Portal...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {authError && (
                <div className="bg-red-950/20 border border-red-500/10 p-3.5 rounded-xl text-[10px] tracking-widest text-red-400 font-sans text-left flex items-center gap-1.5">
                  <ShieldAlert size={12} />
                  {authError}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2 text-left">
                <label htmlFor="email" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-text-secondary" size={14} />
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="member@aurevia.com"
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

              {/* Password */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-[9px] tracking-[0.2em] text-text-secondary uppercase">Password</label>
                  <a href="#" className="text-[9px] tracking-[0.15em] uppercase text-gold hover:text-white transition-colors duration-300">
                    Forgot?
                  </a>
                </div>
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
                {errors.password && (
                  <span className="text-[10px] text-red-400 tracking-wider flex items-center gap-1">
                    <ShieldAlert size={10} />
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="magnet-target w-full mt-4 bg-gold hover:bg-gold-hover disabled:bg-gold/50 disabled:cursor-not-allowed text-[#0a0a0c] text-xs font-semibold py-4 rounded-xl tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gold/15 focus-visible:ring-1 focus-visible:ring-gold"
              >
                {isSubmitting ? 'Verifying Session...' : 'Authorize Login'}
                <ArrowRight size={14} />
              </button>

              {/* Social Login */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink mx-4 text-[9px] tracking-[0.2em] text-text-secondary uppercase">Or Credentials</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              <button
                type="button"
                className="magnet-target w-full bg-white/3 hover:bg-white/5 border border-white/5 text-white text-xs py-3.5 rounded-xl tracking-wider transition-all duration-300 flex items-center justify-center gap-2 focus-visible:ring-1 focus-visible:ring-gold"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
                Sign in with Google
              </button>

              {/* Encrypted Notice & Links */}
              <div className="pt-4 flex flex-col items-center space-y-4 text-center">
                <div className="flex items-center gap-1.5 text-[9px] tracking-[0.15em] text-text-secondary uppercase">
                  <Shield size={11} className="text-gold" />
                  Secure 256-Bit SSL Encrypted
                </div>
                
                <p className="text-[10px] tracking-wider text-text-secondary font-sans">
                  Not a registered member?{' '}
                  <Link to="/signup" className="text-gold hover:text-white transition-colors duration-300 uppercase tracking-[0.15em] ml-1">
                    Register Account
                  </Link>
                </p>
              </div>
            </form>
          )}
        </m.div>
      </div>
    </div>
  )
}
