import React, { useRef, useState, useEffect } from 'react';
import { Reveal } from '../components/Reveal';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import {
  Shield, Zap, TreePine, Users, Flame, ShoppingBag,
  Droplets, Home, Sun, Eye, Lock, Wifi, MapPin, Sparkles, ArrowDown
} from 'lucide-react';

// Interactive Stat Card with 3D tilt effect
const InteractiveStat: React.FC<{
  value: string;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
  color: string;
}> = ({ value, suffix, label, icon, delay, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer perspective-1000"
    >
      <div className={`
        relative p-6 sm:p-8 rounded-2xl border transition-all duration-500
        ${isHovered
          ? 'border-[#8FBC8F]/40 bg-gradient-to-br from-[#8FBC8F]/10 to-transparent shadow-2xl shadow-[#8FBC8F]/10'
          : 'border-white/10 bg-white/[0.02]'
        }
      `}>
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8FBC8F]/20 via-transparent to-transparent blur-xl"></div>
        </div>

        {/* Icon */}
        <motion.div
          className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-500 ${isHovered ? 'bg-[#8FBC8F] text-[#0f1c15]' : 'bg-white/5 text-[#8FBC8F]'}`}
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
        >
          {icon}
        </motion.div>

        {/* Value */}
        <div className="relative z-10 flex items-baseline gap-1 mb-2">
          <motion.span
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-light"
            style={{ color: isHovered ? '#8FBC8F' : '#f4f5f0' }}
          >
            {value}
          </motion.span>
          {suffix && (
            <span className="text-lg sm:text-xl md:text-2xl text-[#8FBC8F] font-light">{suffix}</span>
          )}
        </div>

        {/* Label */}
        <p className="relative z-10 text-xs sm:text-sm text-gray-500 uppercase tracking-wider leading-tight">
          {label}
        </p>

        {/* Decorative corner */}
        <div className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-500 ${isHovered ? 'bg-[#8FBC8F] scale-100' : 'bg-white/20 scale-75'}`}></div>

        {/* Bottom line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#8FBC8F] to-transparent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

// Floating particle component
const FloatingParticle: React.FC<{ delay: number; size: number; duration: number; left: string; top: string }> = ({ delay, size, duration, left, top }) => (
  <motion.div
    className="absolute rounded-full bg-[#8FBC8F]/30 pointer-events-none hidden sm:block"
    style={{ width: size, height: size, left, top }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

// Feature card with parallax image
const FeatureCard: React.FC<{
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  index: number;
  reversed?: boolean;
}> = ({ title, description, image, icon, index, reversed }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className={`grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center ${reversed ? 'lg:direction-rtl' : ''}`}
    >
      {/* Image Side */}
      <div className={`relative overflow-hidden rounded-xl sm:rounded-2xl h-[280px] sm:h-[400px] lg:h-[550px] ${reversed ? 'lg:order-2' : ''}`}>
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c15] via-[#0f1c15]/30 to-transparent"></div>
        </motion.div>

        {/* Floating number - hidden on mobile, smaller on tablet */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 font-mono text-[80px] sm:text-[120px] lg:text-[180px] font-bold text-white/5 leading-none select-none">
          0{index}
        </div>

        {/* Icon badge */}
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#8FBC8F] rounded-full flex items-center justify-center text-[#0f1c15] shadow-2xl">
          {icon}
        </div>
      </div>

      {/* Content Side */}
      <div className={`py-4 sm:py-8 lg:py-16 ${reversed ? 'lg:order-1 lg:text-right' : ''}`}>
        <Reveal direction={reversed ? "left" : "right"}>
          <span className="inline-block text-[#8FBC8F] text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4 font-medium">
            Característica {String(index).padStart(2, '0')}
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 leading-tight">{title}</h3>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-md font-light">
            {description}
          </p>

          {/* Decorative line */}
          <div className={`mt-6 sm:mt-8 h-[2px] bg-gradient-to-r ${reversed ? 'from-[#8FBC8F] to-transparent' : 'from-transparent to-[#8FBC8F]'} w-24 sm:w-32 lg:w-48 rounded-full`}></div>
        </Reveal>
      </div>
    </motion.div>
  );
};

