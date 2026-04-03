import { motion } from "framer-motion";
import cv from "../../data/cv.json";
import { useLanguage } from "../../state/language.jsx";
import { useTheme } from "../../state/theme.jsx";

export default function Hero() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const fullName = cv.personal_info.full_name;
  const parts = fullName.split(" ");
  const smithIndex = parts.findIndex((p) => p.toLowerCase() === "smith");
  const secondaryBtn =
    theme === "light" ? "btn btn-outline-dark border-opacity-25" : "btn btn-outline-light border-opacity-25";

  return (
    <header id="top" className="pt-5 pb-4">
      <div className="container container-narrow pt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass rounded-4 p-4 p-md-5"
        >
          <div className="d-flex flex-column gap-3">
            <div className="text-uppercase small muted">{t.hero.eyebrow}</div>
            <h1 className="display-5 fw-semibold mb-0">
              {smithIndex >= 0 ? (
                <>
                  {parts.slice(0, smithIndex).join(" ")}{" "}
                  <span className="gradient-text">{parts[smithIndex]}</span>{" "}
                  {parts.slice(smithIndex + 1).join(" ")}
                </>
              ) : (
                fullName
              )}
            </h1>
            <div className="h5 fw-normal muted mb-0">{t.hero.titleRole}</div>
            <p className="lead mb-0">
              <span className="accent">“</span>
              {t.hero.tagline}
              <span className="accent">”</span>
            </p>
            <div className="d-flex flex-wrap gap-2 pt-2">
              <a className="btn btn-accent fw-semibold" href="#projects">
                {t.hero.ctaProjects}
              </a>
              <a className={secondaryBtn} href="#contact">
                {t.hero.ctaContact}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
