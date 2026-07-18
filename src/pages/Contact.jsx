import Icon from "../components/Icon.jsx";
import Section from "../components/Section.jsx";

const EMAIL = "justrhey.tambong@gmail.com";

export default function Contact() {
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
            <span><strong>Location</strong> — Your City (placeholder)</span>
          </li>
          <li className="detail">
            <span className="detail__icon"><Icon name="signal" /></span>
            <span><strong>Availability</strong> — Open to freelance &amp; collaboration</span>
          </li>
        </ul>

        <a className="btn btn--primary contact__send" href={`mailto:${EMAIL}`}>
          <Icon name="mail" className="icon" />
          Send email
        </a>

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
