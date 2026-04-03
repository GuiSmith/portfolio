import { useLanguage } from "../state/language.jsx";

export default function LanguageToggle() {
  const { lang, toggle, t } = useLanguage();

  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-light border-opacity-25"
      onClick={toggle}
      aria-label="Toggle language"
      title={lang}
    >
      {t.toggles.langShort}
    </button>
  );
}

