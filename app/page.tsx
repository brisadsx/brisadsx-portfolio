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
  3.3, 2.5, 3.7, 2.9, 4.1, 2.3, 3.2, 2.7, 3.5, 2.6, 3.9, 3.0, 3.1, 4.2
];
const subtitleDelays = [
  3.4, 2.8, 4.0, 2.5, 3.7, 3.1, 4.2, 2.7, 3.6, 3.0, 4.1, 2.9, 3.8, 3.2, 3.5
];

const scrollDelays = [
  0.1, 0.35, 0.05, 0.4, 0.2, 0.5, 0.15, 0.25, 0.45, 0.0, 0.3, 0.55
];

export default function Home() {
  const title = "Brisa Gabriela";
  
  const section2Lines = [
    "just a girl",
    "building cool",
    "things on the",
    "internet."
  ];
  
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

      {/* --- SECCIÓN 1: INTOCABLE --- */}
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
        transition={{ duration: 1, delay: 1.8 }} 
      >
        <div className="flex justify-start tracking-tighter">
            <ScrambleLink href="#" isDarkTheme={isDarkTheme}>brisadsx</ScrambleLink>
        </div>
        
        <div className="flex justify-start items-center tracking-tighter relative">
            <button 
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className={`absolute -left-[40px] w-3.5 h-3.5 hover:rotate-90 transition-transform duration-300 ${isDarkTheme ? "bg-[#FDCEDF]/80" : "bg-[#E11D48]/50"}`}
              aria-label="Alternar tema oscuro/claro"
            />
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

      <section className={`relative flex flex-col h-screen p-6 md:p-10 z-10 backdrop-blur-sm transition-colors duration-500 ${isDarkTheme ? "bg-[#09090B]/40" : "bg-[#F9F5F6]/40"}`}>       

        <div className="absolute bottom-12 left-6 md:bottom-20 md:left-10 z-0 pointer-events-none select-none">
          <h1 className={`text-[13vw] md:text-[9.5vw] font-bold opacity-20 tracking-tighter leading-[0.75] blur-[4px] transition-colors duration-500 ${isDarkTheme ? "text-zinc-100" : "text-zinc-900"}`}>
            Creative Technologist, <br />
            Designer and Student
          </h1>
        </div>

        <motion.div 
          className={`absolute left-0 right-0 top-[190px] h-[1.9px] z-0 transition-all duration-500 ${isDarkTheme ? "bg-[#FDCEDF]/70 mix-blend-screen" : "bg-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 2.0, ease: [0.76, 0, 0.24, 1] }} 
        />

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
        
        <div className="mt-auto flex flex-col items-start text-left z-10 pb-0 -mb-2">
          <motion.h1
            className={`flex justify-start text-[18vw] md:text-[17.3vw] font-bold tracking-tighter leading-none transition-all duration-500 ${isDarkTheme ? "text-[#FDCEDF]/70 mix-blend-screen" : "text-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}
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

      {/* ========================================== */}
      {/* PANTALLA 2: QUÉ HAGO Y CÓMO LO HAGO          */}
      {/* ========================================== */}
      <section className={`relative flex flex-col justify-center min-h-[150vh] py-6 md:py-10 z-20 backdrop-blur-sm transition-colors duration-500 ${isDarkTheme ? "bg-[#09090B]/40" : "bg-[#F9F5F6]/40"}`}>
        
        {/* === LAS DOS LÍNEAS HORIZONTALES SUPERIORES === */}
        <motion.div 
          className={`absolute left-0 right-0 top-0 h-[2px] w-full z-30 transition-all duration-500 origin-left ${isDarkTheme ? "bg-[#FDCEDF]/70 mix-blend-screen" : "bg-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} 
        />
        <motion.div 
          className={`absolute left-0 right-0 top-[15vh] h-[2px] w-full z-30 transition-all duration-500 origin-left ${isDarkTheme ? "bg-[#FDCEDF]/70 mix-blend-screen" : "bg-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} 
        />

        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <div className="sticky top-[40vh] w-full text-center">
            <h1 className={`text-[12vw] md:text-[8.5vw] font-bold opacity-20 tracking-tighter leading-[0.8] blur-[4px] transition-colors duration-500 whitespace-nowrap ${isDarkTheme ? "text-zinc-100" : "text-zinc-900"}`}>
             This is going  <br />
             to take longer
            </h1>
          </div>
        </div>

        {/* Contenedor Principal */}
        <div className="z-10 flex flex-col items-end justify-center w-full pt-[25vh]">
          
          {/* Frases Gigantes */}
          {section2Lines.map((line, lineIndex) => (
            <motion.h2
              key={lineIndex}
              className={`flex justify-end w-full pr-4 md:pr-8 text-[19vw] sm:text-[14vw] md:text-[15vw] lg:text-[11vw] font-bold tracking-[-0.06em] leading-[0.80] transition-all duration-500 ${isDarkTheme ? "text-[#FDCEDF]/70 mix-blend-screen" : "text-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {line.split("").map((char, index) => {
                const letterDelay = scrollDelays[(index + lineIndex * 2) % scrollDelays.length];
                return (
                  <motion.span key={index} variants={letterVariants} custom={letterDelay} className={char === " " ? "w-[2vw]" : "inline-block"}>
                    {char}
                  </motion.span>
                );
              })}
            </motion.h2>
          ))}

         <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            /* 👇 CONTROLES DE DISEÑO 👇
               - ESPACIADO: 'leading-[1.1]' aprieta los renglones. Si lo querés MÁS pegado, usá 'leading-none'.
               - MOVER A LA IZQUIERDA: Modificá 'md:mr-[35vw]'. 
                 Si lo querés MÁS a la izquierda, subí el número (ej: md:mr-[45vw]).
                 Si lo querés más al centro, bajalo (ej: md:mr-[25vw]).
            */
            className={`mt-10 self-end mr-[15vw] md:mr-[55vw] text-left text-base md:text-xl font-bold tracking-tighter leading-[1.1] max-w-sm md:max-w-md transition-all duration-500 ${isDarkTheme ? "text-[#FDCEDF]/70 mix-blend-screen" : "text-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}
          >
            connecting the dots<br />
            between heavy engineering<br />
            and cute ui. breaking<br />
            things just to learn<br />
            how to fix them,<br />
            making the web a<br />
            slightly prettier place<br />
            to be, and having fun<br />
            while doing it.
          </motion.p>

          {/* FIRMA MASIVA */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`mt-16 pr-4 md:pr-8 flex flex-row items-center justify-end gap-2 md:gap-6 text-[18vw] sm:text-[14vw] md:text-[10vw] font-bold tracking-[-0.08em] leading-none transition-all duration-500 ${isDarkTheme ? "text-[#FDCEDF]/70 mix-blend-screen" : "text-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}
          >
            <span>est.&apos;26</span>
            <span>—</span>
            <span>bg®</span>
          </motion.div>

        </div>

        {/* LÍNEA HORIZONTAL BOTTOM */}
        <motion.div 
          className={`absolute left-0 right-0 bottom-[5vh] h-[2px] w-full z-30 transition-all duration-500 origin-left ${isDarkTheme ? "bg-[#FDCEDF]/70 mix-blend-screen" : "bg-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} 
        />

      </section>

    </main>
  );
}