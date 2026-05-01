import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Shirt, 
  Sparkles, 
  ArrowRight,
  Instagram,
  Twitter,
  ChevronRight,
  ChevronLeft,
  Zap,
  Eye,
  Crown,
  Heart,
  ExternalLink,
  PlayCircle
} from 'lucide-react';
import { products as staticProducts } from './data/products';

// Lifestyle Assets
import DNTLifestyle from './assets/dnt.png';
import SkidRowJoeLifestyle from './assets/skidrowjoe.png';
import DivaLifestyle from './assets/diva.png';
import AlkamiLifestyle from './assets/alkami.png';

// Product Mockup Assets
import DNTMockup from './assets/dnt_mockup.png';
import SkidRowJoeMockup from './assets/skidrowjoe_mockup.png';
import DivaMockup from './assets/diva_mockup.png';
import AlkamiMockup from './assets/alkami_mockup.png';

// Video Asset
import PhilosophyVideo from './assets/philosophy.mp4';

const BRANDS = [
  {
    id: 'dnt',
    name: 'DNT',
    tagline: 'Mindful Streetwear',
    color: '#FFD700',
    bg: 'radial-gradient(circle at center, #4B0082, #000000)',
    symbol: '🕉️',
    icon: Zap,
    image: DNTLifestyle,
    mockup: DNTMockup,
    description: 'High-frequency spiritual hardware. Sacred geometry meets the street.',
    vibes: ['Spiritual DNA', 'Cosmic Alignment', 'Inner Peace']
  },
  {
    id: 'skid-row-joe',
    name: 'Skid Row Joe',
    tagline: 'Urban Royalty',
    color: '#C0C0C0',
    bg: 'linear-gradient(135deg, #2D2D2D, #000000)',
    symbol: '👑',
    icon: Crown,
    image: SkidRowJoeLifestyle,
    mockup: SkidRowJoeMockup,
    description: 'The unapologetic translator of street grit into regal armor.',
    vibes: ['Concrete Kings', 'Noble Grit', 'Authentic Power']
  },
  {
    id: 'diva',
    name: 'Diva',
    tagline: 'Empowered Elegance',
    color: '#D4AF37',
    bg: 'linear-gradient(to bottom, #4A0E4E, #000000)',
    symbol: '🌺',
    icon: Heart,
    image: DivaLifestyle,
    mockup: DivaMockup,
    description: 'Sophisticated silhouettes infused with raw feminine strength.',
    vibes: ['Luxury Flow', 'Royal Grace', 'Golden Frequency']
  },
  {
    id: 'alkami',
    name: 'Alkami',
    tagline: 'Elevated Vision',
    color: '#00BFFF',
    bg: 'radial-gradient(circle at top right, #001F3F, #000000)',
    symbol: '👁️',
    icon: Eye,
    image: AlkamiLifestyle,
    mockup: AlkamiMockup,
    description: 'Future-forward aesthetics for the visionary mind.',
    vibes: ['Digital Soul', 'Infinite Horizon', 'Visionary Tech']
  }
];

