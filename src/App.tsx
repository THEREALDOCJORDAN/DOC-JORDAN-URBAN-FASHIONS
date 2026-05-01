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
  Heart
} from 'lucide-react';
import { products as staticProducts } from './data/products';

// Brand Assets
import DNTImg from './assets/dnt.png';
import SkidRowJoeImg from './assets/skidrowjoe.png';
import DivaImg from './assets/diva.png';
import AlkamiImg from './assets/alkami.png';
import HeroImg from './assets/hero.png';

const BRANDS = [
  {
    id: 'dnt',
    name: 'DNT',
    tagline: 'Mindful Streetwear',
    color: '#FFD700', // Gold
    bg: 'radial-gradient(circle at center, #4B0082, #000000)', // Indigo/Black
    symbol: '🕉️',
    icon: Zap,
    image: DNTImg,
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
    image: SkidRowJoeImg,
    description: 'The unapologetic translator of street grit into regal armor.',
    vibes: ['Concrete Kings', 'Noble Grit', 'Authentic Power']
  },
  {
    id: 'diva',
    name: 'Diva',
    tagline: 'Empowered Elegance',
    color: '#D4AF37', // Gold
    bg: 'linear-gradient(to bottom, #4A0E4E, #000000)', // Deep Purple
    symbol: '🌺',
    icon: Heart,
    image: DivaImg,
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
    image: AlkamiImg,
    description: 'Future-forward aesthetics for the visionary mind.',
    vibes: ['Digital Soul', 'Infinite Horizon', 'Visionary Tech']
  }
];

export default function App() {
  const [activeBrand, setActiveBrand] = useState(0);
  const scrollRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden selection:bg-[#FF3D00] selection:text-white">
      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeBrand}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ background: BRANDS[activeBrand].bg }}
        />
      </AnimatePresence>
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-10 flex justify-between items-center bg-gradient-to-b from-[#0A0A0A]/80 to-transparent backdrop-blur-md border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center group cursor-pointer hover:bg-brand-primary transition-all">
            <Shirt size={28} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter uppercase leading-none">Doc Jordan</span>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-500">Urban Fashions</span>
          </div>
        </motion.div>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
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
              {activeBrand === idx && (
                <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
              )}
            </button>
          ))}
        </div>

        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
        >
          The Lab_
        </motion.button>
      </nav>

      {/* Main Brand Showcase */}
      <main className="relative z-10 pt-40 lg:pt-0 min-h-screen flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Content */}
          <div className="space-y-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{BRANDS[activeBrand].symbol}</span>
                  <h2 className="text-sm font-black uppercase tracking-[0.5em] text-neutral-500" style={{ color: BRANDS[activeBrand].color }}>
                    {BRANDS[activeBrand].tagline}
                  </h2>
                </div>
                <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8]">
                  {BRANDS[activeBrand].name.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h1>
                <p className="text-xl md:text-2xl text-neutral-400 font-medium max-w-xl leading-relaxed">
                  {BRANDS[activeBrand].description}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  {BRANDS[activeBrand].vibes.map((vibe) => (
                    <span key={vibe} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {vibe}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-6 pt-10">
                  <button className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] flex items-center gap-3 hover:scale-105 transition-all shadow-2xl">
                    Experience Drop <ArrowRight size={20} />
                  </button>
                  <button className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-12 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-white/10 transition-all">
                    View Symbolism
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visuals */}
          <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeBrand}
                src={BRANDS[activeBrand].image} 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1 }}
                alt="" 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
            
            {/* Navigation Arrows */}
            <div className="absolute bottom-10 right-10 flex gap-4">
              <button 
                onClick={() => setActiveBrand((prev) => (prev - 1 + BRANDS.length) % BRANDS.length)}
                className="p-4 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => setActiveBrand((prev) => (prev + 1) % BRANDS.length)}
                className="p-4 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Vibration Ticker */}
      <div className="fixed bottom-0 w-full z-40 bg-white py-4 overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex gap-20 items-center"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-black text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
              {BRANDS[activeBrand].name} <Sparkles size={24} className="text-[#FF3D00]" /> {BRANDS[activeBrand].tagline} <Sparkles size={24} className="text-[#FF3D00]" /> High Vibration Synthesis
            </span>
          ))}
        </motion.div>
      </div>

      {/* Symbolism Gallery */}
      <section className="py-40 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.8em] text-neutral-500">Symbolic Alignment</h2>
            <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">The Visual DNA</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BRANDS.map((brand) => (
              <motion.div 
                key={brand.id}
                whileHover={{ y: -10 }}
                className="bg-neutral-900/50 p-10 rounded-[40px] border border-white/5 space-y-8 flex flex-col items-center text-center group"
              >
                <div className="text-7xl group-hover:scale-125 transition-transform duration-500">{brand.symbol}</div>
                <div className="space-y-4">
                  <h4 className="text-3xl font-black uppercase tracking-tighter">{brand.name}</h4>
                  <p className="text-neutral-500 text-sm font-medium leading-relaxed">
                    Embodying the {brand.tagline.toLowerCase()} frequency through precision craftsmanship.
                  </p>
                </div>
                <brand.icon className="text-white/20 group-hover:text-white transition-colors" size={40} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-40 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="space-y-8">
             <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center">
                <Shirt size={18} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">Doc Jordan</span>
            </div>
            <p className="text-neutral-500 max-w-xs font-medium leading-relaxed">
              Four distinct frequencies. Zero market overlap. One visionary creator.
            </p>
            <div className="flex gap-6">
              <Instagram size={24} className="text-neutral-500 hover:text-white transition-colors cursor-pointer" />
              <Twitter size={24} className="text-neutral-500 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
          
          <div className="space-y-8">
            <h5 className="font-black uppercase tracking-[0.2em] text-sm">Frequency Matrix</h5>
            <div className="grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-widest text-neutral-500">
              {BRANDS.map(b => (
                <span key={b.id} className="hover:text-white cursor-pointer transition-colors">{b.name}</span>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h5 className="font-black uppercase tracking-[0.2em] text-sm">Join the frequency</h5>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="EMAIL" 
                className="bg-neutral-900 border-none rounded-full px-6 py-4 text-[10px] font-black uppercase tracking-widest flex-1 focus:ring-1 focus:ring-white"
              />
              <button className="bg-white text-black p-4 rounded-full hover:bg-brand-primary transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
