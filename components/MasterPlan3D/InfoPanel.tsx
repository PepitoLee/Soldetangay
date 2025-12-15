import React from 'react';
import { LotData, AmenityData } from './types';
import { STATUS_COLORS } from './constants';
import { X, CheckCircle, Square, Tag, MapPin, ArrowRight } from 'lucide-react';

interface InfoPanelProps {
  selectedLot: LotData | null;
  selectedAmenity: AmenityData | null;
  onClose: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ selectedLot, selectedAmenity, onClose }) => {
  const isOpen = !!selectedLot || !!selectedAmenity;

  if (!isOpen) return null;

  return (
    <div className={`absolute right-0 top-0 h-full w-full md:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
      {/* Header Image Placeholder */}
      <div className="h-48 w-full bg-slate-200 relative overflow-hidden">
        <img
          src={selectedLot ? "https://images.unsplash.com/photo-1600596542815-3ad19e6e6ea1?q=80&w=2000&auto=format&fit=crop" : "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=2574&auto=format&fit=crop"}
          alt="Property View"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur text-white p-2 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-8">
        {selectedLot && (
          <>
            <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    selectedLot.status === 'available' ? 'bg-emerald-100 text-emerald-800' :
                    selectedLot.status === 'reserved' ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {STATUS_COLORS[selectedLot.status].label}
                </span>
                <span className="text-slate-400 text-sm font-mono">{selectedLot.id}</span>
            </div>

            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-1">Lote {selectedLot.number}</h2>
            <p className="text-slate-500 mb-6 capitalize">{selectedLot.type} Collection</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Square size={16} />
                        <span className="text-xs uppercase font-bold">Area Total</span>
                    </div>
                    <p className="text-xl font-bold text-slate-700">{selectedLot.area} m²</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Tag size={16} />
                        <span className="text-xs uppercase font-bold">Precio Lista</span>
                    </div>
                    <p className="text-xl font-bold text-slate-700">${selectedLot.price.toLocaleString()}</p>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="font-bold text-lg mb-3 border-b border-slate-100 pb-2">Características</h3>
                <ul className="space-y-2">
                    {selectedLot.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-slate-600">
                            <CheckCircle size={16} className="text-emerald-500" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed italic mb-8 border-l-4 border-slate-200 pl-4">
                "{selectedLot.description}"
            </p>

            {selectedLot.status === 'available' ? (
                <button 
                    onClick={() => {
                        const msg = `Hola *Sol de Tangay*, vengo del *Master Plan 3D*.\n\nEstoy muy interesado en el *Lote ${selectedLot.number}* (${selectedLot.type}).\nArea: ${selectedLot.area} m²\nPrecio Lista: $${selectedLot.price.toLocaleString()}.\n\nSolicito una cotización formal.`;
                        window.open(`https://wa.me/51973068950?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group"
                >
                    Solicitar Cotización
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            ) : (
                <button disabled className="w-full bg-slate-200 text-slate-400 py-4 rounded-lg font-bold cursor-not-allowed">
                    No Disponible
                </button>
            )}
          </>
        )}

        {selectedAmenity && (
            <>
                <div className="flex items-center gap-2 text-emerald-600 mb-4">
                    <MapPin size={20} />
                    <span className="font-bold uppercase tracking-widest text-xs">Amenidad Comunitaria</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">{selectedAmenity.name}</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">{selectedAmenity.description}</p>

                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-900 mb-2">Beneficio Exclusivo</h4>
                    <p className="text-emerald-700 text-sm">
                        Acceso ilimitado para residentes y sus invitados. Mantenimiento incluido en la cuota condominal.
                    </p>
                </div>
            </>
        )}
      </div>
    </div>
  );
};
