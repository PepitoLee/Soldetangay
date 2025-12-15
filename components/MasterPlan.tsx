
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, ArrowRight, Ruler, Maximize, DollarSign, CreditCard, Layers, Cuboid as Cube } from 'lucide-react';
import { MasterPlanModal } from './MasterPlan3D/MasterPlanModal';

// --- TYPES ---
interface Lot {
  id: string;
  number: number;
  block: string;
  type: 'standard' | 'premium' | 'corner';
  priceSale: number;
  pricePresale: number;
  priceUsd: number; // Approx
  status: 'available' | 'reserved' | 'sold';
  area: number;
  dimensions: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// --- HELPERS ---
const formatCurrency = (amount: number, currency: 'PEN' | 'USD' = 'PEN') => {
  return new Intl.NumberFormat('es-PE', { 
    style: 'currency', 
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const MasterPlan: React.FC = () => {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1); 
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Layers State
  const [isLayerMode, setIsLayerMode] = useState(false);
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0);
  
  // 3D Modal State
  const [show3D, setShow3D] = useState(false);

  // Layer Images
  const layerImages = [
    { src: "/layers/layer1.png", label: "Topografía & Terreno" },
    { src: "/layers/layer2.png", label: "Zonificación General" },
    { src: "/layers/layer3.png", label: "Lotización Preliminar" },
    { src: "/layers/layer4.png", label: "Áreas Verdes & Parques" },
    { src: "/layers/layer5.png", label: "Infraestructura Vial" },
    { src: "/layers/layer6.png", label: "Master Plan Final" }
  ];

  // Toggle Zoom
  const toggleZoom = () => {
    setZoomLevel(prev => prev === 1 ? 2.2 : 1);
  };

  // Handle Layers Sequence
  const handleShowLayers = () => {
    if (isLayerMode) return;
    
    setIsLayerMode(true);
    setCurrentLayerIndex(0);
    setSelectedLot(null); // Close any open cards
  };

  // Cycle Layers Effect
  useEffect(() => {
    if (isLayerMode) {
        const timer = setTimeout(() => {
           if (currentLayerIndex < layerImages.length - 1) {
               setCurrentLayerIndex(prev => prev + 1);
           } else {
               setIsLayerMode(false);
               setCurrentLayerIndex(0);
           }
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, [isLayerMode, currentLayerIndex]);

  useEffect(() => {
    const targetDate = new Date('2025-12-31T23:59:59').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- GENERATE MAP DATA ---
  const { lots, mapWidth, mapHeight, roadPath } = useMemo(() => {
    const generatedLots: Lot[] = [];
    
    // Base dimensions
    const lotWidth = 22; 
    const lotHeight = 45; 
    const roadWidth = 24; 
    const centralIslandHeight = 70; 
    const sidePadding = 60;
    const gap = 0.5;
    
    const topRowY = 30;
    const bottomRowY = topRowY + lotHeight + roadWidth + centralIslandHeight + roadWidth;
    const totalLotsPerRow = 45; 

    const getStatus = (i: number, row: 'A' | 'B'): 'available' | 'sold' => {
       if (row === 'A') {
          return (i % 3 === 0 || i === 4 || i === 8 || i > 35) ? 'sold' : 'available';
       } else {
          return (i % 4 === 0 || i === 2 || i === 15 || i < 5) ? 'sold' : 'available';
       }
    };

    for (let i = 0; i < totalLotsPerRow; i++) {
      // Block A (Top)
      const isCornerA = i === 0 || i === totalLotsPerRow - 1;
      generatedLots.push({
        id: `A-${i + 1}`,
        number: i + 1,
        block: 'A',
        type: isCornerA ? 'corner' : 'standard',
        priceSale: isCornerA ? 150000 : 120000,
        pricePresale: isCornerA ? 120000 : 100000,
        priceUsd: isCornerA ? 32000 : 30000,
        status: getStatus(i, 'A'),
        area: 250,
        dimensions: '10m x 25m',
        x: sidePadding + (i * (lotWidth + gap)),
        y: topRowY,
        width: lotWidth,
        height: lotHeight
      });

      // Block B (Bottom)
      const isCornerB = i === 0 || i === totalLotsPerRow - 1;
      generatedLots.push({
        id: `B-${i + 1}`,
        number: i + 1,
        block: 'B',
        type: isCornerB ? 'corner' : 'standard',
        priceSale: isCornerB ? 150000 : 120000,
        pricePresale: isCornerB ? 120000 : 100000,
        priceUsd: isCornerB ? 32000 : 30000,
        status: getStatus(i, 'B'),
        area: 250,
        dimensions: '10m x 25m',
        x: sidePadding + (i * (lotWidth + gap)),
        y: bottomRowY,
        width: lotWidth,
        height: lotHeight
      });
    }

    const totalW = sidePadding + (totalLotsPerRow * (lotWidth + gap)) + sidePadding;
    const totalH = bottomRowY + lotHeight + 50;

    // Road Path
    const rX = sidePadding - 20;
    const rY = topRowY + lotHeight + 2;
    const rW = (totalLotsPerRow * (lotWidth + gap)) + 40;
    const rH = centralIslandHeight + (roadWidth * 2) - 4;
    
    const roadPath = `M ${rX + 20} ${rY} H ${rX + rW - 20} Q ${rX + rW} ${rY} ${rX + rW} ${rY + 20} V ${rY + rH - 20} Q ${rX + rW} ${rY + rH} ${rX + rW - 20} ${rY + rH} H ${rX + 20} Q ${rX} ${rY + rH} ${rX} ${rY + rH - 20} V ${rY + 20} Q ${rX} ${rY} ${rX + 20} ${rY}`;

    return { lots: generatedLots, mapWidth: totalW, mapHeight: totalH, roadPath };
  }, []);

  // --- RENDER HELPERS ---
  const renderTree = (cx: number, cy: number, r: number) => (
     <g>
        <circle cx={cx+1} cy={cy+1} r={r} fill="black" opacity="0.05" />
        <circle cx={cx} cy={cy} r={r} fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5" />
        <circle cx={cx-1} cy={cy-1} r={r*0.6} fill="#dcfce7" opacity="0.5" />
     </g>
  );

  return (
    <div className="w-full bg-[#f4f5f0] py-24 relative select-none overflow-hidden">
      
      {/* 3D MODAL */}
      <AnimatePresence>
        {show3D && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            >
                <div className="w-full h-full max-w-7xl relative bg-white rounded-3xl overflow-hidden">
                    <MasterPlanModal onClose={() => setShow3D(false)} />
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER & CONTROLS */}
      <div className="container mx-auto px-6 mb-12 relative z-10">
         <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-10">
            <div>
               <div className="flex items-center gap-3 mb-4">
                  <span className="w-12 h-[1px] bg-[#0f1c15]"></span>
                  <span className="uppercase tracking-[0.3em] text-xs font-bold text-[#0f1c15]">Master Plan</span>
               </div>
               <h2 className="font-serif text-5xl md:text-7xl text-[#0f1c15] leading-none">
                  Seleccione<br/><span className="italic text-[#8FBC8F]">su legado.</span>
               </h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
               {/* 3D Button */}
               <button 
                  onClick={() => setShow3D(true)}
                  className="relative overflow-hidden px-8 py-4 rounded-full uppercase tracking-[0.2em] text-xs font-bold bg-[#8FBC8F] text-[#0f1c15] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(143,188,143,0.3)]"
               >
                  <span className="flex items-center gap-3">
                     <Cube size={16} /> Ver en 3D
                  </span>
               </button>

               {/* Capas Button */}
               <button 
                  onClick={handleShowLayers}
                  disabled={isLayerMode}
                  className={`
                    relative overflow-hidden px-8 py-4 rounded-full uppercase tracking-[0.2em] text-xs font-bold transition-all duration-500
                    ${isLayerMode ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#0f1c15] text-white hover:scale-105 shadow-[0_0_30px_rgba(143,188,143,0.4)] border border-[#8FBC8F]'}
                  `}
               >
                  <span className="relative z-10 flex items-center gap-3">
                     <Layers size={16} className={!isLayerMode ? "animate-pulse" : ""} />
                     {isLayerMode ? 'Visualizando...' : 'Ver Capas'}
                  </span>
                  {!isLayerMode && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                  )}
               </button>

               {/* Timer */}
               <div className="bg-[#0f1c15] text-[#f4f5f0] px-8 py-4 rounded-full flex items-center gap-6 shadow-2xl">

                  <div className="text-right border-r border-white/20 pr-6">
                     <span className="block text-[10px] uppercase tracking-widest opacity-60">Cierre Preventa</span>
                     <span className="font-serif font-bold text-xl">31 DIC</span>
                  </div>
                  <div className="font-mono text-2xl text-[#8FBC8F] tabular-nums tracking-wider">
                     {timeLeft.days}d {timeLeft.hours}h
                  </div>
               </div>
            </div>
         </div>

         {/* LEGEND */}
         <div className="flex flex-wrap gap-8 text-xs uppercase tracking-widest font-bold text-gray-500 border-t border-gray-200 pt-6">
            <div className="flex items-center gap-3"><span className="w-3 h-3 bg-[#fff] border border-[#8FBC8F]"></span> Disponible</div>
            <div className="flex items-center gap-3"><span className="w-3 h-3 bg-[#0f1c15]"></span> Vendido</div>
            <div className="flex items-center gap-3"><span className="w-3 h-3 bg-[#dcfce7] border border-[#bbf7d0]"></span> Áreas Verdes</div>
         </div>
      </div>

      {/* MAP VIEWER */}
      <div className="container mx-auto px-0 md:px-6 relative z-0">
         <div className="relative w-full bg-white border border-gray-200/50 md:rounded-3xl overflow-hidden h-[700px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] group">
            
            {/* Zoom Controls */}
            <div className="absolute top-8 right-8 z-20 flex flex-col gap-2">
               <button onClick={toggleZoom} className="bg-white p-4 rounded-full shadow-xl hover:bg-gray-50 text-[#0f1c15] transition-all active:scale-95 border border-gray-100">
                  {zoomLevel === 1 ? <ZoomIn size={20} /> : <ZoomOut size={20} />}
               </button>
            </div>

            {/* LAYER OVERLAY SYSTEM */}
            <AnimatePresence>
               {isLayerMode && (
                  <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="absolute inset-0 z-30 bg-[#0f1c15] flex items-center justify-center overflow-hidden"
                  >
                     {/* Background Image with Cross-fade */}
                     <AnimatePresence mode='wait'>
                        <motion.div
                           key={currentLayerIndex}
                           initial={{ opacity: 0, scale: 1.1 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 1 }}
                           className="absolute inset-0 w-full h-full"
                        >
                           <img 
                              src={layerImages[currentLayerIndex].src} 
                              alt="Layer View" 
                              className="w-full h-full object-cover opacity-60"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c15] to-transparent"></div>
                        </motion.div>
                     </AnimatePresence>

                     {/* Text Content */}
                     <div className="relative z-50 text-center">
                        <motion.div
                           key={currentLayerIndex}
                           initial={{ y: 20, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.2 }}
                        >
                           <h3 className="serif text-4xl md:text-6xl text-white mb-2">{layerImages[currentLayerIndex].label}</h3>
                           <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Cargando detalles arquitectónicos...</p>
                        </motion.div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Scroll Container */}
            <div 
               className={`w-full h-full overflow-auto ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'} scrollbar-hide`}
            >
               <div style={{ 
                  width: zoomLevel === 1 ? '100%' : `${mapWidth * 1.5}px`, 
                  height: '100%',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#ffffff' 
               }}>
                  <svg 
                     viewBox={`0 0 ${mapWidth} ${mapHeight}`} 
                     preserveAspectRatio={zoomLevel === 1 ? "xMidYMid meet" : "xMidYMid slice"}
                     className="w-full h-full transition-all duration-700"
                  >
                     <defs>
                        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                           <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                           <feOffset dx="0.5" dy="0.5" result="offsetblur" />
                           <feComponentTransfer>
                              <feFuncA type="linear" slope="0.1" />
                           </feComponentTransfer>
                           <feMerge>
                              <feMergeNode />
                              <feMergeNode in="SourceGraphic" />
                           </feMerge>
                        </filter>
                     </defs>

                     {/* 1. Ground */}
                     <rect width={mapWidth} height={mapHeight} fill="#ffffff" />
                     
                     {/* 2. Roads */}
                     <path 
                        d={roadPath} 
                        fill="none" 
                        stroke="#18181b" 
                        strokeWidth="26" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.9"
                     />
                     <path 
                        d={roadPath} 
                        fill="none" 
                        stroke="rgba(255,255,255,0.15)" 
                        strokeWidth="0.5" 
                        strokeDasharray="8 4" 
                        strokeLinecap="round"
                     />

                     {/* 3. Central Islands (Amenities) */}
                     {[0, 1, 2, 3].map(i => {
                        const totalInnerW = mapWidth - 120;
                        const islandW = (totalInnerW / 4) - 10;
                        const startX = 70;
                        const y = 100; 
                        const h = 64;
                        const x = startX + (i * (islandW + 13));

                        return (
                           <g key={i} filter="url(#softShadow)">
                              {/* Base Grass */}
                              <rect x={x} y={y} width={islandW} height={h} rx="2" fill="#ecfccb" stroke="#d9f99d" strokeWidth="0.5" />
                              
                              {i === 0 && ( // Park Zone
                                 <g>
                                    <rect x={x+5} y={y+5} width={islandW-10} height={h-10} rx="4" fill="#fef08a" opacity="0.4" />
                                    <circle cx={x+20} cy={y+20} r="6" fill="#fca5a5" opacity="0.8" />
                                    <rect x={x+35} y={y+15} width={12} height={12} rx="2" fill="#93c5fd" opacity="0.8" />
                                    {renderTree(x+islandW-15, y+15, 6)}
                                    {renderTree(x+islandW-25, y+h-15, 7)}
                                 </g>
                              )}

                              {i === 1 && ( // Central Park
                                 <g>
                                    <path d={`M${x} ${y+h/2} Q ${x+islandW/2} ${y+h/2+10} ${x+islandW} ${y+h/2}`} stroke="white" strokeWidth="1.5" fill="none" opacity="0.8" />
                                    {renderTree(x+15, y+15, 7)}
                                    {renderTree(x+islandW-15, y+h-15, 6)}
                                    {renderTree(x+islandW/2, y+h/2, 8)}
                                    {renderTree(x+30, y+h-20, 5)}
                                 </g>
                              )}

                              {i === 2 && ( // Club House
                                 <g>
                                    <rect x={x+8} y={y+8} width={24} height={h-16} rx="2" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="0.5" />
                                    <rect x={x+40} y={y+12} width={islandW-48} height={h-24} rx="1" fill="#fde68a" stroke="#fcd34d" strokeWidth="0.5" />
                                 </g>
                              )}

                              {i === 3 && ( // Sports Zone
                                 <g>
                                    <rect x={x+6} y={y+6} width={islandW-30} height={h-12} fill="#86efac" stroke="white" strokeWidth="1" />
                                    <line x1={x+6 + (islandW-30)/2} y1={y+6} x2={x+6 + (islandW-30)/2} y2={y+h-6} stroke="white" strokeWidth="1" />
                                    <circle cx={x+6 + (islandW-30)/2} cy={y+6 + (h-12)/2} r="6" stroke="white" strokeWidth="1" fill="none" />
                                    <rect x={x+islandW-20} y={y+6} width={14} height={h-12} fill="#93c5fd" stroke="white" strokeWidth="1" />
                                 </g>
                              )}
                           </g>
                        );
                     })}

                     {/* 4. LOTS */}
                     {lots.map((lot) => {
                        const isSold = lot.status === 'sold';
                        const isSelected = selectedLot?.id === lot.id;
                        
                        return (
                           <g 
                              key={lot.id}
                              onClick={() => !isLayerMode && setSelectedLot(lot)}
                              style={{ cursor: isLayerMode ? 'default' : 'pointer' }}
                              transform={`translate(${lot.x}, ${lot.y})`}
                              className="transition-all duration-300"
                           >
                              {/* Lot Rect */}
                              <rect 
                                 width={lot.width} 
                                 height={lot.height} 
                                 fill={isSold ? "#0f1c15" : (isSelected ? "#8FBC8F" : "#ffffff")}
                                 stroke={isSelected ? "#0f1c15" : (isSold ? "none" : "#8FBC8F")}
                                 strokeWidth={isSelected ? "1" : "0.5"}
                                 rx={isSold ? 0 : 0.5}
                              />
                              
                              {/* House Footprint (Minimalist hint) */}
                              {!isSold && !isSelected && (
                                 <rect 
                                    x="4" y="8" 
                                    width={lot.width-8} height={lot.height-16} 
                                    fill="#f4f5f0"
                                 />
                              )}

                              {/* Number */}
                              {(!isSold || zoomLevel > 1) && (
                                 <text 
                                    x={lot.width/2} y={lot.height/2} 
                                    fontSize="4" 
                                    fill={isSold ? "#333" : (isSelected ? "white" : "#0f1c15")} 
                                    fontWeight="bold" 
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    style={{ pointerEvents: 'none' }}
                                    opacity={isSold ? 0.3 : 1}
                                 >
                                    {lot.number}
                                 </text>
                              )}
                           </g>
                        );
                     })}
                  </svg>
               </div>
            </div>

            {/* SELECTED LOT DETAILS CARD (ELEGANT MINIMALIST) */}
            <AnimatePresence>
               {selectedLot && !isLayerMode && (
                  <motion.div 
                     initial={{ x: 50, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     exit={{ x: 50, opacity: 0 }}
                     transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                     className="absolute top-6 right-6 w-full md:w-[380px] md:max-w-[90vw] bg-white/95 backdrop-blur-md shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] border border-white/40 rounded-2xl z-10 overflow-hidden"
                  >
                     <div className="relative p-8">
                        {/* Close Button */}
                        <button onClick={() => setSelectedLot(null)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
                           <X size={20} />
                        </button>

                        {/* Header */}
                        <div className="mb-8">
                           <div className="flex items-center gap-3 mb-2">
                              <span className={`w-2 h-2 rounded-full ${selectedLot.status === 'sold' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                                 {selectedLot.status === 'sold' ? 'No Disponible' : 'Disponible'}
                              </span>
                           </div>
                           <h3 className="font-serif text-4xl text-[#0f1c15] leading-none mb-1">Lote {selectedLot.number}</h3>
                           <span className="text-xs text-gray-500 font-light">Bloque {selectedLot.block} • {selectedLot.type === 'corner' ? 'Esquina Premium' : 'Ubicación Estándar'}</span>
                        </div>

                        {selectedLot.status === 'sold' ? (
                           <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
                              <p className="serif text-gray-400 italic">Esta unidad ha sido vendida.</p>
                           </div>
                        ) : (
                           <>
                              {/* Specs Grid */}
                              <div className="grid grid-cols-2 gap-4 mb-8">
                                 <div className="bg-[#f4f5f0] p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-[#0f1c15] opacity-50 mb-1">
                                       <Maximize size={14} />
                                       <span className="text-[10px] uppercase tracking-widest">Área Total</span>
                                    </div>
                                    <p className="font-serif text-xl">{selectedLot.area} m²</p>
                                 </div>
                                 <div className="bg-[#f4f5f0] p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-[#0f1c15] opacity-50 mb-1">
                                       <Ruler size={14} />
                                       <span className="text-[10px] uppercase tracking-widest">Medidas</span>
                                    </div>
                                    <p className="font-serif text-xl">{selectedLot.dimensions}</p>
                                 </div>
                              </div>

                              {/* Price Section */}
                              <div className="space-y-4 mb-8 border-t border-gray-100 pt-6">
                                 <div className="flex justify-between items-end">
                                    <div>
                                       <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Precio Preventa (Soles)</span>
                                       <span className="serif text-3xl text-[#0f1c15]">{formatCurrency(selectedLot.pricePresale)}</span>
                                    </div>
                                    <div className="text-right">
                                       <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">USD (Aprox)</span>
                                       <span className="serif text-xl text-gray-600">{formatCurrency(selectedLot.priceUsd, 'USD')}</span>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-2 text-[10px] text-[#8FBC8F] bg-[#0f1c15] py-2 px-3 rounded w-fit">
                                    <DollarSign size={10} />
                                    <span className="uppercase tracking-wider font-bold">Ahorro Preventa Incluido</span>
                                 </div>
                              </div>

                              {/* Actions */}
                              <div className="space-y-3">
                                 <button 
                                    onClick={() => {
                                       const msg = `Hola *Sol de Tangay*, estoy interesado en reservar el *Lote ${selectedLot.number}* (Bloque ${selectedLot.block}).\n\nPrecio Preventa: ${formatCurrency(selectedLot.pricePresale)}.\n\nPor favor indíquenme los pasos a seguir.`;
                                       window.open(`https://wa.me/51973068950?text=${encodeURIComponent(msg)}`, '_blank');
                                    }}
                                    className="w-full bg-[#0f1c15] text-[#f4f5f0] py-4 rounded-xl uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#8FBC8F] hover:text-[#0f1c15] transition-all flex items-center justify-center gap-2 shadow-lg"
                                 >
                                    Reservar Ahora <ArrowRight size={14} />
                                 </button>
                                 <button 
                                    onClick={() => {
                                       const msg = `Hola *Sol de Tangay*, quisiera una *Simulación de Cuotas* para el *Lote ${selectedLot.number}* (Bloque ${selectedLot.block}).\n\nPrecio Base: ${formatCurrency(selectedLot.pricePresale)}.\n\nQuedo atento a su respuesta.`;
                                       window.open(`https://wa.me/51973068950?text=${encodeURIComponent(msg)}`, '_blank');
                                    }}
                                    className="w-full bg-transparent border border-gray-200 text-gray-500 py-4 rounded-xl uppercase text-xs font-bold tracking-[0.2em] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                 >
                                    <CreditCard size={14} /> Simular Cuotas
                                 </button>
                              </div>
                           </>
                        )}
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
};
