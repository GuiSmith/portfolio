import Section from "../Section.jsx";
import cv from "../../data/cv.json";
import { useLanguage } from "../../state/language.jsx";

export default function Education() {
  const { t } = useLanguage();

  return (
    <Section id="education" eyebrow={t.education.eyebrow} title={t.education.title}>
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="glass rounded-4 p-4 h-100">
            <div className="fw-semibold mb-2">{t.education.degree}</div>
            {cv.education.map((e) => (
              <div key={`${e.institution}-${e.course}`} className="mb-3">
                <div className="fw-semibold">{e.course}</div>
                <div className="muted small">
                  {e.institution} • {e.start} → {e.end} ({t.education.inProgress})
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="glass rounded-4 p-4 h-100">
            <div className="fw-semibold mb-2">{t.education.courses}</div>
            <ul className="mb-0 muted">
              {cv.courses.map((c) => (
                <li key={`${c.platform}-${c.name}`}>
                  {c.name} <span className="muted">({c.platform}, {c.year})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

