import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext"; 

const neueHaas = localFont({
  src: [
    {
      path: "./fonts/neue-haas.ttf",
      weight: "400", // Peso normal
      style: "normal",
    },
    {
      path: "./fonts/neue-haasbold.ttf",
      weight: "700", // Peso bold
      style: "normal",
    }
  ],
  variable: "--font-neue-haas",
});

export const metadata: Metadata = {
  title: "Brisa Gabriela | Creative Technologist",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="es" className={`${neueHaas.variable} font-sans`}>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}