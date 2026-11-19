import React, { useEffect, useState } from 'react';
import { siCss, siDjango, siGsap, siMapbox, siNestjs, siPostgresql, siReact, siRust, siStellar, siTypescript } from 'simple-icons';
import ThemeToggle from './ThemeToggle.jsx';
import GitHubActivity from './GitHubActivity.jsx';
import WorkGlobe from './WorkGlobe.jsx';
import CapabilityVisual from './CapabilityVisual.jsx';
import projects from './projects.js';



const skills = [
  { no: '01', title: 'Product engineering', description: 'React interfaces, NestJS services, and PostgreSQL workflows for role-based SaaS products.', visual: 'product', project: '01', tools: [['TypeScript', siTypescript], ['React', siReact], ['NestJS', siNestjs], ['PostgreSQL', siPostgresql]] },
  { no: '02', title: 'Frontend systems', description: 'Responsive React interfaces with GSAP motion, reusable components, and WebGL visuals.', visual: 'frontend', project: '05', tools: [['React', siReact], ['TypeScript', siTypescript], ['CSS', siCss], ['GSAP', siGsap]] },
  { no: '03', title: 'Backend & security', description: 'Rust APIs with role-based access, encrypted health records, and blockchain-anchored hashes.', visual: 'backend', project: '03', tools: [['Rust / Actix-web', siRust], ['PostgreSQL', siPostgresql], ['Soroban', siStellar]] },
  { no: '04', title: 'Data & maps', description: 'PostgreSQL data models and interactive complaint maps with geographic issue reporting.', visual: 'data', project: '02', tools: [['PostgreSQL', siPostgresql], ['Mapbox GL', siMapbox], ['Django REST', siDjango]] },
];

const experience = [
  {
    period: '2025 — Present',
    role: 'Co-founder · Full-stack Engineer',
    organization: 'ArkodevPH',
    responsibility: 'Co-lead product architecture and full-stack delivery across client websites, internal operations software, automation, and AI-enabled products.',
    outcome: 'Built and shipped with a four-person studio across discovery, design, engineering, and production deployment.',
    href: 'https://arkodevph.com',
  },
  {
    period: 'Feb 2026 — Present',
    role: 'AI Engineer',
    organization: 'TambayanPH',
    responsibility: 'Develop SaaS products and automation pipelines with n8n and Claude, connecting business workflows, third-party APIs, and internal tools.',
    outcome: 'Delivered veterinary Facebook automation and a RealmMLP-to-Notion integration built from an undocumented API.',
  },
];

