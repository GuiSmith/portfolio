import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../state/theme.jsx";
import { useLanguage } from "../state/language.jsx";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useLanguage();
  const outlineClass =
    theme === "light"
      ? "btn btn-sm btn-outline-dark border-opacity-25 d-inline-flex align-items-center gap-2"
      : "btn btn-sm btn-outline-light border-opacity-25 d-inline-flex align-items-center gap-2";

  return (
    <button
      type="button"
      className={outlineClass}
      onClick={toggle}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
      <span className="d-none d-lg-inline">
        {theme === "dark" ? t.toggles.themeLight : t.toggles.themeDark}
      </span>
    </button>
  );
}
