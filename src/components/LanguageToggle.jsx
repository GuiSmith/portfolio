import { useLanguage } from "../state/language.jsx";
import { useTheme } from "../state/theme.jsx";

export default function LanguageToggle() {
  const { lang, toggle } = useLanguage();
  const { theme } = useTheme();
  const outlineClass =
    theme === "light"
      ? "btn btn-sm btn-outline-dark border-opacity-25"
      : "btn btn-sm btn-outline-light border-opacity-25";

  return (
    <button
      type="button"
      className={`${outlineClass} px-2`}
      onClick={toggle}
      aria-label="Toggle language"
      title={lang === "pt-BR" ? "Português (Brasil)" : "English (US)"}
    >
      <span aria-hidden="true" style={{ fontSize: "1.1rem", lineHeight: 1 }}>
        {lang === "pt-BR" ? "🇧🇷" : "🇺🇸"}
      </span>
    </button>
  );
}
