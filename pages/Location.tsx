import React, { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { MapPin, Search, Loader2, ArrowRight, Compass } from 'lucide-react';
import { askAboutLocation } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const Location: React.FC = () => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [groundingLinks, setGroundingLinks] = useState<any[]>([]);

  const handleAiSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query) return;
    setLoading(true);
    setAiResponse('');
    setGroundingLinks([]);
    
    try {
      const response = await askAboutLocation(query);
      setAiResponse(response.text || "No se encontró información.");
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) setGroundingLinks(chunks);
    } catch (error) {
      setAiResponse("Error de conexión con el sistema de análisis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1c15] text-[#f4f5f0] pt-24">
      
      {/* Header */}
      <div className="container mx-auto px-6 mb-12">
         <Reveal>
            <h1 className="serif text-6xl md:text-8xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#f4f5f0] to-[#8FBC8F]">
               Coordenadas
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
               <p className="max-w-xl text-gray-400 text-lg">
                  Tangay Bajo, Nuevo Chimbote. A 1 min de Av. Anchoveta y 2 min de Vía de Evitamiento. Vista panorámica de toda la ciudad.
               </p>
               <a href="https://maps.app.goo.gl/kLgiQUdh6aRvkoyD9?g_st=ipc" target="_blank" rel="noreferrer" className="mt-6 md:mt-0 flex items-center gap-2 text-[#8FBC8F] uppercase tracking-widest text-xs hover:underline">
                  Abrir Google Maps Externo <ArrowRight size={14} />
               </a>
            </div>
         </Reveal>
      </div>

      {/* Interactive Grid */}
      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-8 mb-20">
         
         {/* Map Container (Left) */}
         <div className="lg:col-span-8 h-[60vh] bg-[#1a2e1a] rounded-2xl overflow-hidden relative border border-white/10 group">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6666.66!2d-78.536!3d-9.119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDcnMDguNCJTIDc4wrAzMicwOS42Ilc!5e0!3m2!1sen!2spe!4v1600000000000!5m2!1sen!2spe" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen 
                loading="lazy" 
                className="opacity-60 group-hover:opacity-100 transition-opacity duration-700 invert-[0.85] hue-rotate-180 contrast-125"
                title="Mapa"
            ></iframe>
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded text-xs font-mono text-[#8FBC8F] border border-[#8FBC8F]/30">
               LAT: -9.119 | LONG: -78.536
            </div>
         </div>

         {/* AI Interface (Right) */}
         <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#132219] border border-white/10 rounded-2xl p-6 flex-grow flex flex-col">
               <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                  <div className="w-2 h-2 bg-[#8FBC8F] rounded-full animate-pulse"></div>
                  <span className="text-xs uppercase tracking-widest font-bold text-[#8FBC8F]">Gemini Location Intelligence</span>
               </div>
               
               <div className="flex-grow overflow-y-auto max-h-[300px] mb-4 text-sm text-gray-300 space-y-4 scrollbar-thin">
                  {aiResponse ? (
                     <div className="animate-fade-in">
                        <ReactMarkdown>{aiResponse}</ReactMarkdown>
                        {groundingLinks.length > 0 && (
                           <div className="mt-4 pt-4 border-t border-white/10">
                              <p className="text-xs text-gray-500 mb-2">REFERENCIAS DETECTADAS:</p>
                              {groundingLinks.map((chunk, i) => (
                                 <a key={i} href={chunk.web?.uri || chunk.maps?.uri} target="_blank" rel="noreferrer" className="block text-[#8FBC8F] text-xs truncate hover:underline mb-1">
                                    → {chunk.web?.title || chunk.maps?.title || "Ubicación"}
                                 </a>
                              ))}
                           </div>
                        )}
                     </div>
                  ) : (
                     <div className="text-gray-600 italic text-center mt-10">
                        <Compass size={48} className="mx-auto mb-4 opacity-20" />
                        "Analice el entorno. Pregunte por colegios, seguridad o plusvalía."
                     </div>
                  )}
               </div>

               <form onSubmit={handleAiSearch} className="relative">
                  <input 
                     type="text" 
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     placeholder="Ej: Distancia a Plaza Mayor..."
                     className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8FBC8F] text-white placeholder-gray-600"
                  />
                  <button type="submit" disabled={loading} className="absolute right-2 top-2 p-1 text-[#8FBC8F] hover:text-white disabled:opacity-50">
                     {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
                  </button>
               </form>
            </div>

            <div className="bg-[#8FBC8F] text-[#0f1c15] p-6 rounded-2xl">
               <h3 className="serif text-xl mb-2">Agenda tu visita</h3>
               <p className="text-sm opacity-80 mb-4">Te llevamos al terreno.</p>
               <button className="w-full bg-[#0f1c15] text-white py-3 rounded-lg uppercase text-xs font-bold tracking-widest hover:bg-black transition-colors">
                  Contactar Asesor
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};