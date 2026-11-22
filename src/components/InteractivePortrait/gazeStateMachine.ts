export type GazeDirection = 'center' | 'up' | 'right' | 'down' | 'left';
export type CardinalDirection = Exclude<GazeDirection, 'center'>;

export interface GazeSnapshot {
  currentState: GazeDirection;
  targetState: GazeDirection;
  viaCenter: boolean;
}

export interface GazeSectorInput {
  pointerX: number;
  pointerY: number;
  rect: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  deadzoneRatio?: number;
}

export interface TimerAdapter {
  setTimeout: (fn: () => void, ms: number) => number;
  clearTimeout: (id: number) => void;
}

export interface GazeMachineOptions {
  centerDwellMs?: number;
  onChange?: (snapshot: GazeSnapshot) => void;
  timers?: TimerAdapter;
}

export interface GazeMachine {
  setTarget: (nextTarget: GazeDirection) => GazeSnapshot;
  reset: () => GazeSnapshot;
  getSnapshot: () => GazeSnapshot;
  dispose: () => void;
}

export const DEFAULT_DEADZONE_RATIO = 0.16;
export const DEFAULT_CENTER_DWELL_MS = 95;

const QUADRANT_HALF_RAD = Math.PI / 4;

const DEFAULT_TIMERS: TimerAdapter = {
  setTimeout: (fn, ms) => globalThis.setTimeout(fn, ms) as unknown as number,
  clearTimeout: (id) => globalThis.clearTimeout(id),
};

export function detectGazeSector(input: GazeSectorInput): GazeDirection {
  const { pointerX, pointerY, rect, deadzoneRatio = DEFAULT_DEADZONE_RATIO } = input;
  if (rect.width <= 0 || rect.height <= 0) {
    return 'center';
  }

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = pointerX - centerX;
  const dy = pointerY - centerY;
  const deadzoneRadius = Math.min(rect.width, rect.height) * deadzoneRatio;

  if (Math.hypot(dx, dy) < deadzoneRadius) {
    return 'center';
  }

  const angle = Math.atan2(dy, dx);
  if (angle >= -QUADRANT_HALF_RAD && angle < QUADRANT_HALF_RAD) {
    return 'right';
  }
  if (angle >= QUADRANT_HALF_RAD && angle < 3 * QUADRANT_HALF_RAD) {
    return 'down';
  }
  if (angle >= -3 * QUADRANT_HALF_RAD && angle < -QUADRANT_HALF_RAD) {
    return 'up';
  }
  return 'left';
}

export function createGazeMachine(options: GazeMachineOptions = {}): GazeMachine {
  const centerDwellMs = options.centerDwellMs ?? DEFAULT_CENTER_DWELL_MS;
  const timers = options.timers ?? DEFAULT_TIMERS;
  const onChange = options.onChange;

  let currentState: GazeDirection = 'center';
  let desiredTarget: GazeDirection = 'center';
  let viaCenter = false;
  let timerId: number | null = null;
  let disposed = false;

  const getSnapshot = (): GazeSnapshot => ({
    currentState,
    targetState: desiredTarget,
    viaCenter,
  });

  const emit = (): void => {
    if (!disposed) {
      onChange?.(getSnapshot());
    }
  };

  const setTarget = (nextTarget: GazeDirection): GazeSnapshot => {
    if (disposed) {
      return getSnapshot();
    }

    if (timerId !== null) {
      if (nextTarget === 'center') {
        timers.clearTimeout(timerId);
        timerId = null;
        desiredTarget = 'center';
        currentState = 'center';
        viaCenter = false;
        emit();
        return getSnapshot();
      }
      if (nextTarget !== desiredTarget) {
        desiredTarget = nextTarget;
        emit();
      }
      return getSnapshot();
    }

    if (nextTarget === currentState && nextTarget === desiredTarget && !viaCenter) {
      return getSnapshot();
    }

    desiredTarget = nextTarget;

    if (currentState === 'center' || nextTarget === 'center') {
      currentState = nextTarget;
      viaCenter = false;
      emit();
      return getSnapshot();
    }

    // Hub-and-spoke transition: non-center -> center (dwell) -> desiredTarget
    currentState = 'center';
    viaCenter = true;
    timerId = timers.setTimeout(() => {
      timerId = null;
      if (disposed) {
        return;
      }
      currentState = desiredTarget;
      viaCenter = false;
      emit();
    }, centerDwellMs);

    emit();
    return getSnapshot();
  };

  const reset = (): GazeSnapshot => setTarget('center');

  const dispose = (): void => {
    if (disposed) {
      return;
    }
    disposed = true;
    if (timerId !== null) {
      timers.clearTimeout(timerId);
      timerId = null;
    }
  };

  return {
    setTarget,
    reset,
    getSnapshot,
    dispose,
  };
}
