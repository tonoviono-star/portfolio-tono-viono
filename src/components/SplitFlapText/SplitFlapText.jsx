'use client';

import { useEffect, useMemo, useState } from 'react';

const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function SplitFlapText({
  words,
  text = undefined,
  className = '',
  flipDuration = 0.12,
  stagger = 0.06,
  flipsPerChar = 8,
  tileColor = '#111827',
  textColor = '#f8fafc',
  tileRadius = 8,
  gap = 6,
  fontSize = 52,
  depth = 0.5,
  intro = true,
  charset = 'alphanumeric',
  order = 'left',
  align = 'left',
  tileStyle = 'board',
  glare = 0,
  loop = false,
  padTo = 0,
  cycleDelay = 2400
}) {
  const wordsKey = Array.isArray(words) ? words.join('\u001f') : '';
  const sequence = useMemo(() => (wordsKey ? wordsKey.split('\u001f') : [text ?? 'TONO VIONO']).map((word) => String(word).toUpperCase()), [text, wordsKey]);
  const [activeIndex, setActiveIndex] = useState(0);
  const target = sequence[activeIndex] ?? sequence[0];
  const [value, setValue] = useState(() => ' '.repeat(target.length));

  useEffect(() => {
    setValue(' '.repeat(target.length));
    let frame = 0;
    const started = window.setInterval(() => {
      frame += 1;
      setValue((current) => current.split('').map((char, index) => {
        if (char === target[index]) return char;
        if (frame % 2 === 0 && Math.random() > 0.35) return glyphs[Math.floor(Math.random() * glyphs.length)];
        return frame > Math.max(8, flipsPerChar * 2) + index * Math.max(1, stagger * 20) ? target[index] : char;
      }).join(''));
      if (frame > Math.max(8, flipsPerChar * 2) + target.length * 2) {
        window.clearInterval(started);
        if (sequence.length > 1 && (loop || activeIndex < sequence.length - 1)) {
          window.setTimeout(() => setActiveIndex((index) => (index + 1) % sequence.length), cycleDelay || 2400);
        }
      }
    }, Math.max(36, Math.min(80, flipDuration * 500)));
    return () => window.clearInterval(started);
  }, [target, flipsPerChar, stagger, sequence, loop, activeIndex, cycleDelay]);

  return <div className={`split-flap-text ${className}`} aria-label={target} style={{ '--split-flap-duration': `${flipDuration}s`, '--split-flap-tile': tileColor, '--split-flap-ink': textColor, '--split-flap-radius': `${tileRadius}px`, '--split-flap-gap': `${gap}px`, '--split-flap-size': `${fontSize}px`, '--split-flap-depth': depth, '--split-flap-intro': intro ? 1 : 0 }}>{[...value].map((char, index) => <span className="split-flap-text__tile" key={`${index}-${char}`}>{char === ' ' ? '\u00a0' : char}</span>)}</div>;
}
