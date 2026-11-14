'use client';

import { useState } from 'react';

type RubberSegmentProps = {
  items: string[];
  defaultValue?: string;
  onChange?: (value: string, index: number) => void;
};

export default function RubberSegment({ items, defaultValue, onChange }: RubberSegmentProps) {
  const [active, setActive] = useState(Math.max(0, items.indexOf(defaultValue ?? items[0])));

  return (
    <nav className="rubber-segment" aria-label="Primary navigation">
      <span className="rubber-segment__thumb" style={{ transform: `translateX(${active * 100}%)` }} />
      {items.map((item, index) => (
        <button
          key={item}
          type="button"
          className={`rubber-segment__item ${active === index ? 'is-active' : ''}`}
          onClick={() => {
            setActive(index);
            onChange?.(item, index);
          }}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}
