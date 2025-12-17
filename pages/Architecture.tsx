import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { Calendar, Ruler, Users, TreePine, Building2, Route, ChevronDown, Award, Compass } from 'lucide-react';

// Animated Blueprint Grid Background
const BlueprintGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#8FBC8F]" />
          </pattern>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#8FBC8F]" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated drawing lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8FBC8F]/40 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8FBC8F]/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
      />
      <motion.div
        className="absolute left-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#8FBC8F]/30 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
      <motion.div
        className="absolute right-1/3 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#8FBC8F]/20 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 1.2 }}
      />

      {/* Corner markers */}
      <motion.div
        className="absolute top-20 left-20 w-16 h-16 border-l-2 border-t-2 border-[#8FBC8F]/40"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      />
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 border-r-2 border-t-2 border-[#8FBC8F]/40"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.6 }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-16 h-16 border-l-2 border-b-2 border-[#8FBC8F]/40"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.7 }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-16 h-16 border-r-2 border-b-2 border-[#8FBC8F]/40"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      />
    </div>
  );
};

// Animated Area Distribution Ring
const DistributionRing: React.FC<{ percentage: number; label: string; color: string; delay: number; icon: React.ReactNode }> = ({
  percentage,
  label,
  color,
  delay,
  icon
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
        <svg className="w-full h-full -rotate-90 transform">
          {/* Background circle */}
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#0f1c15]/10"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : {}}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
            className="drop-shadow-lg"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="mb-1 text-[#0f1c15]/60 group-hover:text-[#8FBC8F] transition-colors duration-300"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.5 }}
          >
            {icon}
          </motion.div>
          <motion.span
            className="text-2xl sm:text-3xl font-light text-[#0f1c15]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.6 }}
          >
            {percentage}%
          </motion.span>
        </div>
      </div>

      <motion.p
        className="mt-4 text-sm sm:text-base text-[#0f1c15]/70 font-medium tracking-wide uppercase"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.7 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

