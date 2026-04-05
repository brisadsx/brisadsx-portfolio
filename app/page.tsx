"use client";

import Preloader from "../components/Preloader";
import { motion, Variants } from "framer-motion";
import { useState, useRef } from "react";


const ScrambleLink = ({ href, children }: { href: string; children: string }) => {
  const [text, setText] = useState(children);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chars = "!<>-_\\/[]{}—=+*^?#"; 

  const handleMouseEnter = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText(
        children
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return children[index]; 
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= children.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3; 
    }, 30); 
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setText(children); 
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="text-zinc-400 hover:text-[#FDCEDF] transition-colors duration-300 font-medium cursor-pointer"
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

  return (
    <main className="relative flex min-h-screen flex-col bg-[#F9F5F6] text-[#FDCEDF] overflow-hidden font-neue-haas p-6 md:p-10">
      
      <Preloader />

     
      <motion.div 
        className="absolute top-0 bottom-0 left-[35.555%] w-[1.9px] bg-[#FDCEDF] z-0 opacity-90"
        initial={{ scaleY: 0, transformOrigin: "top" }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
      />

      
      <motion.div 
        className="absolute left-0 right-0 top-[180px] h-[1.9px] bg-[#FDCEDF] z-0 opacity-90"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
      />

      
      <motion.nav 
        className="z-10 grid grid-cols-3 w-full items-start text-base md:text-[1.5rem] tracking-[0.2em] font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }} 
      >
        <div className="flex justify-start tracking-tighter">
            <ScrambleLink href="#">brisadsx</ScrambleLink>
        </div>
        <div className="flex justify-center tracking-tighter">
            <ScrambleLink href="#">about</ScrambleLink>
        </div>
        <div className="flex justify-end gap-4 md:gap-8 tracking-tighter">
          <ScrambleLink href="#">in</ScrambleLink>
          <ScrambleLink href="#">ig</ScrambleLink>
          <ScrambleLink href="#">mail</ScrambleLink>
        </div>
      </motion.nav>


      <div className="absolute top-[200px] left-[33%] flex flex-col gap-1 text-[#FDCEDF] text-[1.5rem] tracking-tighter z-10">
        
        
        <motion.div className="flex whitespace-pre" variants={container} initial="hidden" animate="visible">
          {subtitle1.map((chunk, index) => (
            <motion.span key={`sub1-${index}`} variants={letterVariants} custom={subtitleDelays[index]}>
              {chunk}
            </motion.span>
          ))}
        </motion.div>

        <motion.div className="flex whitespace-pre" variants={container} initial="hidden" animate="visible">
          {subtitle2.map((chunk, index) => (
            <motion.span key={`sub2-${index}`} variants={letterVariants} custom={subtitleDelays[index]}>
              {chunk}
            </motion.span>
          ))}
        </motion.div>

      </div>

      
      <div className="mt-auto flex flex-col items-start text-left z-10">
        <motion.h1
          className="flex justify-start overflow-hidden text-[18vw] md:text-[17.3vw] font-bold tracking-tighter leading-none"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {title.split("").map((char, index) => {
            const letterDelay = chaoticDelays[index];
            return (
              <motion.span 
                key={index} 
                variants={letterVariants}
                custom={letterDelay} 
                className={char === " " ? "w-[3vw]" : "inline-block"}
              >
                {char}
              </motion.span>
            );
          })}
        </motion.h1>
      </div>
      
    </main>
  );
}