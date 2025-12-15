import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateVeoVideo } from '../services/geminiService';
import { Sparkles, Play, Loader2, AlertCircle, Video } from 'lucide-react';

const SUGGESTIONS = [
  "Casa moderna minimalista de dos pisos con grandes ventanales y piscina infinita",
  "Cabaña rústica de lujo hecha de madera oscura y piedra con chimenea",
  "Villa estilo mediterráneo con paredes blancas, techo de tejas rojas y jardines florales",
  "Casa futurista sostenible con techos verdes y arquitectura orgánica"
];

export const DreamHouseGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingPhase, setLoadingPhase] = useState(0);
  
  // Animation for loading text
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setLoadingPhase(p => (p + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const getLoadingText = () => {
    switch (loadingPhase) {
      case 0: return "Interpretando diseño arquitectónico...";
      case 1: return "Calculando estructura ladrillo por ladrillo...";
      case 2: return "Renderizando entorno Sol de Tangay...";
      case 3: return "Finalizando detalles de iluminación 8K...";
      default: return "Generando...";
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);

    try {
      const url = await generateVeoVideo(prompt);
      setVideoUrl(url);
    } catch (err: any) {
      setError(err.message || "Error al generar el video. Intente nuevamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-[#0f1c15] border border-white/10 rounded-3xl shadow-2xl">
      {/* Background Ambient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8FBC8F] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="grid lg:grid-cols-12 gap-0 min-h-[600px]">
        
        {/* LEFT: Controls */}
        <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center relative z-10 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="mb-8">
                <h3 className="serif text-4xl md:text-5xl text-white mb-4 leading-none">
                    Visualiza tu<br/><span className="italic text-[#8FBC8F]">Casa Ideal</span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Describe tu sueño y nuestra IA construirá una visualización arquitectónica "ladrillo por ladrillo" en segundos, situada en Sol de Tangay.
                </p>
            </div>

            {/* Input Area */}
            <div className="space-y-6">
                <div className="relative">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ej: Casa de campo contemporánea con acabados en concreto expuesto..."
                        className="w-full bg-black/30 border border-white/20 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#8FBC8F] transition-all min-h-[120px] resize-none"
                        disabled={isGenerating}
                    />
                    <div className="absolute bottom-4 right-4">
                        <Sparkles size={16} className="text-[#8FBC8F] opacity-50" />
                    </div>
                </div>

                {/* Suggestions */}
                <div>
                    <span className="text-xs uppercase text-gray-500 mb-3 block">Sugerencias Rápidas</span>
                    <div className="flex flex-wrap gap-2">
                        {SUGGESTIONS.map((suggestion, i) => (
                            <button
                                key={i}
                                onClick={() => setPrompt(suggestion)}
                                disabled={isGenerating}
                                className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/5 rounded-full px-3 py-2 text-gray-300 transition-all text-left truncate max-w-full"
                            >
                                {suggestion.slice(0, 35)}...
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className={`
                        w-full py-4 rounded-xl uppercase text-xs font-bold tracking-[0.2em] flex items-center justify-center gap-3 transition-all
                        ${isGenerating ? 'bg-gray-800 text-gray-500 cursor-wait' : 'bg-[#f4f5f0] text-[#0f1c15] hover:bg-[#8FBC8F] hover:scale-[1.02]'}
                    `}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="animate-spin" size={16} /> Construyendo...
                        </>
                    ) : (
                        <>
                            <Play size={16} fill="currentColor" /> Generar Video
                        </>
                    )}
                </button>
                
                {error && (
                   <div className="flex items-center gap-2 text-red-400 text-xs bg-red-900/20 p-3 rounded-lg border border-red-900/50">
                      <AlertCircle size={14} />
                      {error}
                   </div>
                )}
            </div>
        </div>

        {/* RIGHT: Preview Area */}
        <div className="lg:col-span-7 bg-black relative overflow-hidden flex items-center justify-center min-h-[400px] lg:min-h-auto">
            <AnimatePresence mode='wait'>
                {videoUrl ? (
                    <motion.div 
                        key="video"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full h-full"
                    >
                        <video 
                            src={videoUrl} 
                            controls 
                            autoPlay 
                            loop 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                           <span className="text-[10px] text-white uppercase tracking-widest">Generado con Google Veo</span>
                        </div>
                    </motion.div>
                ) : isGenerating ? (
                    <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center p-8"
                    >
                        <div className="relative w-24 h-24 mx-auto mb-8">
                           <div className="absolute inset-0 border-t-2 border-[#8FBC8F] rounded-full animate-spin"></div>
                           <div className="absolute inset-2 border-r-2 border-white/30 rounded-full animate-spin duration-750"></div>
                           <div className="absolute inset-0 flex items-center justify-center">
                              <Sparkles className="text-[#8FBC8F] animate-pulse" />
                           </div>
                        </div>
                        <h4 className="serif text-2xl text-white mb-2">{getLoadingText()}</h4>
                        <p className="text-gray-500 text-xs uppercase tracking-widest">Esto puede tomar unos minutos</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center opacity-30 max-w-sm p-6"
                    >
                        <div className="w-20 h-20 border border-dashed border-white rounded-full mx-auto mb-6 flex items-center justify-center">
                            <Video size={32} />
                        </div>
                        <p className="font-serif text-xl italic">"La arquitectura comienza cuando pones dos ladrillos juntos con cuidado."</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
