"use client";

import { useRef, useEffect, MouseEvent } from "react";
import { motion } from "framer-motion";

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

  // Duplicamos la lista para crear el efecto de scroll infinito sin cortes
  const duplicatedServices = [...services, ...services];

  // 1. LÓGICA DEL CANVAS: Crear, pintar y redimensionar la superposición sólida
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

    return () => {
      window.removeEventListener("resize", resizeAndPaintOverlay);
    };
  }, [solidOverlayColor]);

  // 2. LÓGICA DE BORRADO: El mouse actúa como goma de borrar física
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    
    // Pincel un poco más grande para que sea más fácil leer el texto en movimiento
    const brushRadius = typeof window !== 'undefined' && window.innerWidth < 768 ? 70 : 120; 
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, brushRadius);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)'); 
    gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.8)'); 
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
      
      {/* 1. EL CANVAS SÓLIDO (z-20 para tapar los textos) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none"
      />

      {/* 2. TEXTO PEQUEÑO ESTÁTICO (Fijo en el centro para anclar la vista) */}
      <div className="absolute z-10 flex w-full justify-center top-[15vh] md:top-[20vh] pointer-events-none">
        <p className={`text-sm md:text-base font-medium tracking-tighter opacity-70 ${crystalEffect}`}>
          what we can build together
        </p>
      </div>

      {/* 3. VERTICAL MARQUEE (El texto gigante desplazándose) */}
      <div className="absolute z-0 flex flex-col items-center justify-center w-full h-full pointer-events-none overflow-hidden">
        
        {/* motion.div hace el loop infinito moviéndose del 0% al -50% (la mitad exacta) */}
        <motion.div 
          animate={{ y: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 25 
          }}
          className="flex flex-col items-center gap-4 md:gap-8 pt-[50vh]"
        >
          {duplicatedServices.map((service, index) => (
            <h2 
              key={index}
              className={`text-[12vw] md:text-[6vw] tracking-tighter leading-[0.6] text-center w-full whitespace-nowrap ${crystalEffect}`}
            >
              {service}
            </h2>
          ))}
        </motion.div>

      </div>

    </section>
  );
}