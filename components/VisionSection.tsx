"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

// --- COMPONENTE 1: MÁQUINA DE ESCRIBIR ---
const TypewriterText = ({ text, className }: { text: string, className: string }) => {
  const letters = Array.from(text);
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.4 }, 
    },
  };

  const child: Variants = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 10 },
  };

  return (
    <motion.p 
      variants={container} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.6 }} 
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.p>
  );
};

// --- COMPONENTE 2: CICLO DE PALABRAS INTELIGENTE (SIN REPETIDOS) ---
const CyclingText = ({ 
  initialWord, 
  pool, 
  className,
  activeWordsRef 
}: { 
  initialWord: string, 
  pool: string[], 
  className: string,
  activeWordsRef: React.MutableRefObject<Set<string>>
}) => {
  const [currentWord, setCurrentWord] = useState(initialWord);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Filtramos el pool para sacar las palabras que YA están en la pantalla
      const availableWords = pool.filter(w => !activeWordsRef.current.has(w));
      
      if (availableWords.length > 0) {
        // 2. Elegimos una nueva de las disponibles
        const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
        
        // 3. Actualizamos el "Cerebro Central" (sacamos la vieja, metemos la nueva)
        activeWordsRef.current.delete(currentWord);
        activeWordsRef.current.add(randomWord);
        
        // 4. Actualizamos la pantalla
        setCurrentWord(randomWord);
      }
    }, Math.random() * 2500 + 2500); 

    return () => clearInterval(interval);
  }, [currentWord, pool, activeWordsRef]);

  return (
    <div className="relative flex justify-center w-full">
      {/* EL FANTASMA: Mantiene la caja abierta para que no se pisen los textos */}
      <h2 className={`${className} opacity-0 pointer-events-none select-none`}>
        {initialWord}
      </h2>

      {/* TEXTO ANIMADO CON BLUR */}
      <AnimatePresence mode="popLayout">
        <motion.h2
          key={currentWord}
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 ${className}`}
        >
          {currentWord}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};


export default function VisionSection({ isDarkTheme }: { isDarkTheme: boolean }) {
  
  const bgColor = isDarkTheme ? "bg-[#FDCEDF]/80" : "bg-[#E11D48]/50";
  const textColor = isDarkTheme ? "text-[#09090B]" : "text-[#FAFAFA]";

  const baseServices = [
    "Digital Experiences",
    "eCommerce Platforms",
    "3D Web Environments",
    "Interactive Portfolios",
    "Landing Pages"
  ];

  const extraServicesPool = [
    "SaaS Dashboards",
    "Art Direction",
    "Design Systems",
    "Web Animations",
    "Prototyping",
    "Mobile Interfaces",
    "Technical Architecture",
    "Brand Guidelines"
  ];

  // Agrupamos TODAS las palabras posibles en un solo array
  const fullPool = [...baseServices, ...extraServicesPool];
  
  // EL CEREBRO CENTRAL: Guarda qué palabras están mostrándose ahora mismo
  const activeWordsRef = useRef<Set<string>>(new Set(baseServices));

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.5 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className={`relative flex items-center justify-center w-full h-screen overflow-hidden transition-colors duration-1000 ${bgColor}`}>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }} 
        className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none px-4"
      >
        
        {/* TEXTO TYPEWRITER (Uppercase removido, tracking apretado) */}
        <TypewriterText 
          text="What we can build together" 
          className={`text-xl md:text-3xl font-medium tracking-tighter mb-10 md:mb-16 opacity-80 ${textColor}`}
        />
        
        {/* LISTA MUTANTE INTELIGENTE */}
        <div className="flex flex-col items-center justify-center w-full gap-2 md:gap-4 mb-10 md:mb-14">
          {baseServices.map((service, index) => (
            <motion.div key={index} variants={itemVariants} className="w-full">
              <CyclingText 
                initialWord={service} 
                pool={fullPool} 
                activeWordsRef={activeWordsRef} // Le pasamos el cerebro a cada línea
                className={`text-[12vw] md:text-[5vw] font-bold tracking-tighter leading-[0.6] text-center w-full whitespace-nowrap ${textColor}`}
              />
            </motion.div>
          ))}
        </div>

        {/* MORE + (Lowercase, más sutil y pegado) */}
        <motion.div
          variants={itemVariants}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className={`text-[9vw] md:text-[3vw] font-medium tracking-tighter opacity-70 ${textColor}`}>
            More +
          </p>
        </motion.div>

      </motion.div>

    </section>
  );
}