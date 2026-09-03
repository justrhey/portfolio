import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function CatScrollSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const speechRef = useRef(null);

  useGSAP(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const speech = speechRef.current;
    if (!video || !section || !speech) return undefined;

    let trigger;
    const setup = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration)) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        video.currentTime = Math.min(duration, 5.4);
        speech.style.opacity = '1';
        speech.style.transform = 'translateY(0) scale(1)';
        return;
      }

      trigger = ScrollTrigger.create({
        trigger: section.closest('.about-section') || section,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: .3,
        onUpdate(self) {
          video.currentTime = self.progress * duration;
          const reveal = Math.max(0, Math.min(1, (self.progress - .68) / .12));
          speech.style.opacity = String(reveal);
          speech.style.transform = `translateY(${(1 - reveal) * 12}px) scale(${.9 + reveal * .1})`;
        },
      });
    };

    if (video.readyState >= 1) setup();
    else video.addEventListener('loadedmetadata', setup, { once: true });

    return () => {
      video.removeEventListener('loadedmetadata', setup);
      trigger?.kill();
    };
  }, { scope: sectionRef });

  return <div className="cat-scroll" ref={sectionRef} aria-label="A small hello from a black cat companion">
    <div className="cat-character">
      <video ref={videoRef} muted playsInline preload="auto" aria-hidden="true">
        <source src="/black-cat-scroll.webm" type="video/webm" />
        <source src="/black-cat-scroll.mp4" type="video/mp4" />
      </video>
      <span className="cat-speech" ref={speechRef}>hi.</span>
    </div>
  </div>;
}
