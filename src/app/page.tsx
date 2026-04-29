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
      cta: "Start Engine"
    },
    hero: {
      badge: "Deep Space Architecture",
      title: "Automate the Mundane.",
      subtitle: "Scale the Exceptional.",
      desc: "Revolutionizing operations through hyper-intelligent automation. Custom workflows designed for the digital aristocrat.",
      cta: "Initialize",
      founder: "Direct Founder-to-Client Excellence"
    },
    ticker: [
      "Trusted by Global Riads",
      "Tech Hubs Morocco",
      "Royal Hospitality Systems",
      "Amanjena Group",
      "Digital Nomad Atlas"
    ],
    services: {
      title: "Core Systems",
      subtitle: "Futuristic Luxury Automation",
      cards: [
        { title: "Custom AI Workflows", desc: "Proprietary agentic logic that adapts to your unique business profile and seasonal demands. We build self-healing, adaptive architectures." },
        { title: "n8n Automation", desc: "Complex integration layers connecting your PMS, WhatsApp, and Smart Home systems flawlessly." },
        { title: "Script Tuning", desc: "Advanced debugging and performance tuning." },
        { title: "Royal Privacy", desc: "Zero-knowledge data architectures." }
      ]
    },
    roi: {
      title: "Quantify the",
      highlight: "Efficiency.",
      desc: "Our agentic systems don't just save time; they reclaim human potential. Calculate the exact fiscal impact of deploying Nova AI to your operations.",
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
    footer: "Digital Aristocracy"
  },
  fr: {
    nav: {
      intelligence: "Intelligence",
      calculator: "Calculateur",
      network: "Réseau",
      cta: "Initialiser"
    },
    hero: {
      badge: "Architecture Deep Space",
      title: "Automatisez le Quotidien.",
      subtitle: "Échellez l'Exceptionnel.",
      desc: "Révolutionner les opérations grâce à l'automatisation hyper-intelligente. Des flux de travail sur mesure pour l'aristocrate numérique.",
      cta: "Commencer",
      founder: "Excellence Directe du Fondateur au Client"
    },
    ticker: [
      "Approuvé par les Riads Mondiaux",
      "Tech Hubs Maroc",
      "Systèmes d'Hospitalité Royale",
      "Groupe Amanjena",
      "Atlas des Nomades Numériques"
    ],
    services: {
      title: "Systèmes de Base",
      subtitle: "Automatisation de Luxe Futuriste",
      cards: [
        { title: "Workflows IA Personnalisés", desc: "Logique agentique propriétaire s'adaptant au profil unique de votre entreprise et aux demandes saisonnières. Nous construisons des architectures adaptatives." },
        { title: "Automatisation n8n", desc: "Couches d'intégration complexes connectant votre PMS, WhatsApp et systèmes Smart Home." },
        { title: "Optimisation de Scripts", desc: "Débogage avancé et optimisation des performances." },
        { title: "Confidentialité Royale", desc: "Architectures de données à connaissance nulle." }
      ]
    },
    roi: {
      title: "Quantifiez l'",
      highlight: "Efficacité.",
      desc: "Nos systèmes agentiques ne font pas que gagner du temps ; ils récupèrent le potentiel humain. Calculez l'impact fiscal exact du déploiement de Nova AI.",
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
    footer: "Aristocratie Numérique"
  }
};

// Abstract Compass Logo
const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full text-neon-cyan">
        {/* Outer Diamond */}
        <motion.polygon 
          points="50,5 95,50 50,95 5,50" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50px", originY: "50px" }}
        />
        {/* Inner Diamond (Offset/Magenta) */}
        <motion.polygon 
          points="50,15 85,50 50,85 15,50" 
          fill="none" 
          stroke="var(--neon-magenta)" 
          strokeWidth="1"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50px", originY: "50px" }}
        />
        {/* Center Target */}
        <circle cx="50" cy="50" r="4" fill="currentColor" className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        <motion.circle 
          cx="50" cy="50" r="8" 
          fill="none" stroke="var(--neon-magenta)" strokeWidth="0.5" strokeDasharray="2 2"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50px", originY: "50px" }}
        />
      </svg>
    </div>
    <div className="flex flex-col -gap-1">
      <span className="text-xl font-black tracking-tighter text-silver leading-none">NOVA<span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">AI</span></span>
      <span className="text-[7px] font-mono uppercase tracking-[0.4em] text-white/30">Foundry</span>
    </div>
  </div>
);

