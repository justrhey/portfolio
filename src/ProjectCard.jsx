export default function ProjectCard({ project }) {
  return <div className="project-card-content">
    <div className="project-card-head">
      <span className={`project-card-avatar${project.logo ? ' has-logo' : ''}`} aria-hidden="true">
        {project.logo ? <img src={project.logo} alt="" /> : project.mark}
      </span>
      <span className="project-card-identity"><strong>{project.title}</strong><small>{project.type}</small></span>
      <span className="project-card-number">{project.no}</span>
    </div>
    <p className="project-card-description">{project.text}</p>
    <div className="project-card-preview"><img src={project.image} alt="" loading="lazy" draggable="false" /></div>
    <div className="project-card-foot"><span>{project.tags.join(' · ')}</span><span>View project</span></div>
  </div>;
}
