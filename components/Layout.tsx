import React, { useState, useEffect } from 'react';
import { NavItem, PageRoute } from '../types';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems: NavItem[] = [
  { label: 'Inicio', path: PageRoute.HOME },
  { label: 'Filosofía', path: PageRoute.ABOUT },
  { label: 'Ubicación', path: PageRoute.LOCATION },
  { label: 'Beneficios', path: PageRoute.BENEFITS },
  { label: 'Arquitectura', path: PageRoute.ARCHITECTURE },
  { label: 'Legal', path: PageRoute.LEGAL },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f5f0] text-[#0f1c15] selection:bg-[#2d4a36] selection:text-white">
      
      {/* Floating Nav Bar */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-6 transition-all duration-500 mix-blend-difference text-white`}>
        <div className="flex justify-between items-center">
          <Link to="/" className="group relative z-50">
            <div className="flex flex-col">
              <span className="cinzel text-2xl font-bold tracking-[0.2em] leading-none group-hover:opacity-70 transition-opacity">SOL DE TANGAY</span>
              <span className="text-[0.5rem] uppercase tracking-[0.5em] mt-1 opacity-80">Sanctuary & Investment</span>
            </div>
          </Link>

          <div className="flex items-center gap-8 z-50">
             <button 
                onClick={() => window.open('https://wa.me/51973068950?text=Hola,%20deseo%20cotizar%20un%20lote%20en%20Sol%20de%20Tangay.', '_blank')}
                className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline underline-offset-4"
             >
                Cotizar <ArrowUpRight size={14} />
             </button>
             <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 group"
             >
               <span className="hidden md:block text-xs font-bold uppercase tracking-widest group-hover:opacity-70 transition-opacity">
                 {isMenuOpen ? 'Cerrar' : 'Menú'}
               </span>
               <div className="relative w-8 h-8 flex items-center justify-center border border-white/30 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                  {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
               </div>
             </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#0f1c15] z-40 flex flex-col justify-center items-center text-[#f4f5f0]"
          >
            <div className="flex flex-col items-center gap-6">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="overflow-hidden"
                >
                  <Link
                    to={item.path}
                    className="serif text-5xl md:text-7xl hover:italic hover:text-[#8FBC8F] transition-all duration-300 block"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.8 }}
                 className="mt-12"
              >
                 <button 
                    onClick={() => window.open('https://wa.me/51973068950?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20visita%20al%20proyecto%20Sol%20de%20Tangay.', '_blank')}
                    className="px-8 py-4 border border-[#8FBC8F] rounded-full text-[#8FBC8F] uppercase tracking-widest hover:bg-[#8FBC8F] hover:text-[#0f1c15] transition-all"
                 >
                    Agendar Visita
                 </button>
              </motion.div>
            </div>
            
            {/* Menu Decor */}
            <div className="absolute bottom-10 left-10 text-xs opacity-30 max-w-[200px]">
               SOL DE TANGAY SAC<br/>
               Desarrollo Inmobiliario<br/>
               Nuevo Chimbote, Perú
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow relative">
        {children}
      </main>

      {/* Minimalist Footer */}
      <footer className="bg-[#0f1c15] text-[#f4f5f0] pt-32 pb-12 px-6 border-t border-white/5">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-end">
          <div className="mb-12 md:mb-0">
             <h2 className="serif text-9xl md:text-[12rem] leading-[0.8] opacity-10 select-none">SOL<br/>DE<br/>TANGAY</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
             <div>
                <h4 className="opacity-50 mb-4 uppercase tracking-widest">Navegación</h4>
                <ul className="space-y-2">
                   <li><Link to={PageRoute.ABOUT} className="hover:text-[#8FBC8F]">Filosofía</Link></li>
                   <li><Link to={PageRoute.LOCATION} className="hover:text-[#8FBC8F]">Ubicación</Link></li>
                   <li><Link to={PageRoute.BENEFITS} className="hover:text-[#8FBC8F]">Beneficios</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="opacity-50 mb-4 uppercase tracking-widest">Legal</h4>
                <ul className="space-y-2">
                   <li><Link to={PageRoute.LEGAL} className="hover:text-[#8FBC8F]">Transparencia</Link></li>
                   <li><span className="opacity-50">Partida Registral</span></li>
                </ul>
             </div>
             <div>
                <h4 className="opacity-50 mb-4 uppercase tracking-widest">Social</h4>
                <ul className="space-y-2">
                   <li><a href="#" className="hover:text-[#8FBC8F]">Instagram</a></li>
                   <li><a href="#" className="hover:text-[#8FBC8F]">Facebook</a></li>
                </ul>
             </div>
             <div>
                <h4 className="opacity-50 mb-4 uppercase tracking-widest">Contacto</h4>
                <p>Nuevo Chimbote, Perú</p>
                <p>+51 999 999 999</p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};