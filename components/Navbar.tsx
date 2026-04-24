"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Componente ScrambleLink aislado
export const ScrambleLink = ({ href, target, onClick, underline, children, isDarkTheme, forceDarkText = false }: { href: string; target?: string; onClick?: (e: React.MouseEvent) => void; underline?: boolean; children: string; isDarkTheme?: boolean; forceDarkText?: boolean }) => {
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

  if (forceDarkText) {
    if (isDarkTheme) {
      baseTextColorClass = "text-[#111111]/80"; 
      hoverTextColorClass = "hover:text-[#111111]";
      decorationColorClass = "decoration-[#111111]/80";
    } else {
      baseTextColorClass = "text-[#FAFAFA]/80";
      hoverTextColorClass = "hover:text-[#FAFAFA]";
      decorationColorClass = "decoration-[#FAFAFA]";
    }
  }

  // Si es un enlace interno, usamos Link de Next.js
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${baseTextColorClass} transition-colors duration-300 font-medium cursor-pointer ${hoverTextColorClass} ${
          underline ? `hover:underline decoration-2 underline-offset-[2px] ${decorationColorClass}` : ""
        }`}
      >
        {text}
      </Link>
    );
  }

  // Si es externo o un ancla (#), usamos <a>
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

export default function Navbar({ onLogoClick, isInVision = false }: { onLogoClick?: (e: React.MouseEvent) => void, isInVision?: boolean }) {
  const { isDarkTheme, toggleTheme } = useTheme();
  const pathname = usePathname();
  
  // Determinamos si estamos en la página principal
  const isHome = pathname === "/";

  const themeButtonColor = isInVision 
    ? (isDarkTheme ? "bg-[#111111]/80" : "bg-[#FAFAFA]/80")
    : (isDarkTheme ? "bg-[#FDCEDF]/80" : "bg-[#FF8FAB]/80");

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full pt-4 px-6 md:pt-6 md:px-10 z-50 grid grid-cols-3 items-start text-base md:text-[1.5rem] tracking-[0.2em] font-bold bg-transparent pointer-events-auto transition-colors duration-500"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: isHome ? 1.8 : 0 }} 
    >
      <div className="flex justify-start tracking-tighter">
        {/* Si estamos en Home, usamos el onClick para volver al Hero. Si estamos en otra ruta, nos lleva a "/" */}
        {isHome && onLogoClick ? (
          <ScrambleLink href="#" onClick={onLogoClick} isDarkTheme={isDarkTheme} forceDarkText={isInVision}>brisadsx</ScrambleLink>
        ) : (
          <ScrambleLink href="/" isDarkTheme={isDarkTheme} forceDarkText={isInVision}>brisadsx</ScrambleLink>
        )}
      </div>
      <div className="flex justify-start items-center tracking-tighter relative">
          <button onClick={toggleTheme} className={`absolute -left-[40px] w-3.5 h-3.5 hover:rotate-90 transition-all duration-500 ${themeButtonColor}`} aria-label="Alternar tema oscuro/claro" />
          <div className="ml-[190px]">
              <ScrambleLink href="/about" isDarkTheme={isDarkTheme} forceDarkText={isInVision}>about</ScrambleLink>
          </div>
      </div>
      <div className="flex justify-end tracking-tighter">
        <ScrambleLink href="/contact" underline isDarkTheme={isDarkTheme} forceDarkText={isInVision}>
          contact
        </ScrambleLink>
      </div>
    </motion.nav>
  );
}