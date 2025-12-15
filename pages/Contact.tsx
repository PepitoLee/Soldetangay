import React, { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f1c15] text-[#f4f5f0] flex items-center justify-center pt-24">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
         
         <div>
            <Reveal>
               <span className="text-[#8FBC8F] uppercase tracking-[0.3em] text-xs font-bold mb-6 block">Oportunidad Limitada</span>
               <h1 className="serif text-6xl md:text-8xl mb-8 leading-none">Inicie su<br/>Legado.</h1>
               <p className="text-xl text-gray-400 font-light leading-relaxed mb-12 max-w-md">
                  Nuestro equipo comercial está listo para presentarle las mejores ubicaciones disponibles.
               </p>
               
               <div className="space-y-8 border-t border-white/10 pt-8">
                  <div>
                     <p className="text-xs uppercase text-gray-500 mb-2">Gerencia Comercial</p>
                     <p className="serif text-2xl">Juan Pérez</p>
                  </div>
                  <div>
                     <p className="text-xs uppercase text-gray-500 mb-2">Contacto Directo</p>
                     <p className="serif text-2xl">+51 999 999 999</p>
                  </div>
               </div>
            </Reveal>
         </div>

         <div className="bg-[#1a2e1a] p-10 md:p-16 rounded-3xl border border-white/5">
            <Reveal direction="up" delay={0.2}>
               <form className="space-y-8">
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-[#8FBC8F]">Nombre</label>
                     <input type="text" className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-[#8FBC8F] transition-colors" placeholder="Su nombre completo" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-[#8FBC8F]">Email</label>
                     <input type="email" className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-[#8FBC8F] transition-colors" placeholder="correo@ejemplo.com" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-[#8FBC8F]">Interés</label>
                     <select className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-[#8FBC8F] transition-colors text-gray-400">
                        <option>Lote Residencial</option>
                        <option>Inversión</option>
                        <option>Visita Guiada</option>
                     </select>
                  </div>
                  
                  <button className="w-full bg-[#f4f5f0] text-[#0f1c15] py-6 rounded-full uppercase tracking-widest font-bold mt-8 hover:bg-[#8FBC8F] transition-colors flex items-center justify-center gap-4 group">
                     Enviar Solicitud <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
               </form>
            </Reveal>
         </div>

      </div>
    </div>
  );
};