// ROI Calculator Component
const ROICalculator = ({ t, currency, industry, setCurrency, setIndustry }: any) => {
  const [hours, setHours] = useState(10);
  const [team, setTeam] = useState(5);
  
  const hourlyRates = {
    riad: 60, // MAD per hour
    office: 120, 
    other: 80
  };

  const exchangeRate = 10; // 1 USD = 10 MAD

  const savings = useMemo(() => {
    const rate = hourlyRates[industry as keyof typeof hourlyRates];
    const yearlyMAD = hours * team * rate * 52;
    return currency === 'USD' ? yearlyMAD / exchangeRate : yearlyMAD;
  }, [hours, team, currency, industry]);

  return (
    <div className="glass p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <BarChart3 className="w-48 h-48" />
      </div>
      
      <div className="flex justify-between items-center mb-8 relative z-10">
        <h3 className="text-xl font-bold text-silver font-mono tracking-wider uppercase text-glow-cyan">{t.calcTitle}</h3>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          {['MAD', 'USD'].map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-bold transition-all",
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-6xl font-black text-silver flex items-baseline gap-2 text-glow-cyan"
            >
              <span className="text-2xl text-neon-cyan font-mono">{currency === 'USD' ? '$' : 'DH'}</span>
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

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-20">
        <motion.div 
          style={{ opacity: bgOpacity }} 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(217,70,239,0.1),transparent_50%),radial-gradient(circle_at_50%_70%,rgba(6,182,212,0.1),transparent_50%)]" 
        />
        <motion.div 
          style={{ y: heroY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border-neon-cyan/30 mb-8 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-4 h-4 text-neon-magenta animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neon-cyan">{t.hero.badge}</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-[0.9] text-glow-cyan uppercase">
            {t.hero.title}<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">{t.hero.subtitle}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10 leading-relaxed font-light">
            {t.hero.desc}
          </p>
          <div className="flex flex-col items-center gap-8">
            <button className="px-12 py-5 rounded-2xl bg-white text-midnight font-bold flex items-center gap-3 hover:bg-neon-cyan transition-all group shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]">
              {t.hero.cta} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-2 glass px-5 py-2.5 rounded-full border-white/10">
              <UserCheck className="w-3 h-3 text-neon-magenta" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/50">{t.hero.founder}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Ticker */}
      <div className="py-8 border-y border-white/10 bg-midnight/80 backdrop-blur-md relative z-20">
        <div className="ticker-container">
          <div className="ticker-content flex gap-24 items-center">
            {[...Array(2)].map((_, j) => (
              <React.Fragment key={j}>
                {t.ticker.map((item, i) => (
                  <span key={i} className="text-[11px] font-mono uppercase tracking-[0.4em] text-white/30 flex items-center gap-4">
                    <span className="w-1.5 h-1.5 bg-neon-magenta rounded-full" />
                    {item}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Bento Grid Services */}
      <section id="services" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-glow-cyan uppercase">{t.services.title}</h2>
          <p className="text-neon-magenta font-mono uppercase tracking-[0.4em] text-[10px] md:text-xs">{t.services.subtitle}</p>
        </motion.div>
        
        {/* The Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
          {/* Card 1: Large Square (Spans 2 cols, 2 rows) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="md:col-span-2 md:row-span-2"
          >
            <TiltCard className="h-full flex flex-col justify-end bg-gradient-to-br from-midnight to-midnight/50">
              <Command className="w-16 h-16 text-neon-cyan mb-8 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
              <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight">{t.services.cards[0].title}</h3>
              <p className="text-white/50 text-lg">{t.services.cards[0].desc}</p>
            </TiltCard>
          </motion.div>

          {/* Card 2: Wide Rectangle (Spans 2 cols, 1 row) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="md:col-span-2 md:row-span-1"
          >
            <TiltCard className="h-full flex flex-col justify-center bg-neon-cyan/5 border-neon-cyan/20">
              <div className="flex items-center gap-6 mb-4">
                <Layers className="w-10 h-10 text-neon-magenta drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]" />
                <h3 className="text-2xl font-bold">{t.services.cards[1].title}</h3>
              </div>
              <p className="text-white/60">{t.services.cards[1].desc}</p>
            </TiltCard>
          </motion.div>

          {/* Card 3: Small Square (1 col, 1 row) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="md:col-span-1 md:row-span-1"
          >
            <TiltCard className="h-full flex flex-col justify-center text-center items-center glass">
               <Activity className="w-10 h-10 text-white mb-4" />
               <h3 className="text-xl font-bold mb-2">{t.services.cards[2].title}</h3>
               <p className="text-white/40 text-sm">{t.services.cards[2].desc}</p>
            </TiltCard>
          </motion.div>

          {/* Card 4: Small Square (1 col, 1 row) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="md:col-span-1 md:row-span-1"
          >
            <TiltCard className="h-full flex flex-col justify-center text-center items-center bg-white/5 border-white/10">
               <Shield className="w-10 h-10 text-neon-cyan mb-4" />
               <h3 className="text-xl font-bold mb-2">{t.services.cards[3].title}</h3>
               <p className="text-white/40 text-sm">{t.services.cards[3].desc}</p>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" className="py-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-center relative">
        <motion.div 
          className="absolute inset-0 bg-neon-magenta/5 blur-[120px] rounded-full pointer-events-none" 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter uppercase">
            {t.roi.title}<br /><span className="text-neon-magenta text-glow-magenta">{t.roi.highlight}</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl mb-12 leading-relaxed font-light">
            {t.roi.desc}
          </p>
          <ul className="space-y-6">
            {t.roi.features.map((item, i) => (
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.5 }}
                key={i} 
                className="flex items-center gap-5 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-white/80"
              >
                <div className="w-3 h-3 bg-neon-cyan rounded-[4px] shadow-[0_0_15px_rgba(6,182,212,0.8)] rotate-45" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
          style={{ perspective: 1000 }}
        >
          <ROICalculator 
            t={t.roi} 
            currency={currency} 
            industry={industry}
            setCurrency={setCurrency}
            setIndustry={setIndustry}
          />
        </motion.div>
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
