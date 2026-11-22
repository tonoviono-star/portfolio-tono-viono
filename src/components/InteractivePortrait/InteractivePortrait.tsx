'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  CardinalDirection,
  DEFAULT_CENTER_DWELL_MS,
  DEFAULT_DEADZONE_RATIO,
  GazeDirection,
  GazeSnapshot,
  createGazeMachine,
  detectGazeSector,
} from './gazeStateMachine';

const PORTRAIT_ASSETS: Record<GazeDirection, { src: string; alt: string }> = {
  center: {
    src: '/assets/connect-portrait/3be7d912.jpg',
    alt: 'Potret Tono Viono menghadap lurus ke kamera',
  },
  up: {
    src: '/assets/connect-portrait/Man_looking_up_in_studio_f3d0bb46.jpg',
    alt: 'Potret Tono Viono menatap ke atas',
  },
  right: {
    src: '/assets/connect-portrait/Man_smiling_in_studio_portrait_9bb04fda.jpg',
    alt: 'Potret Tono Viono menatap ke kanan',
  },
  down: {
    src: '/assets/connect-portrait/Man_looking_down_studio_portrait_798f0403.jpg',
    alt: 'Potret Tono Viono menatap ke bawah',
  },
  left: {
    src: '/assets/connect-portrait/Man_smiling_in_studio_portrait_86e5a0d0.jpg',
    alt: 'Potret Tono Viono menatap ke kiri',
  },
};

const CARDINAL_DIRECTIONS: CardinalDirection[] = ['up', 'right', 'down', 'left'];

const INITIAL_SNAPSHOT: GazeSnapshot = {
  currentState: 'center',
  targetState: 'center',
  viaCenter: false,
};

const subscribeNoop = () => () => {};
const getDebugQuery = (): boolean =>
  new URLSearchParams(window.location.search).get('debug') === '1';
const getDebugQueryServer = (): boolean => false;

function isEditableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tag = target.tagName;
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    target.isContentEditable
  );
}

export default function InteractivePortrait() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef(true);
  const [snapshot, setSnapshot] = useState<GazeSnapshot>(INITIAL_SNAPSHOT);

  const debugFromUrl = useSyncExternalStore(
    subscribeNoop,
    getDebugQuery,
    getDebugQueryServer
  );
  const [debugOverride, setDebugOverride] = useState<boolean | null>(null);
  const showDebug = debugOverride ?? debugFromUrl;

  useEffect(() => {
    const preloaded: HTMLImageElement[] = [];
    for (const { src } of Object.values(PORTRAIT_ASSETS)) {
      const img = new window.Image();
      img.src = src;
      img.decode?.().catch(() => {});
      preloaded.push(img);
    }
    return () => {
      preloaded.length = 0;
    };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) {
      return undefined;
    }

    const machine = createGazeMachine({
      centerDwellMs: DEFAULT_CENTER_DWELL_MS,
      onChange: setSnapshot,
    });

    const updateFromClientPoint = (clientX: number, clientY: number) => {
      const sector = detectGazeSector({
        pointerX: clientX,
        pointerY: clientY,
        rect: frame.getBoundingClientRect(),
        deadzoneRatio: DEFAULT_DEADZONE_RATIO,
      });
      machine.setTarget(sector);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isVisibleRef.current || event.pointerType === 'touch') {
        return;
      }
      updateFromClientPoint(event.clientX, event.clientY);
    };

    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      updateFromClientPoint(touch.clientX, touch.clientY);
    };

    const onReset = () => {
      machine.reset();
    };

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              const intersecting = entries.some((entry) => entry.isIntersecting);
              isVisibleRef.current = intersecting;
              if (!intersecting) {
                machine.reset();
              }
            },
            { threshold: 0.05 }
          )
        : null;

    observer?.observe(frame);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onReset);
    document.documentElement.addEventListener('mouseleave', onReset);

    frame.addEventListener('touchstart', onTouch, { passive: true });
    frame.addEventListener('touchmove', onTouch, { passive: true });
    frame.addEventListener('touchend', onReset, { passive: true });
    frame.addEventListener('touchcancel', onReset, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onReset);
      document.documentElement.removeEventListener('mouseleave', onReset);

      frame.removeEventListener('touchstart', onTouch);
      frame.removeEventListener('touchmove', onTouch);
      frame.removeEventListener('touchend', onReset);
      frame.removeEventListener('touchcancel', onReset);

      machine.dispose();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      if (event.key !== 'd' && event.key !== 'D') {
        return;
      }
      if (isEditableElement(event.target)) {
        return;
      }
      setDebugOverride((prev) => !(prev ?? debugFromUrl));
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [debugFromUrl]);

  const toggleDebug = () => {
    setDebugOverride((prev) => !(prev ?? debugFromUrl));
  };

  return (
    <div className="interactive-portrait-wrap">
      <div ref={frameRef} className="interactive-portrait-frame">
        <div
          className="interactive-portrait-visual"
          role="img"
          aria-label="Potret interaktif Tono Viono mengikuti arah kursor"
        >
          <img
            src={PORTRAIT_ASSETS.center.src}
            alt={PORTRAIT_ASSETS.center.alt}
            className="interactive-portrait-layer interactive-portrait-layer--base"
            loading="eager"
            decoding="sync"
            draggable={false}
          />
          {CARDINAL_DIRECTIONS.map((direction) => {
            const asset = PORTRAIT_ASSETS[direction];
            const isActive = snapshot.currentState === direction;
            return (
              <img
                key={direction}
                src={asset.src}
                alt={asset.alt}
                className={`interactive-portrait-layer interactive-portrait-layer--cardinal${
                  isActive ? ' is-active' : ''
                }`}
                loading="eager"
                decoding="sync"
                draggable={false}
                aria-hidden="true"
              />
            );
          })}
          <div className="interactive-portrait-vignette" aria-hidden="true" />
        </div>

        {showDebug && (
          <aside
            className="interactive-portrait-debug-panel"
            aria-label="Status pelacakan tatapan potret"
            aria-live="polite"
          >
            <div className="interactive-portrait-debug-row">
              <span className="interactive-portrait-debug-label">Current State</span>
              <span className="interactive-portrait-debug-value">
                {snapshot.currentState}
              </span>
            </div>
            <div className="interactive-portrait-debug-row">
              <span className="interactive-portrait-debug-label">Target State</span>
              <span className="interactive-portrait-debug-value">
                {snapshot.targetState}
              </span>
            </div>
            <div className="interactive-portrait-debug-row">
              <span className="interactive-portrait-debug-label">Via Center</span>
              <span
                className={`interactive-portrait-debug-value${
                  snapshot.viaCenter ? ' is-via' : ''
                }`}
              >
                <span
                  className={`interactive-portrait-debug-dot${
                    snapshot.viaCenter ? ' is-active' : ''
                  }`}
                  aria-hidden="true"
                />
                {snapshot.viaCenter ? 'TRANSITING' : 'IDLE'}
              </span>
            </div>
          </aside>
        )}

        <button
          type="button"
          className="interactive-portrait-debug-toggle"
          aria-pressed={showDebug}
          onClick={toggleDebug}
          title="Toggle debug panel (Shortcut: D)"
        >
          Debug
        </button>
      </div>
    </div>
  );
}
