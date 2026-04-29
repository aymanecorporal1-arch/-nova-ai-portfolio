'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { 
  Bot, 
  Cpu, 
  Shield, 
  Zap, 
  Activity, 
  Globe, 
  Terminal,
  ChevronRight,
  LayoutDashboard,
  Server,
  Database,
  BarChart3,
  Layers,
  Sparkles,
  Command,
  Languages,
  ArrowRightLeft,
  Building2,
  Briefcase,
  UserCheck
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Translations
const translations = {
  en: {
    nav: {
      intelligence: "Intelligence",
      calculator: "Calculator",
      network: "Network",
      cta: "Audit My Business ROI"
    },
    hero: {
      badge: "Deep Space Architecture",
      title: "Automate the Mundane.",
      subtitle: "Scale the Exceptional.",
      desc: "The AI Revolution has reached the Kingdom. We bridge the gap between traditional Moroccan industry and global-scale automation.",
      authority: "Turn hours of manual administration into seconds of precision. Our agents don't sleep; they scale.",
      cta: "Initialize Engine",
      founder: "Direct Founder-to-Client Excellence"
    },
    edge: {
      title: "Local Context, Global Intelligence",
      desc: "We don’t just build bots. We build systems that understand the nuances of the Moroccan market—mastering French, English, and Darija to serve your clients perfectly."
    },
    process: {
      title: "The Nova Methodology",
      steps: [
        { title: "Strategic Audit", desc: "We deep-dive into your operational bottlenecks." },
        { title: "Custom Build", desc: "Agentic systems architected for your specific scale." },
        { title: "24/7 Deployment", desc: "Seamless integration with zero downtime." }
      ]
    },
    services: {
      title: "Core Systems",
      subtitle: "Futuristic Luxury Automation",
      cards: [
        { title: "Custom AI Workflows", desc: "Proprietary agentic logic that adapts to your unique business profile and seasonal demands." },
        { title: "n8n Automation", desc: "Complex integration layers connecting your PMS, WhatsApp, and Smart Home systems." },
        { title: "Script Tuning", desc: "Advanced debugging and performance tuning." },
        { title: "Royal Privacy", desc: "Zero-knowledge data architectures." }
      ]
    },
    roi: {
      title: "Quantify the",
      highlight: "Efficiency.",
      desc: "Our agentic systems don't just save time; they reclaim human potential. Calculate the exact fiscal impact of deploying Nova AI.",
      features: ['Reduced overhead by 40%', 'Instant 24/7 guest response', 'Zero human-error bookings'],
      calcTitle: "ROI Impact Calculator",
      hours: "Hours Lost/Week",
      team: "Team Size",
      industry: "Industry",
      savings: "Potential Yearly Savings",
      industries: {
        riad: "Riad / Hotel",
        office: "Office / Agency",
        other: "General Business"
      }
    },
    status: {
      live: "Network Live",
      title: "Global Node Operations",
      latency: "Avg Latency",
      uptime: "Core Uptime"
    },
    partnerships: [
      "Tech Hub Morocco",
      "Riad Alliance",
      "Digital Nomad Atlas"
    ],
    bilingual: {
      title: "Bilingual Intelligence",
      desc: "Agentic systems fluent in French, English, and Darija. Seamless local and global operations."
    },
    footer: "Digital Aristocracy"
  },
  fr: {
    nav: {
      intelligence: "Intelligence",
      calculator: "Calculateur",
      network: "Réseau",
      cta: "Audit ROI Business"
    },
    hero: {
      badge: "Architecture Deep Space",
      title: "Automatisez le Quotidien.",
      subtitle: "Échellez l'Exceptionnel.",
      desc: "La révolution de l'IA est arrivée au Royaume. Nous comblons le fossé entre l'industrie marocaine traditionnelle et l'automatisation à l'échelle mondiale.",
      authority: "Transformez des heures d'administration manuelle en secondes de précision. Nos agents ne dorment pas ; ils évoluent.",
      cta: "Initialiser",
      founder: "Excellence Directe du Fondateur au Client"
    },
    edge: {
      title: "Contexte Local, Intelligence Globale",
      desc: "Nous ne construisons pas seulement des bots. Nous concevons des systèmes qui comprennent les nuances du marché marocain — maîtrisant le français, l'anglais et le darija."
    },
    process: {
      title: "La Méthodologie Nova",
      steps: [
        { title: "Audit Stratégique", desc: "Analyse approfondie de vos goulots d'étranglement opérationnels." },
        { title: "Construction Sur Mesure", desc: "Systèmes agentiques conçus pour votre échelle spécifique." },
        { title: "Déploiement 24/7", desc: "Intégration transparente sans interruption." }
      ]
    },
    services: {
      title: "Systèmes de Base",
      subtitle: "Automatisation de Luxe Futuriste",
      cards: [
        { title: "Workflows IA Personnalisés", desc: "Logique agentique propriétaire s'adaptant au profil unique de votre entreprise." },
        { title: "Automatisation n8n", desc: "Couches d'intégration complexes connectant votre PMS, WhatsApp et Smart Home." },
        { title: "Optimisation de Scripts", desc: "Débogage avancé et optimisation des performances." },
        { title: "Confidentialité Royale", desc: "Architectures de données à connaissance nulle." }
      ]
    },
    roi: {
      title: "Quantifiez l'",
      highlight: "Efficacité.",
      desc: "Nos systèmes agentiques ne font pas que gagner du temps ; ils récupèrent le potentiel humain. Calculez l'impact fiscal exact.",
      features: ['Réduction des frais de 40%', 'Réponse client instantanée 24/7', 'Zéro erreur de réservation'],
      calcTitle: "Calculateur d'Impact ROI",
      hours: "Heures Perdues/Semaine",
      team: "Taille de l'Équipe",
      industry: "Secteur",
      savings: "Économies Annuelles Potentielles",
      industries: {
        riad: "Riad / Hôtel",
        office: "Bureau / Agence",
        other: "Entreprise Générale"
      }
    },
    status: {
      live: "Réseau en Direct",
      title: "Opérations Globales",
      latency: "Latence Moyenne",
      uptime: "Disponibilité"
    },
    partnerships: [
      "Tech Hub Morocco",
      "Alliance des Riads",
      "Atlas des Nomades"
    ],
    bilingual: {
      title: "Intelligence Bilingue",
      desc: "Systèmes agentiques parlant Français, Anglais et Darija. Opérations locales et globales fluides."
    },
    footer: "Aristocratie Numérique"
  }
};


