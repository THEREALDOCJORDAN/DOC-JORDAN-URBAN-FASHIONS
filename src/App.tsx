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
    <div className="min-h-screen bg-[#060606] text-white font-sans overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      {/* Dynamic Background Overlay */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeBrand}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ background: BRANDS[activeBrand].bg }}
        />
      </AnimatePresence>
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#4A0E4E] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-all">
            <Shirt size={26} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase leading-none">Doc Jordan</span>
            <span className="text-[8px] font-black uppercase tracking-[0.6em] text-[#D4AF37]">Vibration Matrix</span>
          </div>
        </motion.div>

        <div className="hidden lg:flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.4em]">
          {BRANDS.map((brand, idx) => (
            <button 
              key={brand.id} 
              onClick={() => setActiveBrand(idx)}
              className={cn(
                "hover:text-[#D4AF37] transition-all relative py-2",
                activeBrand === idx ? "text-[#D4AF37]" : "text-neutral-500"
              )}
            >
              {brand.name}
              {activeBrand === idx && (
                <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D4AF37] rounded-full" />
              )}
            </button>
          ))}
        </div>

        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#D4AF37] text-black px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#FFD700] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
        >
          The Lab_
        </motion.button>
      </nav>

      {/* Hero Showcase */}
      <main className="relative z-10 min-h-screen flex items-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
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
                  <span className="text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">{BRANDS[activeBrand].symbol}</span>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                  <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">
                    {BRANDS[activeBrand].tagline}
                  </h2>
                </div>
                <h1 className="text-7xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                  {BRANDS[activeBrand].name}
                </h1>
                <p className="text-lg text-neutral-400 font-medium max-w-md leading-relaxed">
                  {BRANDS[activeBrand].description}
                </p>
                
                <div className="flex flex-wrap gap-3 pt-4">
                  {BRANDS[activeBrand].vibes.map((vibe) => (
                    <span key={vibe} className="px-4 py-2 bg-white/5 border border-[#D4AF37]/20 rounded-full text-[8px] font-black uppercase tracking-widest text-[#D4AF37]/80">
                      {vibe}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-10">
                  <button className="bg-[#D4AF37] text-black px-10 py-5 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl">
                    Experience Drop <ArrowRight size={18} />
                  </button>
                  <button className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all text-center">
                    Visual DNA
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.4, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-0 rounded-[80px] overflow-hidden blur-[1px] border border-white/5"
              >
                <img src={BRANDS[activeBrand].image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
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
                className="relative z-10 w-full max-w-[500px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
              >
                <img 
                  src={BRANDS[activeBrand].mockup} 
                  alt={BRANDS[activeBrand].name} 
                  className="w-full h-auto rounded-[50px] border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.1)]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-20">
              {BRANDS.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveBrand(i)}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all",
                    activeBrand === i ? "bg-[#D4AF37] w-6" : "bg-white/20"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Brand Grid Selector */}
      <section className="py-20 px-6 border-t border-white/5 relative z-10 bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {BRANDS.map((brand, idx) => (
            <motion.div 
              key={brand.id}
              whileHover={{ y: -5 }}
              onClick={() => setActiveBrand(idx)}
              className={cn(
                "cursor-pointer group relative aspect-[4/5] rounded-[40px] overflow-hidden border transition-all duration-500",
                activeBrand === idx ? "border-[#D4AF37]/50 ring-1 ring-[#D4AF37]/20 shadow-[0_0_40px_rgba(212,175,55,0.1)]" : "border-white/5 opacity-40 hover:opacity-100"
              )}
            >
              <img src={brand.mockup} alt="" className="w-full h-full object-cover transition-all group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8">
                <p className="text-[7px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-1">{brand.tagline}</p>
                <h4 className="text-xl font-black uppercase tracking-tighter">{brand.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section (Brightened Video) */}
      <section className="relative py-72 px-6 overflow-hidden">
        {/* Video Layer */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
          >
            <source src={PhilosophyVideo} type="video/mp4" />
          </video>
          {/* Brand Tint Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#4A0E4E]/40 to-[#060606]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#060606_100%)] opacity-80" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[#D4AF37]" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-[#D4AF37]">The Frequency Hardware</h3>
              </div>
              <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] text-white">
                Wearing <br /> Your <br /> <span className="text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">Mindset</span>
              </h2>
              <p className="text-xl md:text-3xl font-medium leading-relaxed max-w-2xl text-neutral-300">
                A digital-first fashion house where each piece is a frequency recalibration. Designed to resonate with your unique visual and spiritual DNA.
              </p>
              <button className="flex items-center gap-4 font-black uppercase text-[10px] tracking-[0.4em] hover:gap-8 transition-all bg-[#D4AF37] text-black px-14 py-6 rounded-full mt-12 shadow-[0_20px_50px_rgba(212,175,55,0.3)]">
                The Pillars <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ticker (Redesigned - No White) */}
      <div className="bg-[#4A0E4E] py-8 overflow-hidden whitespace-nowrap border-y border-[#D4AF37]/20 relative z-10">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-20 items-center"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-[#D4AF37] text-3xl font-black uppercase tracking-tighter flex items-center gap-6">
              {BRANDS[activeBrand].name} <Sparkles size={28} className="text-white" /> High Frequency Hardware <Sparkles size={28} className="text-white" /> Precision Synthesis <Sparkles size={28} className="text-white" />
            </span>
          ))}
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white/5 border border-white/10 text-white rounded-full flex items-center justify-center">
              <Shirt size={20} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase">Doc Jordan Urban Fashions</span>
          </div>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-neutral-500">
             <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
             <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
             <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
          </div>
          <div className="flex gap-6">
             <Instagram size={20} className="text-neutral-500 hover:text-[#D4AF37] transition-colors" />
             <Twitter size={20} className="text-neutral-500 hover:text-[#D4AF37] transition-colors" />
          </div>
        </div>
        <div className="text-center mt-20 text-[8px] font-black uppercase tracking-[0.5em] text-neutral-700">
          © 2026 Doc Jordan Matrix. All Frequencies Secured.
        </div>
      </footer>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
