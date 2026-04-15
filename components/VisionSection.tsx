"use client";

import { useRef, useEffect, MouseEvent } from "react";
import { motion, Variants } from "framer-motion";

export default function VisionSection({ isDarkTheme }: { isDarkTheme: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Colores del tema base
  const bgColor = isDarkTheme ? "bg-[#09090B]" : "bg-[#FAFAFA]";
  const solidOverlayColor = isDarkTheme ? "#FDCEDF" : "#E11D48";
  
  // 🔥 RESTAURADO: Tu efecto cristalino EXACTO con los mix-blend modes
  const crystalEffect = isDarkTheme 
    ? "text-[#FDCEDF]/70 mix-blend-screen" 
    : "text-[#E11D48]/50 mix-blend-multiply";

  // Textos de tus servicios (Palabras clave profesionales y vendibles)
  const services = [
    "Digital Experiences",
    "E-Commerce & SaaS",
    "3D Web Environments",
    "Interactive Portfolios",
    "Landing Pages"
  ];

  // 1. LÓGICA DEL CANVAS: Crear, pintar y redimensionar la superposición sólida
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Función de redimensionamiento y pintado inicial
    const resizeAndPaintOverlay = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      // Pintamos el canvas completamente del color rosa/rojo del tema
      ctx.fillStyle = solidOverlayColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Ejecutamos inicialmente y escuchamos el redimensionamiento
    resizeAndPaintOverlay();
    window.addEventListener("resize", resizeAndPaintOverlay);

    // Limpieza del listener
    return () => {
      window.removeEventListener("resize", resizeAndPaintOverlay);
    };
  }, [solidOverlayColor]); // Se repinta limpio y sin estados extra cuando cambia el color

  // 2. LÓGICA DE BORRADO: El mouse actúa como goma de borrar física
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // ESTA ES LA MAGIA: Cambiamos el modo de composición para que el dibujo borre lo existente
    ctx.globalCompositeOperation = 'destination-out';
    
    // Dibujamos un círculo de borrado suave (Goma de borrar)
    const brushRadius = typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 100; 
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, brushRadius);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)'); 
    gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.8)'); 
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); 
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Restauramos el modo de composición predeterminado
    ctx.globalCompositeOperation = 'source-over';
  };

  // 3. VARIANTES DE FRAMER MOTION
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
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

      {/* 2. TEXTOS CENTRALES (z-10 para quedar debajo de la "goma de borrar") */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 flex flex-col items-center justify-center gap-2 md:gap-4 text-center px-4 pointer-events-none w-full"
      >
        <motion.p variants={itemVariants} className={`text-sm md:text-base font-medium tracking-tight mb-4 md:mb-8 ${crystalEffect}`}>
          what we can build together
        </motion.p>
        
        {services.map((service, index) => (
          <motion.h2 
            key={index}
            variants={itemVariants}
            className={`text-[12vw] md:text-[6.5vw] font-bold tracking-[-0.08em] leading-[0.85] ${crystalEffect}`}
          >
            {service}
          </motion.h2>
        ))}
      </motion.div>

    </section>
  );
}