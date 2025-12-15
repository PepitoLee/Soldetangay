import React, { useState } from 'react';
import { InteractiveMap } from './InteractiveMap';
import { InfoPanel } from './InfoPanel';
import { LotData, AmenityData } from './types';
import { Cuboid as Cube, X } from 'lucide-react';

interface MasterPlanModalProps {
  onClose: () => void;
}

export const MasterPlanModal: React.FC<MasterPlanModalProps> = ({ onClose }) => {
  const [selectedLot, setSelectedLot] = useState<LotData | null>(null);
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityData | null>(null);

  const handleLotSelect = (lot: LotData) => {
    setSelectedAmenity(null);
    setSelectedLot(lot);
  };

  const handleAmenitySelect = (amenity: AmenityData) => {
    setSelectedLot(null);
    setSelectedAmenity(amenity);
  };

  const closePanel = () => {
    setSelectedLot(null);
    setSelectedAmenity(null);
  };

  return (
    <div className="relative w-full h-full bg-slate-100 rounded-3xl overflow-hidden flex flex-col">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8 pointer-events-none">
         <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg pointer-events-auto flex items-center gap-3">
             <div className="w-8 h-8 bg-emerald-900 text-white rounded-lg flex items-center justify-center font-serif font-bold">3D</div>
             <div>
                 <h3 className="font-bold text-slate-900 leading-none">Vista Verde</h3>
                 <span className="text-[10px] uppercase tracking-widest text-slate-500">Master Plan Interactivo</span>
             </div>
         </div>

         <button 
            onClick={onClose}
            className="bg-white/90 backdrop-blur w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-slate-900 hover:bg-red-50 hover:text-red-500 transition-all pointer-events-auto"
         >
            <X size={24} />
         </button>
      </div>

      {/* Legend / Tip */}
      <div className="absolute top-24 left-0 right-0 flex justify-center z-10 pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-white/50 text-slate-600 text-xs font-semibold flex items-center gap-2">
            <Cube size={14} className="text-emerald-600"/>
            <span>Haz clic en un lote para ver detalles</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Map Container */}
        <div className="flex-1 relative overflow-hidden">
            <InteractiveMap
                onSelectLot={handleLotSelect}
                onSelectAmenity={handleAmenitySelect}
                selectedId={selectedLot?.id || null}
            />
        </div>

        {/* Info Panel Overlay */}
        <InfoPanel
            selectedLot={selectedLot}
            selectedAmenity={selectedAmenity}
            onClose={closePanel}
        />
      </div>
    </div>
  );
};
