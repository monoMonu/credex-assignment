'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';

interface ThemeContextType {
   theme: 'light' | 'dark';
   toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [theme, setTheme] = useState<'light' | 'dark'>('light');

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
         setTheme(mediaQuery.matches ? 'dark' : 'light');
         mediaQuery.addEventListener('change', (e) => {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            setTheme(mediaQuery.matches ? 'dark' : 'light');
         })
      }
   }, []);

   const toggleTheme = () => {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
   };

   useEffect(() => {
      if (typeof window !== 'undefined') {
         document.documentElement.classList.remove('light', 'dark');
         document.documentElement.classList.add(theme);
      }
   }, [theme]);

   return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   );
};

export const useTheme = () => {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
   }
   return context;
};
