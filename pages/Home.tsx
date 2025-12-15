import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Reveal, TextReveal, ParallaxImage } from '../components/Reveal';
import { MasterPlan } from '../components/MasterPlan';
import { DreamHouseGenerator } from '../components/DreamHouseGenerator';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Clock, TrendingUp, Shield, TreePine } from 'lucide-react';
import { PageRoute } from '../types';

const HorizontalSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  const cards = [
    {
      title: "Naturaleza",
      subtitle: "Protagonista Absoluta",
      desc: "Espacios donde cada árbol cuenta una historia. 60% de áreas verdes preservadas.",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532&auto=format&fit=crop"
    },
    {
      title: "Arquitectura",
      subtitle: "Fusión Orgánica",
      desc: "Diseño que respeta la topografía. Materiales locales, estética global.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Comunidad",
      subtitle: "Selecta & Segura",
      desc: "Un entorno blindado para la paz mental de su familia.",
      img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#0f1c15] text-[#f4f5f0]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          {cards.map((card, i) => (
            <div key={i} className="relative h-screen w-screen flex-shrink-0 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 z-0">
                 <img src={card.img} alt={card.title} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[2s]" />
                 <div className="absolute inset-0 bg-gradient-to-b from-[#0f1c15]/20 via-transparent to-[#0f1c15]"></div>
              </div>
              <div className="relative z-10 max-w-4xl px-6">
                <span className="text-[#8FBC8F] text-sm uppercase tracking-[0.5em] mb-4 block">0{i + 1} — {card.title}</span>
                <h2 className="serif text-6xl md:text-8xl mb-8">{card.subtitle}</h2>
                <p className="text-xl md:text-2xl text-gray-300 max-w-lg font-light leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const Home: React.FC = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="w-full bg-[#f4f5f0]">
      
      {/* 1. IMMERSIVE HERO */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ scale }} className="absolute inset-0 z-0">
          <img
            src="/hero-home.png"
            alt="Sol de Tangay Hero"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </motion.div>
        
        <motion.div style={{ opacity, y: yText }} className="relative z-10 text-center text-white px-4 mix-blend-overlay">
          <h1 className="cinzel text-[12vw] leading-none font-bold tracking-tighter opacity-90">
            SOL DE<br/>TANGAY
          </h1>
          <p className="mt-6 text-xl uppercase tracking-[0.3em] font-light">El Refugio Perfecto</p>
        </motion.div>

        <div className="absolute bottom-10 left-10 text-white z-20 flex flex-col gap-2">
           <span className="text-xs uppercase tracking-widest opacity-70">Ubicación</span>
           <span className="serif text-xl">Nuevo Chimbote</span>
        </div>

        <div className="absolute bottom-10 right-10 text-white z-20 animate-bounce">
          <ArrowRight className="rotate-90 w-6 h-6" />
        </div>
      </section>

      {/* 2. NARRATIVE INTRODUCTION (Sticky Scrolling) */}
      <section className="py-32 px-6 md:px-20 bg-[#f4f5f0] text-[#0f1c15]">
        <div className="max-w-6xl mx-auto">
          <Reveal width="100%">
            <div className="grid md:grid-cols-12 gap-12 items-start">
               <div className="md:col-span-4">
                  <span className="block w-full h-[1px] bg-[#0f1c15] mb-6"></span>
                  <span className="text-xs font-bold uppercase tracking-widest">Manifiesto</span>
               </div>
               <div className="md:col-span-8">
                  <h2 className="serif text-4xl md:text-6xl leading-tight mb-12">
                    <TextReveal text="No vendemos metros cuadrados. Creamos un legado de armonía, silencio y plusvalía." />
                  </h2>
                  <div className="grid md:grid-cols-2 gap-12 text-lg font-light text-gray-600">
                     <p>
                       SOL DE TANGAY SAC nace con el propósito de redefinir la inversión patrimonial. 
                       No es solo un club de campo; es una declaración de principios donde la naturaleza dicta las reglas.
                     </p>
                     <p>
                       Nos distinguimos por una cultura de responsabilidad radical. Transparencia financiera, legalidad absoluta 
                       y un diseño que honra el entorno.
                     </p>
                  </div>
                  <div className="mt-12">
                     <Link to={PageRoute.ABOUT} className="inline-block border-b border-[#0f1c15] pb-1 text-[#0f1c15] uppercase tracking-widest text-xs hover:text-[#8FBC8F] hover:border-[#8FBC8F] transition-all">
                        Leer Nuestra Historia
                     </Link>
                  </div>
               </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. HORIZONTAL SCROLL EXPERIENCE */}
      <HorizontalSection />

      {/* 4. LOCATION TEASER (Parallax & Dark) */}
      <section className="relative bg-[#0f1c15] text-white py-32 overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8FBC8F] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div>
                  <Reveal direction="right">
                     <span className="text-[#8FBC8F] text-xs uppercase tracking-widest mb-6 block">La Ubicación</span>
                     <h2 className="serif text-5xl md:text-7xl mb-8">Campo &<br/>Ciudad</h2>
                     <p className="text-gray-400 text-xl mb-12 max-w-md">
                        A solo 2 minutos de la civilización, pero a años luz del ruido. Estratégicamente posicionado para maximizar su tiempo y su inversión.
                     </p>
                     
                     <div className="space-y-6 mb-12">
                        <div className="flex items-center gap-6 group cursor-pointer">
                           <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#8FBC8F] group-hover:text-black transition-all">
                              <Clock size={20} />
                           </div>
                           <div>
                              <h4 className="uppercase tracking-widest text-sm">2 Minutos</h4>
                              <p className="text-gray-500 text-sm">Conexión Urbana Inmediata</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6 group cursor-pointer">
                           <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#8FBC8F] group-hover:text-black transition-all">
                              <TrendingUp size={20} />
                           </div>
                           <div>
                              <h4 className="uppercase tracking-widest text-sm">Plusvalía</h4>
                              <p className="text-gray-500 text-sm">Av. Anchoveta y Vía de Evitamiento</p>
                           </div>
                        </div>
                     </div>

                     <Link to={PageRoute.LOCATION} className="bg-[#f4f5f0] text-[#0f1c15] px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#8FBC8F] transition-all">
                        Explorar Mapa
                     </Link>
                  </Reveal>
               </div>
               
               <div className="relative h-[600px] w-full">
                  <ParallaxImage 
                     src="https://images.unsplash.com/photo-1449824913929-65aa06cf04a4?q=80&w=2225&auto=format&fit=crop" 
                     height="100%" 
                     className="rounded-lg grayscale hover:grayscale-0 transition-all duration-700" 
                  />
                  <div className="absolute -bottom-10 -left-10 bg-[#f4f5f0] p-8 text-[#0f1c15] max-w-xs hidden md:block shadow-2xl">
                     <p className="serif text-xl italic">"El secreto de la inversión inmobiliaria es ver el futuro antes de que sea evidente."</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. INVESTMENT DATA (Grid) */}
      <section className="py-32 px-6 bg-[#e8ebe4]">
         <div className="container mx-auto">
            <Reveal>
               <h2 className="serif text-4xl md:text-5xl text-center mb-20 text-[#0f1c15]">¿Por qué Sol de Tangay?</h2>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0f1c15]/10 border border-[#0f1c15]/10">
               {[
                  { title: "Legalidad", desc: "Título de Propiedad inscrito en Registros Públicos. Sin sorpresas.", icon: <Shield /> },
                  { title: "Diseño", desc: "Masterplan desarrollado por el Arq. Melvin Gonzales Puertas.", icon: <TreePine /> },
                  { title: "Rentabilidad", desc: "Proyección de retorno superior al 20% anual por desarrollo vial.", icon: <TrendingUp /> }
               ].map((item, i) => (
                  <div key={i} className="bg-[#e8ebe4] p-12 hover:bg-[#f4f5f0] transition-colors group">
                     <div className="text-[#0f1c15] mb-6 opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110 origin-left duration-300">
                        {item.icon}
                     </div>
                     <h3 className="serif text-2xl mb-4 text-[#0f1c15]">{item.title}</h3>
                     <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. INTERACTIVE MASTER PLAN */}
      <section className="relative z-20 bg-[#f4f5f0]">
         <MasterPlan />
      </section>

      {/* 7. VEO AI GENERATOR (New Section) */}
      <section className="py-32 px-6 bg-[#0f1c15]">
         <div className="container mx-auto max-w-6xl">
            <Reveal>
               <DreamHouseGenerator />
            </Reveal>
         </div>
      </section>

      {/* 8. CTA / FOOTER PREVIEW */}
      <section className="h-screen flex items-center justify-center bg-[#0f1c15] text-[#f4f5f0] relative overflow-hidden">
         <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Background" />
         <div className="relative z-10 text-center max-w-3xl px-6">
            <Reveal direction="up">
               <h2 className="serif text-5xl md:text-7xl mb-8">Su Patrimonio,<br/>Nuestra Prioridad.</h2>
               <p className="text-xl text-gray-400 mb-12 font-light">
                  Inicie hoy el proceso para asegurar su lote en el proyecto más exclusivo de Nuevo Chimbote.
               </p>
               <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <button 
                     onClick={() => window.open('https://wa.me/51973068950?text=Hola%20*Sol%20de%20Tangay*,%20quisiera%20solicitar%20una%20cotizaci%C3%B3n%20general%20y%20conocer%20la%20disponibilidad%20actual.', '_blank')}
                     className="px-10 py-5 bg-[#f4f5f0] text-[#0f1c15] rounded-full uppercase tracking-widest font-bold hover:scale-105 transition-transform"
                  >
                     Solicitar Cotización
                  </button>
                  <a href="https://maps.app.goo.gl/kLgiQUdh6aRvkoyD9?g_st=ipc" target="_blank" rel="noreferrer" className="px-10 py-5 border border-[#f4f5f0] text-[#f4f5f0] rounded-full uppercase tracking-widest font-bold hover:bg-[#f4f5f0] hover:text-[#0f1c15] transition-all">
                     Ver Ubicación
                  </a>
               </div>
            </Reveal>
         </div>
      </section>

    </div>
  );
};
