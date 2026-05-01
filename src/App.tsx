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
  ExternalLink
} from 'lucide-react';
import { products as staticProducts } from './data/products';

// Lifestyle Assets
import DNTLifestyle from './assets/dnt.png';
import SkidRowJoeLifestyle from './assets/skidrowjoe.png';
import DivaLifestyle from './assets/diva.png';
import AlkamiLifestyle from './assets/alkami.png';

// Product Mockup Assets (Based on Actual Designs)
import DNTMockup from './assets/dnt_mockup.png';
import SkidRowJoeMockup from './assets/skidrowjoe_mockup.png';
import DivaMockup from './assets/diva_mockup.png';
import AlkamiMockup from './assets/alkami_mockup.png';

const BRANDS = [
  {
    id: 'dnt',
    name: 'DNT',
    tagline: 'Mindful Streetwear',
    color: '#FFD700', // Gold
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
    color: '#C0C0C0', // Silver
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
    color: '#D4AF37', // Gold
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
    color: '#00BFFF', // Deep Sky Blue
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
                <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 4 }}
                   className="absolute -top-10 -right-10 bg-white text-black p-6 rounded-full shadow-2xl font-black text-xl uppercase tracking-tighter hidden md:block"
                >
                   {BRANDS[activeBrand].symbol}
                </motion.div>
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

      {/* Frequency Details Grid */}
      <section className="py-40 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BRANDS.map((brand, idx) => (
              <motion.div 
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveBrand(idx)}
                className={cn(
                   "group cursor-pointer bg-neutral-900/40 p-8 rounded-[40px] border border-white/5 space-y-6 transition-all",
                   activeBrand === idx ? "border-white/20 ring-1 ring-white/10 shadow-2xl" : "hover:border-white/10"
                )}
              >
                <div className="aspect-square rounded-3xl overflow-hidden bg-black mb-4">
                  <img src={brand.mockup} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-2xl font-black uppercase tracking-tighter">{brand.name}</h4>
                    <brand.icon size={20} className="text-neutral-500 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{brand.tagline}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Symbolic Vibration Block */}
          <div className="bg-white text-black p-20 rounded-[80px] overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
              <Sparkles size={300} />
            </div>
            <div className="relative z-10 max-w-3xl space-y-8">
              <h3 className="text-sm font-black uppercase tracking-[0.5em] text-[#FF3D00]">The Philosophy</h3>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                High Frequency <br /> <span className="italic">Hardware</span>
              </h2>
              <p className="text-xl font-medium leading-relaxed">
                Doc Jordan Urban Clothing isn’t just fashion—it’s a frequency recalibration. Each piece in our four collections is designed to resonate with a specific visual and spiritual DNA.
              </p>
              <button className="flex items-center gap-3 font-black uppercase text-xs tracking-[0.3em] hover:gap-6 transition-all border-b-2 border-black pb-2">
                Learn the Symbolism <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Ticker */}
      <div className="bg-white py-6 overflow-hidden whitespace-nowrap border-t border-black/5">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-20 items-center"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-black text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              {BRANDS[activeBrand].name} <Zap size={24} className="text-[#FF3D00]" /> Urban Royalty <Zap size={24} className="text-[#FF3D00]" /> High Vibration <Zap size={24} className="text-[#FF3D00]" /> Doc Jordan
            </span>
          ))}
        </motion.div>
      </div>
      
      <footer className="py-20 px-6 text-center text-[10px] font-black uppercase tracking-[0.5em] text-neutral-500">
        © 2026 Doc Jordan Urban Clothing Matrix
      </footer>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
