"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

export default function VisionSection({ isDarkTheme }: { isDarkTheme: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 👇 COLOCA AQUÍ LOS NOMBRES EXACTOS DE TUS DOS IMÁGENES
  const imageLight = "/images/foto.jpeg"; 
  const imageDark = "/images/foto2.jpeg";   
  
  const currentImage = isDarkTheme ? imageDark : imageLight;

  // Efecto cristalino tipográfico
  const crystalEffect = isDarkTheme 
    ? "text-[#FDCEDF]/70 mix-blend-screen" 
    : "text-[#E11D48]/50 mix-blend-multiply";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000 };
    
    const gridSize = 12; 
    const charList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "■", "█", "▓", "▒", "░", "+", "-", "x"];

    let cols = 0;
    let rows = 0;
    let lifeArray = new Float32Array(0);
    let charArray = new Array(0);
    let gridColors = new Uint32Array(0);

    const img = new window.Image();
    img.src = currentImage; // El canvas ahora lee la imagen activa

    const resizeAndSetup = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      cols = Math.ceil(canvas.width / gridSize);
      rows = Math.ceil(canvas.height / gridSize);
      const totalCells = cols * rows;

      lifeArray = new Float32Array(totalCells);
      charArray = new Array(totalCells).fill("0");
      gridColors = new Uint32Array(totalCells);

      const offCanvas = document.createElement("canvas");
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      const offCtx = offCanvas.getContext("2d");

      if (offCtx) {
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        const imgData = offCtx.getImageData(0, 0, canvas.width, canvas.height).data;

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const px = Math.min(x * gridSize + Math.floor(gridSize/2), canvas.width - 1);
            const py = Math.min(y * gridSize + Math.floor(gridSize/2), canvas.height - 1);
            
            const i = (py * canvas.width + px) * 4;
            const r = imgData[i];
            const g = imgData[i+1];
            const b = imgData[i+2];

            gridColors[y * cols + x] = (255 << 24) | (b << 16) | (g << 8) | r;
          }
        }
      }
    };

    img.onload = () => {
      resizeAndSetup();
      drawLoop();
    };

    window.addEventListener("resize", resizeAndSetup);

    const drawLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouse.x > 0 && mouse.y > 0) {
        const centerCol = Math.floor(mouse.x / gridSize);
        const centerRow = Math.floor(mouse.y / gridSize);
        const brushRadius = 10; 

        for (let r = -brushRadius; r <= brushRadius; r++) {
          for (let c = -brushRadius; c <= brushRadius; c++) {
            const distSq = r*r + c*c;
            if (distSq <= brushRadius * brushRadius) {
              const prob = 1 - (distSq / (brushRadius*brushRadius));
              if (Math.random() < prob * 0.7) { 
                const row = centerRow + r;
                const col = centerCol + c;

                if (row >= 0 && row < rows && col >= 0 && col < cols) {
                  const idx = row * cols + col;
                  lifeArray[idx] = 1.0; 
                  charArray[idx] = charList[Math.floor(Math.random() * charList.length)];
                }
              }
            }
          }
        }
      }

      ctx.font = `bold ${gridSize + 2}px monospace`; 
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < cols * rows; i++) {
        if (lifeArray[i] > 0) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = col * gridSize + gridSize / 2;
          const y = row * gridSize + gridSize / 2;

          const color = gridColors[i];
          const r = color & 0xFF;
          const g = (color >> 8) & 0xFF;
          const b = (color >> 16) & 0xFF;

          const tr = Math.min(255, r + 50);
          const tg = Math.min(255, g + 50);
          const tb = Math.min(255, b + 70);

          ctx.globalAlpha = lifeArray[i]; 
          ctx.fillStyle = `rgb(${tr}, ${tg}, ${tb})`;
          ctx.fillText(charArray[i], x, y);

          lifeArray[i] -= 0.03; 
        }
      }
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(drawLoop);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeAndSetup);
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkTheme, currentImage]); // Re-ejecuta el canvas si el tema cambia para recalcular colores

  return (
    <section ref={sectionRef} className={`relative h-[200vh] w-full transition-colors duration-1000 ${isDarkTheme ? "bg-[#09090B]" : "bg-[#FAFAFA]"}`}>
      
      {/* 1. IMÁGENES ANIMADAS CON CROSSFADE */}
      <div className="absolute inset-0 w-full h-[200vh] z-0">
        
        {/* Imagen del Tema Claro */}
        <Image 
          src={imageLight} 
          alt="Creative Vision Light" 
          fill 
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          className={`transition-opacity duration-1000 ease-in-out ${isDarkTheme ? "opacity-0" : "opacity-100"}`}
        />

        {/* Imagen del Tema Oscuro */}
        <Image 
          src={imageDark} 
          alt="Creative Vision Dark" 
          fill 
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          className={`transition-opacity duration-1000 ease-in-out ${isDarkTheme ? "opacity-100" : "opacity-0"}`}
        />

        <div className="absolute inset-0 w-full h-full bg-black/10 pointer-events-none" />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-[200vh] pointer-events-none z-10"
      />

      {/* 2. TEXTOS FLOTANTES */}
      <div className="absolute inset-0 w-full h-[200vh] pointer-events-none z-20">
        <div className={`absolute top-[15vh] left-6 md:left-10 font-bold tracking-tighter text-sm md:text-lg leading-[1.1] transition-colors duration-500 ${crystalEffect}`}>
          how i see design,<br />why it matters
        </div>
        <div className={`absolute top-[15vh] right-6 md:right-10 font-bold tracking-tighter text-sm md:text-lg transition-colors duration-500 ${crystalEffect}`}>
          © est. &apos;26
        </div>
        <div className={`absolute top-[90vh] right-6 md:right-10 max-w-[200px] md:max-w-xs text-right font-bold tracking-tighter text-sm md:text-lg leading-[1.1] transition-colors duration-500 ${crystalEffect}`}>
          nothing extravagant.<br />just functional, honest design<br />that does what it’s supposed to.
        </div>
        <div className={`absolute bottom-[15vh] right-6 md:right-10 max-w-[280px] md:max-w-md text-right font-bold tracking-tighter text-sm md:text-lg leading-[1.1] transition-colors duration-500 ${crystalEffect}`}>
          design isn’t magic. it’s struggle, fixation, and endless rethinking.<br />i take ideas, break them down, overanalyze every detail, and push through the chaos until something finally works.
        </div>
      </div>

      {/* 3. TEXTO GIGANTE */}
      <div className="absolute inset-0 w-full h-[200vh] pointer-events-none z-30">
        <div className="mt-[50vh] sticky top-[35vh] pl-6 md:pl-10 w-full">
          <h2 className={`text-[25vw] md:text-[20vw] font-bold tracking-[-0.08em] leading-[0.8] text-left transition-colors duration-500 ${crystalEffect}`}>
            my<br />vision
          </h2>
        </div>
      </div>

    </section>
  );
}