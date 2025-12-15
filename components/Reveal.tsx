import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, MotionValue } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  delay = 0, 
  duration = 0.8,
  direction = "up",
  className = ""
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const getVariants = () => {
     if (direction === "none") return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
     const offset = 50;
     return {
        hidden: { 
           opacity: 0, 
           y: direction === "up" ? offset : direction === "down" ? -offset : 0,
           x: direction === "left" ? offset : direction === "right" ? -offset : 0
        },
        visible: { opacity: 1, y: 0, x: 0 }
     };
  };

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const TextReveal: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className = "", delay = 0 }) => {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, amount: 0.5 });
   
   const words = text.split(" ");

   const container = {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
         opacity: 1,
         transition: { staggerChildren: 0.05, delayChildren: delay }
      })
   };

   const child = {
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
         },
      },
      hidden: {
         opacity: 0,
         y: 20,
         transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
         },
      },
   };

   return (
      <motion.div 
         ref={ref}
         className={`flex flex-wrap gap-x-[0.25em] ${className}`} 
         variants={container} 
         initial="hidden" 
         animate={isInView ? "visible" : "hidden"}
      >
         {words.map((word, index) => (
            <motion.span variants={child} key={index}>
               {word}
            </motion.span>
         ))}
      </motion.div>
   );
};

export const ParallaxImage: React.FC<{ src: string; alt?: string; height?: string; className?: string }> = ({ src, alt = "", height = "400px", className="" }) => {
   const ref = useRef(null);
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
   });
   const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

   return (
      <div ref={ref} className={`overflow-hidden relative ${className}`} style={{ height }}>
         <motion.div style={{ y, height: "120%", width: "100%" }} className="absolute top-[-10%] left-0">
            <img src={src} alt={alt} className="w-full h-full object-cover" />
         </motion.div>
      </div>
   );
};