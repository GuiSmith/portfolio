import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import config from "../../portfolio.config.json";

const ThemeContext = createContext(null);

function applyTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
}

export function ThemeProvider({ children }) {
  const defaultTheme = config?.defaults?.theme === "light" ? "light" : "dark";
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggle: () => setTheme((p) => (p === "dark" ? "light" : "dark")),
      set: setTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

