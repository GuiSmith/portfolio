import Section from "../Section.jsx";
import cv from "../../data/cv.json";
import { useLanguage } from "../../state/language.jsx";

function formatPeriod(start, end, lang) {
  const toMonthYear = (d) => {
    const dt = new Date(d);
    return dt.toLocaleDateString(lang === "pt-BR" ? "pt-BR" : "en-US", {
      month: "short",
      year: "numeric",
    });
  };
  return `${toMonthYear(start)} → ${toMonthYear(end)}`;
}

export default function Experience() {
  const { t, lang } = useLanguage();

  const items = cv.work_experience.filter((w) =>
    ["Técnico de Banco de Dados", "Consultor de Implantação", "Líder Suporte Técnico"].includes(w.role)
  );

  return (
    <Section id="experience" eyebrow={t.experience.eyebrow} title={t.experience.title}>
      <div className="glass rounded-4 p-4">
        <div className="timeline">
          {items.map((w) => (
            <div key={`${w.company}-${w.role}`} className="timeline-item">
              <div className="timeline-dot" aria-hidden="true" />
              <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                <div>
                  <div className="fw-semibold">{w.role}</div>
                  <div className="muted small">{w.company}</div>
                </div>
                <div className="muted small">{formatPeriod(w.start_date, w.end_date, lang)}</div>
              </div>
              <div className="row g-3 mt-2">
                <div className="col-lg-8">
                  <ul className="mb-0 muted">
                    {w.responsibilities.slice(0, 6).map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-4">
                  <div className="glass rounded-4 p-3">
                    <div className="small fw-semibold mb-2">{t.experience.emphasis}</div>
                    <ul className="small mb-0 muted">
                      {t.experience.emphasisItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {w.achievements?.length ? (
                <div className="mt-3 muted small">
                  <span className="fw-semibold">Highlights:</span> {w.achievements.join(" • ")}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="muted small">{t.experience.recent}</div>
      </div>
    </Section>
  );
}

