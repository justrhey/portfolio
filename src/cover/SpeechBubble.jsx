import { useEffect, useState } from 'react';

const TYPING_MS = 26;

function VolumeIcon({ muted }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
      {muted ? (
        <>
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      ) : (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      )}
    </svg>
  );
}

export default function SpeechBubble({ text, muted, onToggleMute, reducedMotion }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!text) {
      setShown(0);
      return undefined;
    }
    if (reducedMotion) {
      setShown(text.length);
      return undefined;
    }
    setShown(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= text.length) clearInterval(id);
    }, TYPING_MS);
    return () => clearInterval(id);
  }, [text, reducedMotion]);

  if (!text) return null;

  return (
    <div className="cover-bubble-card">
      <div className="cover-sr" aria-live="polite">{text}</div>

      <p aria-hidden="true" className="cover-bubble-text">
        {text.slice(0, shown)}
        {shown < text.length && <span className="cover-caret" />}
      </p>

      {onToggleMute && (
        <button
          type="button"
          onClick={onToggleMute}
          className="cover-mute"
          aria-label={muted ? 'Unmute voice' : 'Mute voice'}
        >
          <VolumeIcon muted={muted} />
        </button>
      )}

      <span className="cover-bubble-tail" aria-hidden="true" />
    </div>
  );
}
