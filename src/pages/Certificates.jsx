import Icon from "../components/Icon.jsx";
import Section from "../components/Section.jsx";
import { certificates } from "../data.js";

export default function Certificates() {
  return (
    <div className="page">
      <Section title="Certificates">
        <div className="certificate-list">
          {certificates.map((certificate, index) => (
            <article className="certificate" key={certificate.title}>
              <a
                className="certificate__preview"
                href={certificate.file}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${certificate.title} certificate`}
              >
                <img
                  className="certificate__image"
                  src={certificate.image}
                  alt={`${certificate.title} certificate issued by ${certificate.issuer}`}
                />
              </a>

              <div className="certificate__details">
                <p className="certificate__eyebrow">
                  Certificate {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="certificate__title">{certificate.title}</h3>
                <p className="certificate__meta">
                  {certificate.issuer} · Issued {certificate.date}
                </p>
                <a
                  className="btn btn--secondary certificate__action"
                  href={certificate.file}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="award" />
                  View certificate
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
