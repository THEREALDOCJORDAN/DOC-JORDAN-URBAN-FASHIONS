import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Shirt, 
  Sparkles, 
  ArrowRight,
  Instagram,
  Twitter
} from 'lucide-react';
import { products as staticProducts } from './data/products';

// Asset Imports
import HeroImg from './assets/hero.png';
import Collection1 from './assets/collection1.png';
import Collection2 from './assets/collection2.png';

export default function App() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center bg-gradient-to-b from-[#0A0A0A]/80 to-transparent backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-[#FF3D00] rounded-full flex items-center justify-center">
            <Shirt size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase">Doc Jordan</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-12 text-sm font-bold uppercase tracking-widest text-neutral-400">
          {['Collection', 'Vibration', 'About'].map((item) => (
            <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
          ))}
        </div>

        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#FF3D00] hover:text-white transition-all"
        >
          Coming Soon
        </motion.button>
      </nav>

      {/* Hero Section */}
      <header ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
          <img 
            src={HeroImg} 
            alt="Doc Jordan Urban Fashion" 
            className="w-full h-full object-cover grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-8"
          >
            Urban <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3D00] to-orange-400">Vibration</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            High-frequency streetwear for the modern nomad. <br />
            Precision-crafted aesthetics meet industrial soul.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <button 
              className="bg-[#FF3D00] text-white px-12 py-5 rounded-full font-black uppercase text-sm tracking-[0.2em] flex items-center gap-3 hover:scale-105 transition-all"
            >
              Shop Collection <ArrowRight size={20} />
            </button>
            <button className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-12 py-5 rounded-full font-black uppercase text-sm tracking-[0.2em] hover:bg-white/20 transition-all">
              View Lookbook
            </button>
          </motion.div>
        </div>
      </header>

      {/* Ticker */}
      <div className="bg-[#FF3D00] py-4 overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-20 items-center"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              Doc Jordan Urban Fashions <Sparkles size={24} /> Precision Design <Sparkles size={24} /> High Frequency
            </span>
          ))}
        </motion.div>
      </div>

      {/* Collection Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-[#FF3D00] text-sm font-black uppercase tracking-[0.3em] mb-4">Current Drop</h2>
              <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                Metropolis <br /> <span className="text-neutral-500">Artifacts</span>
              </h3>
            </div>
            <p className="max-w-md text-neutral-400 text-lg font-medium">
              Our latest collection explores the intersection of brutalist architecture and fluid human movement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div whileHover={{ scale: 0.98 }} className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900">
              <img src={Collection1} alt="" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <span className="text-xs font-black uppercase tracking-widest text-[#FF3D00] mb-2 block">Texture</span>
                <h4 className="text-3xl font-black uppercase tracking-tighter">Brutalist Weave</h4>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 0.98 }} className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 md:mt-20">
              <img src={Collection2} alt="" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <span className="text-xs font-black uppercase tracking-widest text-[#FF3D00] mb-2 block">Movement</span>
                <h4 className="text-3xl font-black uppercase tracking-tighter">Neon Nomad</h4>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:mt-40">
               {staticProducts.slice(0, 2).map((product) => (
                 <div key={product.id} className="bg-neutral-900 p-6 rounded-3xl border border-white/5 flex gap-6 items-center">
                    <img src={product.thumbnail} className="w-24 h-24 rounded-xl object-cover" alt="" />
                    <div>
                      <h4 className="font-black uppercase tracking-tighter">{product.name}</h4>
                      <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">${product.base_price}</p>
                    </div>
                 </div>
               ))}
               <div className="bg-[#FF3D00] p-8 rounded-3xl text-center">
                  <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">Join the Club</h4>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-4">Get early access to drops</p>
                  <button className="bg-white text-black px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest">Sign Up</button>
               </div>
            </div>
          </div>
        </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-8">
             <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF3D00] rounded-full flex items-center justify-center">
                <Shirt size={18} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">Doc Jordan</span>
            </div>
            <p className="text-neutral-400 max-w-sm font-medium leading-relaxed">
              Doc Jordan Urban Clothing is a digital-first high-fashion house based in the future.
            </p>
            <div className="flex gap-6">
              <Instagram size={24} className="text-neutral-500 hover:text-[#FF3D00] transition-colors cursor-pointer" />
              <Twitter size={24} className="text-neutral-500 hover:text-[#FF3D00] transition-colors cursor-pointer" />
            </div>
          </div>
          
          <div className="space-y-6">
            <h5 className="font-black uppercase tracking-[0.2em] text-sm">Navigation</h5>
            <ul className="space-y-4 text-neutral-400 font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">Collection</li>
              <li className="hover:text-white cursor-pointer transition-colors">About</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="font-black uppercase tracking-[0.2em] text-sm">Updates</h5>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="EMAIL" 
                className="bg-neutral-900 border-none rounded-full px-6 py-3 text-xs font-black uppercase tracking-widest flex-1 focus:ring-1 focus:ring-[#FF3D00]"
              />
              <button className="bg-white text-black p-3 rounded-full hover:bg-[#FF3D00] hover:text-white transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
          <span>© 2026 Doc Jordan Urban Clothing.</span>
        </div>
      </footer>
    </div>
  );
}
