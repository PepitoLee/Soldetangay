import React from 'react';
import { Reveal } from '../components/Reveal';
import { TreePine, Shield, Users, Trophy, Zap, Dumbbell } from 'lucide-react';

const benefits = [
  {
    icon: <TreePine className="w-8 h-8" />,
    title: "Conexión Natural",
    desc: "Aire puro y tranquilidad absoluta.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Seguridad Total",
    desc: "Pórtico y cercado perimetral.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Comunidad",
    desc: "Espacios de convivencia selecta.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2670&auto=format&fit=crop"
  },
  {
    icon: <Dumbbell className="w-8 h-8" />, // Replaced Smile with Dumbbell for sport context
    title: "Bienestar & Ocio",
    desc: "Canchas, parrillas y recreación.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Infraestructura",
    desc: "Obras viales de ingeniería superior.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop"
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Alta Plusvalía",
    desc: "Inversión inteligente post-pandemia.",
    image: "https://images.unsplash.com/photo-1626178793926-22b28830aa30?q=80&w=2670&auto=format&fit=crop"
  }
];

export const Benefits: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f1c15] text-[#f4f5f0] pt-24 pb-24">
      <div className="container mx-auto px-6">
         <Reveal>
            <div className="mb-20 border-b border-white/10 pb-10">
               <h1 className="serif text-5xl md:text-7xl mb-4">Vida Exclusiva</h1>
               <p className="text-gray-400 max-w-2xl">Infraestructura diseñada para el confort, la seguridad y el retorno de inversión.</p>
            </div>
         </Reveal>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, index) => (
               <Reveal key={index} delay={index * 0.1}>
                  <div className="group relative h-[400px] overflow-hidden rounded-lg border border-white/10 cursor-pointer">
                     {/* Background Image */}
                     <div className="absolute inset-0 z-0">
                        <img 
                           src={item.image} 
                           alt={item.title} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-30 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c15] via-transparent to-transparent"></div>
                     </div>
                     
                     {/* Content */}
                     <div className="absolute bottom-0 left-0 w-full p-8 z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="bg-[#8FBC8F] text-[#0f1c15] w-12 h-12 rounded-full flex items-center justify-center mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                           {item.icon}
                        </div>
                        <h3 className="serif text-3xl mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                           {item.desc}
                        </p>
                     </div>

                     {/* Number */}
                     <div className="absolute top-6 right-6 z-10 font-mono text-4xl text-white/10 group-hover:text-[#8FBC8F] transition-colors">
                        0{index + 1}
                     </div>
                  </div>
               </Reveal>
            ))}
         </div>
      </div>
    </div>
  );
};