export default function App() {
  const [activeBrand, setActiveBrand] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden selection:bg-white selection:text-black">
      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeBrand}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ background: BRANDS[activeBrand].bg }}
        />
      </AnimatePresence>
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center bg-gradient-to-b from-[#0A0A0A]/80 to-transparent backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">
            <Shirt size={24} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">Doc Jordan</span>
        </motion.div>

        <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">
          {BRANDS.map((brand, idx) => (
            <button 
              key={brand.id} 
              onClick={() => setActiveBrand(idx)}
              className={cn(
                "hover:text-white transition-all relative py-2",
                activeBrand === idx ? "text-white" : "text-neutral-500"
              )}
            >
              {brand.name}
            </button>
          ))}
        </div>

        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white text-black px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-neutral-200 transition-all shadow-xl"
        >
          Access Lab
        </motion.button>
      </nav>

      {/* Hero Showcase */}
      <main className="relative z-10 min-h-screen flex items-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-10 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{BRANDS[activeBrand].symbol}</span>
                  <div className="h-[1px] w-12 bg-white/20" />
                  <h2 className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color: BRANDS[activeBrand].color }}>
                    {BRANDS[activeBrand].tagline}
                  </h2>
                </div>
                <h1 className="text-7xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8]">
                  {BRANDS[activeBrand].name}
                </h1>
                <p className="text-lg text-neutral-400 font-medium max-w-md leading-relaxed">
                  {BRANDS[activeBrand].description}
                </p>
                
                <div className="flex flex-wrap gap-3 pt-4">
                  {BRANDS[activeBrand].vibes.map((vibe) => (
                    <span key={vibe} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-neutral-300">
                      {vibe}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-10">
                  <button className="bg-white text-black px-10 py-5 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl">
                    Add to collection <ArrowRight size={18} />
                  </button>
                  <button className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all text-center">
                    Full Showcase
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Product & Lifestyle Stack */}
          <div className="lg:col-span-7 relative order-1 lg:order-2 h-[600px] md:h-[700px] flex items-center justify-center">
            {/* Lifestyle Image (Background) */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeBrand + 'life'}
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-0 rounded-[60px] overflow-hidden blur-[2px]"
              >
                <img src={BRANDS[activeBrand].image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
              </motion.div>
            </AnimatePresence>

            {/* Actual Product Mockup (Foreground) */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeBrand + 'mock'}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="relative z-10 w-full max-w-[500px] drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
              >
                <img 
                  src={BRANDS[activeBrand].mockup} 
                  alt={BRANDS[activeBrand].name} 
                  className="w-full h-auto rounded-[40px] transform transition-transform group-hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Overlays */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-20">
              {BRANDS.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveBrand(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeBrand === i ? "bg-white w-8" : "bg-white/20"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Brand Grid Section */}
      <section className="py-20 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {BRANDS.map((brand, idx) => (
            <motion.div 
              key={brand.id}
              whileHover={{ y: -5 }}
              onClick={() => setActiveBrand(idx)}
              className={cn(
                "cursor-pointer group relative aspect-[4/5] rounded-3xl overflow-hidden border transition-all",
                activeBrand === idx ? "border-white/40 ring-1 ring-white/20" : "border-white/5 opacity-40 hover:opacity-100"
              )}
            >
              <img src={brand.mockup} alt="" className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-neutral-400">{brand.tagline}</p>
                <h4 className="text-xl font-black uppercase tracking-tighter">{brand.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section (Video Background) */}
      <section className="relative py-60 px-6 overflow-hidden">
        {/* Video Layer */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-30 grayscale-[0.5]"
          >
            <source src={PhilosophyVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <PlayCircle className="text-brand-primary" size={24} />
                <h3 className="text-sm font-black uppercase tracking-[0.5em] text-[#FF3D00]">The Vision</h3>
              </div>
              <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mix-blend-difference">
                Wearing <br /> Your <br /> <span className="text-brand-silver">Mindset</span>
              </h2>
              <p className="text-xl md:text-3xl font-medium leading-relaxed max-w-2xl text-neutral-300">
                Doc Jordan Urban Clothing isn’t just fashion—it’s a frequency recalibration. Each piece in our four collections is designed to resonate with a specific visual and spiritual DNA.
              </p>
              <button className="flex items-center gap-4 font-black uppercase text-xs tracking-[0.3em] hover:gap-8 transition-all bg-white text-black px-12 py-6 rounded-full mt-10">
                The Pillars of Doc Jordan <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Ticker */}
      <div className="bg-white py-6 overflow-hidden whitespace-nowrap border-t border-black/5 relative z-10">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-20 items-center"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-black text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              {BRANDS[activeBrand].name} <Zap size={24} className="text-[#FF3D00]" /> High Frequency Hardware <Zap size={24} className="text-[#FF3D00]" /> Wearing Your Mindset
            </span>
          ))}
        </motion.div>
      </div>
      
      <footer className="py-20 px-6 text-center text-[10px] font-black uppercase tracking-[0.5em] text-neutral-500 relative z-10">
        © 2026 Doc Jordan Urban Clothing Matrix
      </footer>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
