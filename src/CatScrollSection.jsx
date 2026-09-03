import { useEffect, useRef } from 'react';

export default function CatScrollSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePlayback = () => {
      if (!videoRef.current) return;
      if (media.matches) videoRef.current.pause();
      else videoRef.current.play().catch(() => {});
    };

    updatePlayback();
    media.addEventListener('change', updatePlayback);
    return () => media.removeEventListener('change', updatePlayback);
  }, []);

  return <div className="cat-scroll" aria-label="A small hello from a black cat companion">
    <div className="cat-character">
      <video ref={videoRef} autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
        <source src="/black-cat-scroll.webm" type="video/webm" />
        <source src="/black-cat-scroll.mp4" type="video/mp4" />
      </video>
      <span className="cat-speech">hi.</span>
    </div>
  </div>;
}
