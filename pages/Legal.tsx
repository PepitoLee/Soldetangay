import React, { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Scale, FileCheck, Building, ChevronRight, Download } from 'lucide-react';

export const Legal: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="pt-24 min-h-screen bg-[#f4f5f0] text-[#0f1c15]">
      <div className="container mx-auto px-6 mb-16">
         <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8FBC8F] mb-4 block">Transparencia Total</span>
            <h1 className="serif text-5xl md:text-7xl mb-8">Marco Legal</h1>
            <p className="text-xl text-gray-600 max-w-3xl font-light">
               En SOL DE TANGAY SAC, la confiabilidad no es una promesa, es un hecho documentado. Inversión 100% segura bajo la supervisión del Dr. Santos Rebaza.
            </p>
         </Reveal>
      </div>

      <section className="bg-white py-20 border-y border-gray-200">
         <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 space-y-2">
               {['Título de Propiedad', 'Registros Públicos', 'Documentación'].map((item, idx) => (
                  <button 
                     key={idx}
                     onClick={() => setActiveSection(idx)}
                     className={`w-full text-left p-6 flex justify-between items-center transition-all duration-300 ${activeSection === idx ? 'bg-[#0f1c15] text-white' : 'hover:bg-gray-100 text-gray-500'}`}
                  >
                     <span className="serif text-xl">{item}</span>
                     <ChevronRight size={16} className={activeSection === idx ? 'opacity-100' : 'opacity-0'} />
                  </button>
               ))}
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8 bg-[#f9f9f9] p-12 rounded-sm min-h-[400px] flex flex-col justify-center">
               <Reveal key={activeSection} direction="left">
                  {activeSection === 0 && (
                     <div>
                        <Scale className="w-12 h-12 text-[#8FBC8F] mb-6" />
                        <h2 className="serif text-3xl mb-4">Propiedad Formalizada</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                           Nuestro proyecto cuenta con el Título de Propiedad de Campo debidamente saneado. 
                           No vendemos posesiones, vendemos propiedad real y transferible.
                        </p>
                        <div className="inline-block bg-[#e8ebe4] px-4 py-2 rounded text-xs uppercase tracking-widest font-bold">
                           Estatus: Saneado
                        </div>
                     </div>
                  )}
                  {activeSection === 1 && (
                     <div>
                        <Building className="w-12 h-12 text-[#8FBC8F] mb-6" />
                        <h2 className="serif text-3xl mb-4">Inscripción en SUNARP</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                           La propiedad se encuentra inscrita en los Registros Públicos, brindando la máxima seguridad jurídica 
                           ante cualquier entidad financiera o legal.
                        </p>
                        <div className="inline-block bg-[#e8ebe4] px-4 py-2 rounded text-xs uppercase tracking-widest font-bold">
                           Partida: 1100XXXX
                        </div>
                     </div>
                  )}
                  {activeSection === 2 && (
                     <div>
                        <FileCheck className="w-12 h-12 text-[#8FBC8F] mb-6" />
                        <h2 className="serif text-3xl mb-4">Entrega Documentada</h2>
                        <ul className="space-y-4 text-gray-600 mb-8">
                           <li className="flex items-center gap-3">
                              <span className="w-2 h-2 bg-[#0f1c15] rounded-full"></span> Contrato de Compra y Venta
                           </li>
                           <li className="flex items-center gap-3">
                              <span className="w-2 h-2 bg-[#0f1c15] rounded-full"></span> Memoria Descriptiva del Lote
                           </li>
                           <li className="flex items-center gap-3">
                              <span className="w-2 h-2 bg-[#0f1c15] rounded-full"></span> Cronograma de Pagos Claro
                           </li>
                        </ul>
                        <button className="flex items-center gap-2 bg-[#0f1c15] text-white px-6 py-3 rounded hover:bg-[#8FBC8F] hover:text-[#0f1c15] transition-colors">
                           <Download size={16} /> Descargar Kit Legal (Muestra)
                        </button>
                     </div>
                  )}
               </Reveal>
            </div>
         </div>
      </section>
    </div>
  );
};