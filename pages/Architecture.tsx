import React from 'react';
import { Reveal, ParallaxImage } from '../components/Reveal';

export const Architecture: React.FC = () => {
  return (
    <div className="pt-24 bg-[#f4f5f0]">
      <div className="container mx-auto px-6 mb-20">
         <Reveal>
            <h1 className="serif text-6xl md:text-8xl text-[#0f1c15] mb-6">Masterplan</h1>
            <p className="text-xl max-w-2xl text-gray-600">
               Diseñado por el Arq. Melvin Gonzales Puertas y el Ing. Henry Velásquez.
               Una simbiosis entre la ingeniería civil y el respeto por el paisaje.
            </p>
         </Reveal>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mb-24">
         <div className="md:mt-24">
             <Reveal delay={0.2}>
               <ParallaxImage src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2574&auto=format&fit=crop" height="600px" className="mb-4 rounded-lg" />
               <h3 className="serif text-2xl">Club House</h3>
               <p className="text-sm text-gray-500">Centro de la vida social.</p>
             </Reveal>
         </div>
         <div>
             <Reveal delay={0.4}>
               <ParallaxImage src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop" height="500px" className="mb-4 rounded-lg" />
               <h3 className="serif text-2xl">Lotes Residenciales</h3>
               <p className="text-sm text-gray-500">Privacidad y vistas garantizadas.</p>
             </Reveal>
             <Reveal delay={0.6}>
               <div className="mt-4 bg-[#0f1c15] text-white p-8 rounded-lg">
                  <h3 className="serif text-3xl mb-4 text-[#8FBC8F]">Cronograma</h3>
                  <div className="space-y-6 border-l border-gray-700 pl-6">
                     <div className="relative">
                        <span className="absolute -left-[31px] top-1 w-3 h-3 bg-[#8FBC8F] rounded-full"></span>
                        <p className="text-xs uppercase text-gray-400 mb-1">Fase 1 - 80%</p>
                        <p className="serif text-xl">Lotización y Cercado</p>
                     </div>
                     <div className="relative opacity-50">
                        <span className="absolute -left-[31px] top-1 w-3 h-3 bg-gray-500 rounded-full"></span>
                        <p className="text-xs uppercase text-gray-400 mb-1">Fase 2 - Q4 2024</p>
                        <p className="serif text-xl">Vías Internas & Pórtico</p>
                     </div>
                  </div>
               </div>
             </Reveal>
         </div>
      </div>
    </div>
  );
};