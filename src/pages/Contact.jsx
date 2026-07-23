import { useState } from "react";
import Icon from "../components/Icon.jsx";
import Section from "../components/Section.jsx";

const EMAIL = "justrhey.tambong@gmail.com";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");

    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <div className="page">
      <Section title="Contact">
        <ul className="detail-list">
          <li className="detail">
            <span className="detail__icon"><Icon name="mail" /></span>
            <span><strong>Email</strong> — <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
          </li>
          <li className="detail">
            <span className="detail__icon"><Icon name="pin" /></span>
            <span><strong>Location</strong> — Philippines</span>
          </li>
          <li className="detail">
            <span className="detail__icon"><Icon name="signal" /></span>
            <span><strong>Availability</strong> — Open to freelance &amp; collaboration</span>
          </li>
        </ul>

        <form className="cform" onSubmit={onSubmit} noValidate>
          {/* Honeypot — hidden from real users, catches bots */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="cform__hp"
          />

          <div className="cform__row">
            <div className="cform__field">
              <label className="cform__label" htmlFor="c-name">Name</label>
              <input id="c-name" className="cform__input" name="name" required maxLength={100} placeholder="Jane Doe" />
            </div>
            <div className="cform__field">
              <label className="cform__label" htmlFor="c-email">Email</label>
              <input id="c-email" className="cform__input" name="email" type="email" required maxLength={200} placeholder="jane@company.com" />
            </div>
          </div>

          <div className="cform__field">
            <label className="cform__label" htmlFor="c-company">
              Company <span className="cform__optional">(optional)</span>
            </label>
            <input id="c-company" className="cform__input" name="company" maxLength={120} placeholder="Company or brand" />
          </div>

          <div className="cform__field">
            <label className="cform__label" htmlFor="c-message">Message</label>
            <textarea id="c-message" className="cform__input cform__textarea" name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Tell me about the project or proposal…" />
          </div>

          <div className="cform__actions">
            <button className="btn btn--primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <p className="cform__status" aria-live="polite">
              {status === "ok" && <span className="cform__ok">Thanks — your message is on its way.</span>}
              {status === "error" && <span className="cform__err">{error}</span>}
            </p>
          </div>
        </form>

        <div className="worldmap">
          <div className="worldmap__img" role="img" aria-label="Working worldwide" />
          <p className="worldmap__caption">Working remotely · worldwide</p>
        </div>

        <p className="contact__direct">
          or email me directly at{" "}
          <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </Section>
    </div>
  );
}
