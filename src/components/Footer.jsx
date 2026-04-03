import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import cv from "../data/cv.json";
import { useLanguage } from "../state/language.jsx";
import config from "../../portfolio.config.json";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="py-4 mt-5 border-top border-light border-opacity-10">
      <div className="container container-narrow d-flex flex-column flex-md-row gap-3 align-items-start align-items-md-center justify-content-between">
        <div className="small muted">
          © {year} Guilherme Smith. {t.footer.builtWith}
        </div>
        <div className="d-flex gap-3">
          <a
            className="muted text-decoration-none"
            href={`https://github.com/${config.githubUser}`}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            className="muted text-decoration-none"
            href={cv.personal_info.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            className="muted text-decoration-none"
            href={`mailto:${cv.personal_info.contact.email}`}
            aria-label="Email"
          >
            <HiOutlineMail size={19} />
          </a>
        </div>
      </div>
    </footer>
  );
}
