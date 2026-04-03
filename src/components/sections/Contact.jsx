import Section from "../Section.jsx";
import cv from "../../data/cv.json";
import { useLanguage } from "../../state/language.jsx";
import { useMemo, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useTheme } from "../../state/theme.jsx";

function toWhatsappDigits(phone) {
  if (!phone) return "";
  return String(phone).replace(/\D/g, "");
}

export default function Contact() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const email = cv.personal_info.contact.email;
  const linkedin = cv.personal_info.contact.linkedin;
  const phone = cv.personal_info.contact.phone;
  const whatsappDigits = toWhatsappDigits(phone);
  const whatsappBaseUrl = whatsappDigits ? `https://wa.me/${whatsappDigits}` : null;
  const outlineBtn =
    theme === "light"
      ? "btn btn-outline-dark border-opacity-25 d-inline-flex align-items-center gap-2 justify-content-start"
      : "btn btn-outline-light border-opacity-25 d-inline-flex align-items-center gap-2 justify-content-start";
  const outlineBtnPlain =
    theme === "light" ? "btn btn-outline-dark border-opacity-25" : "btn btn-outline-light border-opacity-25";

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const messageText = useMemo(() => {
    const nameLabel = t?.contact?.prefillNameLabel || t?.contact?.name || "Name";
    const companyLabel = t?.contact?.prefillCompanyLabel || t?.contact?.company || "Company";
    const companyLine = company ? `${companyLabel}: ${company}\n` : "";
    return `${nameLabel}: ${name}\n${companyLine}\n${message}`;
  }, [company, message, name, t]);

  const mailto = useMemo(() => {
    const subject = `Portfolio contact — ${name || "Hello"}`;
    return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      messageText
    )}`;
  }, [email, messageText, name]);

  const whatsappUrl = useMemo(() => {
    if (!whatsappBaseUrl) return null;
    return `${whatsappBaseUrl}?text=${encodeURIComponent(messageText)}`;
  }, [messageText, whatsappBaseUrl]);

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
              {whatsappBaseUrl ? (
                <a className={outlineBtn} href={whatsappBaseUrl} target="_blank" rel="noreferrer">
                  <FaWhatsapp size={18} />
                  <span>WhatsApp</span>
                </a>
              ) : null}
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
              onSubmit={(e) => e.preventDefault()}
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
                  <label className="form-label small muted">{t.contact.company}</label>
                  <input
                    className="form-control"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={t.contact.company}
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
                <a
                  className="btn btn-accent fw-semibold d-inline-flex align-items-center gap-2"
                  href={mailto}
                  target="_blank"
                  rel="noreferrer"
                >
                  <HiOutlineMail size={18} />
                  {t.contact.sendEmail}
                </a>
                {whatsappUrl ? (
                  <a
                    className="btn btn-success fw-semibold d-inline-flex align-items-center gap-2"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaWhatsapp size={18} />
                    {t.contact.sendMessage}
                  </a>
                ) : null}
                <button
                  type="button"
                  className={outlineBtnPlain}
                  onClick={() => {
                    setName("");
                    setCompany("");
                    setMessage("");
                  }}
                >
                  {t.contact.clear}
                </button>
              </div>
              <div className="muted small" style={{ whiteSpace: "pre-line" }}>
                {t.contact.note}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
