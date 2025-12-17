import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { Leaf, Heart, Shield, Sun, Wind, Droplets, Mountain, Sparkles, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Organic Floating Shape Component
const OrganicShape: React.FC<{
  className?: string;
  delay?: number;
  duration?: number;
  color?: string;
}> = ({ className = '', delay = 0, duration = 20, color = '#8FBC8F' }) => {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.1, 0.3, 0.1],
        scale: [0.8, 1.1, 0.8],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id={`gradient-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          fill={`url(#gradient-${delay})`}
          animate={{
            d: [
              "M 100 0 C 150 0 200 50 200 100 C 200 150 150 200 100 200 C 50 200 0 150 0 100 C 0 50 50 0 100 0",
              "M 100 10 C 160 20 190 60 180 100 C 170 140 140 190 100 190 C 60 190 20 140 10 100 C 0 60 40 10 100 10",
              "M 100 0 C 150 0 200 50 200 100 C 200 150 150 200 100 200 C 50 200 0 150 0 100 C 0 50 50 0 100 0"
            ]
          }}
          transition={{
            duration: duration * 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </motion.div>
  );
};

// Animated Counter
const AnimatedCounter: React.FC<{ value: number; suffix?: string; label: string; delay?: number }> = ({
  value,
  suffix = '',
  label,
  delay = 0
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      <span className="block text-5xl sm:text-6xl md:text-7xl font-light text-[#8FBC8F] mb-2">
        {count}{suffix}
      </span>
      <span className="text-sm sm:text-base text-white/50 uppercase tracking-widest">{label}</span>
    </motion.div>
  );
};

// Interactive Philosophy Card with Flip Effect
const FlipCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  index: number;
  color: string;
}> = ({ icon, title, subtitle, description, index, color }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative h-[400px] sm:h-[450px] cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f1c15] to-[#1a2e1f]" />

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8FBC8F]/20 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#8FBC8F]/10 to-transparent rounded-full blur-xl" />

          {/* Number */}
          <span className="absolute top-6 right-6 text-7xl font-light text-white/5 serif">
            0{index + 1}
          </span>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-8">
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: `${color}20` }}
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <div style={{ color }}>{icon}</div>
            </motion.div>

            <h3 className="serif text-3xl sm:text-4xl text-white mb-2">{title}</h3>
            <p className="text-[#8FBC8F] italic mb-4">{subtitle}</p>

            {/* Tap hint */}
            <div className="flex items-center gap-2 text-white/30 text-sm">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👆
              </motion.span>
              <span>Toca para descubrir más</span>
            </div>
          </div>

          {/* Border glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-[#8FBC8F]/0 group-hover:border-[#8FBC8F]/30"
            whileHover={{ borderColor: 'rgba(143, 188, 143, 0.3)' }}
          />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: color }} />

          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <pattern id={`pattern-${index}`} width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1" fill="white" />
              </pattern>
              <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center p-8">
            <Quote className="w-12 h-12 text-[#0f1c15]/20 mb-6" />

            <p className="text-[#0f1c15] text-lg sm:text-xl leading-relaxed mb-8">
              {description}
            </p>

            <div className="flex items-center gap-2 text-[#0f1c15]/50 text-sm">
              <span>← Toca para volver</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Interactive Pillar with Expand Effect
const ExpandablePillar: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ icon, title, description, number, index, isExpanded, onToggle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onToggle}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl transition-colors duration-500 ${
          isExpanded ? 'bg-[#8FBC8F]' : 'bg-white/5 hover:bg-white/10'
        }`}
        animate={{ height: isExpanded ? 'auto' : '100px' }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Main row */}
        <div className="flex items-center gap-6 p-6">
          <motion.div
            className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
              isExpanded ? 'bg-[#0f1c15]/20' : 'bg-[#8FBC8F]/10'
            }`}
            animate={{ rotate: isExpanded ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={isExpanded ? 'text-[#0f1c15]' : 'text-[#8FBC8F]'}>{icon}</div>
          </motion.div>

          <div className="flex-1">
            <h4 className={`text-xl sm:text-2xl font-light transition-colors duration-300 ${
              isExpanded ? 'text-[#0f1c15]' : 'text-white'
            }`}>
              {title}
            </h4>
          </div>

          <span className={`text-4xl font-light transition-colors duration-300 ${
            isExpanded ? 'text-[#0f1c15]/20' : 'text-white/10'
          }`}>
            {number}
          </span>

          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isExpanded ? 'bg-[#0f1c15]/10' : 'bg-white/5'
            }`}
          >
            <span className={`text-2xl ${isExpanded ? 'text-[#0f1c15]' : 'text-white'}`}>+</span>
          </motion.div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-6"
            >
              <p className="text-[#0f1c15]/70 text-lg leading-relaxed pl-20">
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Value Card with Reveal Effect
const ValueCard: React.FC<{
  title: string;
  description: string;
  image: string;
  index: number;
}> = ({ title, description, image, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.7 }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#0f1c15] via-[#0f1c15]/40 to-transparent"
          animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        />

        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#8FBC8F]/0 group-hover:border-[#8FBC8F]/60 transition-colors duration-500" />
        <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[#8FBC8F]/0 group-hover:border-[#8FBC8F]/60 transition-colors duration-500" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-[#8FBC8F]/0 group-hover:border-[#8FBC8F]/60 transition-colors duration-500" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#8FBC8F]/0 group-hover:border-[#8FBC8F]/60 transition-colors duration-500" />

        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
          <motion.div
            initial={{ y: 20 }}
            animate={isHovered ? { y: 0 } : { y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="serif text-2xl sm:text-3xl text-white mb-2">{title}</h3>
            <motion.p
              className="text-white/60 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {description}
            </motion.p>
          </motion.div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          initial={{ x: '-200%' }}
          animate={isHovered ? { x: '200%' } : { x: '-200%' }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
};

// Interactive Carousel for Philosophy Principles
const PhilosophyCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const principles = [
    {
      icon: <Leaf size={40} />,
      title: "Armonía",
      subtitle: "Con la Naturaleza",
      description: "Cada espacio diseñado para fluir con el entorno natural, creando una simbiosis perfecta entre arquitectura y paisaje. Respetamos cada árbol, cada brisa, cada rayo de sol.",
      color: "#8FBC8F",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
    },
    {
      icon: <Sparkles size={40} />,
      title: "Exclusividad",
      subtitle: "Sin Precedentes",
      description: "Solo 90 familias selectas compartirán este santuario privado, garantizando privacidad absoluta y una comunidad de alto nivel que comparte valores y estilo de vida.",
      color: "#D4AF37",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
    },
    {
      icon: <Mountain size={40} />,
      title: "Legado",
      subtitle: "Para Generaciones",
      description: "Una inversión que trasciende el tiempo, creando un patrimonio de valor creciente para las futuras generaciones. Tu familia merece un lugar que perdure.",
      color: "#8FBC8F",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop"
    }
  ];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => {
      if (newDirection === 1) {
        return prev === principles.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? principles.length - 1 : prev - 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <section className="py-20 sm:py-32 bg-[#0f1c15] relative overflow-hidden">
      {/* Background */}
      <OrganicShape className="w-96 h-96 -top-48 -left-48" delay={0} duration={25} />
      <OrganicShape className="w-64 h-64 bottom-0 -right-32" delay={5} duration={20} color="#D4AF37" />

      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-[#8FBC8F] text-sm uppercase tracking-widest mb-4 block">Filosofía</span>
            <h2 className="serif text-4xl sm:text-5xl md:text-6xl text-white">
              Nuestros Principios
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Main Carousel */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[500px]">
            {/* Image Side */}
            <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden order-2 lg:order-1">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={activeIndex}
                  src={principles[activeIndex].image}
                  alt={principles[activeIndex].title}
                  className="absolute inset-0 w-full h-full object-cover"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c15]/60 to-transparent" />

              {/* Number indicator */}
              <div className="absolute bottom-6 left-6 flex items-center gap-4">
                <span className="text-6xl font-light text-white/20 serif">0{activeIndex + 1}</span>
                <div className="h-[1px] w-12 bg-white/20" />
                <span className="text-white/40">0{principles.length}</span>
              </div>
            </div>

            {/* Content Side */}
            <div className="relative order-1 lg:order-2">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
                    style={{ backgroundColor: `${principles[activeIndex].color}20` }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <div style={{ color: principles[activeIndex].color }}>
                      {principles[activeIndex].icon}
                    </div>
                  </motion.div>

                  <h3 className="serif text-5xl sm:text-6xl md:text-7xl text-white mb-3 leading-none">
                    {principles[activeIndex].title}
                  </h3>

                  <p className="text-xl sm:text-2xl text-[#8FBC8F] italic mb-6">
                    {principles[activeIndex].subtitle}
                  </p>

                  <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
                    {principles[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => paginate(-1)}
                  className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#8FBC8F] hover:text-[#8FBC8F] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft size={24} />
                </motion.button>

                <motion.button
                  onClick={() => paginate(1)}
                  className="w-14 h-14 rounded-full bg-[#8FBC8F] flex items-center justify-center text-[#0f1c15]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight size={24} />
                </motion.button>

                {/* Dots */}
                <div className="flex gap-2 ml-4">
                  {principles.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => {
                        setDirection(i > activeIndex ? 1 : -1);
                        setActiveIndex(i);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === activeIndex ? 'w-8 bg-[#8FBC8F]' : 'bg-white/20 hover:bg-white/40'
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const About: React.FC = () => {
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);

  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  const pillars = [
    {
      icon: <Sun size={28} />,
      title: "Luz Natural",
      description: "Orientación estudiada para maximizar la iluminación natural en cada lote, creando espacios llenos de vida y reduciendo el consumo energético.",
      number: "01"
    },
    {
      icon: <Wind size={28} />,
      title: "Ventilación Cruzada",
      description: "Diseño que aprovecha las brisas naturales del valle de Tangay para un confort térmico permanente sin necesidad de climatización artificial.",
      number: "02"
    },
    {
      icon: <Droplets size={28} />,
      title: "Gestión del Agua",
      description: "Sistemas sostenibles de captación y riego que respetan el equilibrio del ecosistema local y garantizan áreas verdes exuberantes.",
      number: "03"
    },
    {
      icon: <Shield size={28} />,
      title: "Seguridad Integral",
      description: "Perímetro controlado con tecnología de punta y acceso exclusivo que garantiza la tranquilidad absoluta de todas las familias.",
      number: "04"
    }
  ];

  const values = [
    {
      title: "Transparencia",
      description: "Cada documento, cada plano, cada decisión compartida con claridad absoluta.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
    },
    {
      title: "Pasión",
      description: "Diseñamos entornos que nosotros mismos habitaríamos con orgullo.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
    },
    {
      title: "Solidez",
      description: "Respaldo financiero y legal que garantiza cada etapa del proyecto.",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-[#f4f5f0] overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-[#0f1c15] overflow-hidden"
      >
        {/* Animated organic background */}
        <div className="absolute inset-0 overflow-hidden">
          <OrganicShape className="w-[600px] h-[600px] -top-64 -left-64" delay={0} duration={30} />
          <OrganicShape className="w-[500px] h-[500px] top-1/3 -right-48" delay={3} duration={25} color="#D4AF37" />
          <OrganicShape className="w-[400px] h-[400px] -bottom-32 left-1/4" delay={6} duration={28} />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1c15]/80 via-transparent to-[#0f1c15]/80" />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#8FBC8F]/10 border border-[#8FBC8F]/30 rounded-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Heart size={14} className="text-[#8FBC8F]" />
            <span className="text-[#8FBC8F] text-sm tracking-widest uppercase">Nuestra Esencia</span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            className="serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-8 leading-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="block">Filosofía</span>
            <motion.span
              className="block text-[#8FBC8F] italic"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              de Vida
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Más que un desarrollo inmobiliario, <span className="text-[#8FBC8F]">Sol de Tangay</span> es
            una declaración de principios. Una invitación a vivir en armonía perfecta con la naturaleza.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-xs text-white/40 uppercase tracking-widest">Descubre más</span>
            <motion.div
              className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-[#8FBC8F] rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 sm:py-32 bg-[#0f1c15] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h100v100H0z%22 fill=%22none%22/%3E%3Cpath d=%22M0 50h100M50 0v100%22 stroke=%22%238FBC8F%22 stroke-opacity=%22.03%22/%3E%3C/svg%3E')] bg-[length:100px_100px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            <AnimatedCounter value={5} suffix=" Ha" label="Extensión Total" delay={0} />
            <AnimatedCounter value={90} label="Lotes Exclusivos" delay={0.1} />
            <AnimatedCounter value={250} suffix=" m²" label="Por Lote" delay={0.2} />
            <AnimatedCounter value={56} suffix="%" label="Área Residencial" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Interactive Philosophy Carousel */}
      <PhilosophyCarousel />

      {/* Expandable Pillars Section */}
      <section className="py-20 sm:py-32 bg-[#0f1c15] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8FBC8F]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[#8FBC8F] text-sm uppercase tracking-widest mb-4 block">Fundamentos</span>
              <h2 className="serif text-4xl sm:text-5xl md:text-6xl text-white mb-6">
                Pilares del Diseño
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Toca cada pilar para descubrir cómo cada decisión arquitectónica
                prioriza tu bienestar.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {pillars.map((pillar, i) => (
              <ExpandablePillar
                key={i}
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
                number={pillar.number}
                index={i}
                isExpanded={expandedPillar === i}
                onToggle={() => setExpandedPillar(expandedPillar === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Split */}
      <section className="relative bg-[#f4f5f0]">
        <div className="grid lg:grid-cols-2">
          {/* Mission */}
          <div className="relative bg-[#0f1c15] text-white p-12 sm:p-16 lg:p-24 min-h-[60vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
            <OrganicShape className="w-80 h-80 -top-40 -right-40 opacity-50" delay={0} duration={25} />

            <Reveal>
              <div className="relative z-10">
                <span className="text-[#8FBC8F] text-8xl sm:text-9xl font-serif block mb-6 opacity-20">I</span>
                <h2 className="serif text-4xl sm:text-5xl mb-6 -mt-16">La Misión</h2>
                <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
                  Desarrollar proyectos inmobiliarios de campo exclusivos que promuevan
                  un estilo de vida en perfecta armonía con la naturaleza y la comunidad.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Exclusividad', 'Armonía', 'Comunidad'].map((tag, i) => (
                    <motion.span
                      key={i}
                      className="px-4 py-2 border border-[#8FBC8F]/30 rounded-full text-sm text-[#8FBC8F] cursor-pointer hover:bg-[#8FBC8F]/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Vision */}
          <div className="relative bg-[#f4f5f0] text-[#0f1c15] p-12 sm:p-16 lg:p-24 min-h-[60vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#8FBC8F]/10 rounded-full blur-3xl" />

            <Reveal>
              <div className="relative z-10">
                <span className="text-[#8FBC8F] text-8xl sm:text-9xl font-serif block mb-6 opacity-20">II</span>
                <h2 className="serif text-4xl sm:text-5xl mb-6 -mt-16">La Visión</h2>
                <p className="text-[#0f1c15]/60 text-lg leading-relaxed mb-8 max-w-md">
                  Ser la desarrolladora líder nacional, reconocida por la excelencia
                  en el diseño de entornos sostenibles que elevan la calidad de vida.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: 'Confiabilidad', desc: 'Valores sólidos' },
                    { title: 'Impacto', desc: 'Cambio real' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-[#0f1c15]/50">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-32 bg-[#f4f5f0]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16 sm:mb-20">
              <span className="text-[#8FBC8F] text-sm uppercase tracking-widest mb-4 block">Cultura</span>
              <h2 className="serif text-4xl sm:text-5xl md:text-6xl text-[#0f1c15] mb-6">
                Valores que nos Definen
              </h2>
              <p className="text-lg text-[#0f1c15]/60 max-w-2xl mx-auto">
                Cada acción, cada decisión está guiada por principios inquebrantables
                que garantizan la excelencia en todo lo que hacemos.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, i) => (
              <ValueCard
                key={i}
                title={value.title}
                description={value.description}
                image={value.image}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-[#0f1c15] relative overflow-hidden">
        <div className="absolute inset-0">
          <OrganicShape className="w-[500px] h-[500px] -top-64 left-1/4" delay={0} duration={30} />
          <OrganicShape className="w-[400px] h-[400px] -bottom-48 right-1/4" delay={5} duration={25} color="#D4AF37" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              ¿Listo para ser parte de
              <span className="block text-[#8FBC8F]">nuestra filosofía?</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/50 mb-10 max-w-2xl mx-auto">
              Únete a las 90 familias que vivirán en armonía con la naturaleza
              en el exclusivo Sol de Tangay Club de Campo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contacto"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#8FBC8F] text-[#0f1c15] rounded-full text-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Contactar Ahora</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
              <motion.a
                href="#masterplan"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white rounded-full text-lg hover:border-[#8FBC8F]/50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver Masterplan
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
