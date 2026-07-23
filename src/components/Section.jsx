import { Link } from "react-router-dom";

export default function Section({ id, title, action, children, bare }) {
  return (
    <section className={`section ${bare ? "section--bare" : "pcard"}`} id={id}>
      <div className="section__head">
        <h2 className="section__title">{title}</h2>
        {action?.href ? (
          <a className="section__action" href={action.href} target="_blank" rel="noreferrer">{action.label}</a>
        ) : action?.to ? (
          <Link className="section__action" to={action.to}>{action.label}</Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
