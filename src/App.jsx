import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { siCss, siDjango, siFramer, siMaplibre, siNestjs, siNextdotjs, siNodedotjs, siPostgresql, siReact, siRust, siSpringboot, siStellar, siThreedotjs, siTypescript } from 'simple-icons';
import ThemeToggle from './ThemeToggle.jsx';

const projects = [
  { no: '01', mark: 'H', logo: '/images/projects/huntly-logo.webp', image: '/images/projects/huntly.webp', title: 'HUNTLY', type: 'Career support SaaS / 2026', text: 'A job-search support platform that connects candidates with expert guidance, resume review, opportunity tracking, and a focused workspace.', tags: ['React', 'NestJS', 'PostgreSQL'], details: { role: 'Full-Stack Engineer · Product architecture and delivery', scope: 'Delivered role-based workspaces, CRM operations, coaching, and application workflows across the product stack.', outcome: 'Established a secure, unified workspace for candidates and their support teams to manage opportunities.' }, href: 'https://www.gohuntly.com/', tone: 'green' },
  { no: '02', mark: '⌖', logo: '/images/projects/co-map-logo.webp', image: '/images/projects/co-map.webp', title: 'CO—MAP', type: 'Civic technology / 2025', text: 'Community-powered complaint mapping with issue pins, 3D buildings, and gamified scoring for visible local action.', tags: ['Django REST', 'MapLibre', 'PostGIS'], details: { role: 'Full-Stack Engineer · Geospatial systems', scope: 'Engineered the reporting interface, backend APIs, spatial data model, map visualizations, and issue-scoring workflows.', outcome: 'Created a shared operational view that turns community reports into visible, actionable local data.' }, href: 'https://co-map.vercel.app/', tone: 'blue' },
  { no: '03', mark: '+', image: '/images/projects/ehr.webp', title: 'EHR BLOCKCHAIN', type: 'Health systems / 2024', text: 'Blockchain-notarized health records with field-level encryption, content hashing, and a verifiable version history.', tags: ['Rust', 'Actix-web', 'Soroban'], details: { role: 'Full-Stack Engineer · Secure health platforms', scope: 'Built the clinical interface, Rust services, encrypted data flows, content hashing, and blockchain verification layer.', outcome: 'Enabled auditable record history while preserving the confidentiality of sensitive patient information.' }, href: 'https://github.com/justrhey/capstone', tone: 'green' },
  { no: '04', mark: '▯', logo: '/images/projects/fresh-phones-logo.webp', image: '/images/projects/fresh-phones.webp', title: 'FRESH PHONES PH', type: 'Commerce / 2025', text: 'A Y2K-inspired storefront for an iPhone reseller’s paluwagan installment program, built around clarity and trust.', tags: ['Next.js', 'TypeScript', 'PostgreSQL'], details: { role: 'Full-Stack Engineer · Commerce systems', scope: 'Developed the storefront, product discovery, installment-plan education, backend workflows, and responsive customer journey.', outcome: 'Clarified the path from product discovery to a trusted and understandable installment plan.' }, href: 'https://freshphonesph.vercel.app/', tone: 'pink' },
  { no: '05', mark: 'D', logo: '/images/projects/dmarc-logo.webp', image: '/images/projects/dmarc.webp', title: 'DM ARC CONSTRUCTION', type: 'Brand website / 2025', text: 'A premium construction-services website with a WebGL backdrop, smooth reveals, and an editorial presentation of past work.', tags: ['React', 'Three.js', 'GSAP'], details: { role: 'Full-Stack Engineer · Digital experience', scope: 'Delivered the project architecture, service content, case-study presentation, interactive WebGL layer, and production deployment.', outcome: 'Translated completed construction work into a credible, premium digital presence for prospective clients.' }, href: 'https://dmarc-construction.vercel.app/', tone: 'gold' },
  { no: '06', mark: 'C', image: '/images/projects/cassie.webp', title: 'CASSIE', type: 'Music platform / 2024', text: 'Music discovery and streaming with curated playlists, artist albums, Top 50 charts, and seamless audio playback.', tags: ['React', 'Node.js', 'Spotify API'], details: { role: 'Full-Stack Engineer · Media applications', scope: 'Implemented the discovery interface, backend integration, playlists, artist catalogs, charts, and continuous playback experience.', outcome: 'Unified music discovery and personal listening into a focused, consistent application experience.' }, href: 'https://github.com/justinebacurin1927/Cassie', tone: 'blue' },
  { no: '07', mark: 'T', image: '/images/projects/ticketing.webp', title: 'TICKETING SYSTEM', type: 'Support platform / 2023', text: 'Support ticket management with role-based access, lifecycle workflows, priority queues, attachments, and live status updates.', tags: ['Spring Boot', 'React', 'PostgreSQL'], details: { role: 'Full-Stack Engineer · Enterprise workflows', scope: 'Engineered the operations dashboard, service layer, relational data model, access controls, priority queues, and ticket lifecycle.', outcome: 'Centralized support operations from initial submission through assignment, tracking, and resolution.' }, href: 'https://github.com/justrhey/capstone', tone: 'green' },
];