// Service item for grid - improved mobile
const ServiceItem: React.FC<{ icon: React.ReactNode; title: string; desc: string; delay: number }> = ({ icon, title, desc, delay }) => (
  <Reveal delay={delay}>
    <div className="group relative p-5 sm:p-6 lg:p-8 border border-white/5 hover:border-[#8FBC8F]/30 transition-all duration-500 bg-gradient-to-br from-white/[0.02] to-transparent hover:from-[#8FBC8F]/5 rounded-xl sm:rounded-2xl">
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl sm:rounded-2xl overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#8FBC8F]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 text-[#8FBC8F] opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
          {icon}
        </div>
        <h4 className="font-serif text-lg sm:text-xl mb-2 group-hover:text-[#8FBC8F] transition-colors">{title}</h4>
        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{desc}</p>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t border-r border-white/5 group-hover:border-[#8FBC8F]/30 transition-colors rounded-tr-xl sm:rounded-tr-2xl"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b border-l border-white/5 group-hover:border-[#8FBC8F]/30 transition-colors rounded-bl-xl sm:rounded-bl-2xl"></div>
    </div>
  </Reveal>
);

export const Benefits: React.FC = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.95]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Track mouse position for interactive background - only on desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 768) {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const mainFeatures = [
    {
      title: "Seguridad Perimetral Total",
      description: "Pórtico de ingreso con sistema de videovigilancia 24/7, cerco perimétrico completo y control de acceso exclusivo para los 90 socios propietarios.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop",
      icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7" />
    },
    {
      title: "Energía Solar Autónoma",
      description: "Iluminación inteligente con paneles solares en todas las áreas comunes, vías internas y espacios recreativos. Sostenibilidad y ahorro garantizado.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2672&auto=format&fit=crop",
      icon: <Sun className="w-6 h-6 sm:w-7 sm:h-7" />
    },
    {
      title: "Naturaleza Privilegiada",
      description: "Parques, jardines y áreas verdes diseñadas para el descanso y la contemplación. Vista panorámica de toda la ciudad desde cada lote.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532&auto=format&fit=crop",
      icon: <TreePine className="w-6 h-6 sm:w-7 sm:h-7" />
    }
  ];

  const exclusiveServices = [
    { icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Zona de Eventos", desc: "Espacio diseñado para celebraciones y reuniones exclusivas de socios." },
    { icon: <Flame className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Área de Fogata", desc: "Ambiente nocturno para compartir momentos únicos bajo las estrellas." },
    { icon: <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Mini Market", desc: "Abastecimiento de primera necesidad sin salir del club." },
    { icon: <Home className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Área de Parrillas", desc: "Estaciones de parrilla para reuniones sociales y familiares." },
  ];

  const infrastructure = [
    { icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Energía Eléctrica", desc: "Red eléctrica independiente y estable." },
    { icon: <Droplets className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Agua Potable", desc: "Pozo tubular con sistema de tratamiento." },
    { icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Biodigestores", desc: "Sistema de desagüe ecológico y autónomo." },
    { icon: <Wifi className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Conectividad", desc: "Infraestructura preparada para fibra óptica." },
  ];

  return (
    <div ref={containerRef} className="bg-[#0f1c15] text-[#f4f5f0] overflow-hidden">

      {/* ==================== HERO SECTION ==================== */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-20 sm:pt-24 pb-12 sm:pb-20"
      >
        {/* Interactive gradient background - follows mouse on desktop */}
        <div
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(143,188,143,0.15) 0%, transparent 50%)`
          }}
        />

        {/* Animated background elements */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0">
          {/* Main glow - adjusted for mobile */}
          <div className="absolute top-[-20%] right-[-10%] w-[300px] sm:w-[500px] lg:w-[800px] h-[300px] sm:h-[500px] lg:h-[800px] bg-[#8FBC8F] rounded-full blur-[100px] sm:blur-[150px] lg:blur-[200px] opacity-[0.08]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[250px] sm:w-[400px] lg:w-[600px] h-[250px] sm:h-[400px] lg:h-[600px] bg-[#8FBC8F] rounded-full blur-[80px] sm:blur-[120px] lg:blur-[150px] opacity-[0.05]"></div>

          {/* Subtle center accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] bg-[#8FBC8F] rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] opacity-[0.03]"></div>
        </motion.div>

        {/* Floating particles - only on tablet+ */}
        <FloatingParticle delay={0} size={6} duration={4} left="10%" top="20%" />
        <FloatingParticle delay={1} size={4} duration={5} left="85%" top="30%" />
        <FloatingParticle delay={2} size={8} duration={6} left="70%" top="60%" />
        <FloatingParticle delay={0.5} size={5} duration={4.5} left="20%" top="70%" />
        <FloatingParticle delay={1.5} size={3} duration={5.5} left="90%" top="80%" />
        <FloatingParticle delay={2.5} size={6} duration={4} left="5%" top="50%" />

        {/* Grid pattern overlay - more subtle on mobile */}
        <div className="absolute inset-0 opacity-[0.015] sm:opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}></div>

        {/* Main content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex-1 flex flex-col justify-center">

          {/* Header section */}
          <div className="text-center mb-10 sm:mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 sm:gap-3 text-[#8FBC8F] text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-4 sm:mb-6 font-medium border border-[#8FBC8F]/20 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#8FBC8F]/5 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Beneficios Exclusivos</span>
              </div>
            </motion.div>

            <motion.h1
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-4 sm:mb-6 lg:mb-8 leading-[0.9]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block">Vida</span>
              <span className="italic text-[#8FBC8F] block">Extraordinaria</span>
            </motion.h1>

            <motion.p
              className="text-gray-400 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto text-sm sm:text-base lg:text-lg font-light leading-relaxed px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Un club de campo diseñado para quienes buscan el equilibrio perfecto entre exclusividad, naturaleza y comunidad selecta.
            </motion.p>

            {/* Location tag */}
            <motion.div
              className="inline-flex items-center gap-2 mt-4 sm:mt-6 text-gray-500 text-xs sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#8FBC8F]" />
              <span>Tangay Bajo, Nuevo Chimbote</span>
            </motion.div>
          </div>

          {/* Stats Cards - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto w-full">
            <InteractiveStat
              value="5"
              suffix="ha"
              label="Hectáreas de Exclusividad"
              icon={<TreePine className="w-5 h-5 sm:w-6 sm:h-6" />}
              delay={0.3}
              color="#8FBC8F"
            />
            <InteractiveStat
              value="90"
              label="Socios Propietarios"
              icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
              delay={0.4}
              color="#8FBC8F"
            />
            <InteractiveStat
              value="250"
              suffix="m²"
              label="Por Cada Lote"
              icon={<Home className="w-5 h-5 sm:w-6 sm:h-6" />}
              delay={0.5}
              color="#8FBC8F"
            />
          </div>
        </div>

        {/* Scroll indicator - adjusted position for mobile */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-600">Descubre más</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#8FBC8F]" />
          </motion.div>
        </motion.div>

        {/* Decorative corner elements - hidden on mobile */}
        <div className="hidden sm:block absolute top-24 left-6 lg:left-12 w-16 lg:w-24 h-[1px] bg-gradient-to-r from-[#8FBC8F]/30 to-transparent"></div>
        <div className="hidden sm:block absolute top-24 left-6 lg:left-12 w-[1px] h-16 lg:h-24 bg-gradient-to-b from-[#8FBC8F]/30 to-transparent"></div>
        <div className="hidden sm:block absolute bottom-24 right-6 lg:right-12 w-16 lg:w-24 h-[1px] bg-gradient-to-l from-[#8FBC8F]/30 to-transparent"></div>
        <div className="hidden sm:block absolute bottom-24 right-6 lg:right-12 w-[1px] h-16 lg:h-24 bg-gradient-to-t from-[#8FBC8F]/30 to-transparent"></div>
      </motion.section>

      {/* ==================== MAIN FEATURES ==================== */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="space-y-16 sm:space-y-24 lg:space-y-40">
            {mainFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                index={index + 1}
                reversed={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EXCLUSIVE SERVICES ==================== */}
      <section className="py-16 sm:py-24 lg:py-32 relative">
        {/* Section divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 sm:h-24 bg-gradient-to-b from-transparent via-[#8FBC8F]/30 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <span className="text-[#8FBC8F] text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4 block">Para Nuestros Socios</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">Servicios Exclusivos</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base px-4">Espacios diseñados para el disfrute, la convivencia y el bienestar de toda la comunidad.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {exclusiveServices.map((service, index) => (
              <ServiceItem key={index} {...service} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INFRASTRUCTURE ==================== */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-transparent via-[#0a140f] to-[#0f1c15] relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <div className="order-2 lg:order-1">
              <Reveal>
                <span className="text-[#8FBC8F] text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4 block">Infraestructura</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8 leading-tight">
                  Servicios Básicos<br/>
                  <span className="text-gray-500">de Primera Calidad</span>
                </h2>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-12">
                  Cada lote cuenta con acceso garantizado a todos los servicios esenciales, con sistemas modernos, sostenibles y autónomos.
                </p>
              </Reveal>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {infrastructure.map((item, index) => (
                  <Reveal key={index} delay={index * 0.1}>
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#8FBC8F]/20 transition-colors group">
                      <div className="text-[#8FBC8F] opacity-60 group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium mb-1 text-xs sm:text-sm">{item.title}</h4>
                        <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative h-[300px] sm:h-[450px] lg:h-[600px] order-1 lg:order-2">
              <Reveal direction="left">
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
                    alt="Infraestructura"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c15] via-transparent to-[#0f1c15]/50"></div>
                </div>

                {/* Floating badge - adjusted for mobile */}
                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-[#0f1c15]/90 backdrop-blur-sm border border-[#8FBC8F]/20 p-4 sm:p-6 rounded-xl max-w-[200px] sm:max-w-xs">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-[#8FBC8F]" />
                    <span className="text-[#8FBC8F] text-[10px] sm:text-xs uppercase tracking-widest">Vista Panorámica</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Privilegiada ubicación con vista de toda la ciudad.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
        {/* Animated circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="absolute w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] border border-[#8FBC8F]/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[400px] sm:w-[650px] lg:w-[800px] h-[400px] sm:h-[650px] lg:h-[800px] border border-[#8FBC8F]/5 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute w-[500px] sm:w-[800px] lg:w-[1000px] h-[500px] sm:h-[800px] lg:h-[1000px] border border-[#8FBC8F]/[0.02] rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 leading-tight">
              Sea parte de los<br/>
              <span className="italic text-[#8FBC8F]">90 elegidos</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto font-light px-4">
              Preventa 2026 disponible. Lotes desde $30,000 USD con financiamiento directo hasta 3 años.
            </p>
            <button
              onClick={() => window.open('https://wa.me/51973068950?text=Hola%20Sol%20de%20Tangay,%20quiero%20conocer%20los%20beneficios%20del%20club%20de%20campo.', '_blank')}
              className="group relative inline-flex items-center gap-3 sm:gap-4 bg-[#8FBC8F] text-[#0f1c15] px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm hover:bg-[#f4f5f0] transition-all duration-300 hover:scale-105"
            >
              <span>Solicitar Información</span>
              <motion.span
                className="w-2 h-2 bg-[#0f1c15] rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </button>
          </Reveal>
        </div>
      </section>

    </div>
  );
};
