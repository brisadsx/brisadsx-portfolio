import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext"; 

export const metadata: Metadata = {
  title: {
    default: "Brisa Gabriela - Creative Technologist",
    template: "%s - Brisa Gabriela" 
  },
  description: "Creative Technologist focusing on interactive digital experiences.",
};

const helveticaNeue = localFont({
  src: "./fonts/helvetica-neue.otf", 
  variable: "--font-helvetica",
  weight: "400",
  style: "normal",
  display: "swap",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${helveticaNeue.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}