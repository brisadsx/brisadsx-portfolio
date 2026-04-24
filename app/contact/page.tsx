"use client";

import { useTheme } from "../../context/ThemeContext";
import Navbar from "../../components/Navbar";
import Link from "next/link"; // 🔥 El import tiene que estar acá arriba

export default function ContactPage() {
  const { isDarkTheme } = useTheme();

  const bgColor = isDarkTheme ? "bg-[#09090B]" : "bg-[#FAFAFA]";
  const textColor = isDarkTheme ? "text-[#FAFAFA]" : "text-[#111111]";
  const mutedTextColor = isDarkTheme ? "text-zinc-500" : "text-zinc-400";
  const borderColor = isDarkTheme ? "border-zinc-800" : "border-zinc-300";
  const themeHex = isDarkTheme ? "#FDCEDF" : "#FF8FAB";
  const bgInput = "bg-transparent";
  const hoverTextColor = isDarkTheme ? "hover:text-[#FDCEDF]" : "hover:text-[#FF8FAB]";

  const checkboxColorClass = isDarkTheme 
    ? "checked:bg-[#FDCEDF] checked:border-[#FDCEDF]" 
    : "checked:bg-[#FF8FAB] checked:border-[#FF8FAB]";

  return (
    <main className={`relative w-full min-h-screen flex flex-col transition-colors duration-500 ${bgColor}`}>
      
      <style>{`
        ::selection {
          background-color: ${isDarkTheme ? '#fdcedf86' : '#ff8fab7e'};
          color: ${isDarkTheme ? '#FDCEDF' : '#FF8FAB'};
        }
      `}</style>

      <Navbar />

      <section className="relative w-full flex flex-col px-6 md:px-[10vw] pt-40 md:pt-56 pb-24 z-10 flex-grow">
        
        {/* Título Principal */}
        <div className="w-full mb-16 md:mb-24">
          <h1 className={`text-[15vw] md:text-[8vw] font-medium leading-[0.9] tracking-tighter ${textColor}`}>
            Let&apos;s start a <br />project together
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full">
          
          {/* LADO IZQUIERDO: Formulario Numerado */}
          <div className="w-full lg:w-8/12">
            <form className="flex flex-col w-full" onSubmit={(e) => e.preventDefault()}>
              
              {/* 01. Name */}
              <div className={`flex flex-col md:flex-row items-start md:items-center py-8 md:py-12 border-t ${borderColor} group`}>
                <div className={`text-base md:text-lg font-medium w-16 mb-4 md:mb-0 ${mutedTextColor}`}>1.</div>
                <div className="flex flex-col w-full gap-2">
                  <label className={`text-xl md:text-3xl font-medium tracking-tight ${textColor}`}>
                    What&apos;s your name?
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe *"
                    className={`w-full ${bgInput} outline-none py-2 text-lg md:text-xl font-medium transition-colors duration-300 placeholder:text-zinc-600 ${textColor}`}
                  />
                </div>
              </div>

              {/* 02. Email */}
              <div className={`flex flex-col md:flex-row items-start md:items-center py-8 md:py-12 border-t ${borderColor} group`}>
                <div className={`text-base md:text-lg font-medium w-16 mb-4 md:mb-0 ${mutedTextColor}`}>2.</div>
                <div className="flex flex-col w-full gap-2">
                  <label className={`text-xl md:text-3xl font-medium tracking-tight ${textColor}`}>
                    What&apos;s your email?
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@doe.com *"
                    className={`w-full ${bgInput} outline-none py-2 text-lg md:text-xl font-medium transition-colors duration-300 placeholder:text-zinc-600 ${textColor}`}
                  />
                </div>
              </div>

              {/* 03. Organization */}
              <div className={`flex flex-col md:flex-row items-start md:items-center py-8 md:py-12 border-t ${borderColor} group`}>
                <div className={`text-base md:text-lg font-medium w-16 mb-4 md:mb-0 ${mutedTextColor}`}>3.</div>
                <div className="flex flex-col w-full gap-2">
                  <label className={`text-xl md:text-3xl font-medium tracking-tight ${textColor}`}>
                    What&apos;s the name of your company or brand?
                  </label>
                  <input 
                    type="text" 
                    placeholder="John & Doe Studio"
                    className={`w-full ${bgInput} outline-none py-2 text-lg md:text-xl font-medium transition-colors duration-300 placeholder:text-zinc-600 ${textColor}`}
                  />
                </div>
              </div>

              {/* 04. Budget */}
              <div className={`flex flex-col md:flex-row items-start md:items-center py-8 md:py-12 border-t ${borderColor} group`}>
                <div className={`text-base md:text-lg font-medium w-16 mb-4 md:mb-0 ${mutedTextColor}`}>4.</div>
                <div className="flex flex-col w-full gap-2">
                  <label className={`text-xl md:text-3xl font-medium tracking-tight ${textColor}`}>
                    What&apos;s your estimated budget?
                  </label>
                  <select 
                    required
                    defaultValue=""
                    className={`w-full ${bgInput} outline-none py-2 text-lg md:text-xl font-medium transition-colors duration-300 appearance-none cursor-pointer ${textColor}`}
                  >
                    <option value="" disabled className="text-zinc-500 bg-[#09090B]">Select an option *</option>
                    <option value="< 500" className="text-black bg-white">&lt; $500 USD</option>
                    <option value="500-1500" className="text-black bg-white">$500 - $1,500 USD</option>
                    <option value="1500+" className="text-black bg-white">$1,500+ USD</option>
                    <option value="tbd" className="text-black bg-white">To be determined</option>
                  </select>
                </div>
              </div>

              {/* 05. Message */}
              <div className={`flex flex-col md:flex-row items-start py-8 md:py-12 border-t border-b ${borderColor} group`}>
                <div className={`text-base md:text-lg font-medium w-16 mb-4 md:mb-0 ${mutedTextColor} pt-2`}>5.</div>
                <div className="flex flex-col w-full gap-2">
                  <label className={`text-xl md:text-3xl font-medium tracking-tight ${textColor}`}>
                    Your message
                  </label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Hello Brisa, can you help me with ... *"
                    className={`w-full ${bgInput} outline-none py-2 mt-4 text-lg md:text-xl font-medium transition-colors duration-300 placeholder:text-zinc-600 resize-none ${textColor}`}
                  />
                </div>
              </div>

            
              <div className="mt-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                
                <div className="flex flex-col gap-8 max-w-sm">
                  
                 
                  <label className="group flex items-start gap-4 cursor-pointer">
                    <div className="relative flex items-center justify-center mt-1 shrink-0">
                      <input 
                        type="checkbox" 
                        required 
                        className={`peer appearance-none w-5 h-5 border ${borderColor} rounded-sm transition-all cursor-pointer ${checkboxColorClass}`}
                      />
                      <svg 
                        className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200" 
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className={`text-[16px] font-medium leading-tight transition-colors duration-300 ${mutedTextColor} ${isDarkTheme ? "group-hover:text-[#FAFAFA]" : "group-hover:text-[#111111]"}`}>
                      
                      I have read and agree to the <Link href="/privacy" onClick={(e: React.MouseEvent) => e.stopPropagation()} className={`underline underline-offset-2 transition-colors duration-300 ${isDarkTheme ? "hover:text-[#FDCEDF]" : "hover:text-[#FF8FAB]"}`}>Privacy Policy</Link> *
                    </span>
                  </label>

                </div>

                <button 
                  type="submit"
                  className="group flex items-center gap-4 md:gap-6 cursor-pointer mt-8 md:mt-0"
                >
                  <div 
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 transition-colors duration-300 ease-out`}
                    style={{ borderColor: isDarkTheme ? "#FAFAFA" : "#111111" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = themeHex;
                      e.currentTarget.style.borderColor = themeHex;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = isDarkTheme ? "#FAFAFA" : "#111111";
                    }}
                  />
                  <span className={`text-[12vw] md:text-[6rem] leading-none font-medium tracking-tighter ${textColor}`}>
                    Send
                  </span>
                </button>
              </div>

            </form>
          </div>

          {/* LADO DERECHO: Detalles de Contacto */}
          <div className="w-full lg:w-4/12 flex flex-col gap-12 lg:pl-10">
            
            <div className="flex flex-col gap-2">
              <h4 className={`text-xs md:text-[20px] font-medium tracking-tight ${mutedTextColor}`}>
                Contact Details
              </h4>
              <a 
                href="mailto:brisadsx@gmail.com" 
                className={`text-lg md:text-xl font-medium transition-colors duration-300 hover:underline underline-offset-4 ${textColor} ${hoverTextColor}`}
              >
                brisadsx@gmail.com
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className={`text-xs md:text-[20px] font-medium tracking-tight ${mutedTextColor}`}>
                Location
              </h4>
              <p className={`text-lg md:text-xl font-medium ${textColor}`}>
                Buenos Aires, Argentina<br/>
                Available Worldwide
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className={`text-xs md:text-[20px] font-medium tracking-tight ${mutedTextColor}`}>
                Socials
              </h4>
              <div className="flex flex-col items-start gap-1">
                <a 
                  href="https://www.linkedin.com/in/brisa-gabriela/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-lg md:text-xl font-medium transition-colors duration-300 hover:underline underline-offset-4 ${textColor} ${hoverTextColor}`}
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/brisadsx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-lg md:text-xl font-medium transition-colors duration-300 hover:underline underline-offset-4 ${textColor} ${hoverTextColor}`}
                >
                  GitHub
                </a>
                <a 
                  href="https://www.instagram.com/brisadsx/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-lg md:text-xl font-medium transition-colors duration-300 hover:underline underline-offset-4 ${textColor} ${hoverTextColor}`}
                >
                  Instagram
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}