// Technical Star Logo
const Logo = () => {
  return (
    <div className="flex items-center gap-4 cursor-pointer group">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <motion.svg 
          viewBox="0 0 100 100" 
          className="w-full h-full text-neon-cyan"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Main Compass Star */}
          <path 
            d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            className="drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
          />
          {/* Inner Ring */}
          <circle cx="50" cy="50" r="12" fill="none" stroke="var(--neon-magenta)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          {/* Precise Crosshair */}
          <line x1="50" y1="35" x2="50" y2="65" stroke="currentColor" strokeWidth="0.5" />
          <line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="0.5" />
        </motion.svg>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-[0.1em] text-white leading-none uppercase">NOVA<span className="text-neon-cyan">AI</span></span>
        <span className="text-[6px] font-mono uppercase tracking-[0.6em] text-white/40">Technical Foundry</span>
      </div>
    </div>
  );
};


// ROI Calculator Component
const ROICalculator = ({ t, currency, industry, setCurrency, setIndustry }: any) => {
  const [hours, setHours] = useState(10);
  const [team, setTeam] = useState(5);
  
  const hourlyRates = {
    riad: 60, // MAD per hour
    office: 120, 
    other: 80
  };

  const exchangeRates = {
    USD: 10, // 1 USD = 10 MAD
    EUR: 11  // 1 EUR = 11 MAD
  };

  const savings = useMemo(() => {
    const rate = hourlyRates[industry as keyof typeof hourlyRates];
    const yearlyMAD = hours * team * rate * 52;
    if (currency === 'MAD') return yearlyMAD;
    return yearlyMAD / exchangeRates[currency as keyof typeof exchangeRates];
  }, [hours, team, currency, industry]);


  return (
    <div className="glass p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <BarChart3 className="w-48 h-48" />
      </div>
      
      <div className="flex justify-between items-center mb-8 relative z-10">
        <h3 className="text-xl font-bold text-white font-mono tracking-wider uppercase text-glow-cyan">{t.calcTitle}</h3>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          {['MAD', 'USD', 'EUR'].map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold transition-all",
                currency === c ? "bg-neon-cyan text-midnight shadow-[0_0_15px_rgba(6,182,212,0.5)]" : "text-white/40 hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>


      <div className="space-y-10 relative z-10">
        <div>
          <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neon-magenta mb-4 block">{t.industry}</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'riad', icon: <Building2 className="w-4 h-4" /> },
              { id: 'office', icon: <Briefcase className="w-4 h-4" /> },
              { id: 'other', icon: <Command className="w-4 h-4" /> }
            ].map((ind) => (
              <button
                key={ind.id}
                onClick={() => setIndustry(ind.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all",
                  industry === ind.id 
                    ? "bg-neon-cyan/10 border-neon-cyan text-neon-cyan shadow-[0_0_20px_rgba(6,182,212,0.2)]" 
                    : "bg-midnight/50 border-white/5 text-white/40 hover:border-white/20 hover:text-white"
                )}
              >
                {ind.icon}
                <span className="text-[9px] font-bold uppercase tracking-tighter">{t.industries[ind.id]}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-4">
            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neon-magenta">{t.hours}</label>
            <span className="text-neon-cyan font-bold font-mono">{hours}h</span>
          </div>
          <input 
            type="range" min="1" max="40" value={hours} 
            onChange={(e) => setHours(Number(e.target.value))}
            className="premium-slider"
          />
        </div>

        <div>
          <div className="flex justify-between mb-4">
            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neon-magenta">{t.team}</label>
            <span className="text-neon-cyan font-bold font-mono">{team}</span>
          </div>
          <input 
            type="range" min="1" max="50" value={team} 
            onChange={(e) => setTeam(Number(e.target.value))}
            className="premium-slider"
          />
        </div>

        <div className="pt-10 border-t border-white/10">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-3">{t.savings}</div>
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${savings}-${currency}`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
              }}
              exit={{ opacity: 0, y: -10, scale: 1.05 }}
              transition={{ 
                duration: 0.4,
                filter: { duration: 0.5 }
              }}
              className="text-6xl font-black text-silver flex items-baseline gap-2 text-glow-cyan"
            >
              <span className="text-2xl text-neon-cyan font-mono">
                {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : 'DH'}
              </span>
              {Math.round(savings).toLocaleString()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// 3D Tilt Card Helper
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("bento-card p-8 rounded-3xl relative group overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div style={{ transform: "translateZ(40px)" }} className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export default function LandingPage() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [currency, setCurrency] = useState('MAD');
  const [industry, setIndustry] = useState('riad');
  const t = translations[lang];

  // Parallax Setup
  const { scrollYProgress } = useScroll();
  
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="min-h-screen bg-midnight text-silver bg-grid selection:bg-neon-magenta selection:text-white">
      {/* Sticky Nav */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 md:px-12 py-4 flex justify-between items-center">
        <Logo />
        <div className="hidden lg:flex gap-10 text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
          <a href="#services" className="hover:text-neon-cyan transition-colors">{t.nav.intelligence}</a>
          <a href="#roi" className="hover:text-neon-cyan transition-colors">{t.nav.calculator}</a>
          <a href="#status" className="hover:text-neon-cyan transition-colors">{t.nav.network}</a>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            className="flex items-center gap-2 glass px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-neon-cyan/50 transition-all text-white/70 hover:text-white"
          >
            <Languages className="w-3 h-3 text-neon-magenta" />
            {lang}
          </button>
          <button className="px-6 py-2.5 rounded-full bg-neon-cyan text-midnight text-[10px] font-bold uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            {t.nav.cta}
          </button>
        </div>
      </nav>

      {/* Hero & ROI Section */}
      <section className="relative pt-28 pb-0 px-4 md:px-6 overflow-hidden">
        <motion.div 
          style={{ opacity: bgOpacity }} 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(6,182,212,0.08),transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(217,70,239,0.05),transparent_50%)] pointer-events-none" 
        />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-8 xl:gap-16 items-start">
            {/* Left: Hero Copy */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-8 pb-16"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass mb-8">
                <Sparkles className="w-3.5 h-3.5 text-neon-mint animate-pulse" />
                <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/60">{t.hero.badge}</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[0.9] text-white uppercase">
                {t.hero.title}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30">
                  {t.hero.subtitle}
                </span>
              </h1>
              <p className="max-w-lg text-base md:text-lg text-white/50 mb-10 leading-relaxed font-light">
                {t.hero.desc}
              </p>
              <div className="flex flex-col gap-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neon-mint/80 max-w-md leading-loose">
                  {t.hero.authority}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="px-7 py-3.5 rounded-xl bg-neon-cyan text-midnight font-black uppercase tracking-[0.15em] text-[11px] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    {t.nav.cta}
                  </button>
                  <span className="text-white/20 text-[10px] font-mono uppercase tracking-widest">{t.hero.founder}</span>
                </div>
              </div>
            </motion.div>

            {/* Right: ROI Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative lg:sticky lg:top-24 pb-12"
            >
              <div className="absolute -inset-6 bg-neon-cyan/5 blur-3xl rounded-full opacity-60 pointer-events-none" />
              <ROICalculator 
                t={t.roi} 
                currency={currency} 
                industry={industry}
                setCurrency={setCurrency}
                setIndustry={setIndustry}
              />
            </motion.div>
          </div>
        </div>
      </section>


      {/* Strategic Partnerships */}
      <div className="py-12 border-y border-white/5 bg-black/40 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-30 grayscale contrast-125">
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/40 italic">Strategic Partnerships</span>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic">TECH HUB MAROC</span>
              <span className="text-sm md:text-lg font-light tracking-[0.4em] text-white uppercase">RIAD ALLIANCE</span>
              <span className="text-lg md:text-xl font-bold tracking-tight text-white uppercase">NOMAD ATLAS</span>
            </div>
          </div>
        </div>
      </div>


      {/* Bento Grid Services */}
      <section id="services" className="py-16 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-[0.05em] text-white uppercase italic">{t.services.title}</h2>
          <p className="text-neon-mint font-mono uppercase tracking-[0.5em] text-[10px] md:text-xs">{t.services.subtitle}</p>
        </motion.div>
        
        {/* Bento: flexible grid, left card spans 2 rows via min-height */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Large hero card - left */}
          <motion.div className="md:col-span-2" style={{minHeight: '520px'}}>
            <TiltCard className="h-full flex flex-col justify-end bg-gradient-to-br from-white/5 to-transparent">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Cpu className="w-32 h-32 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight text-white uppercase italic">{t.services.cards[0].title}</h3>
              <p className="text-white/50 text-lg font-light tracking-wide">{t.services.cards[0].desc}</p>
            </TiltCard>
          </motion.div>

          {/* Right column: stacked 2 cards */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <motion.div style={{minHeight: '248px'}}>
              <TiltCard className="h-full flex flex-col justify-center bg-white/5">
                <div className="flex items-center gap-5 mb-3">
                  <Zap className="w-9 h-9 text-neon-mint" />
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider italic">{t.services.cards[1].title}</h3>
                </div>
                <p className="text-white/50 font-light text-sm">{t.services.cards[1].desc}</p>
              </TiltCard>
            </motion.div>

            <div className="grid grid-cols-2 gap-4" style={{minHeight: '248px'}}>
              <motion.div className="h-full">
                <TiltCard className="h-full flex flex-col justify-center text-center items-center bg-black/40">
                  <div className="relative mb-5">
                    <Globe className="w-10 h-10 text-neon-mint" />
                    <motion.div 
                       animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
                       transition={{ duration: 3, repeat: Infinity }}
                       className="absolute -top-5 -left-7 px-2 py-0.5 bg-white/10 border border-white/20 rounded text-[9px] font-bold text-white"
                    >FR</motion.div>
                    <motion.div 
                       animate={{ y: [0, 5, 0], opacity: [0.6, 1, 0.6] }}
                       transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                       className="absolute -bottom-3 -right-9 px-2 py-0.5 bg-neon-mint/20 border border-neon-mint/40 rounded text-[9px] font-bold text-neon-mint"
                    >EN</motion.div>
                    <motion.div 
                       animate={{ x: [0, 5, 0], opacity: [0.6, 1, 0.6] }}
                       transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                       className="absolute top-5 -right-10 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-bold text-white/60"
                    >MA</motion.div>
                  </div>
                  <h3 className="text-base font-black mb-1 text-white uppercase tracking-tighter italic">{t.bilingual.title}</h3>
                  <p className="text-white/40 text-[9px] leading-relaxed uppercase tracking-widest">{t.bilingual.desc}</p>
                </TiltCard>
              </motion.div>

              <motion.div className="h-full">
                <TiltCard className="h-full flex flex-col justify-center text-center items-center bg-white/5">
                  <Shield className="w-9 h-9 text-white/30 mb-5" />
                  <h3 className="text-base font-bold mb-1 text-white uppercase tracking-wider italic">{t.services.cards[3].title}</h3>
                  <p className="text-white/40 text-[9px] leading-relaxed tracking-wide">{t.services.cards[3].desc}</p>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-[0.05em] uppercase italic">{t.process.title}</h2>
            <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-neon-mint to-transparent mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm relative group hover:border-neon-mint/30 transition-all duration-500"
              >
                <div className="text-5xl font-black text-white/5 absolute top-4 right-6 group-hover:text-neon-mint/10 transition-colors">0{i+1}</div>
                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tighter italic">{step.title}</h3>
                <p className="text-white/50 font-light leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Status */}
      <section id="status" className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-[3rem] md:rounded-[4rem] p-10 md:p-16 border-neon-cyan/20 relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.05)]"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Globe className="w-96 h-96" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-16 relative z-10">
            <div>
              <div className="flex items-center gap-4 text-neon-cyan mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(6,182,212,1)] animate-ping" />
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] font-bold">{t.status.live}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter leading-none uppercase">{t.status.title}</h2>
              <div className="flex gap-16">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-silver mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">12ms</div>
                  <div className="text-[9px] md:text-[10px] font-mono text-neon-magenta uppercase tracking-[0.3em]">{t.status.latency}</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-silver mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">99.9%</div>
                  <div className="text-[9px] md:text-[10px] font-mono text-neon-magenta uppercase tracking-[0.3em]">{t.status.uptime}</div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 space-y-6">
              {[80, 40, 90, 60].map((h, i) => (
                <div key={i} className="h-1.5 bg-midnight rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.15, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta shadow-[0_0_15px_rgba(217,70,239,0.5)]"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="py-24 border-t border-white/10 text-center bg-midnight/90 backdrop-blur-xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
        <div className="flex flex-col items-center gap-10">
          <Logo />
          <div className="text-white/30 text-[10px] font-mono uppercase tracking-[0.8em]">
            Nova AI &copy; 2026 - {t.footer}
          </div>
          <div className="text-neon-magenta/50 text-[8px] font-mono uppercase tracking-[0.5em] mt-2">
            {t.hero.founder}
          </div>
        </div>
      </footer>
    </main>
  );
}
