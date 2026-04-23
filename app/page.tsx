"use client";

import Preloader from "../components/Preloader";
import WorksSection from "../components/WorksSection"; 
import { motion, useSpring, Variants, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const ScrambleLink = ({ href, target, onClick, underline, children, isDarkTheme, forceDarkText = false }: { href: string; target?: string; onClick?: (e: React.MouseEvent) => void; underline?: boolean; children: string; isDarkTheme?: boolean; forceDarkText?: boolean }) => {
  const [text, setText] = useState(children);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const normalText = children;
  const reversedText = children.split("").reverse().join("");

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setText(reversedText);
    timeoutRef.current = setTimeout(() => { setText(normalText); }, 150); 
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setText(normalText);
  };

  let baseTextColorClass = "text-zinc-400";
  let hoverTextColorClass = isDarkTheme ? "hover:text-[#FDCEDF]/80" : "hover:text-[#FF8FAB]/80";
  let decorationColorClass = isDarkTheme ? "decoration-[#FDCEDF]/80" : "decoration-[#FF8FAB]/80";

  // Lógica para forzar el contraste cuando se está en la VisionSection
  if (forceDarkText) {
    if (isDarkTheme) {
      baseTextColorClass = "text-[#111111]/80"; // Negro/gris oscuro para resaltar sobre el rosa pastel oscuro
      hoverTextColorClass = "hover:text-[#111111]";
      decorationColorClass = "decoration-[#111111]/80";
    } else {
      baseTextColorClass = "text-[#FAFAFA]/80"; // Blanco para resaltar sobre el rosa vibrante claro
      hoverTextColorClass = "hover:text-[#FAFAFA]";
      decorationColorClass = "decoration-[#FAFAFA]";
    }
  }

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseTextColorClass} transition-colors duration-300 font-medium cursor-pointer ${hoverTextColorClass} ${
        underline ? `hover:underline decoration-2 underline-offset-[2px] ${decorationColorClass}` : ""
      }`}
    >
      {text}
    </a>
  );
};

const scrollDelays = [0.1, 0.35, 0.05, 0.4, 0.2, 0.5, 0.15, 0.25, 0.45, 0.0, 0.3, 0.55];

export default function Home() {
  const { isDarkTheme, toggleTheme } = useTheme(); 

  const [isHeroActive, setIsHeroActive] = useState(true);
  
  // 🔥 NUEVO ESTADO: Rastrea si el usuario está viendo la VisionSection
  const [isInVision, setIsInVision] = useState(false);

  useEffect(() => {
    if (isHeroActive) {
      document.body.style.overflow = "hidden"; 
      window.scrollTo(0, 0); 
    } else {
      document.body.style.overflow = "auto"; 
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isHeroActive]);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHeroActive(false); 
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHeroActive(true); 
    setIsInVision(false); // Resetea el estado al volver al hero
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paragraphText = "I believe creativity isn't just a skill, it's a mindset. Born from a passion for bold ideas and beautifully crafted storytelling, I collaborate with visionary clients to shape identities at the intersection of art and innovation.";
  const words = paragraphText.split(" ");

  const boomVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(4px)" }, 
    visible: (delay: number) => ({
      opacity: 1, 
      filter: "blur(0px)",
      transition: { delay: delay, duration: 0.03, ease: "linear" }
    })
  };

  const [isHoveringName, setIsHoveringName] = useState(false);
  const cursorX = useSpring(0, { stiffness: 300, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 30 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left - 150); 
      cursorY.set(e.clientY - rect.top - 200);  
    }
  };

  const heroTextColor = isDarkTheme ? "text-[#FDCEDF]" : "text-[#FF8FAB]"; 
  const heroBgColor = isDarkTheme ? "bg-[#09090B]" : "bg-[#fcfbf9]";
  
  // Color del botón de tema adaptable
  const themeButtonColor = isInVision 
    ? (isDarkTheme ? "bg-[#111111]/80" : "bg-[#FAFAFA]/80")
    : (isDarkTheme ? "bg-[#FDCEDF]/80" : "bg-[#FF8FAB]/80");

  return (
    <main className={`relative flex flex-col overflow-x-hidden transition-colors duration-500 ${isDarkTheme ? "bg-[#09090B]" : "bg-[#FAFAFA]"}`}>
      <Preloader />

      {/* NAVBAR */}
      <motion.nav 
        className="fixed top-0 left-0 w-full pt-4 px-6 md:pt-6 md:px-10 z-50 grid grid-cols-3 items-start text-base md:text-[1.5rem] tracking-[0.2em] font-bold bg-transparent pointer-events-auto transition-colors duration-500"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }} 
      >
        <div className="flex justify-start tracking-tighter">
            <ScrambleLink href="#" onClick={handleLogoClick} isDarkTheme={isDarkTheme} forceDarkText={isInVision}>brisadsx</ScrambleLink>
        </div>
        <div className="flex justify-start items-center tracking-tighter relative">
            <button onClick={toggleTheme} className={`absolute -left-[40px] w-3.5 h-3.5 hover:rotate-90 transition-all duration-500 ${themeButtonColor}`} aria-label="Alternar tema oscuro/claro" />
            <div className="ml-[190px]">
                <ScrambleLink href="#" isDarkTheme={isDarkTheme} forceDarkText={isInVision}>about</ScrambleLink>
            </div>
        </div>
        <div className="flex justify-end gap-4 md:gap-8 tracking-tighter">
          <ScrambleLink href="https://www.linkedin.com/in/brisa-gabriela/" target="_blank" underline isDarkTheme={isDarkTheme} forceDarkText={isInVision}>in</ScrambleLink>
          <ScrambleLink href="https://github.com/brisadsx" target="_blank" underline isDarkTheme={isDarkTheme} forceDarkText={isInVision}>git</ScrambleLink>
          <ScrambleLink href="mailto:brisadsx@gmail.com" underline isDarkTheme={isDarkTheme} forceDarkText={isInVision}>mail</ScrambleLink>
        </div>
      </motion.nav>

      <motion.div 
        className={`fixed inset-0 z-40 w-screen h-screen ${heroBgColor} flex items-center origin-left`}
        animate={{ x: isHeroActive ? "0%" : "-100%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        ref={heroRef} onMouseMove={handleMouseMove}
      >
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          animate={{ opacity: isHoveringName ? 1 : 0, scale: isHoveringName ? 1 : 0.8 }}
          transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
          className="absolute top-0 left-0 w-[300px] h-[400px] pointer-events-none z-0 overflow-hidden rounded-lg"
        >
          <video src="/images/IMG_5494.MOV" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </motion.div>

        <div className="w-full h-full flex flex-col md:flex-row items-center justify-between px-[5vw] md:px-[10vw]">
          
          <div 
            className="flex flex-col items-start z-10 cursor-default"
            onMouseEnter={() => setIsHoveringName(true)}
            onMouseLeave={() => setIsHoveringName(false)}
          >
            <h1 className={`font-bold text-[13vw] md:text-[6vw] tracking-tight leading-[0.8] ${heroTextColor}`}>
              Brisa
            </h1>
            <h1 className={`font-bold text-[13vw] md:text-[6vw] tracking-tight leading-[0.8] ${heroTextColor}`}>
              Gabriela
            </h1>
            
            <div className="mt-8 text-sm md:text-lg lowercase">
              <ScrambleLink href="#" onClick={handleCtaClick} underline isDarkTheme={isDarkTheme}>
                hi, click here to see more
              </ScrambleLink>
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-end z-10">
            <div className={`max-w-xl text-lg md:text-2xl font-medium leading-[1.2] tracking-tight text-right md:text-left ${isDarkTheme ? "text-[#FDCEDF]/80" : "text-[#FF8FAB]/80"}`}>
              <AnimatePresence>
                {isHeroActive && words.map((word, i) => {
                  const chaoticDelay = scrollDelays[(i * 3) % scrollDelays.length] + (i * 0.02) + 0.5;
                  return (
                    <motion.span 
                      key={`${word}-${i}`} 
                      custom={chaoticDelay} 
                      variants={boomVariants} 
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="inline-block mr-[0.3em]"
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="fixed inset-0 z-30 w-screen h-screen overflow-hidden" 
        animate={{ x: isHeroActive ? "100%" : "0%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <WorksSection isDarkTheme={isDarkTheme} onVisionEnter={setIsInVision} />
      </motion.div>

    </main>
  );
}