import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext"; 


const helveticaNeue = localFont({
  src: "./fonts/helvetica-neue.otf", 
  variable: "--font-helvetica",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brisa Gabriela | Creative Technologist",
  description: "Portfolio of Brisa Gabriela",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Aplicamos la variable al HTML
    <html lang="es" className={`${helveticaNeue.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}