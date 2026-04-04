import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";


const neueHaas = localFont({

  src: "./fonts/neue-haas.ttf", 
  variable: "--font-neue-haas",
});

export const metadata: Metadata = {
  title: "Brisa Gabriela - Creative Technologist",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${neueHaas.variable} font-sans`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}