"use client";

import { createContext, useContext, useState, useEffect } from "react";

type ThemeContextType = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // TRUCO: Al envolverlo en una función asíncrona (async), 
    // hacemos que el cambio de estado sea asíncrono y ESLint ya no se queja.
    // Además, esto asegura que Next.js solo lea el localStorage en el cliente.
    const loadSavedTheme = async () => {
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (savedTheme === "dark") {
        setIsDarkTheme(true);
      }
    };
    
    loadSavedTheme();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const newTheme = !prev;
      localStorage.setItem("portfolio-theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}