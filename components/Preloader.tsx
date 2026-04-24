"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Preloader({ text = "I am Brisa Gabriela" }: { text?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkTheme } = useTheme(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const bgColor = isDarkTheme ? "bg-[#FDCEDF]/80" : "bg-[#FF8FAB]/80";
  const textColor = isDarkTheme ? "text-[#09090B]" : "text-[#F9F5F6]";

  const isShortText = text === "Contact";
  
  // posiciones para celulares
  const initialX_Mobile = isShortText ? "10%" : "0%";
  const animateX_Mobile = isShortText ? "-5%" : "-15%";

  // posiciones para computadoras
  const initialX_Desktop = isShortText ? "20%" : "0%";
  const animateX_Desktop = isShortText ? "5%" : "-15%";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={`fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl transition-colors duration-500 ${bgColor}`}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
        >
          <div className="overflow-hidden w-full flex justify-start">
            <motion.h1
              className={`font-neue-haas text-[25vw] md:text-[28vw] tracking-[-0.05em] whitespace-nowrap transition-colors duration-500 ${textColor}`}
              
              initial={{ x: initialX_Mobile }} 
              animate={{ 
                x: [initialX_Mobile, animateX_Mobile], 
                
                "@media (min-width: 768px)": { x: [initialX_Desktop, animateX_Desktop] }
              } as unknown as import("framer-motion").TargetAndTransition} 
              
              transition={{ 
                duration: 2.5, 
                ease: "linear" 
              }}
            >
              {text}
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}