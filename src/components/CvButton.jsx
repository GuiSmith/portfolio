import config from "../../portfolio.config.json";
import { useLanguage } from "../state/language.jsx";
import { useTheme } from "../state/theme.jsx";

function resolveCvUrl(lang) {
  const urls = config?.cv?.publishedUrls;
  if (!urls) return null;
  return urls[lang] || urls["pt-BR"] || urls["en-US"] || null;
}

export default function CvButton({ size = "sm", variant = "outline", label }) {
  const { lang, t } = useLanguage();
  const { theme } = useTheme();

  const url = resolveCvUrl(lang);
  if (!url) return null;

  const outline = theme === "light" ? "btn-outline-dark" : "btn-outline-light";
  const cls = `btn btn-${size} ${variant === "outline" ? outline : "btn-accent"} border-opacity-25`;

  return (
    <a className={cls} href={url} target="_blank" rel="noreferrer">
      {label || t.nav.cv}
    </a>
  );
}

