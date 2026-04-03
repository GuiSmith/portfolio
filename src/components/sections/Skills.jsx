import Section from "../Section.jsx";
import { useLanguage } from "../../state/language.jsx";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills" eyebrow={t.skills.eyebrow} title={t.skills.title}>
      <div className="row g-3">
        {t.skills.groups.map((g) => (
          <div key={g.title} className="col-md-6 col-lg-3">
            <div className="glass rounded-4 p-4 h-100">
              <div className="fw-semibold mb-3">{g.title}</div>
              <div className="d-flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <span key={i} className="badge rounded-pill badge-tech">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