const skills = [
  { no: '01', title: 'Full-stack product engineering', description: 'End-to-end ownership from product requirements and system design through implementation, testing, and production delivery.', tools: [['TypeScript', siTypescript], ['React', siReact], ['Next.js', siNextdotjs], ['Node.js', siNodedotjs]] },
  { no: '02', title: 'Frontend systems', description: 'Responsive, accessible interfaces with clear information architecture, thoughtful interaction, and maintainable component systems.', tools: [['React', siReact], ['CSS', siCss], ['Motion', siFramer], ['Three.js', siThreedotjs]] },
  { no: '03', title: 'Backend and APIs', description: 'Reliable application services, authentication, role-based workflows, integrations, and domain-focused API architecture.', tools: [['NestJS', siNestjs], ['Django REST', siDjango], ['Spring Boot', siSpringboot], ['Rust', siRust]] },
  { no: '04', title: 'Data and specialized platforms', description: 'Relational and geospatial data models for commerce, civic technology, healthcare, automation, and AI-enabled products.', tools: [['PostgreSQL / PostGIS', siPostgresql], ['MapLibre', siMaplibre], ['Soroban', siStellar]] },
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
    period: 'Feb 2025 — Present',
    role: 'AI Engineer',
    organization: 'TambayanPH',
    responsibility: 'Develop SaaS products and automation pipelines with n8n and Claude, connecting business workflows, third-party APIs, and internal tools.',
    outcome: 'Delivered veterinary Facebook automation and a RealmMLP-to-Notion integration built from an undocumented API.',
  },
];

function PixelMark() { return <img className="brand-logo" src="/logo.png" alt="" aria-hidden="true" />; }
function TechIcon({ icon }) { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg>; }

