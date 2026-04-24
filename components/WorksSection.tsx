"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import Image from "next/image";
import VisionSection from "./VisionSection";

interface Project {
  id: number;
  name: string;
  role: string;
  image: string;
  link: string;
  flex: string;
}

interface ProjectCardProps {
  project: Project;
  isDarkTheme: boolean;
  secondaryTextColor: string;
}

const projects: Project[] = [
  { 
    id: 1, 
    name: "Dear Music, Thanks", 
    role: "Creative Technologist", 
    image: "/images/proyect1.png",
    link: "https://dear-music-thanks.vercel.app/",
    flex: "flex-[1]" 
  },
  { 
    id: 2, 
    name: "Bseth Bags", 
    role: "Product Designer", 
    image: "/images/proyect3.png",
    link: "https://bseth-intro.vercel.app/",
    flex: "flex-[1]" 
  },
  { 
    id: 3, 
    name: "Saylo", 
    role: "3D Web Developer", 
    image: "/images/proyect2.png",
    link: "https://saylo-legacy.vercel.app/",
    flex: "flex-[1.6]" 
  },
];

function ProjectCard({ project, isDarkTheme, secondaryTextColor }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useSpring(0, { stiffness: 300, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Proporción idéntica a la imagen padre
    const cursorW = rect.width * 0.3;
    const cursorH = rect.height * 0.3;
    
    cursorX.set(e.clientX - rect.left - cursorW / 2);
    cursorY.set(e.clientY - rect.top - cursorH / 2);
  };

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative ${project.flex} flex flex-col group cursor-none`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="w-full h-full overflow-hidden relative">
        <Image 
          src={project.image} 
          alt={project.name} 
          fill
          unoptimized
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
        />

        <motion.div
          style={{ x: cursorX, y: cursorY }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
          className="absolute top-0 left-0 w-[30%] h-[30%] pointer-events-none z-50 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          <Image 
            src={project.image} 
            alt="Hover preview" 
            fill
            unoptimized
            className="object-cover" 
          />
        </motion.div>
      </div>

      <div className={`absolute -bottom-16 left-0 flex flex-col ${isDarkTheme ? "text-white" : "text-black"}`}>
        <span className="font-medium text-lg md:text-xl leading-[0.9] tracking-tight">
          {project.name}
        </span>
        <span className={`text-sm md:text-base leading-[0.9] mt-1 ${secondaryTextColor}`}>
          {project.role}
        </span>
      </div>
    </a>
  );
}

// 🔥 Modificamos las props para recibir onVisionEnter
export default function WorksSection({ isDarkTheme, onVisionEnter }: { isDarkTheme: boolean, onVisionEnter?: (isInVision: boolean) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Función para verificar la posición del scroll
    const checkScrollPosition = () => {
      // Si hemos scrolleado más allá de la mitad de la pantalla, estamos en VisionSection
      if (container.scrollLeft > window.innerWidth * 0.5) {
        if (onVisionEnter) onVisionEnter(true);
      } else {
        if (onVisionEnter) onVisionEnter(false);
      }
    };

    // Escuchamos el evento de scroll nativo
    container.addEventListener("scroll", checkScrollPosition);

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      
      // 🔥 FIX: Detectamos si estamos en los extremos (con margen de 5px)
      const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 5;
      const isAtStart = container.scrollLeft <= 5;

      // Si intentamos scrollear hacia abajo y ya estamos en el final, liberamos el scroll
      if (e.deltaY > 0 && isAtEnd) return;
      
      // Si intentamos scrollear hacia arriba y ya estamos en el inicio, liberamos el scroll
      if (e.deltaY < 0 && isAtStart) return;

      // Si estamos en medio, prevenimos el comportamiento por defecto y controlamos el scroll
      e.preventDefault();

      if (isScrolling.current) return;

      if (e.deltaY > 0) {
        isScrolling.current = true;
        container.scrollBy({ left: window.innerWidth, behavior: "smooth" });
      } else if (e.deltaY < 0) {
        isScrolling.current = true;
        container.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 600);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", checkScrollPosition);
    };
  }, [onVisionEnter]);

  const textColor = isDarkTheme ? "text-[#FDCEDF]" : "text-[#FF8FAB]"; 
  const secondaryTextColor = isDarkTheme ? "text-zinc-400" : "text-zinc-500";

  return (
    <section 
      ref={scrollContainerRef} 
      // 🔥 FIX: h-screen cambiado a h-[100svh] (o podes dejar h-screen pero asegurate
      // que el contenedor padre en page.tsx tenga overflow-y-auto)
      className={`relative w-screen h-screen flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth ${isDarkTheme ? "bg-[#09090B]" : "bg-[#FAFAFA]"}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`section::-webkit-scrollbar { display: none; }`}</style>

      <div className="min-w-[100vw] h-full relative flex flex-col justify-center px-0 snap-center">
        
        <div className="absolute top-[15vh] left-[10vw] z-10">
          <h2 className={`text-3xl md:text-5xl font-medium tracking-tight ${textColor}`}>
            Selected Works
          </h2>
        </div>

        <div className="flex gap-[2px] w-[97vw] h-[60vh] mt-24 mx-auto">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isDarkTheme={isDarkTheme} 
              secondaryTextColor={secondaryTextColor} 
            />
          ))}
        </div>
      </div>

      <div className="min-w-[100vw] h-full snap-center">
        <VisionSection isDarkTheme={isDarkTheme} />
      </div>

    </section>
  );
}