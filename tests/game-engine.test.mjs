import assert from "node:assert/strict";
import test from "node:test";

import { BugBlasterGame } from "../src/game-engine.mjs";
import { FakeScheduler } from "./fake-scheduler.mjs";

test("a new game exposes a frozen initial snapshot", () => {
  const game = new BugBlasterGame();

  assert.deepEqual(game.snapshot, {
    remainingSeconds: 20,
    score: 0,
    targetIndex: null,
    isRunning: false,
  });
  assert.equal(Object.isFrozen(game.snapshot), true);
  assert.throws(() => {
    game.snapshot.score = 99;
  }, TypeError);
});

test("start resets the round and schedules one timer", () => {
  const scheduler = new FakeScheduler();
  const game = new BugBlasterGame({
    durationSeconds: 12,
    boardSize: 4,
    scheduler,
    random: () => 0.5,
  });

  game.start();

  assert.deepEqual(game.snapshot, {
    remainingSeconds: 12,
    score: 0,
    targetIndex: 2,
    isRunning: true,
  });
  assert.equal(scheduler.activeCount, 1);
});

test("one elapsed timer tick lowers the countdown by one second", () => {
  const scheduler = new FakeScheduler();
  const game = new BugBlasterGame({ scheduler });
  game.start();

  scheduler.advanceOneTick();

  assert.equal(game.snapshot.remainingSeconds, 19);
});

test("only whacking the active bug scores and chooses a new target", () => {
  const scheduler = new FakeScheduler();
  const randomValues = [0, 0.75];
  const game = new BugBlasterGame({
    boardSize: 4,
    scheduler,
    random: () => randomValues.shift(),
  });
  game.start();

  assert.equal(game.whack(1), false);
  assert.equal(game.snapshot.score, 0);
  assert.equal(game.whack(0), true);
  assert.equal(game.snapshot.score, 1);
  assert.equal(game.snapshot.targetIndex, 3);
});

test("stop ends the round and clears its active timer", () => {
  const scheduler = new FakeScheduler();
  const game = new BugBlasterGame({ scheduler });
  game.start();

  game.stop();

  assert.equal(game.snapshot.isRunning, false);
  assert.equal(game.snapshot.targetIndex, null);
  assert.equal(scheduler.activeCount, 0);
});

test.todo("restarting an active round keeps one timer and one tick per second");
