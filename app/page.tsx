"use client";

import Preloader from "../components/Preloader";
import WorksSection from "../components/WorksSection"; 
import Navbar, { ScrambleLink } from "../components/Navbar";
import { motion, useSpring, Variants, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const scrollDelays = [0.1, 0.35, 0.05, 0.4, 0.2, 0.5, 0.15, 0.25, 0.45, 0.0, 0.3, 0.55];

export default function Home() {
  const { isDarkTheme } = useTheme(); 
  const [isHeroActive, setIsHeroActive] = useState(true);
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

  useEffect(() => {
    if (isHeroActive) {
      document.title = "Brisa Gabriela - Creative Technologist";
    } else if (isInVision) {
      document.title = "Services - Brisa Gabriela";
    } else {
      document.title = "Works - Brisa Gabriela";
    }
  }, [isHeroActive, isInVision]);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHeroActive(false); 
  };

  // Esta función se la pasamos al Navbar
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHeroActive(true); 
    setIsInVision(false); 
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paragraphText = "I believe creativity isn't just a skill, it's a mindset. Born from a passion for bold ideas and beautifully crafted code, my focus is on building digital experiences at the intersection of art and innovation.";
  const words = paragraphText.split(" ");

  const boomVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(4px)" }, 
    visible: (delay: number) => ({
      opacity: 1, 
      filter: "blur(0px)",
      transition: { delay: delay + 1.0, duration: 0.03, ease: "linear" }
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

  return (
    <main className={`relative flex flex-col overflow-x-hidden transition-colors duration-500 ${isDarkTheme ? "bg-[#09090B]" : "bg-[#FAFAFA]"}`}>

      <style>{`
        ::selection {
          background-color: ${isDarkTheme ? '#fdcedf86' : '#ff8fab7e'};
          color: ${isDarkTheme ? '#FDCEDF' : '#FF8FAB'};
        }
      `}</style>

      <Preloader />

      {/* 🔥 Usamos el nuevo Navbar */}
      <Navbar onLogoClick={handleLogoClick} isInVision={isInVision} />

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
            
            <div className="mt-8 text-base md:text-[1.25rem] tracking-tight lowercase">
              <ScrambleLink 
                href="#" 
                onClick={handleCtaClick} 
                underline 
                isDarkTheme={isDarkTheme}
              >
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