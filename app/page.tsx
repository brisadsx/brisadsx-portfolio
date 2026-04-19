"use client";

import Preloader from "../components/Preloader";
import VisionSection from "../components/VisionSection";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";


const ScrambleLink = ({ href, target, underline, children, isDarkTheme, forceDarkText = false }: { href: string; target?: string; underline?: boolean; children: string; isDarkTheme?: boolean; forceDarkText?: boolean }) => {
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
  let hoverTextColorClass = isDarkTheme ? "hover:text-[#FDCEDF]/70" : "hover:text-[#E11D48]/50";
  let decorationColorClass = isDarkTheme ? "decoration-[#FDCEDF]/70" : "decoration-[#E11D48]/50";

  
  if (forceDarkText) {
    if (isDarkTheme) {
     
      baseTextColorClass = "text-[#111111]/60";
      hoverTextColorClass = "hover:text-[#111111]";
      decorationColorClass = "decoration-[#111111]/80";
    } else {

      baseTextColorClass = "text-[#FAFAFA]/60";
      hoverTextColorClass = "hover:text-[#FAFAFA]/80";
      decorationColorClass = "decoration-[#FAFAFA]";
    }
  }

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
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

const chaoticDelays = [3.3, 2.5, 3.7, 2.9, 4.1, 2.3, 3.2, 2.7, 3.5, 2.6, 3.9, 3.0, 3.1, 4.2];
const subtitleDelays = [3.4, 2.8, 4.0, 2.5, 3.7, 3.1, 4.2, 2.7, 3.6, 3.0, 4.1, 2.9, 3.8, 3.2, 3.5];
const scrollDelays = [0.1, 0.35, 0.05, 0.4, 0.2, 0.5, 0.15, 0.25, 0.45, 0.0, 0.3, 0.55];

export default function Home() {
  const { isDarkTheme, toggleTheme } = useTheme(); 
  const title = "BrisaGabriela";
  const section2Lines = ["i'm translating", "complex logic", "into seamless", "interfaces."];
  const subtitle1 = "crafting experiences".match(/.{1,2}/g) || [];
  const subtitle2 = "explore the process".match(/.{1,2}/g) || [];

  const container: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const letterVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (customDelay: number) => ({
      opacity: 1, transition: { delay: customDelay, duration: 0.0, ease: "linear" }
    }),
  };

  const trainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: trainProgress } = useScroll({
    target: trainRef,
    offset: ["start end", "end end"] 
  });

  const trainX = useTransform(
    trainProgress, 
    [0, 0.5, 1], 
    ["calc(100% - 8px)", "calc(100% - 8px)", "0%"]
  );

  
  const [navOnVision, setNavOnVision] = useState(false);

  useEffect(() => {
    const unsubscribe = trainProgress.on("change", (latest) => {
      if (latest >= 0.8 && latest <= 1.0) {
        setNavOnVision(true);
      } else {
        setNavOnVision(false);
      }
    });
    return () => unsubscribe();
  }, [trainProgress]);

  return (
    <main className={`relative flex flex-col font-neue-haas transition-colors duration-500 ${isDarkTheme ? "bg-[#09090B]" : "bg-[#FAFAFA]"}`}>
      <Preloader />

      {/* Nav is z-50 (Siempre arriba de todo) */}
      <motion.nav 
        className="fixed top-0 left-0 w-full pt-4 px-6 md:pt-6 md:px-10 z-50 grid grid-cols-3 items-start text-base md:text-[1.5rem] tracking-[0.2em] font-bold bg-transparent"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }} 
      >
        <div className="flex justify-start tracking-tighter">
            {/* Pasamos navOnVision para forzar texto oscuro */}
            <ScrambleLink href="#" isDarkTheme={isDarkTheme} forceDarkText={navOnVision}>brisadsx</ScrambleLink>
        </div>
        <div className="flex justify-start items-center tracking-tighter relative">
            <button onClick={toggleTheme} className={`absolute -left-[40px] w-3.5 h-3.5 hover:rotate-90 transition-transform duration-300 ${isDarkTheme ? "bg-[#FDCEDF]/80" : "bg-[#E11D48]/50"}`} aria-label="Alternar tema oscuro/claro" />
            <div className="ml-[190px]">
                <ScrambleLink href="#" isDarkTheme={isDarkTheme} forceDarkText={navOnVision}>about</ScrambleLink>
            </div>
        </div>
        <div className="flex justify-end gap-4 md:gap-8 tracking-tighter">
          <ScrambleLink href="https://www.linkedin.com/in/brisa-gabriela/" target="_blank" underline isDarkTheme={isDarkTheme} forceDarkText={navOnVision}>in</ScrambleLink>
          <ScrambleLink href="https://github.com/brisadsx" target="_blank" underline isDarkTheme={isDarkTheme} forceDarkText={navOnVision}>git</ScrambleLink>
          <ScrambleLink href="mailto:brisadsx@gmail.com" underline isDarkTheme={isDarkTheme} forceDarkText={navOnVision}>mail</ScrambleLink>
        </div>
      </motion.nav>

      {/* Sections 1 & 2 are z-10 */}
      <div className="relative w-full overflow-x-hidden z-10">
        <div className={`transition-colors duration-500 ${isDarkTheme ? "bg-[#09090B] text-[#FDCEDF]" : "bg-[#FAFAFA] text-[#E11D48]"}`}>
          <motion.div 
            className={`absolute top-0 bottom-0 left-[35.333%] w-[2px] z-50 pointer-events-none transition-all duration-500 ${isDarkTheme ? "bg-[#FDCEDF]/70 mix-blend-screen" : "bg-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
          />

          <section className={`relative flex flex-col h-screen p-6 md:p-10 z-10 backdrop-blur-sm transition-colors duration-500 ${isDarkTheme ? "bg-[#09090B]/40" : "bg-[#F9F5F6]/40"}`}>       
            <div className="absolute bottom-4 -left-2 right-2 md:bottom-8 md:-left-[-1.8rem] md:right-10 z-0 pointer-events-none select-none">
              <h1 className={`flex flex-col w-full text-[26vw] md:text-[8vw] font-bold uppercase opacity-[0.16] md:opacity-[0.18] blur-[3px] tracking-[-0.5rem] leading-[0.8] transition-colors duration-500 ${isDarkTheme ? "text-zinc-100" : "text-zinc-900"}`}>
                <span className="text-left">web designer,</span>
                <span className="flex justify-between w-full"><span>based</span><span>in bs. as.</span></span>
                <span className="flex justify-between w-full"><span>and</span><span>creative tech</span></span>
              </h1>
            </div>
            <motion.div className={`absolute left-0 right-0 top-[190px] h-[1.9px] z-0 transition-all duration-500 ${isDarkTheme ? "bg-[#FDCEDF]/70 mix-blend-screen" : "bg-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`} initial={{ scaleX: 0, transformOrigin: "left" }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 2.0, ease: [0.76, 0, 0.24, 1] }} />
              <div className={`absolute top-[200px] left-[33%] flex flex-col text-[1.5rem] tracking-tighter z-10 transition-all duration-500 ${isDarkTheme ? "text-[#FDCEDF]/70 mix-blend-screen" : "text-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}>
                <motion.div className="flex whitespace-pre" variants={container} initial="hidden" animate="visible">
                  {subtitle1.map((chunk, index) => (
                    <motion.span key={`sub1-${index}`} variants={letterVariants} custom={subtitleDelays[index]}>{chunk}</motion.span>
                  ))}
                </motion.div>
                <motion.div className="flex whitespace-pre mt-[140px]" variants={container} initial="hidden" animate="visible">
                  {subtitle2.map((chunk, index) => (
                    <motion.span key={`sub2-${index}`} variants={letterVariants} custom={subtitleDelays[index]}>{chunk}</motion.span>
                  ))}
                </motion.div>
              </div>
            <div className="mt-auto flex flex-col items-start text-left z-10 pb-0 -mb-2 md:-mb-5">
              <motion.h1 className={`flex justify-start font-bold text-[23vw] md:text-[18.3vw] tracking-[-0.08em] -ml-4 md:-ml-2 leading-none transition-all duration-500 ${isDarkTheme ? "text-[#FDCEDF]/70 mix-blend-screen" : "text-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`} variants={container} initial="hidden" animate="visible">
                {title.split("").map((char, index) => { const letterDelay = chaoticDelays[index]; return (<motion.span key={index} variants={letterVariants} custom={letterDelay} className={char === " " ? "w-[3vw]" : "inline-block"}>{char}</motion.span>); })}
              </motion.h1>
            </div>
          </section>

          <section className={`relative flex flex-col justify-center min-h-[200vh] py-6 md:py-10 pb-[25vh] z-20 backdrop-blur-sm transition-colors duration-500 ${isDarkTheme ? "bg-[#09090B]/40" : "bg-[#F9F5F6]/40"}`}>
            <motion.div className={`absolute left-0 right-0 top-0 h-[2px] w-full z-30 transition-all duration-500 origin-left ${isDarkTheme ? "bg-[#FDCEDF]/70 mix-blend-screen" : "bg-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} />
            <motion.div className={`absolute left-0 right-0 top-[30vh] h-[2px] w-full z-30 transition-all duration-500 origin-left ${isDarkTheme ? "bg-[#FDCEDF]/70 mix-blend-screen" : "bg-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} />
            <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
              <div className="absolute top-[40vh] md:top-[45vh] w-full flex flex-col pointer-events-none overflow-hidden z-0 px-4 md:px-8">
                <div className={`font-black font-bold opacity-[0.16] md:opacity-[0.18] blur-[3px] tracking-[-0.5rem] leading-[0.8] transition-colors duration-500 w-full uppercase whitespace-nowrap text-[13vw] md:text-[8.3vw] ${isDarkTheme ? "text-zinc-100" : "text-zinc-900"}`}>
                  <div className="text-left">ux/ui design</div>
                  <div className="text-center pr-[15%]">art direction</div>
                  <div className="text-left">creative tech</div>
                  <div className="text-center pl-[15%]">information</div>
                  <div className="text-right">& architecture</div>
                  <div className="text-left">interaction</div>
                  <div className="text-center">(each integrated pixel)</div>
                  <div className="text-center pr-[10%]">prototyping</div>
                  <div className="text-right">and</div>
                  <div className="text-right pr-[25%]">mooooo</div>
                  <div className="text-right">ooooore</div>
                </div>
              </div>
            </div>
            <div className="z-10 flex flex-col items-end justify-center w-full pt-[45vh] md:pt-[37vh]">
              {section2Lines.map((line, lineIndex) => (<motion.h2 key={lineIndex} className={`flex justify-end w-full pr-4 md:pr-8 text-[19vw] sm:text-[14vw] md:text-[15vw] lg:text-[11vw] font-bold tracking-[-0.06em] leading-[0.80] transition-all duration-500 ${isDarkTheme ? "text-[#FDCEDF]/70 mix-blend-screen" : "text-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`} variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>{line.split("").map((char, index) => { const letterDelay = scrollDelays[(index + lineIndex * 2) % scrollDelays.length]; return (<motion.span key={index} variants={letterVariants} custom={letterDelay} className={char === " " ? "w-[2vw]" : "inline-block"}>{char}</motion.span>); })}</motion.h2>))}
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} className={`mt-10 self-end mr-[15vw] md:mr-[55vw] text-left text-base md:text-xl tracking-tighter leading-[1.1] max-w-sm md:max-w-md transition-all duration-500 ${isDarkTheme ? "text-[#FDCEDF]/70 mix-blend-screen" : "text-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}>bridging the gap between<br />robust software architecture<br />and intuitive digital design.<br />turning deep complexity<br />into invisible logic,<br />focusing on every detail<br />to build web experiences<br />that are not just functional,<br />but genuinely a joy to use.</motion.p>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 1, delay: 0.6 }} className={`mt-[30vh] md:mt-[30vh] mb-[16vh] md:mb-[6vh] pr-4 md:pr-8 flex flex-row items-center justify-end gap-2 md:gap-6 text-[18vw] sm:text-[14vw] md:text-[10vw] tracking-[-0.08em] leading-none transition-all duration-500 ${isDarkTheme ? "text-[#FDCEDF]/70 mix-blend-screen" : "text-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`}><span>est.&apos;26</span><span className="px-8 md:px-38">—</span><span>bg®</span></motion.div>
            </div>
            <motion.div className={`absolute left-0 right-0 bottom-[15vh] h-[2px] w-full z-30 transition-all duration-500 origin-left ${isDarkTheme ? "bg-[#FDCEDF]/70 mix-blend-screen" : "bg-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 1.5, delay: 0.6, ease: [0.76, 0, 0.24, 1] }} />
            <motion.div className={`absolute left-0 right-0 bottom-[4vh] h-[2px] w-full z-30 transition-all duration-500 origin-left ${isDarkTheme ? "bg-[#FDCEDF]/70 mix-blend-screen" : "bg-[#E11D48]/50 mix-blend-multiply drop-shadow-[0_1px_2px_rgba(253,206,223,0.8)]"}`} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "50px" }} transition={{ duration: 1.5, delay: 0.6, ease: [0.76, 0, 0.24, 1] }} />
          </section>
        </div>
      </div>
      
      {/* Vision sliding block is z-30 */}
      <div ref={trainRef} className="relative z-30 h-[200vh] -mt-[100vh] pointer-events-none">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-auto">
          <motion.div 
            style={{ x: trainX }}
            className={`w-full h-full shadow-[-10px_0_40px_rgba(0,0,0,0.4)]`}
          >
            <VisionSection isDarkTheme={isDarkTheme} />
          </motion.div>
        </div>
      </div>

      

    </main>
  );
}