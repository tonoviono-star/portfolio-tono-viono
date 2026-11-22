import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_CENTER_DWELL_MS,
  DEFAULT_DEADZONE_RATIO,
  createGazeMachine,
  detectGazeSector,
} from './gazeStateMachine.ts';

function createFakeTimers() {
  let nextId = 1;
  let now = 0;
  const active = new Map();
  let scheduledCount = 0;
  let clearedCount = 0;

  return {
    adapter: {
      setTimeout(fn, ms) {
        const id = nextId++;
        scheduledCount++;
        active.set(id, { fn, runAt: now + ms, ms });
        return id;
      },
      clearTimeout(id) {
        if (active.delete(id)) {
          clearedCount++;
        }
      },
    },
    advance(ms) {
      now += ms;
      while (true) {
        let earliest = null;
        for (const [id, entry] of active.entries()) {
          if (entry.runAt <= now && (!earliest || entry.runAt < earliest.runAt)) {
            earliest = { id, ...entry };
          }
        }
        if (!earliest) break;
        active.delete(earliest.id);
        earliest.fn();
      }
    },
    get activeCount() {
      return active.size;
    },
    get scheduledCount() {
      return scheduledCount;
    },
    get clearedCount() {
      return clearedCount;
    },
  };
}

test('detectGazeSector handles zero-sized rect, deadzone, and 45-degree quadrants', () => {
  assert.equal(DEFAULT_DEADZONE_RATIO, 0.16);
  assert.equal(DEFAULT_CENTER_DWELL_MS, 95);

  // Zero-sized rect
  assert.equal(
    detectGazeSector({ pointerX: 100, pointerY: 100, rect: { left: 0, top: 0, width: 0, height: 100 } }),
    'center'
  );
  assert.equal(
    detectGazeSector({ pointerX: 100, pointerY: 100, rect: { left: 0, top: 0, width: 100, height: 0 } }),
    'center'
  );

  // Rect 1000x500 at (100, 200) -> center is (600, 450), minSide = 500, deadzone = 80
  const rect = { left: 100, top: 200, width: 1000, height: 500 };

  // Inside 16% deadzone (distance < 80)
  assert.equal(detectGazeSector({ pointerX: 600, pointerY: 450, rect }), 'center');
  assert.equal(detectGazeSector({ pointerX: 650, pointerY: 490, rect }), 'center'); // hypot(50,40)=64.03 < 80

  // Outside deadzone -> quadrants
  assert.equal(detectGazeSector({ pointerX: 750, pointerY: 450, rect }), 'right'); // angle 0
  assert.equal(detectGazeSector({ pointerX: 720, pointerY: 410, rect }), 'right'); // inside [-45deg, 45deg)
  assert.equal(detectGazeSector({ pointerX: 600, pointerY: 600, rect }), 'down');  // angle +90deg
  assert.equal(detectGazeSector({ pointerX: 450, pointerY: 450, rect }), 'left');  // angle +180deg
  assert.equal(detectGazeSector({ pointerX: 400, pointerY: 445, rect }), 'left');  // negative-y near -PI -> left
  assert.equal(detectGazeSector({ pointerX: 600, pointerY: 300, rect }), 'up');    // angle -90deg
});

