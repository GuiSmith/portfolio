import Section from "../Section.jsx";
import cv from "../../data/cv.json";
import { useLanguage } from "../../state/language.jsx";

export default function About() {
  const { t } = useLanguage();

  return (
    <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title}>
      <div className="row g-3">
        <div className="col-lg-7">
          <div className="glass rounded-4 p-4">
            <p className="mb-0" style={{ whiteSpace: "pre-line" }}>
              {cv.professional_summary}
            </p>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="glass rounded-4 p-4 h-100">
            <div className="fw-semibold mb-2">{t.about.focusTitle}</div>
            <ul className="mb-0 muted">
              {t.about.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
