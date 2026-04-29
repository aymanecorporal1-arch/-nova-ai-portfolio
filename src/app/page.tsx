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
      badge: "Marrakech-Modern Intelligence",
      title: "AGENTIC",
      subtitle: "PREMIUM",
      desc: "Revolutionizing Riad hospitality through hyper-intelligent automation. Custom workflows designed for the digital aristocrat.",
      cta: "Get Started",
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
        { title: "Custom AI Workflows", desc: "Proprietary agentic logic that adapts to your Riad's unique guest profile and seasonal demands." },
        { title: "n8n Automation", desc: "Complex integration layers connecting your PMS, WhatsApp, and Smart Home systems." },
        { title: "Script Troubleshooting", desc: "Advanced debugging and performance tuning for legacy automation scripts." },
        { title: "Royal Privacy", desc: "Zero-knowledge data architectures ensuring guest sovereignty." }
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
      cta: "Lancer l'Moteur"
    },
    hero: {
      badge: "Intelligence Marrakech-Moderne",
      title: "AGENTIQUE",
      subtitle: "PREMIUM",
      desc: "Révolutionner l'hospitalité des Riads grâce à l'automatisation hyper-intelligente. Des flux de travail sur mesure pour l'aristocrate numérique.",
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
        { title: "Workflows IA Personnalisés", desc: "Logique agentique propriétaire s'adaptant au profil unique de vos clients et aux demandes saisonnières." },
        { title: "Automatisation n8n", desc: "Couches d'intégration complexes connectant votre PMS, WhatsApp et systèmes Smart Home." },
        { title: "Dépannage de Scripts", desc: "Débogage avancé et optimisation des performances pour vos scripts d'automatisation existants." },
        { title: "Confidentialité Royale", desc: "Architectures de données à connaissance nulle garantissant la souveraineté des clients." }
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

// Technical Compass Logo
const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full text-electric">
        {/* Outer Orbit Ring */}
        <motion.circle 
          cx="50" cy="50" r="48" 
          fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2"
        />
        {/* Technical Compass / Star */}
        <g className="origin-center">
          <motion.circle 
            cx="50" cy="50" r="40" 
            fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.path 
            d="M50 5 L52 48 L95 50 L52 52 L50 95 L48 52 L5 50 L48 48 Z" 
            fill="none" stroke="currentColor" strokeWidth="1"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Inner Orbit Dots */}
          <motion.circle 
            cx="50" cy="10" r="1.5" fill="currentColor"
            animate={{ 
              cx: 50 + 40 * Math.cos(0),
              cy: 50 + 40 * Math.sin(0),
              rotate: 360 
            }}
            style={{ originX: "50px", originY: "50px" }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle 
            cx="50" cy="50" r="10" 
            fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </g>
        <circle cx="50" cy="50" r="2" fill="white" className="shadow-[0_0_10px_white]" />
      </svg>
    </div>
    <div className="flex flex-col -gap-1">
      <span className="text-xl font-black tracking-tighter text-silver leading-none">NOVA<span className="text-electric">AI</span></span>
      <span className="text-[7px] font-mono uppercase tracking-[0.4em] text-white/30">Foundry</span>
    </div>
  </div>
);

