import ThemeToggle from "./ThemeToggle.jsx";
import LanguageToggle from "./LanguageToggle.jsx";
import { useLanguage } from "../state/language.jsx";
import { useTheme } from "../state/theme.jsx";
import CvButton from "./CvButton.jsx";

export default function Navbar() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#experience", label: t.nav.experience },
    { href: "#education", label: t.nav.education },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top nav-blur ${
        theme === "light" ? "navbar-light" : "navbar-dark"
      }`}
    >
      <div className="container container-narrow">
        <a className="navbar-brand fw-semibold" href="#top">
          <span className="gradient-text">Guilherme</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {links.map((l) => (
              <li key={l.href} className="nav-item">
                <a className="nav-link" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="nav-item ms-lg-2 d-flex gap-2 align-items-center">
              <CvButton size="sm" />
              <LanguageToggle />
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
