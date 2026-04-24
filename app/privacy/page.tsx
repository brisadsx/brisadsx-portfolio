"use client";

import { useTheme } from "../../context/ThemeContext";
import Navbar from "../../components/Navbar";

export default function PrivacyPage() {
  const { isDarkTheme } = useTheme();

  const bgColor = isDarkTheme ? "bg-[#09090B]" : "bg-[#FAFAFA]";
  const textColor = isDarkTheme ? "text-[#FAFAFA]" : "text-[#111111]";
  const mutedTextColor = isDarkTheme ? "text-zinc-500" : "text-zinc-400";
  const borderColor = isDarkTheme ? "border-zinc-800" : "border-zinc-300";

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
        
        <div className="w-full max-w-3xl mx-auto">
          <h1 className={`text-4xl md:text-6xl font-medium tracking-tight mb-4 ${textColor}`}>
            Privacy Policy
          </h1>
          <p className={`text-sm md:text-base font-medium mb-12 ${mutedTextColor}`}>
            Last updated: April 2026
          </p>

          <div className="flex flex-col gap-10">
            <section>
              <h2 className={`text-xl md:text-2xl font-medium mb-4 ${textColor}`}>1. Information Collection</h2>
              <p className={`text-base md:text-lg leading-relaxed font-medium ${mutedTextColor}`}>
                When you fill out the contact form on this website, I collect your name, email address, and any details you provide about your project. This is the only personal data collected through this site.
              </p>
            </section>

            <section>
              <h2 className={`text-xl md:text-2xl font-medium mb-4 ${textColor}`}>2. Use of Information</h2>
              <p className={`text-base md:text-lg leading-relaxed font-medium ${mutedTextColor}`}>
                The information collected is used solely to respond to your inquiries, provide accurate project estimates, and schedule potential meetings. You will not be subscribed to any newsletters unless explicitly requested.
              </p>
            </section>

            <section>
              <h2 className={`text-xl md:text-2xl font-medium mb-4 ${textColor}`}>3. Data Protection</h2>
              <p className={`text-base md:text-lg leading-relaxed font-medium ${mutedTextColor}`}>
                I value your privacy. Your personal information is kept confidential and is not shared, sold, traded, or rented to any third parties or external agencies.
              </p>
            </section>

            <section>
              <h2 className={`text-xl md:text-2xl font-medium mb-4 ${textColor}`}>4. Contact</h2>
              <p className={`text-base md:text-lg leading-relaxed font-medium ${mutedTextColor}`}>
                If you have any questions about this privacy policy or the data collected, please contact me directly at <a href="mailto:brisadsx@gmail.com" className={`underline underline-offset-4 transition-colors ${isDarkTheme ? "hover:text-[#FDCEDF]" : "hover:text-[#FF8FAB]"}`}>brisadsx@gmail.com</a>.
              </p>
            </section>
          </div>

          <div className={`mt-20 pt-8 border-t ${borderColor}`}>
            <a href="/contact" className={`text-lg font-medium transition-colors hover:underline underline-offset-4 ${isDarkTheme ? "text-[#FDCEDF]" : "text-[#FF8FAB]"}`}>
              ← Back to Contact
            </a>
          </div>
        </div>

      </section>
    </main>
  );
}