import { useLanguage } from "../state/language.jsx";
import { useTheme } from "../state/theme.jsx";

export default function LanguageToggle() {
  const { lang, toggle, t } = useLanguage();
  const { theme } = useTheme();
  const outlineClass =
    theme === "light"
      ? "btn btn-sm btn-outline-dark border-opacity-25"
      : "btn btn-sm btn-outline-light border-opacity-25";

  return (
    <button
      type="button"
      className={outlineClass}
      onClick={toggle}
      aria-label="Toggle language"
      title={lang}
    >
      {t.toggles.langShort}
    </button>
  );
}
