import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import config from "../../portfolio.config.json";
import { STRINGS } from "../i18n/strings.js";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const defaultLang = config?.defaults?.language === "en-US" ? "en-US" : "pt-BR";
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "pt-BR" || stored === "en-US") setLang(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang === "pt-BR" ? "pt-BR" : "en";
  }, [lang]);

  const t = useMemo(() => STRINGS[lang], [lang]);

  const value = useMemo(
    () => ({
      lang,
      t,
      toggle: () => setLang((p) => (p === "pt-BR" ? "en-US" : "pt-BR")),
      set: setLang,
    }),
    [lang, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

