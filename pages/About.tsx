import React from 'react';
import { Reveal, ParallaxImage } from '../components/Reveal';

export const About: React.FC = () => {
  return (
    <div className="w-full bg-[#f4f5f0] pt-24 pb-20">
      
      <section className="container mx-auto px-6 mb-24">
         <Reveal>
            <h1 className="serif text-6xl md:text-9xl text-[#0f1c15] mb-8 leading-none">
               Nuestra<br/><span className="italic text-[#8FBC8F]">Esencia</span>
            </h1>
         </Reveal>
         <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl leading-relaxed font-light">
               <strong className="text-[#0f1c15]">SOL DE TANGAY SAC</strong> no construye casas. Materializamos refugios. Somos una desarrolladora especializada en redefinir la calidad de vida a través de una conexión inquebrantable con la naturaleza.
            </p>
         </Reveal>
      </section>

      {/* Split Screen Vision */}
      <section className="grid md:grid-cols-2 h-auto min-h-screen">
         <div className="bg-[#0f1c15] text-[#f4f5f0] p-12 md:p-24 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
               <span className="text-[#8FBC8F] text-6xl mb-8 block font-serif">I.</span>
               <h2 className="serif text-4xl mb-6">La Misión</h2>
               <p className="text-gray-400 mb-8 leading-relaxed">
                  Desarrollar proyectos inmobiliarios de campo exclusivos que promuevan un estilo de vida en armonía.
               </p>
               <ul className="space-y-4 font-light text-sm tracking-wide">
                  <li className="flex items-baseline gap-4 border-b border-white/10 pb-4">
                     <span className="text-[#8FBC8F]">01</span>
                     Lotes de campo que inspiran descanso.
                  </li>
                  <li className="flex items-baseline gap-4 border-b border-white/10 pb-4">
                     <span className="text-[#8FBC8F]">02</span>
                     Transparencia radical en gestión.
                  </li>
                  <li className="flex items-baseline gap-4 border-b border-white/10 pb-4">
                     <span className="text-[#8FBC8F]">03</span>
                     Plusvalía garantizada.
                  </li>
               </ul>
            </div>
         </div>
         
         <div className="relative bg-[#e8ebe4] text-[#0f1c15] p-12 md:p-24 flex flex-col justify-center">
            <div className="relative z-10">
               <span className="text-[#0f1c15] text-6xl mb-8 block font-serif">II.</span>
               <h2 className="serif text-4xl mb-6">La Visión</h2>
               <p className="text-gray-600 mb-8 leading-relaxed">
                  Ser la desarrolladora líder nacional, reconocida por la excelencia en el diseño de entornos sostenibles.
               </p>
               <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-sm shadow-sm">
                     <h4 className="font-bold mb-2">Confiabilidad</h4>
                     <p className="text-xs text-gray-500">Valores sólidos como cimientos.</p>
                  </div>
                  <div className="bg-white p-6 rounded-sm shadow-sm">
                     <h4 className="font-bold mb-2">Impacto</h4>
                     <p className="text-xs text-gray-500">Mejora real en la calidad de vida.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Team Section */}
      <section className="py-24 container mx-auto px-6">
         <Reveal>
            <h2 className="serif text-4xl mb-16 text-center">Cultura de Responsabilidad</h2>
         </Reveal>
         <div className="grid md:grid-cols-3 gap-12">
            {[
               { title: "Transparencia", text: "Cada documento, cada plano, a su disposición." },
               { title: "Pasión", text: "Diseñamos entornos que nosotros mismos habitaríamos." },
               { title: "Solidez", text: "Respaldo financiero y legal en cada etapa." }
            ].map((item, i) => (
               <Reveal delay={i * 0.2} key={i}>
                  <div className="text-center group">
                     <div className="w-full h-[300px] mb-6 overflow-hidden rounded-sm relative">
                        <img 
                           src={`https://picsum.photos/seed/${i+10}/600/800?grayscale`} 
                           alt="Value" 
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-[#0f1c15]/20 group-hover:bg-transparent transition-colors"></div>
                     </div>
                     <h3 className="serif text-2xl mb-2">{item.title}</h3>
                     <p className="text-gray-500 text-sm">{item.text}</p>
                  </div>
               </Reveal>
            ))}
         </div>
      </section>
    </div>
  );
};