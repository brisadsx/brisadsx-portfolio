"use client";

import Preloader from "../components/Preloader";
import { motion, Variants } from "framer-motion";
import { useState, useRef } from "react";

const ScrambleLink = ({ href, target, underline, children, isDarkTheme }: { href: string; target?: string; underline?: boolean; children: string; isDarkTheme?: boolean }) => {
  const [text, setText] = useState(children);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const normalText = children;
  const reversedText = children.split("").reverse().join("");

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setText(reversedText);

    timeoutRef.current = setTimeout(() => {
      setText(normalText);
    }, 150); 
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setText(normalText);
  };

  const hoverTextColor = isDarkTheme ? "hover:text-[#FDCEDF]/70" : "hover:text-[#E11D48]/50";
  const decorationColor = isDarkTheme ? "decoration-[#FDCEDF]/70" : "decoration-[#E11D48]/50";

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`text-zinc-400 transition-colors duration-300 font-medium cursor-pointer ${hoverTextColor} ${
        underline 
          ? `hover:underline decoration-2 underline-offset-[2px] ${decorationColor}` 
          : ""
      }`}
    >
      {text}
    </a>
  );
};

const chaoticDelays = [
  2.0, 1.2, 2.4, 1.6, 2.8, 1.0, 1.9, 1.4, 2.2, 1.3, 2.6, 1.7, 1.8, 2.9
];
const subtitleDelays = [
  2.1, 1.5, 2.7, 1.2, 2.4, 1.8, 2.9, 1.4, 2.3, 1.7, 2.8, 1.6, 2.5, 1.9, 2.2
];

