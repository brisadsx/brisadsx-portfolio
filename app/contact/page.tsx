"use client";

import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import Navbar from "../../components/Navbar";
import Link from "next/link"; 
import Preloader from "../../components/Preloader";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const { isDarkTheme } = useTheme();

  // Estados del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    budget: "",
    message: "",
    agree: false,
  });
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"

  // Estilos y variables de tema
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

  // Manejador de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Función para enviar a Web3Forms
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "7f767991-d41d-4286-9de0-e4ce709f48d8",
          subject: "New Project Inquiry from Portfolio! 🚀",
          from_name: formData.name,
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className={`relative w-full min-h-screen flex flex-col transition-colors duration-500 ${bgColor}`}>
      
      <style>{`
        ::selection {
          background-color: ${isDarkTheme ? '#fdcedf86' : '#ff8fab7e'};
          color: ${isDarkTheme ? '#FDCEDF' : '#FF8FAB'};
        }

        /* Ocultar la barra de scroll visualmente para todos los navegadores */
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        html, body {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE y Edge */
        }
      `}</style>

      <Preloader text="Contact" />

      <Navbar />

      <section className="relative w-full flex flex-col px-6 md:px-[10vw] pt-40 md:pt-56 pb-24 z-10 flex-grow">
        
        {/* Título Principal */}
        <div className="w-full mb-16 md:mb-24">
          <h1 className={`text-[15vw] md:text-[8vw] font-medium leading-[0.9] tracking-tighter ${textColor}`}>
            Let&apos;s start a <br />project together
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full">
          
          {/* LADO IZQUIERDO: Formulario Animado o Mensaje de Éxito */}
          <div className="w-full lg:w-8/12">
            <AnimatePresence mode="wait">
              
              {status === "success" ? (
                // Pantalla de Éxito
                <motion.div 
                  key="success-message"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`flex flex-col py-12 md:py-24 border-t ${borderColor}`}
                >
                  <h3 className={`text-4xl md:text-6xl font-medium tracking-tight mb-6 ${textColor}`}>
                    Message sent successfully!
                  </h3>
                  <p className={`text-xl md:text-2xl mb-12 max-w-xl ${mutedTextColor}`}>
                    Thanks for reaching out, {formData.name.split(' ')[0]}. I&apos;ll get back to you to your email very soon. In the meantime, you can secure a spot on my calendar.
                  </p>
                  
                  <a 
                    href="https://calendly.com/brisadsx/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-medium rounded-full transition-all duration-300 w-fit ${isDarkTheme ? "bg-[#FAFAFA] text-[#111111] hover:bg-[#FDCEDF]" : "bg-[#111111] text-[#FAFAFA] hover:bg-[#FF8FAB]"}`}
                  >
                    Schedule Discovery Call
                  </a>
                </motion.div>

              ) : (
                // Formulario Principal
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col w-full" 
                  onSubmit={handleSubmit}
                >
                  
                  {/* 01. Name */}
                  <div className={`flex flex-col md:flex-row items-start md:items-center py-8 md:py-12 border-t ${borderColor} group`}>
                    <div className={`text-base md:text-lg font-medium w-16 mb-4 md:mb-0 ${mutedTextColor}`}>1.</div>
                    <div className="flex flex-col w-full gap-2">
                      <label className={`text-xl md:text-3xl font-medium tracking-tight ${textColor}`}>
                        What&apos;s your name?
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
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
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
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
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Hello Brisa, can you help me with ... *"
                        className={`w-full ${bgInput} outline-none py-2 mt-4 text-lg md:text-xl font-medium transition-colors duration-300 placeholder:text-zinc-600 resize-none ${textColor}`}
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {status === "error" && (
                    <div className="mt-6 text-red-500 font-medium">
                      Oops! Something went wrong. Please try again later.
                    </div>
                  )}
                
                  {/* Footer del Formulario */}
                  <div className="mt-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                    
                    <div className="flex flex-col gap-8 max-w-sm">
                      <label className="group flex items-start gap-4 cursor-pointer">
                        <div className="relative flex items-center justify-center mt-1 shrink-0">
                          <input 
                            type="checkbox" 
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
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
                      disabled={status === "submitting"}
                      className={`group flex items-center gap-4 md:gap-6 cursor-pointer mt-8 md:mt-0 ${status === 'submitting' ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <div 
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 transition-colors duration-300 ease-out`}
                        style={{ borderColor: isDarkTheme ? "#FAFAFA" : "#111111" }}
                        onMouseEnter={(e) => {
                          if(status !== 'submitting') {
                            e.currentTarget.style.backgroundColor = themeHex;
                            e.currentTarget.style.borderColor = themeHex;
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = isDarkTheme ? "#FAFAFA" : "#111111";
                        }}
                      />
                      <span className={`text-[12vw] md:text-[6rem] leading-none font-medium tracking-tighter transition-all duration-300 ${textColor}`}>
                        {status === "submitting" ? "Sending..." : "Send"}
                      </span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* LADO DERECHO: Detalles de Contacto */}
          <div className="w-full lg:w-4/12 flex flex-col gap-12 lg:pl-10">
            
            <div className="flex flex-col gap-2">
              <h4 className={`text-xs md:text-[20px] font-medium tracking-tight ${mutedTextColor}`}>
                Contact Details
              </h4>
              <a 
                href="mailto:contact@brisadsx.com" 
                className={`text-lg md:text-xl font-medium transition-colors duration-300 hover:underline underline-offset-4 ${textColor} ${hoverTextColor}`}
              >
                contact@brisadsx.com
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