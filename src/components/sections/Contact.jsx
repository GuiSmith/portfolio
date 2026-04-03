import Section from "../Section.jsx";
import cv from "../../data/cv.json";
import { useLanguage } from "../../state/language.jsx";
import { useMemo, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useTheme } from "../../state/theme.jsx";

export default function Contact() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const email = cv.personal_info.contact.email;
  const linkedin = cv.personal_info.contact.linkedin;
  const outlineBtn =
    theme === "light"
      ? "btn btn-outline-dark border-opacity-25 d-inline-flex align-items-center gap-2 justify-content-start"
      : "btn btn-outline-light border-opacity-25 d-inline-flex align-items-center gap-2 justify-content-start";
  const outlineBtnPlain =
    theme === "light" ? "btn btn-outline-dark border-opacity-25" : "btn btn-outline-light border-opacity-25";

  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailto = useMemo(() => {
    const subject = `Portfolio contact — ${name || "Hello"}`;
    const body = `Name: ${name}\nEmail: ${fromEmail}\n\n${message}`;
    return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;
  }, [email, fromEmail, message, name]);

  return (
    <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title}>
      <div className="row g-3">
        <div className="col-lg-5">
          <div className="glass rounded-4 p-4 h-100">
            <div className="fw-semibold mb-2">{t.contact.direct}</div>
            <div className="d-flex flex-column gap-2">
              <a
                className={outlineBtn}
                href={`mailto:${email}`}
              >
                <HiOutlineMail size={18} />
                <span>{email}</span>
              </a>
              <a
                className={outlineBtn}
                href={linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin size={18} />
                <span>LinkedIn</span>
              </a>
            </div>
            <div className="muted small mt-3">
              {t.contact.basedIn}: {cv.personal_info.location.city}, {cv.personal_info.location.state} —{" "}
              {cv.personal_info.location.country}.
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="glass rounded-4 p-4">
            <div className="fw-semibold mb-3">{t.contact.messageTitle}</div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = mailto;
              }}
              className="d-flex flex-column gap-3"
            >
              <div className="row g-2">
                <div className="col-md-6">
                  <label className="form-label small muted">{t.contact.name}</label>
                  <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contact.name}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small muted">{t.contact.email}</label>
                  <input
                    className="form-control"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    placeholder="you@email.com"
                    type="email"
                  />
                </div>
              </div>
              <div>
                <label className="form-label small muted">{t.contact.message}</label>
                <textarea
                  className="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.contact.message}
                  rows={5}
                />
              </div>
              <div className="d-flex flex-wrap gap-2">
                <button type="submit" className="btn btn-accent fw-semibold">
                  {t.contact.send}
                </button>
                <button
                  type="button"
                  className={outlineBtnPlain}
                  onClick={() => {
                    setName("");
                    setFromEmail("");
                    setMessage("");
                  }}
                >
                  {t.contact.clear}
                </button>
              </div>
              <div className="muted small">{t.contact.note}</div>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
