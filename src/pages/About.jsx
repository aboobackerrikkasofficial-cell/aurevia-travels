import { m } from 'framer-motion'
import { Shield, Sparkles, Award, Globe2 } from 'lucide-react'

// Components
import SEO from '../components/SEO'
import LuxuryImage from '../components/LuxuryImage'

const milestones = [
  {
    year: '2011',
    title: 'Brand Foundation',
    desc: 'Aurevia was founded in Geneva with a single focus: creating high-fidelity, high-discretion itineraries for VIP corporate entities.'
  },
  {
    year: '2015',
    title: 'Yacht Network Launch',
    desc: 'Chartered our first dedicated superyacht flotilla in Monaco and established direct pipelines with luxury Mediterranean shipbuilders.'
  },
  {
    year: '2019',
    title: 'Aviation Integration',
    desc: 'Partnered with elite private aviation carriers to offer seamless airport-to-resort helicopter and private jet charters globally.'
  },
  {
    year: '2023',
    title: 'Island buyouts Portfolio',
    desc: 'Secured exclusive booking authority over six elite private islands in the Maldives, Caribbean, and South Pacific.'
  }
]

const values = [
  {
    icon: Shield,
    title: 'Absolute Discretion',
    desc: 'We operate under strict NDA standards, securing guest identities and personal travel data at bank-grade encryption levels.'
  },
  {
    icon: Sparkles,
    title: 'Bespoke Craftsmanship',
    desc: 'No templates. Every journey, landing strip, luxury transfer, and dining setup is built from scratch for your preferences.'
  },
  {
    icon: Award,
    title: 'Elite Quality Standards',
    desc: 'Every villa, jet, yacht, and service provider in our portfolio is manually audited quarterly for absolute quality assurance.'
  },
  {
    icon: Globe2,
    title: 'Global Infrastructure',
    desc: 'Local concierges stationed globally in 12 major hubs, securing instant updates and emergency overrides 24/7.'
  }
]

export default function About() {
  // About schema (AboutPage type)
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Aurevia Travels",
    "description": "Learn about the legacy, core values, history, and milestones of Aurevia Travels luxury agency.",
    "publisher": {
      "@type": "Organization",
      "name": "Aurevia Travels"
    }
  }

  return (
    <div className="relative w-full pt-32 pb-24 bg-[#0a0a0c]">
      <SEO
        title="Our Story"
        description="Learn about the legacy of Aurevia Travels. Founded in Geneva, we specialize in high-discretion private jet charters, superyacht flotillas, and custom island getaways."
        schema={aboutSchema}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-28">
        
        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase block">OUR LEGACY</span>
            <h1 className="font-display text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              Crafting The World's <br />
              Most Exclusive Escapes
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed tracking-wider font-light font-sans">
              Founded on the pillars of discretion, precision, and luxury, Aurevia Travels has spent fifteen years setting the standard for private travel. We serve a small roster of global leaders, creators, and entrepreneurs who demand absolute quality.
            </p>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed tracking-wider font-light font-sans">
              From Monaco harbor buyouts to private sky villas in the Swiss peaks, we take care of all logistics, transfers, customs, and bespoke requests so you can experience travel in its most refined form.
            </p>
          </div>
          
          <div className="lg:col-span-6 rounded-3xl overflow-hidden h-[450px] relative border border-white/5 shadow-2xl">
            <LuxuryImage
              src="/images/switzerland.png"
              alt="Swiss Chalet"
              className="brightness-[0.7]"
              aspectRatio="none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent pointer-events-none" />
          </div>
        </section>

        {/* Mission & Vision cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-effect p-10 md:p-12 border border-white/5 rounded-3xl space-y-4 text-left">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium">OUR MISSION</span>
            <h3 className="font-display text-2xl font-light text-white tracking-wide">
              Bespoke travel, executed flawlessly.
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed tracking-wider font-light font-sans">
              To remove every friction point from international luxury transit, ensuring our travelers enjoy seamless security, premium accommodation, and unique local accesses tailored to their exact specifications.
            </p>
          </div>

          <div className="glass-effect p-10 md:p-12 border border-white/5 rounded-3xl space-y-4 text-left">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium">OUR VISION</span>
            <h3 className="font-display text-2xl font-light text-white tracking-wide">
              Defining the future of luxury hospitality.
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed tracking-wider font-light font-sans">
              To expand our private aviation and island network, establishing zero-emission travel paths that preserve the natural purity of our destination portals while maintaining the highest standard of luxury comfort.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase block">OUR PRINCIPLES</span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-white tracking-tight">
              The Code We Live By
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon
              return (
                <div key={idx} className="glass-effect p-8 border border-white/5 rounded-2xl space-y-4 hover:border-gold/20 transition-all duration-300 text-left">
                  <div className="p-3 bg-white/5 text-gold w-fit rounded-xl">
                    <Icon size={16} />
                  </div>
                  <h4 className="text-sm font-semibold tracking-widest text-white uppercase">
                    {val.title}
                  </h4>
                  <p className="text-xs text-text-secondary tracking-wider leading-relaxed font-light font-sans">
                    {val.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Timeline */}
        <section className="space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase block">OUR PROGRESSION</span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-white tracking-tight">
              Thirteen Years of Milestones
            </h2>
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-12 pl-8 md:pl-16 space-y-16">
            {milestones.map((milestone, idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative"
              >
                {/* Year dot */}
                <div className="absolute -left-[53px] md:-left-[85px] top-1.5 w-[33px] h-[33px] rounded-full bg-[#0a0a0c] border-2 border-gold flex items-center justify-center text-[10px] text-gold font-bold">
                  {milestone.year}
                </div>

                <div className="space-y-2 max-w-2xl text-left">
                  <h4 className="text-sm font-semibold tracking-widest text-white uppercase">
                    {milestone.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed tracking-wider font-light font-sans">
                    {milestone.desc}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
