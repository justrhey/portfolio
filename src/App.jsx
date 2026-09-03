import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const projects = [
  { no: '01', mark: 'V', title: 'VÉLOUR', type: 'Editorial web / 2026', text: 'Premium wine showcase with a procedural 3D Bordeaux bottle, parallax storytelling, and a black-and-gold editorial direction.', tags: ['Next.js', 'Three.js', 'GSAP'], href: 'https://ve-lour.vercel.app/', tone: 'gold' },
  { no: '02', mark: '⌖', title: 'CO—MAP', type: 'Civic technology / 2025', text: 'Community-powered complaint mapping with issue pins, 3D buildings, and gamified scoring for visible local action.', tags: ['Django REST', 'MapLibre', 'PostGIS'], href: 'https://co-map.vercel.app/', tone: 'blue' },
  { no: '03', mark: '+', title: 'EHR BLOCKCHAIN', type: 'Health systems / 2024', text: 'Blockchain-notarized health records with field-level encryption, content hashing, and a verifiable version history.', tags: ['Rust', 'Actix-web', 'Soroban'], href: 'https://github.com/justrhey/capstone', tone: 'green' },
  { no: '04', mark: '▯', title: 'FRESH PHONES PH', type: 'Commerce / 2025', text: 'A Y2K-inspired storefront for an iPhone reseller’s paluwagan installment program, built around clarity and trust.', tags: ['Next.js', 'TypeScript', 'Tailwind'], href: 'https://freshphonesph.vercel.app/', tone: 'pink' },
  { no: '05', mark: 'D', title: 'DM ARC CONSTRUCTION', type: 'Brand website / 2025', text: 'A premium construction-services website with a WebGL backdrop, smooth reveals, and an editorial presentation of past work.', tags: ['React', 'Motion', 'WebGL'], href: 'https://dmarc-construction.vercel.app/', tone: 'gold' },
  { no: '06', mark: 'C', title: 'CASSIE', type: 'Music platform / 2024', text: 'Music discovery and streaming with curated playlists, artist albums, Top 50 charts, and seamless audio playback.', tags: ['React', 'Node.js', 'Spotify API'], href: 'https://github.com/justinebacurin1927/Cassie', tone: 'blue' },
  { no: '07', mark: 'T', title: 'TICKETING SYSTEM', type: 'Support platform / 2023', text: 'Support ticket management with role-based access, lifecycle workflows, priority queues, attachments, and live status updates.', tags: ['Spring Boot', 'React', 'PostgreSQL'], href: 'https://github.com/justrhey/capstone', tone: 'green' },
];

function PixelMark() { return <img className="brand-logo" src="/logo.png" alt="" aria-hidden="true" />; }

export default function App() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', duration: 34 });
  const [activeProject, setActiveProject] = useState(0);
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

  const getCardPosition = (index) => {
    const offset = (index - activeProject + projects.length) % projects.length;
    if (offset === 0) return 'active';
    if (offset === 1) return 'next';
    if (offset === projects.length - 1) return 'previous';
    return 'hidden';
  };
  const selectProject = (index, position) => {
    if (position === 'active') window.open(projects[index].href, '_blank', 'noopener,noreferrer');
    else emblaApi?.scrollTo(index);
  };
  const handleContactSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:justrhey.tambong@gmail.com?subject=${subject}&body=${body}`;
  };

  return <div className="site-shell">
    <header className="topbar"><a className="wordmark" href="#top" aria-label="Back to top"><PixelMark/><span>JUSTINE RHEY<br/><i>FULL-STACK DEVELOPER</i></span></a><nav aria-label="Primary navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav><span className="availability"><span/> Available for select projects</span></header>
    <main id="top">
      <section className="profile-hero" aria-labelledby="profile-title">
        <div className="profile-cover">
          <p>Full-stack developer · Manila</p>
          <h1 id="profile-title">Software with<br/><em>something to say.</em></h1>
        </div>
        <div className="profile-summary">
          <div className="profile-avatar">
            <img src="/images/portrait-bitmap.png" alt="Justine Rhey Tambong" />
            <span aria-label="Available for work" />
          </div>
          <div className="profile-identity">
            <p>JUSTINE RHEY TAMBONG</p>
            <h2>Full-stack developer</h2>
            <span>Backend systems · AI products · Interfaces</span>
            <a className="founder-link" href="https://arkodevph.com" target="_blank" rel="noreferrer">Co-founder of ArkodevPH ↗</a>
          </div>
          <div className="profile-actions">
            <a className="profile-primary" href="#work">View work <span>↘</span></a>
            <a href="mailto:justrhey.tambong@gmail.com">Let’s talk ↗</a>
          </div>
        </div>
        <nav className="profile-tabs" aria-label="Portfolio sections">
          <a className="active" href="#top">Overview</a>
          <a href="#work">Selected work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
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
                  className={`project-card ${project.tone}`}
                  type="button"
                  onClick={() => selectProject(index, position)}
                  aria-label={`${project.title}: ${position === 'active' ? 'open project' : 'show project details'}`}
                >
                  <span className="project-card-head">
                    <span className="project-avatar" aria-hidden="true">{project.mark}</span>
                    <span className="project-author"><strong>{project.title}</strong><small>{project.type}</small></span>
                    <span className="project-menu" aria-hidden="true">•••</span>
                  </span>
                  <span className="project-description">{project.text}</span>
                  <span className="project-preview" aria-hidden="true">
                    <span className="project-preview-mark">{project.mark}</span>
                    <span className="project-tags">{project.tags.map((tag) => <i key={tag}>{tag}</i>)}</span>
                  </span>
                  <span className="project-stats"><span>Selected work</span><span>JRT · Portfolio</span></span>
                  <span className="project-actions">
                    <span>{position === 'active' ? 'Open project' : 'Bring forward'}</span>
                    <span>View ↗</span>
                  </span>
                </button>
              </div>;
            })}
          </div>
        </div>
      </section>
      <section className="about-section" id="about"><p className="eyebrow">03 / A LITTLE CONTEXT</p><div className="about-grid"><h2>Backend thinking.<br/><em>Frontend feeling.</em></h2><div><p>My work lives where systems and stories meet. I care about the quiet details: a useful error, a fast page, a data model that still makes sense six months later.</p><p>Currently exploring Rust, distributed systems, generative tools, and the space between technical precision and visual character.</p><a className="text-link" href="mailto:justrhey.tambong@gmail.com">Let’s make something useful <span>↗</span></a></div></div></section>
      <section className="contact-section" id="contact">
        <div className="contact-intro">
          <p className="eyebrow">04 / YOUR TURN</p>
          <h2>Have a good problem?</h2>
          <p>Tell me what you’re working on, what you need, and where I can help.</p>
          <a className="contact-email" href="mailto:justrhey.tambong@gmail.com">justrhey.tambong@gmail.com <span>↗</span></a>
        </div>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <label><span>Name</span><input type="text" name="name" autoComplete="name" placeholder="Your name" required /></label>
          <label><span>Email</span><input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
          <label className="contact-message"><span>Message</span><textarea name="message" rows="5" placeholder="Tell me about your project..." required /></label>
          <button type="submit">Send message <span>↗</span></button>
        </form>
      </section>
    </main><footer><span>© 2026 JRT</span><span>BUILT WITH INTENTION / <a href="https://github.com/justrhey" target="_blank" rel="noreferrer">GITHUB ↗</a></span></footer>
  </div>;
}
