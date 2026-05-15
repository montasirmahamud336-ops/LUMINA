import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    // Force dark mode
    setTheme('dark');
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings/global');
        if (res.ok) {
          const data = await res.json();
          const root = document.documentElement;
          root.style.setProperty('--primary', data.primaryColor);
          root.style.setProperty('--secondary', data.secondaryColor);
        }
      } catch (err) {
        console.error('Error fetching global settings:', err);
      }
    };

    fetchSettings();

    // Listen for updates from the admin panel
    const handleUpdate = () => fetchSettings();
    window.addEventListener('settingsUpdated', handleUpdate);

    return () => {
      window.removeEventListener('settingsUpdated', handleUpdate);
    };
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    // Force dark mode only for now
    setTheme('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
