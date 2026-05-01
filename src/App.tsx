import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Shirt, 
  Layers, 
  Palette, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Sparkles, 
  Download,
  Copy,
  Trash2,
  LayoutGrid,
  Menu,
  X,
  Instagram,
  Twitter,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { Product, Design, WorkflowStep, DesignElement } from './types';
import { DesignerCanvas } from './components/DesignerCanvas';
import { generateDesignSuggestions, generatePatternImage } from './services/gemini';
import { cn } from './lib/utils';
import { products as staticProducts } from './data/products';

// Asset Imports
import HeroImg from './assets/hero.png';
import Collection1 from './assets/collection1.png';
import Collection2 from './assets/collection2.png';

export default function App() {
  const [view, setView] = useState<'landing' | 'designer'>('landing');
  const [step, setStep] = useState<WorkflowStep>('select-product');
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [design, setDesign] = useState<Design>({
    id: crypto.randomUUID(),
    name: 'New Design',
    elements: [],
    backgroundColor: '#0A0A0A'
  });
  const [theme, setTheme] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [syncedProducts, setSyncedProducts] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Static data initialization - no fetch needed

  const handleGenerateDesign = async () => {
    if (!theme) return;
    setIsGenerating(true);
    try {
      const suggestions = await generateDesignSuggestions(theme);
      const patternUrl = await generatePatternImage(suggestions.promptForImageGen);
      
      if (patternUrl) {
        setDesign(prev => ({
          ...prev,
          backgroundColor: suggestions.colors[0] || '#0A0A0A',
          elements: [
            ...prev.elements,
            {
              id: crypto.randomUUID(),
              type: 'pattern',
              x: 0,
              y: 0,
              width: 400,
              height: 400,
              rotation: 0,
              content: patternUrl,
              opacity: 1
            }
          ]
        }));
      }
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-brand-black text-white font-sans overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center bg-gradient-to-b from-brand-black/80 to-transparent backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
              <Shirt size={24} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">Doc Jordan</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-12 text-sm font-bold uppercase tracking-widest text-brand-silver">
            {['Collection', 'The Lab', 'Vibration', 'About'].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>

          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setView('designer')}
            className="bg-white text-brand-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-brand-primary hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Enter The Lab
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
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
          </motion.div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-8"
            >
              Urban <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-orange-400">Vibration</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-brand-silver font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
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
                onClick={() => setView('designer')}
                className="bg-brand-primary text-white px-12 py-5 rounded-full font-black uppercase text-sm tracking-[0.2em] flex items-center gap-3 hover:scale-105 transition-all shadow-[0_20px_50px_rgba(255,61,0,0.3)]"
              >
                Launch Designer <ArrowRight size={20} />
              </button>
              <button className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-12 py-5 rounded-full font-black uppercase text-sm tracking-[0.2em] hover:bg-white/20 transition-all">
                View Lookbook
              </button>
            </motion.div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          >
            <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white to-transparent" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Scroll</span>
          </motion.div>
        </header>

        {/* Ticker */}
        <div className="bg-brand-primary py-4 overflow-hidden whitespace-nowrap">
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
                <h2 className="text-brand-primary text-sm font-black uppercase tracking-[0.3em] mb-4">Current Drop</h2>
                <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                  Metropolis <br /> <span className="text-brand-silver">Artifacts</span>
                </h3>
              </div>
              <p className="max-w-md text-brand-silver text-lg font-medium">
                Our latest collection explores the intersection of brutalist architecture and fluid human movement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div whileHover={{ scale: 0.98 }} className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-brand-gray">
                <img src={Collection1} alt="" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                  <span className="text-xs font-black uppercase tracking-widest text-brand-primary mb-2 block">Texture</span>
                  <h4 className="text-3xl font-black uppercase tracking-tighter">Brutalist Weave</h4>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 0.98 }} className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-brand-gray md:mt-20">
                <img src={Collection2} alt="" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                  <span className="text-xs font-black uppercase tracking-widest text-brand-primary mb-2 block">Movement</span>
                  <h4 className="text-3xl font-black uppercase tracking-tighter">Neon Nomad</h4>
                </div>
              </motion.div>

              <div className="flex flex-col gap-8 md:mt-40">
                 <div className="bg-brand-gray p-10 rounded-3xl border border-white/5 space-y-6">
                    <Sparkles className="text-brand-primary" size={40} />
                    <h4 className="text-4xl font-black uppercase tracking-tighter">Design <br /> Your Soul</h4>
                    <p className="text-brand-silver font-medium">
                      Use our AI-powered Lab to create pieces that match your specific frequency.
                    </p>
                    <button 
                      onClick={() => setView('designer')}
                      className="flex items-center gap-2 font-black uppercase text-xs tracking-widest text-brand-primary hover:text-white transition-colors"
                    >
                      Enter the Lab <ArrowRight size={16} />
                    </button>
                 </div>
                 <div className="bg-brand-primary p-1 rounded-3xl overflow-hidden">
                    <div className="bg-brand-black p-10 rounded-[22px] space-y-4">
                      <h5 className="text-xl font-black uppercase tracking-widest">Next Drop</h5>
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black tracking-tighter italic">08</span>
                        <span className="text-brand-silver font-bold uppercase tracking-widest">Days Remaining</span>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2 space-y-8">
               <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                  <Shirt size={18} strokeWidth={2.5} />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase">Doc Jordan</span>
              </div>
              <p className="text-brand-silver max-w-sm font-medium leading-relaxed">
                Doc Jordan Urban Clothing is a digital-first high-fashion house based in the future. We believe in high frequencies and low impact.
              </p>
              <div className="flex gap-6">
                <Instagram size={24} className="text-brand-silver hover:text-brand-primary transition-colors cursor-pointer" />
                <Twitter size={24} className="text-brand-silver hover:text-brand-primary transition-colors cursor-pointer" />
              </div>
            </div>
            
            <div className="space-y-6">
              <h5 className="font-black uppercase tracking-[0.2em] text-sm">Navigation</h5>
              <ul className="space-y-4 text-brand-silver font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">The Lab</li>
                <li className="hover:text-white cursor-pointer transition-colors">Collection</li>
                <li className="hover:text-white cursor-pointer transition-colors">Vibration</li>
                <li className="hover:text-white cursor-pointer transition-colors">Stockists</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="font-black uppercase tracking-[0.2em] text-sm">Join the frequency</h5>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-brand-gray border-none rounded-full px-6 py-3 text-xs font-black uppercase tracking-widest flex-1 focus:ring-1 focus:ring-brand-primary"
                />
                <button className="bg-white text-brand-black p-3 rounded-full hover:bg-brand-primary hover:text-white transition-all">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-silver">
            <span>© 2026 Doc Jordan Urban Clothing. All Rights Reserved.</span>
            <div className="flex gap-10">
              <span className="hover:text-white cursor-pointer">Privacy</span>
              <span className="hover:text-white cursor-pointer">Terms</span>
              <span className="hover:text-white cursor-pointer">Accessibility</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Designer View
  return (
    <div className="min-h-screen bg-brand-black text-white font-sans overflow-hidden flex flex-col">
      {/* Designer Header */}
      <header className="border-b border-white/10 bg-brand-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setView('landing')}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-brand-silver hover:text-white"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white">
                <Shirt size={20} />
              </div>
              <h1 className="font-black text-xl tracking-tighter uppercase">The Lab <span className="text-brand-silver text-sm ml-2 tracking-widest font-bold">V1.0</span></h1>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { id: 'select-product', label: '1. Select', icon: LayoutGrid },
              { id: 'design', label: '2. Design', icon: Palette },
              { id: 'sync', label: '3. Sync', icon: Copy },
              { id: 'review', label: '4. Review', icon: CheckCircle2 },
            ].map((s) => (
              <div 
                key={s.id}
                className={cn(
                  "flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors",
                  step === s.id ? "text-brand-primary" : "text-brand-silver"
                )}
              >
                <s.icon size={14} />
                {s.label}
              </div>
            ))}
          </nav>

          <button className="bg-white text-brand-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 'select-product' && (
            <motion.div 
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Select Base Shell</h2>
                <p className="text-brand-silver font-medium">Choose your starting architecture.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={cn(
                      "group relative bg-brand-gray/30 rounded-3xl border-2 p-6 cursor-pointer transition-all",
                      selectedProduct?.id === product.id ? "border-brand-primary shadow-[0_0_50px_rgba(255,61,0,0.2)]" : "border-white/5 hover:border-white/20 shadow-sm"
                    )}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden bg-brand-black mb-6 border border-white/5">
                      <img 
                        src={product.thumbnail} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-black text-xl uppercase tracking-tighter">{product.name}</h3>
                        <p className="text-xs font-bold text-brand-silver uppercase tracking-widest mt-1">{product.category}</p>
                      </div>
                      <span className="font-mono text-xs bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full font-bold">${product.base_price}</span>
                    </div>
                    {selectedProduct?.id === product.id && (
                      <div className="absolute top-8 right-8 bg-brand-primary text-white p-2 rounded-full shadow-lg">
                        <CheckCircle2 size={20} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-end pt-8">
                <button 
                  disabled={!selectedProduct}
                  onClick={() => setStep('design')}
                  className="bg-brand-primary text-white px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-2xl"
                >
                  Configure Hardware
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'design' && (
            <motion.div 
              key="design"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* Sidebar Controls */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-brand-gray/30 rounded-3xl p-8 border border-white/5 space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Pattern Synthesis</label>
                    <div className="flex flex-col gap-3">
                      <input 
                        type="text" 
                        placeholder="e.g. CYBERPUNK METALLIC"
                        className="w-full bg-brand-black border border-white/10 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest focus:ring-1 focus:ring-brand-primary transition-all"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                      />
                      <button 
                        onClick={handleGenerateDesign}
                        disabled={isGenerating || !theme}
                        className="bg-brand-primary text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-brand-primary/90 disabled:opacity-50 transition-all"
                      >
                        {isGenerating ? <div className="animate-spin"><Sparkles size={20} /></div> : <><Sparkles size={20} /> Run Synthesis</>}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Manual Overrides</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex flex-col items-center gap-2 p-6 rounded-2xl border border-white/5 bg-brand-black/50 hover:bg-white/5 transition-all group">
                        <Plus size={24} className="text-brand-silver group-hover:text-brand-primary transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-silver">Graphics</span>
                      </button>
                      <button className="flex flex-col items-center gap-2 p-6 rounded-2xl border border-white/5 bg-brand-black/50 hover:bg-white/5 transition-all group">
                        <Layers size={24} className="text-brand-silver group-hover:text-brand-primary transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-silver">Layers</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Base Pigment</label>
                    <div className="flex flex-wrap gap-3">
                      {['#0A0A0A', '#1A1A1A', '#2D2D2D', '#FF3D00', '#A3A3A3', '#FFFFFF'].map(c => (
                        <button 
                          key={c}
                          className={cn(
                            "w-10 h-10 rounded-full border border-white/10 transition-all",
                            design.backgroundColor === c && "ring-2 ring-brand-primary ring-offset-4 ring-offset-brand-black scale-110"
                          )}
                          style={{ backgroundColor: c }}
                          onClick={() => setDesign(prev => ({ ...prev, backgroundColor: c }))}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-brand-primary text-white rounded-3xl p-8 shadow-2xl space-y-4 relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 opacity-10 group-hover:rotate-45 transition-transform duration-1000">
                    <Shirt size={200} />
                  </div>
                  <h4 className="font-black flex items-center gap-2 uppercase tracking-widest text-sm">
                    <Sparkles size={18} className="text-white" />
                    AI Optimization
                  </h4>
                  <p className="text-xs font-medium text-white/80 leading-relaxed uppercase tracking-wider">
                    Our neural network is optimizing pattern density for the <span className="text-white font-black underline">{selectedProduct?.name}</span> geometry.
                  </p>
                </div>
              </div>

              {/* Canvas Area */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setStep('select-product')}
                      className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-brand-silver hover:text-white transition-colors"
                    >
                      <ChevronLeft size={16} />
                      Back
                    </button>
                    <h3 className="font-black uppercase tracking-widest text-xs">Workstation_01</h3>
                  </div>
                  <div className="flex gap-4">
                    <button className="p-3 bg-brand-gray/30 hover:bg-red-500/20 text-brand-silver hover:text-red-500 rounded-full transition-all"><Trash2 size={18} /></button>
                    <button className="p-3 bg-brand-gray/30 hover:bg-brand-primary text-brand-silver hover:text-white rounded-full transition-all"><Copy size={18} /></button>
                  </div>
                </div>

                <div className="flex justify-center bg-brand-black p-12 rounded-[40px] border border-white/5 relative group">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                  <div className="relative z-10 canvas-container rounded-2xl overflow-hidden">
                    <DesignerCanvas 
                      design={design} 
                      width={600} 
                      height={600} 
                      onUpdate={setDesign}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => setStep('sync')}
                    className="bg-brand-primary text-white px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-2xl"
                  >
                    Sync Hardware
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'sync' && (
            <motion.div 
              key="sync"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-12"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Fleet Distribution</h2>
                <p className="text-brand-silver font-medium uppercase tracking-widest text-xs">Sync this DNA across your entire inventory.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {products.filter(p => p.id !== selectedProduct?.id).map((product) => (
                  <div 
                    key={product.id}
                    className={cn(
                      "p-6 rounded-3xl border-2 transition-all cursor-pointer bg-brand-gray/20",
                      syncedProducts.includes(product.id) ? "border-brand-primary shadow-[0_0_30px_rgba(255,61,0,0.1)]" : "border-white/5 hover:border-white/20"
                    )}
                    onClick={() => {
                      setSyncedProducts(prev => 
                        prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]
                      );
                    }}
                  >
                    <div className="aspect-square rounded-2xl bg-brand-black mb-4 relative overflow-hidden border border-white/5">
                      <img src={product.thumbnail} alt="" className="w-full h-full object-cover opacity-30" />
                      {/* Mockup Overlay Preview */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-brand-primary/40 flex items-center justify-center">
                          {syncedProducts.includes(product.id) ? <CheckCircle2 className="text-brand-primary" /> : <Plus size={20} className="text-brand-primary/40" />}
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] font-black text-center uppercase tracking-widest truncate">{product.name}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-12 border-t border-white/5">
                <button 
                  onClick={() => setStep('design')}
                  className="px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-3 bg-brand-gray/30 hover:bg-brand-gray/50 transition-all"
                >
                  <ChevronLeft size={20} />
                  Back
                </button>
                <button 
                  onClick={() => setStep('review')}
                  className="bg-brand-primary text-white px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-2xl"
                >
                  Review Collection
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'review' && (
            <motion.div 
              key="review"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">Quality Control</h2>
                  <p className="text-brand-silver font-medium uppercase tracking-widest text-xs">Validation successful. Collection ready for deployment.</p>
                </div>
                <div className="bg-brand-primary/20 text-brand-primary border border-brand-primary/30 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Signature Validated
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[selectedProduct!, ...products.filter(p => syncedProducts.includes(p.id))].map((p, i) => (
                  <div key={p.id} className="bg-brand-gray/20 rounded-[40px] overflow-hidden border border-white/5 group">
                    <div className="aspect-[4/5] bg-brand-black relative">
                      {/* Final Mockup Simulation */}
                      <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="relative w-full h-full">
                          <img src={p.thumbnail} alt="" className="w-full h-full object-contain mix-blend-screen opacity-60 group-hover:scale-110 transition-transform duration-1000" />
                          <div 
                            className="absolute inset-0 opacity-20 pointer-events-none blur-3xl"
                            style={{ backgroundColor: design.backgroundColor }}
                          />
                        </div>
                      </div>
                      <div className="absolute bottom-6 left-6 bg-brand-primary/90 backdrop-blur px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.3em]">
                        UNIT_{i + 1}
                      </div>
                    </div>
                    <div className="p-8 flex justify-between items-center bg-brand-gray/30">
                      <div>
                        <h4 className="font-black uppercase tracking-tighter text-lg">{p.name}</h4>
                        <p className="text-[10px] font-bold text-brand-silver uppercase tracking-widest mt-1">{p.category}</p>
                      </div>
                      <button className="text-brand-silver hover:text-brand-primary transition-colors p-3 bg-brand-black rounded-full">
                        <Download size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-16 border-t border-white/5">
                <button 
                  onClick={() => {
                    setStep('select-product');
                    setSyncedProducts([]);
                    setSelectedProduct(null);
                  }}
                  className="bg-brand-primary text-white px-16 py-6 rounded-full font-black uppercase text-lg tracking-[0.2em] hover:scale-105 transition-all shadow-[0_30px_100px_rgba(255,61,0,0.4)]"
                >
                  Deploy to Production
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