test('createGazeMachine enforces hub-and-spoke transitions through center', () => {
  const timers = createFakeTimers();
  const events = [];
  const machine = createGazeMachine({
    timers: timers.adapter,
    onChange: (snap) => events.push(snap),
  });

  assert.deepEqual(machine.getSnapshot(), {
    currentState: 'center',
    targetState: 'center',
    viaCenter: false,
  });

  // Hub-to-spoke: center -> left (immediate, no timer)
  machine.setTarget('left');
  assert.equal(timers.activeCount, 0);
  assert.deepEqual(machine.getSnapshot(), {
    currentState: 'left',
    targetState: 'left',
    viaCenter: false,
  });

  // Repeated identical target should not re-emit
  const countBeforeRepeat = events.length;
  machine.setTarget('left');
  assert.equal(events.length, countBeforeRepeat);

  // Spoke-to-hub: left -> center (immediate, no timer)
  machine.setTarget('center');
  assert.equal(timers.activeCount, 0);
  assert.deepEqual(machine.getSnapshot(), {
    currentState: 'center',
    targetState: 'center',
    viaCenter: false,
  });

  // Spoke-to-spoke: left -> right MUST pass through center
  machine.setTarget('left');
  events.length = 0;
  machine.setTarget('right');
  assert.equal(timers.activeCount, 1);
  assert.deepEqual(machine.getSnapshot(), {
    currentState: 'center',
    targetState: 'right',
    viaCenter: true,
  });
  assert.deepEqual(events, [
    { currentState: 'center', targetState: 'right', viaCenter: true },
  ]);

  timers.advance(94);
  assert.equal(machine.getSnapshot().currentState, 'center');
  timers.advance(1);
  assert.equal(timers.activeCount, 0);
  assert.deepEqual(machine.getSnapshot(), {
    currentState: 'right',
    targetState: 'right',
    viaCenter: false,
  });

  // Opposite spoke-to-spoke: up -> down
  machine.setTarget('center');
  machine.setTarget('up');
  events.length = 0;
  machine.setTarget('down');
  assert.deepEqual(machine.getSnapshot(), {
    currentState: 'center',
    targetState: 'down',
    viaCenter: true,
  });
  timers.advance(95);
  assert.deepEqual(machine.getSnapshot(), {
    currentState: 'down',
    targetState: 'down',
    viaCenter: false,
  });
});

test('createGazeMachine is interruptible without stacking timers during rapid swipe', () => {
  const timers = createFakeTimers();
  const events = [];
  const machine = createGazeMachine({
    timers: timers.adapter,
    onChange: (snap) => events.push(snap),
  });

  machine.setTarget('left');
  events.length = 0;
  const scheduledBase = timers.scheduledCount;

  // left -> right starts dwell at center
  machine.setTarget('right');
  assert.equal(timers.activeCount, 1);
  assert.equal(timers.scheduledCount, scheduledBase + 1);

  // At 30ms, swipe to down -> updates targetState without new timer
  timers.advance(30);
  machine.setTarget('down');
  assert.equal(timers.activeCount, 1);
  assert.equal(timers.scheduledCount, scheduledBase + 1);
  assert.deepEqual(machine.getSnapshot(), {
    currentState: 'center',
    targetState: 'down',
    viaCenter: true,
  });

  // At 60ms, swipe to up -> updates targetState without new timer
  timers.advance(30);
  machine.setTarget('up');
  assert.equal(timers.activeCount, 1);
  assert.equal(timers.scheduledCount, scheduledBase + 1);
  assert.deepEqual(machine.getSnapshot(), {
    currentState: 'center',
    targetState: 'up',
    viaCenter: true,
  });

  // At 95ms total, timer completes directly to latest desired target ('up')
  timers.advance(35);
  assert.equal(timers.activeCount, 0);
  assert.deepEqual(machine.getSnapshot(), {
    currentState: 'up',
    targetState: 'up',
    viaCenter: false,
  });
});

test('createGazeMachine reset() and dispose() cancel pending center dwell timer cleanly', () => {
  const timers = createFakeTimers();
  const events = [];
  const machine = createGazeMachine({
    timers: timers.adapter,
    onChange: (snap) => events.push(snap),
  });

  // Test reset mid-transit
  machine.setTarget('left');
  machine.setTarget('right');
  assert.equal(timers.activeCount, 1);
  events.length = 0;

  machine.reset();
  assert.equal(timers.activeCount, 0);
  assert.deepEqual(machine.getSnapshot(), {
    currentState: 'center',
    targetState: 'center',
    viaCenter: false,
  });
  assert.deepEqual(events, [
    { currentState: 'center', targetState: 'center', viaCenter: false },
  ]);

  // Advancing time does not trigger stale callback
  events.length = 0;
  timers.advance(200);
  assert.equal(events.length, 0);
  assert.deepEqual(machine.getSnapshot(), {
    currentState: 'center',
    targetState: 'center',
    viaCenter: false,
  });

  // Test dispose mid-transit
  machine.setTarget('up');
  machine.setTarget('down');
  assert.equal(timers.activeCount, 1);
  events.length = 0;

  machine.dispose();
  assert.equal(timers.activeCount, 0);
  timers.advance(200);
  assert.equal(events.length, 0);
});
