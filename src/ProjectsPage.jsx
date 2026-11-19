import projects from './projects.js';
import ProjectCard from './ProjectCard.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function ProjectsPage() {
  return <div className="site-shell projects-page">
    <header className="topbar">
      <a className="wordmark" href="/" aria-label="Back to portfolio"><img className="brand-logo" src="/logo.png" alt="" /><span>JUSTINE RHEY<br/><i>FULL-STACK DEVELOPER</i></span></a>
      <nav aria-label="Primary navigation"><a href="/">Portfolio</a><a href="/#contact">Contact</a></nav>
      <ThemeToggle />
    </header>
    <main>
      <header className="projects-page-intro">
        <p className="eyebrow">02 / SELECTED WORK · 2023—2026</p>
        <h1>All projects.</h1>
        <p>Products, platforms, and experiments built across frontend, backend, and everything between.</p>
      </header>
      <div className="projects-page-grid">
        {projects.map((project) => <article className="projects-page-item" key={project.no}>
          <a className="projects-page-card" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><ProjectCard project={project} /></a>
          <details className="projects-page-details">
            <summary>Project overview</summary>
            <dl>{Object.entries(project.details).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </details>
        </article>)}
      </div>
    </main>
    <footer><span>© 2026 JRT</span><a href="/">Back to portfolio</a></footer>
  </div>;
}
