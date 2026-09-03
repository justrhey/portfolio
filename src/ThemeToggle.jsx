import { useState } from 'react';

const getCurrentTheme = () => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getCurrentTheme);

  const toggleTheme = (event) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    const radius = Math.hypot(
      Math.max(event.clientX, window.innerWidth - event.clientX),
      Math.max(event.clientY, window.innerHeight - event.clientY),
    );

    root.style.setProperty('--theme-iris-x', `${event.clientX}px`);
    root.style.setProperty('--theme-iris-y', `${event.clientY}px`);
    root.style.setProperty('--theme-iris-radius', `${radius}px`);

    const applyTheme = () => {
      root.dataset.theme = nextTheme;
      localStorage.setItem('portfolio-theme', nextTheme);
      setTheme(nextTheme);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !document.startViewTransition) {
      applyTheme();
      return;
    }

    const transition = document.startViewTransition(applyTheme);
    root.classList.add('theme-iris-transition');
    transition.finished.finally(() => root.classList.remove('theme-iris-transition'));
  };

  const isDark = theme === 'dark';

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`} title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
    {isDark
      ? <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>
      : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.5 8.5 0 1 0 20.4 15.2Z"/></svg>}
  </button>;
}
