import React, { useEffect, useRef, useState } from 'react';
import SpeechBubble from './SpeechBubble.jsx';
import './cover.css';

const GREETING = "Hey — I'm Justine. Tap me to talk.";

const LINES = [
  'I built HUNTLY — a career-support SaaS with role-based workspaces.',
  'CO—MAP plots community complaints in 3D with MapLibre and PostGIS.',
  'Ask me about Rust, Soroban, or notarizing health records on-chain.',
  'I co-run ArkodevPH. We take products from discovery to production.',
  "Okay, you can stop clicking me now. Or don't.",
];

export default function CoverSection() {
  const counter = useRef(1);
  const greetTimer = useRef(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [speech, setSpeech] = useState('');
  const [muted, setMuted] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setVoiceSupported('speechSynthesis' in window);

    greetTimer.current = setTimeout(() => setSpeech(GREETING), 1400);

    return () => {
      if (greetTimer.current) clearTimeout(greetTimer.current);
    };
  }, []);

  const speak = (text) => {
    if (muted || !voiceSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const handleTalk = () => {
    if (greetTimer.current) {
      clearTimeout(greetTimer.current);
      greetTimer.current = null;
    }
    counter.current += 1;
    const line = LINES[(counter.current - 2) % LINES.length];
    setSpeech(line);
    speak(line);
  };

  const toggleMute = voiceSupported
    ? (event) => {
        event.stopPropagation();
        setMuted((m) => {
          if (m) speak(speech);
          else window.speechSynthesis.cancel();
          return !m;
        });
      }
    : null;

  return (
    <div className="cover-stage">
      <div
        className="cover-talk"
        role="button"
        tabIndex={0}
        onClick={handleTalk}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleTalk();
          }
        }}
      >
        <div className="cover-bubble">
          <SpeechBubble
            text={speech}
            muted={muted}
            reducedMotion={reducedMotion}
            onToggleMute={toggleMute}
          />
        </div>
      </div>
    </div>
  );
}
