"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#E11D48]/50 backdrop-blur-xl"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
        >
          <div className="overflow-hidden w-full flex justify-start">
            <motion.h1
              className="font-neue-haas text-[25vw] md:text-[28vw] font-bold tracking-[-0.05em] text-[#F9F5F6] whitespace-nowrap pl-[5vw]"
              initial={{ x: "0%" }} 
              animate={{ x: "-15%" }} 
              transition={{ 
                duration: 2.5, 
                ease: "linear" 
              }}
            >
              I am Brisa Gabriela
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}