// ROI Calculator Component
const ROICalculator = ({ t, currency, industry, setCurrency, setIndustry }: any) => {
  const [hours, setHours] = useState(10);
  const [team, setTeam] = useState(5);
  
  const hourlyRates = {
    riad: 60, // MAD per hour (Mixed staff)
    office: 120, // MAD per hour (Admin/Management)
    other: 80
  };

  const exchangeRate = 10; // 1 USD = 10 MAD (Approx)

  const savings = useMemo(() => {
    const rate = hourlyRates[industry as keyof typeof hourlyRates];
    const yearlyMAD = hours * team * rate * 52;
    return currency === 'USD' ? yearlyMAD / exchangeRate : yearlyMAD;
  }, [hours, team, currency, industry]);

  return (
    <div className="glass p-8 rounded-[2.5rem] border-electric/20 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <BarChart3 className="w-48 h-48" />
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-silver font-mono tracking-wider uppercase">{t.calcTitle}</h3>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/5">
          {['MAD', 'USD'].map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-bold transition-all",
                currency === c ? "bg-electric text-white" : "text-white/40 hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        <div>
          <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4 block">{t.industry}</label>
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
                    ? "bg-electric/10 border-electric/50 text-electric shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                    : "bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:text-white"
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
            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">{t.hours}</label>
            <span className="text-electric font-bold font-mono">{hours}h</span>
          </div>
          <input 
            type="range" min="1" max="40" value={hours} 
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-electric"
          />
        </div>

        <div>
          <div className="flex justify-between mb-4">
            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">{t.team}</label>
            <span className="text-electric font-bold font-mono">{team}</span>
          </div>
          <input 
            type="range" min="1" max="50" value={team} 
            onChange={(e) => setTeam(Number(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-electric"
          />
        </div>

        <div className="pt-10 border-t border-white/5">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20 mb-3">{t.savings}</div>
          <motion.div 
            key={`${savings}-${currency}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl font-black text-silver flex items-baseline gap-2"
          >
            <span className="text-2xl text-electric font-mono">{currency === 'USD' ? '$' : 'DH'}</span>
            {Math.round(savings).toLocaleString()}
          </motion.div>
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      className={cn("bento-card p-8 rounded-3xl relative group", className)}
    >
      <div style={{ transform: "translateZ(50px)" }}>
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
  const heroRef = useRef(null);
  const bentoRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const bentoY = useTransform(scrollYProgress, [0.2, 0.5], [100, -50]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  return (
    <main className="min-h-screen bg-midnight text-silver bg-grid selection:bg-electric selection:text-white">
      {/* Sticky Nav */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-8 py-4 flex justify-between items-center backdrop-blur-xl">
        <Logo />
        <div className="hidden lg:flex gap-10 text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
          <a href="#services" className="hover:text-electric transition-colors">{t.nav.intelligence}</a>
          <a href="#roi" className="hover:text-electric transition-colors">{t.nav.calculator}</a>
          <a href="#status" className="hover:text-electric transition-colors">{t.nav.network}</a>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            className="flex items-center gap-2 glass px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-electric/50 transition-all"
          >
            <Languages className="w-3 h-3 text-electric" />
            {lang}
          </button>
          <button className="px-6 py-2.5 rounded-full bg-electric text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            {t.nav.cta}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.15),transparent_60%)]" />
        <motion.div 
          style={{ y: heroY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass border-electric/30 mb-8">
            <Sparkles className="w-4 h-4 text-electric animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-electric">{t.hero.badge}</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
            {t.hero.title}<br /><span className="text-white/20">{t.hero.subtitle}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/40 mb-8 leading-relaxed">
            {t.hero.desc}
          </p>
          <div className="flex flex-col items-center gap-8">
            <button className="px-10 py-5 rounded-2xl bg-white text-black font-bold flex items-center gap-3 hover:bg-electric hover:text-white transition-all group">
              {t.hero.cta} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full border-electric/20">
              <UserCheck className="w-3 h-3 text-electric" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/60">{t.hero.founder}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Ticker */}
      <div className="py-12 border-y border-white/5 bg-black/50 backdrop-blur-sm relative z-20">
        <div className="ticker-container">
          <div className="ticker-content flex gap-20 items-center">
            {[...Array(2)].map((_, j) => (
              <React.Fragment key={j}>
                {t.ticker.map((item, i) => (
                  <span key={i} className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20">{item}</span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Bento Services */}
      <section ref={bentoRef} id="services" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div style={{ y: bentoY }} className="mb-20">
          <h2 className="text-5xl font-black mb-4 tracking-tighter">{t.services.title}</h2>
          <p className="text-electric/60 font-mono uppercase tracking-[0.4em] text-[10px]">{t.services.subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <TiltCard className="md:col-span-4 min-h-[400px] flex flex-col justify-end">
            <Command className="w-12 h-12 text-electric mb-6" />
            <h3 className="text-3xl font-bold mb-4">{t.services.cards[0].title}</h3>
            <p className="text-white/50 max-w-md">{t.services.cards[0].desc}</p>
          </TiltCard>
          <TiltCard className="md:col-span-2 min-h-[400px] flex flex-col justify-end bg-electric/10">
            <Layers className="w-12 h-12 text-electric mb-6" />
            <h3 className="text-3xl font-bold mb-4">{t.services.cards[1].title}</h3>
            <p className="text-white/50">{t.services.cards[1].desc}</p>
          </TiltCard>
          <TiltCard className="md:col-span-3 min-h-[300px]">
             <Activity className="w-10 h-10 text-electric mb-6" />
             <h3 className="text-2xl font-bold mb-4">{t.services.cards[2].title}</h3>
             <p className="text-white/50">{t.services.cards[2].desc}</p>
          </TiltCard>
          <TiltCard className="md:col-span-3 min-h-[300px] glass border-white/5">
             <Shield className="w-10 h-10 text-electric mb-6" />
             <h3 className="text-2xl font-bold mb-4">{t.services.cards[3].title}</h3>
             <p className="text-white/50">{t.services.cards[3].desc}</p>
          </TiltCard>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" className="py-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl font-black mb-8 leading-tight tracking-tighter">
            {t.roi.title}<br /><span className="text-electric">{t.roi.highlight}</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 leading-relaxed">
            {t.roi.desc}
          </p>
          <ul className="space-y-6">
            {t.roi.features.map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-white/70">
                <div className="w-2 h-2 bg-electric rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
        <ROICalculator 
          t={t.roi} 
          currency={currency} 
          industry={industry}
          setCurrency={setCurrency}
          setIndustry={setIndustry}
        />
      </section>

      {/* Status */}
      <section id="status" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="glass rounded-[4rem] p-16 border-electric/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Globe className="w-96 h-96" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-16">
            <div>
              <div className="flex items-center gap-3 text-electric mb-6">
                <div className="w-2 h-2 rounded-full bg-electric animate-ping" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] font-bold">{t.status.live}</span>
              </div>
              <h2 className="text-6xl font-black mb-10 tracking-tighter leading-none">{t.status.title}</h2>
              <div className="flex gap-12">
                <div>
                  <div className="text-4xl font-black text-white mb-2">12ms</div>
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">{t.status.latency}</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white mb-2">99.9%</div>
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">{t.status.uptime}</div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 space-y-6">
              {[80, 40, 90, 60].map((h, i) => (
                <div key={i} className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full bg-electric shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 border-t border-white/5 text-center bg-black/40 backdrop-blur-md">
        <div className="flex flex-col items-center gap-8">
          <Logo />
          <div className="text-white/20 text-[10px] font-mono uppercase tracking-[0.8em]">
            Nova AI &copy; 2026 - {t.footer}
          </div>
          <div className="text-white/10 text-[8px] font-mono uppercase tracking-widest mt-4">
            {t.hero.founder}
          </div>
        </div>
      </footer>
    </main>
  );
}