export default function App() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', duration: 34 });
  const [activeProject, setActiveProject] = useState(0);
  const [flippedProject, setFlippedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [contactStatus, setContactStatus] = useState('idle');
  const [emailCopied, setEmailCopied] = useState(false);
  const syncActiveProject = useCallback(() => {
    if (emblaApi) setActiveProject(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  const updateCardOrbit = useCallback((api) => {
    const viewport = api.rootNode().getBoundingClientRect();
    const viewportCenter = viewport.left + viewport.width / 2;

    api.slideNodes().forEach((slide) => {
      const bounds = slide.getBoundingClientRect();
      const distance = (bounds.left + bounds.width / 2 - viewportCenter) / bounds.width;
      const clampedDistance = Math.max(-2.5, Math.min(2.5, distance));
      const depth = Math.abs(clampedDistance);
      const card = slide.querySelector('.project-card');

      slide.style.setProperty('--orbit-opacity', Math.max(.16, 1 - depth * .27).toFixed(2));
      slide.style.setProperty('--orbit-brightness', Math.max(.46, 1 - depth * .16).toFixed(2));
      slide.style.zIndex = String(Math.max(1, 20 - Math.round(depth * 5)));
      card?.style.setProperty('--orbit-y', `${-Math.min(depth, 2.2) * 22}px`);
      card?.style.setProperty('--orbit-tilt', `${clampedDistance * 4.5}deg`);
      card?.style.setProperty('--orbit-scale', String(Math.max(.76, 1 - depth * .08)));
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return undefined;
    syncActiveProject();
    updateCardOrbit(emblaApi);
    emblaApi
      .on('scroll', updateCardOrbit)
      .on('select', syncActiveProject)
      .on('reInit', updateCardOrbit)
      .on('reInit', syncActiveProject);
    return () => {
      emblaApi
        .off('scroll', updateCardOrbit)
        .off('select', syncActiveProject)
        .off('reInit', updateCardOrbit)
        .off('reInit', syncActiveProject);
    };
  }, [emblaApi, syncActiveProject, updateCardOrbit]);

  useEffect(() => setFlippedProject(null), [activeProject]);

  useEffect(() => {
    const sectionIds = ['overview', 'work', 'skills', 'experience', 'about', 'contact'];
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

  const getCardPosition = (index) => {
    const offset = (index - activeProject + projects.length) % projects.length;
    if (offset === 0) return 'active';
    if (offset === 1) return 'next';
    if (offset === projects.length - 1) return 'previous';
    return 'hidden';
  };
  const selectProject = (index, position) => {
    if (position !== 'active') {
      emblaApi?.scrollTo(index);
      return;
    }
    if (flippedProject === index) window.open(projects[index].href, '_blank', 'noopener,noreferrer');
    else setFlippedProject(index);
  };
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
          <a className={activeSection === 'about' ? 'active' : ''} aria-current={activeSection === 'about' ? 'page' : undefined} href="#about">About</a>
          <a className={activeSection === 'contact' ? 'active' : ''} aria-current={activeSection === 'contact' ? 'page' : undefined} href="#contact">Contact</a>
          <span>MANILA, PH · AVAILABLE 2026</span>
        </nav>
      </section>
      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">02 / SELECTED WORK</p><h2 id="work-title">Selected work.</h2></div><p className="deck-intro">Drag through a small collection of systems, interfaces, and experiments.</p></div>
        <div className="project-deck-shell" ref={emblaRef}>
          <div className="project-deck" aria-live="polite">
            {projects.map((project, index) => {
              const position = getCardPosition(index);
              return <div className={`project-slide is-${position}`} key={project.no}>
                <button
                  className={`project-card ${project.tone}${flippedProject === index ? ' is-flipped' : ''}`}
                  type="button"
                  onClick={() => selectProject(index, position)}
                  aria-label={`${project.title}: ${position !== 'active' ? 'bring card forward' : flippedProject === index ? 'open project' : 'show project details'}`}
                >
                  <span className="project-card-inner">
                    <span className="project-face project-front">
                      <span className="project-card-head">
                        <span className={`project-avatar${project.logo ? ' has-logo' : ''}`} aria-hidden="true">{project.logo ? <img src={project.logo} alt="" /> : project.mark}</span>
                        <span className="project-author"><strong>{project.title}</strong><small>{project.type}</small></span>
                        <span className="project-menu" aria-hidden="true">•••</span>
                      </span>
                      <span className="project-description">{project.text}</span>
                      <span className="project-preview">
                        <img className="project-preview-image" src={project.image} alt={`${project.title} interface preview`} loading="lazy" />
                        <span className="project-preview-label" aria-hidden="true"><i>Interface</i><b>{project.no} / 07</b></span>
                      </span>
                      <span className="project-stats"><span>Selected work</span><span>JRT · Portfolio</span></span>
                      <span className="project-actions"><span>{position === 'active' ? 'Click for details' : 'Bring forward'}</span><span>Flip ↻</span></span>
                    </span>
                    <span className="project-face project-back">
                      <span className="project-back-kicker">{project.no} / Project overview</span>
                      <strong className="project-back-title">{project.title}</strong>
                      {Object.entries(project.details).map(([label, value]) => <span className="project-detail" key={label}><small>{label}</small><span>{value}</span></span>)}
                      <span className="project-stack"><small>Core stack</small><span>{project.tags.join(' · ')}</span></span>
                      <span className="project-back-action">Click again to open project <b>↗</b></span>
                    </span>
                  </span>
                </button>
              </div>;
            })}
          </div>
        </div>
      </section>
      <section className="skills-section" id="skills" aria-labelledby="skills-title">
        <div className="section-heading"><div><p className="eyebrow">03 / CAPABILITIES</p><h2 id="skills-title">What I bring.</h2></div><p className="deck-intro">A practical skill set for taking digital products from an initial idea to a dependable release.</p></div>
        <div className="skills-list">
          {skills.map((skill) => <article className="skill-row" key={skill.no}><span className="skill-number">{skill.no}</span><div><h3>{skill.title}</h3><p>{skill.description}</p></div><ul className="skill-tools" aria-label={`${skill.title} technologies`}>{skill.tools.map(([name, icon]) => <li key={name}><TechIcon icon={icon} /><span>{name}</span></li>)}</ul></article>)}
        </div>
      </section>
      <section className="experience-section" id="experience" aria-labelledby="experience-title">
        <div className="section-heading"><div><p className="eyebrow">04 / EXPERIENCE</p><h2 id="experience-title">Built in the real world.</h2></div><p className="deck-intro">Roles where product thinking, engineering ownership, and practical delivery meet.</p></div>
        <ol className="experience-list">
          {experience.map((item, index) => <li className="experience-row" key={`${item.organization}-${item.role}`}><span className="experience-index">0{index + 1}</span><p className="experience-period">{item.period}</p><div className="experience-role"><h3>{item.role}</h3>{item.href ? <a href={item.href} target="_blank" rel="noreferrer">{item.organization} ↗</a> : <p>{item.organization}</p>}</div><div className="experience-detail"><p><span>Responsibility</span>{item.responsibility}</p><p><span>Outcome</span>{item.outcome}</p></div></li>)}
        </ol>
      </section>
      <section className="about-section" id="about"><p className="eyebrow">05 / A LITTLE CONTEXT</p><div className="about-grid"><h2>Backend thinking.<br/><em>Frontend feeling.</em></h2><div><p>My work lives where systems and stories meet. I care about the quiet details: a useful error, a fast page, a data model that still makes sense six months later.</p><p>Currently exploring Rust, distributed systems, generative tools, and the space between technical precision and visual character.</p><dl className="about-facts"><div><dt>Focus</dt><dd>Product systems, AI tools, and APIs</dd></div><div><dt>Ownership</dt><dd>Frontend-to-backend engineering and delivery</dd></div><div><dt>Building</dt><dd>Co-founder at ArkodevPH</dd></div></dl><a className="text-link" href="mailto:justrhey.tambong@gmail.com">Let’s make something useful <span>↗</span></a></div></div></section>
      <section className="contact-section" id="contact">
        <div className="contact-intro">
          <p className="eyebrow">06 / YOUR TURN</p>
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