function PixelMark() { return <img className="brand-logo" src="/logo.png" alt="" aria-hidden="true" />; }
function TechIcon({ icon }) { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg>; }

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [contactStatus, setContactStatus] = useState('idle');
  const [emailCopied, setEmailCopied] = useState(false);
  const [capabilityMotionPaused, setCapabilityMotionPaused] = useState(false);

  useEffect(() => {
    const sectionIds = ['overview', 'work', 'skills', 'experience', 'publications', 'github', 'about', 'contact'];
    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * .32;
      let current = sectionIds[0];

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact';
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const inquiry = data.get('inquiry');
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Project type: ${inquiry}\nName: ${name}\nEmail: ${email}\n\n${message}`);
    setContactStatus('draft');
    window.location.href = `mailto:justrhey.tambong@gmail.com?subject=${subject}&body=${body}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('justrhey.tambong@gmail.com');
      setEmailCopied(true);
    } catch {
      window.location.href = 'mailto:justrhey.tambong@gmail.com';
    }
  };

  return <div className="site-shell">
    <header className="topbar"><a className="wordmark" href="#overview" aria-label="Back to overview"><PixelMark/><span>JUSTINE RHEY<br/><i>FULL-STACK DEVELOPER</i></span></a><nav aria-label="Primary navigation"><a className={activeSection === 'work' ? 'active' : ''} aria-current={activeSection === 'work' ? 'page' : undefined} href="#work">Work</a><a className={activeSection === 'about' ? 'active' : ''} aria-current={activeSection === 'about' ? 'page' : undefined} href="#about">About</a><a className={activeSection === 'contact' ? 'active' : ''} aria-current={activeSection === 'contact' ? 'page' : undefined} href="#contact">Contact</a></nav><ThemeToggle /></header>
    <main id="top">
      <section className="profile-hero" id="overview" aria-labelledby="profile-title">
        <div className="profile-cover">
          <p>Full-stack developer · Manila</p>
          <h1 id="profile-title">Software with<br/><em>something to say.</em></h1>
          </div>
        <div className="profile-summary">
          <div className="profile-avatar">
            <img src="/images/portrait-bitmap.png" alt="Justine Rhey Tambong" />
            <span role="img" aria-label="Available for work" />
          </div>
          <div className="profile-identity">
            <p>Justine Rhey Tambong</p>
            <h2>Full-stack developer</h2>
            <span>I build production-ready web platforms, AI tools, and backend systems.</span>
            <a className="founder-link" href="https://arkodevph.com" target="_blank" rel="noreferrer">Co-founder of ArkodevPH ↗</a>
          </div>
          <div className="profile-actions">
            <a className="profile-primary" href="#work">View work <span>↘</span></a>
            <a href="mailto:justrhey.tambong@gmail.com">Let’s talk ↗</a>
          </div>
        </div>
        <nav className="profile-tabs" aria-label="Portfolio sections">
          <a className={activeSection === 'overview' ? 'active' : ''} aria-current={activeSection === 'overview' ? 'page' : undefined} href="#overview">Overview</a>
          <a className={activeSection === 'work' ? 'active' : ''} aria-current={activeSection === 'work' ? 'page' : undefined} href="#work">Selected work</a>
          <a className={activeSection === 'skills' ? 'active' : ''} aria-current={activeSection === 'skills' ? 'page' : undefined} href="#skills">Skills</a>
          <a className={activeSection === 'experience' ? 'active' : ''} aria-current={activeSection === 'experience' ? 'page' : undefined} href="#experience">Experience</a>
          <a className={activeSection === 'publications' ? 'active' : ''} aria-current={activeSection === 'publications' ? 'page' : undefined} href="#publications">Publication</a>
          <a className={activeSection === 'github' ? 'active' : ''} aria-current={activeSection === 'github' ? 'page' : undefined} href="#github">GitHub</a>
          <a className={activeSection === 'about' ? 'active' : ''} aria-current={activeSection === 'about' ? 'page' : undefined} href="#about">About</a>
          <a className={activeSection === 'contact' ? 'active' : ''} aria-current={activeSection === 'contact' ? 'page' : undefined} href="#contact">Contact</a>
          <span>MANILA, PH · AVAILABLE 2026</span>
        </nav>
      </section>
      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="work-feature">
          <div className="work-feature-copy">
            <p className="work-feature-kicker">02 / SELECTED WORK</p>
            <h2 id="work-title">Projects built to be used.</h2>
            <p>Civic maps, health systems, commerce, and career tools. Designed, engineered, and shipped.</p>
            <a className="work-feature-link" href="/projects/">Explore all {projects.length} projects</a>
            <small>SELECTED BUILDS · 2023—2026</small>
          </div>
          <WorkGlobe projects={projects} />
        </div>
      </section>
      <section className="skills-section" id="skills" aria-labelledby="skills-title" data-animation-paused={capabilityMotionPaused}>
        <div className="section-heading"><div><p className="eyebrow">03 / CAPABILITIES</p><h2 id="skills-title">Built across the stack.</h2></div><button className="capability-motion-toggle" type="button" aria-pressed={capabilityMotionPaused} onClick={() => setCapabilityMotionPaused(value => !value)}>{capabilityMotionPaused ? 'Resume animations' : 'Pause animations'}</button></div>
        <div className="skills-list">
          {skills.map((skill) => {
            const example = projects.find(project => project.no === skill.project);
            return <article className="skill-column" key={skill.no}>
              <span className="skill-number">{skill.no}</span>
              <CapabilityVisual kind={skill.visual} />
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <ul className="skill-tools" aria-label={`${skill.title} technologies`}>{skill.tools.map(([name, icon]) => <li key={name}><TechIcon icon={icon} /><span>{name}</span></li>)}</ul>
              <a className="skill-example" href={example.href} target="_blank" rel="noreferrer"><span>In practice</span>{example.title}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M10 4H4v16h16v-6" /></svg><span className="skill-sr-only"> (opens in a new tab)</span></a>
            </article>;
          })}
        </div>
      </section>
      <section className="experience-section" id="experience" aria-labelledby="experience-title">
        <div className="section-heading"><div><p className="eyebrow">04 / EXPERIENCE</p><h2 id="experience-title">Built in the real world.</h2></div><p className="deck-intro">Roles where product thinking, engineering ownership, and practical delivery meet.</p></div>
        <ol className="experience-list">
          {experience.map((item, index) => <li className="experience-row" key={`${item.organization}-${item.role}`}><span className="experience-index">0{index + 1}</span><p className="experience-period">{item.period}</p><div className="experience-role"><h3>{item.role}</h3>{item.href ? <a href={item.href} target="_blank" rel="noreferrer">{item.organization} ↗</a> : <p>{item.organization}</p>}</div><div className="experience-detail"><p><span>Responsibility</span>{item.responsibility}</p><p><span>Outcome</span>{item.outcome}</p></div></li>)}
        </ol>
      </section>
      <section className="publication-section" id="publications" aria-labelledby="publication-title">
        <p className="eyebrow">PUBLICATION</p>
        <article className="publication-entry">
          <div className="publication-date"><time dateTime="2026-06-12">12 June 2026</time><span>Research article</span></div>
          <div className="publication-content">
            <p className="publication-journal">IJRSI · Volume 13, Issue 5 · pp. 2998–3024</p>
            <h2 id="publication-title">Blockchain-Based Electronic Health Record System</h2>
            <p className="publication-authors"><strong>Justine Rhey M. Tambong</strong>, Rovic James Somontina, Enrico JR. Balon, Vivien A. Agustin, and Ronald B. Fernandez</p>
            <p className="publication-citation">International Journal of Research and Scientific Innovation</p>
            <a className="publication-doi" href="https://doi.org/10.51244/IJRSI.2026.1305000262" target="_blank" rel="noreferrer">DOI: 10.51244/IJRSI.2026.1305000262</a>
          </div>
          <div className="publication-actions">
            <a href="https://rsisinternational.org/journals/ijrsi/view/blockchain-based-electronic-health-record-system" target="_blank" rel="noreferrer">Read article<span className="skill-sr-only"> (opens in a new tab)</span></a>
            <a href="https://rsisinternational.org/journals/ijrsi/uploads/vol13-iss5-pg2998-3024-202606_pdf.pdf" target="_blank" rel="noreferrer">Read PDF<span className="skill-sr-only"> (opens in a new tab)</span></a>
          </div>
        </article>
      </section>
      <GitHubActivity />
      <section className="about-section" id="about"><p className="eyebrow">06 / A LITTLE CONTEXT</p><div className="about-grid"><h2>Backend thinking.<br/><em>Frontend feeling.</em></h2><div><p>My work lives where systems and stories meet. I care about the quiet details: a useful error, a fast page, a data model that still makes sense six months later.</p><p>Currently exploring Rust, distributed systems, generative tools, and the space between technical precision and visual character.</p><dl className="about-facts"><div><dt>Focus</dt><dd>Product systems, AI tools, and APIs</dd></div><div><dt>Ownership</dt><dd>Frontend-to-backend engineering and delivery</dd></div><div><dt>Building</dt><dd>Co-founder at ArkodevPH</dd></div></dl><a className="text-link" href="mailto:justrhey.tambong@gmail.com">Let’s make something useful <span>↗</span></a></div></div></section>
      <section className="contact-section" id="contact">
        <div className="contact-intro">
          <p className="eyebrow">07 / YOUR TURN</p>
          <h2>Have a good problem?</h2>
          <p>Tell me what you’re working on, what you need, and where I can help.</p>
          <div className="contact-direct"><a className="contact-email" href="mailto:justrhey.tambong@gmail.com">justrhey.tambong@gmail.com <span>↗</span></a><button type="button" onClick={copyEmail}>{emailCopied ? 'Copied' : 'Copy email'}</button></div>
        </div>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <fieldset className="contact-options">
            <legend>What can I help with?</legend>
            <label><input type="radio" name="inquiry" value="Website" defaultChecked /><span>Website</span></label>
            <label><input type="radio" name="inquiry" value="AI system" /><span>AI system</span></label>
            <label><input type="radio" name="inquiry" value="Automation" /><span>Automation</span></label>
            <label><input type="radio" name="inquiry" value="Other" /><span>Other</span></label>
          </fieldset>
          <div className="contact-field">
            <label htmlFor="contact-name">01 / Name</label>
            <input id="contact-name" type="text" name="name" autoComplete="name" placeholder="Your name" required />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">02 / Email</label>
            <input id="contact-email" type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
          </div>
          <div className="contact-field contact-message">
            <label htmlFor="contact-message">03 / Project</label>
            <textarea id="contact-message" name="message" rows="4" placeholder="A short note about the idea, timeline, or problem..." required />
          </div>
          <div className="contact-submit-row">
            <p id="contact-note">Opens a prefilled email draft · Usually replies within 1–2 days</p>
            <button type="submit" aria-describedby="contact-note">{contactStatus === 'draft' ? 'Draft opened' : 'Open email draft'} <span>↗</span></button>
          </div>
          <p className="contact-status" role="status" aria-live="polite">{contactStatus === 'draft' ? 'If your email app did not open, use “Copy email” and send your message directly.' : ''}</p>
        </form>
      </section>
    </main><footer><span>© 2026 JRT</span><span>BUILT WITH INTENTION / <a href="https://github.com/justrhey" target="_blank" rel="noreferrer">GITHUB ↗</a></span></footer>
  </div>;
}
