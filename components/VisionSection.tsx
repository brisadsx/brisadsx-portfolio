"use client";

import { useRef, useEffect, MouseEvent } from "react";
import { motion, Variants } from "framer-motion";

export default function VisionSection({ isDarkTheme }: { isDarkTheme: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bgColor = isDarkTheme ? "bg-[#09090B]" : "bg-[#FAFAFA]";
  const solidOverlayColor = isDarkTheme ? "#FDCEDF" : "#E11D48";
  
  const crystalEffect = isDarkTheme 
    ? "text-[#FDCEDF]/70 mix-blend-screen" 
    : "text-[#E11D48]/50 mix-blend-multiply";

  const services = [
    "Digital Experiences",
    "eCommerce Platforms",
    "3D Web Environments",
    "Interactive Portfolios",
    "Landing Pages",
    "More +"
  ];

 
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } // Easing premium de Apple
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeAndPaintOverlay = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      ctx.fillStyle = solidOverlayColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeAndPaintOverlay();
    window.addEventListener("resize", resizeAndPaintOverlay);

    return () => window.removeEventListener("resize", resizeAndPaintOverlay);
  }, [solidOverlayColor]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    const brushRadius = typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 150; 
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, brushRadius);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)'); 
    gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.8)'); 
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); 
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={`relative flex items-center justify-center w-full h-[100vh] overflow-hidden transition-colors duration-1000 ${bgColor}`}
    >
      
      {/* 1. LA PARED SÓLIDA QUE SE BORRA (z-20) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
      />

      {/* 2. EL PÓSTER TIPOGRÁFICO DEBAJO (z-10 animado) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Se anima cuando bajás hasta acá
        className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none px-4"
      >
        
        <motion.p variants={itemVariants} className={`text-sm md:text-base font-medium tracking-tighter uppercase mb-6 md:mb-12 opacity-70 ${crystalEffect}`}>
          what we can build together
        </motion.p>
        
        <div className="flex flex-col items-center justify-center w-full gap-2 md:gap-4">
          {services.map((service, index) => (
            <motion.h2 
              key={index}
              variants={itemVariants}
              className={`text-[12vw] md:text-[7vw] tracking-tighter leading-[0.6] text-center w-full whitespace-nowrap ${crystalEffect}`}
            >
              {service}
            </motion.h2>
          ))}
        </div>

      </motion.div>

    </section>
  );
}