export default function Home() {
  const title = "Brisa Gabriela";
  
  const subtitle1 = "this is under construction".match(/.{1,2}/g) || [];
  const subtitle2 = "soon soon".match(/.{1,2}/g) || [];

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (customDelay: number) => ({
      opacity: 1,
      transition: {
        delay: customDelay,
        duration: 0.0, 
        ease: "linear",
      },
    }),
  };

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <main className={`relative flex flex-col overflow-x-hidden font-neue-haas transition-colors duration-500 ${isDarkTheme ? "bg-[#09090B] text-[#FDCEDF]" : "bg-[#FAFAFA] text-[#E11D48]"}`}>
      
      <Preloader />

      {/* Línea Vertical - Sombra solo en tema claro */}
      <motion.div 
        className={`fixed top-0 bottom-0 left-[35.333%] w-[2px] z-50 pointer-events-none transition-all duration-500 ${isDarkTheme ? "bg-[#FDCEDF]/70 mix-blend-screen" : "bg-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}
        initial={{ scaleY: 0, transformOrigin: "top" }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
      />

      <motion.nav 
        className="fixed top-0 left-0 w-full pt-4 px-6 md:pt-6 md:px-10 z-40 grid grid-cols-3 items-start text-base md:text-[1.5rem] tracking-[0.2em] font-bold bg-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }} 
      >
        <div className="flex justify-start tracking-tighter">
            <ScrambleLink href="#" isDarkTheme={isDarkTheme}>brisadsx</ScrambleLink>
        </div>
        
        <div className="flex justify-start items-center tracking-tighter relative">
            
<button 
              onClick={() => setIsDarkTheme(!isDarkTheme)}
            
              className={`absolute -left-[20px] w-3.5 h-3.5 hover:rotate-90 transition-transform duration-300 ${isDarkTheme ? "bg-[#FDCEDF]/80" : "bg-[#E11D48]/50"}`}
              aria-label="Alternar tema oscuro/claro"
            />
            
            {/* 2. Mueve SOLO LA PALABRA ABOUT */}
            {/* Cambiá ml-[40px] por ml-[10px], ml-[80px], etc. Como el botón es invisible para esta palabra, podés ponerla donde quieras */}
            <div className="ml-[190px]">
                <ScrambleLink href="#" isDarkTheme={isDarkTheme}>about</ScrambleLink>
            </div>
            
        </div>

        <div className="flex justify-end gap-4 md:gap-8 tracking-tighter">
          <ScrambleLink href="https://www.linkedin.com/in/brisa-gabriela/" target="_blank" underline isDarkTheme={isDarkTheme}>in</ScrambleLink>
          <ScrambleLink href="https://github.com/brisadsx" target="_blank" underline isDarkTheme={isDarkTheme}>git</ScrambleLink>
          <ScrambleLink href="mailto:brisadsx@gmail.com" underline isDarkTheme={isDarkTheme}>mail</ScrambleLink>
        </div>
      </motion.nav>

      <section className={`relative flex flex-col h-screen p-6 md:p-10 z-10 backdrop-blur-sm overflow-hidden transition-colors duration-500 ${isDarkTheme ? "bg-[#09090B]/40" : "bg-[#F9F5F6]/40"}`}>       

        <div className="absolute bottom-12 left-6 md:bottom-20 md:left-10 z-0 pointer-events-none select-none">
          <h1 className={`text-[13vw] md:text-[9.5vw] font-bold opacity-20 tracking-tighter leading-[0.75] blur-[4px] transition-colors duration-500 ${isDarkTheme ? "text-zinc-100" : "text-zinc-900"}`}>
            Creative Technologist, <br />
            Designer and Student
          </h1>
        </div>

        {/* Línea Horizontal - Sombra solo en tema claro */}
        <motion.div 
          className={`absolute left-0 right-0 top-[190px] h-[1.9px] z-0 transition-all duration-500 ${isDarkTheme ? "bg-[#FDCEDF]/70 mix-blend-screen" : "bg-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Textos Libres - Sombra solo en tema claro */}
        <div className={`absolute top-[200px] left-[33%] flex flex-col gap-1 text-[1.5rem] tracking-tighter z-10 transition-all duration-500 ${isDarkTheme ? "text-[#FDCEDF]/70 mix-blend-screen" : "text-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}>
          <motion.div className="flex whitespace-pre" variants={container} initial="hidden" animate="visible">
            {subtitle1.map((chunk, index) => (
              <motion.span key={`sub1-${index}`} variants={letterVariants} custom={subtitleDelays[index]}>{chunk}</motion.span>
            ))}
          </motion.div>

          <motion.div className="flex whitespace-pre" variants={container} initial="hidden" animate="visible">
            {subtitle2.map((chunk, index) => (
              <motion.span key={`sub2-${index}`} variants={letterVariants} custom={subtitleDelays[index]}>{chunk}</motion.span>
            ))}
          </motion.div>
        </div>
        
        {/* Tu Nombre - Sombra solo en tema claro */}
        <div className="mt-auto flex flex-col items-start text-left z-10 pb-0 -mb-2">
          <motion.h1
            className={`flex justify-start overflow-hidden text-[18vw] md:text-[17.3vw] font-bold tracking-tighter leading-none transition-all duration-500 ${isDarkTheme ? "text-[#FDCEDF]/70 mix-blend-screen" : "text-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {title.split("").map((char, index) => {
              const letterDelay = chaoticDelays[index];
              return (
                <motion.span key={index} variants={letterVariants} custom={letterDelay} className={char === " " ? "w-[3vw]" : "inline-block"}>
                  {char}
                </motion.span>
              );
            })}
          </motion.h1>
        </div>
      </section>

      <section className={`relative w-full min-h-screen border-t-[1.9px] z-20 backdrop-blur-sm transition-colors duration-500 ${isDarkTheme ? "border-[#FDCEDF]/70 bg-[#09090B]/40" : "border-[#E11D48]/50 bg-[#F9F5F6]/40"}`}>
        
        <div className="grid grid-cols-1 md:grid-cols-[35.333%_1fr] min-h-screen">
          
          <div className="p-6 md:p-10 md:pr-16 flex flex-col justify-center z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 leading-[0.9]">
            </h2>
            <p className="text-base md:text-lg text-zinc-500 tracking-tight leading-relaxed max-w-sm">
            </p>
          </div>

          <div className="p-6 md:p-10 flex items-center justify-center z-10">
            <div className={`w-full max-w-lg aspect-[4/5] border-[1.9px] relative overflow-hidden group transition-colors duration-500 ${isDarkTheme ? "bg-[#FDCEDF]/10 border-[#FDCEDF]/30" : "bg-[#E11D48]/10 border-[#E11D48]/30"}`}>
              <div className={`absolute inset-0 flex items-center justify-center tracking-[0.2em] text-sm transition-colors duration-500 ${isDarkTheme ? "text-[#FDCEDF]/70" : "text-[#E11D48]/50"}`}>
              </div>
              
              <div className={`absolute top-0 left-0 w-full h-[1.9px] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ${isDarkTheme ? "bg-[#FDCEDF]/70" : "bg-[#E11D48]/50"}`} />
              <div className={`absolute bottom-0 right-0 w-full h-[1.9px] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ${isDarkTheme ? "bg-[#FDCEDF]/70" : "bg-[#E11D48]/50"}`} />
              <div className={`absolute top-0 right-0 h-full w-[1.9px] -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${isDarkTheme ? "bg-[#FDCEDF]/70" : "bg-[#E11D48]/50"}`} />
              <div className={`absolute bottom-0 left-0 h-full w-[1.9px] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${isDarkTheme ? "bg-[#FDCEDF]/80" : "bg-[#E11D48]/50"}`} />
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}