// Timeline Item with 3D Effect
const TimelineItem: React.FC<{
  date: string;
  title: string;
  description?: string;
  index: number;
  isActive: boolean;
  total: number;
}> = ({ date, title, description, index, isActive, total }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex items-start gap-6 group"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className={`relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-500 ${
            isActive
              ? 'bg-[#8FBC8F] border-[#8FBC8F] shadow-lg shadow-[#8FBC8F]/50'
              : 'bg-[#0f1c15] border-[#8FBC8F]/50 group-hover:border-[#8FBC8F]'
          }`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
        >
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full bg-[#8FBC8F]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>

        {index < total - 1 && (
          <motion.div
            className="w-[2px] h-20 sm:h-24 bg-gradient-to-b from-[#8FBC8F]/50 to-[#8FBC8F]/10"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            style={{ transformOrigin: 'top' }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        className={`flex-1 pb-8 sm:pb-10 transition-all duration-300 ${
          isActive ? 'translate-x-2' : 'group-hover:translate-x-2'
        }`}
      >
        <motion.span
          className={`inline-block px-3 py-1 text-xs uppercase tracking-widest rounded-full mb-2 ${
            isActive
              ? 'bg-[#8FBC8F] text-[#0f1c15]'
              : 'bg-[#8FBC8F]/10 text-[#8FBC8F]'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
        >
          {date}
        </motion.span>

        <motion.h4
          className="text-xl sm:text-2xl text-white font-light mb-1 serif"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
        >
          {title}
        </motion.h4>

        {description && (
          <motion.p
            className="text-sm text-white/50"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.15 + 0.5 }}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

// Gallery Image with Architectural Frame
const ArchitecturalImage: React.FC<{
  src: string;
  title: string;
  subtitle: string;
  index: number;
  large?: boolean;
}> = ({ src, title, subtitle, index, large }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`relative group cursor-pointer ${large ? 'md:col-span-2 md:row-span-2' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Architectural frame lines */}
      <div className="absolute -inset-3 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#8FBC8F]/0 group-hover:border-[#8FBC8F]/60"
          animate={isHovered ? { width: 24, height: 24 } : { width: 32, height: 32 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#8FBC8F]/0 group-hover:border-[#8FBC8F]/60"
          animate={isHovered ? { width: 24, height: 24 } : { width: 32, height: 32 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#8FBC8F]/0 group-hover:border-[#8FBC8F]/60"
          animate={isHovered ? { width: 24, height: 24 } : { width: 32, height: 32 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#8FBC8F]/0 group-hover:border-[#8FBC8F]/60"
          animate={isHovered ? { width: 24, height: 24 } : { width: 32, height: 32 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Image container */}
      <div className={`relative overflow-hidden rounded-lg ${large ? 'aspect-[4/3]' : 'aspect-square'}`}>
        <motion.img
          src={src}
          alt={title}
          className="w-full h-full object-cover"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#0f1c15] via-[#0f1c15]/20 to-transparent"
          initial={{ opacity: 0.6 }}
          animate={isHovered ? { opacity: 0.9 } : { opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            <h3 className="serif text-xl sm:text-2xl text-white mb-1">{title}</h3>
            <p className="text-sm text-white/60">{subtitle}</p>
          </motion.div>

          {/* Measurement indicator */}
          <motion.div
            className="absolute top-4 right-4 flex items-center gap-2 text-[#8FBC8F] text-xs"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Ruler size={14} />
            <span>250 m²</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Team Member Card
const TeamCard: React.FC<{
  name: string;
  role: string;
  company: string;
  index: number;
}> = ({ name, role, company, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden group-hover:border-[#8FBC8F]/30 transition-colors duration-500">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8FBC8F]/5 rounded-full blur-3xl group-hover:bg-[#8FBC8F]/10 transition-colors duration-500" />

        {/* Icon */}
        <motion.div
          className="w-16 h-16 rounded-full bg-[#8FBC8F]/10 flex items-center justify-center mb-6 group-hover:bg-[#8FBC8F]/20 transition-colors duration-300"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
        >
          {index === 0 ? (
            <Compass className="w-8 h-8 text-[#8FBC8F]" />
          ) : (
            <Award className="w-8 h-8 text-[#8FBC8F]" />
          )}
        </motion.div>

        <h4 className="text-xl sm:text-2xl text-white font-light mb-2 serif">{name}</h4>
        <p className="text-[#8FBC8F] text-sm uppercase tracking-wider mb-1">{role}</p>
        <p className="text-white/40 text-sm">{company}</p>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#8FBC8F]/20 rounded-br-2xl" />
      </div>
    </motion.div>
  );
};

export const Architecture: React.FC = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const timelineData = [
    { date: "Enero 2026", title: "Inicio de Venta", description: "Apertura oficial de preventa exclusiva" },
    { date: "Marzo 2026", title: "Lotización y Manzaneo", description: "Definición de lotes y distribución" },
    { date: "Agosto 2026", title: "Saneamiento Físico Legal", description: "Documentación y titulación" },
    { date: "Oct - Dic 2026", title: "Construcción Pórtico y Cercado", description: "Infraestructura perimetral" },
    { date: "Enero 2027", title: "Inicio Áreas Internas", description: "Club house y amenidades" }
  ];

  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2574&auto=format&fit=crop", title: "Club House", subtitle: "Centro de la vida social", large: true },
    { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop", title: "Lotes Residenciales", subtitle: "Privacidad garantizada" },
    { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop", title: "Áreas Verdes", subtitle: "Naturaleza integrada" },
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop", title: "Arquitectura", subtitle: "Diseño contemporáneo" },
    { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop", title: "Espacios Comunes", subtitle: "Vida en comunidad" }
  ];

  return (
    <div ref={containerRef} className="bg-[#f4f5f0] overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-[#0f1c15] overflow-hidden"
        style={{ scale: heroScale }}
      >
        <BlueprintGrid />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1c15] via-transparent to-[#0f1c15] opacity-60" />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          style={{ opacity: heroOpacity }}
        >
          {/* Top badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#8FBC8F]/10 border border-[#8FBC8F]/30 rounded-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Ruler size={14} className="text-[#8FBC8F]" />
            <span className="text-[#8FBC8F] text-sm tracking-widest uppercase">5 Hectáreas</span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            className="serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-6 leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block">Master</span>
            <span className="block text-[#8FBC8F]">Plan</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Diseñado por <span className="text-[#8FBC8F]">Trazzos Arquitectos</span> con la supervisión del
            <span className="text-[#8FBC8F]"> Arq. Melvin Gonzáles</span>.
            Un proyecto exclusivo para 90 socios propietarios.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 sm:gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { value: "90", label: "Lotes" },
              { value: "250", label: "m² por lote" },
              { value: "5", label: "Hectáreas" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <span className="block text-3xl sm:text-4xl text-white font-light">{stat.value}</span>
                <span className="text-xs sm:text-sm text-white/40 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs text-white/40 uppercase tracking-widest">Explorar</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-[#8FBC8F]" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Distribution Section */}
      <section className="py-20 sm:py-32 px-6 bg-[#f4f5f0]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 sm:mb-20">
              <span className="text-[#8FBC8F] text-sm uppercase tracking-widest mb-4 block">Distribución</span>
              <h2 className="serif text-4xl sm:text-5xl md:text-6xl text-[#0f1c15] mb-6">
                Diseño Integral
              </h2>
              <p className="text-lg text-[#0f1c15]/60 max-w-2xl mx-auto">
                Cada metro cuadrado pensado para el equilibrio perfecto entre vida residencial,
                amenidades y conectividad.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-6 sm:gap-12">
            <DistributionRing
              percentage={56}
              label="Residencial"
              color="#8FBC8F"
              delay={0}
              icon={<Building2 size={28} />}
            />
            <DistributionRing
              percentage={14}
              label="Equipamiento"
              color="#0f1c15"
              delay={0.2}
              icon={<TreePine size={28} />}
            />
            <DistributionRing
              percentage={30}
              label="Vías"
              color="#8FBC8F"
              delay={0.4}
              icon={<Route size={28} />}
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#f4f5f0]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-[#8FBC8F] text-sm uppercase tracking-widest mb-4 block">Visualización</span>
              <h2 className="serif text-4xl sm:text-5xl md:text-6xl text-[#0f1c15]">
                Espacios Únicos
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {galleryImages.map((img, i) => (
              <ArchitecturalImage
                key={i}
                src={img.src}
                title={img.title}
                subtitle={img.subtitle}
                index={i}
                large={img.large}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 sm:py-32 bg-[#0f1c15] relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <defs>
              <pattern id="timelineGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#timelineGrid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16 sm:mb-20">
              <span className="text-[#8FBC8F] text-sm uppercase tracking-widest mb-4 block flex items-center justify-center gap-2">
                <Calendar size={14} />
                Cronograma
              </span>
              <h2 className="serif text-4xl sm:text-5xl md:text-6xl text-white mb-6">
                Timeline de Obra
              </h2>
              <p className="text-lg text-white/50 max-w-xl mx-auto">
                Un proceso planificado meticulosamente para entregar excelencia en cada fase del proyecto.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            {timelineData.map((item, i) => (
              <TimelineItem
                key={i}
                date={item.date}
                title={item.title}
                description={item.description}
                index={i}
                isActive={i === 0}
                total={timelineData.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 sm:py-32 bg-[#0f1c15] relative">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-[#8FBC8F] text-sm uppercase tracking-widest mb-4 block flex items-center justify-center gap-2">
                <Users size={14} />
                Equipo
              </span>
              <h2 className="serif text-4xl sm:text-5xl md:text-6xl text-white">
                Respaldo Profesional
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <TeamCard
              name="Trazzos Arquitectos"
              role="Diseño & Planificación"
              company="Estudio de Arquitectura"
              index={0}
            />
            <TeamCard
              name="Arq. Melvin Gonzáles"
              role="Supervisión de Obra"
              company="Arquitecto Principal"
              index={1}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-[#f4f5f0] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
          <motion.div
            className="w-full h-full rounded-full border border-[#0f1c15]"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-8 rounded-full border border-[#8FBC8F]"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-16 rounded-full border border-[#0f1c15]"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="serif text-4xl sm:text-5xl md:text-6xl text-[#0f1c15] mb-6">
              Forma Parte del Proyecto
            </h2>
            <p className="text-lg text-[#0f1c15]/60 mb-10 max-w-xl mx-auto">
              Solo 90 lotes disponibles. Asegura tu lugar en este exclusivo club de campo.
            </p>
            <motion.a
              href="#contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#0f1c15] text-white rounded-full text-lg group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Solicitar Información</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
